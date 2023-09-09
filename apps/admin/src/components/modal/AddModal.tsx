import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import "./addmodal.scss";
type Props = {
  slug: string;
  columns: number[];
  setOpen: Dispatch<SetStateAction<boolean>>;
};
type signupform = {
  email: string;
  password: string;
  name: string;
};
const AddModal = (props: Props) => {
  const form = useForm<signupform>();
  const { handleSubmit, formState } = form;
  console.log(formState);
  function submitForm(data: signupform) {
    console.log(data);
  }
  return (
    <div className="add-modal">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          x
        </span>
        <h2>Add New {props.slug}</h2>
        <form onSubmit={handleSubmit(submitForm)} noValidate>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              type="mail"
              placeholder="email"
              {...form.register("email", {
                required: "Email is Required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please Provide Email in Right Format",
                },
              })}
            />
            <p>{formState.errors?.email?.message}</p>
          </div>
          <div className="item">
          <label htmlFor="name">Name</label>
            <input
              type="name"
              placeholder="name"
              {...form.register("name", {
                required: "Name is Required",
                minLength: {
                  value: 3,
                  message: "min Length is 3",
                },
              })}
            />
            <p>{formState.errors?.name?.message}</p>
          </div>
          <div className="item">
          <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="password"
              {...form.register("password", {
                required: "Password is Required",
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
                  message:
                    "Password Must Contain Special Character , Number and Uppercase Letter",
                },
              })}
            />

            <p>{formState.errors?.password?.message}</p>
          </div>
          <button>Create User</button>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
