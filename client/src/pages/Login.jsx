import axios from "axios";
import { useState } from "react";
import InputField from "../components/InputField";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [submit, setSubmit] = useState("Log In");

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmit("Please wait");
    setIsDisabled(true);

    try {
      const response = await axios.post("/signin", formData);
      const res = response.data;

      if (res && res.message === "Logged in successfully") {
        setFormData({
          email: "",
          password: "",
        });
        localStorage.setItem("islogin", true);
        navigate("/dashboard");
        window.location.reload();
      } else if (res.error) {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error("Something went wrong!!");
    }

    setSubmit("Log In");
    setIsDisabled(false);
  };

  const onValidate = (e) => {
    e.preventDefault();

    if (formData.email.length === 0) {
      setErrors({
        email: "Please enter your email.",
        password: "",
      });
    } else if (formData.password.length === 0) {
      setErrors({
        email: "",
        password: "Please enter your password",
      });
    } else {
      setErrors({
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
          Sign in to your account
        </p>
      </div>
      <div className="mt-3 sm:mt-5 sm:mx-auto w-full sm:max-w-sm flex flex-col gap-5 px-3 sm:px-0">
        <form className="space-y-6" onSubmit={onValidate}>
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
            autocomplete="current-password"
            placeholder="Password"
            onchange={(e) => onChangeInput(e)}
            value={formData.password}
            disable={isDisabled}
            error={errors.password}
          />

          <p className="flex justify-end">
            <Link to="/forgot" className="text-link">
              Forgot Password?
            </Link>
          </p>

          <button
            className="w-[100%] !mt-16 p-3 text-white text-lg font-semibold bg-secondary rounded-lg"
            disabled={isDisabled}
          >
            {submit}
          </button>
        </form>
        <p className="mt-5 flex items-center justify-center gap-2 text-lg text-text-color-light dark:text-text-color-dark">
          Don't have an account?{" "}
          <Link to="/signup" className="text-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
