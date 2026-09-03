import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Product = {
  name: string;
  price: string;
  imageUrl: string;
};

export type GalleryImage = {
  url: string;
  alt: string;
};

export type SiteContent = {
  businessName: string;
  tagline: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  addressLines: string[];
  mapsUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  hours: string;
  logoUrl: string;
  heroImageUrl: string;
  shopImageUrl: string;
  galleryImages: GalleryImage[];
  products: Product[];
};

export const DEFAULT_CONTENT: SiteContent = {
  businessName: 'Smart Fix',
  tagline: 'Mobile Repairing & Training Center',
  description: 'Expert mobile repairs, genuine accessories and hands-on technician training — all under one roof in the heart of Bharuch.',
  phone: '9033914269',
  whatsapp: '919033914269',
  email: 'smartfixtrainingcenter@gmail.com',
  addressLines: [
    '115, 1st Floor, Old City Center,',
    'Near BSNL Office, Panch Batti Road,',
    'Bharuch - 392001, Gujarat.'
  ],
  mapsUrl: 'https://maps.google.com/?q=Old+City+Center+Panch+Batti+Road+Bharuch+392001',
  facebookUrl: '#',
  instagramUrl: '#',
  hours: 'Mon – Sat · 10:00 AM – 8:00 PM',
  logoUrl: '/assets/smartfix-logo.png',
  heroImageUrl: '/assets/hero-bg.jpg',
  shopImageUrl: '/assets/shop.jpg',
  galleryImages: [],
  products: [
    { name: 'Tempered Glass & Covers', price: 'From ₹99', imageUrl: '' },
    { name: 'Fast Chargers & Cables', price: 'From ₹249', imageUrl: '' },
    { name: 'Power Banks', price: 'From ₹699', imageUrl: '' },
    { name: 'Earphones & Neckbands', price: 'From ₹399', imageUrl: '' },
    { name: 'Screen Replacement', price: 'Quote on inspection', imageUrl: '' },
    { name: 'Repairing Course Kit', price: 'Ask in store', imageUrl: '' }
  ],
};

type SiteContentContextType = {
  content: SiteContent;
  hydrated: boolean;
  save: (next: SiteContent) => void;
  reset: () => void;
};

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

const STORAGE_KEY = 'smartfix-site-content-v1';

function mergeWithDefaults(stored: any): SiteContent {
  return {
    ...DEFAULT_CONTENT,
    ...stored,
    addressLines: Array.isArray(stored?.addressLines) ? stored.addressLines : DEFAULT_CONTENT.addressLines,
    galleryImages: Array.isArray(stored?.galleryImages) ? stored.galleryImages : DEFAULT_CONTENT.galleryImages,
    products: Array.isArray(stored?.products) ? stored.products : DEFAULT_CONTENT.products,
  };
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setContent(mergeWithDefaults(JSON.parse(stored)));
      }
    } catch (e) {
      console.error('Failed to parse site content from local storage', e);
    }
    setHydrated(true);
  }, []);

  const save = (next: SiteContent) => {
    setContent(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const reset = () => {
    setContent(DEFAULT_CONTENT);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <SiteContentContext.Provider value={{ content, hydrated, save, reset }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (context === undefined) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
}

export function buildVCard(content: SiteContent): string {
  const adr = content.addressLines.join(' ');
  return `BEGIN:VCARD
VERSION:3.0
FN:${content.businessName}
ORG:${content.businessName}
TITLE:${content.tagline}
TEL;TYPE=CELL:+${content.whatsapp}
EMAIL:${content.email}
ADR;TYPE=WORK:;;${adr};;;;
URL:${content.mapsUrl}
END:VCARD`;
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
