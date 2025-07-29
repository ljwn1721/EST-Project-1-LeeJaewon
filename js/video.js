//유저 정보 반영
let userData = {};
let commentCount = 0;
let likeCount = 0;
fetch('data/user.json')
  .then(response => response.json())
  .then(data => {
    userData = data;

    const commentProfileImg = document.getElementById('commentProfile');
    commentProfileImg.src = userData.profile
  })
  .catch(error => {
    console.error('유저 정보 불러오기 실패:', error);
  });

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

    //좋아요 수 반영
    likeCount = parseInt(video.likes);
    document.querySelector(".likesNumber").textContent = `${likeCount}`;

    commentCount = parseInt(video.comments); //댓글 수 반영
    //댓글 표시
    document.querySelector(".commentsNumber").textContent = `댓글 ${commentCount} 개`
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


// 댓글 달기

const commentInput = document.getElementById('commentInput');
const commentButton = document.getElementById('commentBtn');
const commentList = document.getElementById('commentList');
// 입력 감지해서 버튼 활성화/비활성화
commentInput.addEventListener('input', () => {
  const isEmpty = commentInput.value.trim() === '';
  commentButton.disabled = isEmpty;
});
// 댓글 추가
commentButton.addEventListener('click', () => {
  const commentText = commentInput.value.trim();
  if (!commentText) return;

  const commentHtml = `
    <div class="d-flex mb-3">
      <div class="me-2">
        <img src="${userData.profile}" class="profile" alt="내 프로필">
      </div>
      <div>
        <div><strong>${userData.handle}</strong></div>
        <div>${commentText}</div>
      </div>
    </div>
  `;
  commentList.insertAdjacentHTML('afterbegin', commentHtml); // 가장 위에 추가
  commentInput.value = '';
  commentButton.disabled = true;

  commentCount++;
  document.querySelector(".commentsNumber").textContent = `댓글 ${commentCount} 개`;
});

//좋아요 / 싫어요 버튼
const likeButton = document.getElementById('likeBtn');
const dislikeButton = document.getElementById('dislikeBtn');
const likeIcon = document.getElementById('likeIcon');
const dislikeIcon = document.getElementById('dislikeIcon');

likeBtn.addEventListener('click', () => {
  const isLiked = likeIcon.classList.contains('bi-hand-thumbs-up-fill');
  if(!isLiked){
    likeCount++;
    document.querySelector(".likesNumber").textContent = `${likeCount}`
  } else{
    likeCount--;
    document.querySelector(".likesNumber").textContent = `${likeCount}`
  }
  //아이콘 토글
  likeIcon.classList.toggle('bi-hand-thumbs-up', isLiked);
  likeIcon.classList.toggle('bi-hand-thumbs-up-fill', !isLiked);
  // 싫어요 해제
  dislikeIcon.classList.remove('bi-hand-thumbs-down-fill');
  dislikeIcon.classList.add('bi-hand-thumbs-down');
});

dislikeBtn.addEventListener('click', () => {
  const isLiked = likeIcon.classList.contains('bi-hand-thumbs-up-fill');
  const isDisliked = dislikeIcon.classList.contains('bi-hand-thumbs-down-fill');
  if(isLiked && !isDisliked){
      likeCount--;
      document.querySelector(".likesNumber").textContent = `${likeCount}`
  }
  //아이콘 토글
  dislikeIcon.classList.toggle('bi-hand-thumbs-down', isDisliked);
  dislikeIcon.classList.toggle('bi-hand-thumbs-down-fill', !isDisliked);
  //좋아요 해제
  likeIcon.classList.remove('bi-hand-thumbs-up-fill');
  likeIcon.classList.add('bi-hand-thumbs-up');
});