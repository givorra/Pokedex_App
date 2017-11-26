This application works on the Phoenix framework. The back-end is implemented in Elixir and the code is in 'lib/' folder.
The front-end is implemented with React js and the code is in the 'assets/js' folder

## The stack

* Elixir (^1.5.0)
* Node.js (^8.2.1)
* npm (^5.3.0)
* Phoenix (^1.3.0)
* React (^15.6.1)
* TypeScript (^2.4.2)
* Webpack (^3.4.1)

## Start
* Clone repository:
    `git clone https://github.com/givorra/Pokedex_App.git`

## a) Run Pokedex App in Docker Container
* Prerrequisites:
    install docker: https://docs.docker.com/engine/installation/
    install docker-compose: https://docs.docker.com/compose/install/
* Modify database connection in config/dev.exs file
* From project folder, run
    `sudo docker-compose up -d web`
    `sudo docker-compose run web mix ecto.create`
    `sudo docker-compose run web mix ecto.migrate`
    `sudo docker-compose run web mix run priv/repo/seeds.exs`
    `sudo docker-compose restart web`
    `sudo docker-compose run web`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser and create you first pokemon.

## b) Run Pokedex App in Windows/Linux SO
* Prerrequisites:
    install phoenix: https://hexdocs.pm/phoenix/installation.html

To start your app:

* Modify database connection in config/dev.exs file
* Install project dependencies with `mix deps.get` and `npm install`, in that order.
* Modify the database settings in each `config/` files according to your needs (user, password, host).
* Create and migrate your database with `mix ecto.create`, `mix ecto.migrate`
* Insert initial data `mix run priv/repo/seeds.ex`
* Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser cd Deskand create you first pokemon

## Test
+ You can execute backend tests using 'mix test' command
