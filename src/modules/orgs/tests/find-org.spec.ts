import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgRepository } from '../repositories/InMemoryOrgRepository'

describe('Find Organization by ID', () => {
  let inMemoryOrgRepository: InMemoryOrgRepository

  beforeEach(() => {
    inMemoryOrgRepository = new InMemoryOrgRepository()
  })

  it('should find an organization by ID', async () => {
    const orgData = {
      name: 'Test Organization',
      email: 'test@example.com',
      address: '123 Test Street',
      whatsapp: '1234567890',
      cep: '12345-678',
      password_hash: 'hashed-password',
    }

    const createdOrg = await inMemoryOrgRepository.create(orgData)

    const foundOrg = await inMemoryOrgRepository.findById(createdOrg.id)

    expect(foundOrg).toEqual(createdOrg)
  })

  it('should return null if organization ID does not exist', async () => {
    const foundOrg = await inMemoryOrgRepository.findById('non-existent-id')

    await expect(foundOrg).toBeNull()
  })
})
