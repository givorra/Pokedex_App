defmodule PokedexAppWeb.PokemonController do
  use PokedexAppWeb, :controller

  alias PokedexApp.Pokedex
  alias PokedexApp.Pokedex.Pokemon

  action_fallback PokedexAppWeb.FallbackController

  def index(conn, params) do
    pokemons = Pokedex.list_pokemons(params)
    render(conn, "index.json", pokemons: pokemons)
  end

  def create(conn, %{"pokemon" => pokemon_params}) do
    # pokemon_params["favourite"] -> puede provocar error si no existe el atributo...
    if not pokemon_params["favourite"] or can_add_favourites() do
      with {:ok, %Pokemon{} = pokemon} <- Pokedex.create_pokemon(pokemon_params) do
        conn
        |> put_status(:created)
        |> put_resp_header("location", pokemon_path(conn, :show, pokemon))
        |> render("show.json", pokemon: pokemon)
      end
    else
      conn
      |> put_resp_header("content-type", "application/json")
      |> send_resp(:precondition_failed, error_precondition_max_favourites())

    end
  end

  def show(conn, %{"id" => id}) do
    pokemon = Pokedex.get_pokemon!(id)
    render(conn, "show.json", pokemon: pokemon)
  end

  def update(conn, %{"id" => id, "pokemon" => pokemon_params}) do
    pokemon = Pokedex.get_pokemon!(id)

    # pokemon_params["favourite"] -> puede provocar error si no existe el atributo...
    if not pokemon_params["favourite"] or pokemon.favourite or can_add_favourites() do
      with {:ok, %Pokemon{} = pokemon} <- Pokedex.update_pokemon(pokemon, pokemon_params) do
        render(conn, "show.json", pokemon: pokemon)
      end
    else
      conn
      |> put_resp_header("content-type", "application/json")
      |> send_resp(:precondition_failed, error_precondition_max_favourites())

    end
  end

  def delete(conn, %{"id" => id}) do
    pokemon = Pokedex.get_pokemon!(id)
    with {:ok, %Pokemon{}} <- Pokedex.delete_pokemon(pokemon) do
      send_resp(conn, :no_content, "")
    end
  end

  def error_precondition_max_favourites() do
    "{ \"errors\": { \"favourite\":
      [\"there are already " <> to_string(max_favourites()) <> " pokemons as favorites, there's no more\"] } }"
  end

  def can_add_favourites(), do: Pokedex.count_favourites() < max_favourites()
  def max_favourites(), do: 10
end
