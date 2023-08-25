"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { serverLink } from "../ServerLink";

type LoginForm = {
  name: string;
  email: string;
  password: string;
};

export const SignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<LoginForm>();
  const router = useRouter();

  const { handleSubmit, formState } = form;
  const { errors } = formState;

  async function logIn(data: LoginForm) {
    console.log("dmjfhjdfg");
    try {
      setLoading(true);

      const res = await axios.post(
        `${serverLink}/register`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // Replace with the allowed origin
          },
          withCredentials: true,
        }
      );

      setLoading(false);

      router.push("/login");
    } catch (error) {
      console.log("error");
      setLoading(false);
    }
  }

  return (
    <>
      <form
        className="login-signin-form"
        onSubmit={handleSubmit(logIn)}
        noValidate
      >
        <div>
          <label className="login-signin-labels" htmlFor="name">
            Name
          </label>
          <input
            className="login-signin-inputs"
            required
            type="text"
            {...form.register("name", {
              required: "Name is Required",
              minLength: {
                value: 3,
                message: "Minimun 3 Characters Required",
              },
            })}
          />
          <p className="login-signin-fields-error">{errors.name?.message}</p>
        </div>
        <div>
          <label className="login-signin-labels" htmlFor="email">
            E-mail
          </label>
          <input
            required
            type="mail"
            className="login-signin-inputs"
            {...form.register("email", {
              required: "Email is Required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please Provide Email in Right Format",
              },
            })}
          />
          <p className="login-signin-fields-error">{errors.email?.message}</p>
        </div>
        <div>
          <label className="login-signin-labels" htmlFor="password">
            Password
          </label>
          <input
            required
            type="password"
            className="login-signin-inputs"
            {...form.register("password", {
              required: "Pasword is Required",
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
                message:
                  "Password Must Contain Special Character , Number and Uppercase Letter",
              },
              minLength: {
                value: 7,
                message: "Min Length is 7 Required",
              },
            })}
          />
          <p className="login-signin-fields-error">
            {errors.password?.message}
          </p>
        </div>
        <button type="submit"> {loading ? "Loading...." : "Sign In"}</button>
      </form>
    </>
  );
};
