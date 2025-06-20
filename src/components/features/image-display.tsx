
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, ImageIcon } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { cn } from '@/lib/utils';

interface ImageDisplayProps {
  originalImageDataUri: string | null;
  restyledImageDataUri: string | null;
  isLoading: boolean;
  onDownload: () => void;
  error?: string | null;
}

const ImageCard = ({ title, imageDataUri, isPlaceholder = false, placeholderText, 'data-ai-hint': dataAiHint }: { title: string, imageDataUri: string | null, isPlaceholder?: boolean, placeholderText: string, 'data-ai-hint'?: string }) => (
  <Card className="flex-1 min-w-[280px] shadow-lg">
    <CardHeader>
      <CardTitle className="text-xl font-headline text-center">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="relative aspect-video w-full bg-muted/50 rounded-lg overflow-hidden border border-border shadow-inner">
        {imageDataUri ? (
          <Image
            src={imageDataUri}
            alt={title}
            fill
            className="object-contain transition-opacity duration-500 ease-in-out"
            data-ai-hint={dataAiHint || (isPlaceholder ? 'placeholder image' : title.toLowerCase().replace(/\s+/g, ' '))}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4">
            <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-sm text-center">{placeholderText}</p>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);


export function ImageDisplay({
  originalImageDataUri,
  restyledImageDataUri,
  isLoading,
  onDownload,
  error,
}: ImageDisplayProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-6">
        {originalImageDataUri && (
           <ImageCard 
            title="Original Photo" 
            imageDataUri={originalImageDataUri} 
            placeholderText="Upload a photo to see it here."
            data-ai-hint="original photo"
          />
        )}

        <div className="flex-1 min-w-[280px]">
          <Card className="shadow-lg h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-headline text-center">Restyled Photo</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <LoadingSpinner size="h-12 w-12" text="Styling your image..." />
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-destructive">
                  <p className="font-semibold">Oops! Something went wrong.</p>
                  <p className="text-sm">{error}</p>
                </div>
              ) : restyledImageDataUri ? (
                <div className="w-full space-y-4">
                  <div className="relative aspect-video w-full bg-muted/50 rounded-lg overflow-hidden border border-border shadow-inner">
                    <Image
                      src={restyledImageDataUri}
                      alt="Restyled photo"
                      fill
                      className="object-contain"
                      data-ai-hint="restyled photo abstract"
                    />
                  </div>
                  <Button onClick={onDownload} className="w-full" size="lg">
                    <Download className="mr-2 h-5 w-5" />
                    Download Restyled Photo
                  </Button>
                </div>
              ) : (
                 <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center">
                  <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-sm">Your restyled image will appear here.</p>
                  {!originalImageDataUri && <p className="text-xs mt-1">Start by uploading a photo.</p>}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
