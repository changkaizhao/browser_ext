// 监听来自popup的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'ping') {
    sendResponse({ pong: true });
    return true;
  }

  if (request.action === 'captureFullPage') {
    captureFullPageScreenshot().then(() => {
      sendResponse({ success: true, completed: true });
    }).catch((error) => {
      console.error('Screenshot failed:', error);
      sendResponse({ success: false, error: error.message });
    });
    return true;
  }

  if (request.action === 'captureArea') {
    startAreaSelection().then(() => {
      sendResponse({ success: true, completed: false });
    }).catch((error) => {
      console.error('Area selection failed:', error);
      sendResponse({ success: false, error: error.message });
    });
    return true;
  }
});

// 区域选择功能
async function startAreaSelection() {
  return new Promise((resolve, reject) => {
    // 创建覆盖层
    const overlay = document.createElement('div');
    overlay.id = 'screenshot-overlay';
    document.body.appendChild(overlay);

    // 设置覆盖层大小为整个文档大小
    const updateOverlaySize = () => {
      const fullWidth = Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
      );
      const fullHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
      );
      overlay.style.width = fullWidth + 'px';
      overlay.style.height = fullHeight + 'px';
    };
    updateOverlaySize();
    window.addEventListener('resize', updateOverlaySize);

    // 创建选择框
    const selectionBox = document.createElement('div');
    selectionBox.id = 'screenshot-selection-box';
    overlay.appendChild(selectionBox);

    // 创建尺寸提示
    const sizeInfo = document.createElement('div');
    sizeInfo.id = 'screenshot-size-info';
    overlay.appendChild(sizeInfo);

    // 创建操作提示
    const hint = document.createElement('div');
    hint.id = 'screenshot-hint';
    hint.textContent = 'Click and drag to select area • ESC to cancel';
    document.body.appendChild(hint);

    let startX, startY, isDrawing = false;
    let lastClientX = 0, lastClientY = 0; // 记录相对于视口的坐标
    let scrollInterval = null;
    const SCROLL_EDGE_THRESHOLD = 50; // 距离边缘多少像素开始滚动
    const SCROLL_SPEED = 10; // 每次滚动的像素数

    // 鼠标按下
    overlay.addEventListener('mousedown', (e) => {
      isDrawing = true;
      startX = e.pageX;
      startY = e.pageY;
      selectionBox.style.left = startX + 'px';
      selectionBox.style.top = startY + 'px';
      selectionBox.style.width = '0';
      selectionBox.style.height = '0';
      selectionBox.style.display = 'block';
      sizeInfo.style.display = 'none';
    });

    // 鼠标移动
    overlay.addEventListener('mousemove', (e) => {
      if (!isDrawing) return;

      lastClientX = e.clientX;
      lastClientY = e.clientY;

      updateSelection(e.pageX, e.pageY);
      handleAutoScroll(e.clientX, e.clientY);
    });

    function updateSelection(pageX, pageY) {
      const currentX = pageX;
      const currentY = pageY;

      const width = Math.abs(currentX - startX);
      const height = Math.abs(currentY - startY);
      const left = Math.min(startX, currentX);
      const top = Math.min(startY, currentY);

      selectionBox.style.left = left + 'px';
      selectionBox.style.top = top + 'px';
      selectionBox.style.width = width + 'px';
      selectionBox.style.height = height + 'px';

      // 显示尺寸
      sizeInfo.textContent = `${width} × ${height}`;
      sizeInfo.style.display = 'block';
      sizeInfo.style.left = (left + width + 10) + 'px';
      sizeInfo.style.top = top + 'px';

      // 自动滚动逻辑
      // handleAutoScroll is called in mousemove
    }

    // 处理自动滚动
    function handleAutoScroll(clientX, clientY) {
      // 清除现有的滚动定时器
      if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
      }

      let scrollX = 0;
      let scrollY = 0;

      // 检测是否靠近边缘
      if (clientX < SCROLL_EDGE_THRESHOLD) {
        scrollX = -SCROLL_SPEED;
      } else if (clientX > window.innerWidth - SCROLL_EDGE_THRESHOLD) {
        scrollX = SCROLL_SPEED;
      }

      if (clientY < SCROLL_EDGE_THRESHOLD) {
        scrollY = -SCROLL_SPEED;
      } else if (clientY > window.innerHeight - SCROLL_EDGE_THRESHOLD) {
        scrollY = SCROLL_SPEED;
      }

      // 如果需要滚动,启动定时器
      if (scrollX !== 0 || scrollY !== 0) {
        scrollInterval = setInterval(() => {
          window.scrollBy(scrollX, scrollY);
          // 滚动时更新选区
          const pageX = lastClientX + window.scrollX;
          const pageY = lastClientY + window.scrollY;
          updateSelection(pageX, pageY);
        }, 16); // 约60fps
      }
    }

    // 鼠标释放
    overlay.addEventListener('mouseup', async (e) => {
      if (!isDrawing) return;
      isDrawing = false;

      // 停止自动滚动
      if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
      }

      const currentX = e.pageX;
      const currentY = e.pageY;

      const width = Math.abs(currentX - startX);
      const height = Math.abs(currentY - startY);

      if (width < 10 || height < 10) {
        // 选择区域太小,取消
        cleanup();
        reject(new Error('Selection too small'));
        return;
      }

      const left = Math.min(startX, currentX);
      const top = Math.min(startY, currentY);

      // 截取选中区域
      try {
        await captureSelectedArea(left, top, width, height);
        cleanup();
        resolve();
      } catch (error) {
        cleanup();
        reject(error);
      }
    });

    // ESC键取消
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        cleanup();
        reject(new Error('Cancelled by user'));
      }
    };
    document.addEventListener('keydown', handleKeydown);

    function cleanup() {
      // 停止自动滚动
      if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
      }
      overlay.remove();
      hint.remove();
      window.removeEventListener('resize', updateOverlaySize);
      document.removeEventListener('keydown', handleKeydown);
    }
  });
}

// 截取选中区域
async function captureSelectedArea(left, top, width, height) {
  const dpr = window.devicePixelRatio || 1;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // 保存原始滚动位置
  const originalScrollX = window.scrollX;
  const originalScrollY = window.scrollY;

  // 隐藏覆盖层和提示
  const overlay = document.getElementById('screenshot-overlay');
  const hint = document.getElementById('screenshot-hint');
  if (overlay) overlay.style.display = 'none';
  if (hint) hint.style.display = 'none';

  // 隐藏滚动条 (使用CSS以保持可滚动性)
  hideScrollbars();

  try {
    // 计算选择区域的边界
    const selectionRight = left + width;
    const selectionBottom = top + height;

    // 检查是否需要多视口拼接
    const needsStitching =
      width > viewportWidth ||
      height > viewportHeight ||
      (left - originalScrollX < 0) ||
      (top - originalScrollY < 0) ||
      (selectionRight - originalScrollX > viewportWidth) ||
      (selectionBottom - originalScrollY > viewportHeight);

    if (!needsStitching) {
      // 简单情况:选区完全在当前视口内
      // 等待一小段时间确保UI更新
      await new Promise(resolve => setTimeout(resolve, 50));

      const dataUrl = await captureVisibleTab();
      const img = await loadImage(dataUrl);

      const canvas = document.createElement('canvas');
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);

      const sourceX = (left - originalScrollX) * dpr;
      const sourceY = (top - originalScrollY) * dpr;

      ctx.drawImage(
        img,
        sourceX, sourceY, width * dpr, height * dpr,
        0, 0, width, height
      );

      const screenshotDataUrl = canvas.toDataURL('image/png');
      downloadAreaScreenshot(screenshotDataUrl);
      return;
    }

    // 复杂情况:需要拼接多个视口
    const canvas = document.createElement('canvas');
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // 计算需要截取的行数和列数
    const rows = Math.ceil(height / viewportHeight);
    const cols = Math.ceil(width / viewportWidth);

    console.log(`Stitching ${rows}x${cols} screenshots for selection...`);

    // 逐块截图
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // 计算当前块在canvas中的位置
        const blockX = col * viewportWidth;
        const blockY = row * viewportHeight;

        // 计算需要滚动到的页面位置(选择区域的绝对位置 + 块偏移)
        const scrollToX = left + blockX;
        const scrollToY = top + blockY;

        // 滚动到目标位置
        window.scrollTo(scrollToX, scrollToY);

        // 等待渲染
        await new Promise(resolve => setTimeout(resolve, 150));

        // 截取当前视口
        const dataUrl = await captureVisibleTab();
        const img = await loadImage(dataUrl);

        // 计算当前块的实际大小
        const blockWidth = Math.min(viewportWidth, width - blockX);
        const blockHeight = Math.min(viewportHeight, height - blockY);

        // 计算从截图中裁剪的起始位置
        // 当滚动后,选择区域的左上角在视口中的位置
        const cropX = Math.max(0, left - window.scrollX) * dpr;
        const cropY = Math.max(0, top - window.scrollY) * dpr;

        // 绘制到canvas,裁剪掉不需要的部分
        ctx.drawImage(
          img,
          cropX, cropY, blockWidth * dpr, blockHeight * dpr,
          blockX, blockY, blockWidth, blockHeight
        );
      }
    }

    // 转换为blob并下载
    const screenshotDataUrl = canvas.toDataURL('image/png');
    downloadAreaScreenshot(screenshotDataUrl);

  } finally {
    // 恢复状态
    showScrollbars();
    window.scrollTo(originalScrollX, originalScrollY);
    if (overlay) overlay.style.display = '';
    if (hint) hint.style.display = '';
  }
}

// 辅助函数:下载区域截图
function downloadAreaScreenshot(dataUrl) {
  const hostname = window.location.hostname;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const filename = `${hostname}_area_${timestamp}.png`;

  chrome.runtime.sendMessage({
    action: 'downloadScreenshot',
    dataUrl: dataUrl,
    filename: filename
  });
}

// 完整页面截图
async function captureFullPageScreenshot() {
  const dpr = window.devicePixelRatio || 1;

  // 保存原始滚动位置
  const originalScrollX = window.scrollX;
  const originalScrollY = window.scrollY;

  try {
    // 隐藏滚动条
    hideScrollbars();

    // 获取页面完整尺寸
    const body = document.body;
    const html = document.documentElement;

    const fullWidth = Math.max(
      body.scrollWidth,
      body.offsetWidth,
      html.clientWidth,
      html.scrollWidth,
      html.offsetWidth
    );

    const fullHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    // 视口尺寸
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // 创建canvas (考虑DPI)
    const canvas = document.createElement('canvas');
    canvas.width = fullWidth * dpr;
    canvas.height = fullHeight * dpr;
    const ctx = canvas.getContext('2d');

    // 缩放上下文以匹配DPI
    ctx.scale(dpr, dpr);

    // 计算需要截取的行数和列数
    const rows = Math.ceil(fullHeight / viewportHeight);
    const cols = Math.ceil(fullWidth / viewportWidth);

    console.log(`Capturing ${rows}x${cols} screenshots...`);

    // 逐块截图
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * viewportWidth;
        const y = row * viewportHeight;

        // 滚动到目标位置
        window.scrollTo(x, y);

        // 等待渲染
        await new Promise(resolve => setTimeout(resolve, 150));

        // 截取当前视口
        const dataUrl = await captureVisibleTab();
        const img = await loadImage(dataUrl);

        // 计算实际需要绘制的区域
        const drawWidth = Math.min(viewportWidth, fullWidth - x);
        const drawHeight = Math.min(viewportHeight, fullHeight - y);

        // 绘制到canvas (源图像考虑DPI)
        ctx.drawImage(img, 0, 0, drawWidth * dpr, drawHeight * dpr, x, y, drawWidth, drawHeight);
      }
    }

    // 转换为blob并下载
    const fullDataUrl = canvas.toDataURL('image/png');

    // 生成文件名: 主域名 + 时间戳
    const hostname = window.location.hostname;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const filename = `${hostname}_${timestamp}.png`;

    // 发送到background script进行下载
    chrome.runtime.sendMessage({
      action: 'downloadScreenshot',
      dataUrl: fullDataUrl,
      filename: filename
    });

  } finally {
    // 恢复原始状态
    showScrollbars();
    window.scrollTo(originalScrollX, originalScrollY);
  }
}

// 隐藏滚动条
function hideScrollbars() {
  const style = document.createElement('style');
  style.id = 'screenshot-hide-scrollbars';
  style.textContent = `
    ::-webkit-scrollbar {
      display: none !important;
    }
    body {
      -ms-overflow-style: none !important;
      scrollbar-width: none !important;
    }
  `;
  document.head.appendChild(style);
}

// 恢复滚动条
function showScrollbars() {
  const style = document.getElementById('screenshot-hide-scrollbars');
  if (style) {
    style.remove();
  }
}

// 截取当前可见标签页
function captureVisibleTab() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: 'captureVisible' }, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }

      if (response && response.dataUrl) {
        resolve(response.dataUrl);
      } else {
        reject(new Error('Failed to capture visible tab'));
      }
    });
  });
}

// 加载图片
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}
