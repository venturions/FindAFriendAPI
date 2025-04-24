import { CityNotProvidedError } from '../errors/CityNotProvidedErrors'
import { PetRepository } from '../repositories/PetsRepository'
import { Pet } from 'generated/prisma'

interface ListPetsByCityRequest {
  city: string
}

export class ListPetsByCityService {
  constructor(private petRepository: PetRepository) {}

  async execute({ city }: ListPetsByCityRequest): Promise<Pet[]> {
    if (!city || city.trim() === '') {
      throw new CityNotProvidedError()
    }

    const pets = await this.petRepository.findByCity(city)
    return pets
  }
}
