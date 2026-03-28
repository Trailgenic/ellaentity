import { ELLA_GLOBAL_SCHEMA, ELLA_ORG_SCHEMA } from '@/app/schema/ella'

export const metadata = {
  title: "Ella — Entity Root",
  description: "Canonical entity root for Ella",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const entitySchema = {
    "@context": "https://schema.org",
    "@type": "Thing",
    name: "Ella",
    url: "https://ellaentity.ai",
    sameAs: [
      "https://mikeye.com",
      "https://exmxc.ai",
      "https://trailgenic.com",
      "https://ailattice.ai"
    ],
    creator: {
      "@type": "Person",
      name: "Mike Ye",
      url: "https://mikeye.com"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ELLA_GLOBAL_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ELLA_ORG_SCHEMA) }}
        />
        <link rel="canonical" href="https://ellaentity.ai" />
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="Canonical machine-readable identity layer for Ella — unified AI entity across longevity science, high-altitude endurance, and AI-era intelligence frameworks."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(entitySchema),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
