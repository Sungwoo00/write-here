import { Link } from 'react-router-dom';

function GoodBye() {
  return (
    <div
      className="flex-grow flex flex-col justify-center items-center
    font-[Paperlogy]
    "
    >
      <p className="text-2xl">탈퇴가 완료되었습니다.</p>
      <Link to="/">
        <p className="text-[var(--light-green)] hover:underline">
          처음으로 돌아가기
        </p>
      </Link>
    </div>
  );
}
export default GoodBye;
