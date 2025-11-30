// 获取DOM元素
const toggleSwitch = document.getElementById('toggleSwitch');
const statusText = document.getElementById('status');

// 更新状态显示
function updateStatus(enabled) {
  statusText.textContent = enabled ? '✅ 已启用' : '❌ 已关闭';
}

// 加载当前状态
chrome.runtime.sendMessage({ action: 'getStatus' }, (response) => {
  if (response) {
    toggleSwitch.checked = response.enabled;
    updateStatus(response.enabled);
  }
});

// 监听开关变化
toggleSwitch.addEventListener('change', (e) => {
  const enabled = e.target.checked;

  chrome.runtime.sendMessage({
    action: 'setStatus',
    enabled: enabled
  }, (response) => {
    if (response && response.success) {
      updateStatus(enabled);
    }
  });
});
