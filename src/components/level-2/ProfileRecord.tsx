import { useEffect, useMemo, useState } from 'react';
import useTableStore from '@/store/DiaryData';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { tm } from '@/utils/tw-merge'; // Tailwind Merge 사용

//파이 차트 색상 적용
const COLORS = [
  'var(--marker-blue)',
  'var(--marker-green)',
  'var(--marker-red)',
  'var(--marker-yellow)',
  'var(--icon-red)',
  'var(--light-green)',
];

const ProfileRecord = () => {
  const markers = useTableStore((state) => state.markers);
  const [regionStats, setRegionStats] = useState<
    { name: string; value: number }[]
  >([]);

  useEffect(() => {
    const countRegions = (markers: { region?: string }[]) =>
      markers.reduce(
        (acc: Record<string, number>, marker: { region?: string }) => {
          const region = marker.region || '기타';
          acc[region] = (acc[region] || 0) + 1;
          return acc;
        },
        {}
      );

    const regionCount = countRegions(markers);
    const allRegions = Object.entries(regionCount).map(([region, count]) => ({
      name: region,
      value: count,
    }));

    setRegionStats(allRegions);
  }, [markers]);

  const totalRecords = useMemo(() => markers.length, [markers]);

  return (
    <div
      className={tm(
        'profile-record bg-card-whitepink rounded-[1.4rem] shadow-md p-4 lg:p-6 flex items-center space-x-4 lg:space-x-8',
        'w-[90%] max-w-[24rem] lg:w-[40%] lg:max-w-[32rem]'
      )}
    >
      {/* 원형 차트 */}
      <div className="relative">
        <PieChart
          width={128}
          height={128}
          className="lg:w-[12rem] lg:h-[12rem]"
        >
          <Pie
            data={regionStats}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={56}
            dataKey="value"
          >
            {regionStats.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/* 중앙 텍스트 */}
        <div className="absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] flex flex-col items-center justify-center">
          <p className="text-dark-gray text-xs font-[Paperlogy] leading-none">
            작성한 기록
          </p>
          <p className="text-lg lg:text-2xl font-bold font-[Paperlogy]">
            {totalRecords}
          </p>
        </div>
      </div>

      {/* 지역별 기록 테이블 */}
      <div className="flex-1 text-center lg:text-left">
        <h2 className="text-base lg:text-xl font-bold font-[HSSanTokki] flex items-center justify-center lg:justify-start">
          나의 여기 적기 기록{' '}
          <img
            src="/icons/pencil.svg"
            alt="연필 아이콘"
            className="w-5 h-5 ml-2"
          />
        </h2>
        <table className="w-full mt-2 text-xs font-[Paperlogy]">
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
                <td className="py-1 flex items-center space-x-3">
                  <span
                    className="w-2 h-2 lg:w-3 lg:h-3 rounded-full inline-block"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="tracking-wide">{region.name}</span>
                </td>
                <td className="py-1 text-right">{region.value}</td>
                <td className="py-1 text-right">
                  {totalRecords > 0
                    ? ((region.value / totalRecords) * 100).toFixed(1) + '%'
                    : '0%'}
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
