"use client";

import Image from 'next/image';
import { type ChangeEvent, useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UploadCloud, XCircle, FileImage } from 'lucide-react';
import { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB, ACCEPTED_IMAGE_TYPES } from '@/lib/constants';

interface PhotoUploadProps {
  onPhotoUploaded: (file: File, dataUri: string) => void;
  onPhotoCleared: () => void;
  currentPhotoDataUri: string | null;
}

export function PhotoUpload({ onPhotoUploaded, onPhotoCleared, currentPhotoDataUri }: PhotoUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setError(null);

      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setError(`Invalid file type. Please upload an image (${ACCEPTED_IMAGE_TYPES.join(', ')}).`);
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        setError(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`);
        return;
      }

      try {
        const dataUri = await fileToDataUri(file);
        onPhotoUploaded(file, dataUri);
      } catch (e) {
        console.error("Error reading file:", e);
        setError("Could not read the selected file. Please try again.");
      }
    }
    // Reset file input to allow re-uploading the same file if cleared
    if(fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [onPhotoUploaded]);

  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleClearPhoto = () => {
    setError(null);
    onPhotoCleared();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Upload Your Photo</CardTitle>
        <CardDescription>Select an image to begin the StyleShift magic.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Input
          id="photo-upload-input"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={ACCEPTED_IMAGE_TYPES.join(',')}
          className="hidden"
          aria-labelledby="photo-upload-button"
        />
        
        {!currentPhotoDataUri && (
          <button
            type="button"
            onClick={triggerFileInput}
            aria-label="Upload a photo"
            className="w-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-border hover:border-primary rounded-lg cursor-pointer transition-colors duration-200 bg-muted/50 hover:bg-muted"
          >
            <UploadCloud className="w-12 h-12 text-muted-foreground mb-3" />
            <span className="text-lg font-medium text-foreground">Click or drag to upload</span>
            <span className="text-sm text-muted-foreground">PNG, JPG, GIF, WEBP up to {MAX_FILE_SIZE_MB}MB</span>
          </button>
        )}

        {currentPhotoDataUri && (
          <div className="space-y-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border shadow-inner bg-muted/30">
              <Image
                src={currentPhotoDataUri}
                alt="Uploaded photo preview"
                layout="fill"
                objectFit="contain"
                className="transition-opacity duration-300 ease-in-out"
                data-ai-hint="user uploaded image"
              />
            </div>
             <div className="flex space-x-2">
              <Button onClick={triggerFileInput} variant="outline" className="flex-1">
                <FileImage className="mr-2 h-4 w-4" /> Change Photo
              </Button>
              <Button onClick={handleClearPhoto} variant="destructive" className="flex-1">
                <XCircle className="mr-2 h-4 w-4" /> Clear Photo
              </Button>
            </div>
          </div>
        )}
        
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
