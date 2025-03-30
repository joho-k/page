import os
from urllib.parse import quote

BASE_URL = "https://joho-kyoshitsu.com"
OUTPUT_FILE = "sitemap.xml"

urls = []

for root, _, files in os.walk("."):
    for file in files:
        if file.endswith(".html"):
            rel_path = os.path.join(root, file).replace("./", "").replace("\\", "/")
            url = f"{BASE_URL}/{quote(rel_path)}"
            urls.append(url)

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
    for url in urls:
        f.write("  <url>\n")
        f.write(f"    <loc>{url}</loc>\n")
        f.write("  </url>\n")
    f.write('</urlset>\n')

print(f"✅ sitemap.xml generated with {len(urls)} URLs.")
