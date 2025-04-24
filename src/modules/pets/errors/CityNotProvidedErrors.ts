export class CityNotProvidedError extends Error {
  constructor() {
    super('City is required')
    this.name = 'CityNotProvidedError'
  }
}
