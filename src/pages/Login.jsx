import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Loading from "../components/Loading"

export const Login = () => {
  const [err, setErr] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    setShowAnimation(false)
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res) {
        setShowAnimation(true)
      }
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div>
      {showAnimation && <Loading />}
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">ChatRoom</span>
          <span className="title">Login</span>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <button>Sign in</button>
            {err && <span>Something went wrong</span>}
          </form>
          <p>
            You do not have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
