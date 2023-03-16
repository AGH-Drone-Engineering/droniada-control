export default function setupCSS() {
  let container = document.getElementsByTagName('main');
  const header = document.getElementById('header');
  const tabs = document.getElementsByClassName('react-tabs__tab-list');

  if (container === undefined || container.length <= 0 || header === undefined) { return; }

  const tabSize = tabs[0] !== undefined ? tabs[0].clientHeight + 35 : 0;
  container = container[0];
  console.log(header);
  container.style.setProperty('--header-height', `${header.clientHeight + tabSize}px`);
}
