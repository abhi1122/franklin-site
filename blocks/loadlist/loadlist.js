export default async function decorate(block) {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  console.log(params);
  const { limit = 5, offset = 0, page = 1 } = params || {};
  const resp = await fetch(`/adventures.json?limit=${limit}&offset=${offset}`);
  const json = await resp.json();
  console.log(json);
  const h4 = document.createElement('h4');
  h4.innerHTML = `Page ${page}`;
  const ul = document.createElement('ul');
  json.data.forEach((row) => {
    const li = document.createElement('li');
    const h2 = document.createElement('h5');
    h2.innerHTML = row.Name;
    const p = document.createElement('p');
    p.innerHTML = `ID : ${row.Details}`;
    li.append(h2);
    li.append(p);
    ul.append(li);
  });
  block.textContent = '';
  block.append(h4);
  block.append(ul);
  block.append(createPageing(json, page));
}

function createPageing({ total, offset, limit }, page=1) {
  const mainDiv = document.createElement('div');
  // let anchor = document.createElement('a');
  // anchor.innerHTML = '&laquo;';
  const totalPage = (total / limit);
  // let nextPage=page;
  // if(page === 1){
  //   nextPage=totalPage;
  // }else{
  //   nextPage=nextPage-1;
  // }
  // anchor.href=`/day5?limit=${limit}&offset=${nextPage*limit}&page=${nextPage}`;
  // mainDiv.append(anchor);
  mainDiv.classList.add('pagination');
  for (let i = 0; i < totalPage; i++) {
    const anchor2 = document.createElement('a');
    anchor2.innerHTML = i + 1;
    anchor2.href = `/day5?limit=${limit}&offset=${i * limit}&page=${i + 1}`;
    if(page==(i + 1)){
      anchor2.className = 'active';
    }
    mainDiv.append(anchor2);
  }
  // anchor = document.createElement('a');
  // anchor.innerHTML = '&raquo;';
  // anchor.href=`/day5?limit=${limit}&offset=${page*limit}&page=${page+1}`;
  // mainDiv.append(anchor);
  return mainDiv;
}
