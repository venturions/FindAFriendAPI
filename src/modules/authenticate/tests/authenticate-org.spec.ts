import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgRepository } from '@/modules/orgs/repositories/InMemoryOrgRepository'
import { AuthenticateOrgService } from '../services/authenticateService'
import { CreateOrgService } from '@/modules/orgs/services/CreateOrgService'

describe('Authenticate', () => {
  let inMemoryOrgRepository: InMemoryOrgRepository
  let authenticateOrgService: AuthenticateOrgService
  let createOrgService: CreateOrgService

  beforeEach(() => {
    inMemoryOrgRepository = new InMemoryOrgRepository()
    authenticateOrgService = new AuthenticateOrgService(inMemoryOrgRepository)
    createOrgService = new CreateOrgService(inMemoryOrgRepository)
  })

  it('should authenticate an organization with valid credentials', async () => {
    const orgData = {
      name: 'Test Organization',
      email: 'test@example.com',
      password: '123456',
      address: '123 Test Street',
      whatsapp: '1234567890',
      cep: '12345-678',
    }

    await createOrgService.execute(orgData)

    const { org } = await authenticateOrgService.execute({
      email: orgData.email,
      password: orgData.password,
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not authenticate an organization with an invalid email', async () => {
    await expect(
      authenticateOrgService.execute({
        email: 'invalid@example.com',
        password: '123456',
      }),
    ).rejects.toThrowError('Invalid email or password')
  })

  it('should not authenticate an organization with an invalid password', async () => {
    // Criação de uma organização para autenticação
    const orgData = {
      name: 'Test Organization',
      email: 'test@example.com',
      password: '123456',
      address: '123 Test Street',
      whatsapp: '1234567890',
      cep: '12345-678',
    }

    await createOrgService.execute(orgData)

    // Tentativa de autenticação com senha incorreta
    await expect(
      authenticateOrgService.execute({
        email: orgData.email,
        password: 'wrongpassword',
      }),
    ).rejects.toThrowError('Invalid email or password')
  })
})
