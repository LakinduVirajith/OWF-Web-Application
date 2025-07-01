import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import About from "./pages/About"
import Staff from "./pages/Staff"
import Gallery from "./pages/Gallery"
import News from "./pages/News"
import NewsDetail from "./pages/NewsDetail"
import Events from "./pages/Events"
import EventsDetail from "./pages/EventsDetail"

import PreSchool from "./pages/courses/PreSchool"
import LanguageTraining from "./pages/courses/LanguageTraining"
import LanguageTrainingDetail from "./pages/courses/LanguageTrainingDetail"
import VocationalTraining from "./pages/courses/VocationalTraining"
import VocationalTrainingDetail from "./pages/courses/VocationalTrainingDetail"
import PrimaryEducation from "./pages/courses/PrimaryEducation"
import Music from "./pages/courses/Music"
import Sports from "./pages/courses/Sports"
import CourseApplication from "./pages/CourseApplication"

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
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventsDetail />} />

          <Route path="/courses/pre-school" element={<PreSchool />} />
          <Route path="/courses/language-training" element={<LanguageTraining />} />
          <Route path="/courses/language-training/:id" element={<LanguageTrainingDetail />} />
          <Route path="/courses/vocational-training" element={<VocationalTraining />} />
          <Route path="/courses/vocational-training/:id" element={<VocationalTrainingDetail />} />
          <Route path="/courses/primary-education" element={<PrimaryEducation />} />
          <Route path="/courses/music" element={<Music />} />
          <Route path="/courses/sports" element={<Sports />} />
          <Route path="/courses/application" element={<CourseApplication />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
