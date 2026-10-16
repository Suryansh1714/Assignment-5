import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './CharacterDetail.css'

function CharacterDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchCharacter() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`http://localhost:5000/api/characters/${id}`)
        if (!res.ok) throw new Error('Character not found')
        const data = await res.json()
        setCharacter(data)
      } catch (err) {
        setError(err.message)
      }
      setLoading(false)
    }

    fetchCharacter()
  }, [id])

  function getStatusColor(status) {
    if (status === 'Alive') return 'green'
    if (status === 'Dead') return 'red'
    return 'grey'
  }

  if (loading) return <p className="message">Loading...</p>
  if (error) return <p className="message error">{error}</p>
  if (!character) return null

  return (
    <div className="detail-page">
      <button onClick={() => navigate('/characters')} className="back-btn">
        ← Back to Characters
      </button>

      <div className="detail-card">
        <img src={character.image} alt={character.name} className="detail-img" />
        <div className="detail-info">
          <h1>{character.name}</h1>

          <p>
            <strong>Status: </strong>
            <span className="status-badge" style={{ backgroundColor: getStatusColor(character.status) }}>
              {character.status}
            </span>
          </p>

          <p><strong>Species:</strong> {character.species}</p>
          <p><strong>Gender:</strong> {character.gender}</p>
          <p><strong>Origin:</strong> {character.origin?.name || 'Unknown'}</p>
          <p><strong>Location:</strong> {character.location?.name || 'Unknown'}</p>
          <p><strong>Number of Episodes:</strong> {character.episode ? character.episode.length : 0}</p>
        </div>
      </div>
    </div>
  )
}

export default CharacterDetail
