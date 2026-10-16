import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CharacterCard from '../components/CharacterCard.jsx'
import './Characters.css'

function Characters() {
  const [characters, setCharacters] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')

  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  // Get page from URL, default to 1
  const currentPage = parseInt(searchParams.get('page')) || 1

  useEffect(() => {
    fetchCharacters()
  }, [currentPage, search, status])

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

  return (
    <div className="characters-page">
      <div className="characters-header">
        <h1>Characters</h1>
        <button onClick={() => navigate('/')} className="back-btn">← Home</button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={handleSearch}
          className="search-input"
        />
        <select value={status} onChange={handleStatusChange} className="status-select">
          <option value="">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {loading && <p className="message">Loading...</p>}
      {error && <p className="message error">Something went wrong: {error}</p>}

      {!loading && !error && characters.length === 0 && (
        <p className="message">No characters found.</p>
      )}

      <div className="cards-grid">
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>

      {!loading && characters.length > 0 && (
        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1} className="page-btn">
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages} className="page-btn">
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Characters
