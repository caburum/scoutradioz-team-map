## Envioronment

Create a `.env` file for secrets:

```
MONGODB_URI=connection string
MONGODB_DB=database
PUBLIC_MAPBOX_ACCESS_TOKEN=public from mapbox
CSV_URL=https://docs.google.com/spreadsheets/d/google-sheet-id-here/gviz/tq?tqx=out:csv&sheet=sheet+name+here
```

## Developing

To run a local development server: `npm run dev`.

## Building

To create a static production version of the app: `npm run build`.

You can preview the production build with `npm run preview`.

## Continious Deployment

The site is re-built and deployed when the source sheet changes.

[Vercel hook](https://vercel.com/docs/concepts/deployments/deploy-hooks) triggered on Google Sheets change by [Apps Script](https://stackoverflow.com/a/62105239)

## Roadmap

- pull data from google sheet, eventually from self-serve
- org statuses
- fix marker clustering? [spiderifier](https://github.com/bewithjonam/mapboxgl-spiderifier)
- don't piggyback off of [firstmap](https://github.com/FIRSTMap/firstmap.github.io) - would be nice to store avatar and location in main scoutradioz database
