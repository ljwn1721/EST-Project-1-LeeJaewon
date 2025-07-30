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

//썸네일 카드 생성
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("video-container");
  const template = document.getElementById("video-card-template");

  fetch("data/videos.json")
    .then(res => res.json())
    .then(videos => {
      videos.forEach(video => {
        const clone = template.content.cloneNode(true);
        clone.querySelector("img").src = video.thumbnail;
        clone.querySelector(".card-title").textContent = video.title;
        clone.querySelector(".card-views").textContent = "조회수: " + video.views;
        clone.querySelector(".card-uploaded").textContent = "업로드: " + video.uploaded;

        //클릭시 비디오 페이지 이동
        clone.querySelector(".card").addEventListener("click", () => {
            window.location.href = `video-page.html?videoId=${video.id}`;
          });

        container.appendChild(clone);
      });
    })
    .catch(err => console.error("JSON 불러오기 실패:", err));
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
// 사이드바 외부 클릭 시 닫기
document.addEventListener("click", (e) => {
  const isSidebarExpanded = sidebar.classList.contains("sidebar-expand");
  const clickedInsideSidebar = sidebar.contains(e.target);
  const clickedMenuButton = menuBtn.contains(e.target);

  if (isSidebarExpanded && !clickedInsideSidebar && !clickedMenuButton) {
    sidebar.classList.remove("sidebar-expand");
    sidebar.classList.add("sidebar-hidden");
    adjustLayout();
  }
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

// 메뉴 외부 클릭 시 닫기
document.addEventListener("click", (e) => {
  if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
    profileMenu.classList.add("d-none");
  }
});