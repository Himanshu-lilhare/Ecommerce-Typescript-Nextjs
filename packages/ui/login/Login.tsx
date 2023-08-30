"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { cartAtom, userAtom } from "store";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { serverLink } from "../ServerLink";
import { getCart } from "../apiCalls/cart/getCart";
import "./login.css";
import { toast } from "react-hot-toast";

type LoginForm = {
  email: string;
  password: string;
};

export const Login = () => {
  const setUser = useSetRecoilState(userAtom);
  const setCart = useSetRecoilState(cartAtom);
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
        `${serverLink}/login`,
        {
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

      console.log("Authentictae true ", res);

      setLoading(false);
      setUser({ isAuthenticated: true, user: res?.data?.user });
      router.push("/");
      const cartData = await getCart();

      if (cartData.userCart.length > 0) {
        setCart(cartData.userCart);
      }
    } catch (error) {
      console.log("error");
      setLoading(false);
    }
  }
  useEffect(() => {
    if (window.location.href.split("?")[1]) {
      toast.error("You Are Not LoggedIn");
    }
  }, []);

  return (
    <>
      <form
        className="login-signin-form"
        onSubmit={handleSubmit(logIn)}
        noValidate
      >
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
                message: "Min Length is 7",
              },
            })}
          />
          <p className="login-signin-fields-error">
            {errors.password?.message}
          </p>
        </div>
        <button type="submit"> {loading ? "Loading...." : "LogIn"}</button>
      </form>
    </>
  );
};
