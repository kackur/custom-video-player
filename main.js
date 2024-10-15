document.addEventListener('DOMContentLoaded', () => {
  const playerElement = document.getElementById('player');

  // Hämta video-ID och typ från URL-params
  const urlParams = new URLSearchParams(window.location.search);
  const videoType = urlParams.get('type'); // 'youtube' eller 'vimeo'
  const videoId = urlParams.get('video'); // ID på videon

  let videoSrc;

  // Skapa video-iframe beroende på typ (YouTube eller Vimeo)
  if (videoType === 'youtube') {
    videoSrc = `https://www.youtube.com/embed/${videoId}?origin=${window.location.origin}&iv_load_policy=3&modestbranding=1&rel=0&showinfo=0`;
    
    // Lägg till iframe i spelarelementet och ett transparent block för att täcka YouTube-loggan
    playerElement.innerHTML = `
      <div class="video-container">
        <iframe src="${videoSrc}" allowfullscreen allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
        <div class="overlay" onclick="openYouTubeExternal('${videoId}')"></div>
      </div>`;
  } else if (videoType === 'vimeo') {
    videoSrc = `https://player.vimeo.com/video/${videoId}?dnt=1&title=0&byline=0&portrait=0`;
    playerElement.innerHTML = `<iframe src="${videoSrc}" allowfullscreen allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
  }

  // Plyr-initialisering
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

// Funktion för att öppna YouTube i en ny flik när användaren klickar på overlay-blocket
function openYouTubeExternal(videoId) {
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  window.open(youtubeUrl, '_blank'); // Öppna i en ny flik eller extern app
}
