import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Rick and Morty Explorer</h1>
      <p style={styles.subtext}>Browse all your favorite characters from the show.</p>
      <button onClick={() => navigate('/characters')} style={styles.btn}>
        See Characters
      </button>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '15px',
    color: '#2d6a4f',
  },
  subtext: {
    fontSize: '1.1rem',
    color: '#555',
    marginBottom: '30px',
  },
  btn: {
    padding: '12px 28px',
    fontSize: '1rem',
    backgroundColor: '#2d6a4f',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
}

export default Home
