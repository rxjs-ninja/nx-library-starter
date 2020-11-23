#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

RUN_ALL=${1:-"False"}
WITH_COVERAGE=${2:-"True"}
BASE="origin/main~1"


COVERAGE_RULE=$([[ "$WITH_COVERAGE" == 'True' ]] && echo "--codeCoverage" || echo "")

echo "Running Unit Testing"
if [[ "$RUN_ALL" == "True" ]]; then
  npm run affected:test -- "$COVERAGE_RULE" --all --skip-nx-cache --parallel --maxParallel=2
else
  AFFECTED=$(node node_modules/.bin/nx affected:libs --plain --base="$BASE")
  echo "Will test: $AFFECTED"
  npm run affected:test -- --base="$BASE" "$COVERAGE_RULE" --skip-nx-cache --parallel --maxParallel=2
fi
