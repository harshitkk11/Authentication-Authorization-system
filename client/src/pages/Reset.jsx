import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import InputField from "../components/InputField";

const Reset = () => {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("t");

  const [formData, setFormData] = useState({
    newpassword: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({
    newpassword: "",
    confirmpassword: "",
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [submit, setSubmit] = useState("Change Password");

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmit("Please wait...");
    setIsDisabled(true);

    try {
      const response = await axios.post("/resetpass", {
        password: formData.newpassword,
        token,
      });

      if (response) {
        setSearchParams("");
        setFormData({
          newpassword: "",
          confirmpassword: "",
        });
        navigate("/login");
        toast.success(response.data.message);
      }
    } catch (err) {
      if (err.response.data.error === "Invalid Token") {
        navigate("/login");
        toast.error("Password reset link expired.");
      } else {
        toast.error("Something went wrong");
      }
    }
    setSubmit("change Password");
    setIsDisabled(false);
  };

  const onValidate = (e) => {
    e.preventDefault();

    if (formData.newpassword.length === 0) {
      setErrors({
        newpassword: "Please enter a password.",
        confirmpassword: "",
      });
    } else if (formData.newpassword.length < 8) {
      setErrors({
        newpassword:
          "Password length is too short. (Password length should be of atleast 8 characters)",
        confirmpassword: "",
      });
    } else if (formData.confirmpassword.length === 0) {
      setErrors({
        newpassword: "",
        confirmpassword: "Please enter password again",
      });
    } else if (formData.newpassword !== formData.confirmpassword) {
      setErrors({
        newpassword: "",
        confirmpassword: "Passwords do not match!",
      });
    } else {
      setErrors({
        newpassword: "",
        confirmpassword: "",
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
          Reset Your Password
        </p>
      </div>
      <div className="mt-3 sm:mt-5 sm:mx-auto w-full sm:max-w-sm flex flex-col gap-5 px-3 sm:px-0">
        <form className="space-y-6" onSubmit={onValidate}>
          <InputField
            label="New Password"
            type="password"
            name="newpassword"
            autocomplete="new-password"
            placeholder="New Password"
            onchange={(e) => onChangeInput(e)}
            value={formData.newpassword}
            disable={isDisabled}
            error={errors.newpassword}
          />

          <InputField
            label="Confirm Password"
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            onchange={(e) => onChangeInput(e)}
            value={formData.confirmpassword}
            disable={isDisabled}
            error={errors.confirmpassword}
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

export default Reset;
