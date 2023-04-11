#!/usr/bin/env bash

search_dir=./test
for entry in "$search_dir"/*; do
    if [ -d "$entry" ]; then
        for subentry in "$entry"/*; do
            if grep -q "test.only" "$subentry"; then
                echo "Found 'test.only' in $subentry"
                exit 1
            fi
        done
    fi
done
