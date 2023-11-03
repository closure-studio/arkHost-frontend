# 使用 distroless base 镜像，因为它很小且为了安全没有包含不必要的程序或库
FROM joseluisq/static-web-server:2-alpine

# 设置工作目录
WORKDIR /app

# 从构建上下文中复制构建好的静态文件
# 假设 npm run build 生成的静态文件在 /dist 目录下
COPY dist/ /app/

# 设置静态文件服务器的环境变量
ENV PORT=80 \
    SERVER_ROOT=/app

# 暴露 80 端口
EXPOSE 80

# 当容器启动时运行 static-web-server
ENTRYPOINT ["/usr/local/bin/static-web-server"]
CMD ["-p", "80"]
