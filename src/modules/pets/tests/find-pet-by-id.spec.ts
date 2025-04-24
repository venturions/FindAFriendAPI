import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPetRepository } from '../repositories/inMemoryPetRepository'
import { GetPetDetailsService } from '../services/GetPetDetailsService'
import { PetNotFoundError } from '../errors/PetNotFoundError'

describe('Get Pet Details Service', () => {
  let inMemoryPetRepository: InMemoryPetRepository
  let getPetDetailsService: GetPetDetailsService

  beforeEach(() => {
    inMemoryPetRepository = new InMemoryPetRepository()
    getPetDetailsService = new GetPetDetailsService(inMemoryPetRepository)
  })

  it('should return pet details when pet exists', async () => {
    const pet = await inMemoryPetRepository.create({
      name: 'Buddy',
      age: 'Filhote',
      size: 'Pequeno',
      energyLevel: 'Alta',
      independenceLevel: 'Média',
      environment: 'Ambiente amplo',
      description: 'Um cachorro amigável e cheio de energia.',
      photos: ['https://example.com/photo1.jpg'],
      adoptionRequirements: ['Deve ter espaço amplo'],
      city: 'São Paulo',
      orgId: 'org_123',
    })

    const result = await getPetDetailsService.execute({ id: pet.id })

    expect(result.pet).toEqual(
      expect.objectContaining({
        id: pet.id,
        name: pet.name,
        age: pet.age,
        size: pet.size,
        energyLevel: pet.energyLevel,
        independenceLevel: pet.independenceLevel,
        environment: pet.environment,
        description: pet.description,
        photos: pet.photos,
        adoptionRequirements: pet.adoptionRequirements,
        city: pet.city,
        orgId: pet.orgId,
      }),
    )
  })

  it('should throw an error when pet does not exist', async () => {
    await expect(
      getPetDetailsService.execute({ id: 'non-existent-id' }),
    ).rejects.toBeInstanceOf(PetNotFoundError)
  })
})
