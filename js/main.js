//유저 정보 반영
fetch('data/user.json')
  .then(response => response.json())
  .then(data => {
    userData = data;

    const myProfileImg = document.querySelectorAll('.myProfile');
    myProfileImg.forEach(element => {
      element.src = userData.profile;
    });
    document.querySelector('.nickname').textContent = userData.name;
    document.querySelector('.handle').textContent = userData.handle;

  })
  .catch(error => {
    console.error('유저 정보 불러오기 실패:', error);
  });

//필터링 함수
function filterVideos(videos, keyword) {
    return videos.filter(video =>
        video.title.toLowerCase().includes(keyword) ||
        video.uploader.toLowerCase().includes(keyword)
    );
}

//컨텐츠 내용 생성 함수
function loadVideos(jsonPath, keyword = "") {
    const videoContainer = document.getElementById("video-container");
    const template = document.getElementById("video-card-template");
    videoContainer.innerHTML = "";

    fetch(jsonPath)
        .then(res => res.json())
        .then(videos => {
            if (keyword) {
                const lowerKeyword = keyword.toLowerCase();
                videos = filterVideos(videos, lowerKeyword);
            }

            videos.forEach(video => {
                const clone = template.content.cloneNode(true);
                clone.querySelector("img").src = video.thumbnail;
                clone.querySelector(".card-title").textContent = video.title;
                clone.querySelector(".card-views").textContent = "조회수: " + video.views;
                clone.querySelector(".card-uploaded").textContent = "업로드: " + video.uploaded;
                clone.querySelector(".uploader-profile").src = video.profile;
                clone.querySelector(".uploader-name").textContent = video.uploader;

                clone.querySelector(".card").addEventListener("click", () => {
                    const currentParams = new URLSearchParams(window.location.search);
                    const tab = currentParams.get("tab");
                    if (tab === "subscribed") {
                        window.location.href = `video-page.html?videoId=${video.id}&tab=subscribed`;
                    } else {
                        window.location.href = `video-page.html?videoId=${video.id}`;
                    }
                });

                videoContainer.appendChild(clone);
            });
        });
}
//문서 로드 시 썸네일 카드 생성
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");

    if (tab === "subscribed") {  //탭 파라미터 = 구독이면 구독 목록 로드
      loadVideos("data/subscribed.json");
      // 탭 하이라이트
      document.querySelectorAll(".subscription-tab").forEach(tab => tab.classList.add("highlighted"));
      document.querySelectorAll(".home-tab").forEach(tab => tab.classList.remove("highlighted"));
      document.title = "구독";
    } else { //기본 => 홈 탭
      loadVideos("data/videos.json");
      document.querySelectorAll(".home-tab").forEach(tab => tab.classList.add("highlighted"));
      document.querySelectorAll(".subscription-tab").forEach(tab => tab.classList.remove("highlighted"));
      document.title = "홈";
    }
});



//메뉴 버튼 사이드바 토글 & 레이아웃 마진 조정
const menuBtn = document.getElementById('menuToggleBtn');
const sidebar = document.getElementById('sidebar-expand');
const topNav = document.getElementById('topNavBar');
const container = document.querySelector(".container-fluid");
//영상 카드 컨테이너 마진 조정
function adjustLayout() {
  const sidebarWidth = sidebar.offsetWidth;
  container.style.marginLeft = `${sidebarWidth}px`;
  container.style.width = `calc(100% - ${sidebarWidth}px)`;
}
//햄버거 클릭 시 사이드바 전개/닫힘
menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar-expand');
  sidebar.classList.toggle('sidebar-hidden');
  adjustLayout();
});

window.addEventListener("DOMContentLoaded", adjustLayout);
window.addEventListener("resize", adjustLayout);


//프로필 버튼 동작
const profileBtn = document.getElementById("profileBtn");
const profileMenu = document.getElementById("profileMenu");
// 프로필 버튼 클릭 시 메뉴 토글
profileBtn.addEventListener("click", () => {
  profileMenu.classList.toggle("d-none");
});

// 프로필 메뉴 외부 클릭 시 닫기
document.addEventListener("click", (e) => {
  if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
    profileMenu.classList.add("d-none");
  }
});

//검색 동작
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {
    const keyword = searchInput.value.trim();
    const tab = new URLSearchParams(window.location.search).get("tab");

    if (tab === "subscribed") {
        loadVideos("data/subscribed.json", keyword);
    } else {
        loadVideos("data/videos.json", keyword);
    }
});

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchBtn.click();
});