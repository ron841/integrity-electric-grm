import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://integrity-electric-grm.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Integrity Electric — Marion County Electrician · Belleview, FL",
  description:
    "Marion County electrician for residential, agricultural, and small-commercial work. Panels, generators, pool wiring, pole and barn jobs. Free estimates, same-day calls. FL EC13006493.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Integrity Electric",
    title: "Integrity Electric — Marion County Electrician",
    description:
      "A hundred and six reviews. Four-point-eight stars. The Marion County electrician who answers the phone.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Integrity Electric — Marion County Electrician",
    description:
      "A hundred and six reviews. Four-point-eight stars. The Marion County electrician who answers the phone.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/assets/integritylogo.jpg",
    shortcut: "/assets/integritylogo.jpg",
    apple: "/assets/integritylogo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: "Integrity Electrical Contracting of Florida Inc.",
    alternateName: "Integrity Electric",
    image: `${SITE_URL}/assets/hero-truck.jpg`,
    logo: `${SITE_URL}/assets/integritylogo.jpg`,
    telephone: "+1-352-307-6335",
    email: "integrity.elec@aol.com",
    url: SITE_URL,
    identifier: { "@type": "PropertyValue", propertyID: "FL Electrical Contractor License", value: "EC13006493" },
    address: {
      "@type": "PostalAddress",
      streetAddress: "7325 SE 105th Pl",
      addressLocality: "Belleview",
      addressRegion: "FL",
      postalCode: "34420",
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:30",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "12:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "106",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Marion County, FL" },
      { "@type": "City", name: "Belleview" },
      { "@type": "City", name: "Ocala" },
      { "@type": "City", name: "The Villages" },
      { "@type": "City", name: "Summerfield" },
      { "@type": "City", name: "Dunnellon" },
    ],
    serviceType: [
      "Residential electrical",
      "Generator inlet switch installation",
      "Pool and heat-pump wiring",
      "Electrical panel installation",
      "Utility pole installation",
      "Agricultural and barn electrical",
      "Shop and small-commercial electrical",
      "Light fixture installation",
      "Outlet and switch installation",
      "Electrical inspections",
    ],
    sameAs: ["https://www.facebook.com/Integrityelectric1/"],
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
