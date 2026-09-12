const form = document.querySelector('#contact-form');
const nameInput = document.querySelector('#name');
const phoneInput = document.querySelector('#phone');
const emailInput = document.querySelector('#email');
const submitBtn = document.querySelector('#submit-btn');
const cancelBtn = document.querySelector('#cancel-btn');
const formTitle = document.querySelector('#form-title');
const tip = document.querySelector('#tip');
const list = document.querySelector('#contact-list');

let editIndex = -1;
let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');

const save = () => localStorage.setItem('contacts', JSON.stringify(contacts));

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

list.addEventListener('click', () => {});   // 第三步实现删除/修改

// 表单提交：新增联系人 + 输入校验
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();

  if (name === '') { tip.textContent = '姓名不能为空'; return; }
  if (!/^1\d{10}$/.test(phone)) { tip.textContent = '请输入正确的11位手机号'; return; }
  if (!/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(email)) { tip.textContent = '邮箱格式不正确'; return; }

  // 先改数组，再存，再渲染
  contacts.push({ name, phone, email });
  save();
  form.reset();
  tip.textContent = '';
  render();
});

render();