# YouTube Clone Mini Project

이 프로젝트는 **HTML, CSS, JavaScript**만을 사용하여 간단한 유튜브 스타일 웹 애플리케이션을 구현한 것입니다.  
홈 화면의 썸네일 목록과 개별 비디오 상세 페이지를 JSON 데이터 기반으로 동적으로 로드하는 기능을 포함합니다.

## 주요 기능

### 1. 홈 화면 (`index.html`)
- 상단 네비게이션 바 + 좌측 사이드바 메뉴
- **동적 영상 카드 로드**
  - `videos.json` 또는 `subscribed.json` 데이터를 불러와 카드 목록 생성
- **탭 전환**
  - `?tab=subscribed` 파라미터로 구독 목록을 표시
- **프로필 메뉴**
  - `user.json` 데이터를 통해 사용자 프로필 이미지/닉네임 반영

### 2. 비디오 상세 페이지 (`video-page.html`)
- 선택한 영상에 대한 **iframe 재생**
- 영상 정보, 채널 정보 표시
- **좋아요/싫어요 토글**, 좋아요 수 표시
- **댓글 입력 및 실시간 추가** 
- 우측에 **추천 영상 사이드 피드** 표시

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
