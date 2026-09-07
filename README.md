# Portfolio — 곽지은 / Gwak Ji Eun

UI/UX 디자이너 포트폴리오. React, Tailwind CSS, Framer Motion으로 스티커형 카드와 Mac Dock, 커스텀 커서, 배경 패럴랙스를 구현했습니다.

## 구성

- 자기소개: 치과 10년 근무 후 부트캠프에서 UI/UX로 전향
- 기술 스택: Figma (Auto Layout, Component, Prototyping), Git, GitHub, Notion
- 프로젝트: Plan & With — AI 여행 일정 공유 플랫폼 (팀, 2026.07–26.08, Figma)

## 내용 수정하기

`src/Portfolio.tsx` 상단 상수만 바꾸면 됩니다.

| 상수 | 위치 | 설명 |
| --- | --- | --- |
| `LOGO` | 좌측 상단 프로필 카드, 푸터 | 영문 이름 (Gwak Ji Eun) |
| `NAME` | 케이스 스터디 / 푸터 | 곽지은 / Gwak Ji Eun |
| `ROLE` | 프로필 카드, 푸터 | 직무 |
| `HEADLINE` | 히어로 대제목 | 메인 헤더 문구 |
| `TAGLINE` | 히어로 좌측 하단 | 한 줄씩 배열로 |
| `PROFILE_IMAGE` | 좌측 상단 프로필 카드 | 프로필 사진 경로 |
| `PROJECT_VIDEO` | 프로젝트 카드 | 호버 재생 영상 경로 |
| `PROJECT_LINK` | 케이스 스터디 Preview Link | 프로젝트 링크 |
| `SHOT_MAIN`, `SHOT_AI` | 케이스 스터디 / 카드 스택 | Plan & With 화면 캡쳐 |

## 프로필 사진 넣기

`public/profile.jpg` 로 사진을 넣으면 좌측 상단 카드에 자동 반영됩니다.
파일이 없으면 라임색 원 안에 "곽" 글자가 대신 표시됩니다.

```bash
cp "내사진.jpg" public/profile.jpg
```

## 프로젝트 영상 넣기

프로젝트 카드는 마우스를 올리면 영상이 재생되고, 벗어나면 처음으로 되돌아갑니다.
영상 파일을 `public/plan-with.mp4` 로 복사하면 자동으로 연결됩니다.

```bash
cp "KakaoTalk_20260902_093320910.mp4" public/plan-with.mp4
```

파일이 없는 동안에는 `public/plan-with-main.jpg` → `public/plan-with-ai.jpg` 두 화면이
호버 중 천천히 확대되며 교차되는 미리보기로 대체됩니다.

## 케이스 스터디

히어로 우측 하단 카드 스택과 프로젝트 카드를 누르면 브라우저 창 모양 케이스 스터디가 열립니다.
스택의 세 카드는 각각 케이스 스터디의 `case-overview`, `case-ai`, `case-works` 구역으로 스크롤됩니다.
주요 수행 내용 및 성과는 `works` 배열에서 관리하며 케이스 스터디 안에 표시됩니다.

## 폰트 / 배경

- 폰트: 온글잎 윤탱체 (`src/assets/fonts/ongleaf-yuntang.ttf`, `src/index.css` 의 `@font-face`)
- 배경: `public/hills.jpg` — 히어로와 푸터에 사용 (프로젝트 구역은 배경 없이 그리드만)

## 실행

```bash
npm install
npm run dev
```

개발 서버는 `http://127.0.0.1:43123` 에서 열립니다.
