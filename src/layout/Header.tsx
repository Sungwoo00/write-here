function Header() {
  return (
    <header className="flex justify-between align-middle px-4 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] z-100">
      <div>검색</div>
      <img src="logo.webp" alt="여기적기 로고" width={120} />
      <div>알림</div>
    </header>
  );
}

export default Header;
