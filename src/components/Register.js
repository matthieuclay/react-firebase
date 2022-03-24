import React, { useRef, useState } from "react";
import { auth } from "../utils/firebase.config";

const Register = () => {
  const registerEmail = useRef();
  const registerPassword = useRef();
  const [displayName, setDisplayName] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    try {
      auth
        .createUserWithEmailAndPassword(
          registerEmail.current.value,
          registerPassword.current.value
        )
        .then(async (userAuth) => {
          await userAuth.user.updateProfile({
            displayName,
          });
          window.location.reload();
        });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register">
        <h3>Register</h3>
        <form onSubmit={(e) => handleRegister(e)}>
          <input
            type="text"
            placeholder="Username"
            required
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            ref={registerEmail}
          />
          <input
            type="password"
            placeholder="Password"
            required
            ref={registerPassword}
          />
          <input type="submit" value="Sign up" />
        </form>
      </div>
    </div>
  );
};

export default Register;
