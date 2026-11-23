import React, { useState } from 'react';
import { FiX, FiLock, FiMail, FiUser } from 'react-icons/fi';

const REQUEST_TIMEOUT_MS = 90000; // Render free tier can take up to ~1 minute to wake up

export default function AuthModal({ onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return; // stops double-clicks sending two requests
    setError('');
    setIsLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    // Abort the request if the server takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      // If the server returns something that isn't JSON (e.g. a 502 page), don't crash
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      if (isLogin) {
        // Save JWT token and user info
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (onLoginSuccess) onLoginSuccess(data.user);
        onClose();
      } else {
        alert('Registration successful! Please log in.');
        setIsLogin(true);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('The server is taking too long to respond. Please try again.');
      } else if (err instanceof TypeError) {
        setError('Could not reach the server. Check your connection and try again.');
      } else {
        setError(err.message);
      }
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false); // runs on success and on failure
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl text-white">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white"
        >
          <FiX className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-serif font-bold text-amber-500 mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-sm text-neutral-400 mb-6">
          {isLogin ? 'Sign in to place orders & manage bookings.' : 'Register to get started with SAVORÉ.'}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Inputs are locked while the request is running */}
          <fieldset disabled={isLoading} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <FiUser className="absolute left-3 top-3.5 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 disabled:opacity-60"
                />
              </div>
            )}

            <div className="relative">
              <FiMail className="absolute left-3 top-3.5 text-neutral-500" />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 disabled:opacity-60"
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-neutral-500" />
              <input
                type="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 disabled:opacity-60"
              />
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <span className="w-5 h-5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                {isLogin ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              isLogin ? 'Sign In' : 'Register'
            )}
          </button>

          {isLoading && (
            <p className="text-xs text-neutral-500 text-center">
              Server may be waking up. This can take up to a minute.
            </p>
          )}
        </form>

        <div className="mt-6 text-center text-sm text-neutral-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            disabled={isLoading}
            className="text-amber-500 underline font-medium hover:text-amber-400 disabled:opacity-60"
          >
            {isLogin ? 'Register here' : 'Sign in here'}
          </button>
        </div>
      </div>
    </div>
  );
}