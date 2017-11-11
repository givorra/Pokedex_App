defmodule PokedexApp.Pokedex.Pokemon do
  use Ecto.Schema
  import Ecto.Changeset
  alias PokedexApp.Pokedex.Pokemon

  schema "pokemons" do
    field :description, :string, default: ""
    field :evolution_to, :string, default: ""
    field :favourite, :boolean, default: ""
    field :name, :string, default: ""
    field :type1, :string, default: ""
    field :type2, :string, default: ""

    timestamps()
  end

  @doc false
  def changeset(%Pokemon{} = pokemon, attrs, filters \\ [:name, :description, :type1, :type2, :evolution_to, :favourite]) do
    pokemon
    |> cast(attrs, filters)
    |> validate_required([:name, :description, :type1])
    |> validate_length(:name, min: 4)
    |> validate_length(:name, max: 24)
    |> validate_length(:description, min: 30)
  end
end
