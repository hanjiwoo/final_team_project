## 내배캠 React 3기 A-2조 최종 프로젝트

### 📢 프로젝트 개요

**24. 01. 04 - 24 .02 .08**

- 프로젝트명: **모음 (모두의 음식점)**
- 주제: 이용자들의 위치에 따라 착한가격업소의 정보를 제공하며, 식당의 간략한 평가와 커뮤니티를 통해 사용자간의 정보 공유가 이루어지는 사이트.
- 내용: 지역, 현재 위치에 따라 저렴한 가격의 식당을 소개 해주고, 커뮤니티 사이트를 통해 사용자간의 정보 공유를 할 수 있음. 착한가격업소의 선정 기준을 소개해주고, 식당의 가격이나 맛, 가격, 서비스, 위생에 대한 후기를 볼 수 있으며, 한 사람당 한 번씩 “추천해요”를 눌러서 해당 표를 많이 받는 “이달의 착한 식당 랭킹”이라는 서비스를 도입. 지역상인과 소비자가 Win-Win 할 수 있게 독려하는 서비스를 제공함.

### 👥 팀 소개

- 팀명: 2만큼 성장했조
- 팀원: 여인준, 이아름, 이상욱, 한지우
- 디자이너: 이가현

### 👀 구현 기능

- 로그인 / 회원가입
  - 일반, 소셜(구글, 카카오)
  - 로그인 상태에 따른 헤더 전환 및 사이트 서비스 기능 제한
- 메인 페이지
  - 유저의 현재 지역 및 위치 필터로 지역별 가게 모아보기
  - 이달의 착한 가게 랭킹 (추천해요 순)
  - 카테고리별 매장 모아보기
- 상세 페이지
  - 가게 정보 및 위치
  - 태그로 남길 수 있는 간편 리뷰
  - 태그별 리뷰 수 확인 가능
  - 로그인 하지 않은 사람은 리뷰 남기기 비활성화
  - 상세 페이지 클립 보드
  - 카카오 api를 활용한 지도 확인
  - 정보 수정 요청 (추후 업데이트 예정)
- 커뮤니티 페이지
  - 카테고리별 게시물 작성
  - 게시글 및 댓글 CRUD
  - 게시글 공감해요 기능
  - 공감해요 순으로 이달의 게시물 확인
- 마이 페이지
  - 내가 누른 “좋아요” 매장 모아보기
  - 내가 남긴 게시글 및 댓글 확인, 수정 및 삭제 가능
  - 프로필 수정 (닉네임, 사진) 및 탈퇴하기
- 반응형 UI
  - 모바일 환경 대응 반응형 UI 적용

### 📝 역할 분담

| 여인준          | 이아름      | 이상욱          | 한지우      |
| --------------- | ----------- | --------------- | ----------- |
| 로그인/회원가입 | 메인 페이지 | 커뮤니티 페이지 | 상세 페이지 |

### 🚩 개발 내용

#### 💻 개발 환경

- IDE: Visual Studio Code
- OS: windows, Mac
- Package Manager: Yarn Classic (v1.22.19)

#### 📌 사용 기술

<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=javascript&logoColor=white">
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"> <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
<br />
<img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black">
<img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white"> <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black">

- Next.js - 페이지의 초기 로딩 속도 향상, 검색 엔진 최적화(SEO), 코드 분할(Code splitting) 등의 성능 및 효율성을 제공
- TypeScript - 예측 가능하고 안정적인 코드 작성, 강력한 개발 도구 지원, 효과적인 협업
- Tailwind CSS - 사용자 정의 CSS 코드를 작성하지 않고도 HTML 요소의 스타일을 지정하는 데 사용할 수 있음
- Redux Toolkit - 전역 상태 관리 도구
- Tanstack React Query - 비동기 관련 로직과 상태를 관리
- Firebase - 사용자 인증과 데이터베이스 등의 서버 기능 제공

### 💿 플로우 차트

![플로우 차트](https://github.com/hanjiwoo/final_team_project/assets/147472852/32ad58fa-78fd-4b03-88e7-1ff8acad39ef)
