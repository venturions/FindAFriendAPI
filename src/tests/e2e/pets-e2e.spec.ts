import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/create-and-authenticate'

describe('Pets (E2E)', () => {
  let token: string

  beforeAll(async () => {
    await app.ready()
    token = await createAndAuthenticateOrg() // Cria e autentica uma organização
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a new pet', async () => {
    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`) // Envia o token JWT
      .send({
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
      })
      .expect(201)

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Buddy',
        age: 'Filhote',
        size: 'Pequeno',
        energyLevel: 'Alta',
        independenceLevel: 'Média',
        environment: 'Ambiente amplo',
        description: 'Um cachorro amigável e cheio de energia.',
        city: 'São Paulo',
      }),
    )
  })

  it('should list all pets available in a specific city', async () => {
    // Cria um pet para a cidade de São Paulo
    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
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
      })
      .expect(201)

    // Lista os pets disponíveis na cidade de São Paulo
    const response = await request(app.server)
      .get('/pets')
      .query({ city: 'São Paulo' })
      .expect(200)

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Buddy', city: 'São Paulo' }),
        expect.objectContaining({ name: 'Max', city: 'São Paulo' }),
      ]),
    )
  })

  it('should get details of a specific pet', async () => {
    // Cria um pet
    const createResponse = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
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
      })
      .expect(201)

    const petId = createResponse.body.id

    // Obtém os detalhes do pet
    const response = await request(app.server).get(`/pets/${petId}`).expect(200)

    expect(response.body).toEqual(
      expect.objectContaining({
        id: petId,
        name: 'Luna',
        age: 'Filhote',
        size: 'Grande',
        energyLevel: 'Alta',
        independenceLevel: 'Baixa',
        environment: 'Ambiente amplo',
        description: 'Uma cadela cheia de energia.',
        city: 'Rio de Janeiro',
      }),
    )
  })

  it('should filter pets by age, size, and energy level', async () => {
    // Cria pets com diferentes características
    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Charlie',
        age: 'Filhote',
        size: 'Pequeno',
        energyLevel: 'Alta',
        independenceLevel: 'Média',
        environment: 'Ambiente amplo',
        description: 'Um cachorro pequeno e cheio de energia.',
        photos: ['https://example.com/photo4.jpg'],
        adoptionRequirements: ['Deve ter espaço amplo'],
        city: 'São Paulo',
      })
      .expect(201)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Bella',
        age: 'Adulto',
        size: 'Médio',
        energyLevel: 'Média',
        independenceLevel: 'Alta',
        environment: 'Ambiente pequeno',
        description: 'Uma cadela calma e amigável.',
        photos: ['https://example.com/photo5.jpg'],
        adoptionRequirements: ['Deve ter tempo para passeios'],
        city: 'São Paulo',
      })
      .expect(201)

    // Aplica filtros para listar apenas pets com idade "Filhote" e tamanho "Pequeno"
    const response = await request(app.server)
      .get('/pets')
      .query({
        city: 'São Paulo',
        age: 'Filhote',
        size: 'Pequeno',
        energyLevel: 'Alta',
      })
      .expect(200)

    // Verifica se apenas os pets que atendem aos filtros são retornados
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Charlie',
          age: 'Filhote',
          size: 'Pequeno',
          energyLevel: 'Alta',
          city: 'São Paulo',
        }),
      ]),
    )

    // Verifica que pets que não atendem aos filtros não estão na resposta
    expect(response.body).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Bella',
          age: 'Adulto',
          size: 'Médio',
          energyLevel: 'Média',
          city: 'São Paulo',
        }),
      ]),
    )
  })
})
