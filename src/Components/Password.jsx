import { useState, useRef } from "react";
import { FaEye, FaEyeSlash, FaExclamationCircle } from "react-icons/fa";

export default function PasswordInput({
  value,
  onChange,
  placeholder = "Password",
  name = "password"
}) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const passwordRef = useRef(null);

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password)) return "Include at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Include at least one lowercase letter";
    if (!/[0-9]/.test(password)) return "Include at least one number";
    if (!/[^A-Za-z0-9]/.test(password)) return "Include at least one symbol";
    return "";
  };

  const handleFocus = () => setTouched(true);

  return (
    <div className="relative w-full">
      <input
        type={show ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e);
          if (touched) setError(validatePassword(e.target.value));
        }}
        onFocus={handleFocus}
        ref={passwordRef}
        className={`border-2 mb-3 rounded-sm text-2xl p-2 pr-18 w-full ${
          touched && error ? "border-red-500" : "border-blue-950"
        }`}
        autoComplete="current-password"
        required
      />

      <div className="absolute flex gap-3 right-5 top-5">
        {touched && error && (
          <div className="text-red-500" title={error}>
            <FaExclamationCircle />
          </div>
        )}

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="text-gray-600 hover:text-blue-800"
          aria-label="Toggle password visibility"
        >
          {show ? <FaEyeSlash title="Hide Password" /> : <FaEye title="Show Password" />}
        </button>
      </div>

      {touched && error && <p className="text-red-500 mb-1 text-lg">{error}</p>}
    </div>
  );
}