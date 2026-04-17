import os
import re
import glob

for filename in glob.glob("app/**/page.tsx", recursive=True):
    with open(filename, "r") as f:
        content = f.read()

    # Skip if already cached
    if '"use cache"' in content:
        continue

    # Add import
    if 'cacheLife' not in content:
        content = 'import { cacheLife } from "next/cache";\n' + content

    # Find the async component function (the main one that was wrapped or the original)
    # usually named like async function BaselBriefing...
    match = re.search(r'(async function\s+[A-Za-z0-9_]+\s*\([^)]*\)\s*\{)', content)
    if match:
        new_text = match.group(1) + '\n  "use cache";\n  cacheLife("days");'
        content = content[:match.start()] + new_text + content[match.end():]
        
        with open(filename, "w") as f:
            f.write(content)
        print(f"Updated {filename}")

