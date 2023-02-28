## Envioronment

Create a `.env` file for secrets:

```
MONGODB_URI=connection string
MONGODB_DB=database
PUBLIC_MAPBOX_ACCESS_TOKEN=public from mapbox
```

## Developing

To run a local development server: `npm run dev`.

## Building

To create a static production version of the app: `npm run build`.

You can preview the production build with `npm run preview`.

## Roadmap

- pull data from google sheet, eventually from self-serve
- org statuses
- fix marker clustering? [spiderifier](https://github.com/bewithjonam/mapboxgl-spiderifier)
- don't piggyback off of [firstmap](https://github.com/FIRSTMap/firstmap.github.io) - would be nice to store avatar and location in main scoutradioz database
