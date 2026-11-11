#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
missing=0
need() {
  if [[ ! -e "$ROOT/$1" ]]; then
    echo "MISSING: $1"
    missing=1
  else
    echo "OK: $1"
  fi
}
need index.html
need styles.css
need script.js
need assets/logo_horizontal_transparente.png
need assets/logo_asociacion_agroalimentaria_transparente.png
need assets/hero.jpg
need assets/section-field.jpg
exit "$missing"
