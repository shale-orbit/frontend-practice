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

// 事件委托：点删除/修改按钮
list.addEventListener('click', (e) => {
  const i = +e.target.dataset.i;
  if (e.target.classList.contains('del-btn')) {
    if (confirm('确定删除吗？')) {
      contacts.splice(i, 1);          // 改数组
      save();                         // 存
      render();                       // 渲染
    }
  }
  if (e.target.classList.contains('edit-btn')) {
    editIndex = i;
    const c = contacts[i];
    nameInput.value = c.name;
    phoneInput.value = c.phone;
    emailInput.value = c.email;
    formTitle.textContent = '修改联系人';
    submitBtn.textContent = '保存';
    cancelBtn.style.display = '';
    tip.textContent = '';
  }
});

// 取消编辑
cancelBtn.addEventListener('click', () => {
  editIndex = -1;
  form.reset();
  formTitle.textContent = '添加联系人';
  submitBtn.textContent = '添加';
  cancelBtn.style.display = 'none';
  tip.textContent = '';
});

// 表单提交：根据 editIndex 判断新增还是修改
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();

  if (name === '') { tip.textContent = '姓名不能为空'; return; }
  if (!/^1\d{10}$/.test(phone)) { tip.textContent = '请输入正确的11位手机号'; return; }
  if (!/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(email)) { tip.textContent = '邮箱格式不正确'; return; }

  if (editIndex === -1) {
    contacts.push({ name, phone, email });       // 新增
  } else {
    contacts[editIndex] = { name, phone, email }; // 修改
    editIndex = -1;
    formTitle.textContent = '添加联系人';
    submitBtn.textContent = '添加';
    cancelBtn.style.display = 'none';
  }
  save();
  form.reset();
  tip.textContent = '';
  render();
});

render();