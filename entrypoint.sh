#!/bin/sh

if [ -n "$RUN_WITH_BUN" ]; then
  bun -b start
else
  node --run start
fi