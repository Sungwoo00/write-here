import { useEffect, useState } from 'react';
import useTableStore from '@/store/DiaryData';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = [
  '#00C49F',
  '#0088FE',
  '#FFBB28',
  '#FF6384',
  '#FF8042',
  '#A28DFF',
  '#FF99C8',
  '#C0CA33',
]; // ✅ 다양한 색상 추가

const ProfileRecord = () => {
  const markers = useTableStore((state) => state.markers);
  const [regionStats, setRegionStats] = useState([]);

  useEffect(() => {
    const regionCount = countRegions(markers);
    const allRegions = Object.entries(regionCount).map(([region, count]) => ({
      name: region,
      value: count,
    }));

    setRegionStats(allRegions);
  }, [markers]);

  const countRegions = (markers) => {
    const regionCount = {};

    markers.forEach((marker) => {
      const region = marker.region || '기타'; // ✅ region이 없으면 "기타"로 저장
      if (regionCount[region]) {
        regionCount[region] += 1;
      } else {
        regionCount[region] = 1;
      }
    });

    return regionCount;
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold">나의 여기 적기 기록 📌</h2>

      <div className="flex justify-center mt-4">
        <PieChart width={300} height={300}>
          <Pie
            data={regionStats}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(1)}%`
            }
          >
            {regionStats.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <div className="mt-4">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-1">지역</th>
              <th className="py-1">일기</th>
              <th className="py-1">%</th>
            </tr>
          </thead>
          <tbody>
            {regionStats.map((region) => (
              <tr key={region.name} className="border-t">
                <td className="py-1">{region.name}</td>
                <td className="py-1">{region.value}</td>
                <td className="py-1">
                  {((region.value / markers.length) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileRecord;
