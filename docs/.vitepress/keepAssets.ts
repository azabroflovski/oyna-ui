// The JS and CSS of earlier builds, kept on the site after a deploy.
//
// Cloudflare serves only the files of the last deploy, and the name of every chunk carries a hash
// that changes with almost any change to the docs or the library. Googlebot fetches a page's HTML
// and renders it later, sometimes days later; if a deploy came in between, the chunks that HTML
// names are gone, VitePress's router shows its 404 page, and Google indexes the page as "404".
//
// So every build lists its files in /assets.json, and a build on Cloudflare downloads the files the
// live site lists there and puts them back next to the new ones. A name carries a hash of the
// content, so an old file never replaces a new one. A file stays for a month after the last build
// that made it.
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const keepDays = 30

export async function keepAssets(outDir: string, site: string) {
  const today = new Date().toISOString().slice(0, 10)
  // file → the date of the last build that made it
  const files: Record<string, string> = {}
  for (const file of await readdir(join(outDir, 'assets'), { recursive: true })) {
    if (/\.\w+$/.test(file)) files[`assets/${file}`] = today
  }

  // Workers Builds sets WORKERS_CI; a build anywhere else (CI, a laptop) does not touch the live site
  if (process.env.WORKERS_CI) {
    const since = new Date(Date.now() - keepDays * 86_400_000).toISOString().slice(0, 10)
    try {
      const response = await fetch(`${site}/assets.json`)
      // the first deploy with this file has nothing to bring back
      const live: Record<string, string> = response.ok ? await response.json() : {}
      const kept = Object.entries(live).filter(
        ([file, date]) => !(file in files) && date >= since && /^assets\/[\w./-]+$/.test(file) && !file.includes('..'),
      )
      await Promise.all(
        kept.map(async ([file, date]) => {
          const old = await fetch(`${site}/${file}`)
          if (!old.ok) return
          await mkdir(dirname(join(outDir, file)), { recursive: true })
          await writeFile(join(outDir, file), new Uint8Array(await old.arrayBuffer()))
          files[file] = date
        }),
      )
    } catch (error) {
      // the deploy matters more than old files
      console.warn('keepAssets: could not bring back the files of the live site', error)
    }
  }

  await writeFile(join(outDir, 'assets.json'), JSON.stringify(files, null, 2))
}
