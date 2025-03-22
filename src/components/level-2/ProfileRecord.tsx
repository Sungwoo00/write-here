import { useEffect, useState } from 'react';
import useTableStore from '@/store/DiaryData';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = [
  '#00C49F',
  '#0088FE',
  '#FFBB28',
  '#FF6384',
  '#FF8042',
  '#A28DFF',
];

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
      const region = marker.region || '기타';
      if (regionCount[region]) {
        regionCount[region] += 1;
      } else {
        regionCount[region] = 1;
      }
    });

    return regionCount;
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md flex items-center space-x-8">
      {/* 원형 차트 */}
      <div className="relative">
        <PieChart width={200} height={200}>
          <Pie
            data={regionStats}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {regionStats.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/* 중앙 텍스트 */}
        <div className="absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] text-center">
          <p className="text-gray-500 text-sm">작성한 기록</p>
          <p className="text-2xl font-bold">{markers.length}</p>
        </div>
      </div>

      {/* 지역 통계 테이블 */}
      <div className="flex-1">
        <h2 className="text-xl font-bold flex items-center space-x-2">
          나의 여기 적기 기록 ✏️
        </h2>
        <table className="w-full mt-4 text-sm">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-1 text-left">지역</th>
              <th className="py-1 text-right">일기</th>
              <th className="py-1 text-right">%</th>
            </tr>
          </thead>
          <tbody>
            {regionStats.map((region, index) => (
              <tr key={region.name} className="border-t">
                <td className="py-2 flex items-center space-x-2">
                  <span
                    className="w-3 h-3 rounded-full inline-block"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  {region.name}
                </td>
                <td className="py-2 text-right">{region.value}</td>
                <td className="py-2 text-right">
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
