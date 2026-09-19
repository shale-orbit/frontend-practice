# 个人信息展示台

一个关于作者的个人信息整合小型站点：个人信息、敬佩的人、家乡、
自制任务清单 App、校园 3D 场景。

## 运行说明

本项目使用 fetch 读取本地 JSON，必须通过 HTTP 服务访问，
不能直接双击 HTML 文件（file:// 协议），需要用一个本地服务器来访问。

## 页面结构

- index.html    关于我（导航 + 简介 + 模块入口，标签来自 data.json）
- figure.html   我敬佩的人（袁隆平：生平、贡献、名言）
- hometown.html 我的家乡（景点/美食卡片由 JS 读取 data.json 渲染）
- todo-app.html 任务清单（增删改查 + 筛选，数据存 localStorage）
- campus.html   我的校园 3D（A-Frame 场景，鼠标环顾 + WASD 行走）

数据衔接：data.json 为全站共享数据（首页标签、家乡页卡片同源）；
任务清单与数据文件相互独立。

## 资源来源说明

- Bootstrap 5.x / Chart.js / A-Frame：第三方库，已下载至 libs/ 本地引用，断网可用
- 图片：个人照片与家乡景点、美食照片来自本人此前作业（homepage、figure、hometown）
- 文字内容：袁隆平生平整理自百度百科词条
- data.json：本人手工整理编写
