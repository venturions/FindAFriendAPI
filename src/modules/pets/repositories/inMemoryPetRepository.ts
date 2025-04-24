import { Pet, Prisma } from 'generated/prisma'
import { PetRepository } from './PetsRepository'

export class InMemoryPetRepository implements PetRepository {
  private pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const photos = Array.isArray(data.photos)
      ? data.photos
      : (data.photos?.set ?? [])

    const adoptionRequirements = Array.isArray(data.adoptionRequirements)
      ? data.adoptionRequirements
      : (data.adoptionRequirements?.set ?? [])

    const pet: Pet = {
      id: 'generated-id',
      name: data.name,
      age: data.age,
      size: data.size,
      energyLevel: data.energyLevel,
      independenceLevel: data.independenceLevel,
      environment: data.environment,
      description: data.description,
      city: data.city,
      orgId: 'generated-id',
      createdAt: new Date(),
      photos,
      adoptionRequirements,
    }

    this.pets.push(pet)
    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.pets.find((pet) => pet.id === id) || null
    return pet
  }

  async findByCity(city: string): Promise<Pet[]> {
    return this.pets.filter(
      (pet) => pet.city.toLowerCase() === city.toLowerCase(),
    )
  }

  async findByFilters(filters: {
    city: string
    age?: string
    energyLevel?: string
    size?: string
    independenceLevel?: string
  }): Promise<Pet[]> {
    const { city, age, energyLevel, size, independenceLevel } = filters

    return this.pets.filter((pet) => {
      return (
        pet.city.toLowerCase() === city.toLowerCase() &&
        (!age || pet.age === age) &&
        (!energyLevel || pet.energyLevel === energyLevel) &&
        (!size || pet.size === size) &&
        (!independenceLevel || pet.independenceLevel === independenceLevel)
      )
    })
  }
}
