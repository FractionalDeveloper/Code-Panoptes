// Worker implementation without external dependencies
let filesScanned = 0;
const BATCH_SIZE = 100;

// Simple glob pattern matching
function matchGlobPattern(path, pattern) {
  const regexPattern = pattern
    .replace(/\./g, '\\.')
    .replace(/\*/g, '.*')
    .replace(/\?/g, '.');
  return new RegExp(`^${regexPattern}$`).test(path);
}

class GitignoreParser {
  constructor(content) {
    this.patterns = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'));
  }

  isIgnored(path) {
    return this.patterns.some(pattern => {
      const normalizedPattern = pattern.startsWith('/') ? pattern.slice(1) : pattern;
      return matchGlobPattern(path, normalizedPattern);
    });
  }
}

let gitignoreParser = null;

function shouldIgnore(path) {
  if (!gitignoreParser) return false;
  if (path.includes('/.git/') || path === '/.git') return true;
  return gitignoreParser.isIgnored(path);
}

async function processFiles(files) {
  let currentBatch = [];
  let totalFiles = files.length;

  try {
    // Look for .gitignore in the root
    const gitignoreFile = files.find(f => f.webkitRelativePath.endsWith('/.gitignore'));
    if (gitignoreFile) {
      const content = await gitignoreFile.text();
      gitignoreParser = new GitignoreParser(content);
    }

    for (const file of files) {
      if (shouldIgnore(file.webkitRelativePath)) continue;
      
      filesScanned++;
      
      self.postMessage({
        type: 'progress',
        data: {
          filesScanned,
          totalFiles,
          currentPath: file.webkitRelativePath || file.name
        }
      });

      const fileInfo = {
        absolutePath: file.webkitRelativePath || file.name,
        fileName: file.name,
        fileSize: file.size,
        lastModified: new Date(file.lastModified)
      };

      currentBatch.push(fileInfo);

      if (currentBatch.length >= BATCH_SIZE) {
        self.postMessage({
          type: 'files',
          data: currentBatch
        });
        currentBatch = [];
      }
    }

    if (currentBatch.length > 0) {
      self.postMessage({
        type: 'files',
        data: currentBatch
      });
    }

    self.postMessage({ type: 'complete' });
  } catch (err) {
    self.postMessage({
      type: 'error',
      data: {
        message: err.message || 'Error processing files',
        code: 'SCAN_ERROR'
      }
    });
  }
}

self.onmessage = async (event) => {
  const { type, files } = event.data;
  
  if (type === 'scan') {
    filesScanned = 0;
    gitignoreParser = null;
    await processFiles(files);
  }
};