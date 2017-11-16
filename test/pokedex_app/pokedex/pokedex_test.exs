defmodule PokedexApp.PokedexTest do
  use PokedexApp.DataCase

  alias PokedexApp.Pokedex

  describe "pokemons" do
    alias PokedexApp.Pokedex.Pokemon

    @valid_attrs %{description: "some description some description",
      evolution_to: "some evolution_to", favourite: true, name: "some name",
      type1: "some type1", type2: "some type2"}
    @update_attrs %{description: "some description some description",
      evolution_to: "some updated evolution_to", favourite: false,
        name: "some updated name", type1: "some updated type1",
        type2: "some updated type2"}
    @invalid_attrs %{description: nil, evolution_to: nil, favourite: nil, name: nil, type1: nil, type2: nil}

    def pokemon_fixture(attrs \\ %{}) do
      {:ok, pokemon} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Pokedex.create_pokemon()

      pokemon
    end

    test "list_pokemons/0 returns all pokemons" do
      pokemon = pokemon_fixture()
      assert Pokedex.list_pokemons(%{}) == [pokemon]
    end

    test "get_pokemon!/1 returns the pokemon with given id" do
      pokemon = pokemon_fixture()
      assert Pokedex.get_pokemon!(pokemon.id) == pokemon
    end

    test "create_pokemon/1 with valid data creates a pokemon" do
      assert {:ok, %Pokemon{} = pokemon} = Pokedex.create_pokemon(@valid_attrs)
      assert pokemon.description == "some description some description"
      assert pokemon.evolution_to == "some evolution_to"
      assert pokemon.favourite == true
      assert pokemon.name == "some name"
      assert pokemon.type1 == "some type1"
      assert pokemon.type2 == "some type2"
    end

    test "create_pokemon/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Pokedex.create_pokemon(@invalid_attrs)
    end

    test "update_pokemon/2 with valid data updates the pokemon" do
      pokemon = pokemon_fixture()
      assert {:ok, pokemon} = Pokedex.update_pokemon(pokemon, @update_attrs)
      assert %Pokemon{} = pokemon
      assert pokemon.description == "some description some description"
      assert pokemon.evolution_to == "some updated evolution_to"
      assert pokemon.favourite == false
      assert pokemon.name == "some updated name"
      assert pokemon.type1 == "some updated type1"
      assert pokemon.type2 == "some updated type2"
    end

    test "update_pokemon/2 with invalid data returns error changeset" do
      pokemon = pokemon_fixture()
      assert {:error, %Ecto.Changeset{}} = Pokedex.update_pokemon(pokemon, @invalid_attrs)
      assert pokemon == Pokedex.get_pokemon!(pokemon.id)
    end

    test "delete_pokemon/1 deletes the pokemon" do
      pokemon = pokemon_fixture()
      assert {:ok, %Pokemon{}} = Pokedex.delete_pokemon(pokemon)
      assert_raise Ecto.NoResultsError, fn -> Pokedex.get_pokemon!(pokemon.id) end
    end

    test "change_pokemon/1 returns a pokemon changeset" do
      pokemon = pokemon_fixture()
      assert %Ecto.Changeset{} = Pokedex.change_pokemon(pokemon)
    end
  end
end
