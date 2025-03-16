import { useCallback, useState } from 'react';
import supabase from '@/utils/supabase';
import { debounce } from 'lodash-es';
import { isValidEmail, isValidPw } from '@/utils/validation';
import SignInput from '@/components/level-2/SignInput';
import Modal from '@/components/level-2/Modal';
import Checkbox from '@/components/level-1/Checkbox';
import SubmitButton from '@/components/level-1/SubmitButton';
import { Link, useNavigate } from 'react-router-dom';
import { getErrorMessage } from '@/utils/auth';

function SignUp() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    nickname: '',
  });
  const [pwConfirmValue, setPwConfirmValue] = useState('');
  const [checkList, setCheckList] = useState([false, false]);
  const [validation, setValidation] = useState({
    email: false,
    password: false,
    pwConfirm: false,
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    pwConfirm: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('');

  const signUp = async () => {
    const { email, password, nickname } = inputValue;
    setIsSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nickname },
      },
    });
    if (error) {
      setModalMsg(getErrorMessage(error.message));
      setIsModalOpen(true);
      setIsSubmitting(false);
      return;
    }
    setModalMsg('회원가입이 완료되었습니다');
    setIsModalOpen(true);
    setIsSubmitting(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedValidateEmail = useCallback(
    debounce((value: string) => {
      const isValid = isValidEmail(value);
      const error = isValid
        ? '유효한 형식입니다'
        : '유효하지 않은 이메일 형식입니다';
      setErrors((prev) => ({ ...prev, email: error }));
      setValidation((prev) => ({ ...prev, email: isValid }));
    }, 300),
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedValidatePassword = useCallback(
    debounce((value: string) => {
      const isValid = isValidPw(value);
      const error = isValid
        ? '유효한 형식입니다'
        : '비밀번호는 8~15자, 영문, 숫자, 특수문자를 포함해야 합니다.';
      setErrors((prev) => ({ ...prev, password: error }));
      setValidation((prev) => ({ ...prev, password: isValid }));
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
    debouncedValidatePassword(value);
  };

  const handlePwConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPwConfirmValue(value);
    const isValid = value === inputValue.password;
    const error = isValid
      ? '비밀번호가 일치합니다'
      : '비밀번호가 일치하지 않습니다.';
    setErrors((prev) => ({ ...prev, pwConfirm: error }));
    setValidation((prev) => ({ ...prev, pwConfirm: isValid }));
  };

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue((prev) => ({ ...prev, nickname: value }));
  };

  const handleCheckChange = (index: number) => {
    setCheckList((prev) => prev.map((item, i) => (i === index ? !item : item)));
  };

  const isFormValid =
    validation.email &&
    validation.password &&
    validation.pwConfirm &&
    checkList.every(Boolean) &&
    !isSubmitting;

  const handleModalButtonClick = () => {
    if (modalMsg === '회원가입이 완료되었습니다') {
      navigate('/sign-in');
    }
    setIsModalOpen(false);
  };

  const handleOnClear = (
    s: 'email' | 'password' | 'pwConfirm' | 'nickname'
  ) => {
    if (s === 'nickname') {
      setInputValue((prev) => ({ ...prev, nickname: '' }));
      return;
    }
    setErrors((prev) => ({ ...prev, [s]: '' }));
    setValidation((prev) => ({ ...prev, [s]: false }));
    if (s === 'pwConfirm') {
      setPwConfirmValue('');
    }
    setInputValue((prev) => ({ ...prev, [s]: '' }));
  };

  return (
    <div
      className="font-[HSSanTokki] text-[var(--dark-gray)]
      bg-[var(--light-beige)]
    flex flex-col flex-grow items-center
    py-10 px-5 gap-10
    "
    >
      <h1 className="inline-flex text-[var(--logo-green)] text-2xl lg:text-3xl">
        회원가입 여기적기
      </h1>
      <form
        action={signUp}
        className="w-full max-w-200 flex flex-col gap-8 lg:gap-12"
      >
        <SignInput
          type="email"
          value={inputValue.email}
          label="이메일 입력"
          error={errors.email}
          isValid={validation.email}
          onChange={handleEmailChange}
          onClear={() => handleOnClear('email')}
        ></SignInput>
        <SignInput
          type="password"
          value={inputValue.password}
          label="비밀번호 입력"
          onChange={handlePasswordChange}
          error={errors.password}
          isValid={validation.password}
          onClear={() => handleOnClear('password')}
        />
        <SignInput
          type="password"
          value={pwConfirmValue}
          label="비밀번호 확인"
          onChange={handlePwConfirmChange}
          error={errors.pwConfirm}
          isValid={validation.pwConfirm}
          onClear={() => handleOnClear('pwConfirm')}
        />
        <SignInput
          type="text"
          value={inputValue.nickname}
          label="닉네임 입력"
          onChange={handleNickNameChange}
          onClear={() => handleOnClear('nickname')}
        ></SignInput>
        <div className="flex flex-col gap-2 lg:gap-4 text-sm lg:text-base">
          <Checkbox
            checked={checkList[0]}
            onChange={() => handleCheckChange(0)}
            label="[필수] 개인정보 수집 및 이용 동의"
          />
          <Checkbox
            checked={checkList[1]}
            onChange={() => handleCheckChange(1)}
            label="[필수] 서비스 이용약관 동의"
          />
        </div>
        <div className="flex flex-col items-center gap-2 lg:gap-4 text-sm lg:text-base">
          <SubmitButton label="회원가입" disable={!isFormValid} />
          <p>이미 계정이 있나요?</p>
          <Link to="/sign-in">
            <p className="text-[var(--light-green)] hover:underline">
              여기 적기 로그인
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

export default SignUp;
