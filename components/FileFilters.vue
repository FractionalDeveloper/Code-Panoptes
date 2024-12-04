<template>
  <div class="bg-white p-4 rounded-lg shadow mb-6">
    <div class="flex flex-wrap gap-4">
      <div class="flex-1 min-w-[200px]">
        <label for="search" class="block text-sm font-medium text-gray-700">Search</label>
        <input
          type="text"
          id="search"
          v-model="searchQuery"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Search files..."
        />
      </div>

      <div class="w-40">
        <label for="sort" class="block text-sm font-medium text-gray-700">Sort By</label>
        <select
          id="sort"
          v-model="sortBy"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="name">Name</option>
          <option value="size">Size</option>
          <option value="date">Date</option>
        </select>
      </div>

      <div class="w-40">
        <label for="type" class="block text-sm font-medium text-gray-700">File Type</label>
        <select
          id="type"
          v-model="fileType"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">All</option>
          <option v-for="type in availableTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FileInfo } from '~/types/file-system';

const props = defineProps<{
  files: FileInfo[];
}>();

const searchQuery = ref('');
const sortBy = ref('name');
const fileType = ref('');

const availableTypes = computed(() => {
  const types = new Set<string>();
  props.files.forEach(file => {
    const ext = file.fileName.split('.').pop()?.toLowerCase();
    if (ext) types.add(ext);
  });
  return Array.from(types).sort();
});

const filteredFiles = computed(() => {
  let result = props.files;

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(file => 
      file.fileName.toLowerCase().includes(query) ||
      file.absolutePath.toLowerCase().includes(query)
    );
  }

  // Apply file type filter
  if (fileType.value) {
    result = result.filter(file => 
      file.fileName.toLowerCase().endsWith(`.${fileType.value}`)
    );
  }

  // Apply sorting
  return [...result].sort((a, b) => {
    switch (sortBy.value) {
      case 'size':
        return b.fileSize - a.fileSize;
      case 'date':
        return b.lastModified.getTime() - a.lastModified.getTime();
      default:
        return a.fileName.localeCompare(b.fileName);
    }
  });
});

// Expose filtered files to parent
defineExpose({
  filteredFiles
});
</script>