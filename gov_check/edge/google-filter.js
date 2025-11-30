// Google搜索广告过滤器
// 自动移除Google搜索结果中的赞助广告内容

(function() {
  'use strict';

  // 广告选择器列表（Google搜索结果页面的广告元素）
  const AD_SELECTORS = [
    // 顶部赞助广告
    'div[data-text-ad]',
    'div.uEierd',  // 顶部广告容器
    'div.commercial-unit-desktop-top',

    // 侧边栏广告
    'div.commercial-unit-desktop-rhs',
    'div#rhs_block div[data-text-ad]',

    // 购物广告
    'div.cu-container',
    'g-scrolling-carousel',

    // 底部广告
    'div.commercial-unit-desktop-bottom',

    // 新版广告标记
    'div[aria-label*="Ads"]',
    'div[aria-label*="广告"]',
    'div.ads-ad',

    // 包含"Sponsored"或"赞助"文本的元素
    'div:has(span:contains("Sponsored"))',
    'div:has(span:contains("赞助"))',
  ];

  // 移除广告元素
  function removeAds() {
    let removedCount = 0;

    AD_SELECTORS.forEach(selector => {
      try {
        const ads = document.querySelectorAll(selector);
        ads.forEach(ad => {
          if (ad && ad.parentNode) {
            ad.style.display = 'none';
            // 或者完全移除：ad.remove();
            removedCount++;
          }
        });
      } catch (e) {
        // 忽略选择器错误
      }
    });

    // 额外检查：通过文本内容识别广告
    removeAdsByText();

    if (removedCount > 0) {
      console.log(`[Google广告过滤器] 已过滤 ${removedCount} 个广告元素`);
    }
  }

  // 通过文本内容识别并移除广告
  function removeAdsByText() {
    // 查找所有搜索结果项
    const searchResults = document.querySelectorAll('div.g, div[data-hveid]');

    searchResults.forEach(result => {
      const text = result.textContent || '';

      // 检查是否包含广告标识
      if (text.includes('Sponsored') ||
          text.includes('赞助') ||
          text.includes('Ad') && result.querySelector('span.VqFMTc')) {
        result.style.display = 'none';
      }
    });
  }

  // 更精确的广告识别方法
  function removeAdsAdvanced() {
    // 查找所有包含"Ad"或"Sponsored"标签的元素
    const allElements = document.querySelectorAll('div');

    allElements.forEach(el => {
      // 检查元素是否有"Ad"标记
      const adIndicator = el.querySelector('span.VqFMTc');
      if (adIndicator && (adIndicator.textContent === 'Ad' ||
                          adIndicator.textContent === '广告' ||
                          adIndicator.textContent === 'Sponsored')) {
        // 找到最近的搜索结果容器并隐藏
        const resultContainer = el.closest('div.g, li.ads-ad, div.uEierd');
        if (resultContainer) {
          resultContainer.style.display = 'none';
        }
      }
    });
  }

  // 监听DOM变化，动态移除新加载的广告
  function observeDOMChanges() {
    const observer = new MutationObserver((mutations) => {
      let shouldRemove = false;

      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          shouldRemove = true;
        }
      });

      if (shouldRemove) {
        removeAds();
        removeAdsAdvanced();
      }
    });

    // 观察搜索结果容器的变化
    const searchContainer = document.querySelector('#search, #rso, #center_col');
    if (searchContainer) {
      observer.observe(searchContainer, {
        childList: true,
        subtree: true
      });
    }
  }

  // 初始化
  function init() {
    // 页面加载完成后移除广告
    removeAds();
    removeAdsAdvanced();

    // 监听DOM变化
    observeDOMChanges();

    // 定期检查（防止漏网之鱼）
    setInterval(() => {
      removeAds();
      removeAdsAdvanced();
    }, 2000);
  }

  // 等待页面加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  console.log('[Google广告过滤器] 已启动');
})();
