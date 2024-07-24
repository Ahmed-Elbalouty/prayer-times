import MainContent from './components/MainContent';
import './App.css';
import Container from '@mui/material/Container';
function App() {

  return (
    <div style={{ minWidth: "100%", display: "flex", justifyContent: "center" }}>
      <Container maxWidth="lg">
        <MainContent />
      </Container>
    </div >
  )
}

export default App
