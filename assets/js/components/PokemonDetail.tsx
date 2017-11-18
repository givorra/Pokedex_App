import * as React from 'react'
import { Table, Button, ButtonGroup, Col, Row, Label, Modal, ModalHeader, ModalBody,
  ModalFooter, FormGroup, Card, CardImg, CardText, CardDeck, CardBody, CardTitle, CardSubtitle }
  from 'reactstrap'

import IPokemon from '../interfaces/IPokemon'
import PokemonForm from './PokemonForm'

const modalDefault: IModal = { isOpen: false, title: "", body: "", hiddenBtnSave: true,
  hiddenBtnOk: true, hiddenBtnCancel: true}
const titleSavePokemon = "Save Pokemon"
const bodySavePokemon = "¿Are you sure you want to save data?"

interface IModal {
  isOpen: boolean
  title: string
  body: string
  hiddenBtnSave: boolean
  hiddenBtnOk: boolean
  hiddenBtnCancel: boolean
}

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
  modal: IModal
}

export default class PokemonDetail extends React.Component <any, IPokemonsDetailState> {
  constructor(props: number) {
      super(props)
      this.handleModal = this.handleModalClose.bind(this);
      this.handleModalClose = this.handleModalClose.bind(this);
      this.handleModalSave = this.handleModalSave.bind(this);

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
        modal: modalDefault
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
    let modal = Object.assign({}, modalDefault);
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
    let modal = Object.assign({}, modalDefault);
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

  private handleModalClose() {
    this.setState({modal: modalDefault})
  }

  private handleModalSave() {
    this.persistData()
  }

  private renderModal() {
    return (
      <Modal isOpen={this.state.modal.isOpen} >
        <ModalHeader>{this.state.modal.title}</ModalHeader>
        <ModalBody>{this.state.modal.body}</ModalBody>
        <ModalFooter>
          <Button color="secondary" hidden={this.state.modal.hiddenBtnCancel}
            onClick={this.handleModalClose}>Cancel</Button>
          <Button color="primary" hidden={this.state.modal.hiddenBtnOk}
            onClick={this.handleGoBack.bind(this)}>Ok</Button>
          <Button color="primary" hidden={this.state.modal.hiddenBtnSave}
            onClick={this.handleModalSave}>Save</Button>
        </ModalFooter>
      </Modal>
    )
  }
/*
  private renderForm() {
    return (
      <AvForm onValidSubmit={this.handleSaveData}>
        <AvField name="name" label="Name" required onChange={this.handleName} value={this.state.pokemon.name}
          minLength="4" maxLength="24" helpMessage="  (*) Between 4 - 24 characters"/>
        <Row>
          <Col>
            <Label>Type/s</Label>
          </Col>
        </Row>
        <Row>
          <Col>
            <AvField name="type1"  required onChange={this.handleType1} value={this.state.pokemon.type1}
              helpMessage="  (*)"/>
            </Col>
            <Col>
              <AvField name="type2" label="" onChange={this.handleType2} value={this.state.pokemon.type2} />
            </Col>
        </Row>
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
          <FormGroup>
            <Row>
              <Button color="secondary" disabled={this.state.loading} onClick={this.handleGoBack}>Go Back</Button>
              <Col sm={2}>
                <Button color="primary" disabled={this.state.loading}>Save data</Button>
              </Col>
            </Row>
          </FormGroup>
      </AvForm>
    )
  }
*/
  render(): JSX.Element {
    const modal = this.renderModal()
    //console.log(this.state.pokemon)
    return (
      <div>
        {modal}
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
