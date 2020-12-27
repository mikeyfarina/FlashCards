import PropTypes from "prop-types";
import React, { useState } from "react";

import flashcardService from "../services/flashcardService";
import loginService from "../services/loginService";

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired,
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      console.log("user", user);
      window.localStorage.setItem(
        "loggedFlashcardAppUser",
        JSON.stringify(user)
      );
      flashcardService.setToken(user.token);
      console.log(user.username, "logged in");
      setUsername("");
      setPassword("");
      setUser(user);
    } catch (ex) {
      console.log("wrong credentials");
    }
  };

  return (
    <div>
      <div>
        <h3>Login</h3>
      </div>
      <div>
        <form className={"login"} onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password{" "}
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
