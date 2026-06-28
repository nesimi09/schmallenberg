const images = [
  "../Bilder/Bilder/IMG_1266.jpeg",
  "../Bilder/Bilder/IMG_1267.jpeg",
  "../Bilder/Bilder/IMG_1321.jpeg",
  "../Bilder/Bilder/IMG_1608.jpeg",
  "../Bilder/Bilder/IMG_1715.jpeg",
  "../Bilder/Bilder/IMG_1755.jpeg",
  "../Bilder/Bilder/IMG_1756.jpeg",
  "../Bilder/Bilder/IMG_5144.jpeg",
  "../Bilder/Bilder/IMG_5145.jpeg",
  "../Bilder/Bilder/IMG_5146.jpeg",
  "../Bilder/Bilder/IMG_5147.jpeg",
  "../Bilder/Bilder/IMG_5148.jpeg",
  "../Bilder/Bilder/IMG_5180.jpeg",
  "../Bilder/Bilder/IMG_5205.jpeg",
  "../Bilder/Bilder/IMG_5206.jpeg",
  "../Bilder/Bilder/IMG_5209.jpeg",
  "../Bilder/Bilder/IMG_5215.jpeg",
  "../Bilder/Bilder/IMG_5220.jpeg",
  "../Bilder/Bilder/IMG_5222.jpeg",
  "../Bilder/Bilder/IMG_5250.jpeg",
  "../Bilder/Bilder/IMG_5873.jpeg",
  "../Bilder/Bilder/IMG_5877.jpeg",
  "../Bilder/Bilder/IMG_5879.jpeg",
  "../Bilder/Bilder/IMG_5881.jpeg",
  "../Bilder/Bilder/IMG_6063.jpeg",
  "../Bilder/Bilder/IMG_6079.jpeg",
  "../Bilder/Bilder/IMG_6099.jpeg",
  "../Bilder/Bilder/IMG_6117.jpeg",
  "../Bilder/Bilder/IMG_6118.jpeg",
  "../Bilder/Bilder/IMG_6121.jpeg",
  "../Bilder/Bilder/IMG_6122.jpeg",
  "../Bilder/Bilder/IMG_6123.jpeg",
  "../Bilder/Bilder/IMG_6124.jpeg",
  "../Bilder/Bilder/IMG_6125.jpeg",
  "../Bilder/Bilder/IMG_6126.jpeg",
  "../Bilder/Bilder/IMG_6127.jpeg",
  "../Bilder/Bilder/IMG_6130.jpeg",
  "../Bilder/Bilder/IMG_6131.jpeg",
  "../Bilder/Bilder/IMG_6132.jpeg",
  "../Bilder/Bilder/IMG_6133.jpeg",
  "../Bilder/Bilder/IMG_6134.jpeg",
  "../Bilder/Bilder/IMG_6135.jpeg",
  "../Bilder/Bilder/IMG_6136.jpeg",
  "../Bilder/Bilder/IMG_6137.jpeg",
  "../Bilder/Bilder/IMG_6138.jpeg",
  "../Bilder/Bilder/IMG_6139.jpeg",
  "../Bilder/Bilder/IMG_6140.jpeg",
  "../Bilder/Bilder/IMG_6141.jpeg",
  "../Bilder/Bilder/IMG_6142.jpeg",
  "../Bilder/Bilder/IMG_6143.jpeg",
  "../Bilder/Bilder/IMG_6145.jpeg",
  "../Bilder/Bilder/IMG_6146.jpeg",
  "../Bilder/Bilder/IMG_6147.jpeg",
  "../Bilder/Bilder/IMG_6148.jpeg",
  "../Bilder/Bilder/IMG_6150.jpeg",
  "../Bilder/Bilder/IMG_6151.jpeg",
  "../Bilder/Bilder/IMG_6152.jpeg",
  "../Bilder/Bilder/IMG_6187.jpeg",
  "../Bilder/Bilder/IMG_6598.jpeg",
  "../Bilder/Bilder/IMG_8071.jpeg"
];

const specificCaptions = {};

function generateCaption(src) {
  if (src.includes('IMG_')) return '';
  const invMatch = src.match(/\(Nr([0-9]+[a-zA-Z]*)\)/i);
  const inv = invMatch ? invMatch[1] : 'unbekannt';
  if (specificCaptions[inv]) return specificCaptions[inv];
  const yearMatch = src.match(/(19|20)\d{2}/);
  const year = yearMatch ? yearMatch[0] : 'unbekannt';
  return `Schmallenberg (${year})<br>Bildquelle: Stadtarchiv Schmallenberg (Inv-Nr ${inv})<br>Genehmigung zur Veröffentlichung März 2026`;
}

const gallery = document.getElementById('gallery');

images.forEach((src, i) => {
  const figure = document.createElement('figure');
  figure.className = 'gallery-item';

  const img = document.createElement('img');
  img.className = 'gallery-img';
  img.src = src;
  img.alt = `Schmallenberg 1984 – Bild ${i + 1}`;
  img.loading = 'lazy';

  const caption = generateCaption(src);

  figure.appendChild(img);

  if (caption) {
    const figcap = document.createElement('figcaption');
    figcap.className = 'gallery-caption';
    figcap.innerHTML = caption;
    figure.appendChild(figcap);
  }

  gallery.appendChild(figure);

  img.addEventListener('click', () => openLightbox(i));
});

const lightbox    = document.getElementById('lightbox');
const lbImg       = document.getElementById('lb-img');
const lbCap       = document.getElementById('lb-caption');
const lbClose     = document.getElementById('lb-close');
const lbFullscreen = document.getElementById('lb-fullscreen');
const lbPrev      = document.getElementById('lb-prev');
const lbNext      = document.getElementById('lb-next');
const lbPrevThumb = document.getElementById('lb-prev-thumb');
const lbNextThumb = document.getElementById('lb-next-thumb');

let currentIndex = 0;

function showImage(index) {
  
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;

  currentIndex = index;
  const src = images[currentIndex];

  lbImg.src = src;
  lbImg.alt = `Schmallenberg 1984 – Bild ${currentIndex + 1}`;
  lbCap.innerHTML = generateCaption(src);

  const prevIdx = (currentIndex - 1 + images.length) % images.length;
  const nextIdx = (currentIndex + 1) % images.length;
  lbPrevThumb.src = images[prevIdx];
  lbPrevThumb.alt = `Vorschau – Bild ${prevIdx + 1}`;
  lbNextThumb.src = images[nextIdx];
  lbNextThumb.alt = `Vorschau – Bild ${nextIdx + 1}`;
}

function openLightbox(index) {
  showImage(index);
  lightbox.style.display = 'flex';
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
  lightbox.style.display = 'none';
  lightbox.setAttribute('aria-hidden', 'true');
  lbImg.src = '';
}

function showNext() {
  showImage(currentIndex + 1);
}

function showPrev() {
  showImage(currentIndex - 1);
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    if (lightbox.requestFullscreen) {
      lightbox.requestFullscreen();
    } else if (lightbox.webkitRequestFullscreen) {
      lightbox.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

lbClose.addEventListener('click', closeLightbox);
lbFullscreen.addEventListener('click', e => { e.stopPropagation(); toggleFullscreen(); });
lbNext.addEventListener('click', e => { e.stopPropagation(); showNext(); });
lbPrev.addEventListener('click', e => { e.stopPropagation(); showPrev(); });
lbNextThumb.addEventListener('click', e => { e.stopPropagation(); showNext(); });
lbPrevThumb.addEventListener('click', e => { e.stopPropagation(); showPrev(); });

lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', e => {
  if (lightbox.style.display !== 'flex') return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft')  showPrev();
  if (e.key === 'f' || e.key === 'F') toggleFullscreen();
});

let touchStartX = 0;
let touchStartY = 0;

lightbox.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].clientX;
  touchStartY = e.changedTouches[0].clientY;
}, { passive: true });

lightbox.addEventListener('touchend', e => {
  const touchEndX = e.changedTouches[0].clientX;
  const touchEndY = e.changedTouches[0].clientY;
  const diffX = touchEndX - touchStartX;
  const diffY = touchEndY - touchStartY;

  if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX < 0) {
      showNext();
    } else {
      showPrev();
    }
  }
}, { passive: true });