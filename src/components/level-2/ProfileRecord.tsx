import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useEffect } from 'react';
import { useMapStore } from '@/store/Map';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#D946EF',
  '#F43F5E',
  '#A855F7',
  '#10B981',
];

export default function ProfileRecord() {
  const { getProvinceStats } = useMapStore();

  // ✅ 도별 데이터 가져오기 (8개 도 기준)
  const provinceStats = getProvinceStats().filter((item) => item.count > 0);
  const totalEntries = provinceStats.reduce((sum, item) => sum + item.count, 0);

  // ✅ 콘솔 로그 추가하여 가져온 도 정보 확인
  useEffect(() => {
    console.log('📌 가져온 도 데이터:', provinceStats);
  }, [provinceStats]);

  // ✅ 차트 데이터 변환 (값이 있는 도만 표시)
  const chartData = provinceStats.map((item, index) => ({
    name: item.province,
    value: item.count,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="p-5 bg-white rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-bold flex items-center mb-4">
        나의 여기 적기 기록 ✏️
      </h2>

      <div className="flex items-center">
        {/* ✅ 차트 데이터 표시 (값이 있는 도만 반영) */}
        {chartData.length > 0 ? (
          <PieChart width={180} height={180}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              fill="#8884d8"
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        ) : (
          <div className="w-[180px] h-[180px] flex items-center justify-center bg-gray-100 rounded-full text-gray-500">
            데이터 없음
          </div>
        )}

        {/* 총 작성 개수 */}
        <div className="ml-4 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold">
            {totalEntries}
          </div>
          <span className="text-sm text-gray-500">작성한 기록</span>
        </div>
      </div>

      {/* 지역별 일기 개수 테이블 (값이 있는 도만 표시) */}
      <table className="w-full mt-4 text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-1">지역</th>
            <th className="text-center py-1">일기</th>
            <th className="text-right py-1">%</th>
          </tr>
        </thead>
        <tbody>
          {provinceStats.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="text-left py-1 flex items-center">
                <span
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                {item.province}
              </td>
              <td className="text-center py-1">{item.count}</td>
              <td className="text-right py-1">
                {totalEntries > 0
                  ? ((item.count / totalEntries) * 100).toFixed(1) + '%'
                  : '0.0%'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ 차트 밑에 도별 리스트 추가 */}
      <div className="mt-4 text-sm text-gray-600">
        <h3 className="font-semibold">지역 목록</h3>
        <ul className="list-disc list-inside">
          {provinceStats.map((item, index) => (
            <li key={index} className="flex items-center">
              <span
                className="w-2 h-2 rounded-full mr-2"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              {item.province}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
