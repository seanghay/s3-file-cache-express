import app from './app.js'

const port = parseInt(process.env.PORT) || 8080;

app.listen(port, () => {
  console.log(`[http] listening on port http://localhost:${port}`)
})