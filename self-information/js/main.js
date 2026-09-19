const loadData = async () => {
  try {
    const response = await fetch('data/data.json');
    if (!response.ok) {
      throw new Error('HTTP 状态码 ' + response.status);
    }
    const data = await response.json();

    const tagBox = document.querySelector('#tag-box');
    tagBox.innerHTML = '';
    if (data.profile.tags.length === 0) {
      tagBox.innerHTML = '<span class="text-muted">暂无标签</span>';
    } else {
      data.profile.tags.forEach(tag => {
        tagBox.innerHTML += `<span class="badge tag-badge me-1 mb-1">${tag}</span>`;
      });
    }
  } catch (error) {
    console.error('data.json 加载失败：', error);
  }
};

loadData();