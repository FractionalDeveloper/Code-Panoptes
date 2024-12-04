import type { FileInfo } from '~/types/file-system';
import { GitignoreParser } from './gitignore-parser';

export class GitAwareScanner {
  private gitignoreParser: GitignoreParser | null = null;

  async initialize(rootHandle: FileSystemDirectoryHandle): Promise<void> {
    try {
      const gitignoreFile = await rootHandle.getFileHandle('.gitignore');
      const content = await (await gitignoreFile.getFile()).text();
      this.gitignoreParser = new GitignoreParser(content);
    } catch {
      // No .gitignore file found, proceed without ignore patterns
      this.gitignoreParser = new GitignoreParser('');
    }
  }

  private shouldIgnore(path: string): boolean {
    if (!this.gitignoreParser) return false;
    
    // Always ignore .git directory
    if (path.includes('/.git/') || path === '/.git') return true;
    
    return this.gitignoreParser.isIgnored(path);
  }

  async* scanDirectory(
    dirHandle: FileSystemDirectoryHandle,
    path = '',
    onProgress: (path: string) => void
  ): AsyncGenerator<FileInfo> {
    if (this.shouldIgnore(path)) return;

    for await (const entry of dirHandle.values()) {
      const entryPath = path ? `${path}/${entry.name}` : entry.name;
      
      if (this.shouldIgnore(entryPath)) continue;

      if (entry.kind === 'file') {
        const file = await entry.getFile();
        onProgress(entryPath);
        
        yield {
          absolutePath: entryPath,
          fileName: entry.name,
          fileSize: file.size,
          lastModified: new Date(file.lastModified)
        };
      } else if (entry.kind === 'directory') {
        try {
          yield* this.scanDirectory(entry, entryPath, onProgress);
        } catch (err) {
          console.error(`Error accessing directory: ${entryPath}`, err);
        }
      }
    }
  }
}