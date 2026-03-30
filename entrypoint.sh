#!/bin/sh

if [ -n "$RUN_WITH_BUN" ]; then
  bun -b run start
elif [ -n "$RUN_WITH_DENO" ]; then
  deno task start
else
  node --run start
fi