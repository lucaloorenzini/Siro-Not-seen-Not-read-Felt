// Struttura dei contenuti: ogni opera è un file .md in src/content/opere/.
// Per aggiungere un'opera basta copiare un file esistente e cambiarne i dati.
import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const SERIE = {
  felt: 'Felt',
  money: 'Money',
  ljubav: 'Ljubav',
  'parole-e-potere': 'Parole e potere',
  'griglie-di-lettere': 'Griglie di lettere',
  'altre-opere': 'Altre opere',
} as const;

const opere = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/opere' }),
  schema: ({ image }) =>
    z.object({
      titolo: z.string(),
      serie: z.enum(Object.keys(SERIE) as [keyof typeof SERIE, ...(keyof typeof SERIE)[]]),
      ordine: z.number(),
      immagine: image(),
      alt: z.string(),
      tecnica: z.string().optional(),
      supporto: z.string().optional(),
      altezza: z.number().optional(), // cm
      base: z.number().optional(), // cm
      data: z.string(),
      dettagli: z.array(z.object({ immagine: image(), alt: z.string() })).optional(),
      pubblicata: z.boolean().default(true),
      note: z.string().optional(), // note interne, non compaiono sul sito
    }),
});

const allestimenti = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/allestimenti' }),
  schema: ({ image }) =>
    z.object({
      titolo: z.string(),
      ordine: z.number(),
      immagine: image(),
      alt: z.string(),
    }),
});

const pagine = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pagine' }),
  schema: z.object({ titolo: z.string() }),
});

// Capitoli dell'introduzione in Home: testo dell'artista + opere abbinate.
const capitoli = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/capitoli' }),
  schema: z.object({
    titolo: z.string(),
    ordine: z.number(),
    opere: z.array(reference('opere')).default([]),
  }),
});

export const collections = { opere, allestimenti, pagine, capitoli };
