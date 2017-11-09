defmodule PokedexApp.Repo.Migrations.CreatePokemons do
  use Ecto.Migration

  def change do
    create table(:pokemons) do
      add :name, :string
      add :description, :string
      add :type1, :string
      add :type2, :string
      add :favourite, :boolean, default: false, null: false
      add :evolution_to, :string

      timestamps()
    end

  end
end
