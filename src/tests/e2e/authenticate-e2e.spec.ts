import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Authenticate (E2E)', () => {
  beforeAll(async () => {
    await app.ready() // Inicializa o servidor antes dos testes
  })

  afterAll(async () => {
    await app.close() // Fecha o servidor após os testes
  })

  it('should authenticate an organization and return a JWT token', async () => {
    // Arrange: Cria uma organização no banco de dados
    await request(app.server)
      .post('/orgs')
      .send({
        name: 'Test Organization',
        email: 'test@example.com',
        password: '123456',
        address: '123 Test Street',
        whatsapp: '1234567890',
        cep: '12345-678',
      })
      .expect(201)

    // Act: Faz uma requisição para autenticar a organização
    const response = await request(app.server)
      .post('/session')
      .send({
        email: 'test@example.com',
        password: '123456',
      })
      .expect(200)

    // Assert: Verifica se o token JWT foi retornado
    expect(response.body).toHaveProperty('token')
    expect(typeof response.body.token).toBe('string')
  })
})
