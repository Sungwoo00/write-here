import ReactCalendar from 'react-calendar';
import '@/styles/calendar.css';
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from 'react';
import useTableStore from '@/store/DiaryData';
import { useNavigate } from 'react-router-dom';

interface CalendarProps {
  date: Date | null;
  onDateChange: (date: Date) => void;
}

function Calendar({ date, onDateChange }: Omit<CalendarProps, 'diaryData'>) {
  const [dateImages, setDateImages] = useState<Record<string, string>>({});
  const setDiaryDates = useState<Set<string>>(new Set())[1];
  const [diaryIds, setDiaryIds] = useState<Record<string, number>>({});

  const navigate = useNavigate();

  const minDate = new Date(2001, 0, 1);
  const currentYear = new Date().getFullYear();
  const maxDate = new Date(currentYear + 5, 11, 31);

  const diaryData = useTableStore((state) => state.diaries);

  const getDateFromPostDate = (postDate: string): string => {
    return postDate.split('T')[0];
  };

  useEffect(() => {
    const diaryIdsMap: Record<string, number> = {};
    const imagesMap: Record<string, string> = {};
    const datesWithDiaries = new Set<string>();

    const defaultImageUrl = '/default.png';

    diaryData.forEach((item) => {
      if (!item.post_date) return;
      const dateKey = getDateFromPostDate(item.post_date);

      datesWithDiaries.add(dateKey);
      diaryIdsMap[dateKey] = item.diary_id as number;

      if (item.img && Array.isArray(item.img) && item.img.length > 0) {
        imagesMap[dateKey] = item.img[0];
      } else {
        imagesMap[dateKey] = defaultImageUrl;
      }
    });

    setDiaryDates(datesWithDiaries);
    setDateImages(imagesMap);
    setDiaryIds(diaryIdsMap);
  }, [diaryData]);

  function getTileDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleCalendarChange = (value: unknown) => {
    if (value instanceof Date) {
      onDateChange(value);
    } else if (
      Array.isArray(value) &&
      value.length > 0 &&
      value[0] instanceof Date
    ) {
      onDateChange(value[0]);
    }
  };

  const handleTileClick = (date: Date) => {
    const dateKey = getTileDateKey(date);
    const diaryId = diaryIds[dateKey];

    if (diaryId) {
      navigate(`/diary/${diaryId}`);
    }

    onDateChange(date);
  };

  const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return false;

    const dateKey = getTileDateKey(date);
    return !diaryIds[dateKey];
  };

  const getTileClassName = ({
    date,
    view,
    activeStartDate,
  }: {
    date: Date;
    view: string;
    activeStartDate: Date;
  }) => {
    if (view !== 'month') return '';

    const classes = [];

    const today = new Date();
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    const isCurrentMonthTile =
      date.getMonth() === activeStartDate.getMonth() &&
      date.getFullYear() === activeStartDate.getFullYear();

    const isSaturday = date.getDay() === 6;
    const isSunday = date.getDay() === 0;

    if (isToday) classes.push('today-circle');
    if (isSaturday && isCurrentMonthTile) classes.push('saturday-blue');
    if (isSunday && isCurrentMonthTile) classes.push('sunday-red');

    const dateKey = getTileDateKey(date);
    if (dateImages[dateKey]) {
      classes.push('has-diary-image');
      classes.push(`diary-date-${dateKey.replace(/-/g, '')}`);
    }

    return classes.join(' ');
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null;

    const dateKey = getTileDateKey(date);

    if (dateImages[dateKey]) {
      return (
        <div
          className="diary-image-background"
          style={{
            backgroundImage: `url(${dateImages[dateKey]})`,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 1,
          }}
        />
      );
    }

    return null;
  };

  return (
    <div className="big-calendar">
      <ReactCalendar
        value={date}
        showFixedNumberOfWeeks={true}
        showNeighboringMonth={false}
        onChange={handleCalendarChange}
        onClickDay={handleTileClick}
        calendarType="iso8601"
        minDate={minDate}
        maxDate={maxDate}
        prevAriaLabel="이전 달"
        nextAriaLabel="다음 달"
        prev2Label={null}
        next2Label={null}
        formatDay={(_, date) => date.getDate().toString()}
        tileDisabled={tileDisabled}
        tileClassName={getTileClassName}
        tileContent={tileContent}
        locale="ko-KR"
      />
    </div>
  );
}

export default Calendar;
