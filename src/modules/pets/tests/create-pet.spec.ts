import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgRepository } from '@/modules/orgs/repositories/InMemoryOrgRepository'
import { CreatePetService } from '../services/CreatePetService'
import { OrganizationNotFoundError } from '@/shared/errors/OrganizationNotFoundError'
import { InMemoryPetRepository } from '../repositories/inMemoryPetRepository'

describe('Create Pet Service', () => {
  let inMemoryPetRepository: InMemoryPetRepository
  let inMemoryOrgRepository: InMemoryOrgRepository
  let createPetService: CreatePetService

  beforeEach(() => {
    inMemoryPetRepository = new InMemoryPetRepository()
    inMemoryOrgRepository = new InMemoryOrgRepository()
    createPetService = new CreatePetService(
      inMemoryPetRepository,
      inMemoryOrgRepository,
    )
  })

  it('should create a pet successfully', async () => {
    const org = await inMemoryOrgRepository.create({
      name: 'Test Organization',
      email: 'test@example.com',
      address: '123 Test Street',
      whatsapp: '1234567890',
      cep: '12345-678',
      password_hash: 'hashed-password',
    })

    const petData = {
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
      orgId: org.id,
    }

    const { pet } = await createPetService.execute(petData)

    expect(pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: petData.name,
        age: petData.age,
        size: petData.size,
        energyLevel: petData.energyLevel,
        independenceLevel: petData.independenceLevel,
        environment: petData.environment,
        description: petData.description,
        photos: petData.photos,
        adoptionRequirements: petData.adoptionRequirements,
        city: petData.city,
        orgId: petData.orgId,
      }),
    )
  })

  it('should throw an error if organization does not exist', async () => {
    const petData = {
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
      orgId: 'non-existent-org-id',
    }

    await expect(createPetService.execute(petData)).rejects.toBeInstanceOf(
      OrganizationNotFoundError,
    )
  })
})
