// 监听来自background的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkWebsite') {
    // 如果不是政府网站，显示警告
    if (!request.isGovernment) {
      showWarning();
    }
  }
});

// 显示警告窗口
function showWarning() {
  // 检查是否已经显示过警告（避免重复）
  if (document.getElementById('gov-check-warning')) {
    return;
  }

  // 创建警告弹窗
  const warningDiv = document.createElement('div');
  warningDiv.id = 'gov-check-warning';
  warningDiv.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Microsoft YaHei', sans-serif;
    ">
      <div style="
        background: white;
        border-radius: 16px;
        padding: 32px;
        max-width: 400px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        text-align: center;
      ">
        <div style="
          font-size: 64px;
          margin-bottom: 16px;
        ">⚠️</div>
        <h2 style="
          color: #e74c3c;
          font-size: 24px;
          margin-bottom: 16px;
          font-weight: 600;
        ">警告：非政府网站</h2>
        <p style="
          color: #555;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 24px;
        ">
          您当前访问的网站<strong>不是官方政府网站</strong>。<br>
          请谨慎核实网站信息的真实性。
        </p>
        <p style="
          color: #888;
          font-size: 14px;
          margin-bottom: 24px;
        ">
          政府网站通常使用 .gov、.gov.cn 等官方域名
        </p>
        <button id="gov-check-close-btn" style="
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 12px 32px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        ">
          我知道了
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(warningDiv);

  // 关闭按钮事件
  const closeBtn = document.getElementById('gov-check-close-btn');
  closeBtn.addEventListener('click', () => {
    warningDiv.remove();
  });

  // 点击遮罩层也可以关闭
  warningDiv.addEventListener('click', (e) => {
    if (e.target === warningDiv) {
      warningDiv.remove();
    }
  });

  // 按钮悬停效果
  closeBtn.addEventListener('mouseenter', () => {
    closeBtn.style.transform = 'scale(1.05)';
  });

  closeBtn.addEventListener('mouseleave', () => {
    closeBtn.style.transform = 'scale(1)';
  });
}
