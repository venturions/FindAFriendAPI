import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgRepository } from '../repositories/InMemoryOrgRepository'
import { OrganizationAlreadyExistsError } from '../errors/OrganizationAlreadyExistsError'
import { CreateOrgService } from '../services/CreateOrgService'

describe('Create Organization Service', () => {
  let inMemoryOrgRepository: InMemoryOrgRepository
  let createOrgService: CreateOrgService

  // Antes de cada teste, inicializamos o repositório em memória e o serviço
  beforeEach(() => {
    inMemoryOrgRepository = new InMemoryOrgRepository()
    createOrgService = new CreateOrgService(inMemoryOrgRepository)
  })

  it('should create a new organization', async () => {
    // Dados de entrada simulados
    const orgData = {
      name: 'Test Organization',
      email: 'test@example.com',
      password: '123456',
      address: '123 Test Street',
      whatsapp: '1234567890',
      cep: '12345-678',
    }

    // Executa o serviço
    await createOrgService.execute(orgData)

    // Verifica se a organização foi criada no repositório
    const createdOrg = await inMemoryOrgRepository.findByEmail(orgData.email)

    expect(createdOrg).not.toBeNull()
    expect(createdOrg?.name).toBe(orgData.name)
    expect(createdOrg?.email).toBe(orgData.email)
  })

  it('should not allow creating an organization with an existing email', async () => {
    // Dados de entrada simulados
    const orgData = {
      name: 'Test Organization',
      email: 'test@example.com',
      password: '123456',
      address: '123 Test Street',
      whatsapp: '1234567890',
      cep: '12345-678',
    }

    // Cria a primeira organização
    await createOrgService.execute(orgData)

    // Tenta criar outra organização com o mesmo e-mail
    await expect(createOrgService.execute(orgData)).rejects.toBeInstanceOf(
      OrganizationAlreadyExistsError,
    )
  })
})
