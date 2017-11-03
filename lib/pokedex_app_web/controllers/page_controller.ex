defmodule PokedexAppWeb.PageController do
  use PokedexAppWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
