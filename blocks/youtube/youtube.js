export default function decorate(block) {
  const youtubeMainDiv = document.createElement('div');
  const ifrm = document.createElement('iframe');
  ifrm.setAttribute('class', 'youtube');
  ifrm.setAttribute('allow', 'encrypted-media; accelerometer; gyroscope; picture-in-picture');
  ifrm.setAttribute('scrolling', 'no');
  [...block.children].forEach((src) => {
    ifrm.setAttribute('src', `https://www.youtube.com/embed/${src.innerText.trim()}`);
    src.innerText='';
  });
  youtubeMainDiv.append(ifrm);
  block.append(youtubeMainDiv);
}
