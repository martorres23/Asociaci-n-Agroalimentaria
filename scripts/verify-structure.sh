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

for id in inicio quienes-somos compromiso que-hacemos capacidades por-que contacto; do
  if ! grep -q "id=\"$id\"" "$ROOT/index.html"; then
    echo "MISSING ID: $id"
    missing=1
  else
    echo "OK ID: $id"
  fi
done

exit "$missing"
