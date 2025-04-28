import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import NavBar from "./components/NavBar"

function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
