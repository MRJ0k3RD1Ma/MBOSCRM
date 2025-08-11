import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../public/LogoMbos.svg";
import {
  useAdminLogin,
  type LoginInput,
} from "../../config/queries/auth/login-querys";
import { User, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useAdminLogin();

  const [formData, setFormData] = useState<LoginInput>({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutateAsync(formData);
      navigate("/");
    } catch {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#001529] p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#001529] to-slate-900">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      <div
        className="w-full max-w-md rounded-2xl shadow-xl overflow-hidden p-8 
        bg-white/10 !backdrop-blur-lg border border-white/20"
      >
        <div className="text-center mb-8">
          <div className="w-full h-20 rounded-lg bg-[#1890ff20] flex items-center justify-center mb-4">
            <img src={logo} alt="Logo" />
          </div>
          <p className="text-3xl text-white font-semibold">Tizimga kirish</p>
          <p className="text-gray-300 text-sm">
            Hisobingizga kirish uchun ma'lumotlarni kiriting
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white font-medium mb-2">Login</label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white"
                size={18}
              />
              <input
                type="text"
                name="username"
                placeholder="Login kiriting"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-[#00152942] !text-white placeholder-gray-400 
                  rounded-lg pl-10 pr-3 h-12 border border-gray-600 focus:border-green-500 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Parol</label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Parol kiriting"
                value={formData.password}
                onChange={handleChange}
                style={{
                  color: "white",
                }}
                className="w-full bg-[#0015293f] !text-white placeholder-gray-400 
                  rounded-lg pl-10 pr-10 h-12 border border-gray-600 focus:border-green-500 outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff size={18} className="!text-white" />
                ) : (
                  <Eye size={18} className="!text-white" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#1890ff20] !backdrop-blur-lg !text-white font-semibold rounded-lg h-12 text-lg
               cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Kirilmoqda..." : "Kirish"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-300 text-xs">
            Parolni unutdingizmi? Administrator bilan bog'laning
          </p>
        </div>
      </div>
    </div>
  );
}
