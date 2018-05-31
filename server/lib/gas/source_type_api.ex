defmodule Gas.SourceTypeApi do
  @moduledoc """
  The SourceTypes context.
  """

  import Ecto.Query, warn: false
  alias Gas.Repo

  alias Gas.SourceType

  @doc """
  Returns the list of source_types.

  ## Examples

      iex> list()
      [%SourceType{}, ...]

  """
  def list do
    Repo.all(SourceType)
  end

  @doc """
  Gets a single source_type.

  Raises `Ecto.NoResultsError` if the Source type does not exist.

  ## Examples

      iex> get!(123)
      %SourceType{}

      iex> get!(456)
      ** (Ecto.NoResultsError)

  """
  def get!(id), do: Repo.get!(SourceType, id)

  @doc """
  Creates a source_type.

  ## Examples

      iex> create_(%{field: value})
      {:ok, %SourceType{}}

      iex> create_(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_(attrs \\ %{}) do
    %SourceType{}
    |> SourceType.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a source_type.

  ## Examples

      iex> update_(source_type, %{field: new_value})
      {:ok, %SourceType{}}

      iex> update_(source_type, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_(%SourceType{} = source_type, attrs) do
    source_type
    |> SourceType.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a SourceType.

  ## Examples

      iex> delete_(source_type)
      {:ok, %SourceType{}}

      iex> delete_(source_type)
      {:error, %Ecto.Changeset{}}

  """
  def delete_(%SourceType{} = source_type) do
    Repo.delete(source_type)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking source_type changes.

  ## Examples

      iex> change_(source_type)
      %Ecto.Changeset{source: %SourceType{}}

  """
  def change_(%SourceType{} = source_type) do
    SourceType.changeset(source_type, %{})
  end
end