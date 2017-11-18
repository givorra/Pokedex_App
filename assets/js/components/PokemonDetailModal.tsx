import * as React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

export const pokemonDetailModalDefault: IPokemonDetailModalState = { isOpen: false,
  title: "", body: "", hiddenBtnSave: true, hiddenBtnOk: true, hiddenBtnCancel: true}

export interface IPokemonDetailModalState {
  isOpen: boolean
  title: string
  body: string
  hiddenBtnSave: boolean
  hiddenBtnOk: boolean
  hiddenBtnCancel: boolean
}

export class PokemonDetailModal extends React.Component<any, IPokemonDetailModalState> {
  constructor(props) {
    super(props)
    this.state = pokemonDetailModalDefault
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

  private handleModalClose() {
    this.props.setDefaultModal()
  }

  private handleOnBack() {
    this.props.goBack()
  }

  private handleModalSave() {
    this.props.persistData()
  }

  public render(): JSX.Element {
    return (
      <Modal isOpen={this.state.isOpen} >
        <ModalHeader>{this.state.title}</ModalHeader>
        <ModalBody>{this.state.body}</ModalBody>
        <ModalFooter>
          <Button color="secondary" hidden={this.state.hiddenBtnCancel}
            onClick={() => this.handleModalClose()}>Cancel</Button>
          <Button color="primary" hidden={this.state.hiddenBtnOk}
            onClick={() => this.handleOnBack()}>Ok</Button>
          <Button color="primary" hidden={this.state.hiddenBtnSave}
            onClick={() => this.handleModalSave()}>Save</Button>
        </ModalFooter>
      </Modal>
    )
  }
}
