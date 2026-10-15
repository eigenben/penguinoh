import type { ImageMetadata } from 'astro';

export interface Photo {
  image: ImageMetadata;
  /** The number from the file name, e.g. "7256" for IMG_7256.jpeg or "1003-2" for "IMG_1003 2.jpeg". */
  entry: string;
  place?: string;
  detail?: string;
}

type Label = [entry: string, place: string, detail?: string];

// Photos whose location or scene is known, in the order they open the stamps section.
// Every other photo follows in file-name order. Add a row here to label a photo.
const labels: Label[] = [
  ['0444', 'Easter Island', 'Chile'],
  ['7973', 'The Siq, Petra', 'Jordan'],
  ['9078', 'Torres del Paine', 'Chile'],
  ['8427', 'Sydney Opera House', 'Australia'],
  ['5776', 'Ngorongoro Crater', 'Tanzania'],
  ['6842', 'Hanoi, in a nón lá', 'Vietnam'],
  ['2132', 'Shwedagon Pagoda', 'Myanmar'],
  ['2258', 'Grand Canyon at sunset', 'United States'],
  ['8936', 'Taipei 101', 'Taiwan'],
  ['0575', 'The salt flats', 'United States'],
  ['7606', 'First class, with champagne', 'In transit'],
  ['3954', 'A frying pan', 'Home (regrettably)'],
  ['7256', 'The Eiffel Tower', 'France'],
  ['6004', 'Among the giraffes', 'The African savanna'],
  ['9787', 'Delicate Arch', 'United States'],
  ['2681', 'Drying on a towel', 'Home (do not touch)'],
  ['7068', 'The rice fields', 'Vietnam'],
  ['2011', 'Inside the freezer', 'Home (briefly)'],
  ['7642', 'A ramen counter', 'Tsukemen and a beer'],
  ['6855', 'A glacier', 'Close to home, sort of'],
  ['1268', 'The Fremont Troll', 'United States'],
  ['3726', 'Route 66', 'Arizona, United States'],
  ['0554', 'The old borax wagon', 'United States'],
  ['2765', 'First class cabin', 'In transit'],
  ['8122', 'Dinner service', 'In transit'],
  ['2831', 'The caviar course', 'In transit'],
  ['2131', 'The seat-back pocket', 'In transit'],
  ['1831', 'A Hello Kitty check-in desk', 'Have a nice trip!'],
  ['2412', 'Up close with a jet engine', 'Stand clear'],
  ['4259', 'A “Penguin Tour” sign', 'Finally, some recognition'],
  ['3233', 'A giant redwood', 'Looking up'],
  ['3749', 'An iron meteorite', 'On display'],
  ['3706', 'A petrified log', 'The desert'],
  ['9529', 'A sandstone slot canyon', 'A small stream'],
  ['3312', 'Below a snow-capped volcano', 'Snowbank seating'],
  ['2502', 'Fresh snow', 'Footprints included'],
  ['4748', 'A mountain lake overlook', 'Pine forest'],
  ['5323', 'A grassy sea cliff', 'Island in view'],
  ['6126', 'A tropical beach resort', 'Palm trees'],
  ['7765', 'Waving at the paddleboarders', 'A sunny lake'],
  ['4791', 'Backlit by a sparkling lake', 'Profile shot'],
  ['8293', 'A lawn full of ibises', 'Close-up'],
  ['1109', 'A pagoda pavilion', 'By the pond'],
  ['9641', 'Behind the wheel', 'Volkswagen'],
  ['2324', 'Blue rock candy', 'Riding shotgun'],
  ['0967', 'Under the hood', 'On a V6'],
  ['2054', 'Atop a bronze frog', 'On gravel'],
  ['2128', 'A vase of river pebbles', 'Against a brick wall'],
  ['5793', 'A bubble bath', 'Home'],
  ['8488', 'Floating in the sink', 'Home'],
  ['0944', 'A striped pillow', 'Nap time'],
  ['4113', 'Helping at the keyboard', 'Office hours'],
];

const modules = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/*.{jpeg,jpg}', {
  eager: true,
});

function entryFor(path: string): string {
  const match = path.match(/IMG_(\d+)(?:[ _](\d+))?\.\w+$/);
  if (!match) return path.split('/').pop()!;
  return match[2] ? `${match[1]}-${match[2]}` : match[1];
}

const all: Photo[] = Object.keys(modules)
  .sort()
  .map((path) => ({ image: modules[path].default, entry: entryFor(path) }));

const byEntry = new Map(all.map((photo) => [photo.entry, photo]));
const labeled: Photo[] = labels.flatMap(([entry, place, detail]) => {
  const photo = byEntry.get(entry);
  return photo ? [{ ...photo, place, detail }] : [];
});
const labeledEntries = new Set(labeled.map((photo) => photo.entry));

export const photos: Photo[] = [...labeled, ...all.filter((photo) => !labeledEntries.has(photo.entry))];
