#!/bin/sh
set -eu

log_file=.augment_git_fix.log
echo start > "$log_file"

git add vite.config.js .github/workflows/deploy.yml
echo added >> "$log_file"

tree=$(git write-tree)
echo "tree=$tree" >> "$log_file"

parent=$(git rev-parse HEAD)
echo "parent=$parent" >> "$log_file"

commit=$(printf 'Configure GitHub Pages deployment\n' | git commit-tree "$tree" -p "$parent")
echo "commit=$commit" >> "$log_file"

git update-ref refs/heads/main "$commit" "$parent"
echo updated_ref >> "$log_file"

git push MC main
echo pushed >> "$log_file"