#!/usr/bin/env node
/**
 * Fix server.js routing by moving app.listen() to the end of the file
 * This ensures all routes are registered before the server starts listening
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'server.js');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Pattern to find app.listen in the middle
const listenPattern = /\/\/\s*Start the server\s+app\.listen\(port,\s*\(\)\s*=>\s*\{\s+console\.log\(`Server running at http:\/\/localhost:\$\{port\}`\);\s+\}\);/g;

// Find if app.listen exists in the middle
const listenMatch = listenPattern.exec(content);

if (listenMatch) {
  console.log('Found app.listen() in the middle of file, moving to end...');
  
  // Remove it from the middle
  content = content.replace(listenPattern, '');
  
  // Add it properly at the end
  const appListenCode = `
// Start the server
app.listen(port, () => {
    console.log(\`Server running at http://localhost:\${port}\`);
    initializeSchemas();
});
`;
  
  content = content.trimEnd() + '\n' + appListenCode;
  
  // Write back
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ server.js has been fixed!');
  console.log('  app.listen() moved to the end of the file');
  console.log('  All routes should now be properly registered');
} else {
  console.log('No app.listen() found in middle of file - file may already be correct');
}
