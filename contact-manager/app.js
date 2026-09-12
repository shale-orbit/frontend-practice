const form = document.querySelector('#contact-form');
const nameInput = document.querySelector('#name');
const phoneInput = document.querySelector('#phone');
const emailInput = document.querySelector('#email');
const submitBtn = document.querySelector('#submit-btn');
const cancelBtn = document.querySelector('#cancel-btn');
const formTitle = document.querySelector('#form-title');
const tip = document.querySelector('#tip');
const list = document.querySelector('#contact-list');

let editIndex = -1;                              // -1=新增，其他=正在编辑的下标
let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');

const save = () => localStorage.setItem('contacts', JSON.stringify(contacts));

// 渲染：根据 contacts 数组重画表格
const render = () => {
  list.innerHTML = '';
  if (contacts.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 4;
    td.className = 'empty';
    td.textContent = '暂无联系人';
    tr.appendChild(td);
    list.appendChild(tr);
    return;
  }
  contacts.forEach((c, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${c.name}</td>
      <td>${c.phone}</td>
      <td>${c.email}</td>
      <td class="actions">
        <button data-i="${i}" class="edit-btn">修改</button>
        <button data-i="${i}" class="del-btn">删除</button>
      </td>
    `;
    list.appendChild(tr);
  });
};

// 第二步再实现增删改，先占位避免按钮点击报错
list.addEventListener('click', () => {});
form.addEventListener('submit', (e) => e.preventDefault());

render();