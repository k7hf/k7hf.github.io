(() => {
  const root = document.getElementById('real-vs-imagined');
  const cases = window.WORLDDOJO_COMPARE;
  const state = {environment:'sim', suite:'SC', level:'L0', mode:'reference'};
  const view = root.querySelector('.compare-view');
  const stage = root.querySelector('.compare-stage');
  const slider = root.querySelector('.compare-range');
  const status = root.querySelector('.compare-status');
  const marker = root.querySelector('.compare-marker');
  const modeControl = root.querySelector('[data-control=mode]');
  const [leftLabel, rightLabel] = stage.querySelectorAll('.compare-label');
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
    const training = !!item.training && state.mode === 'training';
    const sources = training ? [item.training.libero, item.training.worlddojo] : [item.reference, item.prediction];
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
      leftLabel.textContent = training ? 'LIBERO Demo.' : 'GT · Recorded';
      rightLabel.textContent = training ? 'WorldDojo L0' : 'Prediction';
      const [left, right] = stage.querySelectorAll('img');
      left.src = images[0].src;
      right.src = images[1].src;
      left.alt = training ? 'BWM prediction after LIBERO demonstration fine-tuning' : 'Recorded frame';
      right.alt = training ? 'BWM prediction after WorldDojo L0 fine-tuning' : 'Model prediction';
      stage.style.setProperty('--frame-width', Math.max(images[0].naturalWidth, images[1].naturalWidth) + 'px');
      stage.style.setProperty('--frame-ratio', images[0].naturalWidth / images[0].naturalHeight);
      marker.hidden = training || !item.marker;
      if (training) {
        note.textContent = item.training.trainingNote;
      } else if (item.marker) {
        marker.style.left = item.marker.x + '%';
        marker.style.top = item.marker.y + '%';
        note.textContent = item.marker.label;
      }
      const id = state.environment === 'real' ? item.task : item.sample;
      meta.textContent = [item.suite + ' · ' + item.level, id, 'Frame ' + item.frame, training ? 'BWM · fine-tuning comparison' : item.model].join(' · ');
      meta.title = item.sample;
      setSplit(50);
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
