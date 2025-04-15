# Steam Web API Proxy

这是一个 Steam Web API 的代理服务，支持同时部署到 Cloudflare Pages 和 Vercel，用于隐藏 Steam API Key。

## 功能特性

- 支持 Steam Web API 的 GetOwnedGames 接口
- 支持多平台部署（Cloudflare Pages / Vercel）
- 自动处理 CORS
- 隐藏 Steam API Key
- 统一的 API 路径结构

## 项目结构

```
/
├── functions/
│   └── IPlayerService/
│       └── GetOwnedGames/
│           └── v0001/
│               └── [[path]].js
├──  api/
│   └── IPlayerService/
│       └── GetOwnedGames/
│           └── v0001.js
```

## 部署说明

### Cloudflare Pages

1. Fork 本仓库
2. 在 Cloudflare Pages 中导入项目
3. 添加环境变量：
   - `STEAM_API_KEY`: 你的 Steam API Key

### Vercel

1. Fork 本仓库
2. 在 Vercel 中导入项目
3. 添加环境变量：
   - `STEAM_API_KEY`: 你的 Steam API Key
4. 部署设置：
   - Framework Preset: Next.js
   - Build Command: next build
   - Output Directory: .next
   - Install Command: npm install

> 注意：本项目使用 Vercel API Routes 处理 API 请求

## API 使用

### GetOwnedGames

获取用户拥有的游戏列表：

```
GET /IPlayerService/GetOwnedGames/v0001
```

参数：

- `steamid`（必须）: Steam 用户 ID
- `include_appinfo`（可选）: 是否包含游戏详情
- `include_played_free_games`（可选）: 是否包含免费游戏
- `appids_filter`（可选）: 过滤特定游戏 ID

示例请求：

```
https://your-domain/IPlayerService/GetOwnedGames/v0001?steamid=76561198xxxxx&include_appinfo=1
```

## 技术说明

- Cloudflare Pages 使用 Functions 处理请求
- Vercel 使用 API Routes 处理请求
- 两个平台共用相同的 API 路径格式

## 注意事项

- 确保正确配置环境变量 `STEAM_API_KEY`
- 请遵守 Steam Web API 的使用条款
- 生产环境建议关闭调试日志
