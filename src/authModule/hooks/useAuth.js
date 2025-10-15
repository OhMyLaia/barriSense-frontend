import { useEffect, useState } from "react";
import { supabase } from "../../../repositories/supabaseImplementation/supabaseClient.js";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    getUser();

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
