import os
import re
import glob

for filename in glob.glob("app/**/page.tsx", recursive=True):
    with open(filename, "r") as f:
        content = f.read()

    # Skip if already wrapped
    if "Wrapper" in content or "Suspense" in content:
        continue

    match = re.search(r'export default async function ([A-Za-z0-9_]+)\s*\(\)\s*\{', content)
    if match:
        func_name = match.group(1)
        wrapper = f"""import {{ Suspense }} from "react";

export default function {func_name}Wrapper() {{
  return (
    <Suspense fallback={{null}}>
      <{func_name} />
    </Suspense>
  );
}}

async function {func_name}() {{"""
        new_content = content[:match.start()] + wrapper + content[match.end():]
        with open(filename, "w") as f:
            f.write(new_content)
        print(f"Updated {filename}")
