document.addEventListener('DOMContentLoaded', () => {
  const playerElement = document.getElementById('player');

  // Hämta video-ID och typ från URL-params
  const urlParams = new URLSearchParams(window.location.search);
  const videoType = urlParams.get('type'); // 'youtube' eller 'vimeo'
  const videoId = urlParams.get('video'); // ID på videon

  if (videoType === 'youtube') {
    // Använd YouTube IFrame API
    createYouTubePlayer(videoId);
  } else if (videoType === 'vimeo') {
    const videoSrc = `https://player.vimeo.com/video/${videoId}?dnt=1&title=0&byline=0&portrait=0`;
    playerElement.innerHTML = `<iframe src="${videoSrc}" allowfullscreen allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"></iframe>`;
  }

  // Plyr-initialisering (för Vimeo)
  const player = new Plyr('#player iframe', {
    controls: ['play', 'progress', 'volume', 'fullscreen']
  });

  // Fullskärms event-listeners
  player.on('enterfullscreen', () => {
    console.log('Player entered fullscreen');
  });

  player.on('exitfullscreen', () => {
    console.log('Player exited fullscreen');
  });
});

// Funktion för att skapa en YouTube-spelare med YouTube IFrame API
function createYouTubePlayer(videoId) {
  new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: videoId,
    playerVars: {
      'modestbranding': 1,  // Minskar YouTube-branding
      'rel': 0,             // Spela inte relaterade videos efteråt
      'iv_load_policy': 3,  // Dölj annotations
      'showinfo': 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// När spelaren är redo
function onPlayerReady(event) {
  event.target.playVideo();
}

// När spelarens tillstånd ändras
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    console.log('Video finished playing');
  }
}
