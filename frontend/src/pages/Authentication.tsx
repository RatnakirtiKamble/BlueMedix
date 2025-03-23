import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

interface LoginResponse {
    token: string;
    role: string;
}

const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
        const response = await axios.post<LoginResponse>("http://localhost:5000/auth/login", {
            email,
            password,
        });

        const { token, role } = response.data;
        localStorage.setItem("jwt", token);
        localStorage.setItem("role", role);

        if (role === "isAdmin") {
            navigate("/admin");
        } else {
            navigate("/");
        }
    } catch (err) {
        setError("Invalid credentials");
    }
};

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Authentication;