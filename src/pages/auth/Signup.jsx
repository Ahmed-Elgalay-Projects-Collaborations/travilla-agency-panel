import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { Logo } from '../../assets/Logo';
import { FadeIn } from '../../animations/FadeIn';

export const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.elements.namedItem('email').value;
    const password = form.elements.namedItem('password').value;
    const name = form.elements.namedItem('name').value;
    
    await signup(email, password, name);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <FadeIn>
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <div className="flex justify-center mb-8">
            <Logo />
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-6">Create an account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign up
            </button>
          </form>
          
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700">
              Sign in
            </Link>
          </p>
        </div>
      </FadeIn>
    </div>
  );
};