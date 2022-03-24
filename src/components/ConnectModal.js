import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const ConnectModal = () => {
  const [register, setRegister] = useState(true);

  return (
    <div className="connect-modal">
      <div className="header-btn">
        <button
          style={{
            background: register ? "rgba(28,28,28,1.0)" : "rgba(83,83,83,1.0)",
          }}
          onClick={() => setRegister(true)}
        >
          Register
        </button>
        <button
          style={{
            background: register ? "rgba(83,83,83,1.0)" : "rgba(28,28,28,1.0)",
          }}
          onClick={() => setRegister(false)}
        >
          Login
        </button>
      </div>
      {register ? <Register /> : <Login />}
    </div>
  );
};

export default ConnectModal;
