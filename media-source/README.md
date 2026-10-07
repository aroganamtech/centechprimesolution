# media-source  (optional: bring your own files, no API key needed)

Drop files here named after a slot in `scripts/media-manifest.json`, then run `npm run media`:

    media-source/hero.mp4                      -> Home hero video
    media-source/services.mp4, research.mp4, enabler.mp4, cta.mp4
    media-source/intro.jpg, about.jpg, solutions.jpg, banner-services.jpg, cybersecurity-services.jpg, ...

Videos: .mp4 / .mov / .webm   Photos: .jpg / .jpeg / .png / .webp
Optional credit file with the same name, e.g. `hero.credit.txt`, one line:  Creator name | https://page-url | licence

Local files win over anything downloaded from Pexels/Pixabay. You can download clips by hand from
https://www.pexels.com/videos/ or https://pixabay.com/videos/ (both are free for commercial use; no account needed on Pexels).
Install ffmpeg to get WebM / WebP / AVIF / mobile cuts / posters made automatically.
