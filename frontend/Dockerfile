FROM node AS builder

WORKDIR /app

COPY tsconfig.json package.json yarn.lock ./
COPY public ./public

RUN yarn install

COPY src ./src

RUN yarn build

FROM node

WORKDIR /app

COPY --from=builder /app/build/ ./build/

RUN npm install -g serve

CMD ["serve", "-s", "build"]