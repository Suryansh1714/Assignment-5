import { useNavigate } from 'react-router-dom'
import './CharacterCard.css'

function CharacterCard({ character }) {
  const navigate = useNavigate()

  function getStatusColor(status) {
    if (status === 'Alive') return 'green'
    if (status === 'Dead') return 'red'
    return 'grey'
  }

  return (
    <div className="card" onClick={() => navigate(`/characters/${character.id}`)}>
      <img src={character.image} alt={character.name} className="card-img" />
      <div className="card-body">
        <h3 className="card-name">{character.name}</h3>
        <p className="card-species">{character.species}</p>
        <span
          className="card-status"
          style={{ backgroundColor: getStatusColor(character.status) }}
        >
          {character.status}
        </span>
      </div>
    </div>
  )
}

export default CharacterCard
