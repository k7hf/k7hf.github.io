/* All four suites and three levels stay visible; rank the explicitly selected column. */
(() => {
  const data = window.WORLDDOJO_RESULTS;
  const board = document.querySelector('[data-leaderboard]');
  if (!data || !board) return;
  const state = {suite: 'SC', level: 'L0', metric: 'SC_OSCR', query: ''};
  const body = board.querySelector('tbody');
  const head = board.querySelector('thead');
  const search = board.querySelector('input[type="search"]');
  const entries = data.rows.filter(row => row.level === 'L0').map(row => ({
    model: row.model, training: row.training,
    levels: Object.fromEntries(data.rows.filter(item => item.model === row.model && item.training === row.training)
      .map(item => [item.level, item.scores]))
  }));
  const suites = [...new Set(data.columns.map(col => col.suiteCode))];
  const displayColumns = suites.flatMap(suite => data.levels.flatMap(level =>
    data.columns.filter(col => col.suiteCode === suite).map(col => ({level, col}))));
  let displayed = [];
  function renderHeader() {
    head.replaceChildren();
    const groups = document.createElement('tr');
    for (const [label, className] of [['Model / fine-tuning', 'model-cell'], ['Rank', 'rank-cell']]) {
      const th = document.createElement('th');
      th.scope = 'col'; th.rowSpan = 3; th.className = className; th.textContent = label;
      groups.append(th);
    }
    const levels = document.createElement('tr');
    const metrics = document.createElement('tr');
    for (const suite of suites) {
      const cols = data.columns.filter(col => col.suiteCode === suite);
      const suiteHeader = document.createElement('th');
      suiteHeader.scope = 'colgroup'; suiteHeader.colSpan = data.levels.length * cols.length;
      suiteHeader.dataset.suiteHeading = suite; suiteHeader.dataset.suite = suite;
      const suiteName = document.createElement('span'); suiteName.className = 'suite-heading-label'; suiteName.textContent = cols[0].suiteLabel;
      suiteHeader.append(suiteName);
      groups.append(suiteHeader);
      for (const level of data.levels) {
        const levelHeader = document.createElement('th');
        levelHeader.colSpan = cols.length; levelHeader.scope = 'colgroup';
        levelHeader.dataset.suite = suite; levelHeader.dataset.level = level;
        const badge = document.createElement('span'); badge.className = 'level-badge'; badge.textContent = level;
        levelHeader.append(badge);
        if (level === 'L2') levelHeader.className = 'suite-end';
        levels.append(levelHeader);
        for (const [index, col] of cols.entries()) {
          const th = document.createElement('th'); th.scope = 'col';
          th.dataset.suite = suite; th.dataset.level = level;
          if (index === cols.length - 1) th.classList.add('level-end');
          if (level === 'L2' && index === cols.length - 1) th.classList.add('suite-end');
          const button = document.createElement('button'); button.type = 'button';
          button.dataset.sort = `${level}:${col.id}`;
          button.textContent = `${col.label} ${col.direction === 'higher' ? '↑' : '↓'}`;
          button.title = `Rank by ${level} · ${col.suiteLabel} · ${col.label}`;
          button.addEventListener('click', () => {
            state.level = level; state.metric = col.id; state.suite = suite;
            board.querySelector('[data-board-suite]').value = suite;
            render();
          });
          th.append(button); metrics.append(th);
        }
      }
    }
    head.append(groups, levels, metrics);
  }
  function render() {
    board.querySelector('[data-board-suite]').dispatchEvent(new Event('picker:sync'));
    const selected = data.columns.find(col => col.id === state.metric);
    const sign = selected.direction === 'higher' ? -1 : 1;
    const sorted = [...entries].sort((a, b) => sign *
      (a.levels[state.level][state.metric].value - b.levels[state.level][state.metric].value) ||
      a.model.localeCompare(b.model) || a.training.localeCompare(b.training));
    let previous = null, rank = 0;
    const ranked = sorted.map((row, index) => {
      const value = row.levels[state.level][state.metric].value;
      if (value !== previous) rank = index + 1;
      previous = value;
      return {...row, rank};
    });
    displayed = ranked.filter(row => row.model.toLowerCase().includes(state.query));
    body.replaceChildren();
    for (const row of displayed) {
      const tr = document.createElement('tr'); tr.dataset.training = row.training;
      const model = document.createElement('th'); model.scope = 'row'; model.className = 'model-cell';
      const name = document.createElement('span'); name.className = 'model-name'; name.textContent = row.model;
      const training = document.createElement('span'); training.className = 'model-training'; training.textContent = data.training[row.training];
      model.append(name, training);
      const position = document.createElement('td'); position.className = 'rank-cell';
      const rankText = String(row.rank).padStart(2, '0');
      if (row.rank <= 3) {
        const metal = ['gold', 'silver', 'bronze'][row.rank - 1]; tr.dataset.podium = metal;
        const medal = document.createElement('span'); medal.className = 'rank-medal'; medal.setAttribute('role', 'img');
        const label = `${metal[0].toUpperCase() + metal.slice(1)} medal · Rank ${row.rank} by ${state.level} ${selected.suiteCode} ${selected.label}`;
        medal.setAttribute('aria-label', label); medal.title = label;
        const disc = document.createElement('span'); disc.className = 'medal-disc'; disc.textContent = rankText;
        medal.append(disc); position.append(medal);
      } else position.textContent = rankText;
      const mobileRank = document.createElement('span'); mobileRank.className = 'mobile-rank';
      const rankLabel = document.createElement('span'); rankLabel.textContent = 'Rank';
      mobileRank.append(rankLabel, ...[...position.childNodes].map(node => node.cloneNode(true)));
      model.prepend(mobileRank);
      tr.append(model, position);
      for (const [index, {level, col}] of displayColumns.entries()) {
        const td = document.createElement('td'); td.dataset.metric = col.id; td.dataset.level = level; td.dataset.suite = col.suiteCode;
        if ((index + 1) % 2 === 0) td.classList.add('level-end');
        if ((index + 1) % 6 === 0) td.classList.add('suite-end');
        const value = row.levels[level][col.id];
        const number = document.createElement('span'); number.textContent = value.display;
        const best = (col.direction === 'higher' ? Math.max : Math.min)(...entries.map(item => item.levels[level][col.id].value));
        if (value.value === best) number.className = 'best-value';
        if (col.metric !== 'NPE' && value.value < 10) td.classList.add('low-rate');
        if (level === state.level && col.id === state.metric) td.classList.add('selected-metric');
        if (col.metric === 'NPE') td.title = `Unrounded NPE: ${value.value}; displayed ×100`;
        td.append(number); tr.append(td);
      }
      body.append(tr);
    }
    if (!displayed.length) {
      const tr = document.createElement('tr'), td = document.createElement('td');
      td.colSpan = 2 + displayColumns.length; td.className = 'board-empty';
      td.textContent = `No model matches “${search.value}”. Try a different name or clear the search.`;
      tr.append(td); body.append(tr);
    }
    head.querySelectorAll('[data-sort]').forEach(button => {
      const active = button.dataset.sort === `${state.level}:${state.metric}`;
      button.setAttribute('aria-pressed', String(active));
      button.closest('th').setAttribute('aria-sort', active ? (selected.direction === 'higher' ? 'descending' : 'ascending') : 'none');
    });
    head.querySelectorAll('[data-suite-heading]').forEach(th => th.classList.toggle('is-sort-suite', th.dataset.suiteHeading === state.suite));
    board.querySelector('[data-ranking-label]').textContent = `${selected.suiteLabel} · Ranked by ${state.level} ${selected.label} ${selected.direction === 'higher' ? '↑' : '↓'}`;
    board.querySelector('[data-board-status]').textContent = `${displayed.length} of ${entries.length} entries · 4 suites × 3 levels · Both fine-tuning sets`;
    board.querySelector('[data-csv]').disabled = !displayed.length;
  }
  board.querySelector('[data-board-suite]').addEventListener('change', event => {
    state.suite = event.target.value;
    state.metric = data.columns.find(col => col.suiteCode === state.suite && col.metric === 'OSCR').id;
    render();
    const scroll = board.querySelector('.table-scroll');
    const cell = head.querySelector(`[data-sort="${state.level}:${state.metric}"]`).closest('th');
    const fixedWidth = head.querySelector('.model-cell').offsetWidth + head.querySelector('.rank-cell').offsetWidth;
    scroll.scrollLeft += cell.getBoundingClientRect().left - scroll.getBoundingClientRect().left - fixedWidth - 12;
  });
  search.addEventListener('input', () => {state.query = search.value.trim().toLowerCase(); render();});
  board.querySelector('[data-clear]').addEventListener('click', () => {search.value = ''; state.query = ''; render(); search.focus();});
  board.querySelector('[data-csv]').addEventListener('click', () => {
    const cols = displayColumns;
    const rawNpe = data.levels;
    const header = ['Model', 'Training', `Rank by ${state.level} ${state.metric}`,
      ...cols.map(({level, col}) => `${level} ${col.suiteCode} ${col.label}`), ...rawNpe.map(level => `${level} SC NPE (raw)`)];
    const records = displayed.map(row => [row.model, data.training[row.training], row.rank,
      ...cols.map(({level, col}) => row.levels[level][col.id].display), ...rawNpe.map(level => row.levels[level].SC_NPE.value)]);
    const csv = [header, ...records].map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], {type: 'text/csv;charset=utf-8'}));
    const link = document.createElement('a'); link.href = url; link.download = `WorldDojo-all-suites-${state.level}-${state.metric}.csv`; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  renderHeader(); render();
})();
