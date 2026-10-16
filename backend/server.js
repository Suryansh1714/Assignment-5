import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

// GET /api/characters
// Supports: ?page=1&name=rick&status=alive
app.get('/api/characters', async (req, res) => {
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
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch characters' })
  }
})

// GET /api/characters/:id
app.get('/api/characters/:id', async (req, res) => {
  const { id } = req.params

  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return res.status(response.status).json({ message: errorData.error || 'Character not found' })
    }

    const data = await response.json()
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch character' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
