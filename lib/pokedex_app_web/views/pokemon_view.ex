defmodule PokedexAppWeb.PokemonView do
  use PokedexAppWeb, :view
  alias PokedexAppWeb.PokemonView

  def render("index.json", %{pokemons: pokemons}) do
    %{data: render_many(pokemons, PokemonView, "pokemon.json")}
  end

  def render("show.json", %{pokemon: pokemon}) do
    %{data: render_one(pokemon, PokemonView, "pokemon.json")}
  end

  def render("pokemon.json", %{pokemon: pokemon}) do
    %{id: pokemon.id,
      name: pokemon.name,
      description: pokemon.description,
      type1: pokemon.type1,
      type2: pokemon.type2,
      favourite: pokemon.favourite,
      evolution_to: pokemon.evolution_to}
  end
end
