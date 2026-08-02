#!/usr/bin/env bash
# Cross-platform helper (Linux / macOS) to build and start the Docker Compose stack
# Usage: ./scripts/run.sh
set -euo pipefail

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker not found in PATH. Install Docker and make sure 'docker' is available." >&2
  exit 1
fi

echo "Building and starting Docker Compose stack..."

docker compose up --build -d

health_url="http://localhost:5500/health"
max_checks=30
wait_sec=2
ok=0

for i in $(seq 1 $max_checks); do
  if curl -fsS "$health_url" >/dev/null 2>&1; then
    echo "Backend health check succeeded at $health_url"
    ok=1
    break
  fi
  echo "Waiting for backend to become healthy... ($i/$max_checks)"
  sleep $wait_sec
done

if [ $ok -eq 0 ]; then
  echo "Backend did not report healthy after $((max_checks * wait_sec)) seconds. Inspect logs: docker compose logs backend" >&2
else
  echo "All services started (or backend responded). Frontend available at http://localhost/ (port 80)."
fi

echo "To stop and remove containers: docker compose down"
