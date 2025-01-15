@_default:
  just --list

@lint:
  echo mypy
  just --justfile {{justfile()}} mypy
  echo ruff-check
  just --justfile {{justfile()}} ruff-check
  echo ruff-format
  just --justfile {{justfile()}} ruff-format

@install:
  echo installing backend
  just --justfile {{justfile()}} backend-install
  echo installing frontend
  just --justfile {{justfile()}} frontend-install

@mypy:
  cd backend && \
  uv run mypy app tests

@ruff-check:
  cd backend && \
  uv run ruff check app tests

@ruff-format:
  cd backend && \
  uv run ruff format app tests

@ruff-format-ci:
  cd backend && \
  uv run ruff format app tests --check

@backend-test *args="":
  -cd backend && \
  uv run pytest {{args}}

@backend-lock:
  cd backend && \
  uv lock

@backend-lock-upgrade:
  cd backend && \
  uv lock --upgrade

@backend-install:
  cd backend && \
  uv sync --frozen --all-extras

@backend-server:
  docker compose down backend && \
  cd backend && \
  uv run uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload

@frontend-install:
  cd frontend && \
  npm install

@frontend-build:
  cd frontend && \
  npm run build

@frontend-dev:
  cd frontend && \
  npm run dev

@frontend-start:
  cd frontend && \
  npm run start

@frontend-lint:
  cd frontend && \
  npm run lint

@frontend-test:
  cd frontend && \
  npm run test

@e2e-test:
  cd frontend && \
  npm run cypress:run

@docker-up:
  docker compose up --build

@docker-up-backend-dev:
  docker compose up db valkey

@docker-up-detached:
  docker compose up -d

@docker-up-backend-ci:
  docker compose -f docker-compose.ci.yml up db -d

@docker-down:
  docker compose down

@docker-down-volumes:
  docker compose down --volumes

@docker-build-backend:
  cd backend && \
  docker build -t scanue-v-backend .

@docker-build-frontend:
  cd frontend && \
  docker build -t frontend-frontend .
