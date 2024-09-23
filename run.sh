#!/bin/bash
# Get the filename from the command line arguments
FILENAME=$1

# Replace slashes with directory separator (if any)
DIRNAME=${FILENAME//\//\/}

# Check if the file exists and is readable
if [[ -r "$DIRNAME.ts" ]]; then
  # Execute the TypeScript file
  ts-node "$DIRNAME.ts"
else
  echo "File $DIRNAME.ts not found or not readable"
fi
