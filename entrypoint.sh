#!/bin/sh

if [ -n "$RUN_WITH_BUN" ]; then
  bun -b start
elif [ -n "$RUN_WITH_DENO" ]; then
  deno x jeasx start
else
  node --run start
fi