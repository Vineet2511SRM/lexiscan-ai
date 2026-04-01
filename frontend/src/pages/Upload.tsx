import { useState, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { FileUp, X, FileText } from "lucide-react";

export default function Upload() {
  const [, setLocation] = useLocation();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = ["application/pdf", "image/jpeg", "image/png"];
  const acceptedExtensions = [".pdf", ".jpg", ".jpeg", ".png"];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && acceptedTypes.includes(dropped.type)) {
      setFile(dropped);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLocation("/dashboard"), 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 250);
  };

  const handleClear = () => {
    setFile(null);
    setProgress(0);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12" data-testid="page-upload">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-foreground" data-testid="text-upload-title">
            Upload Legal Document
          </h1>
          <p className="mt-2 text-sm text-muted-foreground" data-testid="text-upload-subtitle">
            Supported formats: PDF, JPG, PNG
          </p>
        </div>

        <div className="bg-white border border-border rounded-lg p-6 shadow-[var(--shadow-sm)]">
          {!isProcessing ? (
            <>
              <div
                onClick={() => !file && fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative rounded-lg border-2 border-dashed p-10 text-center transition-colors cursor-pointer ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : file
                    ? "border-border bg-card cursor-default"
                    : "border-border hover:border-primary/50 hover:bg-accent"
                }`}
                data-testid="dropzone"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={acceptedExtensions.join(",")}
                  onChange={handleFileSelect}
                  className="hidden"
                  data-testid="input-file"
                />

                {file ? (
                  <div className="flex items-center justify-center gap-3">
                    <FileText className="w-8 h-8 text-primary flex-shrink-0" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground truncate max-w-[220px]" data-testid="text-filename">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5" data-testid="text-filesize">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center">
                        <FileUp className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      Drag and drop your file here
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      or click to browse files
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleUpload}
                  disabled={!file}
                  className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                  data-testid="button-upload-file"
                >
                  Upload File
                </button>
                {file && (
                  <button
                    onClick={handleClear}
                    className="flex items-center gap-1.5 px-4 py-2.5 border border-border text-sm font-medium text-foreground rounded-md hover:bg-accent transition-colors"
                    data-testid="button-clear-file"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="py-6" data-testid="upload-processing">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground" data-testid="text-processing">
                  Processing document...
                </span>
                <span className="text-sm text-muted-foreground">{Math.min(Math.round(progress), 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden" data-testid="progress-bar">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Analyzing clauses and detecting risks...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
