/* Photography — generated in the Figma file "VOVIX Website — v4 Redesign",
   page "04 Photography (AI-generated, illustrative)". They are editorial
   scene-setters, not pictures of VOVIX staff, clients or premises, and the
   footer says so. Swap any file in /public/media/photos for a real photo
   with the same name and every placement updates.

   Each photo ships as WebP at 640 / 1024 / full width plus a 1024 JPEG
   fallback; the browser picks the smallest that fits the slot.          */

export const PHOTOS = {
  "hero-office":     { w: 1376, h: 768, alt: "Engineers at multi-monitor workstations in a glass-walled office at sunset" },
  "lens-desk":       { w: 1200, h: 896, alt: "An accountant's desk with printed tax invoices, a calculator and a laptop spreadsheet" },
  "oneview-phone":   { w: 1200, h: 896, alt: "A hand holding a phone with a chat conversation beside a cup of filter coffee" },
  "edge-desk":       { w: 1200, h: 896, alt: "A trading workstation with currency charts and risk panels on three monitors" },
  "svc-workflow":    { w: 1200, h: 896, alt: "Three colleagues mapping a business process with sticky notes on a glass wall" },
  "svc-ai-docs":     { w: 1200, h: 896, alt: "A paper invoice being photographed with a phone next to a laptop" },
  "svc-data":        { w: 1200, h: 896, alt: "A data centre aisle lined with server racks and green status lights" },
  "svc-api":         { w: 1200, h: 896, alt: "A developer's hands on a laptop showing code and an API panel" },
  "svc-ingest":      { w: 1200, h: 896, alt: "An engineer watching live data feeds and alerts on two monitors" },
  "svc-tools":       { w: 1200, h: 896, alt: "Two colleagues reviewing an operations dashboard on a wall screen" },
  "svc-whitelabel":  { w: 1200, h: 896, alt: "Two professionals shaking hands across a table with laptops" },
  "uc-backoffice":   { w: 1264, h: 848, alt: "A back-office team processing files and receipts at their desks" },
  "uc-professional": { w: 1264, h: 848, alt: "A consultant reviewing documents with a client in a meeting room" },
  "uc-team":         { w: 1264, h: 848, alt: "A product team in a stand-up meeting around a table with laptops" },
  "chennai":         { w: 1376, h: 768, alt: "Office towers along Chennai's IT corridor at dusk" },
  "team-cta":        { w: 1376, h: 768, alt: "Three engineers reviewing results together on a laptop" },
} as const;

export type PhotoName = keyof typeof PHOTOS;

export function Photo({
  name, className = "", sizes = "(min-width: 1024px) 50vw, 100vw", priority = false, alt,
}: { name: PhotoName; className?: string; sizes?: string; priority?: boolean; alt?: string }) {
  const p = PHOTOS[name];
  const base = `/media/photos/${name}`;
  const widths = [640, 1024, p.w].filter((w, i, a) => w <= p.w && a.indexOf(w) === i);
  return (
    <picture className="contents">
      <source type="image/webp" sizes={sizes} srcSet={widths.map((w) => `${base}-${w}.webp ${w}w`).join(", ")} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${base}-1024.jpg`} alt={alt ?? p.alt} width={p.w} height={p.h}
        loading={priority ? "eager" : "lazy"} decoding="async" fetchPriority={priority ? "high" : "auto"}
        className={`h-full w-full object-cover ${className}`}
      />
    </picture>
  );
}
