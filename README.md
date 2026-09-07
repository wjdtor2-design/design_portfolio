# Portfolio — 내 이름 / 영문이름

Creatie 스타일 레퍼런스를 바탕으로 만든 UI/UX 디자이너 포트폴리오 랜딩입니다. React, Tailwind CSS, Framer Motion으로 스티커형 3D 카드, Mac Dock 네비게이션, 커스텀 커서, 배경 패럴랙스를 구현했습니다.

## 실행

```bash
npm install
npm run dev
```

개발 서버는 `http://127.0.0.1:43123` 에서 열립니다.

```bash
npm run build
npm run preview
```

## 구성

- `src/Portfolio.tsx` — 메인 페이지 전체 (히어로, About, 프로젝트, 서비스, 리뷰, FAQ, 푸터, Dock)
- 이름: `내 이름 / 영문이름`
- 직무: UI/UX 디자이너

## 인터랙션

- 카드 호버 시 기울기가 정면으로 돌아오며 떠오름
- 하단 유리 질감(macOS Dock) 아이콘 확대
- 기본 포인터 대신 점 + 후광 커서가 마우스를 따라감
- 배경 그리드와 장식 요소가 마우스 반대 방향으로 미세하게 이동
