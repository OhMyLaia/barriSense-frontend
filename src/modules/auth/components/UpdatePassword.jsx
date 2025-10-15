import { useState, useEffect } from "react";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Ensure the recovery session is active when they land here
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.includes("type=recovery")) {
      setError("Enllaç de recuperació invàlid o caducat.");
    }
  }, []);

  const handleUpdatePassword = async () => {
    setError(null);
    setMessage(null);

    if (!password || !confirmPassword) {
      setError("Has d'introduir i confirmar la nova contrasenya.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Les contrasenyes no coincideixen.");
      return;
    }

    setLoading(true);
    /*  const { error } = await supabase.auth.updateUser({ password }); */
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setMessage("La teva contrasenya s'ha actualitzat correctament.");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto mt-50">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Canviar contrasenya
      </h2>

      {error && (
        <p className="text-red-500 text-sm text-center mb-2">{error}</p>
      )}
      {message && (
        <p className="text-green-600 text-sm text-center mb-2">{message}</p>
      )}

      {!message && (
        <div className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Nova contrasenya"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded-lg w-full"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Confirma la contrasenya"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 border rounded-lg w-full"
            disabled={loading}
          />
          <button
            onClick={handleUpdatePassword}
            disabled={loading}
            className="relative bg-purple-200 text-black p-2 rounded-lg hover:bg-purple-300 disabled:opacity-50"
          >
            Actualitzar contrasenya
            {loading && (
              <span className="absolute top-1/2 right-4 transform -translate-y-1/2">
                <span className="inline-block h-2 w-2 bg-black rounded-full animate-ping" />
                <span className="absolute inline-block h-2 w-2 bg-black rounded-full" />
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
