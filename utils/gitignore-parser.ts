import { minimatch } from 'minimatch';

export class GitignoreParser {
  private patterns: string[] = [];

  constructor(gitignoreContent: string) {
    this.patterns = gitignoreContent
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'));
  }

  isIgnored(path: string): boolean {
    return this.patterns.some(pattern => {
      // Remove leading slash if present
      const normalizedPattern = pattern.startsWith('/') ? pattern.slice(1) : pattern;
      return minimatch(path, normalizedPattern, { dot: true });
    });
  }
}