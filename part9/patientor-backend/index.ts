import express from 'express'
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/api/ping', (_req, resp) => {
    resp.send('pong')
});

const PORT = 3001
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})