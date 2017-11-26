import * as React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

export const modalPokedexDefault: IPokedexModalState = { isOpen: false, title: "", body: "", hiddenBtnDelete: true,
  hiddenBtnOk: true, hiddenBtnCancel: true, idPokemonSelected: 0, disabledBtnOk: true,
  disabledBtnCancel: true, disabledBtnDelete: true}

export interface IPokedexModalState {
  isOpen: boolean
  title: string
  body: string
  hiddenBtnDelete: boolean
  hiddenBtnOk: boolean
  hiddenBtnCancel: boolean
  disabledBtnDelete: boolean
  disabledBtnOk: boolean
  disabledBtnCancel: boolean
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

  private handlePokemonDelete() {
    this.setState({ disabledBtnCancel: true, disabledBtnDelete: true })
    this.props.modalBtnDeleteClick()
  }
  render() {
    return (
      <Modal isOpen={this.state.isOpen} >
        <ModalHeader>{this.state.title}</ModalHeader>
        <ModalBody>{this.state.body}</ModalBody>
        <ModalFooter>
          <Button color="secondary" hidden={this.state.hiddenBtnCancel}
            onClick={() => this.props.modalClose()} disabled={this.state.disabledBtnCancel}>
              Cancel
          </Button>
          <Button color="primary" hidden={this.state.hiddenBtnOk}
            onClick={() => this.props.modalClose()} disabled={this.state.disabledBtnOk}>
              Ok
          </Button>
          <Button color="primary" hidden={this.state.hiddenBtnDelete}
            onClick={() => this.handlePokemonDelete()} disabled={this.state.disabledBtnDelete}>
              Delete
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}
