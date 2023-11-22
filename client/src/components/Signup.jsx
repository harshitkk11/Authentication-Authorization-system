import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate();

  // inputs from the form
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  // handle form input onChange function
  const handleonChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // Send data to the server
  const sendRequest = async () => {
    const res = await axios
      .post("/signup", {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
    const data = await res.data;
    return data;
  };

  // handle form submittion
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then((data) => {
      if (data.message === "Signed up successfully") {
        setInputs({
          ...inputs,
          name: "",
          email: "",
          password: ""
        })
        localStorage.setItem("verify", "true");
        navigate("/sentmail");
        window.location.reload()
        // toast.success(data.message);
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
          <p className="form-heading">Sign up</p>
          <p className="ask-link">
            Already have an account?
            <Link to={"/login"} style={{ color: "#3B82F6", textDecoration: "none", marginLeft: "10px" }}>
              Login
            </Link>
          </p>
        </div>

        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Name"
            value={inputs.name}
            onChange={handleonChange}
            required
          />
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

        <button>Signup</button>
      </form>
    </div>
  );
}
