import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";

const login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  };

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="grid justify-center">
      <section>
        <h1 className="flex items-center text-3xl justify-around">
          <FaSignInAlt />
          Log in
        </h1>
        <p className="flex justify-center"> Login and start blogging! </p>
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
          <button type="submit" className="bg-black text-white p-1 " onSubmit={handleSubmit}>Submit</button>
        </form>
      </section>
    </div>
  );
};

export default login;
