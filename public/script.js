const main_video = document.querySelector('.main-video video');
const main_video_title = document.querySelector('.main-video .title');
const video_playlist = document.querySelector('.video-playlist .videos');

let data = [
    {
        'id': 'a1',
        'title': 'manipulate text background',
        'name': 'manipulate text background.mp4',
        'duration': '0:12',
        'completed': false,
        'watchedSeconds': 0
    },
    {
        'id': 'a2',
        'title': 'build gauge with css',
        'name': 'build gauge with css.mp4',
        'duration': '0:09',
        'completed': false,
        'watchedSeconds': 0
    },
    {
        'id': 'a3',
        'title': '3D popup card',
        'name': '3D popup card.mp4',
        'duration': '0:28',
        'completed': false,
        'watchedSeconds': 0
    },
  /*  {
        'id': 'a4',
        'title': 'customize HTML5 form elements',
        'name': 'customize HTML5 form elements.mp4',
        'duration': '0:49',
        'completed': false,
        'watchedSeconds': 0
    },
    {
        'id': 'a5',
        'title': 'custom select box',
        'name': 'custom select box.mp4',
        'duration': '0:14',
        'completed': false,
        'watchedSeconds': 0
    },
    {
        'id': 'a6',
        'title': 'embed google map to contact form',
        'name': 'embed google map to contact form.mp4',
        'duration': '0:11',
        'completed': false,
        'watchedSeconds': 0
    },
    {
        'id': 'a7',
        'title': 'password strength checker javascript web app',
        'name': 'password strength checker javascript web app.mp4',
        'duration': '0:14',
        'completed': false,
        'watchedSeconds': 0
    }
  */
];

data.forEach((video, i) => {
    let video_element = `
        <div class="video" data-id="${video.id}" data-completed="${video.completed}" data-watched-seconds="${video.watchedSeconds}">
            <img src="images/play.svg" alt="">
            <p>${i + 1 > 9 ? i + 1 : '0' + (i + 1)}. </p>
            <h3 class="title">${video.title}</h3>
            <p class="time">${video.duration}</p>
            <button class="tick-button">${video.completed ? '✔️' : '❌'}</button>
        </div>
    `;
    video_playlist.innerHTML += video_element;
})

let videos = document.querySelectorAll('.video');
videos[0].classList.add('active');
videos[0].querySelector('img').src = 'images/pause.svg';

videos.forEach(selected_video => {
    selected_video.onclick = () => {

        for (all_videos of videos) {
            all_videos.classList.remove('active');
            all_videos.querySelector('img').src = 'images/play.svg';
        }

        selected_video.classList.add('active');
        selected_video.querySelector('img').src = 'images/pause.svg';

        let match_video = data.find(video => video.id == selected_video.dataset.id);
        main_video.src = 'videos/' + match_video.name;
        main_video_title.innerHTML = match_video.title;

        main_video.addEventListener('ended', () => {
            selected_video.querySelector('img').src = 'images/tick.svg';
        });
    }
});

// Listen for the 'timeupdate' event on the video element to track the watched time
// Listen for the 'timeupdate' event on the video element to track the watched time
// Listen for the 'timeupdate' event on the video element to track the watched time
main_video.addEventListener('timeupdate', () => {
    const activeVideo = document.querySelector('.video.active');
    if (activeVideo) {
        const match_video = data.find(video => video.id == activeVideo.dataset.id);
        if (!match_video.completed) {
            match_video.watchedSeconds = main_video.currentTime;
            activeVideo.dataset.watchedSeconds = main_video.currentTime;
        }
    }
});

// Listen for the 'ended' event on the video element to mark the video as completed
main_video.addEventListener('ended', () => {
    const activeVideo = document.querySelector('.video.active');
    if (activeVideo) {
        const match_video = data.find(video => video.id == activeVideo.dataset.id);
        if (!match_video.completed && main_video.currentTime >= 0.99 * main_video.duration) {
            match_video.completed = true;
            const tickButton = activeVideo.querySelector('.tick-button');
            tickButton.textContent = '✔️';
            tickButton.classList.add('played');
        }
    }
});
// Update this variable with the total duration of all videos in seconds
let totalDuration = data.reduce((acc, cur) => acc + getSecondsFromDuration(cur.duration), 0);

function updateProgress() {
    let totalWatchedSeconds = 0;
    
    videos.forEach(video => {
        if (video.dataset.completed === 'true') {
            totalWatchedSeconds += getSecondsFromDuration(video.dataset.duration);
        } else if (video.dataset.watchedSeconds) {
            totalWatchedSeconds += parseFloat(video.dataset.watchedSeconds);
        }
    });

    let percentage = (totalWatchedSeconds / totalDuration) * 100;
    percentage = Math.min(percentage, 100);
    if (percentage === 100) {
        document.getElementById('certificate-btn').style.backgroundColor = "green";
    }
    document.querySelector('.progress-fill').style.clip = `rect(0, 50px, 100px, ${percentage > 50 ? '50px' : '0'})`;
    document.querySelector('.progress-text').textContent = `${Math.round(percentage)}%`;
}


function getSecondsFromDuration(duration) {
    let [minutes, seconds] = duration.split(':').map(Number);
    return minutes * 60 + seconds;
}

videos.forEach(selected_video => {
    selected_video.onclick = () => {
        for (all_videos of videos) {
            all_videos.classList.remove('active');
            all_videos.querySelector('img').src = 'images/play.svg';
        }

        selected_video.classList.add('active');
        selected_video.querySelector('img').src = 'images/pause.svg';

        let match_video = data.find(video => video.id == selected_video.dataset.id);
        main_video.src = 'videos/' + match_video.name;
        main_video_title.innerHTML = match_video.title;

        main_video.addEventListener('ended', () => {
            selected_video.querySelector('img').src = 'images/tick.svg';
            updateProgress();
        });
    }
});


