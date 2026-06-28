const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbClose = document.getElementById('lb-close');
const lbFullscreen = document.getElementById('lb-fullscreen');
const images = document.querySelectorAll('.img-wrap img');

function openLightbox(src, alt) {
  lbImg.src = src;
  lbImg.alt = alt;
  lightbox.setAttribute('aria-hidden', 'false');
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.style.display = 'none';
  document.body.style.overflow = 'auto';
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

images.forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', function() {
    openLightbox(this.src, this.alt);
  });
});

lbClose.addEventListener('click', closeLightbox);

if (lbFullscreen) {
  lbFullscreen.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleFullscreen();
  });
}

lightbox.addEventListener('click', function(e) {
  if (e.target === this) {
    closeLightbox();
  }
});

document.addEventListener('keydown', function(e) {
  if (lightbox.style.display !== 'flex') return;
  if (e.key === 'Escape') {
    closeLightbox();
  }
  if (e.key === 'f' || e.key === 'F') {
    toggleFullscreen();
  }
});