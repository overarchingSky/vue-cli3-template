FROM node:9-alpine
ARG BUILD_COMMAND="build-wechat-prod"

COPY ./ /build-temp/
WORKDIR /build-temp

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install
RUN npm run ${BUILD_COMMAND}

FROM nginx:alpine

# copy from last stage
COPY --from=0 /build-temp/dist /html/
# 覆盖默认的default.conf
COPY --from=0 /build-temp/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
