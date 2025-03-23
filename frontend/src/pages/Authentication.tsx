import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(true); 
  const navigate = useNavigate();

  interface AuthResponse {
    token: string;
    role: string;
  }

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const requestData = isLogin
        ? { email, password }
        : { name, gender, age, email, password };

      const response = await axios.post<AuthResponse>(`http://localhost:5000${endpoint}`, requestData);

      if (isLogin) {
        const { token, role } = response.data;
        localStorage.setItem("jwt", token);
        localStorage.setItem("role", role);
        navigate(role === "isAdmin" ? "/admin" : "/");
      } else {
        setIsLogin(true);
      }
      setShowModal(false);
      setError("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {showModal && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h2>
          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleAuth}>
            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-2 border rounded mb-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <select
                  className="w-full p-2 border rounded mb-2"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  type="number"
                  placeholder="Age"
                  className="w-full p-2 border rounded mb-2"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  min="1"
                />
              </>
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-2 border rounded mb-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            )}
            <button type="submit" className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-700">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button className="text-blue-500 hover:underline" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Authentication;
