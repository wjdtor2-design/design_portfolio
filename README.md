# Portfolio — 내 이름 / 영문이름

UI/UX 디자이너 포트폴리오. React, Tailwind CSS, Framer Motion으로 스티커형 카드와 Mac Dock, 커스텀 커서, 배경 패럴랙스를 구현했습니다.

## 구성

- 자기소개: 치과 10년 근무 후 부트캠프에서 UI/UX로 전향
- 기술 스택: Figma (Auto Layout, Component, Prototyping), Git, GitHub, Notion
- 프로젝트: Plan & With — AI 여행 일정 공유 플랫폼 (팀, 2026.07–26.08, Figma)

## 내용 수정하기

`src/Portfolio.tsx` 상단 상수만 바꾸면 됩니다.

| 상수 | 위치 | 설명 |
| --- | --- | --- |
| `LOGO` | 좌측 상단 로고, 푸터 | 표시할 내 이름 |
| `NAME` | 히어로 배지, 푸터 | 이름 / 영문이름 |
| `ROLE` | 히어로 배지, 푸터 | 직무 |
| `HEADLINE` | 히어로 대제목 | 메인 헤더 문구 |
| `PROJECT_VIDEO` | 프로젝트 카드 | 호버 재생 영상 경로 |
| `BACKDROP` | 히어로 / 프로젝트 / 푸터 | 배경 이미지 경로 |

## 프로젝트 영상 넣기

프로젝트 카드는 마우스를 올리면 영상이 재생되고, 벗어나면 처음으로 되돌아갑니다.
영상 파일을 `public/plan-with.mp4` 로 복사하면 자동으로 연결됩니다.

```bash
cp "KakaoTalk_20260902_093320910.mp4" public/plan-with.mp4
```

파일이 없으면 Plan & With 화면 목업이 대신 보입니다.

## 폰트 / 배경

- 폰트: 온글잎 윤탱체 (`src/assets/fonts/ongleaf-yuntang.ttf`, `src/index.css` 의 `@font-face`)
- 배경: `public/hills.jpg` — 히어로, 프로젝트, 푸터 세 구역에 공통 사용

## 실행

```bash
npm install
npm run dev
```

개발 서버는 `http://127.0.0.1:43123` 에서 열립니다.
