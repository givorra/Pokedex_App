import * as React from 'react'
import { Table, Button, ButtonGroup, Col, Row, Label, Modal, ModalHeader, ModalBody,
  ModalFooter, FormGroup, Card, CardImg, CardText, CardDeck, CardBody, CardTitle, CardSubtitle }
  from 'reactstrap'

import IPokemon from '../interfaces/IPokemon'
import PokemonForm from './PokemonForm'
import { PokemonDetailModal, PokemonDetailModalState, pokemonDetailModalDefault } from './PokemonDetailModal'


const titleSavePokemon = "Save Pokemon"
const bodySavePokemon = "¿Are you sure you want to save data?"


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
  pokemon: IPokemon
  loading: boolean
  mode: Mode
  errors: IErrors
  modal: PokemonDetailModalState
}

export default class PokemonDetail extends React.Component <any, IPokemonsDetailState> {
  constructor(props) {
      super(props)

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
        errors: { name: "", type1: "", description: ""},
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

  private persistData() {
    let modal = Object.assign({}, pokemonDetailModalDefault);
    modal.title = titleSavePokemon
    modal.isOpen = true
    modal.hiddenBtnOk = false

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
    let haveErrors = false
    fetch(route,
      {
        method: method,
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
    }).catch((data) => {

    });
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
    //console.log(this.state.pokemon)
    return (
      <div>
        <PokemonDetailModal modal={this.state.modal} setDefaultModal={this.setDefaultModal.bind(this)}
          goBack={this.handleGoBack.bind(this)} persistData={this.persistData.bind(this)}/>
        <Card>
          <CardImg top width="100%" src="/images/pokeball_detail_card.png" alt="Card image cap" />
          <CardBody>
            <PokemonForm pokemon={this.state.pokemon} onBack={this.handleGoBack.bind(this)} onSubmit={(pokemon) => this.handleSaveData(pokemon)} />
          </CardBody>
          <br/><br/>
        </Card>
      </div>
    )
  }
}
