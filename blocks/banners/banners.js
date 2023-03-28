import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  const bannerMainDiv = document.createElement('div');
  bannerMainDiv.className = 'banners-main';
  const bannerChildDiv = document.createElement('div');

  [...block.children].forEach((row) => {
    bannerChildDiv.innerHTML = row.innerHTML;
    [...bannerChildDiv.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'banners-banner-image';
      else div.className = 'banners-banner-body';
    });
  });
  bannerChildDiv.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: 'auto' }])));
  bannerMainDiv.append(bannerChildDiv);
  block.textContent = '';
  block.append(bannerMainDiv);
}
