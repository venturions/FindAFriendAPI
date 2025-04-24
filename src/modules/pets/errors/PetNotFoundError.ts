export class PetNotFoundError extends Error {
  constructor() {
    super('Pet not found')
    this.name = 'PetNotFoundError'
  }
}
