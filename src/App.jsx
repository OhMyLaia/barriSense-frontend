import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { Home } from "./components/Home";
import ContactForm from "./components/ContactForm";
import { Footer } from "./components/Footer";
import ButtonGroup from "./components/ButtonGroup";
import ScrollToHash from "./components/ScrollToHash";
import { Login, UpdatePassword, useAuth } from "./modules/auth";

export default function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <ButtonGroup>
          <Login />
        </ButtonGroup>
        <main className="flex-grow">
          <ScrollToHash />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacte" element={<ContactForm />} />
            <Route path="/update-password" element={<UpdatePassword />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
