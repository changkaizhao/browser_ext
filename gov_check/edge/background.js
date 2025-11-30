// 政府网站域名后缀列表
const GOV_DOMAINS = [
	'.gov.cn', // 中国政府网站
	'.gov', // 美国及其他国家政府网站
	'.gov.uk', // 英国政府网站
	'.gov.au', // 澳大利亚政府网站
	'.gouv.fr', // 法国政府网站
	'.go.jp', // 日本政府网站
	'.go.kr', // 韩国政府网站
	'.govt.nz', // 新西兰政府网站
	'.gob.mx', // 墨西哥政府网站
	'.gc.ca', // 加拿大政府网站
];

// 豁免域名列表（这些域名不会触发警告）
const WHITELIST_DOMAINS = [
	// 中国常用网站
	'baidu.com',
	'qq.com',
	'taobao.com',
	'tmall.com',
	'jd.com',
	'alipay.com',
	'alibaba.com',
	'tencent.com',
	'weibo.com',
	'sina.com.cn',
	'sohu.com',
	'163.com',
	'bilibili.com',
	'douyin.com',
	'zhihu.com',
	'csdn.net',
	'cnblogs.com',
	'huawei.com',
	'xiaomi.com',

	// 美国及国际常用网站
	'google.com',
	'youtube.com',
	'facebook.com',
	'twitter.com',
	'x.com',
	'whatsapp.com',
	'tiktok.com',
	'instagram.com',
	'linkedin.com',
	'amazon.com',
	'apple.com',
	'microsoft.com',
	'netflix.com',
	'reddit.com',
	'wikipedia.org',
	'github.com',
	'stackoverflow.com',

	// AI 网站
	'openai.com',
	'chat.openai.com',
	'chatgpt.com',
	'anthropic.com',
	'claude.ai',
	'gemini.google.com',
	'bard.google.com',
	'copilot.microsoft.com',
	'bing.com/chat',
	'poe.com',
	'perplexity.ai',
	'huggingface.co',
	'cohere.com',
	'midjourney.com',
	'stability.ai',
	'character.ai',
	'jasper.ai',
	'writesonic.com',
	'copy.ai',
	'notion.so/ai',

	// 澳大利亚常用网站
	'abc.net.au', // 澳大利亚广播公司
	'news.com.au', // News.com.au新闻
	'smh.com.au', // 悉尼晨锋报
	'theage.com.au', // 时代报
	'bom.gov.au', // 气象局
	'seek.com.au', // SEEK求职网
	'gumtree.com.au', // Gumtree分类广告
	'carsales.com.au', // Carsales汽车交易
	'realestate.com.au', // 房地产网
	'domain.com.au', // Domain房产网
	'commbank.com.au', // 联邦银行
	'nab.com.au', // 澳大利亚国民银行
	'anz.com', // 澳新银行
	'westpac.com.au', // 西太平洋银行
	'woolworths.com.au', // Woolworths超市
	'coles.com.au', // Coles超市
	'auspost.com.au', // 澳大利亚邮政
	'telstra.com.au', // Telstra电信
	'optus.com.au', // Optus电信
	'seek.co.nz',
	'upwork.com',
	'freelancer.com',
	'seek.co.nz',
	'upwork.com',
	'freelancer.com',

	// 澳大利亚职业评估机构
	'acs.org.au', // ACS - 澳大利亚计算机协会
	'engineersaustralia.org.au', // EA - 澳大利亚工程师协会
	'vetassess.com.au', // VETASSESS - 职业教育评估
	'cpaa.com.au', // CPA Australia - 澳洲会计师公会
	'charteredaccountantsanz.com', // CA ANZ - 澳新特许会计师
	'aaca.org.au', // AACA - 澳大利亚建筑师认证委员会
	'aims.com.au', // AIMS - 澳大利亚医学科学家协会
	'ahpra.gov.au', // AHPRA - 澳大利亚健康从业者监管局
	'skillsassess.com.au', // TRA - 技工评估

	// 英语考试官网
	'ielts.org', // IELTS 雅思官网
	'pearsonpte.com', // PTE 培生学术英语考试
	'cambridgeenglish.org', // 剑桥英语考试
	'ets.org', // ETS (托福)

	// 常用教育平台
	'coursera.org',
	'edx.org',
	'udemy.com',
	'khanacademy.org',
	'futurelearn.com',
	'skillshare.com',
	'linkedin.com/learning',
	'pluralsight.com',
	'udacity.com',
	'codecademy.com',

	// 常用云服务平台
	'aws.amazon.com',
	'azure.microsoft.com',
	'cloud.google.com',
	'digitalocean.com',
	'heroku.com',
	'linode.com',
	'vultr.com',
	'ovh.com',
	'scaleway.com',
	'hetzner.com',
	'cloudflare.com',
	'supabase.com',
	'render.com',
	'fly.io',
	'netlify.com',
	'vercel.com',
	'firebase.google.com',
	'backblaze.com',
	'wasabi.com',
	'upcloud.com',

	// 常用开发者平台
	'gitlab.com',
	'bitbucket.org',
	'docker.com',
	'kubernetes.io',
	'terraform.io',
	'ansible.com',
	'jenkins.io',
	'circleci.com',
	'travis-ci.com',
	'codepen.io',

	// 常用技术社区
	'dev.to',
	'hashnode.com',
	'lobste.rs',
	'dzone.com',
	'sitepoint.com',
	'tutsplus.com',
	'smashingmagazine.com',
	'css-tricks.com',
	'html5rocks.com',
	'web.dev',

	// 常用新闻网站
	'bbc.com',
	'cnn.com',
	'reuters.com',
	'theguardian.com',
	'nytimes.com',
	'washingtonpost.com',
	'wsj.com',
	'aljazeera.com',
	'foxnews.com',
	'nbcnews.com',

	// 常用论坛网站
	'quora.com',
	'4chan.org',
	'8kun.top',
	'somethingawful.com',
	'metafilter.com',
	'overclock.net',
	'arstechnica.com',
	'neogaf.com',
	'resetera.com',
	'gamefaqs.gamespot.com',

	// 常用购物网站
	'etsy.com',
	'ebay.com',
	'walmart.com',
	'target.com',
	'costco.com',
	'bestbuy.com',
	'homedepot.com',
	'lowes.com',
	'sears.com',
	'overstock.com',

	// 常用支付平台
	'paypal.com',
	'stripe.com',
	'squareup.com',
	'venmo.com',
	'zellepay.com',
	'skrill.com',
	'neteller.com',
	'payoneer.com',
	'alipay.com',
	'wepay.com',

	// 常用社交媒体平台
	'tumblr.com',
	'flickr.com',
	'vimeo.com',
	'periscope.tv',
	'mewe.com',
	'diaspora.org',
	'mastodon.social',
	'gab.com',
	'parler.com',
	'clubhouse.com',

	// 常用搜索引擎
	'bing.com',
	'yahoo.com',
	'duckduckgo.com',
	'baidu.com',
	'yandex.com',
	'ask.com',
	'aol.com',
	'wolframalpha.com',
	'startpage.com',
	'qwant.com',

	// 常用地图服务
	'google.com/maps',
	'bing.com/maps',
	'here.com',
	'mapquest.com',
	'openstreetmap.org',
	'waze.com',
	'maps.apple.com',
	'sygic.com',
	'tomtom.com',
	'navmii.com',

	// 常用视频会议平台
	'zoom.us',
	'teams.microsoft.com',
	'meet.google.com',
	'webex.com',
	'bluejeans.com',
	'gotomeeting.com',
	'jitsi.org',
	'whereby.com',
	'bigbluebutton.org',
	'ringcentral.com',

	// 常用云存储服务
	'dropbox.com',
	'google.com/drive',
	'onedrive.live.com',
	'box.com',
	'icloud.com',
	'pcloud.com',
	'sync.com',
	'mega.nz',
	'mediafire.com',
	'zippyshare.com',

	// 常用新闻聚合网站
	'flipboard.com',
	'feedly.com',
	'newsblur.com',
	'inoreader.com',
	'theoldreader.com',
	'pocket.com',
	'digg.com',
	'mix.com',
	'alltop.com',
	'news360.com',

	// porn
	'pornhub.com',
	'xvideos.com',
	'xnxx.com',
	'jable.tv',
	'stripchat.com',
	'fanxxx.org',

	// 开发相关
	'localhost',
	'127.0.0.1',
];

// 检查是否是政府网站
function isGovernmentWebsite(url) {
	try {
		const urlObj = new URL(url);
		const hostname = urlObj.hostname.toLowerCase();

		// 检查域名是否包含政府域名后缀
		return GOV_DOMAINS.some((suffix) => hostname.endsWith(suffix));
	} catch (error) {
		console.error('URL解析错误:', error);
		return false;
	}
}

// 检查是否在白名单中
function isWhitelisted(url) {
	try {
		const urlObj = new URL(url);
		const hostname = urlObj.hostname.toLowerCase();

		// 检查是否完全匹配或是白名单域名的子域名
		return WHITELIST_DOMAINS.some((domain) => {
			return hostname === domain || hostname.endsWith('.' + domain);
		});
	} catch (error) {
		console.error('URL解析错误:', error);
		return false;
	}
}

// 监听标签页更新事件
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	// 只在页面加载完成时检查
	if (changeInfo.status === 'complete' && tab.url) {
		// 获取插件启用状态
		chrome.storage.sync.get(['enabled'], (result) => {
			const enabled = result.enabled !== false; // 默认启用

			if (enabled) {
				const isGov = isGovernmentWebsite(tab.url);
				const isWhitelistedSite = isWhitelisted(tab.url);

				// 发送消息到content script
				// 如果是政府网站或在白名单中，则不触发警告
				chrome.tabs
					.sendMessage(tabId, {
						action: 'checkWebsite',
						isGovernment: isGov || isWhitelistedSite,
						url: tab.url,
					})
					.catch(() => {
						// 忽略错误（某些页面可能不支持content script）
					});
			}
		});
	}
});

// 监听来自popup的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'getStatus') {
		chrome.storage.sync.get(['enabled'], (result) => {
			sendResponse({ enabled: result.enabled !== false });
		});
		return true; // 保持消息通道开放
	}

	if (request.action === 'setStatus') {
		chrome.storage.sync.set({ enabled: request.enabled }, () => {
			sendResponse({ success: true });
		});
		return true;
	}
});

// 初始化：设置默认启用状态
chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({ enabled: true });
});
