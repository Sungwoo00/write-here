import Calendar from '@/components/level-3/Calendar';
import { useState } from 'react';

function DiaryCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <div className="flex-grow">
      <Calendar date={selectedDate} onDateChange={setSelectedDate} />
    </div>
  );
}

export default DiaryCalendar;
