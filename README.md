# 5늘 어디가의 여기적기~

> 장소 기반 일기 웹앱 서비스 구현하기


## 📚 목차

- [5늘 어디가의 여기적기~](#5늘-어디가의-여기적기)
- [여기적기](#여기적기)
- [🌟 프로젝트 소개](#-프로젝트-소개)
- [🧑‍🤝‍🧑 TEAM 5늘 어디가?](#-team-5늘-어디가)
- [🛠️ 개발환경](#️-개발환경)
- [🎯 개발목표 및 컨벤션](#-개발목표-및-컨벤션)
  - [✅ 협업 가치 및 목표](#-협업-가치-및-목표)
  - [컨벤션](#컨벤션)
- [📑 여기적기 프로젝트 주요 기능 정리](#-여기적기-프로젝트-주요-기능-정리)
  - [1. 회원 인증 기능](#1-회원-인증-기능)
  - [2. 탭 기반 서비스 구성](#2-탭-기반-서비스-구성)
    - [1) 여기적기 탭](#1-여기적기-탭-지도-기반-일기)
    - [2) 일기 탭](#2-일기-탭)
    - [3) 캘린더 탭](#3-캘린더-탭)
    - [4) 공유일기 탭](#4-공유일기-탭)
    - [5) 프로필 탭](#5-프로필-탭)
- [📂 프로젝트 구조](#-프로젝트-구조)
- [🖥️ 애플리케이션 동작](#️-애플리케이션-동작)
  - [랜딩](#랜딩)
  - [회원가입](#회원가입)
  - [로그인](#로그인)
  - [메인 지도탭](#메인-지도탭)
    - [일기 작성](#일기-작성)
    - [핑 찍은 곳에서 일기 보기](#핑-찍은-곳에서-일기-보기)
  - [일기 탭](#일기-탭)
  - [캘린더 탭](#캘린더-탭)
  - [공유일기 탭](#공유일기-탭)
  - [프로필 탭](#프로필-탭)
  - [회원 탈퇴, 로그아웃](#회원-탈퇴-로그아웃)




# 여기적기

<img src="https://github.com/user-attachments/assets/f24f767a-20e1-44f8-a83b-a0f728bbe807" width="500px" alt="여기적기">

[여기적기 바로가기](https://write-here.vercel.app/)


## 🌟 프로젝트 소개

> 멋쟁이 사자처럼 프론트엔드 부트캠프 12기 파이널 프로젝트
> 자체 제작한 피그마 시안으로 제작 된 프로젝트 입니다.

- **여기적기**는 **[5늘 어디가?]조**가 [Vite](https://ko.vite.dev/), [TypeScript](https://www.typescriptlang.org/), [React](https://ko.react.dev/) , [Zustand](https://zustand-demo.pmnd.rs/), [Tailwind](https://tailwindcss.com/) 등을 사용하여 개발한 **반응형 웹 애플리케이션**입니다.  
  가독성이 높고 직관적인 UI/UX를 제공합니다.
- 프로젝트 진행기간 : 2025.02.24. ~ 2025.03.25.

<br>

## 🧑‍🤝‍🧑 TEAM 5늘 어디가?


| 이름                                                                                                                                                                                   | 역할    | 주요 기여                                               | GitHub                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------- | ----------------------------------------- |
| <div align="center"><img src="https://github.com/user-attachments/assets/712e6ff7-a726-40c0-aaa1-bfaa4e722d69" width="80" height="80" alt="정주연"/> <br> **정주연**</div> | 팀 리더 | 스크럼 마스터,                             | [BomEllen](https://github.com/BomEllen) |
| <div align="center"><img src="https://github.com/user-attachments/assets/5cffc33c-d2ad-4bf4-937b-b04255a0283c" width="80" height="80" alt="김민규"/> <br> **김민규**</div> | 조원    | 백엔드 설계,  | [MinQyu](https://github.com/MinQyu) |
| <div align="center"><img src="https://github.com/user-attachments/assets/64fc2c21-3b05-4d51-ba05-6b84a0e1a985" width="80" height="80" alt="이성우"/> <br> **이성우**</div> | 조원    | 백엔드 설계,             | [Sungwoo00](https://github.com/Sungwoo00)       |
| <div align="center"><img src="https://github.com/user-attachments/assets/fd0869f3-596d-4cfb-828e-0289bccbd7b4" width="80" height="80" alt="정성민"/> <br> **정성민**</div> | 조원    | 메인페이지,                   | [karrpp](https://github.com/karrpp) |

<br>

## 🛠️ 개발환경

| 분류                    | 기술                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 프론트엔드              | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) |
| 백엔드                  | ![Supabase](https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=databricks&logoColor=white)                                                                                                                                                                                                                                                                                                 |
| 빌드 툴                 | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)                                                                                                                                                                                                                                                                                                                   |
| 패키지 매니저           | ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)                                                                                                                                                                                                                                                                                                                      |
| 협업 툴                 | ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white) ![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)                                                                                              |
| 코드 품질 툴            | ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)                                                                                                                                                                                                 |
| 디자인 & 개발 환경(IDE) | ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/Vscode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)                                                                                                                                                                                    |
| 호스팅                  | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)                                                                                                                                                                                                                                                                                                             |

<br>

## 🎯 개발목표 및 컨벤션

### ✅ 협업 가치 및 목표

우리 팀은 성공적인 팀 프로젝트를 위해 원활한 의사소통과 건강한 협업 문화를 가장 중요한 핵심 가치로 설정하였습니다. 이 두 가지 가치를 바탕으로 다음과 같은 세부 목표를 수립하였습니다.

🎯 세부 목표
<br><br>

**1. 명확한 역할 분담과 유연한 협력 태도**
<br>

각 팀원의 역할과 책임을 명확하게 정하되, 팀원이 어려움을 겪을 경우 서로 기꺼이 도와줄 수 있는 유연한 협력 문화를 지향합니다.

**2. 지속적인 소통을 위한 스크럼**
<br>

매일 진행되는 데일리 스크럼을 통해 진행 상황을 공유하고, 빠르게 이슈를 파악하고 해결할 수 있는 환경을 조성하였습니다.

**3.코드 컨벤션 준수**
<br>

팀 내에서 정한 코드 컨벤션을 철저히 지켜, 코드의 일관성과 가독성을 높이며 유지보수성을 강화하고자 하였습니다.

**4.반응형 UI 설계 경험**

다양한 디바이스에서의 최적화된 사용자 경험을 제공하기 위해, 반응형 웹 설계를 적극적으로 적용하였습니다.

**5.건강한 피드백 문화**

비판이 아닌 개선을 위한 피드백을 지향하며, 팀원 간에 긍정적인 피드백도 자주 주고받는 문화를 형성해 건강한 팀 분위기를 유지하고자 하였습니다.




### 컨벤션

- [코딩, 커밋 컨벤션](https://www.notion.so/1a473873401a81c5be78c8aa49f10efe)


<br>


# 📑 여기적기 프로젝트 주요 기능 정리

## ❗1. 회원 인증 기능

- **여행 시작하기** 버튼 클릭 시 → 로그인 화면 진입

### 로그인
- 이메일과 비밀번호 입력 후 로그인

### 회원가입
- 이메일, 비밀번호, 닉네임 입력
- 이용약관, 개인정보 수집 동의 체크 후 회원가입 완료

→ 로그인 유지 / 로그아웃 / 회원 탈퇴 기능 포함

---

## ❗2. 탭 기반 서비스 구성

서비스는 아래의 5개 탭으로 구성됩니다.

---

### 1) 여기적기 탭 (지도 기반 일기)

- 지도 위에서 원하는 위치에 마커를 찍고 해당 위치에 대한 일기를 작성할 수 있습니다.

#### 일기 작성 내용
- 사진 첨부
- 장소 이름 및 선택
- 제목 및 본문 작성

- 작성 완료 시 해당 위치에 **일기 마커**가 지도에 표시됨
- 기존 마커 클릭 시 해당 위치에 작성된 일기들을 조회 가능

---

### 2) 일기 탭

- 작성한 일기들이 카드 형식으로 나열됨
- 카드 클릭 시 디테일 페이지로 이동하여 다음 기능 제공:
  - 일기 내용 상세 조회
  - 수정 / 삭제
  - ‘지도에서 확인하기’ 클릭 시 여기적기 탭으로 이동

---

### 3) 캘린더 탭

- 달력 형태의 UI로 일기 작성 날짜를 확인 가능
- 일기가 있는 날짜에는 **사진 썸네일** 표시
- 썸네일 클릭 시 해당 일기의 디테일 페이지로 이동

---

### 4) 공유일기 탭

- 타인이 공유한 일기들을 조회하는 공간
- 기본 구조 및 기능은 일반 일기 탭과 동일
- 공유된 일기만 필터링되어 렌더링됨

---

### 5) 프로필 탭

- 유저 정보 확인 및 수정 가능
  - 프로필 사진, 닉네임, 한줄 소개 수정
- 지도에 찍힌 마커의 **지역별 통계** 표 제공
- 앱 공지사항 제공
- 로그아웃 / 회원 탈퇴 기능 제공

---


<br>

## 📂 프로젝트 구조


```
write-here
├─ README.md
└─ write-here
   ├─ .env
   ├─ .prettierignore
   ├─ .prettierrc.js
   ├─ eslint.config.js
   ├─ index.html
   ├─ package-lock.json
   ├─ package.json
   ├─ public
   │  ├─ animations
   │  │  ├─ foot-prints.json
   │  │  └─ location-ping.json
   │  ├─ favicon.png
   │  ├─ fonts
   │  │  ├─ HSSanTokki2.0_2024.woff
   │  │  ├─ Paperlogy-4Regular.woff
   │  │  └─ Paperlogy-6SemiBold.woff
   │  ├─ icons
   │  │  ├─ icon-bell.svg
   │  │  ├─ icon-camera.svg
   │  │  ├─ icon-check.svg
   │  │  ├─ icon-dropdown-arrow.svg
   │  │  ├─ icon-eye-open.svg
   │  │  ├─ icon-eye-slash.svg
   │  │  ├─ icon-gps.svg
   │  │  ├─ icon-hamburger-menu.svg
   │  │  ├─ icon-heart.svg
   │  │  ├─ icon-nav-book.svg
   │  │  ├─ icon-nav-calendar.svg
   │  │  ├─ icon-nav-map.svg
   │  │  ├─ icon-nav-people.svg
   │  │  ├─ icon-pencil.svg
   │  │  ├─ icon-person.svg
   │  │  ├─ icon-plus.svg
   │  │  ├─ icon-search.svg
   │  │  ├─ icon-show-more.svg
   │  │  ├─ icon-x-circle.svg
   │  │  ├─ icon-x.svg
   │  │  ├─ pencil.svg
   │  │  ├─ pins
   │  │  │  ├─ pin-1-black.svg
   │  │  │  ├─ pin-1-blue.svg
   │  │  │  ├─ pin-1-green.svg
   │  │  │  ├─ pin-1-red.svg
   │  │  │  ├─ pin-1-yellow.svg
   │  │  │  ├─ pin-2-black.svg
   │  │  │  ├─ pin-2-blue.svg
   │  │  │  ├─ pin-2-green.svg
   │  │  │  ├─ pin-2-red.svg
   │  │  │  ├─ pin-2-yellow.svg
   │  │  │  ├─ pin-3-black.svg
   │  │  │  ├─ pin-3-blue.svg
   │  │  │  ├─ pin-3-green.svg
   │  │  │  ├─ pin-3-red.svg
   │  │  │  ├─ pin-3-yellow.svg
   │  │  │  ├─ pin-4-black.svg
   │  │  │  ├─ pin-4-blue.svg
   │  │  │  ├─ pin-4-green.svg
   │  │  │  ├─ pin-4-red.svg
   │  │  │  ├─ pin-4-yellow.svg
   │  │  │  ├─ pin-5-black.svg
   │  │  │  ├─ pin-5-blue.svg
   │  │  │  ├─ pin-5-green.svg
   │  │  │  ├─ pin-5-red.svg
   │  │  │  └─ pin-5-yellow.svg
   │  │  └─ spring.svg
   │  ├─ images
   │  │  ├─ blue-bottle.jpg
   │  │  └─ profile.jpg
   │  ├─ logo.webp
   │  └─ qrcode.jpg
   ├─ README.md
   ├─ src
   │  ├─ App.tsx
   │  ├─ components
   │  │  ├─ level-1
   │  │  │  ├─ Checkbox.tsx
   │  │  │  ├─ DiaryInput.tsx
   │  │  │  ├─ LikeToggle.tsx
   │  │  │  ├─ RecentVisitDisplay.tsx
   │  │  │  ├─ ShowMore.tsx
   │  │  │  ├─ Spring.tsx
   │  │  │  ├─ SubmitButton.tsx
   │  │  │  ├─ Tag.tsx
   │  │  │  ├─ Toggle.tsx
   │  │  │  └─ TogglePublcButton.tsx
   │  │  ├─ level-2
   │  │  │  ├─ DiaryCard.tsx
   │  │  │  ├─ DiaryDateSelector.tsx
   │  │  │  ├─ DiaryImageSwiper.tsx
   │  │  │  ├─ DiaryPlaceTypeSelector.tsx
   │  │  │  ├─ DrawMarker.tsx
   │  │  │  ├─ ImageSwiper.tsx
   │  │  │  ├─ LikeCounter.tsx
   │  │  │  ├─ MapContainer.tsx
   │  │  │  ├─ Modal.tsx
   │  │  │  ├─ ProfileInfo.tsx
   │  │  │  ├─ ProfileRecord.tsx
   │  │  │  ├─ ProfileStatus.tsx
   │  │  │  ├─ RendererSpring.tsx
   │  │  │  └─ SignInput.tsx
   │  │  ├─ level-3
   │  │  │  ├─ Calendar.tsx
   │  │  │  ├─ DiaryRegister.tsx
   │  │  │  └─ MarkerSelector.tsx
   │  │  └─ PrivateRoute.tsx
   │  ├─ constants
   │  │  └─ imagePaths.ts
   │  ├─ hooks
   │  │  └─ useAuth.ts
   │  ├─ layout
   │  │  ├─ Footer.tsx
   │  │  ├─ Header.tsx
   │  │  ├─ Layout.tsx
   │  │  └─ NavigationBar.tsx
   │  ├─ main.tsx
   │  ├─ pages
   │  │  ├─ diary
   │  │  │  └─ index.tsx
   │  │  ├─ diary-calendar
   │  │  │  └─ index.tsx
   │  │  ├─ diary-detail
   │  │  │  └─ index.tsx
   │  │  ├─ good-bye
   │  │  │  └─ index.tsx
   │  │  ├─ landing
   │  │  │  └─ index.tsx
   │  │  ├─ map
   │  │  ├─ not-found
   │  │  │  └─ index.tsx
   │  │  ├─ profile
   │  │  │  └─ index.tsx
   │  │  ├─ public-diary
   │  │  │  └─ index.tsx
   │  │  ├─ sign-in
   │  │  │  └─ index.tsx
   │  │  ├─ sign-up
   │  │  │  └─ index.tsx
   │  │  └─ write-here-map
   │  │     ├─ index.tsx
   │  │     └─ OverlayPanel.tsx
   │  ├─ store
   │  │  ├─ DiaryData.ts
   │  │  └─ Map.ts
   │  ├─ styles
   │  │  ├─ calendar.css
   │  │  ├─ diaryDateSelector.css
   │  │  └─ global.css
   │  ├─ types
   │  │  └─ database.types.ts
   │  ├─ utils
   │  │  ├─ auth.ts
   │  │  ├─ supabase.ts
   │  │  ├─ tw-merge.ts
   │  │  ├─ validation.ts
   │  │  └─ width-element.ts
   │  └─ vite-env.d.ts
   ├─ tsconfig.app.json
   ├─ tsconfig.json
   ├─ tsconfig.node.json
   └─ vite.config.ts
```

<br>

# 🖥️ 애플리케이션 동작

## 랜딩

<img src="https://github.com/user-attachments/assets/300783bb-ac52-443e-b795-a863e6bfc2d0" alt="랜딩"/>


## 회원가입

<img src="https://github.com/user-attachments/assets/3b34f0fd-7b58-4354-bfa1-f9434ffca2b5" alt="회원가입"/>

## 로그인

<img src="https://github.com/user-attachments/assets/e990c293-40b0-46f9-b0fd-c5d60b01b411" alt="로그인"/>

## 메인 지도탭

### 일기 작성

gif 용량 문제로 직접 시현해보시길 바랍니다.


### 핑 찍은 곳에서 일기 보기

<img src="https://github.com/user-attachments/assets/0bc23229-e415-4202-aa55-494b7cc61794" alt="핑 찍은 곳에서 일기 보기"/>

## 일기 탭

<img src="https://github.com/user-attachments/assets/73c8aec2-25e1-4cc3-a09f-f115b0e28f8f" alt="일기 탭"/>

## 캘린더 탭

<img src="https://github.com/user-attachments/assets/ddda9ee4-aae0-459f-9e71-c2643c5b5700" alt="캘린더 탭"/>

## 공유일기 탭

gif 용량 문제로 직접 시현해보시길 바랍니다.

## 프로필 탭

<img src="https://github.com/user-attachments/assets/7b8a1d9b-d782-4165-907a-798573d672f1" alt="프로필 탭"/>

## 회원 탈퇴, 로그아웃 

<img src="https://github.com/user-attachments/assets/5c64937c-27b1-49cb-b1da-44b28ce3f52e" alt="회원 탈퇴, 로그아웃"/>

<br>

