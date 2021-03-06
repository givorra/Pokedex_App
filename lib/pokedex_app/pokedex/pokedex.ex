defmodule PokedexApp.Pokedex do
  @moduledoc """
  The Pokedex context.
  """

  import Ecto.Query, warn: false
  alias PokedexApp.Repo

  alias PokedexApp.Pokedex.Pokemon
  alias PokedexApp.Pokedex.QueryFilter

  @doc """
  Returns the list of pokemons.

  ## Examples

      iex> list_pokemons()
      [%Pokemon{}, ...]

  """
  def list_pokemons(params) do
    #Repo.all(Pokemon)
    Pokemon
    |> QueryFilter.filter(%Pokemon{name: nil}, params, [:name, :favourite])
    |> Repo.all
  end

  @doc """
  Return the number of favourite pokemons
  """
  def count_favourites() do
    Repo.one(from p in "pokemons", select: count("*"), where: p.favourite == true)
  end

  def can_add_favourites(), do: count_favourites() < max_favourites()
  def max_favourites(), do: 10

  @doc """
  Gets a single pokemon.

  Raises `Ecto.NoResultsError` if the Pokemon does not exist.

  ## Examples

      iex> get_pokemon!(123)
      %Pokemon{}

      iex> get_pokemon!(456)
      ** (Ecto.NoResultsError)

  """
  def get_pokemon!(id), do: Repo.get!(Pokemon, id)
  def get_pokemon(id), do: Repo.get(Pokemon, id)

  def get_pokemon_by(params), do: Repo.get_by!(Pokemon, params)
  @doc """
  Creates a pokemon.

  ## Examples

      iex> create_pokemon(%{field: value})
      {:ok, %Pokemon{}}

      iex> create_pokemon(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_pokemon(attrs \\ %{}) do
    %Pokemon{}
    |> Pokemon.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a pokemon.

  ## Examples

      iex> update_pokemon(pokemon, %{field: new_value})
      {:ok, %Pokemon{}}

      iex> update_pokemon(pokemon, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_pokemon(%Pokemon{} = pokemon, attrs) do
    pokemon
    |> Pokemon.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Pokemon.

  ## Examples

      iex> delete_pokemon(pokemon)
      {:ok, %Pokemon{}}

      iex> delete_pokemon(pokemon)
      {:error, %Ecto.Changeset{}}

  """
  def delete_pokemon(%Pokemon{} = pokemon) do
    Repo.delete(pokemon)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking pokemon changes.

  ## Examples

      iex> change_pokemon(pokemon)
      %Ecto.Changeset{source: %Pokemon{}}

  """
  def change_pokemon(%Pokemon{} = pokemon) do
    Pokemon.changeset(pokemon, %{})
  end
end
