const form = document.querySelector('#add-form');
const input = document.querySelector('#task-input');
const tip = document.querySelector('#tip');
const list = document.querySelector('#task-list');
const filters = document.querySelector('.filters');
let currentFilter = 'all'; // all / active / done
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
const save = () => localStorage.setItem('tasks', JSON.stringify(tasks));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text === '') {
    tip.textContent = '任务名不能为空';
    return;
  }
  tasks.push({ text: text, done: false });
  save();        
  tip.textContent = '';
  input.value = '';
  render();
});

list.addEventListener('click', (e) => {
  const li = e.target.closest('.task-item');
  if (!li) return;
  const index = Number(li.dataset.index);   
  if (e.target.classList.contains('del')) {
    tasks.splice(index, 1);   
  } else {
    tasks[index].done = !tasks[index].done;  
  }
  save();
  render();
});

const render = () => {
  list.innerHTML = '';
  const shown = tasks
    .map((t, i) => ({ task: t, index: i }))
    .filter(({ task }) =>
      currentFilter === 'all' ? true :
      currentFilter === 'active' ? !task.done : task.done
    );
  if (shown.length === 0) {
    const li = document.createElement('li');
    li.className = 'list-group-item text-muted';
    li.textContent = '没有符合条件的任务';
    list.appendChild(li);
    return;
  }
  shown.forEach(({ task, index }) => {
    const li = document.createElement('li');
    li.className = 'list-group-item task-item';
    li.dataset.index = index;   
    if (task.done) li.classList.add('done');
    li.textContent = task.text;
    const del = document.createElement('span');
    del.className = 'del';
    del.setAttribute('aria-label', '删除任务');
    li.appendChild(del);
    list.appendChild(li);
  });
};

filters.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  currentFilter = e.target.dataset.filter;   
  filters.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === e.target));
  render();
});

render();