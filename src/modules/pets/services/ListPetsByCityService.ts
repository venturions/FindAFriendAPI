import { CityNotProvidedError } from '../errors/CityNotProvidedErrors'
import { PetRepository } from '../repositories/PetsRepository'
import { Pet } from 'generated/prisma'

interface ListPetsByCityRequest {
  city: string
  age?: string
  energyLevel?: string
  size?: string
  independenceLevel?: string
}

export class ListPetsByCityService {
  constructor(private petRepository: PetRepository) {}

  async execute(filters: ListPetsByCityRequest): Promise<Pet[]> {
    const { city, age, energyLevel, size, independenceLevel } = filters

    if (!city || city.trim() === '') {
      throw new CityNotProvidedError()
    }

    const pets = await this.petRepository.findByFilters({
      city,
      age,
      energyLevel,
      size,
      independenceLevel,
    })

    return pets
  }
}
