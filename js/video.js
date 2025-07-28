const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get('videoId');
const sideFeed = document.getElementById("side-video-feed");
const template = document.getElementById("side-feed-template");

fetch("data/videos.json")
  .then(res => res.json())
  .then(videos => {
    const video = videos.find(v => v.id === videoId);  // 일치하는 항목 찾기
    if (!video) {
      alert("해당 영상을 찾을 수 없습니다.");
      return;
    }
    //영상 표시
    document.querySelector('.video-player').innerHTML = `
      <iframe width="100%" height="100%"
              src="${video.videoUrl}"
              title="${video.title}"
              frame border="0"
              allow fullscreen></iframe>
    `;
    document.querySelector('h5').textContent = video.title;
    document.querySelector('.channel-profile').src = video.profile;
    document.querySelector('.channel-name').textContent = video.uploader;
    document.querySelector('.channel-meta').textContent = `조회수 ${video.views} · ${video.uploaded}`;
    document.querySelector('.video-description').textContent = video.description;
    //사이드 피드 생성
    videos.forEach(video => {
        const clone = template.content.cloneNode(true);
        clone.querySelector("img").src = video.thumbnail;
        clone.querySelector(".side-video-title").textContent = video.title;
        clone.querySelector(".side-uploader").textContent = video.uploader;
        clone.querySelector(".side-meta").textContent = `조회수 ${video.views} · ${video.uploaded}`;

        //클릭시 비디오 페이지 이동
        clone.querySelector(".side-video").addEventListener("click", () => {
            window.location.href = `video-page.html?videoId=${video.id}`;
        });

        sideFeed.appendChild(clone);
    });
  });

//사이드 메뉴 토글
const menuBtn = document.getElementById('menuToggleBtn');
const sidebar = document.getElementById('sidebar-menu');
const topNav = document.getElementById('topNavBar');

menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar-hidden');
});

// 댓글
const commentInput = document.getElementById('commentInput');
const commentButton = document.getElementById('commentBtn');
const commentList = document.getElementById('commentList');

// 입력 감지해서 버튼 활성화/비활성화
commentInput.addEventListener('input', () => {
  commentButton.disabled = commentInput.value.trim() === '';
});

// 댓글 추가
commentButton.addEventListener('click', () => {
  const commentText = commentInput.value.trim();
  if (!commentText) return;

  const commentHtml = `
    <div class="d-flex mb-3">
      <div class="me-2">
        <img src="images/profile.jpg" class="profile" alt="내 프로필">
      </div>
      <div>
        <div><strong>@me</strong> <span class="text-muted small">방금 전</span></div>
        <div>${commentText}</div>
      </div>
    </div>
  `;

  commentList.insertAdjacentHTML('afterbegin', commentHtml); // 가장 위에 추가
  commentInput.value = '';
  commentButton.disabled = true;
});