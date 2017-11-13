import * as React from 'react'
import { Table, Button, ButtonGroup, Col, Label } from 'reactstrap'
import { AvForm, AvField, AvInput, AvGroup } from 'availity-reactstrap-validation'
import Pokemon from '../interfaces/IPokemon'

enum Mode {
    POST = 0,
    PUT = 1,
}

interface IErrors {
  name: string
  type1: string
  description: string
}

interface IPokemonsDetailState {
  pokemon: Pokemon
  loading: boolean
  mode: Mode
  errors: IErrors
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
        mode: mode,
        errors: { name: "", type1: "", description: ""}
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
      <AvForm>
        <AvField name="name" label="Name" required onChange={this.handleName} value={this.state.pokemon.name}
          minLength="4" maxLength="24" helpMessage="  (*) Between 4 - 24 characters"/>
        <AvField name="type1" label="Type 1" required onChange={this.handleType1} value={this.state.pokemon.type1}
          helpMessage="  (*)"/>
        <AvField name="type2" label="Type 2" onChange={this.handleType2} value={this.state.pokemon.type2} />
        <AvField name="evolution_to" label="Evolution to" onChange={this.handleEvolutionTo} value={this.state.pokemon.evolution_to} />
        <AvField type="textarea" name="description" label="Description" onChange={this.handleDescription}
          required helpMessage="  (*) Min. 30 characters" minLength="30" value={this.state.pokemon.description} />
        <AvGroup>
          <Label check >
            <AvInput type="checkbox" name="favourite" onChange={this.handleFavourite} value={this.state.pokemon.favourite}/>
            Mark as favourite
          </Label>
          <br /><br />
        </AvGroup>
        <ButtonGroup>
          <Button color="secondary" disabled={this.state.loading} onClick={this.handleGoBack}>Go Back</Button>
          <Col sm={2}>
            <Button color="primary" disabled={this.state.loading} onClick={this.handleSaveData}>Save data</Button>
          </Col>
        </ButtonGroup>
      </AvForm>
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
        {content}
      </div>
    )
  }
}
