import DiaryPlaceTypeSelector from '../level-2/DiaryPlaceTypeSelector';
import DiaryInput from '../level-1/DiaryInput';
import { useState } from 'react';
import DiaryDateSelector from '../level-2/DiaryDateSelector';
import SubmitButton from '../level-1/SubmitButton';
import ImageSwiper from '../level-2/ImageSwiper';
import supabase from '@/utils/supabase';
import { getUserId } from '@/utils/auth';

function DiaryRegister() {
  const [placeText, setPlaceText] = useState('');
  const [placeType, setPlaceType] = useState('');
  const [titleText, setTitleText] = useState('');
  const [contentText, setContentText] = useState('');
  const [tagText, setTagText] = useState('');
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const handlePlaceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPlaceText(e.target.value);
  };

  const handlePlaceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlaceType(e.target.value);
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

  const parseTagsToArray = (tagString: string) => {
    if (!tagString.trim()) return [];

    return tagString
      .split(/\s+/)
      .filter((tag) => tag.startsWith('#') && tag.length > 1)
      .map((tag) => tag.substring(1));
  };

  const handleChangeDate = (value: Date) => {
    setDate(value);
  };

  const uploadImage = async (
    imageUrl: string,
    userId: string,
    diaryId: number,
    index: number
  ) => {
    try {
      if (imageUrl.startsWith('data:') || imageUrl.startsWith('blob:')) {
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        const fileType = blob.type.split('/')[1] || 'jpg';
        const filePath = `${userId}/${diaryId}/${index}.${fileType}`;

        const { data, error } = await supabase.storage
          .from('diary-images')
          .upload(filePath, blob, {
            contentType: blob.type || 'image/jpeg',
            cacheControl: '3600',
          });

        if (error) throw error;

        const { data: urlData } = supabase.storage
          .from('diary-images')
          .getPublicUrl(filePath);

        return urlData.publicUrl;
      } else {
        return imageUrl;
      }
    } catch (error: any) {
      console.error('이미지 업로드 대실패~:', error.message);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const diaryData = {
        title: titleText,
        place: placeText,
        place_type: placeType,
        content: contentText,
        post_date: date.toISOString(),
        tag: parseTagsToArray(tagText),
        is_public: true,
      };

      const { data, error } = await supabase
        .from('diaries')
        .insert(diaryData)
        .select('diary_id')
        .single();

      if (error) {
        throw new Error(error.message);
      }
      alert('다이어리 저장완료');
      const diaryId = data?.diary_id;

      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;

      if (!userId) {
        throw new Error('사용자 인증 정보를 찾을 수 없습니다.');
      }

      const imageElements = document.querySelectorAll('.swiper-slide img');
      const tempImageUrls = Array.from(imageElements).map(
        (img) => (img as HTMLImageElement).src
      );

      const uploadPromises = tempImageUrls.map((imageUrl, index) =>
        uploadImage(imageUrl, userId, diaryId, index)
      );

      const uploadedImageUrls = await Promise.all(uploadPromises);

      alert('이미지 저장완료');
    } catch (error) {
      console.error('다이어리 저장 실패:', error);
      alert('업로드 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 min-w-3/4">
      <ImageSwiper />
      <DiaryInput
        type="input"
        text={placeText}
        label="장소를 입력해주세요"
        onChange={handlePlaceChange}
      />
      <DiaryPlaceTypeSelector onChange={handlePlaceTypeChange} />

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
      <SubmitButton label="저장하기" disable={false} />
    </form>
  );
}
export default DiaryRegister;
