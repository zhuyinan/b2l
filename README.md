# B2L 短链服务

极简白色主题的短链生成服务，基于 Next.js 14 和 Vercel 构建。

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 配置环境变量
复制 `.env.local.example` 为 `.env.local` 并填入配置：
```bash
cp .env.local.example .env.local
```

### 3. 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000

## 部署到 Vercel

### 1. 创建 Vercel KV 数据库
- 登录 Vercel Dashboard
- 进入 Storage → Create Database → KV
- 创建数据库

### 2. 部署项目
```bash
vercel
```

### 3. 连接 KV 数据库
在 Vercel 项目设置中连接之前创建的 KV 数据库

### 4. 配置自定义域名
在 Vercel 项目设置中添加 `b2l.me` 域名

## 功能特性

- ✨ 极简白色主题
- 🚀 快速短链生成
- 📱 移动端适配
- 🔗 自定义域名支持
- 📊 点击统计

详细部署指南请查看 [DEPLOY.md](./DEPLOY.md)
