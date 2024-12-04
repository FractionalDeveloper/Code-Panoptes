import { computed } from 'vue';
import type { FileInfo } from '~/types/file-system';

export function useFileStats(files: Ref<FileInfo[]>) {
  const totalSize = computed(() => 
    files.value.reduce((sum, file) => sum + file.fileSize, 0)
  );

  const fileTypes = computed(() => {
    const types = new Map<string, number>();
    files.value.forEach(file => {
      const ext = file.fileName.split('.').pop()?.toLowerCase() || 'unknown';
      types.set(ext, (types.get(ext) || 0) + 1);
    });
    return types;
  });

  const largestFiles = computed(() => 
    [...files.value]
      .sort((a, b) => b.fileSize - a.fileSize)
      .slice(0, 5)
  );

  return {
    totalSize,
    fileTypes,
    largestFiles
  };
}