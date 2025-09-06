# B2L 短链服务 - 部署指南

## 项目简介

B2L 是一个极简白色主题的短链生成服务，基于 Next.js 14 和 Vercel KV 构建，可以将长链接转换为简洁的短链接。

## 功能特性

- ✨ 极简白色主题设计
- 🚀 基于 Next.js 14 App Router
- 💾 使用 Vercel KV 存储数据
- 📱 响应式设计，支持移动端
- 🔗 自定义域名支持 (b2l.me)
- 📊 点击统计功能
- ⚡ 快速重定向

## 部署步骤

### 1. 准备工作

确保你有以下账号：
- [Vercel](https://vercel.com) 账号
- GitHub 账号
- b2l.me 域名控制权

### 2. 创建 Vercel KV 数据库

1. 登录 Vercel Dashboard
2. 进入 Storage 页面
3. 点击 "Create Database"
4. 选择 "KV" 类型
5. 输入数据库名称（如：b2l-kv）
6. 选择地区（建议选择离用户最近的地区）
7. 点击创建

### 3. 部署到 Vercel

#### 方法 1：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署项目
vercel

# 按照提示进行配置：
# - 选择或创建项目
# - 选择团队（如果有）
# - 确认项目设置
```

#### 方法 2：通过 GitHub 集成

1. 将代码推送到 GitHub 仓库
2. 在 Vercel Dashboard 中点击 "New Project"
3. 选择你的 GitHub 仓库
4. 点击 "Deploy"

### 4. 配置环境变量

在 Vercel 项目设置中添加以下环境变量：

1. 进入项目 Settings → Environment Variables
2. 连接之前创建的 KV 数据库：
   - 在 Storage 页面找到你的 KV 数据库
   - 点击 "Connect to Project"
   - 选择你的项目
   - 确认连接

这会自动添加以下环境变量：
- \`KV_REST_API_URL\`
- \`KV_REST_API_TOKEN\`
- \`KV_REST_API_READ_ONLY_TOKEN\`

### 5. 配置自定义域名

1. 在 Vercel 项目设置中进入 Domains 页面
2. 点击 "Add Domain"
3. 输入 \`b2l.me\`
4. 按照提示配置 DNS 记录：
   - 添加 A 记录指向 Vercel 的 IP
   - 或添加 CNAME 记录指向 Vercel 提供的域名

### 6. 验证部署

1. 访问 https://b2l.me 确认网站正常运行
2. 测试短链生成功能
3. 测试短链重定向功能

## 本地开发

### 安装依赖

```bash
npm install
```

### 配置环境变量

1. 复制 \`.env.local.example\` 为 \`.env.local\`
2. 填入你的 Vercel KV 数据库配置

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

## 项目结构

```
b2l/
├── app/                    # Next.js App Router
│   ├── [shortCode]/       # 动态路由处理短链重定向
│   ├── api/               # API 路由
│   │   ├── shorten/       # 短链生成 API
│   │   └── redirect/      # 重定向 API
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页
├── components/            # 组件
│   └── icons.tsx          # 图标组件
├── lib/                   # 工具库
│   └── db.ts              # 数据库操作
├── package.json           # 项目配置
├── tailwind.config.js     # Tailwind CSS 配置
├── next.config.js         # Next.js 配置
└── vercel.json            # Vercel 部署配置
```

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **数据库**: Vercel KV (Redis)
- **部署**: Vercel
- **语言**: TypeScript
- **ID生成**: nanoid
- **表单验证**: Zod

## 注意事项

1. **KV 数据库限制**: Vercel KV 免费版有一定的读写限制，如需大量使用请考虑升级
2. **域名配置**: 确保 DNS 记录正确配置，生效可能需要几分钟到几小时
3. **HTTPS**: Vercel 自动提供 HTTPS，无需额外配置
4. **缓存**: 短链重定向会有适当的缓存策略以提高性能

## 故障排除

### 短链无法访问
- 检查 KV 数据库连接是否正常
- 确认环境变量配置正确

### 域名无法访问
- 检查 DNS 配置是否正确
- 等待 DNS 传播完成（最多 24 小时）

### 部署失败
- 检查依赖是否正确安装
- 查看 Vercel 部署日志获取详细错误信息

## 支持

如有问题，请检查：
1. [Vercel 文档](https://vercel.com/docs)
2. [Next.js 文档](https://nextjs.org/docs)
3. 项目 GitHub Issues
