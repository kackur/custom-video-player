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

  // Lägga till iframe i spelarelementet med allowfullscreen och tillåtna egenskaper
  playerElement.innerHTML = `<iframe id="videoIframe" src="${videoSrc}" allowfullscreen allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"></iframe>`;

  // Plyr-initialisering
  const player = new Plyr('#player iframe', {
    controls: ['play', 'progress', 'volume', 'fullscreen']
  });

  // Event-listeners
  player.on('play', () => console.log('Playing'));
  player.on('pause', () => console.log('Paused'));

  // Fullskärms event-listeners
  player.on('enterfullscreen', () => {
    console.log('Player entered fullscreen');
  });

  player.on('exitfullscreen', () => {
    console.log('Player exited fullscreen');
  });

  // Fånga klick på YouTube-loggan och öppna länken externt
  const iframe = document.getElementById('videoIframe');

  iframe.addEventListener('load', () => {
    const iframeWindow = iframe.contentWindow;

    iframeWindow.document.addEventListener('click', function(event) {
      const clickedElement = event.target;

      // Kontrollera om det är en länk till YouTube-loggan
      if (clickedElement.tagName === 'A' && clickedElement.href.includes('youtube.com')) {
        event.preventDefault(); // Förhindra att länken öppnas i appen
        window.open(clickedElement.href, '_blank'); // Öppna länken i en ny flik
      }
    });
  });
});
