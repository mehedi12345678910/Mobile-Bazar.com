import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { imageUpload, saveOrUpdateUser } from "../../utils";

const SignUp = () => {
  const {
    createUser,
    updateUserProfile,
    signInWithGoogle,
    loading: authLoading,
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Main Submit Handler
  const onSubmit = async (data) => {
    const { name, image, email, password } = data;
    const imageFile = image[0];

    try {
      // Image Upload Start
      const imageURL = await imageUpload(imageFile);

      // 1. User Registration
      await createUser(email, password);

      // 2. Save User to DB
      await saveOrUpdateUser({ name, email, image: imageURL });

      // 3. Update Profile In Firebase
      await updateUserProfile(name, imageURL);

      toast.success("Account Created Successfully!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });
      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message);
    }
  };

  // Check if anything is loading (auth or manual submission)
  const isProcessing = authLoading || isSubmitting;

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F3F4F6] px-4 py-12">
      <div className="w-full max-w-lg bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[40px] overflow-hidden p-8 md:p-12 border border-white">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Join Us
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Create an account to start shopping.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block ml-2 mb-1 text-xs font-black uppercase text-slate-400 tracking-widest">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border ${errors.name ? "border-red-400" : "border-slate-100"} focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-semibold`}
                {...register("name", { required: "Name is required" })}
              />
            </div>

            {/* Image Upload - Styled Customly */}
            <div>
              <label className="block ml-2 mb-1 text-xs font-black uppercase text-slate-400 tracking-widest">
                Profile Picture
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  {...register("image", {
                    required: "Profile picture is required",
                  })}
                />
                <div className="w-full px-5 py-3 rounded-2xl bg-blue-50 border border-dashed border-blue-200 text-blue-600 text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-100 transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Upload Image
                </div>
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block ml-2 mb-1 text-xs font-black uppercase text-slate-400 tracking-widest">
                Email Address
              </label>
              <input
                type="email"
                placeholder="hello@example.com"
                className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border ${errors.email ? "border-red-400" : "border-slate-100"} focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-semibold`}
                {...register("email", { required: "Email is required" })}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block ml-2 mb-1 text-xs font-black uppercase text-slate-400 tracking-widest">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border ${errors.password ? "border-red-400" : "border-slate-100"} focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-semibold`}
                {...register("password", {
                  required: "Password is required",
                  minLength: 6,
                })}
              />
            </div>
          </div>

          {/* Submit Button with Dynamic Loading State */}
          <button
            disabled={isProcessing}
            type="submit"
            className="w-full bg-slate-900 text-white font-black py-4 rounded-[20px] shadow-xl shadow-slate-200 hover:bg-black transition-all flex justify-center items-center gap-2 disabled:bg-slate-400 active:scale-95 mt-6"
          >
            {isProcessing ? (
              <>
                <TbFidgetSpinner className="animate-spin text-xl" />
                <span>Processing...</span>
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-[1px] bg-slate-100"></div>
          <p className="px-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">
            Or continue with
          </p>
          <div className="flex-1 h-[1px] bg-slate-100"></div>
        </div>

        {/* Google Sign-in */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex justify-center items-center space-x-3 border-2 border-slate-100 py-4 rounded-[20px] font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-95"
        >
          <FcGoogle size={24} />
          <span>Google Account</span>
        </button>

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm font-medium text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-black hover:underline underline-offset-4 uppercase text-xs tracking-wider"
          >
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
