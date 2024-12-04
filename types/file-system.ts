export interface FileInfo {
  absolutePath: string;
  fileName: string;
  fileSize: number;
  lastModified: Date;
}

export interface ScanProgress {
  filesScanned: number;
  totalFiles: number;
  currentPath: string;
}

export interface ScanError {
  message: string;
  path?: string;
  code?: string;
}