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
* Clone repository and change to project directory:
    `git clone https://github.com/givorra/Pokedex_App.git`
    `cd Pokedex_App`

## a) Run Pokedex App in Docker Container
* Prerrequisites:
    install docker: https://docs.docker.com/engine/installation/
    install docker-compose: https://docs.docker.com/compose/install/
* Configurate database connection in config/dev.exs file
* Deploy application `sudo docker-compose up -d web`
* Download and install project dependencies, create, migrate and initialize db `sudo docker-compose run web ./init_project.sh`
* Restart and run application service `sudo docker-compose restart web && sudo docker-compose run web`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## b) Run Pokedex App in Windows/Linux SO
* Prerrequisites:
    install phoenix: https://hexdocs.pm/phoenix/installation.html

To start your app:

* Configurate database connection in config/dev.exs file
* Create, migrate and initialize db, download and install dependencies `sudo ./init_project.sh`
* Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## Test
+ You can execute backend tests using 'mix test' command
