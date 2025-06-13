"use client";

import { useState, useCallback, useEffect } from 'react';
import { AppHeader } from '@/components/core/app-header';
import { AppFooter } from '@/components/core/app-footer';
import { PhotoUpload } from '@/components/features/photo-upload';
import { OptionSelector } from '@/components/features/option-selector';
import { ImageDisplay } from '@/components/features/image-display';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { EMOTION_OPTIONS, STYLE_OPTIONS } from '@/lib/constants';
import { restyledImageGeneration } from '@/ai/flows/restyled-image-generation';
import type { RestyledImageGenerationInput, RestyledImageGenerationOutput } from '@/ai/flows/restyled-image-generation';
import { Sparkles, AlertTriangle } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function StyleShiftPage() {
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [uploadedImageDataUri, setUploadedImageDataUri] = useState<string | null>(null);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [restyledImageDataUri, setRestyledImageDataUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);


  const handlePhotoUploaded = useCallback((file: File, dataUri: string) => {
    setUploadedImageFile(file);
    setUploadedImageDataUri(dataUri);
    setRestyledImageDataUri(null); // Clear previous restyled image
    setError(null);
  }, []);

  const handlePhotoCleared = useCallback(() => {
    setUploadedImageFile(null);
    setUploadedImageDataUri(null);
    setRestyledImageDataUri(null);
    setError(null);
  }, []);

  const handleRestyleImage = async () => {
    if (!uploadedImageDataUri) {
      toast({
        title: 'No Photo Uploaded',
        description: 'Please upload a photo before restyling.',
        variant: 'destructive',
      });
      return;
    }

    if (selectedEmotions.length === 0 && selectedStyles.length === 0) {
       toast({
        title: 'No Options Selected',
        description: 'Please select at least one emotion or style.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setRestyledImageDataUri(null);

    try {
      const input: RestyledImageGenerationInput = {
        photoDataUri: uploadedImageDataUri,
        emotions: selectedEmotions,
        styles: selectedStyles,
      };
      const result: RestyledImageGenerationOutput = await restyledImageGeneration(input);
      setRestyledImageDataUri(result.restyledImage);
    } catch (e: any) {
      console.error('Error restyling image:', e);
      const errorMessage = e.message || 'An unexpected error occurred during image processing.';
      setError(errorMessage);
      toast({
        title: 'Image Processing Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadImage = () => {
    if (!restyledImageDataUri || !uploadedImageFile) return;

    const originalFileName = uploadedImageFile.name.substring(0, uploadedImageFile.name.lastIndexOf('.')) || 'image';
    const mimeType = restyledImageDataUri.substring(restyledImageDataUri.indexOf(':') + 1, restyledImageDataUri.indexOf(';'));
    const extension = mimeType.split('/')[1] || 'png';
    const filename = `styleshift-${originalFileName}-restyled.${extension}`;
    
    const link = document.createElement('a');
    link.href = restyledImageDataUri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: 'Image Downloaded',
      description: `${filename} has started downloading.`,
    });
  };
  
  if (!isMounted) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-background text-foreground">
        <LoadingSpinner size="h-16 w-16" text="Loading StyleShift..." />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-muted to-background text-foreground">
      <AppHeader />
      <main className="flex-grow container mx-auto p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column: Controls (adjusts width for better balance) */}
          <div className="xl:col-span-5 flex flex-col gap-6">
            <PhotoUpload
              onPhotoUploaded={handlePhotoUploaded}
              onPhotoCleared={handlePhotoCleared}
              currentPhotoDataUri={uploadedImageDataUri}
            />
            <OptionSelector
              title="Choose Emotions"
              description="Infuse your photo with feelings."
              options={EMOTION_OPTIONS}
              selectedValues={selectedEmotions}
              onSelectionChange={setSelectedEmotions}
            />
            <OptionSelector
              title="Choose Styles"
              description="Transform your photo's artistic look."
              options={STYLE_OPTIONS}
              selectedValues={selectedStyles}
              onSelectionChange={setSelectedStyles}
            />
            <Card className="shadow-lg sticky bottom-4 xl:bottom-auto xl:static z-10 bg-card/90 backdrop-blur-sm">
              <CardContent className="p-4">
                <Button
                  onClick={handleRestyleImage}
                  disabled={!uploadedImageDataUri || isLoading || (selectedEmotions.length === 0 && selectedStyles.length === 0)}
                  className="w-full text-lg py-6 shadow-md hover:shadow-lg transition-all duration-300"
                  size="lg"
                  aria-live="polite"
                >
                  {isLoading ? (
                    <LoadingSpinner size="h-6 w-6" text="Shifting Styles..." />
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-6 w-6" />
                      Restyle Image
                    </>
                  )}
                </Button>
                {error && !isLoading && (
                   <p className="mt-3 text-sm text-center text-destructive flex items-center justify-center">
                     <AlertTriangle size={16} className="mr-1.5"/> {error.length > 50 ? "Processing failed. See console." : error}
                   </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Image Display */}
          <div className="xl:col-span-7 flex flex-col">
             <div className="sticky top-24"> {/* Make image display sticky */}
                <ImageDisplay
                    originalImageDataUri={uploadedImageDataUri}
                    restyledImageDataUri={restyledImageDataUri}
                    isLoading={isLoading}
                    onDownload={handleDownloadImage}
                    error={error}
                />
            </div>
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
