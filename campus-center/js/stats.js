const statusEl = document.querySelector('#status');
const sourceEl = document.querySelector('#data-source');
let chart = null;

const renderChart = (data) => {
    if (chart === null) {
        chart = echarts.init(document.querySelector('#usage-chart'));
    }
    chart.setOption({
        title: { text: data.title, left: 'center' },
        tooltip: { trigger: 'axis' },
        grid: { top: 70, bottom: 50, left: 60, right: 30 },
        xAxis: {
            type: 'category',
            data: data.rooms,
            axisLabel: { interval: 0 }
        },
        yAxis: {
            type: 'value',
            name: data.unit || '人次',   // 单位：检查点2要求
            min: 0                      // 柱状图y轴必须从0开始
        },
        series: [{
            name: '使用量',
            type: 'bar',
            data: data.values,
            itemStyle: { color: '#0e69beff' },  
            barWidth: '45%'
        }]
    });
};

const loadData = async () => {
    statusEl.textContent = '数据加载中...';
    statusEl.className = 'alert alert-info';
    try {
        const response = await fetch('data/data.json');
        if (!response.ok) {
            throw new Error('HTTP ' + response.status);
        }
        const data = await response.json();
        statusEl.classList.add('d-none');
        sourceEl.textContent = '数据来源：' + data.source;  // 数据来源：检查点2要求
        renderChart(data);
    } catch (error) {
        // 断网或 data.json 丢失时提示，不能白屏（第三步"断网提示"自查项）
        statusEl.textContent = '数据加载失败，请检查网络或 data.json 是否存在（' + error.message + '）';
        statusEl.className = 'alert alert-warning';
        sourceEl.textContent = '数据来源：暂不可用';
    }
};

// 窗口缩放时 ECharts 需手动重绘
window.addEventListener('resize', () => {
    if (chart) chart.resize();
});

loadData();