import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Router from "next/router";

const registerUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      Router.push("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    if (password !== password2) {
      toast.error("Password mismatch");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  return (
    <div className="grid justify-center">
      <section>
        <h1 className="flex items-center text-3xl justify-around">
          <FaUser />
          Register
        </h1>
        <p className="flex justify-center mb-4"> Please create an account </p>
      </section>
      <section>
        <form className="grid gap-y-4">
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={onChange}
            className="border-black-200 border p-2"
          />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={onChange}
            className="border-black-200 border p-2 "
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter password"
            onChange={onChange}
            className="border-black-200 border p-2 "
          />
          <input
            type="password"
            name="password2"
            value={password2}
            placeholder="Confirm password"
            onChange={onChange}
            className="border-black-200 border p-2 "
          />
          <button
          type="button"
            className="bg-black text-white p-1 "
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default registerUser;
