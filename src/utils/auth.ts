import supabase from './supabase';

export const getUserId = () => {
  return supabase.auth.getSession().then((value) => {
    if (value.data.session) {
      return value.data.session.user.id;
    }
  });
};
