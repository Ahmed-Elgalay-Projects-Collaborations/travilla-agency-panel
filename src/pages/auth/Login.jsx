import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { Logo } from "../../assets/Logo";
import { FadeIn } from "../../animations/FadeIn";
import * as yup from "yup";
import { Input } from "@heroui/react";
import { useFormik } from "formik";
import { Bounce, toast } from "react-toastify";
import { Button } from "@heroui/react";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [IsLoading, setIsLoading] = useState(false);
  const onSubmit = async (values) => {
    const { email, password } = values;
    console.log(email, password);
    setIsLoading(true);
    try {

      const res = await login(email, password);
      navigate("/");
      
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        closeOnClick: true,
        theme: "light",
        transition: Bounce,
      });
    }
    catch (error) {
      
      toast.error(error || "Invalid Email or Password", {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        closeOnClick: true,
        theme: "light",
        transition: Bounce,
      });
      

    } finally {
      setIsLoading(false);
    }
  };

  const initialValues = {
    email: "",
    password: "",
  };

  // Not Needed in Login
  // const vaildationSchema = yup.object({
  //   email: yup.string().email().required("Email field is required"),
  //   password: yup
  //     .string()
  //     .required("Password field is required")
  //     .matches(
  //       /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  //       "Password must be at least 8 characters long and contain at least one letter and one number"
  //     ),
  // });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
  } = useFormik({
      initialValues,
      onSubmit,
    });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <FadeIn>
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <div className="flex justify-center mb-8">
            <Logo />
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">
            Login to your account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                placeholder="joe.doe@example.com"
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                errorMessage="Please enter a valid email address"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                value={values.password}
                placeholder="something only you should know 😉"
              />
            </div>

            <Button
              isLoading={IsLoading}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login in
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account? contact your agency or{" "}
            <Link to="/signup" className="text-blue-600 hover:text-blue-700">
              create a agency account
            </Link>
          </p>
        </div>
        
      </FadeIn>
    </div>
  );
};
