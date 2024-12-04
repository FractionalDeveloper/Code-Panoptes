<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div class="bg-white p-4 rounded-lg shadow">
      <h3 class="text-lg font-medium text-gray-900">Total Size</h3>
      <p class="mt-2 text-2xl font-semibold text-indigo-600">
        {{ formatFileSize(totalSize) }}
      </p>
    </div>
    
    <div class="bg-white p-4 rounded-lg shadow">
      <h3 class="text-lg font-medium text-gray-900">File Types</h3>
      <div class="mt-2 space-y-1">
        <template v-for="[ext, count] of Array.from(fileTypes).slice(0, 3)" :key="ext">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">{{ ext }}</span>
            <span class="font-medium">{{ count }}</span>
          </div>
        </template>
      </div>
    </div>

    <div class="bg-white p-4 rounded-lg shadow">
      <h3 class="text-lg font-medium text-gray-900">Largest Files</h3>
      <div class="mt-2 space-y-1">
        <template v-for="file in largestFiles.slice(0, 3)" :key="file.absolutePath">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600 truncate">{{ file.fileName }}</span>
            <span class="font-medium">{{ formatFileSize(file.fileSize) }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FileInfo } from '~/types/file-system';
import { formatFileSize } from '~/utils/file-size';

const props = defineProps<{
  files: FileInfo[];
}>();

const { totalSize, fileTypes, largestFiles } = useFileStats(toRef(props, 'files'));
</script>