#!/usr/bin/env bash
# init.sh — project-sales-weather-etl (Python ETL pipeline)
set -euo pipefail

PASS=0; FAIL=0
green() { echo -e "\033[32m✓ $1\033[0m"; }
red()   { echo -e "\033[31m✗ $1\033[0m"; }
warn()  { echo -e "\033[33m⚠ $1\033[0m"; }
info()  { echo -e "\033[36m→ $1\033[0m"; }
check() { local l="$1"; shift; if "$@" &>/dev/null; then green "$l"; PASS=$((PASS + 1)); else red "$l"; FAIL=$((FAIL + 1)); fi; }

echo ""; info "project-sales-weather-etl — verificación pre-sesión"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""; info "Estructura"
check "etl_pipeline.py existe"    test -f "etl_pipeline.py"
check "requirements.txt existe"   test -f "requirements.txt"
check "README.md existe"          test -f "README.md"
check "CLAUDE.md en .gitignore"   grep -q "CLAUDE.md" ".gitignore"

[ ! -d ".claude/progress" ] && mkdir -p ".claude/progress" && warn ".claude/progress creado" || { green ".claude/progress existe"; PASS=$((PASS + 1)); }

echo ""; info "Python — dependencias ETL"
check "pandas disponible"  python3 -c "import pandas"
check "numpy disponible"   python3 -c "import numpy"
check "requests disponible" python3 -c "import requests"

echo ""; info "Sintaxis"
check "etl_pipeline.py" python3 -m py_compile etl_pipeline.py
find . -name "*.py" -not -path "./.git/*" | while read f; do
  python3 -m py_compile "$f" 2>/dev/null || { red "Sintaxis: $f"; }
done

echo ""; info "Git"
UNCOMMITTED=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
[ "$UNCOMMITTED" -gt 0 ] && warn "$UNCOMMITTED archivo(s) sin commit" || { green "Working tree limpio"; PASS=$((PASS + 1)); }

echo ""; echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Resultado: $PASS ✓  $FAIL ✗"
[ "$FAIL" -gt 0 ] && { red "PROYECTO EN MAL ESTADO — Resuelve los errores antes de continuar"; exit 1; } || { green "Proyecto verificado — puedes empezar"; exit 0; }
