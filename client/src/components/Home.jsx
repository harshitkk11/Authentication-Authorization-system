import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="Home">
      <div className="home">
        <Link to={"/"} style={{ marginBottom: "40px" }}>
          <div className="infinity"></div>
        </Link>
        <h1>Home</h1>
        <p>
          This is a home page of login authentication and authorization System.
          You can click log in button if you already created your account else
          you can click sign up to create your new account.
        </p>
        <div className="home-buttons">
          <Link to={"/login"}>
            <button>Login</button>
          </Link>
          <Link to={"/signup"}>
            <button>Signup</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
