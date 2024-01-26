import { pipeline } from '@xenova/transformers'
import express from 'express'
import {fileURLToPath} from 'url'
import path from 'path'

const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)

const pipe = await pipeline('sentiment-analysis')

const app = express()
const port = 3000

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use(express.json())

app.use('/apps/frontend/src/pages', express.static('./apps/frontend/src/page'))

app.post('/', async (req, res) => {
  const result = await pipe(req.body.text)
  res.json(result)
})

app.get('/apps/frontend/src/page'), (req, res) => {
  res.SendFile(path.join(_dirname, 'index.vue'))
}

app.listen(3000, () => console.log(`Listening on port ${port}`))

