use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.

# You can generate a new secret by running:
#
#     mix phx.gen.secret
config :pokedex_app, PokedexAppWeb.Endpoint,
  http: [port: 80],
  secret_key_base: "A LONG SECRET"

# Configure your database
config :pokedex_app, PokedexApp.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "pokedex_app_prod",
  size: 20 # The amount of database connections in the pool
