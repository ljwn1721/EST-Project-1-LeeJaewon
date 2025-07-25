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

//메뉴 버튼 사이드바 토글
const menuBtn = document.getElementById('menuToggleBtn');
const sidebar = document.getElementById('sidebar');
const topNav = document.getElementById('topNavBar');

menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar-expand');
});