import { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import PasswordInput from './Password';
import { FaTimesCircle } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const PASSKEYS = {
  Tutor: import.meta.env.VITE_TUTOR_PASSKEY,
  Admin: import.meta.env.VITE_ADMIN_PASSKEY
};

export default function LogingIn() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    email: '',
    password: ''
  });

  const [rolePasskey, setRolePasskey] = useState('');
  const [passkeyVerified, setPasskeyVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));


    if (name === 'course') {
      setRolePasskey('');
      setPasskeyVerified(false);
    }
  };

  const handlePasskeyChange = (e) => {
    const input = e.target.value;
    setRolePasskey(input);

    if (PASSKEYS[formData.course] && input === PASSKEYS[formData.course]) {
      setPasskeyVerified(true);
    } else {
      setPasskeyVerified(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin) {
      if ((formData.course === "Tutor" || formData.course === "Admin") && !passkeyVerified) {
        alert("Incorrect passkey. Access denied.");
        return;
      }
      alert(`Signing up ${formData.name} for ${formData.course}`);
    } else {
      alert(`Logging in as ${formData.email}`);
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col text-black m-0 max-w-2xl bg-white/70 backdrop-blur-2xl h-full shadow-2xl rounded-2xl p-8 w-full md:min-w-[500px] border border-white/60 justify-self-center"
        autoComplete='on'
      >
        <h3 className="text-3xl md:text-4xl font-medium mb-4">
          {isLogin ? 'LOG IN' : 'SIGN UP'}
        </h3>

        {!isLogin && (
          <>
            <input
              className="border-2 mb-3 rounded-sm text-2xl p-2 border-blue-950 max-w-3xl"
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="border-2 mb-3 rounded-sm text-2xl p-2 border-blue-950"
              required
            >
              <option value="">Select Course</option>
              <option value="Web Development">WEB DEVELOPMENT</option>
              <option value="Software Development">SOFTWARE DEVELOPMENT</option>
              <option value="Cyber Security">CYBER SECURITY</option>
              <option value="Data Analysis">DATA ANALYSIS</option>
              <option value="UIUX Design">UI/UX DESIGN</option>
              <option value="Computer Appreciation">COMPUTER APPRECIATION</option>
              <option value="Graphics Design">GRAPHICS DESIGN</option>
              <option value="Digital Marketing">DIGITAL MARKETING</option>
              <option value="Cloud Computing">CLOUD COMPUTING</option>
              <option value="Tutor">TUTOR</option>
              <option value="Admin">ADMIN</option>
            </select>
          </>
        )}

        {/* Dynamic Password Field for Role */}
        {!isLogin &&
          (formData.course === "Tutor" || formData.course === "Admin") &&
          !passkeyVerified && (
            <fieldset className='mb-2'>
              <legend className="ml-3">ENTER {formData.course.toUpperCase()} PASSKEY</legend>
              <div className="flex items-center">
                <input
                  type="password"
                  className="w-full h-full outline-none text-lg mx-2 mb-1 border border-gray-400 rounded"
                  value={rolePasskey}
                  onChange={handlePasskeyChange}
                />
                <FaTimesCircle
                  className="mr-3 text-xl text-red-600 cursor-pointer"
                  style={{ display: rolePasskey === "" ? "none" : "block" }}
                  onClick={() => setRolePasskey('')}
                />
              </div>
            </fieldset>
          )}

        {passkeyVerified && (
          <p className="text-green-700 font-semibold mb-2">
            {formData.course} passkey verified.
          </p>
        )}

        {/* Email + Password */}
        <input
          className="border-2 mb-3 rounded-sm text-2xl p-2 border-blue-950"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          autoComplete='email'
          required
        />

        <PasswordInput value={formData.password} onChange={handleChange} />

        {/* Forgot Password */}
        {isLogin && (
          <a
            className="hover:underline text-right mb-2 text-blue-800"
            href="/forgotten"
          >
            Forgot Password?
          </a>
        )}

        {/* Submit Button */}
        <input
          className="hover:bg-white bg-gray-400 border border-blue-950 p-2 font-bold text-2xl mb-3 rounded-xl cursor-pointer"
          type="submit"
          value={isLogin ? 'LOG IN' : 'SIGN UP'}
        />

        {/* Google Login */}
        <GoogleLogin
          onSuccess={(credentialResponse) => {
  try {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("DECODED GOOGLE RESPONSE:", decoded);
    const { name, email, picture } = decoded;

    if (!picture) {
      alert("Picture not found in decoded token.");
      console.log("Full Decoded Token:", decoded);
    }

    localStorage.setItem('bytemarkUser', JSON.stringify({ name, email, picture }));
    navigate('/dashboard');
  } catch (err) {
    console.error("Failed to decode credentials:", err);
    alert("Login failed");
  }
}}
          onError={() => {
            console.error("Google Login Failed");
          }}
          render={(renderProps) => (
            <button
              type="button"
              onClick={() => {
                if (
                  !isLogin &&
                  (formData.course === "Tutor" || formData.course === "Admin") &&
                  !passkeyVerified
                ) {
                  alert("Please enter the correct passkey before continuing with Google.");
                  return;
                }
                if (!isLogin && !formData.course) {
                  alert("Please select a course.");
                  return;
                }
                renderProps.onClick();
              }}
              className={`w-full border-2 rounded-lg px-4 py-2 text-lg font-semibold mt-2 transition ${
                (!isLogin &&
                  (formData.course === "Tutor" || formData.course === "Admin") &&
                  !passkeyVerified)
                  ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed'
                  : 'bg-white text-black border-blue-900 hover:bg-gray-100'
              }`}
            >
              Continue with Google
            </button>
          )}
        />

        {/* Toggle Login / Signup */}
        <p className="mt-5 text-lg">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{' '}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setRolePasskey('');
              setPasskeyVerified(false);
              setFormData({ name: '', course: '', email: '', password: '' });
            }}
            className="hover:underline text-blue-800"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </form>
    </GoogleOAuthProvider>
  );
}