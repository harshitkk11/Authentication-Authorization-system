import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function VerifyMail() {
  const navigate = useNavigate()
  let [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const verifyReq = await axios.post("/verify", { id });

      if (verifyReq) {
        toast.success(verifyReq.data.message);
        setSearchParams("");
        localStorage.removeItem("verify")
        const interval = setInterval(() => {
          navigate("/login")
        }, 1000 * 2.5);
        return () => clearInterval(interval);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="form-top">
          <Link to={"/"}>
            <div className="infinity"></div>
          </Link>
          <p className="container-heading">Verify your email address</p>
          <p className="instruction" style={{ fontSize: "17px" }}>
            To start using application, we need to verify your email ID.
          </p>
        </div>

        <button
          onClick={(e) => handleClick(e)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            padding: "20px",
          }}
        >
          CLICK TO VERIFY
        </button>
      </div>
    </div>
  );
}
