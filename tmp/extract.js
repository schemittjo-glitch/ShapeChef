const fs = require("fs");
const code = fs.readFileSync("/tmp/lovable_bundle.js", "utf8");

// Extract all asset mappings
const assetRegex = /([a-zA-Z0-9_$]+)\s*=\s*["'](\/assets\/[^"']+\.(?:png|jpg|jpeg|webp|svg|avif))["']/g;
const imageMap = {};
let match;
while ((match = assetRegex.exec(code)) !== null) {
  imageMap[match[1]] = match[2];
}

// Also check objects with url
const objImgRegex = /([a-zA-Z0-9_$]+)\s*=\s*\{\s*url:\s*["']([^"']+)["']/g;
while ((match = objImgRegex.exec(code)) !== null) {
  imageMap[match[1]] = match[2];
}

console.log("Image map count:", Object.keys(imageMap).length);

// Let's locate all recipe definitions
// Each recipe has id, name, category, image, protein, calories, carbs, fat, etc.
let start = 0;
while (true) {
  const idx = code.indexOf('{id:"', start);
  if (idx === -1) break;
  // check if it has category: or prepTime:
  const snippet = code.slice(idx, idx + 400);
  if (snippet.includes('category:"') && snippet.includes('protein:')) {
    console.log("Found recipe at index", idx);
    console.log("Snippet:", snippet.slice(0, 150));
    break;
  }
  start = idx + 1;
}

// Let's find the entire array containing all recipes
const arrayStart = code.lastIndexOf('[', start);
console.log("Array start:", arrayStart);

// Let's find the closing bracket of this array
let depth = 0;
let arrayEnd = -1;
for (let i = arrayStart; i < code.length; i++) {
  if (code[i] === '[') depth++;
  else if (code[i] === ']') {
    depth--;
    if (depth === 0) {
      arrayEnd = i + 1;
      break;
    }
  }
}
console.log("Array end:", arrayEnd, "Length:", arrayEnd - arrayStart);

const arrayCode = code.slice(arrayStart, arrayEnd);
fs.writeFileSync("/tmp/raw_recipes_array.js", arrayCode);
console.log("Saved raw recipes array to /tmp/raw_recipes_array.js");
