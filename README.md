# Sito di Siro

Sito vetrina statico (Astro), pubblicato gratuitamente su GitHub Pages.
Ogni modifica salvata sul ramo `main` ripubblica il sito da sola in 1-2 minuti.

## Dove sono le cose

| Cosa | Dove |
|---|---|
| Le opere (una scheda per file) | `src/content/opere/*.md` |
| Le foto delle opere | `src/assets/opere/` |
| Le foto di allestimento | `src/content/allestimenti/` e `src/assets/allestimenti/` |
| Biografia | `src/content/pagine/artista.md` |
| Nome, presentazione e dati dell’artista (nome completo, data di nascita, luogo), titolo del progetto, email, Instagram, opera in apertura | `src/data/sito.json` |
| Capitoli del testo in Home, con le opere abbinate | `src/content/capitoli/*.md` |
| Colori e caratteri | `src/styles/global.css` |
| Pubblicazione automatica | `.github/workflows/pubblica.yml` |

## Aggiungere un'opera

1. Carica la foto in `src/assets/opere/`, con un nome semplice: `nome-opera.jpg` (minuscole, trattini, niente spazi né accenti). Basta una versione di buona qualità: Astro crea da solo le versioni leggere per il web.
2. Copia una scheda esistente in `src/content/opere/` e rinominala con lo stesso nome della foto (`nome-opera.md`). Il nome del file diventa l'indirizzo della pagina.
3. Aggiorna i campi:

```yaml
---
titolo: "Titolo dell'opera"
serie: money            # felt, money, ljubav, parole-e-potere, griglie-di-lettere, altre-opere
ordine: 26              # posizione nella galleria
immagine: ../../assets/opere/nome-opera.jpg
alt: "Descrizione per chi non vede l'immagine: colori e parole dipinte."
tecnica: "Acrilico"
supporto: "tela"        # facoltativo: viene mostrato come "Acrilico su tela"
altezza: 70             # cm
base: 50                # cm
data: "Ottobre 2026"
pubblicata: true        # false = la scheda resta nell'archivio ma non va online
note: "Promemoria interni, non compaiono sul sito"
---

Testo facoltativo sull'opera, in italiano corrente.
```

Foto di dettaglio (facoltative), da aggiungere ai campi:

```yaml
dettagli:
  - immagine: ../../assets/opere/nome-opera-dettaglio-1.jpg
    alt: "Dettaglio della pennellata"
```

## Provare il sito sul computer

Serve Node.js 22.12 o successivo.

```bash
npm ci          # la prima volta
npm run dev     # apre il sito su http://localhost:4321
```

## Prima pubblicazione su GitHub

1. Crea un repository pubblico (es. `siro`) e caricaci tutti questi file.
2. In **Settings > Pages**, alla voce **Source** scegli **GitHub Actions**.
3. Al primo caricamento parte la pubblicazione: avanzamento visibile nella scheda **Actions**.
4. Indirizzo provvisorio: `https://<tuo-utente>.github.io/siro/`

Nota: se il repository si chiama `<tuo-utente>.github.io`, in `pubblica.yml` metti `BASE_PATH: /`.

## Quando arriva il dominio

1. In `.github/workflows/pubblica.yml` cambia: `SITE_URL: https://www.dominio.it` e `BASE_PATH: /`
2. In **Settings > Pages > Custom domain** inserisci il dominio e attiva **Enforce HTTPS**.
3. Dal pannello del registrar imposta i DNS indicati da GitHub.
4. In `src/data/sito.json` metti `"indicizzabile": true` per aprire il sito ai motori di ricerca.
5. Verifica che il dominio abbia il **rinnovo automatico** attivo.

## Scelte da tenere ferme

- **Versioni bloccate**: `package.json` e `package-lock.json` fissano le versioni esatte. Il sito non cambia finché non si decide di aggiornare.
- **Caratteri in locale** (Archivo e Big Shoulders Stencil): nessuna chiamata a Google Fonts, quindi nessun trasferimento di dati a terzi.
- **Nessun modulo contatti**: solo link email, nessun servizio esterno.
- **Sito nascosto ai motori di ricerca** finché `indicizzabile` è `false`.

## Da verificare con l'artista

- **Ordine delle misure**: nelle didascalie originali era incoerente. Le schede usano altezza × base ricavate dall'orientamento della foto. Da confermare opera per opera.
- **"Olio su acrilico"**: dicitura riportata come da didascalia. Probabilmente "olio e acrilico su tela".
- **Supporto** (tela, tavola, carta): indicato solo per una delle due Tela de pintura.
- **Felt (versione arancio)**: didascalia illeggibile, mancano titolo, tecnica e misure. Nella galleria è mostrata come se fosse larga 100 cm.
- **Ljubav 60x50**: molto simile alla 70x50, confermare che siano opere distinte.
- **Tela de pintura**: le due schede sono la stessa opera; per ora restano entrambe.
- **Money 60x50**: la foto ritagliata risulta orizzontale, controllare le misure.
- **Biografia, email, Instagram, testi delle opere**: da fornire.
- **Foto**: le attuali vengono da WhatsApp (circa 1.000-1.600 pixel). Gli originali ad alta risoluzione migliorerebbero molto le schede.
