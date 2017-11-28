import * as React from 'react'
import {Row, Col, Label, FormGroup, Button} from 'reactstrap'
import IPokemon from '../interfaces/IPokemon'
import { AvForm, AvField, AvInput, AvGroup } from 'availity-reactstrap-validation'

interface PokemonFormState {
  pokemon: IPokemon
}

export default class PokemonForm extends React.Component<any, PokemonFormState> {
  constructor(props) {
    super(props)
    let initialState: PokemonFormState = {
      pokemon: {
        id: 0,
        name: "",
        description: "",
        evolution_to: "",
        favourite: false,
        type1: "",
        type2: ""
        }
    }
    this.state = initialState
  }

  componentWillMount() {
    if(this.props.pokemon) {
      this.setState({pokemon: this.props.pokemon})
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.pokemon) {
      this.setState({pokemon: nextProps.pokemon})
    }
  }

  public render(): JSX.Element {
    let pokemon = this.state.pokemon;
    return (
      <AvForm onValidSubmit={() => this.props.onSubmit(this.state.pokemon)}>
        <AvField name="name" label="Name" required
          onBlur={(event) => this.state.pokemon.name = event.target.value}
          value={this.state.pokemon.name} minLength="4" maxLength="24"
          helpMessage="  (*) Between 4 - 24 characters"/>
        <Row>
          <Col>
            <Label>Type/s</Label>
          </Col>
        </Row>
        <Row>
          <Col>
            <AvField name="type1"  required
              onBlur={(event) => this.state.pokemon.type1 = event.target.value}
              value={this.state.pokemon.type1} helpMessage="  (*)"/>
          </Col>
          <Col>
            <AvField name="type2" label=""
              onBlur={(event) => this.state.pokemon.type2 = event.target.value}
              value={this.state.pokemon.type2} />
          </Col>
        </Row>
        <AvField name="evolution_to" label="Evolution to"
          onBlur={(event) => this.state.pokemon.evolution_to = event.target.value}
          value={this.state.pokemon.evolution_to} />
        <AvField type="textarea" name="description" label="Description"
          onBlur={(event) => this.state.pokemon.description = event.target.value}
          required helpMessage="  (*) Min. 30 characters" minLength="30"
          value={this.state.pokemon.description} />
        <AvGroup>
          <Label check >
            <AvInput type="checkbox" name="favourite"
              onBlur={(event) => this.state.pokemon.favourite = event.target.checked}
              checked={this.state.pokemon.favourite}/>
            Mark as favourite
          </Label>
          <br />
        </AvGroup>
        <FormGroup className="p-3">
          <Row>
            <Button color="secondary" onClick={() => this.props.onBack()}>Go Back</Button>
            <Col lg={2}>
              <Button color="primary">Save data</Button>
            </Col>
          </Row>
        </FormGroup>
      </AvForm>
    )
  }
}
