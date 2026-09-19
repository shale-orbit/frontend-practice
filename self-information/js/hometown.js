const cardHTML = (item) => {
  return `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card h-100 shadow-sm">
        <img src="${item.img}" alt="${item.name}" class="card-img-top">
        <div class="card-body">
          <h3 class="h5 text-success">${item.name}</h3>
          <p class="mb-0">${item.desc}</p>
        </div>
      </div>
    </div>`;
};

const renderCards = (list, boxEl, tipEl) => {
  boxEl.innerHTML = '';
  if (list.length === 0) {
    tipEl.classList.remove('d-none');
    return;
  }
  tipEl.classList.add('d-none');
  list.forEach(item => {
    boxEl.innerHTML += cardHTML(item);
  });
};

const loadData = async () => {
  try {
    const response = await fetch('data/data.json');
    if (!response.ok) {
      throw new Error('HTTP 状态码 ' + response.status);
    }
    const data = await response.json();
    document.querySelector('#hero-city').textContent = data.hometown.city;
    document.querySelector('#hero-slogan').textContent = data.hometown.slogan;
    renderCards(data.hometown.sights,
      document.querySelector('#sight-list'),
      document.querySelector('#sight-tip'));
    renderCards(data.hometown.foods,
      document.querySelector('#food-list'),
      document.querySelector('#food-tip'));
  } catch (error) {
    document.querySelector('#data-error').classList.remove('d-none');
    console.error('data.json 加载失败：', error);
  }
};

loadData();