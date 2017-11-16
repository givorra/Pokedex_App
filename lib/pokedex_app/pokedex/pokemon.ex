defmodule PokedexApp.Pokedex.Pokemon do
  use Ecto.Schema
  import Ecto.Changeset
  alias PokedexApp.Pokedex.Pokemon
  alias PokedexApp.Pokedex

  schema "pokemons" do
    field :description, :string, default: ""
    field :evolution_to, :string, default: ""
    field :favourite, :boolean, default: false
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
    |> validate_add_favourite
  end

  def validate_add_favourite(changeset) do
    favourite = get_field(changeset, :favourite)
    if favourite == nil or not favourite or Pokedex.can_add_favourites() do
      changeset
    else
      add_error(changeset, :favourite,
        "there are already " <> to_string(Pokedex.max_favourites()) <>
        " pokemons as favorites, there's no more")
    end
  end

end
