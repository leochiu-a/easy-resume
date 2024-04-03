FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base as build
WORKDIR /app
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run --filter=server prisma:generate
RUN pnpm run --filter=server build
RUN pnpm deploy --filter=server --prod /prod/server

FROM base
WORKDIR /prod/server
COPY --from=build /prod/server .
EXPOSE 4000
CMD [ "pnpm", "start:migrate:prod" ]
