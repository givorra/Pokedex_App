// The interface for our pokemon model.
export default interface IPokemon {
  id: number
  name: string
  description: string
  evolution_to: string
  favourite: boolean
  type1: string
  type2: string
}
