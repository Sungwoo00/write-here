function Footer() {
  return (
    <footer
      id="footer"
      className="h-[10rem] w-full flex justify-center px-4 bg-[var(--light-beige)]
      lg:px-8 lg:h-[15rem]"
    >
      <div
        className="w-full h-full flex flex-col justify-around
      font-[HSSanTokki] text-[var(--dark-gray)] text-xs text-justify
      border-t-1
      lg:text-base"
      >
        <div className="flex gap-10 lg:gap-15 mt-2">
          <p>사이트 이용 약관</p>
          <p>개인정보취급방침</p>
          <p>이메일무단수집거부</p>
        </div>
        <div>
          <p>대표 | 신선범</p>
        </div>
        <div>
          <p>기획 및 개발 | 김민규, 이성우, 정성민, 정주연</p>
        </div>
        <div>
          <p>사업장 | 서울 종로구 종로3길 17 D1동 16층, 17층 멋쟁이 사자처럼</p>
        </div>
        <span className="text-[0.625rem] lg:text-sm text-[var(--light-gray)]">
          Copyright ⓒ 5늘 어디가? All Right Reserved.
        </span>
      </div>
    </footer>
  );
}
export default Footer;
