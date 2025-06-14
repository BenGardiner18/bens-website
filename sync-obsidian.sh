#!/bin/bash

# Simple sync script for Obsidian vault to Next.js writings
# Usage: ./sync-obsidian.sh /path/to/your/obsidian/vault

OBSIDIAN_VAULT="$1"
CONTENT_DIR="./content"
PUBLIC_DIR="./public"

if [ -z "$OBSIDIAN_VAULT" ]; then
    echo "Usage: $0 /path/to/your/obsidian/vault"
    echo "Example: $0 ~/Documents/MyObsidianVault"
    exit 1
fi

if [ ! -d "$OBSIDIAN_VAULT" ]; then
    echo "Error: Obsidian vault directory not found: $OBSIDIAN_VAULT"
    exit 1
fi

echo "Syncing from: $OBSIDIAN_VAULT"
echo "To: $CONTENT_DIR and $PUBLIC_DIR"

# Create directories if they don't exist
mkdir -p "$CONTENT_DIR/writings"
mkdir -p "$PUBLIC_DIR/images"

# Sync markdown files
echo "Copying markdown files..."
rsync -av --include="*.md" --exclude="*" "$OBSIDIAN_VAULT/" "$CONTENT_DIR/writings/"

# Sync images to public folder (where Next.js serves static files)
echo "Copying images..."
rsync -av --include="*.jpg" --include="*.jpeg" --include="*.png" --include="*.gif" --include="*.webp" --include="*.svg" --exclude="*" "$OBSIDIAN_VAULT/" "$PUBLIC_DIR/images/"

# Remove .obsidian folder if it was copied
rm -rf "$CONTENT_DIR/writings/.obsidian" 2>/dev/null

echo "Sync complete!"
echo "Images are now in: $PUBLIC_DIR/images/"
echo "Reference them in markdown as: ![Alt text](/images/filename.jpg)"
echo "You can now run: npm run build" 