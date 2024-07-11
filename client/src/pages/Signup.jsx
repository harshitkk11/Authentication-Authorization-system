import axios from "axios";
import { useState } from "react";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [status, setStatus] = useState({
    color: "",
    message: "",
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [submit, setSubmit] = useState("Sign Up");

  const specialChars = /[ @!#$%^&*()+=_,.`~-]/;

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmit("Please wait");
    setIsDisabled(true);

    try {
      const response = await axios.post("/signup", formData);
      const res = response.data;

      if (res && !res.error) {
        if (res.message === "Signed up successfully") {
          setStatus({
            color: "secondary",
            message:
              "Registration successfull. Please check your inbox for a verification email to confirm your email address.",
          });
          setFormData({
            name: "",
            username: "",
            email: "",
            password: "",
          });
        } else if (res.message === "Username already exist") {
          setErrors({
            name: "",
            username: "Username already exist",
            email: "",
            password: "",
          });
        } else if (res.message === "Email already exist") {
          setErrors({
            name: "",
            username: "",
            email: "Email already exist",
            password: "",
          });
        } else {
          setStatus({
            color: "disabled",
            message: res.message,
          });
        }
      } else {
        throw new Error(res.error);
      }
    } catch (error) {
      setStatus({
        color: "error",
        message: "Something went wrong!!",
      });
    }

    setSubmit("Sign Up");
    setIsDisabled(false);
  };

  const onValidate = (e) => {
    e.preventDefault();

    if (formData.name.length < 3) {
      setErrors({
        name: "Please enter your name.",
        username: "",
        email: "",
        password: "",
      });
    } else if (formData.username.length === 0) {
      setErrors({
        name: "",
        username: "Please enter a username.",
        email: "",
        password: "",
      });
    } else if (specialChars.test(formData.username)) {
      setErrors({
        name: "",
        username: "Please enter a valid username.",
        email: "",
        password: "",
      });
    } else if (formData.email.length === 0) {
      setErrors({
        name: "",
        username: "",
        email: "Please enter a valid email address.",
        password: "",
      });
    } else if (formData.password.length < 8) {
      setErrors({
        name: "",
        username: "",
        email: "",
        password:
          "Password length is too short. (Password length should be of atleast 8 characters)",
      });
    } else {
      setErrors({
        name: "",
        username: "",
        email: "",
        password: "",
      });

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
          Create your account
        </p>
      </div>
      <div className="mt-3 sm:mt-5 sm:mx-auto w-full sm:max-w-sm flex flex-col gap-5 px-3 sm:px-0">
        <p
          className={`text-lg px-4 text-center rounded-lg bg-opacity-65 bg-${
            status.color
          } text-${status.color} ${
            status.message ? "visible py-2" : "invisible py-0"
          }`}
        >
          {status.message}
        </p>
        <form className="space-y-6" onSubmit={onValidate}>
          <InputField
            label="Name"
            type="text"
            name="name"
            autocomplete="name"
            placeholder=" Enter Your Name"
            onchange={(e) => onChangeInput(e)}
            value={formData.name}
            disable={isDisabled}
            error={errors.name}
          />

          <InputField
            label="Username"
            type="text"
            name="username"
            autocomplete="username"
            placeholder="Enter a Username"
            onchange={(e) => onChangeInput(e)}
            value={formData.username}
            disable={isDisabled}
            error={errors.username}
          />

          <InputField
            label="Email"
            type="email"
            name="email"
            autocomplete="email"
            placeholder="Enter your Email"
            onchange={(e) => onChangeInput(e)}
            value={formData.email}
            disable={isDisabled}
            error={errors.email}
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            autocomplete="new-password"
            placeholder="Password"
            onchange={(e) => onChangeInput(e)}
            value={formData.password}
            disable={isDisabled}
            error={errors.password}
          />

          <button
            className="w-[100%] !mt-16 p-3 text-white text-lg font-semibold bg-secondary rounded-lg"
            disabled={isDisabled}
          >
            {submit}
          </button>
        </form>
        <p className="mt-5 flex items-center justify-center gap-2 text-lg text-text-color-light dark:text-text-color-dark">
          Already have an account?{" "}
          <Link to="/login" className="text-link">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
