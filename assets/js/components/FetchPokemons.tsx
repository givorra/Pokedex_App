import * as React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardImg, CardText, CardDeck, CardBody, CardTitle, CardSubtitle, CardHeader,
  Table, Button, Col, ButtonGroup, Form, FormGroup, Input, Label, Header, Row,
  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import IPokemon from '../interfaces/IPokemon'

const modalDefault: IModal = { isOpen: false, title: "", body: "", hiddenBtnDelete: true,
  hiddenBtnOk: true, hiddenBtnCancel: true, idPokemonSelected: 0}
const titleDeletePokemon = "Delete Pokemon"
const bodyDeletePokemon = "¿Are you sure you want to delete this pokemon?"
// The interface for our API response
interface ApiResponse {
  data: IPokemon[]
}

interface IModal {
  isOpen: boolean
  title: string
  body: string
  hiddenBtnDelete: boolean
  hiddenBtnOk: boolean
  hiddenBtnCancel: boolean
  idPokemonSelected: number
}

interface FetchPokemonsState {
  pokemons: IPokemon[]
  pokemons2show: IPokemon[]
  loading: boolean
  name_filter: string
  favourite_filter: boolean
  modal: IModal
  //idPokemonClicked: number
}

export default class FetchPokemons extends React.Component<any, FetchPokemonsState> {
  constructor() {
    super()
    this.state = { pokemons: [],  pokemons2show: [], loading: true, name_filter: '',
      favourite_filter: false, modal: modalDefault}
    this.handleNameFilterChange = this.handleNameFilterChange.bind(this)
    this.handleFavouriteFilterChange = this.handleFavouriteFilterChange.bind(this)
    this.handleNewPokemon = this.handleNewPokemon.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleModalDelete = this.handleModalDelete.bind(this)
    this.handleDeletePokemonClick = this.handleDeletePokemonClick.bind(this)
    this.handlePokemonClick = this.handlePokemonClick.bind(this)
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
    let modal = Object.assign({}, modalDefault);
    modal.isOpen = true
    modal.title = titleDeletePokemon
    modal.body = bodyDeletePokemon
    modal.hiddenBtnDelete = false
    modal.hiddenBtnCancel = false
    modal.idPokemonSelected = idPokemon
    this.setState({modal: modal})
  }

  private handleModalClose() {
    this.setState({modal: modalDefault})
  }

  private handleModalDelete() {
    let modal = Object.assign({}, modalDefault);
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
    /*
    const content = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderPokemonItems()
    const cardHeader = this.renderCardHeader()
    const modal = this.renderModal()
*/
    return (
      <MainCard modalIsOpen={this.state.modal.isOpen} modalTitle={this.state.modal.title}
        modalBody={this.state.modal.body} modalBtnCancelHidden={this.state.modal.hiddenBtnCancel}
        modalBtnCancelClick={this.handleModalClose} modalBtnOkHidden={this.state.modal.hiddenBtnOk}
        modalBtnOkClick={this.handleModalClose} modalBtnDeleteHidden={this.state.modal.hiddenBtnDelete}
        modalBtnDeleteClick={this.handleModalDelete} nameFilterValue={this.state.name_filter}
        nameFilterOnChange={this.handleNameFilterChange} handleNewPokemon={this.handleNewPokemon}
        favouriteFilterValue={this.state.favourite_filter} favouriteFilterOnChange={this.handleFavouriteFilterChange}
        pokemons2show={this.state.pokemons2show} handlePokemonDelete={this.handleDeletePokemonClick}
        handlePokemonView={this.handlePokemonClick} /*idPokemonClicked={this.state.idPokemonClicked}*//>
    )
  }
}

class ModalMain extends React.Component<any, {}> {
  render() {
    return (
      <Modal isOpen={this.props.modalIsOpen} >
        <ModalHeader>{this.props.modalTitle}</ModalHeader>
        <ModalBody>{this.props.modalBody}</ModalBody>
        <ModalFooter>
          <Button color="secondary" hidden={this.props.modalBtnCancelHidden}
            onClick={this.props.modalBtnCancelClick}>Cancel</Button>
          <Button color="primary" hidden={this.props.modalBtnOkHidden}
            onClick={this.props.modalBtnOkClick}>Ok</Button>
          <Button color="primary" hidden={this.props.modalBtnDeleteHidden}
            onClick={this.props.modalBtnDeleteClick}>Deletee</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

class MainCard extends React.Component<any, {}> {
  private getModal() {
    return (
      <ModalMain modalIsOpen={this.props.modalIsOpen} modalTitle={this.props.modalTitle}
        modalBody={this.props.modalBody} modalBtnCancelHidden={this.props.modalBtnCancelHidden}
        modalBtnCancelClick={this.props.modalBtnCancelClick} modalBtnOkHidden={this.props.modalBtnOkHidden}
        modalBtnOkClick={this.props.modalBtnOkClick} modalBtnDeleteHidden={this.props.modalBtnDeleteHidden}
        modalBtnDeleteClick={this.props.modalBtnDeleteClick}/>)
  }
  render() {
    const modal = this.props.modalIsOpen
      ? this.getModal()
      : ""
    return (
      <div>
        <Card >
          <CardImg top width="100%" src="/images/my_pokedex_logo.png" alt="Card image cap"/>
          <HeaderMainCard nameFilterValue={this.props.nameFilterValue}
            nameFilterOnChange={this.props.nameFilterOnChange} handleNewPokemon={this.props.handleNewPokemon}/>
          <CardBody>
            <Label check>
              <Input type="checkbox" checked={this.props.favouriteFilterValue} onChange={this.props.favouriteFilterOnChange}/>
              Show only favourites
            </Label>
            <PokemonDeck handlePokemonView={this.props.handlePokemonView} handlePokemonDelete={this.props.handlePokemonDelete}
             pokemons2show={this.props.pokemons2show} /*idPokemonClicked={this.props.idPokemonClicked}*//>
           <br /><br />
          </CardBody>
        </Card>
      </div>
    )
  }
}

class HeaderMainCard extends React.Component<any, {}> {
  render() {
    return (
      <CardHeader>
        <Row>
          <Col>
            <Label for="pokemonFilterName">Filter by name</Label>
            <Input type="text" name="filterName" id="pokemonFilterName"
              value={this.props.nameFilterValue} onChange={this.props.nameFilterOnChange} />
          </Col>
          <Col>
              <Button color="primary" className="float-right" onClick={this.props.handleNewPokemon}><h1>+</h1></Button>
          </Col>
        </Row>
      </CardHeader>
    )
  }
}

class PokemonDeck extends React.Component<any, {}> {
  render() {
    return (
      <CardDeck>
        {this.props.pokemons2show.map((pokemon, index) =>
          <PokemonCard pokemon={pokemon} key={pokemon.id}
            handlePokemonDelete={this.props.handlePokemonDelete}
            handlePokemonView={this.props.handlePokemonView}
            /*idPokemonClicked={this.props.idPokemonClicked}*/ />
          )
        }
      </CardDeck>
    )
  }
}

class PokemonCard extends React.Component<any, {}> {
  private pcHandlePokemonDelete(pokemonId) {
    //this.props.idPokemonClicked = pokemonId
    this.props.handlePokemonDelete(pokemonId)
  }

  private pcHandlePokemonView(pokemonId) {
    //this.props.idPokemonClicked = pokemonId
    this.props.handlePokemonView(pokemonId)
  }

  render() {
    const pokemon = this.props.pokemon
    return (
      <div className="w-50 p-3">
        <Card outline color="primary">
          <CardImg top width="100%" src="/images/pokeball_card.png" alt="Card image cap" />
          <CardBody>
            <CardTitle>{pokemon.name}</CardTitle>
            <CardText>{pokemon.description}</CardText>
            <ButtonGroup  className="w-100">
              <Button color="danger" className="w-50" >Delete</Button>
              <Col sm={2} />
              <Button color="primary" className="w-50" >View</Button>
            </ButtonGroup>
          </CardBody>
        </Card>
      </div>
    )
  }
}
