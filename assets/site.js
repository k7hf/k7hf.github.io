/* All media and captions are maintained in worlddojo/content.js. */
(() => {
  const content = window.WORLDDOJO_CONTENT;
  const grid = document.getElementById('demo-grid');
  if (!content || !grid) return;

  let environment = 'libero';
  const environmentButtons = document.querySelectorAll('[data-demo-env]');
  const suiteButtons = document.querySelectorAll('#demonstrations button[data-suite]');

  function card(example) {
    const suite = content.suites.find(item => item.id === example.suite);
    const article = document.createElement('article'); article.className = 'demo-card';
    const media = document.createElement('div'); media.className = 'demo-media';
    const poster = document.createElement('img');
    poster.className = 'demo-poster'; poster.src = example.poster; poster.alt = '';
    poster.width = example.width; poster.height = example.height;
    const video = document.createElement('video');
    video.playsInline = true; video.muted = true; video.defaultMuted = true;
    video.loop = true; video.autoplay = true; video.preload = 'auto';
    video.width = example.width; video.height = example.height;
    video.poster = example.poster; video.src = example.video;
    video.setAttribute('aria-label', `${example.sampleId}: ${example.caption || example.title}`);
    const toggle = document.createElement('button'); toggle.type = 'button'; toggle.className = 'demo-play-toggle';
    function updateControl() {
      toggle.textContent = video.paused ? 'Play' : 'Pause';
      toggle.setAttribute('aria-label', `${video.paused ? 'Play' : 'Pause'} ${example.sampleId}`);
      media.classList.toggle('is-paused', video.paused);
    }
    function revealFrame() {media.classList.add('is-ready');}
    video.addEventListener('playing', () => {
      if (video.requestVideoFrameCallback) video.requestVideoFrameCallback(revealFrame);
      else revealFrame();
      updateControl();
    });
    video.addEventListener('pause', updateControl);
    toggle.addEventListener('click', () => {
      if (video.paused) video.play().catch(updateControl);
      else video.pause();
    });
    // A small custom button remains usable if the browser declines autoplay.
    toggle.textContent = 'Play';
    toggle.setAttribute('aria-label', `Play ${example.sampleId}`);
    media.append(poster, video, toggle);
    const body = document.createElement('div'); body.className = 'demo-card-content';
    const meta = document.createElement('div'); meta.className = 'demo-meta';
    meta.textContent = `${example.suite} · ${example.level} · ${example.sampleId}`;
    const title = document.createElement('h3'); title.textContent = example.title || suite.levels[Number(example.level.slice(1))];
    const caption = document.createElement('p'); caption.textContent = example.caption;
    body.append(meta, title);
    if (example.caption) body.append(caption);
    article.append(media, body);
    return article;
  }

  function selectSuite(id) {
    grid.dataset.suite = id;
    grid.querySelectorAll('video').forEach(video => video.pause());
    const suite = content.suites.find(item => item.id === id);
    document.getElementById('demo-description').textContent = suite.description;
    const examples = environment === 'libero' ? content.examples : content.realExamples;
    grid.replaceChildren(...examples.filter(item => item.suite === id).map(card));
    if (environment === 'libero' && id === 'CR') {
      const note = document.createElement('div'); note.className = 'demo-row-note';
      const title = document.createElement('h3'); title.textContent = 'Counterfactual / HN examples';
      note.append(title); grid.append(note, ...content.alternatives.map(card));
    }
    suiteButtons.forEach(button => {
      const selected = button.dataset.suite === id;
      button.setAttribute('aria-pressed', String(selected));
    });
  }
  suiteButtons.forEach(button => {
    button.addEventListener('click', () => selectSuite(button.dataset.suite));
  });
  function setEnvironment(next, suite = grid.dataset.suite) {
    environment = next;
    environmentButtons.forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.demoEnv === next));
    });
    suiteButtons.forEach(button => {
      const image = button.querySelector('img');
      image.src = image.dataset[next];
    });
    document.getElementById('demo-environment-note').textContent = next === 'real'
      ? 'Physical robot recordings. The head camera is on the left, with the two wrist cameras stacked on the right.'
      : 'Recorded LIBERO simulation trajectories from the fixed and wrist cameras.';
    selectSuite(suite);
  }
  environmentButtons.forEach(button => button.addEventListener('click', () => {
    if (environment !== button.dataset.demoEnv) setEnvironment(button.dataset.demoEnv);
  }));
  function showLinkedSuite(hash) {
    const match = /^#(real-)?examples-(OG|SC|HM|CR)$/.exec(hash);
    if (!match) return false;
    const next = match[1] ? 'real' : 'libero';
    if (environment !== next || grid.dataset.suite !== match[2]) setEnvironment(next, match[2]);
    return true;
  }
  window.addEventListener('hashchange', () => showLinkedSuite(location.hash));
  if (!showLinkedSuite(location.hash)) selectSuite('OG');
})();
