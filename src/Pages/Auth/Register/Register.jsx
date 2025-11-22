import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";

const Register = () => {
  const { registerUser, updateUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    console.log(data);
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);

        const formData = new FormData();
        formData.append("image", profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          console.log("image upload", res.data.data.url);
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          updateUser(userProfile)
            .then()
            .catch((error) => {
              console.log(error);
            });
          navigate(location?.state || "/");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0">
      <div className="mx-5">
        <h1 className="text-4xl font-bold">Create an Account</h1>
        <p className="font-medium text-accent">Register with ZapShift</p>
      </div>
      <form onSubmit={handleSubmit(handleRegister)} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input w-full"
            placeholder="Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-700">Name is a required field</p>
          )}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input file-input-ghost"
          />
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-700">Email is a required field</p>
          )}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
            })}
            className="input w-full"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-700">password is a required field</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-700">
              Password must be 6 characters or larger
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-700">
              Password must have at least one uppercase and lowercase, one
              special and one number
            </p>
          )}

          <button className="btn btn-primary text-black mt-4">Register</button>
        </fieldset>
        <p className="text-accent">
          Already have an account?{" "}
          <Link
            state={location.state}
            to="/login"
            className="text-primary link link-hover"
          >
            Login
          </Link>
        </p>
        <p className="text-accent text-center text-base">Or</p>
        <SocialLogin></SocialLogin>
      </form>
    </div>
  );
};

export default Register;
