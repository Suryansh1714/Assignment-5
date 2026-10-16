import { useNavigate } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>Page not found.</p>
      <button onClick={() => navigate('/')} className="home-btn">Go Back Home</button>
    </div>
  )
}

export default NotFound
