import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Welcome() {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState();
  localStorage.setItem("firstRender", true);

  const sendLogoutreq = async () => {
    const res = await axios.post("/logout", null, {
      withCredentials: true,
    }).catch((err) => {return err})

    return res
  };

  const handleLogout = (e) => {
    e.preventDefault();
    sendLogoutreq().then(() => {
      localStorage.removeItem("user");
      navigate("/");
    });
  };

  const refreshToken = async () => {
    const res = await axios
      .get("/refresh", {
        withCredentials: true,
      })
      .catch(() => {
        toast.error("Something went wrong");
        localStorage.removeItem("user");
      });

    const data = await res.data;
    return data;
  };

  useEffect(() => {
    if (localStorage.getItem("firstRender")) {
      localStorage.removeItem("firstRender");
      refreshToken().then((data) => setUserdata(data.user));
    }
    let interval = setInterval(() => {
      refreshToken().then((data) => setUserdata(data.user));
    }, 1000 * 29);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page">
      {userdata && <h1>Welcome {userdata.name}</h1>}
      <button
        onClick={(e) => handleLogout(e)}
        style={{ width: "20%", height: "47px" }}
      >
        Logout
      </button>
    </div>
  );
}
