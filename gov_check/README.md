# 政府网站检测器

一个用于检测当前访问的网页是否为政府网站的浏览器插件，支持Chrome和Edge浏览器。

## 功能特性

- ✅ 自动检测当前网页是否为政府网站
- ⚠️ 非政府网站时弹出警告提示
- 🔧 可通过设置开关随时启用/禁用检测功能
- 🌍 支持多国政府域名（.gov.cn、.gov、.gov.uk等）
- 🎯 内置常用网站白名单，避免误报
- 🎨 美观的用户界面和警告弹窗
- 🚫 **新增**：自动过滤Google搜索结果中的广告内容

## 支持的政府域名

- `.gov.cn` - 中国政府网站
- `.gov` - 美国及其他国家政府网站
- `.gov.uk` - 英国政府网站
- `.gov.au` - 澳大利亚政府网站
- `.gouv.fr` - 法国政府网站
- `.go.jp` - 日本政府网站
- `.go.kr` - 韩国政府网站
- `.govt.nz` - 新西兰政府网站
- `.gob.mx` - 墨西哥政府网站
- `.gc.ca` - 加拿大政府网站

## 豁免域名白名单

为避免频繁弹出警告，以下常用网站已加入白名单，不会触发警告：

### 中国常用网站
- 百度 (baidu.com)
- 腾讯 QQ (qq.com)
- 淘宝 (taobao.com)
- 天猫 (tmall.com)
- 京东 (jd.com)
- 支付宝 (alipay.com)
- 阿里巴巴 (alibaba.com)
- 腾讯官网 (tencent.com)
- 微博 (weibo.com)
- 新浪 (sina.com.cn)
- 搜狐 (sohu.com)
- 网易 (163.com)
- 哔哩哔哩 (bilibili.com)
- 抖音 (douyin.com)
- 知乎 (zhihu.com)
- CSDN (csdn.net)
- 博客园 (cnblogs.com)
- 华为 (huawei.com)
- 小米 (xiaomi.com)

### 国际常用网站
- Google (google.com)
- YouTube (youtube.com)
- Facebook (facebook.com)
- Twitter (twitter.com)
- Instagram (instagram.com)
- LinkedIn (linkedin.com)
- Amazon (amazon.com)
- Apple (apple.com)
- Microsoft (microsoft.com)
- Netflix (netflix.com)
- Reddit (reddit.com)
- Wikipedia (wikipedia.org)
- GitHub (github.com)
- Stack Overflow (stackoverflow.com)
- OpenAI (openai.com)
- Anthropic (anthropic.com)

### 澳大利亚常用网站
- ABC (abc.net.au) - 澳大利亚广播公司
- News.com.au (news.com.au) - 新闻网站
- SMH (smh.com.au) - 悉尼晨锋报
- The Age (theage.com.au) - 时代报
- BOM (bom.gov.au) - 气象局
- SEEK (seek.com.au) - 求职网
- Gumtree (gumtree.com.au) - 分类广告
- Carsales (carsales.com.au) - 汽车交易
- REA (realestate.com.au) - 房地产网
- Domain (domain.com.au) - 房产网
- CommBank (commbank.com.au) - 联邦银行
- NAB (nab.com.au) - 国民银行
- ANZ (anz.com) - 澳新银行
- Westpac (westpac.com.au) - 西太平洋银行
- Woolworths (woolworths.com.au) - 超市
- Coles (coles.com.au) - 超市
- Australia Post (auspost.com.au) - 邮政
- Telstra (telstra.com.au) - 电信
- Optus (optus.com.au) - 电信

### 澳大利亚职业评估机构
- ACS (acs.org.au) - 澳大利亚计算机协会
- Engineers Australia (engineersaustralia.org.au) - 澳大利亚工程师协会
- VETASSESS (vetassess.com.au) - 职业教育评估
- CPA Australia (cpaa.com.au) - 澳洲会计师公会
- CA ANZ (charteredaccountantsanz.com) - 澳新特许会计师
- AACA (aaca.org.au) - 澳大利亚建筑师认证委员会
- AIMS (aims.com.au) - 澳大利亚医学科学家协会
- AHPRA (ahpra.gov.au) - 澳大利亚健康从业者监管局
- TRA (skillsassess.com.au) - 技工评估

### 英语考试官网
- IELTS (ielts.org) - 雅思国际英语测试
- PTE (pearsonpte.com) - 培生学术英语考试
- Cambridge English (cambridgeenglish.org) - 剑桥英语考试
- TOEFL (ets.org) - 托福考试

### 开发环境
- localhost
- 127.0.0.1

**注意**: 白名单支持子域名匹配。例如，`google.com` 会匹配 `www.google.com`、`mail.google.com` 等所有 Google 子域名。

## Google搜索广告过滤

插件现在包含自动过滤Google搜索广告的功能：

### 功能说明
- 🎯 自动识别并隐藏Google搜索结果中的赞助广告
- 🌍 支持多个Google域名（.com、.com.au、.co.uk等）
- ⚡ 实时监控，动态过滤新加载的广告
- 🔍 多种识别策略，确保过滤效果

### 过滤的广告类型
- 顶部赞助广告（Sponsored/Ad标记）
- 侧边栏广告
- 购物广告（Shopping ads）
- 底部广告
- 所有包含"Sponsored"或"赞助"标记的内容

### 支持的Google域名
- google.com（美国）
- google.com.au（澳大利亚）
- google.co.uk（英国）
- google.ca（加拿大）
- google.com.hk（香港）
- google.co.jp（日本）
- google.fr（法国）
- google.de（德国）

**注意**：广告过滤功能无需额外配置，安装插件后即自动生效。

## 安装说明

### Chrome浏览器

1. 打开Chrome浏览器
2. 在地址栏输入 `chrome://extensions/`
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择 `gov_check/chrome` 目录
6. 插件安装完成

### Edge浏览器

1. 打开Edge浏览器
2. 在地址栏输入 `edge://extensions/`
3. 开启左下角的"开发人员模式"
4. 点击"加载解压缩的扩展"
5. 选择 `gov_check/edge` 目录
6. 插件安装完成

## 生成图标

在安装插件之前，需要生成图标文件：

1. 用浏览器打开 `chrome/icons/generate_icons.html` 或 `edge/icons/generate_icons.html`
2. 点击"下载全部"按钮
3. 将下载的 `icon16.png`、`icon48.png`、`icon128.png` 放到对应的 `icons` 目录中

## 使用方法

### 启用/禁用检测

1. 点击浏览器工具栏中的插件图标
2. 在弹出的设置面板中，使用开关切换检测功能的启用状态
3. 绿色表示已启用，灰色表示已禁用

### 查看警告

当访问非政府网站时，如果检测功能已启用：

1. 页面会自动弹出警告窗口
2. 提示"警告：非政府网站"
3. 点击"我知道了"按钮或点击遮罩层关闭警告

## 目录结构

```
gov_check/
├── chrome/                 # Chrome版本插件
│   ├── manifest.json      # 插件配置文件
│   ├── background.js      # 后台脚本（检测逻辑）
│   ├── content.js         # 内容脚本（显示警告）
│   ├── google-filter.js   # Google搜索广告过滤器
│   ├── popup.html         # 设置面板HTML
│   ├── popup.js           # 设置面板脚本
│   └── icons/             # 图标目录
│       └── generate_icons.html  # 图标生成器
├── edge/                  # Edge版本插件
│   ├── manifest.json      # 插件配置文件
│   ├── background.js      # 后台脚本（检测逻辑）
│   ├── content.js         # 内容脚本（显示警告）
│   ├── google-filter.js   # Google搜索广告过滤器
│   ├── popup.html         # 设置面板HTML
│   ├── popup.js           # 设置面板脚本
│   └── icons/             # 图标目录
│       └── generate_icons.html  # 图标生成器
└── README.md              # 说明文档
```

## 技术说明

### 工作原理

1. **后台脚本 (background.js)**：监听标签页更新事件，检测URL是否包含政府域名后缀
2. **内容脚本 (content.js)**：接收后台脚本的消息，在非政府网站时显示警告弹窗
3. **Google广告过滤器 (google-filter.js)**：自动识别并隐藏Google搜索页面的广告内容
4. **设置面板 (popup.html/js)**：提供开关控制，状态保存在浏览器本地存储中

### 权限说明

- `activeTab`：访问当前活动标签页信息
- `storage`：存储插件设置（启用/禁用状态）
- `tabs`：监听标签页更新事件
- `<all_urls>`：在所有网页上运行内容脚本

## 注意事项

1. 插件默认处于启用状态
2. 警告窗口在每个非政府网页加载完成后只显示一次
3. 可以随时通过设置面板开关控制检测功能
4. 插件仅用于提醒，不会阻止访问任何网站

## 自定义

### 添加政府域名

如需添加更多政府域名后缀，请编辑 `background.js` 中的 `GOV_DOMAINS` 数组：

```javascript
const GOV_DOMAINS = [
  '.gov.cn',
  '.gov',
  // 在此添加更多域名后缀
];
```

### 添加白名单域名

如需添加更多白名单域名（豁免检测的网站），请编辑 `background.js` 中的 `WHITELIST_DOMAINS` 数组：

```javascript
const WHITELIST_DOMAINS = [
  'baidu.com',
  'google.com',
  // 在此添加更多域名
  'example.com',  // 添加你信任的域名
];
```

**注意**：
- 白名单域名无需添加 `www.` 前缀
- 支持自动匹配子域名（例如添加 `google.com` 会匹配所有 `*.google.com`）
- 修改后需要重新加载插件才能生效

## 许可证

本项目仅供学习和参考使用。

## 更新日志

### v1.4.0 (2025-01-13)
- 🚫 **重大更新**：新增Google搜索广告自动过滤功能
- ✨ 支持8个主流Google域名的广告过滤
- ⚡ 实时监控并动态移除新加载的广告
- 🎯 多重识别策略，确保过滤效果
- 📝 更新manifest版本至1.4.0

### v1.3.0 (2025-01-13)
- 新增：9个澳大利亚职业评估机构网站（ACS、EA、VETASSESS等）
- 新增：4个国际英语考试官网（IELTS、PTE、剑桥英语、TOEFL）
- 优化：白名单总数增至67+网站
- 优化：覆盖澳洲移民相关常用网站

### v1.2.0 (2025-01-13)
- 新增：19个澳大利亚常用网站加入白名单
- 新增：包括ABC、News.com.au、四大银行、Woolworths、Coles等
- 优化：白名单总数增至54+网站

### v1.1.0 (2025-01-13)
- 新增：澳大利亚政府网站检测 (.gov.au)
- 新增：白名单功能，常用网站不再触发警告
- 新增：35+中国和国际常用网站预置白名单
- 优化：支持子域名自动匹配

### v1.0.0 (2025-01-13)
- 初始版本发布
- 支持Chrome和Edge浏览器
- 实现政府网站检测功能
- 添加启用/禁用开关
