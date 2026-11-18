/* The background images and highlight layers use the same t-SNE projection. */
(() => {
  const plots = window.WORLDDOJO_TSNE;
  if (!plots) return;
  const ns = 'http://www.w3.org/2000/svg';

  for (const panel of document.querySelectorAll('.tsne-overview, .tsne-levels')) {
    const buttons = [...panel.querySelectorAll('.tsne-legend li')].map((item, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = item.textContent;
      button.dataset.series = index;
      button.setAttribute('aria-pressed', 'false');
      item.replaceChildren(button);
      return button;
    });
    const layers = [];
    let hovered = null, focused = null, pinned = null;

    function update() {
      const active = hovered ?? focused ?? pinned;
      panel.classList.toggle('has-highlight', active !== null);
      for (const layer of layers) layer.classList.toggle('is-active', layer.dataset.series === active);
      for (const button of buttons) {
        button.classList.toggle('is-active', button.dataset.series === active);
        button.setAttribute('aria-pressed', String(button.dataset.series === pinned));
      }
    }

    for (const img of panel.querySelectorAll('img[data-projection]')) {
      const plot = plots[img.dataset.projection];
      const box = document.createElement('div');
      box.className = 'tsne-plot';
      img.replaceWith(box);
      box.append(img);
      const svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('viewBox', plot.bounds.join(' '));
      svg.setAttribute('preserveAspectRatio', 'none');
      svg.setAttribute('aria-hidden', 'true');
      box.append(svg);
      // Reuse the figure's filled bands, painting denser hit areas above lighter ones.
      if (plot.densityBands) {
        for (let band = 0; band < Math.max(...plot.densityBands); band++) {
          plot.densityBands.forEach((count, series) => {
            if (band >= count) return;
            const region = document.createElementNS(ns, 'use');
            region.setAttribute('href', img.src + '#density-' + series + '-' + band);
            region.setAttribute('class', 'tsne-region');
            region.dataset.series = series;
            svg.append(region);
          });
        }
      }
      plot.points.forEach((coords, index) => {
        const group = document.createElementNS(ns, 'g');
        group.dataset.series = index;
        group.style.stroke = getComputedStyle(buttons[index]).getPropertyValue('--swatch');
        if (plot.contours) {
          const contour = document.createElementNS(ns, 'path');
          contour.setAttribute('d', plot.contours[index]);
          contour.setAttribute('class', 'tsne-contour');
          group.append(contour);
        }
        const dots = document.createElementNS(ns, 'path');
        const commands = [];
        for (let i = 0; i < coords.length; i += 2) commands.push('M' + coords[i] + ' ' + coords[i + 1] + 'h.01');
        dots.setAttribute('d', commands.join(''));
        dots.setAttribute('class', 'tsne-dots');
        dots.setAttribute('stroke-width', plot.contours ? '2.4' : '4');
        group.append(dots);
        svg.append(group);
        layers.push(group);
      });
    }

    const seriesAt = target => target?.closest?.('[data-series]')?.dataset.series ?? null;
    for (const type of ['pointerover', 'pointerout']) {
      panel.addEventListener(type, event => {
        if (event.pointerType === 'touch') return;
        const target = type === 'pointerover' ? event.target : event.relatedTarget;
        const next = target && panel.contains(target) ? seriesAt(target) : null;
        if (hovered !== next) { hovered = next; update(); }
      });
    }
    for (const button of buttons) {
      button.addEventListener('focus', () => {
        focused = button.matches(':focus-visible') ? button.dataset.series : null;
        update();
      });
      button.addEventListener('blur', () => { focused = null; update(); });
    }
    panel.addEventListener('click', event => {
      const series = seriesAt(event.target);
      if (series === null) return;
      pinned = pinned === series ? null : series;
      if (pinned === null) hovered = focused = null;
      update();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') { pinned = hovered = focused = null; update(); }
    });
  }
})();
