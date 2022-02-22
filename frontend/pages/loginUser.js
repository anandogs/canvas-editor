import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Router from "next/router";


const loginUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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
      [e.target.name]: e.target.value
    }))
  };

  const handleSubmit = (e) => {
       const userData = {
        email,
        password,
      };
      dispatch(login(userData));
    }



  return (
    <div className="grid justify-center">
      <section>
        <h1 className="flex items-center text-3xl justify-around">
          <FaSignInAlt />
          Log in
        </h1>
        <p className="flex justify-center mb-4"> Login and start blogging! </p>
      </section>
      <section >
        
        <form className="grid gap-y-4">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={onChange}
            className='border-black-200 border p-2 '
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter password"
            onChange={onChange}
            className='border-black-200 border p-2 '
          />
          <button type="button" className="bg-black text-white p-1 " onClick={handleSubmit}>Submit</button>
        </form>
      </section>
    </div>
  );
};

export default loginUser;
