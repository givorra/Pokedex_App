defmodule PokedexApp.DatabaseSeeder do
  @moduledoc """
  Script for populating the database. You can run it as:

      mix run priv/repo/seeds.exs

  Inside the script, you can read and write to any of your
  repositories directly:

      PokedexApp.Repo.insert!(%PokedexApp.SomeSchema{})

  We recommend using the bang functions (`insert!`, `update!`
  and so on) as they will fail if something goes wrong.
  """
  alias PokedexApp.Repo
  alias PokedexApp.Pokedex.Pokemon

  # Clear the database first before seeding
  Repo.delete_all Pokemon

  Repo.insert! %Pokemon{
    name: "Bulbasaur",
    description: "A Bulbasaur es fácil verle echándose una siesta al sol. La semilla que tiene en el lomo va creciendo cada vez más a medida que absorbe los rayos del sol.",
    type1: "Planta",
    type2: "Veneno",
    favourite: true,
    evolution_to: "Ivysaur"
  }

  Repo.insert! %Pokemon{
    name: "Charmander",
    description: "La llama que tiene en la punta de la cola arde según sus sentimientos. Llamea levemente cuando está alegre y arde vigorosamente cuando está enfadado.",
    type1: "Fuego",
    type2: "",
    favourite: true,
    evolution_to: "Charmaleon"
  }

  Repo.insert! %Pokemon{
    name: "Squirtle",
    description: "El caparazón de Squirtle no le sirve de protección únicamente. Su forma redondeada y las hendiduras que tiene le ayudan a deslizarse en el agua y le permiten nadar a gran velocidad.",
    type1: "Agua",
    type2: "",
    favourite: true,
    evolution_to: "Wartotle"
  }

  Repo.insert! %Pokemon{
    name: "Caterpie",
    description: "Caterpie tiene un apetito voraz. Es capaz de devorar hojas que superen su tamaño en un abrir y cerrar de ojos. Atención a la antena que tiene: libera un hedor realmente fuerte.",
    type1: "Bicho",
    type2: "",
    favourite: false,
    evolution_to: "Metapod"
  }

  Repo.insert! %Pokemon{
    name: "Pidgey",
    description: "Pidgey tiene un sentido de la orientación muy desarrollado. Es capaz de regresar a su nido, por lejos que se encuentre de las zonas que le resultan familiares.",
    type1: "Normal",
    type2: "Volador",
    favourite: true,
    evolution_to: "Pidgeotto"
  }

  Repo.insert! %Pokemon{
    name: "Rattata",
    description: "Rattata es cauto como él solo. Hasta cuando duerme mueve las orejas para oír todos los ruidos. No es nada delicado a la hora de elegir su hábitat. Cualquier sitio es bueno para cavar su madriguera.",
    type1: "Normal",
    type2: "",
    favourite: false,
    evolution_to: "Raticate"
  }

  Repo.insert! %Pokemon{
    name: "Weedle",
    description: "Weedle tiene un finísimo sentido del olfato. Es capaz de distinguir las hojas que le gustan de las que no le gustan olisqueando un poco con la gran nariz que tiene.",
    type1: "Bicho",
    type2: "Veneno",
    favourite: false,
    evolution_to: "Kakuna"
  }

  Repo.insert! %Pokemon{
    name: "Spearow",
    description: "Pía con tanta fuerza que se le puede oír a 1 km de distancia. Si al agudo chillido le sigue una especie de eco, estaremos oyendo la respuesta de otros Spearow que contestan ante el aviso de peligro.",
    type1: "Normal",
    type2: "Volador",
    favourite: false,
    evolution_to: "Fearow"
  }

  Repo.insert! %Pokemon{
    name: "Nidoran",
    description: "Tiene púas que segregan un veneno muy potente. Se piensa que las desarrolló como protección del cuerpo tan pequeño que tiene. Cuando se enfada, libera una horrible sustancia tóxica por el cuerno.",
    type1: "Veneno",
    type2: "",
    favourite: true,
    evolution_to: "Nidorina"
  }

end
