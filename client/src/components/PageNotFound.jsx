import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="page">
      <Link to={"/"} style={{marginBottom: "40px"}}>
        <div className="infinity"></div>
      </Link>
      <h1>PageNotFound</h1>
      <br />
      <h4>
        Back to
        <Link
          to={"/"}
          style={{
            color: "#3B82F6",
            textDecoration: "none",
            marginLeft: "5px",
          }}
        >
          Home
        </Link>
      </h4>
    </div>
  );
}
