(() => {
  const root = document.getElementById('real-vs-imagined');
  const cases = window.WORLDDOJO_COMPARE;
  const cameraNames = {agentview:'Fixed camera', wrist:'Wrist camera', head:'Head camera', left_wrist:'Left wrist camera', right_wrist:'Right wrist camera'};
  const state = {environment:'sim', suite:'SC', level:'L2', mode:'worlddojo'};
  const view = root.querySelector('.compare-view');
  const stage = root.querySelector('.compare-stage');
  const slider = root.querySelector('.compare-range');
  const status = root.querySelector('.compare-status');
  const [gtMarker, predictionMarker] = stage.querySelectorAll('.compare-marker');
  const modeControl = root.querySelector('[data-control=mode]');
  const [leftLabel, rightLabel] = stage.querySelectorAll('.compare-label');
  const results = window.WORLDDOJO_RESULTS;
  let request = 0;

  function setSplit(value) {
    const split = Math.round(Math.max(0, Math.min(100, value)));
    slider.value = split;
    slider.setAttribute('aria-valuetext', split + '% ' + leftLabel.textContent + ', ' + (100 - split) + '% ' + rightLabel.textContent);
    stage.style.setProperty('--split', split + '%');
  }
  slider.addEventListener('input', () => setSplit(Number(slider.value)));
  // The whole frame is a drag surface, including on touchscreens.
  function drag(event) {
    const rect = slider.getBoundingClientRect();
    setSplit(100 * (event.clientX - rect.left) / rect.width);
  }
  slider.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    event.preventDefault();
    slider.focus({preventScroll:true});
    slider.setPointerCapture(event.pointerId);
    drag(event);
  });
  slider.addEventListener('pointermove', event => {
    if (slider.hasPointerCapture(event.pointerId)) drag(event);
  });

  async function showCase() {
    const version = ++request;
    const item = cases[state.environment].find(row => row.suite === state.suite && row.level === state.level);
    modeControl.hidden = !item.training;
    const selection = item.training?.[state.mode];
    const setting = results.training[state.mode === 'worlddojo' ? 'worlddojo_l0' : 'demo'];
    const sources = [item.reference, selection ? selection.image : item.prediction];
    view.setAttribute('aria-busy','true');
    stage.hidden = true;
    status.hidden = false;
    status.textContent = 'Loading comparison…';
    const meta = root.querySelector('.compare-meta'), note = root.querySelector('.compare-note');
    meta.textContent = note.textContent = '';
    try {
      const images = await Promise.all(sources.map(async src => {
        const image = new Image();
        image.src = src;
        await image.decode();
        return image;
      }));
      if (version !== request) return;
      rightLabel.textContent = selection ? setting : 'Prediction';
      const [left, right] = stage.querySelectorAll('img');
      left.src = images[0].src;
      right.src = images[1].src;
      right.alt = selection ? 'BWM prediction after fine-tuning on ' + setting : item.model + ' prediction';
      // Letterbox a landscape camera frame inside the shared square viewer.
      const heightRatio = images[0].naturalHeight / images[0].naturalWidth;
      const inset = (1 - heightRatio) * 50;
      stage.style.setProperty('--image-inset', inset + '%');
      function placeMarker(element, region) {
        element.style.left = region.x + '%';
        element.style.top = (inset + region.y * heightRatio) + '%';
        element.style.width = region.diameter + '%';
      }
      placeMarker(gtMarker, item.markers.gt);
      placeMarker(predictionMarker, item.markers[selection ? state.mode : 'pred']);
      note.textContent = selection ? selection.note : item.note;
      const id = state.environment === 'real' ? item.task : item.sample;
      meta.textContent = [item.suite + ' · ' + item.level, id, cameraNames[item.camera], 'Frame ' + item.frame, selection ? 'BWM · ' + setting : item.model].join(' · ');
      meta.title = item.sample;
      setSplit(slider.value);
      status.hidden = true;
      stage.hidden = false;
    } catch {
      if (version === request) status.textContent = 'This frame pair could not be loaded.';
    } finally {
      if (version === request) view.setAttribute('aria-busy','false');
    }
  }
  for (const field of root.querySelectorAll('fieldset')) {
    field.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button) return;
      state[field.dataset.control] = button.value;
      for (const option of field.querySelectorAll('button')) {
        option.setAttribute('aria-pressed', String(option === button));
      }
      showCase();
    });
  }
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    if (!request) showCase();
  }, {rootMargin:'500px'});
  observer.observe(root);
})();
