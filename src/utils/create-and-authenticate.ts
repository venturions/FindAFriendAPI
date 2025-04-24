import request from 'supertest'
import { app } from '@/app'

export async function createAndAuthenticateOrg() {
  // Cria uma organização
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

  // Autentica a organização e obtém o token
  const authResponse = await request(app.server)
    .post('/session')
    .send({
      email: 'test@example.com',
      password: '123456',
    })
    .expect(200)

  const { token } = authResponse.body

  return token
}
