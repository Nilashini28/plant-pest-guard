import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onRemoveFile: () => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  selectedFile,
  onRemoveFile,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      onFileSelect(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  if (selectedFile) {
    return (
      <Card className="p-6 border-2 border-botanical-light bg-gradient-to-br from-botanical-light/30 to-growth-light/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-botanical/10 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-botanical" />
            </div>
            <div>
              <p className="font-medium text-foreground">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemoveFile}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={`
        p-8 border-2 border-dashed cursor-pointer transition-all duration-200
        ${
          isDragOver
            ? 'border-botanical bg-botanical-light/20 scale-[1.02]'
            : 'border-border hover:border-botanical/50 hover:bg-botanical-light/10'
        }
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <div className="text-center">
        <div className="w-16 h-16 bg-botanical/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload className="w-8 h-8 text-botanical" />
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Upload Plant Image
        </h3>
        
        <p className="text-muted-foreground mb-4">
          Drag and drop your plant image here, or click to browse
        </p>
        
        <Button variant="botanical" className="mt-2">
          Choose Image
        </Button>
        
        <p className="text-xs text-muted-foreground mt-4">
          Supports JPG, PNG, WebP up to 10MB
        </p>
      </div>
    </Card>
  );
};