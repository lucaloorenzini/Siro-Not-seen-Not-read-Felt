import { getCollection, type CollectionEntry } from 'astro:content';

export type Opera = CollectionEntry<'opere'>;

export async function opereOrdinate(): Promise<Opera[]> {
  const tutte = await getCollection('opere', ({ data }) => data.pubblicata);
  return tutte.sort((a, b) => a.data.ordine - b.data.ordine);
}

/** "100 × 140 cm" (altezza × base), oppure null se mancano le misure. */
export function misure(o: Opera): string | null {
  const { altezza, base } = o.data;
  return altezza && base ? `${altezza} × ${base} cm` : null;
}

/** "Olio su acrilico su tela", oppure null. */
export function tecnica(o: Opera): string | null {
  const { tecnica: t, supporto } = o.data;
  if (!t) return null;
  return supporto ? `${t} su ${supporto}` : t;
}

/** Titolo che distingue le opere omonime: "Ljubav, 60 × 50 cm". */
export function titoloEsteso(o: Opera, tutte: Opera[]): string {
  const omonime = tutte.filter((x) => x.data.titolo === o.data.titolo).length > 1;
  const m = misure(o);
  return omonime && m ? `${o.data.titolo}, ${m}` : o.data.titolo;
}
