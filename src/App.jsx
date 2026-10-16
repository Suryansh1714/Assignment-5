import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ShowsList from './pages/ShowsList.jsx'
import ShowDetails from './pages/ShowDetails.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/characters" element={<ShowsList />} />
      <Route path="/characters/:id" element={<ShowDetails />} />
      <Route path="/shows" element={<ShowsList />} />
      <Route path="/shows/:id" element={<ShowDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
