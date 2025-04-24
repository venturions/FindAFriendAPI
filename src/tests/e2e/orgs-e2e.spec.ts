import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Organizations (E2E)', () => {
  beforeAll(async () => {
    await app.ready() // Inicializa o servidor antes dos testes
  })

  afterAll(async () => {
    await app.close() // Fecha o servidor após os testes
  })

  it('should create a new organization', async () => {
    const response = await request(app.server)
      .post('/orgs') // Endpoint para criar uma organização
      .send({
        name: 'Test Organization',
        email: 'test@example.com',
        password: '123456',
        address: '123 Test Street',
        whatsapp: '1234567890',
        cep: '12345-678',
      })

    expect(response.statusCode).toBe(201) // Verifica se a resposta tem o status 201 (Created)
  })
})
