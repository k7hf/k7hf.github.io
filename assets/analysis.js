(() => {
  for (const group of document.querySelectorAll('#analysis [role="tablist"]')) {
    const tabs = [...group.querySelectorAll('[role="tab"]')];
    function select(tab, focus = false) {
      tabs.forEach(item => {
        const active = item === tab;
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
        document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
      });
      if (focus) tab.focus();
    }
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (i + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) {event.preventDefault(); select(tabs[next], true);}
      });
    });
  }

  const lens = document.createElement('div');
  lens.className = 'failure-lens';
  lens.setAttribute('aria-hidden', 'true');
  const magnification = 1.65;
  for (const frame of document.querySelectorAll('.failure-frame')) {
    const image = frame.querySelector('img');
    function inspect(event) {
      if (event.pointerType !== 'mouse') return;
      const bounds = image.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const diameter = Math.min(88, bounds.width * 0.52, bounds.height * 0.52);
      const left = Math.max(0, Math.min(x - diameter / 2, bounds.width - diameter));
      const top = Math.max(0, Math.min(y - diameter / 2, bounds.height - diameter));
      if (lens.parentNode !== frame) {
        lens.style.backgroundImage = `url("${image.currentSrc || image.src}")`;
        frame.append(lens);
      }
      Object.assign(lens.style, {
        width: `${diameter}px`, height: `${diameter}px`,
        left: `${left}px`, top: `${top}px`,
        backgroundSize: `${bounds.width * magnification}px ${bounds.height * magnification}px`,
        backgroundPosition: `${x - left - x * magnification}px ${y - top - y * magnification}px`
      });
    }
    function dismiss() {
      if (lens.parentNode === frame) lens.remove();
    }
    frame.addEventListener('pointerenter', inspect);
    frame.addEventListener('pointermove', inspect);
    frame.addEventListener('pointerleave', dismiss);
    frame.addEventListener('pointercancel', dismiss);
  }
})();
