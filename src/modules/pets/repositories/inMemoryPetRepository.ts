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
}
