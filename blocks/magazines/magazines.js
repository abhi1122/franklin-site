import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

function createPageing(totalPage) {
  const mainDiv = document.createElement('div');
  let anchor = document.createElement('a');
  anchor.innerHTML = '&laquo;';
  mainDiv.append(anchor);
  mainDiv.classList.add('pagination');
  for (let i = 1; i <= totalPage; i++) {
    const anchor2 = document.createElement('a');
    anchor2.innerHTML = i;
    mainDiv.append(anchor2);
  }
  anchor = document.createElement('a');
  anchor.innerHTML = '&raquo;';
  mainDiv.append(anchor);
  return mainDiv;
}

export default async function decorate(block) {
  const ul = document.createElement('ul');
  const li = document.createElement('li');
  const resp = await fetch('/magazines/magazines.json');
  const json = await resp.json();
  console.log(json);
  json.data.forEach((row) => {
    const img = document.createElement('img');
    img.src = row.Image;
    const h2 = document.createElement('h4');
    h2.innerHTML = row.Name;
    const p = document.createElement('p');
    p.innerHTML = row.Details;
    li.append(img);
    li.append(h2);
    li.append(p);
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '300' }])));
  block.append(ul);
  block.append(createPageing(json.total));
}
