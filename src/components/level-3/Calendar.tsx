import ReactCalendar from 'react-calendar';
import '@/styles/calendar.css';
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from 'react';
import { tm } from '@/utils/tw-merge';
import useTableStore from '@/store/DiaryData';
import { useNavigate } from 'react-router-dom';

interface CalendarProps {
  date: Date | null;
  onDateChange: (date: Date) => void;
}

function Calendar({ date, onDateChange }: Omit<CalendarProps, 'diaryData'>) {
  const [dateImages, setDateImages] = useState<Record<string, string>>({});
  const [diaryDates, setDiaryDates] = useState<Set<string>>(new Set());
  const [diaryIds, setDiaryIds] = useState<Record<string, number>>({});

  const navigate = useNavigate();

  const minDate = new Date(2001, 0, 1);
  const currentYear = new Date().getFullYear();
  const maxDate = new Date(currentYear + 5, 11, 31);

  const diaryData = useTableStore((state) => state.diaries);

  useEffect(() => {
    const diaryIdsMap: Record<string, number> = {};
    const imagesMap: Record<string, string> = {};
    const datesWithDiaries = new Set<string>();

    diaryData.forEach((item) => {
      const dateKey = new Date(item.post_date).toISOString().split('T')[0];
      datesWithDiaries.add(dateKey);

      if (item.img && Array.isArray(item.img) && item.img.length > 0) {
        imagesMap[dateKey] = item.img[0];
        diaryIdsMap[dateKey] = item.diary_id as number;
      }
    });

    setDiaryDates(datesWithDiaries);
    setDateImages(imagesMap);
    setDiaryIds(diaryIdsMap);

    Object.entries(imagesMap).forEach(([dateKey, imageUrl]) => {
      document.documentElement.style.setProperty(
        `--bg-image-${dateKey}`,
        `url(${imageUrl})`
      );
    });
  }, [diaryData]);

  const handleCalendarChange = (value: any) => {
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
    const dateKey = date.toISOString().split('T')[0];
    const diaryId = diaryIds[dateKey];

    if (diaryId) {
      navigate(`/diary/${diaryId}`);
    }

    onDateChange(date);
  };

  const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return false;

    const dateKey = date.toISOString().split('T')[0];
    return !diaryDates.has(dateKey);
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

    const dateKey = date.toISOString().split('T')[0];

    if (dateImages[dateKey]) {
      classes.push('has-diary-image');

      setTimeout(() => {
        const elements = document.querySelectorAll(
          `.react-calendar__tile.has-diary-image`
        );
        elements.forEach((el) => {
          if (
            el instanceof HTMLElement &&
            el.querySelector(`abbr[aria-label*="${date.getDate()}"]`)
          ) {
            el.style.backgroundImage = `url(${dateImages[dateKey]})`;
          }
        });
      }, 0);
    }

    return classes.join(' ');
  };

  return (
    <div className={tm('w-full big-calendar')}>
      <ReactCalendar
        showFixedNumberOfWeeks={true}
        showNeighboringMonth={false}
        onChange={handleCalendarChange}
        onClickDay={handleTileClick}
        value={date}
        calendarType="iso8601"
        className={tm('calendar-molecule bg-white', 'lg:text-lg max-w-screen')}
        prevAriaLabel="이전 달"
        nextAriaLabel="다음 달"
        prev2Label={null}
        next2Label={null}
        navigationLabel={({ date }) => {
          return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
        }}
        tileClassName={getTileClassName}
        formatDay={(_, date) => date.getDate().toString()}
        minDate={minDate}
        maxDate={maxDate}
        minDetail="decade"
        tileDisabled={tileDisabled}
      />
    </div>
  );
}

export default Calendar;
