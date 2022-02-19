import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

const register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

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
          <FaUser />
          Register
        </h1>
        <p className="flex justify-center"> Please create an account </p>
      </section>
      <section >
        
        <form className="grid gap-y-4">
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={onChange}
            className='border-black-200 border p-2 mt-4'
          />
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
          <input
            type="password"
            name="password2"
            value={password2}
            placeholder="Confirm password"
            onChange={onChange}
            className='border-black-200 border p-2 '
          />
          <button type="submit" className="bg-black text-white p-1 " onSubmit={handleSubmit}>Submit</button>
        </form>
      </section>
    </div>
  );
};

export default register;
