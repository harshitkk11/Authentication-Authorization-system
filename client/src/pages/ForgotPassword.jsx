import { useState } from "react";
import axios from "axios";
import InputField from "../components/InputField";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, SetEmail] = useState("");

  const [error, setError] = useState("");

  const [status, setStatus] = useState({
    bg: "",
    color: "",
    message: "",
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [submit, setSubmit] = useState("Reset Password");

  const onSubmit = async (e) => {
    e.preventDefault();

    setSubmit("Please wait");
    setIsDisabled(true);

    try {
      await axios.post("/reset", { email }).then((response) => {
        const res = response.data;
        if (res && res.message === "Reset email sent") {
          setStatus({
            bg: "secondary",
            color: "secondary-light",
            message:
              "Password reset link sent successfully. Please check your inbox to reset your password through reset link sent.",
          });
          SetEmail("")
        } else if (res.error) {
          setStatus({
            bg: "error-background",
            color: "error",
            message: res.error,
          });
        }
      });
    } catch (error) {
      setStatus({
        bg: "error-background",
        color: "error",
        message: "Something went wrong!!",
      });
    }

    setSubmit("Reset Password");
    setIsDisabled(false);
  };

  const onValidate = (e) => {
    e.preventDefault();

    if (email.length === 0) {
      setError("Please enter your email.");
    } else {
      setError("");

      onSubmit(e);
    }
  };

  return (
    <div className="w-full flex min-h-[100vh] flex-col items-center justify-center px-6 py-12 lg:px-8">
      <div className="flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm">
        <Link to="/" className="text-4xl font-extrabold">
          LogInAuth
        </Link>
        <p className="mt-6 sm:mt-10 text-center text-2xl font-bold leading-9 tracking-tight opacity-70">
          Forgot your password?
        </p>
        <p className="w-full mt-5 text-center text-xl font-medium text-black opacity-70">
          Enter your email below to receive a password reset link.
        </p>
      </div>
      <div className="mt-3 sm:mt-5 sm:mx-auto w-full sm:max-w-sm flex flex-col gap-5 px-3 sm:px-0">
        <p
          className={`text-lg px-4 text-center rounded-lg bg-opacity-65 bg-${
            status.bg
          } text-${status.color} ${
            status.message ? "visible py-2" : "invisible py-0"
          }`}
        >
          {status.message}
        </p>
        <form className="space-y-6" onSubmit={onValidate}>
          <InputField
            label="Email"
            type="email"
            name="email"
            autocomplete="email"
            placeholder="Enter your Email"
            onchange={(e) => SetEmail(e.target.value)}
            value={email}
            disable={isDisabled}
            error={error}
          />

          <button
            className="w-[100%] !mt-16 p-3 text-white text-lg font-semibold bg-secondary rounded-lg"
            disabled={isDisabled}
          >
            {submit}
          </button>
        </form>
        <p className="mt-5 flex items-center justify-center gap-2 text-lg text-text-color-light dark:text-text-color-dark">
          Back to{" "}
          <Link to="/login" className="text-link">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
