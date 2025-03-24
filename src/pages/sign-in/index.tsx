import { useCallback, useState } from 'react';
import supabase from '@/utils/supabase';
import { debounce } from 'lodash-es';
import { isValidEmail } from '@/utils/validation';
import SignInput from '@/components/level-2/SignInput';
import SubmitButton from '@/components/level-1/SubmitButton';
import Modal from '@/components/level-2/Modal';
import { Link, useNavigate } from 'react-router-dom';
import { getErrorMessage } from '@/utils/auth';

function SignIn() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [validation, setValidation] = useState({
    email: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('');

  const signIn = async () => {
    setIsSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword(inputValue);

    if (error) {
      setModalMsg(getErrorMessage(error.message));
      setIsModalOpen(true);
      setIsSubmitting(false);
      return;
    }
    navigate('/write-here-map');
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedValidateEmail = useCallback(
    debounce((value: string) => {
      const isValid = isValidEmail(value);
      const error = isValid ? '' : '유효하지 않은 이메일 형식입니다';
      setErrors((prev) => ({ ...prev, email: error }));
      setValidation((prev) => ({ ...prev, email: isValid }));
    }, 300),
    []
  );

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue((prev) => ({ ...prev, email: value }));
    debouncedValidateEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue((prev) => ({ ...prev, password: value }));
  };

  const handleOnClear = (s: 'email' | 'password') => {
    setErrors((prev) => ({ ...prev, [s]: '' }));
    setValidation((prev) => ({ ...prev, [s]: false }));
    setInputValue((prev) => ({ ...prev, [s]: '' }));
  };

  const handleModalButtonClick = () => {
    handleOnClear('email');
    handleOnClear('password');
    setIsModalOpen(false);
  };

  const isFormValid = validation.email && inputValue.password && !isSubmitting;
  return (
    <div
      className="font-[HSSanTokki] text-[var(--dark-gray)]
    bg-[var(--light-beige)]
  flex flex-col flex-grow items-center
  py-20 lg:py-40 px-5 gap-10
  "
    >
      <h1 className="inline-flex text-[var(--logo-green)] text-2xl lg:text-3xl">
        로그인 여기적기
      </h1>
      <form
        action={signIn}
        className="w-full max-w-200 flex flex-col gap-8 lg:gap-12"
      >
        <SignInput
          type="email"
          value={inputValue.email}
          label="이메일을 입력해주세요"
          isValid={validation.email}
          onChange={handleEmailChange}
          error={errors.email}
          onClear={() => handleOnClear('email')}
        ></SignInput>
        <SignInput
          type="password"
          value={inputValue.password}
          label="비밀번호를 입력해주세요"
          onChange={handlePasswordChange}
          error={errors.password}
          onClear={() => handleOnClear('password')}
        ></SignInput>
        <div className="flex flex-col items-center gap-2 lg:gap-4 text-sm lg:text-base">
          <SubmitButton label="로그인" disable={!isFormValid} />
          <p>여기저기 회원이 아니신가요?</p>
          <Link to="/sign-up">
            <p className="text-[var(--light-green)] hover:underline">
              여기 적기 회원가입
            </p>
          </Link>
        </div>
      </form>
      <Modal
        isOpen={isModalOpen}
        buttonConfirmText="확인"
        buttonCancelText="닫기"
        onConfirm={handleModalButtonClick}
        onClose={handleModalButtonClick}
      >
        <p className="min-h-15 mt-2 text-[var(--dark-gray)] text-center">
          {modalMsg}
        </p>
      </Modal>
    </div>
  );
}

export default SignIn;
