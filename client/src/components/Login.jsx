import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  //   inputs from the form
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  //   handle form input onChange function
  const handleonChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  //   Send data to the server
  const sendRequest = async () => {
    const res = await axios
      .post("/login", {
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        email: inputs.email,
        password: inputs.password,
      })
      .catch(() => toast.error("Something went wrong"));
    const data = await res.data;
    return data;
  };

  //   handle form submittion
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then((data) => {
      if (data.message === "Logged in successfully") {
        localStorage.setItem("user", "true");
        navigate("/user");
        window.location.reload();
        // toast.success(data.message);
      } else if (data.message === "Not verified") {
        localStorage.setItem("verify", "true");
        navigate("/sentmail");
        window.location.reload();
      } else {
        toast.error(data.message);
      }
    });
  };

  return (
    <div className="page">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-top">
          <Link to={"/"}>
            <div className="infinity"></div>
          </Link>
          <p className="form-heading">Log In</p>
          <p className="ask-link">
            Don't have an account?
            <Link
              to={"/signup"}
              style={{
                color: "#3B82F6",
                textDecoration: "none",
                marginLeft: "10px",
              }}
            >
              Signup
            </Link>
          </p>
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            value={inputs.email}
            onChange={handleonChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            value={inputs.password}
            onChange={handleonChange}
            required
          />
        </div>
        <Link
          to={"/reset"}
          style={{
            color: "#3B82F6",
            textDecoration: "none",
            margin: "10px 0 10px 30px",
            width: "100%",
            fontWeight: "500",
          }}
        >
          Forgot Password?
        </Link>

        <button>Login</button>
      </form>
    </div>
  );
}
