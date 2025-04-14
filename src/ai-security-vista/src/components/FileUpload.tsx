
import React, { useState } from 'react';
import { Upload, X, Check, ImageIcon, Film } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  title: string;
  description: string;
  acceptedTypes: string;
  isVideo?: boolean;
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  title,
  description,
  acceptedTypes,
  isVideo = false,
  onFileSelect,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    onFileSelect(selectedFile);
    
    // Create preview
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleProcess = () => {
    setProcessing(true);
    
    // Simulate processing with your backend
    setTimeout(() => {
      setProcessing(false);
      setResult("Detection completed successfully!");
      // Here you would integrate with your actual backend code
    }, 2000);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <div className="card-glow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
      <p className="text-gray-300 mb-4">{description}</p>
      
      {!file ? (
        <div
          className={`border-2 border-dashed ${
            isDragging ? 'border-neonBlue' : 'border-gray-600'
          } rounded-lg p-8 text-center cursor-pointer transition-colors`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById(`file-upload-${title}`)?.click()}
        >
          <input
            type="file"
            id={`file-upload-${title}`}
            className="hidden"
            accept={acceptedTypes}
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center justify-center">
            <Upload className="h-12 w-12 text-gray-400 mb-3" />
            <p className="text-gray-300 mb-2">
              Drag and drop your {isVideo ? 'video' : 'image'} here, or click to browse
            </p>
            <p className="text-gray-500 text-sm">
              {isVideo ? 'MP4, WebM, Ogg' : 'JPG, PNG, GIF'} up to 10MB
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <button
              onClick={clearFile}
              className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full"
            >
              <X size={16} />
            </button>
            
            {preview && (
              <div className="rounded-lg overflow-hidden border border-gray-700">
                {isVideo ? (
                  <video
                    src={preview}
                    controls
                    className="w-full max-h-[300px] object-contain"
                  />
                ) : (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full max-h-[300px] object-contain"
                  />
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-300">
              {isVideo ? <Film size={16} className="mr-2" /> : <ImageIcon size={16} className="mr-2" />}
              <span className="truncate max-w-[200px]">{file.name}</span>
            </div>
            
            <Button
              onClick={handleProcess}
              disabled={processing}
              className="neon-button"
            >
              {processing ? (
                <span className="flex items-center">
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  Process {isVideo ? 'Video' : 'Image'}
                </span>
              )}
            </Button>
          </div>
          
          {result && (
            <div className="mt-4 p-3 bg-neonBlue/10 border border-neonBlue/30 rounded-lg text-white flex items-center">
              <Check className="h-5 w-5 text-neonBlue mr-2" />
              {result}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
