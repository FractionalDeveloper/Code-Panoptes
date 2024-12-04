import type { FileInfo } from '~/types/file-system';

export async function* getFilesRecursively(
  dirHandle: FileSystemDirectoryHandle,
  path = '',
  onProgress: (path: string) => void
): AsyncGenerator<FileInfo> {
  for await (const entry of dirHandle.values()) {
    const entryPath = `${path}/${entry.name}`;
    
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
        yield* getFilesRecursively(entry, entryPath, onProgress);
      } catch (err) {
        console.error(`Error accessing directory: ${entryPath}`, err);
      }
    }
  }
}

export function processBatch<T>(
  items: T[],
  batchSize: number,
  processor: (batch: T[]) => void
): void {
  if (items.length >= batchSize) {
    processor(items);
    items.length = 0;
  }
}