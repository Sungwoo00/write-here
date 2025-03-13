import DiaryPlaceTypeSelector from '../level-2/DiaryPlaceTypeSelector';
import DiaryInput from '../level-1/DiaryInput';
import { useState } from 'react';
import DiaryDateSelector from '../level-2/DiaryDateSelector';
import SubmitButton from '../level-1/SubmitButton';

function DiaryRegister() {
  const [placeText, setPlaceText] = useState('');
  const [titleText, setTitleText] = useState('');
  const [contentText, setContentText] = useState('');
  const [tagText, setTagText] = useState('');
  const [date, setDate] = useState<Date>(new Date());

  const handlePlaceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPlaceText(e.target.value);
  };

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitleText(e.target.value);
  };

  const handleContentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContentText(e.target.value);
  };

  const handleTagChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTagText(e.target.value);
  };

  const handleChangeDate = (value: Date) => {
    console.log('change Date~');
    setDate(value);
  };

  return (
    <form className="flex flex-col gap-4 min-w-3/4">
      <DiaryInput
        type="input"
        text={placeText}
        label="장소를 입력해주세요"
        onChange={handlePlaceChange}
      />
      <DiaryPlaceTypeSelector />

      <DiaryInput
        type="input"
        text={titleText}
        label="제목을 입력해주세요"
        onChange={handleTitleChange}
      />

      <DiaryInput
        type="textarea"
        text={contentText}
        label="내용을 입력해주세요"
        onChange={handleContentChange}
      />

      <DiaryDateSelector date={date} onDateChange={handleChangeDate} />

      <DiaryInput
        type="input"
        text={tagText}
        label="태그를 입력해주세요(ex: #야무쌤안녕하세요))"
        onChange={handleTagChange}
      />
      <SubmitButton label="저장하기" />
    </form>
  );
}
export default DiaryRegister;
