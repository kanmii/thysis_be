defmodule ThysisWeb.User.Resolver do
  require Logger

  alias Thysis.Accounts
  alias Thysis.Accounts.User
  alias ThysisWeb.Resolver
  alias ThysisWeb.Auth.Guardian, as: GuardianApp
  alias Thysis.Accounts.UserApi

  def create(_root, %{registration: params}, _info) do
    with {:ok, user} <- Accounts.register(params),
         {:ok, jwt, _claim} <- GuardianApp.encode_and_sign(user) do
      {:ok, %User{user | jwt: jwt}}
    else
      {:error, failed_operations, changeset} ->
        {
          :error,
          Resolver.transaction_errors_to_string(changeset, failed_operations)
        }

      error ->
        {:error, inspect(error)}
    end
  end

  def update(_, %{user: %{jwt: jwt} = params}, _info) do
    with {:ok, user, _claim} <- GuardianApp.resource_from_token(jwt),
         {:ok, created_user} <- UserApi.update_(user, params) do
      {:ok, %User{created_user | jwt: jwt}}
    else
      {:error, %Ecto.Changeset{} = error} ->
        {:error, Resolver.changeset_errors_to_string(error)}

      _ ->
        Resolver.unauthorized()
    end
  end

  def login(_root, %{login: params}, _info) do
    with {:ok, %{user: user}} <- Accounts.authenticate(params),
         {:ok, jwt, _claim} <- GuardianApp.encode_and_sign(user) do
      {:ok, %User{user | jwt: jwt}}
    else
      {:error, errs} ->
        {
          :error,
          Poison.encode!(%{
            error: errs
          })
        }
    end
  end

  def refresh(_root, %{refresh: %{jwt: jwt}}, _info) do
    with {:ok, _claims} <- GuardianApp.decode_and_verify(jwt),
         {:ok, _old, {new_jwt, _claims}} = GuardianApp.refresh(jwt),
         {:ok, user, _claims} <- GuardianApp.resource_from_token(jwt) do
      {:ok, %User{user | jwt: new_jwt}}
    else
      {:error, errs} ->
        {
          :error,
          Poison.encode!(%{
            error: errs
          })
        }
    end
  end

  def anfordern_pzs(_root, %{email: email}, _info) do
    Logger.info(fn ->
      ["Request for password reset token from user email: ", email]
    end)

    with %User{} = user <- Accounts.get_user_for_pwd_recovery(email),
         {:ok, jwt, _claim} <- GuardianApp.encode_and_sign(user),
         :ok <-
           Accounts.create_pwd_recovery_token(
             user.credential,
             email,
             jwt
           ) do
      Logger.info(fn ->
        [
          "Request for password reset token from user email: ",
          email,
          " successful!"
        ]
      end)

      {:ok, %{email: email, token: jwt}}
    else
      nil ->
        Logger.error(fn ->
          [
            "Request for password reset token from user.",
            "\nInvalid email: ",
            email
          ]
        end)

        {:error, "Invalid email"}

      _ ->
        Logger.error(fn ->
          [
            "Request for password reset token from user email: ",
            email,
            " errors for unknown reasons!"
          ]
        end)

        {:ok, "error"}
    end
  end

  def benutzer_entferne(_, %{email: email}, %{context: %{current_user: user}}) do
    Logger.info(fn ->
      [
        "Deleting user:\n",
        "\tUser supplied arg email: ",
        email,
        "\tAuthenticated user email: ",
        user.email
      ]
    end)

    case email == user.email do
      true ->
        with {:ok, _} <- Accounts.delete_user(user) do
          Logger.info(fn -> ["User deletion succeeds: ", email] end)
          {:ok, true}
        else
          _ ->
            Logger.error(fn -> ["User deletion fails: ", email] end)
            {:error, "user deletion fails"}
        end

      _ ->
        Logger.error(fn ->
          ["User deletion fails - unauthorized: ", email]
        end)

        Resolver.unauthorized()
    end
  end

  def benutzer_entferne(_root, %{email: email}, _info) do
    Logger.error(fn ->
      ["User deletion fails - unauthorized: ", email]
    end)

    Resolver.unauthorized()
  end

  def alle_benutzer_entferne(_root, _arg, %{context: %{current_user: user}}) do
    Logger.info(fn ->
      [
        "deleting all users requested by: ",
        user.email
      ]
    end)

    with {_, nil} <- Accounts.delete_all_users() do
      Logger.info(fn ->
        [
          "deleting all users successful"
        ]
      end)

      {:ok, true}
    else
      _ ->
        Logger.error(fn ->
          [
            "deleting all users fail"
          ]
        end)

        {:error, "unable to delete all users"}
    end
  end

  def alle_benutzer_entferne(_root, _arg, _info) do
    Logger.error(fn ->
      [
        "deleting all users fail: you are not authenticated"
      ]
    end)

    Resolver.unauthorized()
  end
end
