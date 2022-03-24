import React, { useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase.config";

const Login = () => {
  const loginEmail = useRef();
  const loginPassword = useRef();
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail.current.value,
        loginPassword.current.value
      );
    } catch (error) {
      console.error(error.message);
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <h3>Login</h3>
        <form onSubmit={(e) => handleLogin(e)}>
          <input type="email" placeholder="Email" required ref={loginEmail} />
          <input
            type="password"
            placeholder="Password"
            required
            ref={loginPassword}
          />
          <input type="submit" value="Sign in" />
          <span>{error && "Incorrect."}</span>
        </form>
      </div>
    </div>
  );
};

export default Login;
