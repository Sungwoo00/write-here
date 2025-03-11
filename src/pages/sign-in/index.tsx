import { useState } from 'react';
import SignInput from '@/components/level-2/SignInput';

function SignIn() {
  const [inputValue, setInputValueChange] = useState('');
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValueChange(value);
  };
  return (
    <div>
      <SignInput
        type="pw"
        value={inputValue}
        label="아이디를 입력해주세요"
        onChange={handleChange}
        error="에러"
        onClear={() => {}}
      ></SignInput>
    </div>
  );
}

export default SignIn;
