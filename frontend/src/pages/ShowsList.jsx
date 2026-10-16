import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

function ShowsList() {
  const [characters, setCharacters] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')

  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const currentPage = parseInt(searchParams.get('page')) || 1

  useEffect(() => {
    async function fetchCharacters() {
      setLoading(true)
      setError(null)

      try {
        let url = `http://localhost:5000/api/characters?page=${currentPage}`
        if (search) url += `&name=${encodeURIComponent(search)}`
        if (status) url += `&status=${encodeURIComponent(status)}`

        const res = await fetch(url)
        if (!res.ok) {
          if (res.status === 404) {
            setCharacters([])
            setTotalPages(1)
            setLoading(false)
            return
          }
          throw new Error('Failed to fetch characters')
        }

        const data = await res.json()
        setCharacters(data.results || [])
        setTotalPages(data.info ? data.info.pages : 1)
      } catch (err) {
        setError(err.message)
      }

      setLoading(false)
    }

    fetchCharacters()
  }, [currentPage, search, status])

  function handleNext() {
    if (currentPage < totalPages) {
      setSearchParams({ page: currentPage + 1 })
    }
  }

  function handlePrev() {
    if (currentPage > 1) {
      setSearchParams({ page: currentPage - 1 })
    }
  }

  function handleSearch(e) {
    setSearch(e.target.value)
    setSearchParams({ page: 1 })
  }

  function handleStatusChange(e) {
    setStatus(e.target.value)
    setSearchParams({ page: 1 })
  }

  function getStatusColor(charStatus) {
    if (charStatus === 'Alive') return '#28a745'
    if (charStatus === 'Dead') return '#dc3545'
    return '#6c757d'
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Characters</h1>
        <button onClick={() => navigate('/')} style={styles.backBtn}>
          ← Home
        </button>
      </div>

      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={handleSearch}
          style={styles.searchInput}
        />
        <select
          value={status}
          onChange={handleStatusChange}
          style={styles.statusSelect}
        >
          <option value="">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {loading && <p style={styles.message}>Loading...</p>}
      {error && <p style={{ ...styles.message, color: 'red' }}>Something went wrong: {error}</p>}

      {!loading && !error && characters.length === 0 && (
        <p style={styles.message}>No characters found.</p>
      )}

      <div style={styles.grid}>
        {characters.map((char) => (
          <div
            key={char.id}
            onClick={() => navigate(`/characters/${char.id}`)}
            style={styles.card}
          >
            <img src={char.image} alt={char.name} style={styles.cardImg} />
            <div style={styles.cardBody}>
              <h3 style={styles.cardName}>{char.name}</h3>
              <p style={styles.cardSpecies}>{char.species}</p>
              <span
                style={{
                  ...styles.statusBadge,
                  backgroundColor: getStatusColor(char.status),
                }}
              >
                {char.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {!loading && characters.length > 0 && (
        <div style={styles.pagination}>
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            style={{
              ...styles.pageBtn,
              ...(currentPage === 1 ? styles.disabledBtn : {}),
            }}
          >
            Previous
          </button>
          <span style={styles.pageText}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            style={{
              ...styles.pageBtn,
              ...(currentPage === totalPages ? styles.disabledBtn : {}),
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

const styles = {
  page: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  title: {
    fontSize: '1.8rem',
    color: '#2d6a4f',
    margin: 0,
  },
  backBtn: {
    padding: '8px 16px',
    backgroundColor: '#555',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  filters: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  searchInput: {
    padding: '8px 12px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '250px',
  },
  statusSelect: {
    padding: '8px 12px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  message: {
    fontSize: '1rem',
    color: '#555',
    margin: '20px 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    border: '1px solid #eee',
  },
  cardImg: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    display: 'block',
  },
  cardBody: {
    padding: '12px',
  },
  cardName: {
    fontSize: '1rem',
    margin: '0 0 4px 0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#222',
  },
  cardSpecies: {
    fontSize: '0.85rem',
    color: '#666',
    margin: '0 0 8px 0',
  },
  statusBadge: {
    display: 'inline-block',
    color: 'white',
    fontSize: '0.78rem',
    padding: '2px 10px',
    borderRadius: '12px',
    fontWeight: 'bold',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '30px',
    paddingBottom: '30px',
  },
  pageBtn: {
    padding: '8px 18px',
    backgroundColor: '#2d6a4f',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  disabledBtn: {
    backgroundColor: '#aaa',
    cursor: 'not-allowed',
  },
  pageText: {
    fontSize: '0.95rem',
    color: '#333',
  },
}

export default ShowsList
