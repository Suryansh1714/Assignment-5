import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.text}>Page not found.</p>
      <button onClick={() => navigate('/')} style={styles.btn}>
        Go Back Home
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
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '5rem',
    color: '#ccc',
    margin: '0 0 10px 0',
  },
  text: {
    fontSize: '1.2rem',
    color: '#555',
    margin: '0 0 24px 0',
  },
  btn: {
    padding: '10px 22px',
    backgroundColor: '#2d6a4f',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
}

export default NotFound
