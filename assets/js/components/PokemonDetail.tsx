import * as React from 'react'
import Pokemon from './FetchPokemons'
import { Table, Button } from 'reactstrap'

export default class PokemonDetail extends React.Component <Pokemon, {}> {
  constructor(props: Pokemon) {
      super(props);
  }

  render(){
    return (
      <div>
        <h1>Pokemon Detail</h1>
        <form>
          <Table>
            <tr>
              <th> <label> (*) Name: </label> </th>
              <th> <input name="name" type="text"/> </th>
            </tr>
            <tr>
              <th> <label> (*) Type 1: </label> </th>
              <th> <input name="type1" type="text"/> </th>
            </tr>
            <tr>
              <th> <label> Type 2: </label> </th>
              <th> <input name="type2" type="text"/> </th>
            </tr>
            <tr>
              <th> <label> Evolution to: </label> </th>
              <th> <input name="evolution_to" type="text"/> </th>
            </tr>
            <tr>
              <th> <label> Is favourite </label> </th>
              <th> <input name="favourite" type="Checkbox"/> </th>
            </tr>
            <tr>
              <th> <label> (*) Description </label> </th>
              <th> <textarea name="description"/> </th>
            </tr>
          </Table>
          <Button color="primary">Save data</Button>
        </form>
      </div>
      )
    }
}
