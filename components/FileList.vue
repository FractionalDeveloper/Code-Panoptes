<template>
  <div class="w-full">
    <RecycleScroller
      class="scroller h-[600px]"
      :items="files"
      :item-size="72"
      key-field="absolutePath"
      v-slot="{ item: file }"
    >
      <div class="p-4 border-b hover:bg-gray-50 transition-colors">
        <div class="grid grid-cols-12 gap-4 items-center">
          <div class="col-span-6">
            <div class="flex items-center space-x-3">
              <div class="flex-shrink-0">
                <FileIcon :fileName="file.fileName" />
              </div>
              <div class="min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ file.fileName }}
                </p>
                <p class="text-xs text-gray-500 truncate">
                  {{ getRelativePath(file.absolutePath) }}
                </p>
              </div>
            </div>
          </div>
          
          <div class="col-span-2 text-sm text-gray-500">
            {{ formatFileSize(file.fileSize) }}
          </div>
          
          <div class="col-span-3 text-sm text-gray-500">
            {{ formatDate(file.lastModified) }}
          </div>
          
          <div class="col-span-1 flex justify-end">
            <button
              class="text-gray-400 hover:text-gray-600"
              @click="copyPath(file.absolutePath)"
              title="Copy path"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </RecycleScroller>
  </div>
</template>

<script setup lang="ts">
import type { FileInfo } from '~/types/file-system';
import { RecycleScroller } from 'vue-virtual-scroller';
import { formatFileSize } from '~/utils/file-size';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

const props = defineProps<{
  files: FileInfo[];
}>();

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('default', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const getRelativePath = (path: string) => {
  const parts = path.split('/');
  if (parts.length <= 2) return path;
  return '.../' + parts.slice(-2).join('/');
};

const copyPath = async (path: string) => {
  try {
    await navigator.clipboard.writeText(path);
  } catch (err) {
    console.error('Failed to copy path:', err);
  }
};
</script>