/* Keep native selects as data sources and use the same dropdown throughout the site. */
document.querySelectorAll('select').forEach((select, index) => {
  const isSuite = select.hasAttribute('data-board-suite');
  const id = `select-picker-${index}`;
  const label = select.parentElement.querySelector('.control-label');
  const picker = document.createElement('div'); picker.className = 'select-picker';
  const trigger = document.createElement('button'); trigger.type = 'button'; trigger.className = 'select-picker-trigger';
  trigger.setAttribute('aria-haspopup', 'listbox'); trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', `${id}-options`);
  trigger.setAttribute('aria-labelledby', `${label.id} ${id}-value`);
  const selectedName = document.createElement('span'); selectedName.id = `${id}-value`; selectedName.className = 'select-picker-value';
  if (isSuite) {
    const swatch = document.createElement('span'); swatch.className = 'select-picker-swatch'; swatch.setAttribute('aria-hidden', 'true');
    trigger.append(swatch);
  }
  const chevron = document.createElement('span'); chevron.className = 'select-picker-chevron'; chevron.setAttribute('aria-hidden', 'true');
  trigger.append(selectedName, chevron);
  const menu = document.createElement('ul'); menu.id = `${id}-options`; menu.className = 'select-picker-menu'; menu.hidden = true;
  menu.setAttribute('role', 'listbox'); menu.setAttribute('aria-labelledby', label.id);
  const options = [...select.options].map(option => {
    const item = document.createElement('li'); item.setAttribute('role', 'option'); item.tabIndex = -1;
    item.dataset.value = option.value; item.id = `${id}-${option.value}`;
    if (isSuite) {
      item.dataset.suite = option.value;
      const code = document.createElement('span'); code.className = 'select-picker-code'; code.textContent = option.value; code.setAttribute('aria-hidden', 'true');
      item.append(code);
    }
    const name = document.createElement('span'); name.className = 'select-picker-name'; name.textContent = option.textContent;
    const check = document.createElement('span'); check.className = 'select-picker-check'; check.textContent = '✓'; check.setAttribute('aria-hidden', 'true');
    item.append(name, check);
    item.addEventListener('click', () => choose(item)); menu.append(item);
    return item;
  });
  picker.append(trigger, menu); select.after(picker); select.hidden = true;
  function sync() {
    selectedName.textContent = select.selectedOptions[0].textContent;
    if (isSuite) trigger.dataset.suite = select.value;
    options.forEach(item => item.setAttribute('aria-selected', String(item.dataset.value === select.value)));
  }
  function close(restoreFocus = false) {
    menu.hidden = true; trigger.setAttribute('aria-expanded', 'false');
    options.forEach(item => item.tabIndex = -1);
    if (restoreFocus) trigger.focus({preventScroll: true});
  }
  function focusOption(index) {
    options.forEach((item, i) => item.tabIndex = i === index ? 0 : -1);
    options[index].focus({preventScroll: true}); options[index].scrollIntoView({block: 'nearest'});
  }
  function open() {
    menu.hidden = false; trigger.setAttribute('aria-expanded', 'true');
    const rect = trigger.getBoundingClientRect();
    picker.classList.toggle('opens-up', innerHeight - rect.bottom < menu.offsetHeight + 12 && rect.top > menu.offsetHeight + 68);
    focusOption(select.selectedIndex);
  }
  function choose(item) {
    select.value = item.dataset.value;
    select.dispatchEvent(new Event('change', {bubbles: true}));
    close(true);
  }
  trigger.addEventListener('click', () => menu.hidden ? open() : close());
  trigger.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {event.preventDefault(); open();}
  });
  menu.addEventListener('keydown', event => {
    const index = options.indexOf(document.activeElement);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); focusOption((index + (event.key === 'ArrowDown' ? 1 : options.length - 1)) % options.length);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault(); focusOption(event.key === 'Home' ? 0 : options.length - 1);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); if (index >= 0) choose(options[index]);
    } else if (event.key === 'Tab') {
      close(true);
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const next = options.findIndex(item => item.querySelector('.select-picker-name').textContent.toLowerCase().startsWith(event.key.toLowerCase()));
      if (next >= 0) {event.preventDefault(); focusOption(next);}
    }
  });
  picker.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) {
      event.preventDefault(); event.stopPropagation(); close(true);
    }
  });
  select.addEventListener('change', sync);
  select.addEventListener('picker:sync', sync);
  document.addEventListener('pointerdown', event => {if (!picker.contains(event.target)) close();});
  picker.addEventListener('focusout', event => {if (!picker.contains(event.relatedTarget)) close();});
  window.addEventListener('resize', () => close());
  sync();
});
