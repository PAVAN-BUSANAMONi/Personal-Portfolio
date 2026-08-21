const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");
const buildDir = path.join(rootDir, "build");
const publicDir = path.join(rootDir, "public");

// Ensure build directory exists
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
    console.log(`Copied ${path.basename(src)} -> ${dest}`);
  }
}

function copyDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 1. Copy core files to build/
const coreFiles = [
  "index.html",
  "styles.css",
  "script.js",
  "pavan-portrait-cutout.png",
  "splitframe-right-custom.png",
  "splitframe-right-orig.png"
];

for (const file of coreFiles) {
  const src = path.join(rootDir, file);
  copyFile(src, path.join(buildDir, file));
  copyFile(src, path.join(publicDir, file));
}

// 2. Copy public/projects to build/public/projects and build/projects
const projectsSrc = path.join(rootDir, "public", "projects");
copyDir(projectsSrc, path.join(buildDir, "public", "projects"));
copyDir(projectsSrc, path.join(buildDir, "projects"));

// 3. Copy certificates to build/certificates and public/certificates
const certsSrc = path.join(rootDir, "certificates");
copyDir(certsSrc, path.join(buildDir, "certificates"));
copyDir(certsSrc, path.join(publicDir, "certificates"));

// 4. Copy pavan photos to build/pavan and public/pavan
const pavanSrc = path.join(rootDir, "pavan");
copyDir(pavanSrc, path.join(buildDir, "pavan"));
copyDir(pavanSrc, path.join(publicDir, "pavan"));

// 5. Copy other public assets to build/
copyDir(publicDir, buildDir);

console.log("Build completed successfully for Vercel!");
