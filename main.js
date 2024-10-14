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
  } else if (videoType === 'vimeo') {
    videoSrc = `https://player.vimeo.com/video/${videoId}?dnt=1&title=0&byline=0&portrait=0`;
  }

  // Lägga till iframe i spelarelementet
  playerElement.innerHTML = `<iframe src="${videoSrc}" allowfullscreen allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>`;

  // Plyr-initialisering
  const player = new Plyr('#player iframe', {
    controls: ['play', 'progress', 'volume', 'fullscreen']
  });

  // Event-listeners
  player.on('play', () => console.log('Playing'));
  player.on('pause', () => console.log('Paused'));
});
