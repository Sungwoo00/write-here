import { useEffect, useState } from 'react';
import supabase from '@/utils/supabase';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };

    checkSession();
  }, []);

  return { isLoggedIn };
};
