# 校园信息中心（campus-center）

软件开发的期末大作业：一个面向在校学生的校园公共信息站点。
整合自习室查询、使用统计与校园三维导览。纯前端项目，无需后端。

## 启动方式

本项目页面需要通过 HTTP 服务器访问（原因见下方「file:// 跨域说明」），三步打开：

```bash
# 1. 克隆仓库并进入本项目目录
git clone https://github.com/shale-orbit/frontend-practice.git
cd frontend-practice/campus-center

# 2. 启动本地HTTP服务器
python -m http.server 8030

# 3. 打开浏览器访问
#    http://localhost:8030/index.html
```

停止服务器：在终端按 Ctrl+C。

## 页面清单

| 页面 | 文件 | 功能 |
|---|---|---|
| 信息首页 | index.html | 项目总入口，四个功能模块的简介与跳转 |
| 自习室查询 | study.html | 按楼层、开放状态双条件筛选自习室，含空结果与加载失败提示 |
| 数据统计 | stats.html | ECharts柱状图（各室使用量）+ Chart.js折线图（近7日人流量趋势） |
| 校园三维导览 | three-d/scene.html | A-Frame三维场景，WASD键行走、鼠标拖动环顾四周 |

四个页面共用顶部导航栏，可互相跳转。

## 为什么不能直接双击 index.html 打开

本项目页面打开后需要通过 fetch 加载本地数据文件 `data/data.json`。
如果直接双击 HTML 文件，页面地址以 `file://` 开头，浏览器的同源安全策略
会禁止 `file://` 页面发起 fetch 请求读取本地文件（CORS 跨域限制），
导致数据加载失败、页面显示错误提示。



