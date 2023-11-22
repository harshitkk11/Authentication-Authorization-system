import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


export default function Reset() {
  //   inputs from the form
  const [inputs, setInputs] = useState({
    email: "",
  });

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
    const resetReq = await axios.post('/reset', { email: inputs.email})

    if (resetReq.data.message === "Reset email sent") {
      toast.success(resetReq.data.message)
      setInputs({...inputs, email: ""})
      localStorage.setItem("reset", "true")
    }
    else {
      toast.error(resetReq.data.message)
    }
  } catch (error) {
    console.log(error);
  }
  };

  return (
    <div className="page">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-top">
          <Link to={"/"}>
            <div className="infinity"></div>
          </Link>
          <p className="form-heading">Reset Your Password</p>
          <p className="ask-link">
            Back to
            <Link
              to={"/login"}
              style={{
                color: "#3B82F6",
                textDecoration: "none",
                marginLeft: "5px",
              }}
            >
              Log in
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
            onChange={(e) =>
              setInputs({
                ...inputs,
                email: e.target.value,
              })
            }
            required
          />
        </div>

        <button>Reset</button>
      </form>
    </div>
  );
}
