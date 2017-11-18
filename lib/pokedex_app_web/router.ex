defmodule PokedexAppWeb.Router do
  use PokedexAppWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", PokedexAppWeb do
    pipe_through :api

      resources "/pokemons", PokemonController, except: [:new, :edit]
      # Tengo que saber en el cliente, si puedo añadir favorito, teniendo en cuenta es un put o un create
      #resources "/pokemons/can_add_favourite", PokemonController, except: [:new, :edit]
  end

  scope "/", PokedexAppWeb do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
  end
end
