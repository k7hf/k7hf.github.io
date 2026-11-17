/* Capability map: inspect one evaluation setting and pin a model for comparison. */
(() => {
  const data = window.WORLDDOJO_RESULTS;
  const root = document.querySelector('[data-capability-map]');
  if (!data || !root) return;
  const models = [
    {name: 'BWM', color: '#a57713', dash: ''},
    {name: 'Cosmos3-Nano', color: '#286d88', dash: '12 3'},
    {name: 'DreamDojo', color: '#805b99', dash: '9 3 2 3'},
    {name: 'Ctrl-World', color: '#b2543e', dash: '7 3'},
    {name: 'IRASim', color: '#627456', dash: '3 3'}
  ];
  const state = {level: 'L0', training: 'worlddojo_l0', pinned: null, hovered: null, focused: null};
  const NS = 'http://www.w3.org/2000/svg';
  const center = {x: 280, y: 260}, radius = 176;
  const modelButtons = new Map();
  let svg;
  function node(tag, attributes = {}, text) {
    const el = document.createElementNS(NS, tag);
    Object.entries(attributes).forEach(([key, value]) => el.setAttribute(key, String(value)));
    if (text !== undefined) el.textContent = text;
    return el;
  }
  function point(index, distance) {
    const angle = -Math.PI / 2 + index * Math.PI / 4;
    return [center.x + Math.cos(angle) * distance, center.y + Math.sin(angle) * distance];
  }
  function points(values) { return values.map((value, index) => point(index, radius * value / 100).join(',')).join(' '); }
  function rowFor(model) { return data.rows.find(row => row.model === model && row.level === state.level && row.training === state.training); }
  function axisLabel(col) { return col.metric === 'NPE' ? '1 − NPE' : col.metric; }
  function axisScore(row, col) {
    const value = row.scores[col.id].value;
    return col.metric === 'NPE' ? 100 * (1 - value) : value;
  }
  function displayScore(row, col) {
    const value = col.metric === 'NPE' ? axisScore(row, col).toFixed(1) : row.scores[col.id].display;
    return value + '%';
  }
  function valuesText(row) {
    return data.columns.map(col => `${col.suiteCode} ${axisLabel(col)}: ${displayScore(row, col)}`).join('; ');
  }
  function focusModel() {
    const keyboardFocus = root.contains(document.activeElement) && document.activeElement.matches(':focus-visible')
      ? state.focused : null;
    const active = state.hovered || keyboardFocus || state.pinned;
    root.dataset.activeModel = active || '';
    for (const model of models) {
      const button = modelButtons.get(model.name);
      const pinned = state.pinned === model.name;
      button.setAttribute('aria-pressed', String(pinned));
      button.classList.toggle('is-active', active === model.name);
      button.querySelector('.map-pin-state').textContent = pinned ? 'Pinned' : '';
      const group = [...svg.querySelectorAll('.map-profile')].find(el => el.dataset.model === model.name);
      group.classList.toggle('is-active', active === model.name);
      group.classList.toggle('is-muted', !!active && active !== model.name);
      group.querySelector('.map-shape').setAttribute('aria-pressed', String(pinned));
    }
    const detail = root.querySelector('[data-map-detail]'); detail.replaceChildren();
    const title = document.createElement('h4'); title.className = 'map-detail-title';
    title.textContent = active || 'Compare all models'; detail.append(title);
    if (!active) {
      const hint = document.createElement('p'); hint.className = 'map-detail-hint';
      hint.textContent = 'Choose a model to inspect all eight scores. Click it again, use Show all, or press Esc to clear a pinned selection.';
      detail.append(hint); return;
    }
    const row = rowFor(active), list = document.createElement('dl'); list.className = 'map-score-list';
    for (const col of data.columns) {
      const item = document.createElement('div');
      const label = document.createElement('dt'); label.textContent = `${col.suiteCode} · ${axisLabel(col)} ↑`;
      const value = document.createElement('dd'); value.dataset.mapMetric = col.id;
      value.textContent = displayScore(row, col);
      if (col.metric === 'NPE') value.title = `Raw NPE: ${row.scores[col.id].value}`;
      item.append(label, value); list.append(item);
    }
    detail.append(list);
  }
  function pin(model) {state.pinned = state.pinned === model ? null : model; focusModel();}
  function clearFocus() {state.pinned = null; state.hovered = null; state.focused = null; focusModel();}
  function renderChart() {
    svg = node('svg', {viewBox: '0 -12 560 544', role: 'group', 'aria-label': `${state.level}, ${data.training[state.training]}: eight capability measures; farther from the center is stronger`});
    const grid = node('g', {'aria-hidden': 'true'});
    for (const value of [25, 50, 75, 100]) {
      grid.append(node('polygon', {points: points(Array(8).fill(value)), class: 'map-ring'}));
      grid.append(node('text', {x: center.x + 6, y: center.y - radius * value / 100 - 5, class: 'map-tick'}, value));
    }
    grid.append(node('text', {x: center.x + 6, y: center.y + 14, class: 'map-tick'}, '0'));
    data.columns.forEach((col, index) => {
      const [x, y] = point(index, radius), [lx, ly] = point(index, radius + 48);
      grid.append(node('line', {x1: center.x, y1: center.y, x2: x, y2: y, class: 'map-axis'}));
      const label = node('text', {x: lx, y: ly - 5, 'text-anchor': 'middle', class: 'map-axis-label'});
      label.append(node('tspan', {x: lx}, col.suiteCode));
      label.append(node('tspan', {x: lx, dy: 24, class: 'map-axis-metric'}, axisLabel(col)));
      grid.append(label);
    });
    svg.append(grid);
    for (const model of [...models].reverse()) {
      const row = rowFor(model.name);
      const values = data.columns.map(col => axisScore(row, col));
      const group = node('g', {class: 'map-profile', 'data-model': model.name}); group.style.setProperty('--model-color', model.color);
      const shape = node('polygon', {points: points(values), class: 'map-shape', 'stroke-dasharray': model.dash, tabindex: '0', role: 'button', 'aria-label': `Pin ${model.name}. ${valuesText(row)}`});
      group.append(shape);
      values.forEach((value, index) => {
        const [x, y] = point(index, radius * value / 100);
        group.append(node('circle', {cx: x, cy: y, r: 3, class: 'map-point', 'data-metric': data.columns[index].id, 'data-value': value}));
      });
      group.addEventListener('pointerenter', () => {state.hovered = model.name; focusModel();});
      group.addEventListener('pointerleave', () => {state.hovered = null; focusModel();});
      group.addEventListener('click', () => pin(model.name));
      shape.addEventListener('focus', () => {state.focused = shape.matches(':focus-visible') ? model.name : null; focusModel();});
      shape.addEventListener('blur', () => {state.focused = null; focusModel();});
      shape.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {event.preventDefault(); pin(model.name);}
      });
      svg.append(group);
    }
    root.querySelector('[data-map-chart]').replaceChildren(svg);
    root.querySelector('[data-map-context]').textContent = `${state.level} · ${data.training[state.training]} · 5 models`;
    root.querySelectorAll('[data-map-level]').forEach(button => {
      const active = button.dataset.mapLevel === state.level;
      button.setAttribute('aria-pressed', String(active)); button.classList.toggle('ink-button-solid', active);
    });
    focusModel();
  }
  for (const model of models) {
    const li = document.createElement('li'), button = document.createElement('button');
    button.type = 'button'; button.className = 'map-model'; button.dataset.mapModel = model.name; button.style.setProperty('--model-color', model.color);
    button.setAttribute('aria-label', `Pin ${model.name}`);
    const swatch = document.createElement('span'); swatch.className = 'map-model-swatch'; swatch.setAttribute('aria-hidden', 'true');
    const name = document.createElement('span'); name.className = 'map-model-name'; name.textContent = model.name;
    const pinned = document.createElement('span'); pinned.className = 'map-pin-state';
    button.append(swatch, name, pinned); li.append(button); root.querySelector('[data-map-models]').append(li);
    button.addEventListener('pointerenter', () => {state.hovered = model.name; focusModel();});
    button.addEventListener('pointerleave', () => {state.hovered = null; focusModel();});
    button.addEventListener('focus', () => {state.focused = button.matches(':focus-visible') ? model.name : null; focusModel();});
    button.addEventListener('blur', () => {state.focused = null; focusModel();});
    button.addEventListener('click', () => pin(model.name));
    modelButtons.set(model.name, button);
  }
  root.querySelectorAll('[data-map-level]').forEach(button => button.addEventListener('click', () => {
    state.level = button.dataset.mapLevel; state.hovered = null; state.focused = null; renderChart();
  }));
  root.querySelector('[data-map-training]').addEventListener('change', event => {
    state.training = event.target.value; state.hovered = null; state.focused = null; renderChart();
  });
  root.querySelector('[data-map-reset]').addEventListener('click', clearFocus);
  root.addEventListener('keydown', event => {if (event.key === 'Escape') {event.preventDefault(); clearFocus();}});
  renderChart();
})();
