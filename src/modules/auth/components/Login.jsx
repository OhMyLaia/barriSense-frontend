import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../auth.css";

const Login = () => {
  const [showForm, setShowForm] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [recoverSent, setRecoverSent] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  /* useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);
 */
  const resetForm = () => {
    setUsername("");
    setEmail("");
    setConfirmEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(null);
    setIsRegistering(false);
    setIsRecovering(false);
    setShowForm(false);
    setConfirmationSent(false);
    setRecoverSent(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    /* const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    }); */
    setLoading(false);
    if (error) setError(error.message);
    else resetForm();
  };

  const handleRegister = async () => {
    if (!username.trim()) {
      setError("Username is required.");
      return;
    }
    if (email !== confirmEmail) {
      setError("Emails do not match.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    /* const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username.trim(),
        },
      },
    }); */

    setLoading(false);

    if (error) {
      setError(error.message);
    } else if (!data.session) {
      setConfirmationSent(true);
    } else {
      resetForm();
    }
  };

  const handleRecover = async () => {
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    setLoading(true);
    /* const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${import.meta.env.VITE_BASE_URL}/update-password`,
    }); */
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setRecoverSent(true);
    }
  };

  const handleLogout = async () => {
    /*  await supabase.auth.signOut(); */
    resetForm();
    setUser(null);
    navigate("/"); // Redirect to home after logout
  };

  return (
    <div className="z-[99999]">
      {user ? (
        <button
          onClick={handleLogout}
          className="bg-purple-200 text-sm px-4 py-3 uppercase rounded-lg shadow-md hover:bg-purple-300"
        >
          Logout
        </button>
      ) : !showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-200 text-sm px-2 py-3 uppercase rounded-lg shadow-md hover:bg-purple-300 relative"
        >
          Login / Register
          {loading && (
            <span className="absolute -top-1 -right-1">
              <span className="inline-block h-2 w-2 bg-red-500 rounded-full animate-ping" />
              <span className="absolute inline-block h-2 w-2 bg-red-500 rounded-full" />
            </span>
          )}
        </button>
      ) : (
        <div className="z-[9999] p-6 bg-white shadow-lg rounded-lg w-60 md:w-96 relative left-30">
          <button
            onClick={() => {
              resetForm();
              setShowForm(false);
            }}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>

          <h2 className="text-2xl font-semibold text-center mb-2">
            {isRecovering
              ? "Recuperar contrasenya"
              : isRegistering
              ? "Register"
              : "Login"}
          </h2>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {confirmationSent && (
            <div className="text-center text-green-600 font-medium">
              Registration successful! Please check your email to confirm your
              address.
            </div>
          )}

          {recoverSent && (
            <div className="text-center text-green-600 font-medium">
              Si l'adreça de correu és correcta, rebràs un missatge amb
              instruccions per recuperar la teva contrasenya.
            </div>
          )}

          {!confirmationSent && !recoverSent && (
            <div className="flex flex-col gap-4 mt-4">
              {isRegistering && !isRecovering && (
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="p-2 border rounded-lg w-full"
                  required
                  disabled={loading}
                />
              )}

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border rounded-lg w-full"
                required
                disabled={loading}
              />

              {isRegistering && !isRecovering && (
                <>
                  <input
                    type="email"
                    placeholder="Confirm Email"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    className="p-2 border rounded-lg w-full"
                    required
                    disabled={loading}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border rounded-lg w-full"
                    required
                    disabled={loading}
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="p-2 border rounded-lg w-full"
                    required
                    disabled={loading}
                  />
                </>
              )}

              {!isRegistering && !isRecovering && (
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 border rounded-lg w-full"
                  required
                  disabled={loading}
                />
              )}

              <button
                onClick={
                  isRecovering
                    ? handleRecover
                    : isRegistering
                    ? handleRegister
                    : handleLogin
                }
                disabled={loading}
                className="relative bg-purple-200 text-black p-2 rounded-lg hover:bg-purple-300 disabled:opacity-50"
              >
                {isRecovering
                  ? "Enviar instruccions"
                  : isRegistering
                  ? "Register"
                  : "Login"}
                {loading && (
                  <span className="absolute top-1/2 right-4 transform -translate-y-1/2">
                    <span className="inline-block h-2 w-2 bg-black rounded-full animate-ping" />
                    <span className="absolute inline-block h-2 w-2 bg-black rounded-full" />
                  </span>
                )}
              </button>

              {!isRecovering && (
                <button
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setError(null);
                    setConfirmationSent(false);
                  }}
                  className="text-purple-500 underline text-center"
                >
                  {isRegistering
                    ? "Ja tens un compte? Login"
                    : "Encara no tens compte? Register"}
                </button>
              )}

              {!isRecovering && (
                <button
                  onClick={() => {
                    setIsRecovering(true);
                    setIsRegistering(false);
                    setError(null);
                    setConfirmationSent(false);
                  }}
                  className="text-purple-500 underline text-center"
                >
                  Has oblidat la contrasenya?
                </button>
              )}

              {isRecovering && (
                <button
                  onClick={() => {
                    setIsRecovering(false);
                    setRecoverSent(false);
                    setError(null);
                  }}
                  className="text-purple-500 underline text-center"
                >
                  Tornar a iniciar sessió
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
