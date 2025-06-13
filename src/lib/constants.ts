import type { LucideIcon } from 'lucide-react';
import { Smile, Frown, Drama, Leaf, Zap, CloudSun, Shapes, Unplug, Palette, Brush, TerminalSquare, Cog, Wand2, Ghost, Rocket, Feather } from 'lucide-react';

export interface OptionItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const EMOTION_OPTIONS: OptionItem[] = [
  { id: 'happy', label: 'Happy', icon: Smile },
  { id: 'sad', label: 'Sad', icon: Frown },
  { id: 'playful', label: 'Playful', icon: Drama },
  { id: 'calm', label: 'Calm', icon: Leaf },
  { id: 'energetic', label: 'Energetic', icon: Zap },
  { id: 'dreamy', label: 'Dreamy', icon: CloudSun },
  { id: 'mysterious', label: 'Mysterious', icon: Ghost },
];

export const STYLE_OPTIONS: OptionItem[] = [
  { id: 'abstract', label: 'Abstract', icon: Shapes },
  { id: 'surreal', label: 'Surreal', icon: Unplug },
  { id: 'pop-art', label: 'Pop Art', icon: Palette },
  { id: 'impressionist', label: 'Impressionist', icon: Brush },
  { id: 'cyberpunk', label: 'Cyberpunk', icon: TerminalSquare },
  { id: 'steampunk', label: 'Steampunk', icon: Cog },
  { id: 'fantasy', label: 'Fantasy', icon: Wand2 },
  { id: 'futuristic', label: 'Futuristic', icon: Rocket },
  { id: 'ethereal', label: 'Ethereal', icon: Feather },
];

export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
