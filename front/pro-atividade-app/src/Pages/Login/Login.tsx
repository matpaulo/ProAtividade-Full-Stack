import { faFlorinSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5088/api/login/",
        {
          username,
          password,
        }
      );
      setMessage(response.data);
    } catch (error) {
      setMessage("Credenciais inválidas.");
    }
  };
  return (
    <>
      <div className="vh-100 bg-light d-flex flex-column align-items-center justify-content-center">
        <div className="pt-2 text-center">
          <div>
            <FontAwesomeIcon icon={faFlorinSign} />
            <h5 className="mt-2">Entrar no FullStack</h5>
          </div>
          <form className="mt-4" onSubmit={handleLogin}>
            <input
              className="ms-2 mb-2"
              type="text"
              placeholder="Login"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
              className="ms-2"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mb-3">
              <button type="submit" className="btn btn-primary btn-md mt-4">
                Login
              </button>
            </div>
          </form>
          <p>{message}</p>
        </div>
      </div>
    </>
  );
};

export default Login;
