import L from 'leaflet';

// Domyślna (generic)
const crosshairIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/crosshair.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0]
});

// Rurociąg
const qrCodeIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/qrcode.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0]
});

const faultIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/siren.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0]
});

const hatIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/hat.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0]
});

const barrelIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/barrel.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0]
});

// Intruz:
const bagIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/bag.png',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, 0]
});

const intruderIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/intruder.png',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, 0]
});

// Drzewo życia:
const brownIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/brown.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0]
});

const goldIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/gold.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0]
});

const whiteIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/white.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0]
});

const beigeIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/beige.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0]
});

const nameMap = { white: 'zdrowe', brown: 'podatne', gold: 'parch', beige: 'mączniak', bag: 'torba z ładunkiem', qr: 'QR', generic: 'Inne' };
const icons = { generic: crosshairIcon, fail: faultIcon, qr: qrCodeIcon, hat: hatIcon, bag: bagIcon, bomb: bagIcon, intruder: intruderIcon, brown: brownIcon, gold: goldIcon, beige: beigeIcon, white: whiteIcon, barrel: barrelIcon };

function getType(point) {
  return ('type' in point && point.type in icons) ? point.type : 'generic';
}

function getIcon(point) {
  return icons[getType(point)];
}

function mapType(type) {
  const out = type in nameMap ? nameMap[type] : type;
  return out.charAt(0).toUpperCase() + out.slice(1);
}

export { getType, getIcon, mapType };

// For debugging in Chrome dev tools:
window.getType = getType;
window.getIcon = getIcon;
