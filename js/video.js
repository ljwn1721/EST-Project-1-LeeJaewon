//비디오 표시
const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get('videoId');

fetch("data/videos.json")
  .then(res => res.json())
  .then(videos => {
    const video = videos.find(v => v.id === videoId);  // 일치하는 항목 찾기
    if (!video) {
      alert("해당 영상을 찾을 수 없습니다.");
      return;
    }

    document.querySelector('.video-player').innerHTML = `
      <iframe width="100%" height="100%"
              src="${video.videoUrl}"
              title="${video.title}"
              frame border="0"
              allow fullscreen></iframe>
    `;
    document.querySelector('h5').textContent = video.title;
    document.querySelector('.channel-info').textContent = `조회수 ${video.views} · ${video.uploaded}`;
    document.querySelector('.video-description').textContent = video.description;
  });

//사이드 메뉴 토글
const menuBtn = document.getElementById('menuToggleBtn');
const sidebar = document.getElementById('sidebar-menu');
const topNav = document.getElementById('topNavBar');

menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar-hidden');
});