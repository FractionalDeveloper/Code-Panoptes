<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Code Panoptes</h1>
        <p class="mt-2 text-gray-600">Scan and analyze your local directories</p>
      </div>

      <div class="space-y-6">
        <div class="text-center">
          <button
            @click="startScanning"
            :disabled="isScanning"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {{ isScanning ? 'Scanning...' : 'Select Directory' }}
          </button>
        </div>

        <ErrorDisplay :error="error" />
        
        <ScanProgress
          v-if="isScanning"
          :progress="progress"
          @stop="stopScanning"
        />

        <template v-if="files.length > 0">
          <FileStats :files="files" />
          <FileFilters
            ref="fileFilters"
            :files="files"
          />
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <div class="p-4 border-b">
              <h2 class="text-lg font-medium text-gray-900">
                Files ({{ filteredFiles.length }})
              </h2>
            </div>
            <FileListHeader />
            <FileList :files="filteredFiles" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  files,
  isScanning,
  error,
  progress,
  startScanning,
  stopScanning
} = useFileScanner();

const fileFilters = ref<InstanceType<typeof FileFilters> | null>(null);
const filteredFiles = computed(() => fileFilters.value?.filteredFiles || []);
</script>