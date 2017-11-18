import * as React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

export const modalPokedexDefault: IPokedexModalState = { isOpen: false, title: "", body: "", hiddenBtnDelete: true,
  hiddenBtnOk: true, hiddenBtnCancel: true, idPokemonSelected: 0}

export interface IPokedexModalState {
  isOpen: boolean
  title: string
  body: string
  hiddenBtnDelete: boolean
  hiddenBtnOk: boolean
  hiddenBtnCancel: boolean
  idPokemonSelected: number
}

export class PokedexModal extends React.Component<any, IPokedexModalState> {
  constructor(props) {
    super(props)
    this.state = modalPokedexDefault
  }

  componentWillMount() {
    if(this.props.modal) {
      this.setState(this.props.modal)
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.modal) {
      this.setState(nextProps.modal)
    }
  }
  render() {
    return (
      <Modal isOpen={this.state.isOpen} >
        <ModalHeader>{this.state.title}</ModalHeader>
        <ModalBody>{this.state.body}</ModalBody>
        <ModalFooter>
          <Button color="secondary" hidden={this.state.hiddenBtnCancel}
            onClick={() => this.props.modalClose()}>Cancel</Button>
          <Button color="primary" hidden={this.state.hiddenBtnOk}
            onClick={() => this.props.modalClose()}>Ok</Button>
          <Button color="primary" hidden={this.state.hiddenBtnDelete}
            onClick={() => this.props.modalBtnDeleteClick()}>Delete</Button>
        </ModalFooter>
      </Modal>
    )
  }
}
