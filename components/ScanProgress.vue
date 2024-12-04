<template>
  <div class="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-4">
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-900">Scanning Progress</h3>
        <span class="text-sm text-gray-500">
          {{ progress.filesScanned }} files scanned
        </span>
      </div>
      
      <div class="overflow-hidden text-sm text-gray-500 truncate">
        {{ progress.currentPath }}
      </div>

      <button
        @click="$emit('stop')"
        class="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Stop Scanning
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ScanProgress } from '~/types/file-system';

defineProps<{
  progress: ScanProgress;
}>();

defineEmits<{
  (e: 'stop'): void;
}>();
</script>