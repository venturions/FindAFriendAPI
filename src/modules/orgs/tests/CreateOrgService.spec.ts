import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgRepository } from '../repositories/InMemoryOrgRepository'
import { OrganizationAlreadyExistsError } from '../errors/OrganizationAlreadyExistsError'
import { CreateOrgService } from '../services/CreateOrgService'
import { compare } from 'bcryptjs'

describe('Create Organization Service', () => {
  let inMemoryOrgRepository: InMemoryOrgRepository
  let createOrgService: CreateOrgService

  beforeEach(() => {
    inMemoryOrgRepository = new InMemoryOrgRepository()
    createOrgService = new CreateOrgService(inMemoryOrgRepository)
  })

  it('should create a new organization', async () => {
    const orgData = {
      name: 'Test Organization',
      email: 'test@example.com',
      password: '123456',
      address: '123 Test Street',
      whatsapp: '1234567890',
      cep: '12345-678',
    }

    const { org } = await createOrgService.execute(orgData)

    expect(org.id).toEqual(expect.any(String))
    expect(org).toEqual(
      expect.objectContaining({
        name: orgData.name,
        email: orgData.email,
        address: orgData.address,
        whatsapp: orgData.whatsapp,
        cep: orgData.cep,
        password_hash: expect.any(String),
      }),
    )
  })

  it('should not allow creating an organization with an existing email', async () => {
    const orgData = {
      name: 'Test Organization',
      email: 'test@example.com',
      password: '123456',
      address: '123 Test Street',
      whatsapp: '1234567890',
      cep: '12345-678',
    }

    await createOrgService.execute(orgData)

    await expect(() =>
      createOrgService.execute(orgData),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })

  it('should hash the organization password correctly', async () => {
    const orgData = {
      name: 'Test Organization',
      email: 'test@example.com',
      password: '123456',
      address: '123 Test Street',
      whatsapp: '1234567890',
      cep: '12345-678',
    }

    const { org } = await createOrgService.execute(orgData)

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
