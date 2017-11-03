defmodule PokedexAppWeb.PokemonControllerTest do
  use PokedexAppWeb.ConnCase

  alias PokedexApp.Pokedex
  alias PokedexApp.Pokedex.Pokemon

  @create_attrs %{description: "some description", evolution_to: "some evolution_to", favourite: true, name: "some name", tipe1: "some tipe1", tipe2: "some tipe2"}
  @update_attrs %{description: "some updated description", evolution_to: "some updated evolution_to", favourite: false, name: "some updated name", tipe1: "some updated tipe1", tipe2: "some updated tipe2"}
  @invalid_attrs %{description: nil, evolution_to: nil, favourite: nil, name: nil, tipe1: nil, tipe2: nil}

  def fixture(:pokemon) do
    {:ok, pokemon} = Pokedex.create_pokemon(@create_attrs)
    pokemon
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all pokemons", %{conn: conn} do
      conn = get conn, pokemon_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create pokemon" do
    test "renders pokemon when data is valid", %{conn: conn} do
      conn = post conn, pokemon_path(conn, :create), pokemon: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, pokemon_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "description" => "some description",
        "evolution_to" => "some evolution_to",
        "favourite" => true,
        "name" => "some name",
        "tipe1" => "some tipe1",
        "tipe2" => "some tipe2"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, pokemon_path(conn, :create), pokemon: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update pokemon" do
    setup [:create_pokemon]

    test "renders pokemon when data is valid", %{conn: conn, pokemon: %Pokemon{id: id} = pokemon} do
      conn = put conn, pokemon_path(conn, :update, pokemon), pokemon: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, pokemon_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "description" => "some updated description",
        "evolution_to" => "some updated evolution_to",
        "favourite" => false,
        "name" => "some updated name",
        "tipe1" => "some updated tipe1",
        "tipe2" => "some updated tipe2"}
    end

    test "renders errors when data is invalid", %{conn: conn, pokemon: pokemon} do
      conn = put conn, pokemon_path(conn, :update, pokemon), pokemon: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete pokemon" do
    setup [:create_pokemon]

    test "deletes chosen pokemon", %{conn: conn, pokemon: pokemon} do
      conn = delete conn, pokemon_path(conn, :delete, pokemon)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, pokemon_path(conn, :show, pokemon)
      end
    end
  end

  defp create_pokemon(_) do
    pokemon = fixture(:pokemon)
    {:ok, pokemon: pokemon}
  end
end
