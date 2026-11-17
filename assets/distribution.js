/* Paper Figure 2A. Counts are trajectories within each 200-example test level. */
(() => {
  const figure = document.getElementById('test-distribution');
  const realFigure = document.getElementById('real-distribution');
  const suites = [
    ['OG', ['Task-unrelated objects', 'Task-related objects'], [[100, 100], [100, 100], [100, 100]]],
    ['SC', ['Viewpoint changes', 'Single-object motion', 'Multi-step spatial updates'], [[200], [0, 200], [0, 0, 200]]],
    ['HM', ['Arm occlusion', 'Carried-object occlusion', 'Out-of-view objects', 'Container occlusion'], [[60, 40, 100], [50, 50, 100], [0, 0, 100, 100]]],
    ['CR', ['Factual baseline', 'Counterfactual interventions'], [[100, 100], [67, 133], [50, 150]]]
  ];
  const names = Object.fromEntries(window.WORLDDOJO_CONTENT.suites.map(suite => [suite.id, suite.name]));

  function point(radius, degrees) {
    const angle = (degrees - 90) * Math.PI / 180;
    return [220 + radius * Math.cos(angle), 220 + radius * Math.sin(angle)];
  }
  function node(tag, attributes) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [name, value] of Object.entries(attributes)) el.setAttribute(name, value);
    return el;
  }
  function segment(chart, suite, start, end, inner, outer, label, description, band) {
    const svg = chart.querySelector('svg');
    const detail = chart.querySelector('.distribution-detail');
    const idleText = detail.textContent;
    const mid = (start + end) / 2;
    const group = node('g', {tabindex: '0', role: 'img', 'aria-label': description, class: 'segment ' + band, 'data-group': suite});
    const path = node('path', {d: [
      'M', point(outer, start), 'A', outer, outer, 0, 0, 1, point(outer, end),
      'L', point(inner, end), 'A', inner, inner, 0, 0, 0, point(inner, start), 'Z'
    ].join(' ')});
    const [x, y] = point((inner + outer) / 2, mid);
    const rotation = band === 'mode' ? (mid > 180 ? mid - 270 : mid - 90) : 0;
    const text = node('text', {x, y, transform: 'rotate(' + rotation + ' ' + x + ' ' + y + ')', 'aria-hidden': 'true'});
    if (Array.isArray(label)) {
      label.forEach((line, index) => {
        const span = node('tspan', {x, dy: index ? '1.12em' : '-0.52em'});
        span.textContent = line;
        text.append(span);
      });
    } else {
      text.textContent = label;
    }
    group.append(path, text);
    const describe = () => {detail.textContent = description;};
    group.addEventListener('pointerenter', describe);
    group.addEventListener('focus', describe);
    group.addEventListener('pointerleave', () => {if (document.activeElement !== group) detail.textContent = idleText;});
    group.addEventListener('blur', () => {detail.textContent = idleText;});
    svg.append(group);
  }
  suites.forEach(([suite, modes, levels], index) => {
    const base = 90 * index;
    segment(figure, suite, base, base + 90, 48, 96, suite, names[suite] + ' · 600 of 2,400 test trajectories (25%)', 'suite');
    levels.forEach((counts, level) => {
      const start = base + 30 * level;
      const prefix = names[suite] + ' · L' + level;
      segment(figure, suite, start, start + 30, 96, 142, 'L' + level, prefix + ' · 200 test trajectories', 'level');
      let angle = start;
      counts.forEach((count, mode) => {
        if (!count) return;
        const end = angle + 30 * count / 200;
        const code = suite + '0' + (mode + 1);
        segment(figure, suite, angle, end, 142, 208, code, prefix + ' · ' + code + ' ' + modes[mode] + ' · ' + count + ' of 200 (' + count / 2 + '%)', 'mode');
        angle = end;
      });
    });
  });

  // Official (non-reserve) gallery episodes, snapshot of 2026-11-16.
  const realLevelCounts = [160, 160, 80];
  const suiteTotal = realLevelCounts.reduce((sum, count) => sum + count);
  suites.forEach(([suite], index) => {
    const base = index * 90;
    segment(realFigure, suite, base, base + 90, 49, 119, suite,
      names[suite] + ' · ' + suiteTotal + ' real-world trajectories', 'suite');
    let angle = base;
    realLevelCounts.forEach((count, level) => {
      const end = angle + 90 * count / suiteTotal;
      const label = 'L' + level;
      segment(realFigure, suite, angle, end, 119, 208, [label, count],
        names[suite] + ' · ' + label + ' · ' + count + ' real-world trajectories', 'level');
      angle = end;
    });
  });
})();
