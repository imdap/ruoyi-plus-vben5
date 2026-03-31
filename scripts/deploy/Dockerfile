# ==============================
# Stage 1: 构建阶段
# ==============================
FROM node:22-slim AS builder

# 设置环境变量
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# 增加内存限制以防止构建大型项目时 OOM
ENV NODE_OPTIONS=--max-old-space-size=8192
ENV TZ=Asia/Shanghai

# 启用 corepack 以使用 pnpm
RUN npm i -g corepack

WORKDIR /app

# 复制项目文件
COPY . .

# 安装依赖
# --frozen-lockfile: 确保使用 lock 文件中的版本
# --mount=type=cache: 缓存 pnpm 存储，加速后续构建
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# 构建 web-antd 应用
# 使用 filter 只构建需要的应用，避免构建整个 monorepo
RUN pnpm run build --filter=@vben/web-antd

# ==============================
# Stage 2: 生产环境运行阶段
# ==============================
FROM nginx:stable-alpine AS production

# 清理默认配置并复制自定义 Nginx 配置
# 这里复用了 scripts/deploy/nginx.conf，它监听 8080 端口
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/scripts/deploy/nginx.conf /etc/nginx/nginx.conf

# 复制构建产物到 Nginx 目录
# Vite 默认构建输出在 apps/web-antd/dist
COPY --from=builder /app/apps/web-antd/dist /usr/share/nginx/html

# 暴露端口 (与 nginx.conf 保持一致)
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
