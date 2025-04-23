import { app } from './app'
import { env } from './env'
import { orgRoutes } from './routes/orgs.routes'

app.register(orgRoutes)

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333')
  })
  .catch((err) => {
    console.error('Error starting server:', err)
    process.exit(1)
  })
