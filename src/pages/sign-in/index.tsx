import { useState } from 'react';
import SignInput from './components/SignInput';

function SignIn() {
  const [inputValue, setInputValueChange] = useState('');
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValueChange(value);
  };
  return (
    <div>
      <SignInput
        type="id"
        value={inputValue}
        label="아이디를 입력해주세요"
        onChange={handleChange}
        error="에러"
      ></SignInput>
    </div>
  );
}

export default SignIn;
