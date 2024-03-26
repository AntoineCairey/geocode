import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBInput, MDBCol, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import { useTheContext } from "../context/Context";

export default function Login() {
  const { getUserInfos, apiService } = useTheContext();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [innerError, setInnerError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const login = async (credentials) => {
    try {
      const data = await apiService.post(`/login`, credentials);
      localStorage.setItem("token", data.token);
      apiService.setToken(data.token);
      getUserInfos();
      navigate("/myaccount");
    } catch (err) {
      console.error(err);
      setInnerError(`La combinaison Email/Mot-de-passe est invalide`);
    }
  };

  return (
    <div className="login-form">
      <h1>Se Connecter</h1>
      <MDBInput
        className="mb-4"
        type="email"
        name="email"
        label="Addresse email"
        value={formData.email}
        onChange={handleChange}
      />
      <MDBInput
        className="mb-4"
        type="password"
        name="password"
        label="Mot de passe"
        value={formData.password}
        onChange={handleChange}
      />
      <div className="register-container">
        <p> {innerError ?? { innerError }}</p>
      </div>

      <MDBBtn
        type="submit"
        className="mb-4"
        block
        onClick={() => login(formData)}
      >
        Connexion
      </MDBBtn>

      <div className="text-center">
        <p>
          Nouveau membre ? <Link to="/register/logs">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
}
