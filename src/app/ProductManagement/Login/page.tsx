"use client";
import React, { useState} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';


function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    username: '',
    password: ''
  });
  const [rememberMe, setRememberMe]=useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
  
    try {
      const response = await fetch("http://182.237.13.165/AkshReactAPI/api/Auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
  
      const data = await response.json();
      console.log('Token received from backend:', data.token); // ✅ Add this line

      if (response.status === 200 && data.token) {
        // ✅ Save token to context + storage based on "Remember me"
        // setAuthToken(data.token);
          if (rememberMe) {
          localStorage.setItem("authToken",data.token);
        } 
        setMessage(`Welcome ${data.username || form.username}! Login successful.`);
  
        setTimeout(() => {
          router.push('/ProductManagement/');
        }, 1000);
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    }
    
  };


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <h1 className="h4 text-center mb-4">Product Management System</h1>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="rememberMe" checked={rememberMe} onChange={(e)=> setRememberMe(e.target.checked)}/>
            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
          </div>

          <button type="submit" className="btn btn-primary w-100">Sign in</button>

          {error && <p className="mt-3 alert alert-danger">{error}</p>}
          {message && <p className="mt-3 alert alert-success">{message}</p>}

          <div className="text-center mt-3">
            <p>Not a member? <Link href="/ProductManagement/Signup">Register</Link></p>
            <p>or sign in with:</p>
            <div className="d-flex justify-content-center gap-2">
              <button type="button" className="btn btn-outline-primary btn-sm">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button type="button" className="btn btn-outline-danger btn-sm">
                <i className="fab fa-google"></i>
              </button>
              <button type="button" className="btn btn-outline-info btn-sm">
                <i className="fab fa-twitter"></i>
              </button>
              <button type="button" className="btn btn-outline-dark btn-sm">
                <i className="fab fa-github"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
