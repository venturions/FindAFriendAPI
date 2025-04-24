import verifyJWT from '@/middlewares/verifyJwt'
import { createPet } from '@/modules/pets/controllers/CreatePetController'
import { getPetDetails } from '@/modules/pets/controllers/GetPetDetailsController'
import { listPetsByCity } from '@/modules/pets/controllers/ListPetsByCityController'
import { FastifyInstance } from 'fastify'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pets', { preHandler: [verifyJWT] }, createPet)
  app.get('/pets/:id', getPetDetails)
  app.get('/pets', listPetsByCity)
}
