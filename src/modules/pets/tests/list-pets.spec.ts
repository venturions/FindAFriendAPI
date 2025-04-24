import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPetRepository } from '../repositories/inMemoryPetRepository'
import { ListPetsByCityService } from '../services/ListPetsByCityService'
import { CityNotProvidedError } from '../errors/CityNotProvidedErrors'

describe('List Pets Service', () => {
  let inMemoryPetRepository: InMemoryPetRepository
  let listPetsByCityService: ListPetsByCityService

  beforeEach(() => {
    inMemoryPetRepository = new InMemoryPetRepository()
    listPetsByCityService = new ListPetsByCityService(inMemoryPetRepository)
  })

  it('should list all pets available in a specific city', async () => {
    await inMemoryPetRepository.create({
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

    await inMemoryPetRepository.create({
      name: 'Max',
      age: 'Adulto',
      size: 'Médio',
      energyLevel: 'Média',
      independenceLevel: 'Alta',
      environment: 'Ambiente pequeno',
      description: 'Um cachorro calmo e amigável.',
      photos: ['https://example.com/photo2.jpg'],
      adoptionRequirements: ['Deve ter tempo para passeios'],
      city: 'São Paulo',
      orgId: 'org_456',
    })

    await inMemoryPetRepository.create({
      name: 'Luna',
      age: 'Filhote',
      size: 'Grande',
      energyLevel: 'Alta',
      independenceLevel: 'Baixa',
      environment: 'Ambiente amplo',
      description: 'Uma cadela cheia de energia.',
      photos: ['https://example.com/photo3.jpg'],
      adoptionRequirements: ['Deve ter espaço amplo'],
      city: 'Rio de Janeiro',
      orgId: 'org_789',
    })

    const pets = await listPetsByCityService.execute({ city: 'São Paulo' })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Buddy', city: 'São Paulo' }),
        expect.objectContaining({ name: 'Max', city: 'São Paulo' }),
      ]),
    )
  })

  it('should return an empty list if no pets are available in the city', async () => {
    const pets = await listPetsByCityService.execute({ city: 'Curitiba' })

    expect(pets).toHaveLength(0)
  })

  it('should throw an error if no city is provided', async () => {
    await expect(
      listPetsByCityService.execute({ city: '' }),
    ).rejects.toBeInstanceOf(CityNotProvidedError)
  })
})
