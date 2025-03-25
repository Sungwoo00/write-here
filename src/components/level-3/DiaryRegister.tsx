import DiaryPlaceTypeSelector from '@/components/level-2/DiaryPlaceTypeSelector';
import DiaryInput from '@/components/level-1/DiaryInput';
import { FormEvent, useEffect, useState } from 'react';
import DiaryDateSelector from '@/components/level-2/DiaryDateSelector';
import SubmitButton from '@/components/level-1/SubmitButton';
import ImageSwiper from '@/components/level-2/ImageSwiper';
import supabase from '@/utils/supabase';
import useTableStore from '@/store/DiaryData';
import TogglePublicButton from '@/components/level-1/TogglePublcButton';
import { useMapStore } from '@/store/Map';

function DiaryRegister() {
  const {
    tempMarker,
    initialPlace,
    initTempMarker,
    setAddMarkerMode,
    closeOverlay,
  } = useMapStore();

  const [placeText, setPlaceText] = useState(initialPlace);
  const [placeType, setPlaceType] = useState('');
  const [titleText, setTitleText] = useState('');
  const [contentText, setContentText] = useState('');
  const [tagText, setTagText] = useState('');
  const [date, setDate] = useState(new Date());
  const [isPublic, setIsPublic] = useState(true);

  const isFormValid = !!(
    placeText.trim() &&
    placeType &&
    titleText.trim() &&
    contentText.trim()
  );

  const addMarker = useTableStore((state) => state.addMarker);
  const addDiary = useTableStore((state) => state.addDiary);

  useEffect(() => {
    setPlaceText(initialPlace);
  }, [initialPlace]);

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

  const uploadMarker = async () => {
    try {
      if (!tempMarker.lat || !tempMarker.lon || !tempMarker.marker_path) {
        return null;
      }

      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;

      if (!userId) {
        throw new Error('사용자 정보를 찾을 수 없습니다.');
      }

      const markerData = {
        user_id: userId,
        lat: tempMarker.lat,
        lon: tempMarker.lon,
        marker_path: tempMarker.marker_path,
        region: tempMarker.region,
      };

      const { data, error } = await supabase
        .from('markers')
        .insert(markerData)
        .select()
        .single();

      if (error) {
        console.error('마커 저장 오류:', error);
        throw error;
      }

      if (data) {
        addMarker(data);
      }

      return data;
    } catch (error) {
      console.error('마커 업로드 오류:', error);
      return null;
    }
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

        const { error } = await supabase.storage
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
    } catch (error) {
      console.error('이미지 업로드 대실패~:', (error as Error).message);
      throw error;
    }
  };

  const createDiary = async () => {
    try {
      const markerData = await uploadMarker();
      const marker_id = markerData?.marker_id;

      const diaryData = {
        title: titleText,
        place: placeText,
        place_type: placeType,
        content: contentText,
        post_date: date.toISOString(),
        tag: parseTagsToArray(tagText),
        is_public: isPublic,
        marker_id: marker_id,
      };

      const { data, error } = await supabase
        .from('diaries')
        .insert(diaryData)
        .select('*')
        .single();

      if (error) {
        console.error('Supabase 에러:', error);
        throw new Error(error.message);
      }

      const diaryId = data?.diary_id;

      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;

      const imageElements = document.querySelectorAll('.swiper-slide img');
      const tempImageUrls = Array.from(imageElements).map(
        (img) => (img as HTMLImageElement).src
      );

      if (diaryId && userId) {
        const uploadPromises = tempImageUrls.map((imageUrl, index) =>
          uploadImage(imageUrl, userId, diaryId, index)
        );
        const result = await Promise.all(uploadPromises);
        initTempMarker();

        return { ...data, img: result };
      }
    } catch (error) {
      console.error('업로드 실패했습니다', error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newDiary = await createDiary();
    if (newDiary) {
      addDiary(newDiary);
    }
    setAddMarkerMode(false);
    initTempMarker();
    closeOverlay();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 min-w-3/4 mb-24"
    >
      <ImageSwiper />

      <div className="flex">
        <DiaryDateSelector date={date} onDateChange={handleChangeDate} />

        <TogglePublicButton isPublic={isPublic} onChange={setIsPublic} />
      </div>
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

      <DiaryInput
        type="input"
        text={tagText}
        label="태그를 입력해주세요(ex: #야무쌤안녕하세요))"
        onChange={handleTagChange}
      />
      <SubmitButton label="저장하기" disable={!isFormValid} />
    </form>
  );
}
export default DiaryRegister;
