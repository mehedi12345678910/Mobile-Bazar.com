import { Link, Navigate, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { saveOrUpdateUser } from "../../utils";

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state || "/";

  if (loading && !user) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace={true} />;

  // Form Submit Handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const { user: loggedUser } = await signIn(email, password);

      await saveOrUpdateUser({
        name: loggedUser?.displayName,
        email: loggedUser?.email,
        image: loggedUser?.photoURL,
      });

      navigate(from, { replace: true });
      toast.success("Welcome Back!");
    } catch (err) {
      console.log(err);
      toast.error(err?.message || "Invalid email or password");
      setLoading(false);
    }
  };

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      const { user: googleUser } = await signInWithGoogle();

      await saveOrUpdateUser({
        name: googleUser?.displayName,
        email: googleUser?.email,
        image: googleUser?.photoURL,
      });

      navigate(from, { replace: true });
      toast.success("Google Login Successful");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F3F4F6] px-4 py-12">
      <div className="w-full max-w-lg bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[40px] overflow-hidden p-8 md:p-12 border border-white">
        {/* --- Header Section --- */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-slate-500 font-medium mt-2 italic">
            Sign in to continue your journey
          </p>
        </div>

        {/* --- Login Form --- */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block ml-2 mb-1 text-xs font-black uppercase text-slate-400 tracking-widest">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-semibold text-slate-800 shadow-sm"
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center ml-2 mb-1">
                <label className="text-xs font-black uppercase text-slate-400 tracking-widest">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[10px] font-bold text-blue-500 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-semibold text-slate-800 shadow-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-slate-900 text-white font-black py-4 rounded-[20px] shadow-xl shadow-slate-200 hover:bg-black transition-all flex justify-center items-center gap-2 disabled:bg-slate-400 active:scale-95 mt-4"
          >
            {loading ? (
              <>
                <TbFidgetSpinner className="animate-spin text-xl" />
                <span>Authenticating...</span>
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* --- Divider --- */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-[1px] bg-slate-100"></div>
          <p className="px-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">
            Secure Login
          </p>
          <div className="flex-1 h-[1px] bg-slate-100"></div>
        </div>

        {/* --- Google Sign-in --- */}
        <button
          disabled={loading}
          onClick={handleGoogleSignIn}
          className="w-full flex justify-center items-center space-x-3 border-2 border-slate-100 py-4 rounded-[20px] font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-95"
        >
          <FcGoogle size={24} />
          <span>Continue with Google</span>
        </button>

        {/* --- Footer Link --- */}
        <p className="mt-10 text-center text-sm font-medium text-slate-500">
          New to our platform?{" "}
          <Link
            to="/signup"
            state={from}
            className="text-blue-600 font-black hover:underline underline-offset-4 uppercase text-xs tracking-wider"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
