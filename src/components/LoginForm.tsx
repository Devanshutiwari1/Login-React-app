import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { Lock } from 'lucide-react';
import miniorangeLogo from '../images/miniorange-logo.webp';

interface LoginFormProps {
  onLogin: (credentials: { username: string; password: string; confirmPassword: string }) => void;
  onCancel: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        onLogin({ username, password, confirmPassword });
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleCancel = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
    onCancel();
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white/10" style={{backgroundAttachment: 'fixed'}}>
      <div className="w-full max-w-md mx-auto">
        <div className="backdrop-blur-xl bg-white/30 border border-white/60 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
          <div className="flex flex-col items-center mb-8">
            {/* <img src={miniorangeLogo} alt="miniOrange Logo" className="w-32 h-16 object-contain mb-6 drop-shadow-2xl" /> */}
            <img src={miniorangeLogo} alt="miniOrange Logo" className="w-[200px] h-[100px] object-contain mb-0 drop-shadow-2xl" />

            <h1 className="text-3xl font-extrabold text-orange-600 mb-2 tracking-tight text-center">Welcome</h1>
            <p className="text-gray-700 font-medium text-center">Sign in to your account</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={setUsername}
              icon="user"
              error={errors.username}
            />

            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={setPassword}
              icon="lock"
              error={errors.password}
              showPasswordToggle
            />

            <Input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              icon="lock"
              error={errors.confirmPassword}
              showPasswordToggle
            />

            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Button
                onClick={handleLogin}
                variant="primary"
                loading={isLoading}
                disabled={isLoading}
              >
                Login
              </Button>
              <Button
                onClick={handleCancel}
                variant="secondary"
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            By signing in, you agree to our <span className="text-orange-500 font-semibold">Terms of Service</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;