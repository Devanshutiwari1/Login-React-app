import React from 'react';
import LoginForm from './components/LoginForm';

function App() {
  const handleLogin = (credentials: { username: string; password: string; confirmPassword: string }) => {
    console.log('Login attempted with:', {
      username: credentials.username,
      passwordLength: credentials.password.length,
      passwordsMatch: credentials.password === credentials.confirmPassword
    });
    
    alert(`Welcome, ${credentials.username}! Login successful.`);
  };

  const handleCancel = () => {
    console.log('Login cancelled');
    alert('Login cancelled. Form has been reset.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-32 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">
        <LoginForm onLogin={handleLogin} onCancel={handleCancel} />
      </div>
    </div>
  );
}

export default App;