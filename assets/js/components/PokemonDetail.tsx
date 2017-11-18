import * as React from 'react'
import { Card, CardImg, CardBody } from 'reactstrap'
import IPokemon from '../interfaces/IPokemon'
import PokemonForm from './PokemonForm'
import { PokemonDetailModal, IPokemonDetailModalState, pokemonDetailModalDefault } from './PokemonDetailModal'

const titleSavePokemon = "Save Pokemon"
const bodySavePokemon = "¿Are you sure you want to save data?"

enum Mode {
    POST = "POST",
    PUT = "PUT"
}

interface IPokemonsDetailState {
  pokemon: IPokemon
  loading: boolean
  mode: Mode
  modal: IPokemonDetailModalState
}

export default class PokemonDetail extends React.Component <any, IPokemonsDetailState> {
  constructor(props) {
      super(props)

      if(this.props.match.url.match("pokemon-detail"))
        var mode = Mode.PUT
      else // Cualquier acceso que no sea al deteal
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
        modal: pokemonDetailModalDefault
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

  private getApiResourceByMode() {
    if(this.state.mode == Mode.PUT)
    {
      return "/api/pokemons/" + this.state.pokemon.id
    }
    else if(this.state.mode == Mode.POST)
    {
      return "/api/pokemons/"
    }
  }

  private persistData() {
    let modal = Object.assign({}, pokemonDetailModalDefault);
    modal.title = titleSavePokemon
    modal.isOpen = true
    modal.hiddenBtnOk = false
    const apiResource = this.getApiResourceByMode()

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    //headers.append("Accept", "application/json")

    let haveErrors = false
    fetch(apiResource,
      {
        method: this.state.mode,
        headers: headers,
        body: JSON.stringify({"pokemon": this.state.pokemon})
        })
      .then((response) => {
        if (!response.ok) {
          response.json().then((data) => {
              for(let error in data.error)
              {
                modal.body += "\n > " + error + ": " + data.errors[error]
                this.setState({modal: modal})
              }
          })
            //throw Error(response.json());
        }
        return response.json();
    }).then((data) => {
      modal.body = "Success!"
      this.setState({modal: modal})
    })
  }

  private handleSaveData(pokemon: IPokemon) {
    let modal = Object.assign({}, pokemonDetailModalDefault);
    modal.isOpen = true
    modal.title = titleSavePokemon
    modal.body = bodySavePokemon
    modal.hiddenBtnSave = false
    modal.hiddenBtnCancel = false
    this.setState({modal: modal, pokemon: pokemon})

  }

  private handleGoBack() {
    this.props.history.push('/')
  }

  private setDefaultModal() {
    this.setState({modal: pokemonDetailModalDefault})
  }

  public render(): JSX.Element {
    return (
      <div>
        <PokemonDetailModal modal={this.state.modal} setDefaultModal={this.setDefaultModal.bind(this)}
          goBack={this.handleGoBack.bind(this)} persistData={this.persistData.bind(this)}/>
        <Card>
          <CardImg top src="/images/pokeball_detail_card.png" alt="Card image cap" />
          <CardBody>
            <PokemonForm pokemon={this.state.pokemon} onBack={this.handleGoBack.bind(this)} onSubmit={(pokemon) => this.handleSaveData(pokemon)} />
          </CardBody>
          <br/><br/>
        </Card>
      </div>
    )
  }
}
