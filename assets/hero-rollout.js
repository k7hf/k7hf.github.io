(() => {
  const panel = document.querySelector('.title-rollout');
  const video = panel.querySelector('video');
  const toggle = panel.querySelector('button');
  const frame = panel.querySelector('output');
  const progress = panel.querySelector('progress');
  function sync() {
    const step = Math.min(164, Math.floor(video.currentTime * 20));
    frame.value = String(step).padStart(3, '0');
    progress.value = step;
  }
  function updateButton() {
    toggle.textContent = video.paused ? 'Play' : 'Pause';
    toggle.setAttribute('aria-label', toggle.textContent + ' the BWM rollout');
  }
  toggle.addEventListener('click', () => {
    if (video.paused) video.play().catch(updateButton);
    else video.pause();
  });
  video.addEventListener('timeupdate', sync);
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) video.play().catch(updateButton);
})();
