# 家校社协同劳动教育AI任务链平台 · CloudBase 云托管镜像
# 基础镜像：Node.js 18（CloudBase 云托管推荐 LTS）
FROM node:18-alpine

# 容器内工作目录
WORKDIR /app

# 先拷贝依赖清单，利用层缓存加速构建
COPY package.json ./

# 安装依赖（仅 @cloudbase/node-sdk）
RUN npm install --production --registry=https://registry.npmmirror.com || npm install --production

# 拷贝应用代码与静态资源（业务数据全部在 CloudBase 云数据库，不进镜像）
COPY server.js ./
COPY init-db.js ./
COPY 家校社协同劳动教育AI任务链平台.html ./
COPY 校徽.jpg ./
COPY 课题编号.jpg ./

# CloudBase 云托管会通过环境变量 PORT 注入端口，服务须监听 0.0.0.0:PORT
ENV PORT=8787
EXPOSE 8787

# 容器启动命令
CMD ["node", "server.js"]
