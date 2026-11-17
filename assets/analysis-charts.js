/* Simulation analyses from the WorldDojo paper, Figures 3–5. */
(() => {
  const root = document.getElementById('analysis');
  if (!root) return;
  // Figure 3 uses printed values. Figures 4 and 5 use values recovered from the vector plots.
  const data = {
    "causal": [
      {
        "pairs": [
          [8, 5, 43, 44],
          [68, 5, 18, 9]
        ],
        "chain": [
          [13.4, 1.5, 1.5],
          [46.3, 10.4, 10.4]
        ],
        "AND": [
          [0, 0, 12, 60],
          [0, 8, 16, 16]
        ],
        "OR": [
          [0, 0, 0, 16],
          [0, 0, 0, 20]
        ]
      },
      {
        "pairs": [
          [13, 5, 56, 26],
          [71, 10, 13, 6]
        ],
        "chain": [
          [16.4, 6.0, 4.5],
          [65.7, 19.4, 9.0]
        ],
        "AND": [
          [4, 4, 12, 36],
          [0, 56, 28, 60]
        ],
        "OR": [
          [0, 0, 0, 20],
          [0, 4, 0, 40]
        ]
      }
    ],
    "localization": [
      {
        "view": [
          [0.071, 2.42, 6.026],
          [0.944, 7.01, 11.861]
        ],
        "role": [
          [82.34, 70.2, 65.95],
          [42.3, 36.46, 28.69]
        ],
        "failure": [40.291262, 26.699029, 16.990291]
      },
      {
        "view": [
          [0.109, 3.582, 10.926],
          [0.44, 9.373, 21.714]
        ],
        "role": [
          [66.58, 51.58, 45.67],
          [42.27, 33.73, 23.46]
        ],
        "failure": [44.933921, 25.110132, 28.634361]
      }
    ],
    "npeMax": 25,
    "samplingPrecision": 2,
    "sampling": [
      [27.79, 46.88, 40.56, 39.44, 37.01, 36.82, 36.25, 36.2, 35.29, 35.07],
      [55.67, 58.44, 55.73, 55.86, 54.34, 54.02, 54.13, 54.05, 53.72, 53.3],
      [22.64, 43.59, 36.82, 34.77, 32.95, 33.06, 31.42, 31.63, 30.79, 30.56],
      [5.07, 38.59, 29.11, 27.71, 23.75, 23.39, 23.19, 22.92, 21.36, 21.36]
    ]
  };
  const models = ['BWM', 'Cosmos3-Nano'];
  const levels = ['L0', 'L1', 'L2'];
  const training = ['LIBERO Demo.', 'WorldDojo L0'];
  const seriesColors = ['#32673f', '#416e91', '#ae6828', '#815d8b'];

  function element(tag, cls, content) {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (content !== undefined) el.textContent = content;
    return el;
  }
  function choices(host, label, options, onChange) {
    const group = element('div', 'analysis-choices');
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', label);
    options.forEach((name, index) => {
      const button = element('button', '', name);
      button.type = 'button';
      button.setAttribute('aria-pressed', String(index === 0));
      button.addEventListener('click', () => {
        for (const item of group.children) item.setAttribute('aria-pressed', String(item === button));
        onChange(index);
      });
      group.append(button);
    });
    host.append(group);
  }
  function card(host, title, subtitle) {
    const box = element('section', 'analysis-card');
    box.append(element('h4', '', title), element('p', 'analysis-subtitle', subtitle));
    host.append(box);
    return box;
  }
  function legend(host, names) {
    const list = element('div', 'analysis-legend');
    names.forEach((name, i) => {
      const item = element('span', '', name);
      item.style.setProperty('--series', seriesColors[i]);
      list.append(item);
    });
    host.append(list);
  }
  function bars(host, groups, names, rows, options = {}) {
    const {maximum = 100, unit = '%', decimals = 1} = options;
    if (names.length > 1) legend(host, names);
    groups.forEach((group, i) => {
      const block = element('div', 'analysis-bar-group');
      block.append(element('strong', '', group));
      rows[i].forEach((value, j) => {
        const row = element('div', 'analysis-bar-row');
        row.setAttribute('aria-label', [group, names[j], value + unit].join(' · '));
        row.title = row.getAttribute('aria-label');
        const track = element('span', 'analysis-track');
        const fill = element('i');
        fill.style.width = (100 * value / maximum) + '%';
        fill.style.background = seriesColors[names.length === 1 ? i : j];
        track.append(fill);
        row.append(track, element('span', 'analysis-value', value.toFixed(decimals) + unit));
        block.append(row);
      });
      host.append(block);
    });
  }
  function transpose(rows) {
    return rows[0].map((_, i) => rows.map(row => row[i]));
  }
  function causal(host, i) {
    const d = data.causal[i];
    const pair = card(host, 'L0 · Paired interventions', 'Outcomes across 100 factual–counterfactual pairs per training condition.');
    bars(pair, ['Both correct', 'Factual only', 'Counterfactual only', 'Neither correct'], training, transpose(d.pairs), {decimals: 0});
    const chain = card(host, 'L1 · Three-event chains', 'Share of trajectories correct through each successive event.');
    bars(chain, ['Through A', 'Through B', 'Through C'], training, transpose(d.chain));
    const gate = card(host, 'L2 · Multi-factor events', 'Event consistency for each combination of inputs A and B.');
    gate.classList.add('analysis-span');
    const grid = element('div', 'analysis-gates');
    for (const [operator, expected] of [['AND', [1, 0, 0, 0]], ['OR', [1, 1, 1, 0]]]) {
      const table = element('table', 'analysis-truth');
      table.append(element('caption', '', operator));
      const header = table.createTHead().insertRow();
      ['Inputs AB', 'Expected C', ...training].forEach(name => {
        const th = element('th', '', name); th.scope = 'col'; header.append(th);
      });
      const body = table.createTBody();
      ['11', '10', '01', '00'].forEach((input, k) => {
        const row = body.insertRow();
        const th = element('th', '', input); th.scope = 'row'; row.append(th);
        row.insertCell().textContent = expected[k];
        for (const scores of d[operator]) {
          const cell = row.insertCell();
          cell.textContent = scores[k] + '%';
          cell.style.setProperty('--tint', (6 + scores[k] * 0.6) + '%');
        }
      });
      grid.append(table);
    }
    gate.append(grid);
  }
  function localization(host, i) {
    const d = data.localization[i];
    const spatial = card(host, 'Position error by view', 'SC · NPE × 100. Shorter bars indicate smaller errors.');
    bars(spatial, levels, ['Fixed camera', 'Wrist camera'], transpose(d.view), {maximum: data.npeMax, unit: '', decimals: 2});
    const objects = card(host, 'Object consistency by role', 'OG · OSCR on background objects and interaction targets.');
    bars(objects, levels, ['Background objects', 'Interaction targets'], transpose(d.role));
    const failures = card(host, 'Object failure modes', 'OG · Share of object failure events pooled across L0–L2.');
    bars(failures, ['Deformation', 'Replacement', 'Disappearance'], ['Share'], d.failure.map(v => [v]));
  }
  for (const [id, render] of [['causal', causal], ['localization', localization]]) {
    const panel = root.querySelector('[data-native-analysis="' + id + '"]');
    const host = panel.querySelector('.analysis-plots');
    choices(panel.querySelector('.analysis-toolbar'), 'Analysis model', models, i => {
      host.replaceChildren(); render(host, i);
    });
    render(host, 0);
  }

  const panel = root.querySelector('[data-native-analysis="sampling"]');
  const slider = panel.querySelector('input');
  const chart = panel.querySelector('svg');
  const output = panel.querySelector('output');
  const labels = ['Overall', ...levels];
  const x = n => 43 + (n - 1) * 40;
  const y = value => 188 - value * (162 / 65);
  function svg(tag, attrs, text) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attrs).forEach(([k,v]) => el.setAttribute(k, v));
    if (text !== undefined) el.textContent = text;
    chart.append(el); return el;
  }
  chart.setAttribute('viewBox', '0 0 432 225');
  for (const tick of [0, 10, 20, 30, 40, 50, 60]) {
    svg('line', {x1:x(1), x2:x(10), y1:y(tick), y2:y(tick), class:'sampling-grid'});
    svg('text', {x:30, y:y(tick)+4, 'text-anchor':'end'}, tick);
  }
  for (let n=1; n<=10; n++) svg('text', {x:x(n),y:213,'text-anchor':'middle'},n);
  const guide = svg('line', {y1:y(65),y2:y(0),class:'sampling-guide'});
  const markers = [], values = [];
  labels.forEach((name, i) => {
    const scores = data.sampling[i];
    svg('polyline', {points:scores.map((value,k)=>[x(k+1),y(value)].join(',')).join(' '),
      fill:'none',stroke:seriesColors[i],'stroke-width':i===0?3:2,'stroke-dasharray':['none','7 3','3 3','9 3 2 3'][i]});
    markers.push(svg('circle', {r:4.5,fill:seriesColors[i],stroke:'white','stroke-width':1.5}));
    const item = element('div');
    item.style.setProperty('--series',seriesColors[i]);
    const value = element('dd');
    item.append(element('dt','',name),value);
    panel.querySelector('dl').append(item); values.push(value);
  });
  function sample(n) {
    slider.value=n; output.textContent=n+(n===1?' frame':' frames');
    guide.setAttribute('x1',x(n));guide.setAttribute('x2',x(n));
    labels.forEach((_,i) => {
      const value=data.sampling[i][n-1];
      markers[i].setAttribute('cx',x(n));markers[i].setAttribute('cy',y(value));
      values[i].textContent=value.toFixed(data.samplingPrecision)+'%';
    });
  }
  function inspect(event) {
    const local = new DOMPoint(event.clientX,event.clientY).matrixTransform(chart.getScreenCTM().inverse());
    sample(Math.max(1,Math.min(10,Math.round((local.x-x(1))/40)+1)));
  }
  chart.addEventListener('pointermove',event=>{if(event.pointerType==='mouse')inspect(event);});
  chart.addEventListener('click',inspect);
  slider.addEventListener('input',()=>sample(Number(slider.value)));
  sample(Number(slider.value));
})();
