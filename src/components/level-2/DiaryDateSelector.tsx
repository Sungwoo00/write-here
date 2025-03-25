import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@/styles/diaryDateSelector.css';
import { useState } from 'react';
import { tm } from '@/utils/tw-merge';

type CalendarValue = Date | Date[] | null;

interface DiaryDateSelectorProps {
  date: Date | null;
  onDateChange: (date: Date) => void;
}

function DiaryDateSelector({ date, onDateChange }: DiaryDateSelectorProps) {
  const [showCalendar, setShowCalendar] = useState(false);

  const minDate = new Date(2001, 0, 1);

  const now = new Date();
  const koreaTimeOffset = 9 * 60;
  const localTimeOffset = now.getTimezoneOffset();
  const totalOffset = koreaTimeOffset + localTimeOffset;

  const koreaDate = new Date(now.getTime() + totalOffset * 60 * 1000);
  koreaDate.setHours(23, 59, 59, 999);

  const maxDate = koreaDate;

  const handleCalendarChange = (value: CalendarValue) => {
    if (value instanceof Date) {
      onDateChange(value);
      setShowCalendar(false);
    } else if (
      Array.isArray(value) &&
      value.length > 0 &&
      value[0] instanceof Date
    ) {
      onDateChange(value[0]);
      setShowCalendar(false);
    }
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
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

    if (date > maxDate) classes.push('disabled-date');

    return classes.join(' ');
  };

  const formatSelectedDate = (date: Date | null) => {
    if (!date) return '날짜 선택 plz~';
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = days[date.getDay()];

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}. ${month}. ${day}. ${dayName}.`;
  };

  return (
    <div className={tm('w-full small-calendar text-xs lg:text-base')}>
      <div
        className={tm(
          'p-2.5 rounded-lg cursor-pointer',
          'flex justify-between items-center font-[Paperlogy]'
        )}
        onClick={toggleCalendar}
      >
        <span>{formatSelectedDate(date)}</span>
      </div>

      {showCalendar && (
        <Calendar
          showFixedNumberOfWeeks={true}
          showNeighboringMonth={false}
          onChange={handleCalendarChange as any}
          value={date}
          calendarType="iso8601"
          className={tm(
            'calendar-molecule absolute z-50 bg-white border-r-8',
            'lg:text-lg w-full'
          )}
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
        />
      )}
    </div>
  );
}

export default DiaryDateSelector;
