document.addEventListener('DOMContentLoaded', function() {
  const captureFullBtn = document.getElementById('captureFullBtn');
  const captureAreaBtn = document.getElementById('captureAreaBtn');
  const statusDiv = document.getElementById('status');

  // 完整页面截图
  captureFullBtn.addEventListener('click', async function() {
    await captureScreenshot('fullPage');
  });

  // 区域选择截图
  captureAreaBtn.addEventListener('click', async function() {
    await captureScreenshot('selectArea');
  });

  async function captureScreenshot(mode) {
    try {
      // 禁用按钮并显示状态
      captureFullBtn.disabled = true;
      captureAreaBtn.disabled = true;

      const statusText = mode === 'fullPage' ? 'Capturing full page...' : 'Select area on page...';
      showStatus(statusText, 'info');

      // 获取当前活动标签页
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      // 确保content script已注入
      await ensureContentScriptLoaded(tab.id);

      // 发送消息到content script开始截图
      chrome.tabs.sendMessage(tab.id, {
        action: mode === 'fullPage' ? 'captureFullPage' : 'captureArea'
      }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error:', chrome.runtime.lastError);
          showStatus('Error: ' + chrome.runtime.lastError.message, 'error');
          resetButtons();
          return;
        }

        if (response && response.success) {
          if (mode === 'selectArea' && !response.completed) {
            // 区域选择模式下,等待用户选择
            showStatus('Draw rectangle on page...', 'info');
          } else {
            showStatus('Screenshot saved successfully!', 'success');
            setTimeout(() => {
              resetButtons();
              statusDiv.style.display = 'none';
            }, 2000);
          }
        } else {
          showStatus('Failed to capture screenshot', 'error');
          resetButtons();
        }
      });
    } catch (error) {
      console.error('Capture error:', error);
      showStatus('Error: ' + error.message, 'error');
      resetButtons();
    }
  }

  async function ensureContentScriptLoaded(tabId) {
    try {
      // 尝试ping content script
      const response = await chrome.tabs.sendMessage(tabId, { action: 'ping' });
      if (response && response.pong) {
        return; // Content script已加载
      }
    } catch (error) {
      // Content script未加载,需要注入
      console.log('Injecting content script...');
    }

    // 注入content script
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    });

    // 注入CSS
    await chrome.scripting.insertCSS({
      target: { tabId: tabId },
      files: ['content.css']
    });

    // 等待脚本初始化
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  function resetButtons() {
    captureFullBtn.disabled = false;
    captureAreaBtn.disabled = false;
  }

  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = type;
  }
});
