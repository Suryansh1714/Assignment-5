import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="home-container">
      <h1>Rick and Morty Explorer</h1>
      <p>Browse all your favorite characters from the show.</p>
      <button onClick={() => navigate('/characters')} className="see-btn">
        See Characters
      </button>
    </div>
  )
}

export default Home
