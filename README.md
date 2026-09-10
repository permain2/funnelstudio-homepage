# FunnelStudio homepage

[Open the published preview](https://permain2.github.io/funnelstudio-homepage/) · [FunnelStudio](https://funnelstudio.ai/)

Standalone public marketing page. The interactive store uses sample products and prices; it does not place orders or collect payment information. Account and application links open the existing FunnelStudio website.

## Build

Use Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run build
```

The build writes `docs/` for GitHub Pages at `/funnelstudio-homepage/`. Local section links stay on the preview. Update the `base` in `vite.config.js` if hosting under a different project path.

## Deploy the production homepage

Download `homepage-public.tgz` and `manifest.json` from the [v1.1.2 release](https://github.com/permain2/funnelstudio-homepage/releases/tag/v1.1.2). This is a separate production-root package; do not deploy the GitHub Pages `docs/` build at your domain root.

1. Identify the active website origin and its homepage web root. Back up its current index and record the existing application route responses.
2. Extract the package into a staging directory. Verify every file against `manifest.json` using SHA-256 before copying.
3. Copy only the versioned `gal/fsw-v1.1.2/` assets into the homepage web root. Verify their public URLs before switching the index.
4. Atomically replace only the homepage `index.html`. Preserve all existing application routes, backend files, environment variables, and server configuration.
5. Verify the homepage, images, local demo controls, and application links. If needed, atomically restore the previous index to roll back.

The active production hosting path must be confirmed by its operator. This repository does not change the production domain or deploy application/payment features.
