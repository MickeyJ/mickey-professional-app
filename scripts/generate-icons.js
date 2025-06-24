// scripts/generate-icons.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Icon size configurations
const iconSizes = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'favicon-48x48.png': 48,
  'apple-touch-icon.png': 180,
  'android-chrome-192x192.png': 192,
  'android-chrome-512x512.png': 512,
  'icon-192.png': 192,
  'icon-512.png': 512,
};

// Ensure directory exists
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Generate icons from source
const generateIcons = async (sourcePath, outputDir, name) => {
  console.log(`\n🎨 Generating icons for ${name}...`);
  console.log(`   Source: ${sourcePath}`);
  console.log(`   Output: ${outputDir}`);

  try {
    ensureDir(outputDir);
    const generatedFiles = [];

    // Load the source image
    const sourceBuffer = await sharp(sourcePath).toBuffer();

    // Generate each icon size
    for (const [filename, size] of Object.entries(iconSizes)) {
      console.log(`   Creating ${filename} (${size}x${size})...`);
      
      try {
        await sharp(sourceBuffer)
          .resize(size, size, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 }
          })
          .png()
          .toFile(path.join(outputDir, filename));
        
        generatedFiles.push(filename);
      } catch (err) {
        console.error(`   ⚠️  Failed to create ${filename}:`, err.message);
      }
    }

    // Special handling for favicon.ico (multi-size)
    console.log(`   Creating favicon.ico...`);
    try {
      // For now, just copy the 32x32 as favicon.ico
      // (Proper .ico generation would require additional packages)
      const favicon32 = await sharp(sourceBuffer)
        .resize(32, 32)
        .png()
        .toBuffer();
      
      // Note: This creates a PNG named .ico, which works in most browsers
      // For a proper .ico file, you'd need a package like 'png-to-ico'
      fs.writeFileSync(path.join(outputDir, 'favicon.ico'), favicon32);
      generatedFiles.push('favicon.ico');
    } catch (err) {
      console.error(`   ⚠️  Failed to create favicon.ico:`, err.message);
    }

    console.log(`✅ Generated ${generatedFiles.length} icons for ${name}`);
    return generatedFiles;

  } catch (error) {
    console.error(`❌ Error generating icons for ${name}:`, error.message);
    throw error;
  }
};

// Main function
const generateAllIcons = async () => {
  try {
    console.log('🚀 Starting icon generation with Sharp...\n');

    const portfolioSource = './assets/portfolio-logo.png';
    const faoSource = './assets/fao-logo.svg';

    // Check if files exist
    if (!fs.existsSync(portfolioSource)) {
      console.error(`❌ Source file not found: ${portfolioSource}`);
      return;
    }

    if (!fs.existsSync(faoSource)) {
      console.error(`❌ Source file not found: ${faoSource}`);
      return;
    }

    // Generate portfolio icons
    await generateIcons(
      portfolioSource,
      './public/icons/portfolio',
      'Mickey Malotte Portfolio'
    );

    // Generate FAO icons
    await generateIcons(
      faoSource,
      './public/icons/fao',
      'FAO Data Explorer'
    );

    console.log('\n🎉 All icons generated successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Check the generated icons in public/icons/');
    console.log('   2. Update your manifest.ts files to reference these icons');
    console.log('   3. For better favicon.ico support, consider using png-to-ico package');

  } catch (error) {
    console.error('\n❌ Failed to generate icons:', error);
  }
};

// Run it
generateAllIcons();