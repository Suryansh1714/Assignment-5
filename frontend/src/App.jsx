import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Characters from './pages/Characters.jsx'
import CharacterDetail from './pages/CharacterDetail.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/characters/:id" element={<CharacterDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
