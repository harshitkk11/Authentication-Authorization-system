import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const Verify = () => {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("t");

  useEffect(() => {
    const handleClick = async () => {
      try {
        const verifyReq = await axios.post("/verify", { token });

        if (verifyReq) {
            setSearchParams("");
            navigate("/login");
            toast.success(verifyReq.data.message);
        }
      } catch (err) {
        if (err.response.data.error === "Invalid Token") {
            navigate("/login")
            toast.error("Email verification link expired.")
        }
        else {
            toast.error("Something went wrong");
        }
      }
    };
    handleClick();
  }, []);
};

export default Verify;
