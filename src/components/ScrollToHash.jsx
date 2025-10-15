import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    // Skip Supabase auth hashes (access_token, refresh_token, type=recovery, etc.)
    const isSupabaseHash =
      hash.includes("access_token") ||
      hash.includes("type=recovery") ||
      hash.includes("refresh_token");

    if (isSupabaseHash) return;

    // Only scroll if hash corresponds to a DOM element
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  return null;
};

export default ScrollToHash;
