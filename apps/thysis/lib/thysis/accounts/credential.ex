defmodule Thysis.Accounts.Credential do
  use Ecto.Schema
  use Timex.Ecto.Timestamps

  import Ecto.Changeset
  import Comeonin.Bcrypt, only: [hashpwsalt: 1]

  alias Ecto.Changeset
  alias Thysis.Accounts.User

  schema "credentials" do
    field(:source, :string)
    field(:token, :string)
    field(:pwd_recovery_token, :string)
    field(:pwd_recovery_token_expires_at, :utc_datetime)

    field(:password, :string, virtual: true)

    belongs_to(:user, User)
    timestamps()
  end

  @doc "changeset"
  def changeset(%__MODULE__{} = credential, attrs \\ %{}) do
    credential
    |> cast(attrs, [
      :source,
      :token,
      :user_id,
      :password,
      :pwd_recovery_token,
      :pwd_recovery_token_expires_at
    ])
    |> validate()
  end

  def validate(%Changeset{} = changes) do
    changes
    |> validate_required([:source])
    |> unique_constraint(:source, name: :credential_user_id_source_index)
    |> hash_password()
  end

  defp hash_password(
         %Changeset{
           valid?: true,
           changes: %{
             source: "password",
             password: password
           }
         } = changes
       ) do
    put_change(changes, :token, hashpwsalt(password))
  end

  defp hash_password(changes), do: changes
end
