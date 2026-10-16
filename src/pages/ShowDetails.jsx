import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_URL !== undefined
  ? import.meta.env.VITE_API_URL
  : (import.meta.env.DEV ? 'http://localhost:5000' : '')

function ShowDetails() {
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
        let res = null
        try {
          res = await fetch(`${API_BASE}/api/characters/${id}`)
        } catch {
          // Fallback directly to Rick and Morty API if backend is not reachable
          res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
        }

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
    if (status === 'Alive') return '#28a745'
    if (status === 'Dead') return '#dc3545'
    return '#6c757d'
  }

  return (
    <div style={styles.page}>
      <button onClick={() => navigate('/characters')} style={styles.backBtn}>
        ← Back to Characters
      </button>

      {loading && <p style={styles.message}>Loading...</p>}
      {error && <p style={{ ...styles.message, color: 'red' }}>{error}</p>}

      {!loading && !error && character && (
        <div style={styles.card}>
          <img src={character.image} alt={character.name} style={styles.img} />
          <div style={styles.info}>
            <h1 style={styles.name}>{character.name}</h1>

            <p style={styles.detailRow}>
              <strong>Status: </strong>
              <span
                style={{
                  ...styles.statusBadge,
                  backgroundColor: getStatusColor(character.status),
                }}
              >
                {character.status}
              </span>
            </p>

            <p style={styles.detailRow}>
              <strong>Species:</strong> {character.species}
            </p>
            <p style={styles.detailRow}>
              <strong>Gender:</strong> {character.gender}
            </p>
            <p style={styles.detailRow}>
              <strong>Origin:</strong> {character.origin?.name || 'Unknown'}
            </p>
            <p style={styles.detailRow}>
              <strong>Location:</strong> {character.location?.name || 'Unknown'}
            </p>
            <p style={styles.detailRow}>
              <strong>Number of Episodes:</strong>{' '}
              {character.episode ? character.episode.length : 0}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  page: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  backBtn: {
    padding: '8px 16px',
    backgroundColor: '#555',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  card: {
    display: 'flex',
    gap: '24px',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    flexWrap: 'wrap',
    border: '1px solid #eee',
  },
  img: {
    width: '200px',
    height: '200px',
    borderRadius: '8px',
    objectFit: 'cover',
  },
  info: {
    flex: 1,
    minWidth: '220px',
  },
  name: {
    fontSize: '1.6rem',
    margin: '0 0 14px 0',
    color: '#2d6a4f',
  },
  detailRow: {
    margin: '0 0 10px 0',
    fontSize: '1rem',
    color: '#333',
  },
  statusBadge: {
    display: 'inline-block',
    color: 'white',
    padding: '2px 10px',
    borderRadius: '12px',
    fontSize: '0.85rem',
    marginLeft: '6px',
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    marginTop: '40px',
    fontSize: '1rem',
    color: '#555',
  },
}

export default ShowDetails
