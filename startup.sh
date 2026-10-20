#!/bin/sh
# Revive the Night Grid preview. Idempotent: leave a healthy server alone.
if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi
cd /workspace
nohup npm run dev > /tmp/night-grid-dev.log 2>&1 &
exit 0
