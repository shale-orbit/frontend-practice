const rooms = [
    { id: 1, name: '第一自习室', floor: '1楼', open: true,  seats: 120 },
    { id: 2, name: '第二自习室', floor: '1楼', open: true,  seats: 80 },
    { id: 3, name: '第三自习室', floor: '2楼', open: false, seats: 60 },
    { id: 4, name: '第四自习室', floor: '2楼', open: true,  seats: 100 },
    { id: 5, name: '第五自习室', floor: '3楼', open: true,  seats: 90 },
    { id: 6, name: '第六自习室', floor: '3楼', open: false, seats: 50 },
];

const floorSelect = document.querySelector('#floor-filter');
const statusSelect = document.querySelector('#status-filter');
const list = document.querySelector('#room-list');
const countTip = document.querySelector('#result-count');

// 筛选 + 渲染
const render = () => {
    const floor = floorSelect.value;    // all / 1楼 / 2楼 / 3楼
    const status = statusSelect.value;  // all / open / closed

    const shown = rooms.filter(room => {
        const floorOk = floor === 'all' || room.floor === floor;
        const statusOk = status === 'all'
            || (status === 'open' && room.open)
            || (status === 'closed' && !room.open);
        return floorOk && statusOk;
    });

    list.innerHTML = '';
    countTip.textContent = `共找到 ${shown.length} 间自习室`;

    if (shown.length === 0) {
        list.innerHTML = '<p class="text-muted text-center py-4 w-100">没有符合条件的自习室</p>';
        return;
    }

    shown.forEach(room => {
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4';
        card.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <h5 class="card-title">${room.name}</h5>
                        <span class="badge ${room.open ? 'bg-success' : 'bg-secondary'}">
                            ${room.open ? '开放中' : '已关闭'}
                        </span>
                    </div>
                    <p class="card-text text-muted mb-1">楼层：${room.floor}</p>
                    <p class="card-text text-muted mb-0">座位数：${room.seats} 个</p>
                </div>
            </div>`;
        list.appendChild(card);
    });
};

// 筛选即时生效：任一下拉变化都重新渲染（检查点2）
floorSelect.addEventListener('change', render);
statusSelect.addEventListener('change', render);

render();