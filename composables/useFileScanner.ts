import { ref } from 'vue';
import type { FileInfo, ScanProgress, ScanError } from '~/types/file-system';
import type { WorkerResponse } from '~/types/worker-messages';

export function useFileScanner() {
  const files = ref<FileInfo[]>([]);
  const isScanning = ref(false);
  const error = ref<ScanError | null>(null);
  const progress = ref<ScanProgress>({
    filesScanned: 0,
    totalFiles: 0,
    currentPath: ''
  });

  const worker = ref<Worker | null>(null);
  const fileInput = ref<HTMLInputElement | null>(null);

  const initializeWorker = () => {
    try {
      worker.value = new Worker('/workers/scanner.worker.js');
      
      worker.value.onmessage = (event) => {
        const message = event.data as WorkerResponse;
        
        switch (message.type) {
          case 'progress':
            progress.value = message.data;
            break;
          case 'files':
            files.value = files.value.concat(message.data);
            break;
          case 'complete':
            isScanning.value = false;
            break;
          case 'error':
            error.value = message.data;
            isScanning.value = false;
            break;
        }
      };

      worker.value.onerror = (event) => {
        console.error('Worker error:', event);
        error.value = {
          message: event.message || 'Worker error occurred',
          code: 'WORKER_ERROR'
        };
        isScanning.value = false;
      };

      return true;
    } catch (err) {
      console.error('Worker initialization error:', err);
      error.value = {
        message: err instanceof Error ? err.message : 'Failed to initialize worker',
        code: 'WORKER_INIT_ERROR'
      };
      isScanning.value = false;
      return false;
    }
  };

  const createFileInput = () => {
    if (!fileInput.value) {
      fileInput.value = document.createElement('input');
      fileInput.value.type = 'file';
      fileInput.value.webkitdirectory = true;
      fileInput.value.style.display = 'none';
      document.body.appendChild(fileInput.value);

      fileInput.value.addEventListener('change', handleFileSelection);
    }
  };

  const handleFileSelection = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    files.value = [];
    error.value = null;
    isScanning.value = true;
    progress.value = {
      filesScanned: 0,
      totalFiles: input.files.length,
      currentPath: ''
    };

    if (!worker.value && !initializeWorker()) {
      return;
    }

    worker.value?.postMessage({
      type: 'scan',
      files: Array.from(input.files)
    });

    // Reset input for future selections
    input.value = '';
  };

  const startScanning = () => {
    try {
      createFileInput();
      fileInput.value?.click();
    } catch (err) {
      console.error('Start scanning error:', err);
      error.value = {
        message: err instanceof Error ? err.message : 'Failed to start scanning',
        code: 'FILE_ACCESS_ERROR'
      };
      isScanning.value = false;
    }
  };

  const stopScanning = () => {
    worker.value?.terminate();
    worker.value = null;
    isScanning.value = false;
  };

  const reset = () => {
    files.value = [];
    error.value = null;
    progress.value = {
      filesScanned: 0,
      totalFiles: 0,
      currentPath: ''
    };
  };

  // Cleanup on component unmount
  onUnmounted(() => {
    if (fileInput.value) {
      document.body.removeChild(fileInput.value);
    }
    worker.value?.terminate();
  });

  return {
    files,
    isScanning,
    error,
    progress,
    startScanning,
    stopScanning,
    reset
  };
}