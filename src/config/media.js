/**
 * CENTRAL MEDIA CONFIGURATION
 *
 * Real media comes from `npm run media` (Pexels, licensed for commercial use). That command writes the files to
 * /public/media and records exactly what exists in ./media.generated.json, which this file reads — so downloaded
 * assets are picked up automatically, with no code edits. Which asset fills which slot: scripts/media-manifest.json.
 *
 * Fallback chain for every slot:   downloaded Pexels asset  ->  original site image / bundled placeholder  ->  generated visual.
 * To use your own file instead, drop it into /public/media and set the slot below (a path or {src}) — it wins over Pexels.
 *
 * VIDEO slot: { video:{webm,mp4,mobileWebm,mobileMp4}, poster, posterMobile }.  Set a slot to null for poster-only.
 * Specs: desktop 1920x1080 H.264 <= 3 MB, mobile 720w <= 1.3 MB, poster <= 200 KB, no audio.
 */
import gen from './media.generated.json';

const U = 'https://centechprimesolution.com/wp-content/uploads';

// Optional manual overrides (take priority over downloaded Pexels media). Leave empty to use Pexels.
const overrides = { photos: {}, videos: {} };

const placeholder = { // bundled abstract loops: only used while a slot has no downloaded video
  video: { webm: '/media/hero.webm', mp4: '/media/hero.mp4', mobileWebm: '/media/mobile.webm', mobileMp4: '/media/mobile.mp4' },
  poster: '/media/hero-poster.jpg', posterMobile: '/media/hero-poster-mobile.jpg',
};

/** Photo -> {src, sources, ...} from Pexels, else the given fallback URL, else null (Img then draws a generated visual). */
const photo = (slot, fallback = null) => overrides.photos[slot] || gen.photos?.[slot] || fallback;
const video = (slot) => (slot in overrides.videos ? overrides.videos[slot] : gen.videos?.[slot] || placeholder);
export const hasRealVideo = (slot) => !!gen.videos?.[slot];

const v = (slot) => video(slot);
const slugs = [
  'it-consultancy-services', 'non-it-consultancy-services', 'cloud-migration-and-management-services',
  'software-development-and-integration-services', 'data-analytics-and-business-intelligence', 'cybersecurity-services',
  'cloud-native-application-development', 'it-infrastructure-and-support-services', 'cloud-cost-management-and-optimization',
  'devops-and-automation-consulting', 'industry-integrated-ai-digital-transformation-training-program',
];
const legacy = { 'cybersecurity-services': `${U}/2024/10/204.jpg` }; // original-site image, used only if no Pexels asset

export const media = {
  // Home hero carousel (Slalom-style rotating video hero). Slot names = scripts/media-manifest.json
  heroSlides: [
    { clip: v('hero'), label: 'Cloud & infrastructure' },
    { clip: v('hero-2'), label: 'Software engineering' },
    { clip: v('hero-4'), label: 'Enterprise consulting' },
    { clip: v('hero-3'), label: 'AI & automation' },
  ],
  videos: { hero: v('hero'), services: v('services'), research: v('research'), enabler: v('enabler'), cta: v('cta') },
  photos: {
    intro: photo('intro', `${U}/2024/10/2150038851.jpg`),
    about: photo('about', `${U}/2024/10/2150038851.jpg`),
    solutions: photo('solutions', `${U}/2024/11/28ab990c-566f-4296-ab40-5b805353bc84-1024x803.jpg`),
    research: photo('research'),
  },
  banners: {
    default: photo('banner'), about: photo('banner-about'), services: photo('banner-services'),
    solutions: photo('banner-solutions'), blog: photo('banner-blog'), contact: photo('banner-contact'),
  },
  serviceImages: Object.fromEntries(slugs.map((s) => [s, photo(s, legacy[s] || null)])),
  projects: { 'consulting-project': photo('project-consulting'), 'consulting-project-2': photo('project-consulting'), 'product-design': photo('project-product'), 'product-design-2': photo('project-product') },
  posts: {
    'the-future-of-cloud-computing-trends-and-innovations-for-2025': photo('post-cloud'),
    'how-data-analytics-transforms-business-decision-making': photo('post-analytics'),
    'key-cybersecurity-strategies-to-protect-your-business-in-the-digital-age': photo('post-security'),
  },
};
