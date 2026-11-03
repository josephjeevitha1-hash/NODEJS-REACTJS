import React, { useState } from "react";
import {
  BrowserRouter, Routes, Route,
  Link, useNavigate
} from "react-router-dom";
import "./App.css";

// Navigation Bar
function Navbar() {
  return (
    <nav>
      <div className="brand">
        <h2>STUDENT MANAGEMENT SYSTEM</h2>
        <p>Geethanjali College of Engineering and Technology</p>
      </div>

      <div className="nav-links">
        <Link to="/">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}

// Login Page
function Login({ student, setLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (student && student.email === email &&
        student.password === password) {
      setLogin(true);
      navigate("/dashboard");
    } else {
      alert("Invalid Login! Please Register First.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Student Login</h2>
      <input type="email" placeholder="Email"
        onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password"
        onChange={e => setPassword(e.target.value)} required />
      <button>Login</button>
      <p>New Student? <Link to="/register">Register Here</Link></p>
    </form>
  );
}

// Registration Page
function Register({ setStudent }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setStudent({ name, email, password });
    alert("Registration Successful!");
    navigate("/");
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Student Registration</h2>
      <input placeholder="Full Name"
        onChange={e => setName(e.target.value)} required />
      <input type="email" placeholder="Email"
        onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password"
        onChange={e => setPassword(e.target.value)}
        minLength="6" required />
      <button>Register</button>
    </form>
  );
}

// Dashboard
function Dashboard({ student, login, setLogin }) {
  const navigate = useNavigate();

  if (!login || !student) {
    return (
      <div className="dashboard">
        <div className="welcome-card">
          <h2>Please Login First!</h2>
          <button onClick={() => navigate("/")}>Go to Login</button>
        </div>
      </div>
    );
  }

  const logout = () => {
    setLogin(false);
    navigate("/");
  };

  return (
    <div className="dashboard">
      <div className="welcome-card">
        <div className="cap">🎓</div>
        <h1>Welcome to Student<br />Management System!</h1>
        <h2>Hello, {student.name}!</h2>
        <p>We are happy to have you here.</p>
        <p><strong>Email: {student.email}</strong></p>
        <button onClick={logout}>↪️ Logout</button>
      </div>
    </div>
  );
}

// About Page
function About() {
  return (
    <div className="content">
      <h1>About Us</h1>
      <p>Welcome to the Student Management System.</p>
      <p>This application helps students access their
        information through registration, login and dashboard facilities.</p>
    </div>
  );
}

// Contact Page
function Contact() {
  const submit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been submitted.");
    e.target.reset();
  };

  return (
    <form onSubmit={submit}>
      <h2>Contact Us</h2>
      <input placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
      <textarea placeholder="Your Message" required />
      <button>Send Message</button>
    </form>
  );
}

// Main App
function App() {
  const [student, setStudent] = useState(null);
  const [login, setLogin] = useState(false);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={
          <Login student={student} setLogin={setLogin} />
        } />

        <Route path="/register" element={
          <Register setStudent={setStudent} />
        } />

        <Route path="/dashboard" element={
          <Dashboard student={student}
            login={login} setLogin={setLogin} />
        } />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <footer>
        © 2026 GCET | Student Management System
        <span>Learn • Grow • Excel</span>
      </footer>
    </BrowserRouter>
  );
}

export default App;
