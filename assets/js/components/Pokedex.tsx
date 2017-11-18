import * as React from 'react'
import { Card, CardImg, CardBody, Label, Input } from 'reactstrap'
import IPokemon from '../interfaces/IPokemon'
import PokedexHeader from './PokedexHeader'
import PokemonDeck from './PokemonDeck'
import { PokedexModal, IPokedexModalState, modalPokedexDefault } from './PokedexModal'

const titleDeletePokemon = "Delete Pokemon"
const bodyDeletePokemon = "¿Are you sure you want to delete this pokemon?"

// The interface for our API response
interface ApiResponse {
  data: IPokemon[]
}


interface PokedexState {
  pokemons: IPokemon[]
  pokemons2show: IPokemon[]
  loading: boolean
  name_filter: string
  favourite_filter: boolean
  modal: IPokedexModalState
}

export default class Pokedex extends React.Component<any, PokedexState> {
  constructor() {
    super()
    this.state = { pokemons: [],  pokemons2show: [], loading: true, name_filter: '',
      favourite_filter: false, modal: modalPokedexDefault}
  }

  componentWillMount() {
    this.getPokemonsToState()
  }

  private getPokemonsToState() {
    this.setState({loading : true})
    // Get the data from our API.
    fetch('/api/pokemons')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ pokemons: data.data, loading: false })
        this.applyFilters(data.data, this.state.name_filter, this.state.favourite_filter)
      })
  }

  private applyFilters(pokemons, name_filter: string, favourite_filter: boolean) {
    var pokemons2show = this.state.pokemons.filter(function(item) {
      return (item.name.toLowerCase().match(name_filter.toLowerCase()) &&
        (favourite_filter == false || item.favourite == true)
      )})
    this.setState({pokemons2show: pokemons2show})
  }

  private handleNameFilterChange(event) {
    this.setState({name_filter: event.target.value})
    this.applyFilters(this.state.pokemons, event.target.value, this.state.favourite_filter)
  }

  private handleFavouriteFilterChange(event) {
    this.setState({favourite_filter: event.target.checked})
    this.applyFilters(this.state.pokemons, this.state.name_filter, event.target.checked)
  }

  private handlePokemonClick(idPokemon) {
    this.props.history.push('/pokemon-detail/' + idPokemon)
  }

  private handleNewPokemon() {
    this.props.history.push('/create-pokemon')
  }

  private handleDeletePokemonClick(idPokemon) {
    let modal = Object.assign({}, modalPokedexDefault);
    modal.isOpen = true
    modal.title = titleDeletePokemon
    modal.body = bodyDeletePokemon
    modal.hiddenBtnDelete = false
    modal.hiddenBtnCancel = false
    modal.idPokemonSelected = idPokemon
    this.setState({modal: modal})
  }

  private modalClose() {
    this.setState({modal: modalPokedexDefault})
  }

  private deletePokemon() {
    let modal = Object.assign({}, modalPokedexDefault);
    modal.title = titleDeletePokemon
    modal.isOpen = true
    modal.hiddenBtnOk = false

    fetch('/api/pokemons/' + this.state.modal.idPokemonSelected, { method: "DELETE"})
      .then((response) => {
        if(response.ok)
        {
          modal.body = "Succes!"
          this.getPokemonsToState()
        }
        else {
          modal.body = "Error: " + response.status + " " + response.statusText
        }
        this.setState({ modal: modal})
      })
  }

  public render(): JSX.Element {
    return (
      <div>
        <PokedexModal modal={this.state.modal} modalBtnDeleteClick={() => this.deletePokemon()}
          modalClose={() => this.modalClose()}/>
        <Card >
          <CardImg top width="100%" src="/images/my_pokedex_logo.png" alt="Card image cap"/>
          <PokedexHeader nameFilterValue={this.state.name_filter}
            nameFilterOnChange={(event) => this.handleNameFilterChange(event)}
            handleNewPokemon={() => this.handleNewPokemon()}/>
          <CardBody>
            <Label check>
              <Input type="checkbox" checked={this.state.favourite_filter}
                onChange={(event) => this.handleFavouriteFilterChange(event)}/>
              Show only favourites
            </Label>
            <PokemonDeck handlePokemonView={(idPokemon) => this.handlePokemonClick(idPokemon)}
              handlePokemonDelete={(idPokemon) => this.handleDeletePokemonClick(idPokemon)}
              pokemons2show={this.state.pokemons2show} />
           <br /><br />
          </CardBody>
        </Card>
      </div>
    )
  }
}
