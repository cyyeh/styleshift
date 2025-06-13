"use client";

import type { LucideIcon } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Option {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface OptionSelectorProps {
  title: string;
  description: string;
  options: Option[];
  selectedValues: string[];
  onSelectionChange: (newValues: string[]) => void;
  maxHeight?: string; // e.g., "h-[200px]"
}

export function OptionSelector({
  title,
  description,
  options,
  selectedValues,
  onSelectionChange,
  maxHeight = "h-[250px]"
}: OptionSelectorProps) {
  
  const handleCheckedChange = (optionId: string, checked: boolean | 'indeterminate') => {
    if (typeof checked === 'boolean') {
      const newSelectedValues = checked
        ? [...selectedValues, optionId]
        : selectedValues.filter((id) => id !== optionId);
      onSelectionChange(newSelectedValues);
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className={maxHeight}>
          <div className="space-y-3 pr-4">
            {options.map((option) => {
              const IconComponent = option.icon;
              const isSelected = selectedValues.includes(option.id);
              return (
                <Label
                  key={option.id}
                  htmlFor={`option-${title.toLowerCase().replace(/\s+/g, '-')}-${option.id}`}
                  className={`flex items-center p-3 rounded-md border transition-all duration-200 cursor-pointer hover:border-primary hover:bg-primary/10 ${
                    isSelected ? 'border-primary bg-primary/20 shadow-md' : 'border-border bg-card hover:bg-muted/50'
                  }`}
                >
                  <Checkbox
                    id={`option-${title.toLowerCase().replace(/\s+/g, '-')}-${option.id}`}
                    checked={isSelected}
                    onCheckedChange={(checked) => handleCheckedChange(option.id, checked)}
                    className="mr-3 h-5 w-5"
                    aria-labelledby={`label-${title.toLowerCase().replace(/\s+/g, '-')}-${option.id}`}
                  />
                  <IconComponent className={`mr-2 h-5 w-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} aria-hidden="true" />
                  <span id={`label-${title.toLowerCase().replace(/\s+/g, '-')}-${option.id}`} className={`text-sm font-medium ${isSelected ? 'text-primary-foreground' : 'text-foreground'}`}>
                    {option.label}
                  </span>
                </Label>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
