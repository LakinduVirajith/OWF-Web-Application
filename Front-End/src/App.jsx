import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import About from "./pages/About"
import Staff from "./pages/Staff"
import Gallery from "./pages/Gallery"
import News from "./pages/News"
import NewsDetail from "./pages/NewsDetail"

import PreSchool from "./pages/courses/PreSchool"
import LanguageTraining from "./pages/courses/LanguageTraining"
import LanguageTrainingDetail from "./pages/courses/LanguageTrainingDetail"
import VocationalTraining from "./pages/courses/VocationalTraining"
import PrimaryEducation from "./pages/courses/PrimaryEducation"
import Music from "./pages/courses/Music"
import Sports from "./pages/courses/Sports"

import Footer from "./components/Footer"

function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />

          <Route path="/courses/pre-school" element={<PreSchool />} />
          <Route path="/courses/language-training" element={<LanguageTraining />} />
          <Route path="/courses/language-training/:id" element={<LanguageTrainingDetail />} />
          <Route path="/courses/vocational-training" element={<VocationalTraining />} />
          <Route path="/courses/primary-education" element={<PrimaryEducation />} />
          <Route path="/courses/music" element={<Music />} />
          <Route path="/courses/sports" element={<Sports />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
