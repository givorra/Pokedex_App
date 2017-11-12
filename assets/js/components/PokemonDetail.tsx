import * as React from 'react'
import { Table, Button, ButtonGroup, Form, Col, FormGroup, Label, Input, FormText } from 'reactstrap'
import Pokemon from '../interfaces/IPokemon'

enum Mode {
    POST = 0,
    PUT = 1,
}

interface IPokemonsDetailState {
  pokemon: Pokemon
  loading: boolean
  mode: Mode
}

export default class PokemonDetail extends React.Component <any, IPokemonsDetailState> {
  constructor(props: number) {
      super(props)
      this.handleName = this.handleName.bind(this)
      this.handleType1 = this.handleType1.bind(this)
      this.handleType2 = this.handleType2.bind(this)
      this.handleFavourite = this.handleFavourite.bind(this)
      this.handleDescription = this.handleDescription.bind(this)
      this.handleEvolutionTo = this.handleEvolutionTo.bind(this)
      this.handleSaveData = this.handleSaveData.bind(this)
      this.handleGoBack = this.handleGoBack.bind(this)

      if(this.props.match.url.match("pokemon-detail"))
        var mode = Mode.PUT
      else
        var mode = Mode.POST

      var initialState: IPokemonsDetailState = {
        pokemon: {
          id: this.props.match.params.id,
          name: "",
          description: "",
          evolution_to: "",
          favourite: false,
          type1: "",
          type2: ""
          },
        loading: false,
        mode: mode
      }
      this.state = initialState
  }

  componentWillMount() {
    // Get the data from our API.
    if (this.state.mode == Mode.PUT)
    {
      this.setState({loading : true})
      fetch('/api/pokemons/' + this.state.pokemon.id)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ pokemon: data.data, loading: false })
        })
    }
  }

  private renderPokemonFields() {
    return (
      <Form>
        <FormGroup row>
          <Label for="pokemonName">Name</Label>
          <Input type="text" name="name" id="pokemonName" value={this.state.pokemon.name}/>
        </FormGroup>
        <FormGroup row>
          <Label for="pokemonType1">Type 1</Label>
          <Input type="text" name="name" id="pokemonName" value={this.state.pokemon.type1}/>
        </FormGroup>
        <FormGroup row>
          <Label for="pokemonType2">Type 2</Label>
          <Input type="text" name="name" id="pokemonName" value={this.state.pokemon.type2}/>
        </FormGroup>
        <FormGroup row>
          <Label for="pokemonEvolutionTo">Evolution to</Label>
          <Input type="text" name="name" id="pokemonName" value={this.state.pokemon.evolution_to}/>
        </FormGroup>
        <FormGroup row>
          <Label for="pokemonDescription">Description</Label>
          <Input type="textarea" name="description" id="pokemonDescription" value={this.state.pokemon.description} />
        </FormGroup>
        <ButtonGroup>
          <Button color="primary" disabled={this.state.loading} onClick={this.handleGoBack}>Go Back</Button>
          <Button color="primary" disabled={this.state.loading} onClick={this.handleSaveData}>Save data</Button>
        </ButtonGroup>
      </Form>
    )
  }

  private handleName(event) {
    let pokemon = this.state.pokemon
    pokemon.name = event.target.value
    this.setState({ pokemon: pokemon })
  }

  private handleType1(event) {
    let pokemon = this.state.pokemon
    pokemon.type1 = event.target.value
    this.setState({ pokemon: pokemon })

  }
  private handleType2(event) {
    let pokemon = this.state.pokemon
    pokemon.type2 = event.target.value
    this.setState({ pokemon: pokemon })

  }
  private handleFavourite(event) {
    let pokemon = this.state.pokemon
    pokemon.favourite = event.target.checked
    this.setState({ pokemon: pokemon })

  }
  private handleDescription(event) {
    let pokemon = this.state.pokemon
    pokemon.description = event.target.value
    this.setState({ pokemon: pokemon })

  }
  private handleEvolutionTo(event) {
    let pokemon = this.state.pokemon
    pokemon.evolution_to = event.target.value
    this.setState({ pokemon: pokemon })

  }

  private persistData() {
    var route = '/api/pokemons'
    if(this.state.mode == Mode.PUT)
    {
      var method = "PUT"
      route = route + "/" + this.state.pokemon.id
    }
    else
    {
      var method = "POST"
    }

    const headers = new Headers()
    //headers.append("Accept", "application/json")
    headers.append('Content-Type', 'application/json')

    fetch(route,
      {
        method: method,
        headers: headers,
        body: JSON.stringify({"pokemon": this.state.pokemon})
        })
      .then((response) => response.json())
      //.then((data) =>  alert( JSON.stringify( data )))
  }

  private handleSaveData() {
    this.persistData()
    this.handleGoBack()
  }

  private handleGoBack() {
    this.props.history.push('/')
  }

  render(): JSX.Element {
    const content = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderPokemonFields()
    return (
      <div>
        <h1>Pokemon Detail</h1>
        <form>
          {content}
        </form>
      </div>
    )
  }
}
