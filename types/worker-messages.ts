import type { FileInfo, ScanProgress, ScanError } from './file-system';

export type WorkerMessageType = 'scan' | 'progress' | 'files' | 'complete' | 'error';

export interface WorkerMessage {
  type: WorkerMessageType;
  data?: any;
}

export interface ScanMessage extends WorkerMessage {
  type: 'scan';
  files: File[];
}

export interface ProgressMessage extends WorkerMessage {
  type: 'progress';
  data: ScanProgress;
}

export interface FilesMessage extends WorkerMessage {
  type: 'files';
  data: FileInfo[];
}

export interface ErrorMessage extends WorkerMessage {
  type: 'error';
  data: ScanError;
}

export interface CompleteMessage extends WorkerMessage {
  type: 'complete';
}

export type WorkerResponse = ProgressMessage | FilesMessage | ErrorMessage | CompleteMessage;