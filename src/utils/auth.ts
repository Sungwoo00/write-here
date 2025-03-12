import supabase from './supabase';

export const getUserId = () => {
  return supabase.auth.getSession().then((value) => {
    if (value.data.session) {
      return value.data.session.user.id;
    }
  });
};

export const getErrorMessage = (msg: string) => {
  switch (msg) {
    case 'User already registered':
      return '이미 가입된 계정입니다';
    case 'Invalid login credentials':
      return '아이디 혹은 비밀번호가 올바르지 않습니다';
    default:
      return msg;
  }
};
