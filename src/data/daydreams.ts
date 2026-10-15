import type { ImageMetadata } from 'astro';
import watercolorVenice from '../assets/daydreams/watercolor-venice.jpg';
import parisPoster from '../assets/daydreams/paris-poster.jpg';
import shibuya from '../assets/daydreams/shibuya.jpg';
import goldenGate from '../assets/daydreams/golden-gate.jpg';
import claymationKitchen from '../assets/daydreams/claymation-kitchen.jpg';
import studioPortrait from '../assets/daydreams/studio-portrait.jpg';

export const generatorUrl = 'https://huggingface.co/eigenben/penguinoh-flux2-klein-base-4b';
export const generatorRepo = 'eigenben/penguinoh-flux2-klein-base-4b';

export interface Daydream {
  image: ImageMetadata;
  prompt: string;
  alt: string;
}

// AI-generated samples from the penguinoh_generator model card, with the prompts that made them.
export const daydreams: Daydream[] = [
  {
    image: watercolorVenice,
    prompt: 'a watercolor painting of pngnh the Stuffed Penguin riding in a gondola in Venice',
    alt: 'AI-generated watercolor of Penguinoh riding a gondola in Venice',
  },
  {
    image: parisPoster,
    prompt:
      'a vintage 1960s travel poster of pngnh the Stuffed Penguin in front of the Eiffel Tower, bold flat colors, the text "PARIS"',
    alt: 'AI-generated vintage travel poster of Penguinoh in Paris',
  },
  {
    image: shibuya,
    prompt:
      'a photo of pngnh the Stuffed Penguin seen from the side, walking across Shibuya crossing in Tokyo at night with neon signs',
    alt: 'AI-generated photo of Penguinoh crossing Shibuya at night',
  },
  {
    image: goldenGate,
    prompt: 'a photo of pngnh the Stuffed Penguin in front of the Golden Gate Bridge on a foggy morning, upper body',
    alt: 'AI-generated photo of Penguinoh in front of the Golden Gate Bridge',
  },
  {
    image: claymationKitchen,
    prompt: 'a claymation still of pngnh the Stuffed Penguin baking bread in a cozy kitchen',
    alt: 'AI-generated claymation still of Penguinoh baking bread',
  },
  {
    image: studioPortrait,
    prompt: 'a studio portrait photo of pngnh the Stuffed Penguin, soft lighting, plain gray background',
    alt: 'AI-generated studio portrait of Penguinoh',
  },
];
