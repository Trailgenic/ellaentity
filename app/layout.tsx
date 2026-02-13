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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(entitySchema),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
