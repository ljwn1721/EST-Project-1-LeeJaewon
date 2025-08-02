# YouTube Clone Mini Project
## 프로젝트 개요
이 프로젝트는 기초 웹 프론트엔드 기술 숙련을 위한 유튜브 영상 클론 및 인터랙션 구현 프로젝트입니다. 
**HTML, CSS, JavaScript**를 사용하여 간단한 유튜브 스타일의 웹 페이지 빌드 기능을 구현하였습니다.  
홈 화면의 썸네일 목록과 개별 비디오 상세 페이지를 JSON 데이터 기반으로 동적으로 로드하는 기능을 포함합니다.

## 폴더 구조
``` bash
project-root/  
├─ index.html # 홈 화면  
├─ video-page.html # 영상 상세 페이지  
├─ js/  
│ ├─ main.js # 홈 화면 동작 스크립트  
│ └─ video.js # 영상 상세 페이지 동작 스크립트  
├─ data/  
│ ├─ videos.json # 기본 영상 목록  
│ ├─ subscribed.json # 구독 영상 목록  
│ └─ user.json # 사용자 프로필 정보  
└─ images/  
└─ ... (프로필/로고 이미지 등)
```


## 적용된 스택 및 세부 사항

- **HTML5**
  - `index.html`, `video-page.html`
  - 시맨틱 태그 기반 레이아웃
  - `<template>` 태그를 활용한 동적 콘텐츠 렌더링

- **CSS3**
  - **Bootstrap 5**
    - `container`, `row`, `col`, `btn`, `d-flex`, `gap` 등 유틸리티 클래스 활용
    - `bootstrap-icons` 아이콘 사용
  - **커스텀 CSS**
    - `sidebar`, `profile-menu`, `thumbnail-img`, `highlighted` 등의 스타일 정의

- **JavaScript (Vanilla JS)**
  - **fetch API**: JSON 데이터 비동기 로드
  - **URLSearchParams**: 쿼리 파라미터 처리
  - DOM 조작 (템플릿 복제 및 이벤트 바인딩)
  - 동작 스크립트:
    - `main.js`: 메인 페이지 동작
    - `video.js`: 비디오 상세 페이지 동작

---

## 데이터 관리
- **JSON 파일 기반**
  - `data/videos.json`: 기본 영상 목록
  - `data/subscribed.json`: 구독 영상 목록
  - `data/user.json`: 사용자 프로필 데이터
- **동적 반영**
  - 프로필 이미지, 닉네임, 핸들
  - 영상 리스트, 썸네일, 업로더 정보
  - 상세 페이지의 영상 정보 (iframe URL, 조회수, 좋아요, 댓글)

---

## UI 동작 세부사항

### 홈 (`index.html`)
- **사이드바 / 상단바**
  - 메뉴 버튼 클릭 시 사이드바 토글
  - 프로필 버튼 클릭 시 프로필 메뉴 토글
- **탭 전환**
  - URL 파라미터 `?tab=subscribed` → `subscribed.json` 데이터 로드
  - 기본 상태 → `videos.json` 로드
- **영상 카드 클릭**
  - `video-page.html?videoId={id}` 로 이동

### 비디오 상세 페이지 (`video-page.html`)
- **iframe 동영상 재생**
- **좋아요/싫어요 토글**
  - 클릭 시 아이콘 변경 및 좋아요 수 증감
- **댓글 추가 기능**
  - 입력 시 버튼 활성화
  - 등록 시 댓글 즉시 추가 및 댓글 수 증가 
- **추천 영상 사이드 피드**
  - `videos.json` 기반으로 추천 영상 표시
  - 클릭 시 해당 영상 페이지로 이동

---


