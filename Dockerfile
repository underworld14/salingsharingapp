FROM oven/bun:alpine as base

WORKDIR /usr/src/app

# install dependencies and build the project
FROM base AS build
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# create the final release image
FROM base AS release
COPY --from=build /usr/src/app/build/. /usr/src/app/.
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production

ENV NODE_ENV=production
ENV TZ=Asia/Jakarta

# run the app
USER bun
EXPOSE 3000
ENTRYPOINT [ "bun", "run", "index.js" ]