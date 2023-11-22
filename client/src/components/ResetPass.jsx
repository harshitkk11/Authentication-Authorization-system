import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPass() {
  let [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  //   inputs from the form
  const [inputs, setInputs] = useState({
    newpassword: "",
    currentpassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputs.newpassword !== inputs.currentpassword) {
      toast.error("Password not match");
    } else {
      try {
        const resetReq = await axios.post("/resetpass", {
          password: inputs.newpassword,
          id,
        });

        if (resetReq) {
          toast.success(resetReq.data.message);
          setInputs({ ...inputs, newpassword: "", currentpassword: "" });
          setSearchParams("");
          localStorage.removeItem("reset");
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="page">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-top">
          <Link to={"/"}>
            <div className="infinity"></div>
          </Link>
          <p className="form-heading" style={{ marginBottom: "20px" }}>
            Reset Your Password
          </p>
        </div>

        <div className="field">
          <label htmlFor="Npassword">New password</label>
          <input
            name="Npassword"
            id="Npassword"
            type="password"
            placeholder="Password"
            value={inputs.newpassword}
            onChange={(e) =>
              setInputs({
                ...inputs,
                newpassword: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="field">
          <label htmlFor="Cpassword">Confirm password</label>
          <input
            name="Cpassword"
            id="Cpassword"
            type="text"
            placeholder="Password"
            autoComplete="none"
            value={inputs.currentpassword}
            onChange={(e) =>
              setInputs({
                ...inputs,
                currentpassword: e.target.value,
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
