import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

const router = express.Router()

// GET /characters or /api/characters
// Supports: ?page=1&name=rick&status=alive
router.get('/characters', async (req, res) => {
  const { page = 1, name = '', status = '' } = req.query

  let url = `https://rickandmortyapi.com/api/character?page=${page}`
  if (name) url += `&name=${encodeURIComponent(name)}`
  if (status) url += `&status=${encodeURIComponent(status)}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return res.status(response.status).json({ message: errorData.error || 'Failed to fetch characters' })
    }

    const data = await response.json()
    res.json(data)
  } catch {
    res.status(500).json({ message: 'Failed to fetch characters' })
  }
})

// GET /characters/:id or /api/characters/:id
router.get('/characters/:id', async (req, res) => {
  const { id } = req.params

  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return res.status(response.status).json({ message: errorData.error || 'Character not found' })
    }

    const data = await response.json()
    res.json(data)
  } catch {
    res.status(500).json({ message: 'Failed to fetch character' })
  }
})

// Mount on both /api and / so it works locally and on Vercel
app.use('/api', router)
app.use('/', router)

// Only listen when running standalone in local dev, not in Vercel serverless functions
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

export default app
