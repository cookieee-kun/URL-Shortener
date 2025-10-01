function AuthToggle({ mode, onToggle }) {
  return (
    <p className="text-center mt-4 text-sm text-gray-600">
      {mode === "login" ? (
        <>
          Don’t have an account?{" "}
          <button
            onClick={() => onToggle("register")}
            className="text-blue-500 hover:underline"
          >
            Register
          </button>
        </>
      ) : (
        <>
          Already have an account?{" "}
          <button
            onClick={() => onToggle("login")}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </>
      )}
    </p>
  );
}

export default AuthToggle;
