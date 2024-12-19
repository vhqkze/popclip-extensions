#!/usr/bin/env zsh

echo -n "$(echo -n "${POPCLIP_TEXT}" | jq -c)"
