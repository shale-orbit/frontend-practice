const state = { data: null, currentCity: 0 };

// 数据加载：处理加载中 / 失败 / 空数据三种状态
const loadData = async () => {
  $('#status').text('加载中...').show();
  try {
    const response = await fetch('data/weather.json');
    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }
    const data = await response.json();
    if (!data.cities || data.cities.length === 0) {
      $('#status').text('暂无数据').show();
      return;
    }
    state.data = data;
    $('#sub-title').text(data.title + ' · ' + data.source);
    $('#status').hide();
    renderCitySwitcher(data);
    renderCards(data);
    renderBarChart(data);
    renderLineChart(data, state.currentCity);
  } catch (error) {
    $('#status').text('加载失败：' + error.message).show();
  }
};

// jQuery 交互：城市切换按钮
const renderCitySwitcher = (data) => {
  const $switcher = $('#city-switcher').empty();
  data.cities.forEach((city, index) => {
    const active = index === state.currentCity ? 'active' : '';
    $switcher.append(`
      <button type="button" class="btn btn-outline-primary ${active}" data-city-index="${index}">
        ${city.name}
      </button>
    `);
  });
};

// 统计卡片
const renderCards = (data) => {
  $('#cards').empty();
  data.cities.forEach(city => {
    const avgTemp = (city.temps.reduce((s, n) => s + n, 0) / city.temps.length).toFixed(1);
    const totalRain = city.rainfalls.reduce((s, n) => s + n, 0);
    const avgHumidity = (city.humidity.reduce((s, n) => s + n, 0) / city.humidity.length).toFixed(0);
    $('#cards').append(`
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title h6">${city.name}</h3>
            <p class="card-text fs-4">${avgTemp}℃</p>
            <p class="card-text small text-muted">周均温 / 累计降水 ${totalRain}mm / 周均湿 ${avgHumidity}%</p>
          </div>
        </div>
      </div>
    `);
  });
};

// ECharts 柱状图：两城市每天降水量对比
let barChart = null;
const renderBarChart = (data) => {
  if (barChart === null) {
    barChart = echarts.init(document.querySelector('#bar-chart'));
  }
  barChart.setOption({
    title: { text: '成都 vs 昆明 日降水量', left: 'center' },
    tooltip: { trigger: 'axis' },
    legend: { bottom: 0 },
    xAxis: { type: 'category', data: data.dates },
    yAxis: { type: 'value', name: 'mm', min: 0 },
    series: data.cities.map(city => ({
      name: city.name,
      type: 'bar',
      data: city.rainfalls
    }))
  });
};

// Chart.js 折线图：当前选中城市的温度趋势
let lineChart = null;
const renderLineChart = (data, cityIndex) => {
  if (lineChart !== null) {
    lineChart.destroy();   // 防重复初始化
  }
  const city = data.cities[cityIndex];
  const ctx = document.querySelector('#line-chart');
  lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.dates,
      datasets: [{
        label: city.name + ' 温度',
        data: city.temps,
        borderWidth: 2,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: true, text: city.name + ' 一周温度变化（℃）' }
      },
      scales: {
        y: { beginAtZero: false }   // 温度不需要从0开始
      }
    }
  });
};

// 事件委托：按钮点击后切换当前城市并重绘折线图
$('#city-switcher').on('click', 'button', function () {
  state.currentCity = parseInt($(this).attr('data-city-index'));
  $('#city-switcher button').removeClass('active');
  $(this).addClass('active');
  renderLineChart(state.data, state.currentCity);
});

// 统一 resize：ECharts 需手动重绘，Chart.js 默认自动响应
window.addEventListener('resize', () => {
  if (barChart) barChart.resize();
});

loadData();
