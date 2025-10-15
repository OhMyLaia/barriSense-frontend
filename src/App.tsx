import "./App.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/Homepage";
import FeedbackPage from "./pages/FeedbackPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return <>
  <BrowserRouter>
  <Navbar/>
  <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/queixes" element={<FeedbackPage />} />
        {/* Catch-all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

  </BrowserRouter>
  </>;
}

export default App;
