FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@10.33.2 --activate

WORKDIR /var/www/html

CMD ["pnpm", "run", "dev", "--", "--host", "0.0.0.0"]
