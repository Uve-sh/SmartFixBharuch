import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { supabase } from './supabase';

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
    { name: 'Tempered Glass & Covers', price: 'From ₹99', imageUrl: 'https://picsum.photos/seed/glass/400/300' },
    { name: 'Fast Chargers & Cables', price: 'From ₹249', imageUrl: 'https://picsum.photos/seed/cable/400/300' },
    { name: 'Power Banks', price: 'From ₹699', imageUrl: 'https://picsum.photos/seed/power/400/300' },
    { name: 'Earphones & Neckbands', price: 'From ₹399', imageUrl: 'https://picsum.photos/seed/audio/400/300' },
    { name: 'Screen Replacement', price: 'Quote on inspection', imageUrl: 'https://picsum.photos/seed/screen/400/300' },
    { name: 'Repairing Course Kit', price: 'Ask in store', imageUrl: 'https://picsum.photos/seed/tools/400/300' }
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
    async function load() {
      try {
        let loadedContent = null;
        if (supabase) {
          const { data, error } = await supabase
            .from('site_settings')
            .select('content')
            .eq('id', 1)
            .single();
          if (data && data.content) {
            loadedContent = data.content;
          } else if (error && error.code !== 'PGRST116') { // PGRST116 is 'not found'
            console.error('Failed to parse site content from Supabase', error);
          }
        }
        
        if (!loadedContent) {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            loadedContent = JSON.parse(stored);
          }
        }
        
        if (loadedContent) {
          setContent(mergeWithDefaults(loadedContent));
        }
      } catch (e) {
        console.error('Failed to load site content', e);
      } finally {
        setHydrated(true);
      }
    }
    
    load();
  }, []);

  const save = async (next: SiteContent) => {
    setContent(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    
    if (supabase) {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ id: 1, content: next });
      if (error) {
        console.error('Failed to save to Supabase', error);
        alert('Failed to save to cloud database. Changes saved locally only.');
      }
    }
  };

  const reset = async () => {
    setContent(DEFAULT_CONTENT);
    localStorage.removeItem(STORAGE_KEY);
    
    if (supabase) {
      await supabase.from('site_settings').delete().eq('id', 1);
    }
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
