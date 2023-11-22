import { Link } from "react-router-dom";

export default function SentMail() {

  return (
    <div className="page">
      <Link to={"/"} style={{ marginBottom: "40px" }}>
        <div className="infinity"></div>
      </Link>
      <h1>Email Verification</h1>
      <br />
      <p style={{ width: "60%" }}>
        Your account has been successfully created, we have sent an email to
        your email address. Please verify the email by opening verification link
        sent to your email address.
      <br/>
      <b>Note:</b> If email not received in inbox, please check your spam.</p>
      <br />
      <h4>
        Back to
        <Link
          to={"/login"}
          style={{
            color: "#3B82F6",
            textDecoration: "none",
            marginLeft: "5px",
          }}
        >
          Login
        </Link>
      </h4>
    </div>
  );
}
