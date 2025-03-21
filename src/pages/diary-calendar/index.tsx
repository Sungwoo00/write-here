import Calendar from '@/components/level-3/Calendar';
import DiaryRegister from '@/components/level-3/DiaryRegister';
import { useState } from 'react';

function DiaryCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <div className="flex-grow pl-44 pr-44">
      <Calendar date={selectedDate} onDateChange={setSelectedDate} />
      <DiaryRegister />
    </div>
  );
}

export default DiaryCalendar;
