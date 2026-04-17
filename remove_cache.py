import glob

for filename in glob.glob("app/**/page.tsx", recursive=True):
    with open(filename, "r") as f:
        lines = f.readlines()
        
    new_lines = []
    for line in lines:
        if '"use cache"' in line or "'use cache'" in line:
            continue
        if 'cacheLife(' in line:
            continue
        if 'import { cacheLife } from "next/cache";' in line:
            continue
        new_lines.append(line)
        
    with open(filename, "w") as f:
        f.writelines(new_lines)
    print(f"Cleaned {filename}")
