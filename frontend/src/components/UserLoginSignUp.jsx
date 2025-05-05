import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { userLogin, userSignup } from '../service/UserService';
import { useNavigate } from 'react-router-dom';
import  useUserContext  from '../context/UserContext';

const UserLoginSignup = () => {
  const {userId, userName, userEmail,isLogin, setUserId, setUserName, setUserEmail, setIsLogin} = useUserContext();
  const [isLoginPage, setIsLoginPage] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };


  const performLogin = async () => {
    try {
      const response = await userLogin({
        email: formData.email,
        password: formData.password
      });
      toast.success('Login successful!');
      setUserId(response.id);
      setUserName(response.name);  
      setUserEmail(response.email);
      setIsLogin(true);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response.data);
    }
  }



  const performSignup = async () => {
    try {
      const response = await userSignup({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      toast.success('Signup successful!');
      setUserId(response.id);
      setUserName(response.name);  
      setUserEmail(response.email);
      setIsLogin(true);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response.data);

    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoginPage) {
      // Perform login action

      if (!formData.email || !formData.password) {
        toast.error('Please fill in all fields!');
        return;
      }
       
      performLogin();


    } else {

      // Perform signup action
      if (!formData.email || !formData.password || !formData.name || !formData.confirmPassword) {
        toast.error('Please fill in all fields!');
        return;
      }

      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        toast.error('Invalid email format!');
      }

      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters long!');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords don't match!");
        return;
      }
      
      performSignup();
    }

   

  };

  return (
    <div className="max-w-md mx-auto mt-30 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLoginPage ? 'User Login' : 'User Sign Up'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLoginPage && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {!isLoginPage && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          {isLoginPage ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        {isLoginPage ? "Don't have an account?" : 'Already have an account?'}{' '}
        <span
          onClick={() => setIsLoginPage(!isLoginPage)}
          className="text-blue-600 cursor-pointer underline"
        >
          {isLoginPage ? 'Sign up' : 'Login'}
        </span>
      </p>
    </div>
  );
};

export default UserLoginSignup;
