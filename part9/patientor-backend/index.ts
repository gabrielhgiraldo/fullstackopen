import express from 'express'

const app = express()
app.use(express.json())

app.get('/ping', (_req, resp) => {
    resp.send('pong')
});

const PORT = 3003
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})