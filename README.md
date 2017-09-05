# Node.js web项目框架

[TOC]

## 快速启动
### demo地址

### 环境准备
- 安装MySQL5.6以上版本
- 创建数据库node_test
- 配置项目config.js

```js
const config = {
  // 启动端口
  port: 3001,

  // 数据库配置
  database: {
    HOST: 'localhost',
    PORT: '3306',
    DATABASE: 'node-test',
    USERNAME: 'root',
    PASSWORD: 'abc123',
  }
}

module.exports = config
```

### 启动脚本
```sh

# 安装依赖
npm install

# 数据建库初始化
npm run init_sql

# 启动服务
npm run dev
```

### 访问项目demo

[http://localhost:3001/](http://localhost:3001/)

## 框架设计
- koa 搭建服务
- MySQL作为数据库
    - mysql 5.7 版本
    - 储存普通数据
    - 存储session登录态数据
- 渲染
    - 服务端渲染：art-template作为服务端渲染的模板引擎，未来可能使用Vue-SSR
    - 前端渲染：目前使用layui作为UI框架，未来使用Vue框架，webpack打包
- Redis（后续考虑）
- debugger（后续考虑）

### 文件目录设计
```sh
├── init # 数据库初始化目录
│   ├── index.js # 初始化入口文件
│   ├── sql/    # sql脚本文件目录
│   └── util/   # 工具操作目录
├── package.json
├── config.js # 配置文件
├── server  # 后端代码目录
│   ├── app.js # 后端服务入口文件
│   ├── codes/ # 提示语代码目录
│   ├── controllers/    # 操作层目录
│   ├── models/ # 数据模型model层目录
│   ├── routers/ # 路由目录
│   ├── services/   # 业务层目录
│   ├── utils/  # 工具类目录
│   └── views/  # 模板目录
└── static # 前端静态代码目录
    ├── build/   # webpack编译配置目录
    ├── output/  # 编译后前端代码目录&静态资源前端访问目录
    └── src/ # 前端源代码目录
```

### 分层设计

```sh
└── server
    ├── controllers # 操作层 执行服务端模板渲染，json接口返回数据，页面跳转
    │   ├── admin.js
    │   ├── index.js
    │   ├── user-info.js
    │   └── work.js
    ├── models # 数据模型层 执行数据操作
    │   └── user-Info.js
    ├── routers # 路由层 控制路由
    │   ├── admin.js
    │   ├── api.js
    │   ├── error.js
    │   ├── home.js
    │   ├── index.js
    │   └── work.js
    ├── services # 业务层 实现数据层model到操作层controller的耦合封装
    │   └── user-info.js
    └── views # 服务端模板代码
        ├── admin.ejs
        ├── error.ejs
        ├── index.ejs
        └── work.ejs
```
