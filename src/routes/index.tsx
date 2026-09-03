import { createFileRoute } from '@tanstack/react-router';
import { useSiteContent, buildVCard } from '../lib/site-content';
import { 
  Phone, MessageCircle, MapPin, Navigation, Mail, 
  Sparkles, Clock, CheckCircle2, ArrowRight, Star, ScanLine, X
} from 'lucide-react';
import { useState, useEffect } from 'react';

function Facebook(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function Instagram(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export const Route = createFileRoute('/')({
  component: Index,
});

function Section({ id, tone = 'white', eyebrow, title, children, className = '' }: any) {
  const isAlt = tone === 'alt';
  return (
    <section id={id} className={`px-5 py-16 sm:py-24 ${isAlt ? 'bg-secondary' : 'bg-background'} ${className}`}>
      <div className="max-w-6xl mx-auto">
        {(eyebrow || title) && (
          <div className="mb-12 text-center animate-fade-up">
            {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">{eyebrow}</p>}
            {title && <h2 className="text-3xl sm:text-5xl font-bold">{title}</h2>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function NavBar({ content }: any) {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4 animate-fade-in">
      <div className="glass-card rounded-full max-w-5xl mx-auto flex items-center justify-between p-2 pr-4">
        <div className="flex items-center gap-3 pl-2">
          {content.logoUrl ? (
            <img src={content.logoUrl} alt="Logo" className="w-9 h-9 object-contain" />
          ) : (
            <div className="w-9 h-9 rounded-full gold-surface flex items-center justify-center font-bold text-white text-sm">
              SF
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-bold text-sm leading-none">{content.businessName}</span>
            <span className="text-[10px] text-muted-foreground hidden sm:block mt-0.5">NFC PROFILE</span>
          </div>
        </div>
        <a href={`tel:${content.phone}`} className="gold-surface text-primary-foreground px-6 py-2 rounded-full font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-gold">
          Call Now
        </a>
      </div>
    </nav>
  );
}

function Hero({ content }: any) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-5 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={content.heroImageUrl} alt="Background" className="w-full h-full object-cover blur-[4px] saturate-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/100" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 blur-[100px] rounded-full mix-blend-multiply" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto animate-fade-up">
        {content.logoUrl ? (
          <img src={content.logoUrl} alt="Logo" className="w-[84px] h-[84px] mb-8 object-contain" style={{ animationDelay: '0.1s' }} />
        ) : (
          <div className="w-[84px] h-[84px] mb-8 rounded-full gold-surface flex items-center justify-center font-bold text-white text-3xl" style={{ animationDelay: '0.1s' }}>
            SF
          </div>
        )}
        
        <div className="glass-card px-4 py-1.5 rounded-full flex items-center gap-2 mb-8" style={{ animationDelay: '0.15s' }}>
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Tap. Connect. Repair.</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-[0.95] mb-6 tracking-tight text-balance" style={{ animationDelay: '0.2s' }}>
          {content.businessName.split(' ').slice(0, -1).join(' ')} <span className="gold-text">{content.businessName.split(' ').slice(-1)}</span>
        </h1>
        
        <p className="text-xl md:text-2xl font-semibold mb-4" style={{ animationDelay: '0.25s' }}>
          {content.tagline}
        </p>
        
        <p className="text-muted-foreground text-lg mb-10 max-w-2xl text-balance" style={{ animationDelay: '0.3s' }}>
          {content.description}
        </p>

        <div className="grid grid-cols-2 md:flex md:flex-row gap-3 mb-12 w-full md:w-auto" style={{ animationDelay: '0.35s' }}>
          <a href={`tel:${content.phone}`} className="gold-surface text-primary-foreground px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-gold">
            <Phone className="w-5 h-5" /> Call
          </a>
          <a href={`https://wa.me/${content.whatsapp}`} className="bg-success text-white px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-card">
            <MessageCircle className="w-5 h-5" /> WhatsApp
          </a>
          <a href={`data:text/vcard;charset=utf-8,${encodeURIComponent(buildVCard(content))}`} download={`${content.businessName}.vcf`} className="glass-card px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
            <ScanLine className="w-5 h-5" /> Save Contact
          </a>
          <a href={content.mapsUrl} target="_blank" rel="noreferrer" className="glass-card px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
            <Navigation className="w-5 h-5" /> Directions
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-3" style={{ animationDelay: '0.4s' }}>
          {['Fast Repairs', 'Genuine Accessories', 'Expert Technicians', 'Training Courses'].map(t => (
            <div key={t} className="glass-card px-4 py-2 rounded-full text-sm font-medium">
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickActions({ content }: any) {
  const actions = [
    { icon: Phone, label: 'Call', href: `tel:${content.phone}` },
    { icon: MessageCircle, label: 'WhatsApp', href: `https://wa.me/${content.whatsapp}` },
    { icon: MapPin, label: 'Location', href: content.mapsUrl },
    { icon: ScanLine, label: 'Save Contact', href: `data:text/vcard;charset=utf-8,${encodeURIComponent(buildVCard(content))}`, download: `${content.businessName}.vcf` },
    { icon: Navigation, label: 'Directions', href: content.mapsUrl },
    { icon: Facebook, label: 'Facebook', href: content.facebookUrl },
    { icon: Instagram, label: 'Instagram', href: content.instagramUrl },
    { icon: Mail, label: 'Email', href: `mailto:${content.email}` },
  ];

  return (
    <Section eyebrow="Connect Instantly" title="Quick Actions">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {actions.map((Action, i) => (
          <a 
            key={i} 
            href={Action.href}
            download={Action.download}
            target={Action.download ? undefined : "_blank"}
            rel="noreferrer"
            className="bg-white rounded-3xl p-4 flex flex-col items-center justify-center gap-4 hover:-translate-y-1 transition-all shadow-soft hover:shadow-card group"
          >
            <div className="w-14 h-14 rounded-2xl gold-surface flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform">
              <Action.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold">{Action.label}</span>
          </a>
        ))}
      </div>
    </Section>
  );
}

function ShopHighlight({ content }: any) {
  return (
    <section className="px-5 py-12 max-w-6xl mx-auto">
      <div className="rounded-[2.5rem] bg-white shadow-glow overflow-hidden lg:grid lg:grid-cols-[1.4fr_1fr] animate-fade-up">
        <div className="relative group overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[520px]">
          <img src={content.shopImageUrl} alt="Storefront" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx/80 to-transparent lg:hidden" />
          <div className="absolute top-6 left-6 glass-card px-4 py-2 rounded-full font-bold text-sm">
            Shop 115
          </div>
          <a href={content.mapsUrl} className="absolute bottom-6 left-6 right-6 lg:hidden gold-surface text-primary-foreground px-6 py-4 rounded-2xl font-bold text-center shadow-gold">
            Get Directions
          </a>
        </div>
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="self-start px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-6">
            Walk-ins welcome
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-balance">
            Repairs done while you wait.
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Visit our state-of-the-art service center. We stock genuine parts for most major brands, allowing us to complete most repairs in under an hour.
          </p>
          
          <ul className="space-y-4 mb-10">
            <li className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-medium mt-1">{content.addressLines.join(' ')}</p>
            </li>
            <li className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-medium mt-2">{content.hours}</p>
            </li>
            <li className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-medium mt-2">{content.phone}</p>
            </li>
          </ul>

          <div className="flex gap-4 hidden lg:flex">
            <a href={content.mapsUrl} className="gold-surface text-primary-foreground px-8 py-4 rounded-2xl font-bold shadow-gold hover:scale-[1.02] transition-transform">
              Get Directions
            </a>
            <a href={`https://wa.me/${content.whatsapp}`} className="border-2 border-border text-foreground px-8 py-4 rounded-2xl font-bold hover:border-primary transition-colors">
              Message Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function About({ content }: any) {
  return (
    <Section tone="white" eyebrow="About Us" title="Your Trusted Device Partner">
      <div className="relative">
        <div className="absolute top-0 right-10 w-64 h-64 bg-primary/20 blur-[80px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-primary/20 blur-[80px] rounded-full" />
        
        <div className="relative bg-white/60 backdrop-blur-3xl rounded-3xl p-8 md:p-12 shadow-soft border border-white flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-8">
            <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground">
              At <strong className="text-foreground">{content.businessName}</strong>, we believe your devices shouldn't slow you down. As Bharuch's premier service and training center, we combine technical excellence with transparent pricing.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Same-Day Service', 'Genuine Parts', 'Certified Training', 'Affordable'].map(tag => (
                <div key={tag} className="px-4 py-2 rounded-full bg-white shadow-sm font-medium text-sm text-foreground border border-border">
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:flex w-40 h-40 shrink-0 gold-surface rounded-3xl shadow-gold items-center justify-center overflow-hidden">
             {content.logoUrl ? (
                <img src={content.logoUrl} alt="Logo" className="w-32 h-32 object-contain filter drop-shadow-md" />
              ) : (
                <span className="font-bold text-white text-5xl">SF</span>
              )}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Services() {
  const services = [
    {
      title: "Mobile Repair",
      items: ["Screen Replacement", "Battery Upgrade", "Charging Port Fix", "Software & Flashing", "Water Damage Diagnostics"]
    },
    {
      title: "Accessories",
      items: ["Covers & Tempered Glass", "Fast Chargers & Cables", "Power Banks", "Earphones & Neckbands", "Premium Cases"]
    },
    {
      title: "Training Courses",
      items: ["Basic to Advanced Repair", "Chip-Level Training", "Live Practical Bench Work", "Software Solutions", "Certification"]
    }
  ];

  return (
    <Section tone="alt" eyebrow="What We Do" title="Complete Mobile Solutions">
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((svc, i) => (
          <div key={i} className="bg-white rounded-3xl p-8 shadow-soft hover:-translate-y-1 transition-all group">
            <div className="w-16 h-16 rounded-2xl gold-surface mb-6 shadow-gold flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-6">{svc.title}</h3>
            <ul className="space-y-4">
              {svc.items.map((item, j) => (
                <li key={j} className="flex gap-3 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function WhyUs() {
  const reasons = [
    { title: "Fast Repairs", desc: "Most issues resolved within an hour while you wait." },
    { title: "Professional Service", desc: "Certified technicians with years of hands-on experience." },
    { title: "Quality Accessories", desc: "Only genuine and premium quality products stocked." },
    { title: "Customer Satisfaction", desc: "Transparent pricing and guaranteed reliable fixes." },
  ];

  return (
    <Section tone="white" eyebrow="The Difference" title="Why Choose Us">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((r, i) => (
          <div key={i} className="onyx-surface rounded-3xl p-8 relative overflow-hidden group hover:-translate-y-1 transition-transform shadow-card">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/30 blur-[40px] rounded-full group-hover:bg-primary/50 transition-colors" />
            <div className="relative z-10">
              <Sparkles className="w-8 h-8 text-primary-glow mb-6" />
              <h3 className="text-onyx-foreground font-bold text-xl mb-3">{r.title}</h3>
              <p className="text-onyx-foreground/70 text-sm leading-relaxed">{r.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Process() {
  const steps = [
    "Device Inspection", "Problem Diagnosis", "Repair Approval",
    "Professional Repair", "Quality Testing", "Ready for Collection"
  ];

  return (
    <Section tone="alt" eyebrow="How It Works" title="Our Process">
      {/* Mobile Snap Carousel */}
      <div className="flex overflow-x-auto gap-4 pb-8 md:hidden hide-scrollbar snap-x snap-mandatory">
        {steps.map((step, i) => (
          <div key={i} className="bg-white min-w-[68%] rounded-3xl p-6 shadow-soft snap-center shrink-0">
            <span className="gold-text font-extrabold text-4xl mb-4 block">0{i+1}</span>
            <h4 className="font-bold text-lg">{step}</h4>
          </div>
        ))}
      </div>
      
      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-6 gap-4">
        {steps.map((step, i) => (
          <div key={i} className="relative bg-white rounded-3xl p-6 shadow-soft hover:-translate-y-1 transition-transform group">
            <span className="gold-text font-extrabold text-4xl mb-4 block">0{i+1}</span>
            <h4 className="font-bold text-lg leading-tight">{step}</h4>
            {i < steps.length - 1 && (
              <ArrowRight className="absolute -right-5 top-1/2 -translate-y-1/2 text-border w-6 h-6 hidden lg:block z-10 bg-secondary rounded-full p-1" />
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

function Products({ content }: any) {
  if (!content.products || content.products.length === 0) return null;
  return (
    <Section tone="white" eyebrow="Store" title="Featured Products & Services">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.products.map((p: any, i: number) => (
          <div key={i} className="bg-white rounded-3xl p-4 shadow-soft hover:shadow-card transition-shadow group flex flex-col">
            <div className="aspect-[4/3] rounded-2xl bg-secondary mb-4 relative overflow-hidden flex items-center justify-center">
              {p.imageUrl ? (
                <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="w-20 h-20 gold-surface rounded-2xl shadow-gold flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-primary-foreground" />
                </div>
              )}
              <div className="absolute top-3 right-3 glass-card w-10 h-10 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
            </div>
            <div className="px-2 pb-2 flex flex-col flex-1">
              <h4 className="font-bold text-lg mb-2">{p.name}</h4>
              <span className="gold-text font-extrabold text-xl mb-6">{p.price}</span>
              
              <a 
                href={`https://wa.me/${content.whatsapp}?text=${encodeURIComponent(`Hi, I would like to enquire about: ${p.name}`)}`}
                target="_blank" rel="noreferrer"
                className="mt-auto gold-surface text-primary-foreground font-bold py-3.5 rounded-xl text-center shadow-gold hover:scale-[1.02] transition-transform"
              >
                Enquire
              </a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Reviews() {
  const reviews = [
    { text: "My screen was fixed in 45 minutes perfectly. Great service and genuine parts.", author: "Rahul P." },
    { text: "The training course gave me hands-on skills I couldn't find anywhere else.", author: "Amit S." },
    { text: "Best place in Bharuch for accessories. Friendly staff and fair prices.", author: "Neha M." },
  ];

  return (
    <Section tone="alt" eyebrow="Testimonials" title="What People Say">
      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white rounded-3xl p-8 shadow-soft">
            <div className="flex gap-1 mb-6">
              {[1,2,3,4,5].map(star => (
                <Star key={star} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-xl font-display font-medium leading-relaxed mb-6">"{r.text}"</p>
            <p className="font-bold text-muted-foreground">— {r.author}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Gallery({ content }: any) {
  if (!content.galleryImages || content.galleryImages.length === 0) return null;
  return (
    <Section tone="white" eyebrow="Inside" title="Our Gallery">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px] md:auto-rows-[220px]">
        {content.galleryImages.map((img: any, i: number) => {
          const isLarge = (i + 1) % 4 === 0;
          return (
            <div key={i} className={`rounded-3xl overflow-hidden group shadow-soft ${isLarge ? 'row-span-2' : ''}`}>
              <img src={img.url} alt={img.alt || `Gallery image ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function Contact({ content }: any) {
  const [sent, setSent] = useState(false);
  const vCard = buildVCard(content);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(vCard)}`;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <Section tone="white" id="contact" className="pb-32">
      <div className="grid lg:grid-cols-2 gap-10">
        
        {/* Contact Info & Form */}
        <div className="bg-secondary rounded-[2.5rem] p-8 md:p-12 shadow-soft">
          <div className="flex items-center gap-4 mb-8">
            {content.logoUrl ? (
              <img src={content.logoUrl} alt="Logo" className="w-12 h-12 object-contain" />
            ) : (
              <div className="w-12 h-12 rounded-full gold-surface flex items-center justify-center font-bold text-white">SF</div>
            )}
            <div>
              <h3 className="font-bold text-xl leading-none">{content.businessName}</h3>
              <p className="text-sm text-muted-foreground mt-1">{content.tagline}</p>
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4">
              <a href={`tel:${content.phone}`} className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 hover:scale-105 transition-transform">
                <Phone className="w-5 h-5 text-primary" />
              </a>
              <div className="pt-1">
                <p className="text-sm text-muted-foreground font-medium">Phone</p>
                <p className="font-bold text-lg">{content.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <a href={content.mapsUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5 text-primary" />
              </a>
              <div className="pt-1">
                <p className="text-sm text-muted-foreground font-medium">Location</p>
                <p className="font-bold">{content.addressLines.join(', ')}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <a href={`mailto:${content.email}`} className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 hover:scale-105 transition-transform">
                <Mail className="w-5 h-5 text-primary" />
              </a>
              <div className="pt-1">
                <p className="text-sm text-muted-foreground font-medium">Email</p>
                <p className="font-bold truncate max-w-[200px] sm:max-w-xs">{content.email}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <h4 className="font-bold text-lg mb-4">Send a Message</h4>
            <div className="grid grid-cols-2 gap-4">
              <input required type="text" placeholder="Name" className="w-full bg-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-transparent transition-shadow" />
              <input required type="tel" placeholder="Phone" className="w-full bg-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-transparent transition-shadow" />
            </div>
            <textarea required placeholder="How can we help?" rows={3} className="w-full bg-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-transparent transition-shadow resize-none" />
            
            <button type="submit" disabled={sent} className={`w-full py-4 rounded-xl font-bold transition-all ${sent ? 'bg-success text-white shadow-card' : 'gold-surface text-primary-foreground shadow-gold hover:scale-[1.02]'}`}>
              {sent ? 'Message Sent ✓' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* QR Code Panel */}
        <div className="onyx-surface rounded-[2.5rem] p-8 md:p-12 shadow-card relative overflow-hidden flex flex-col items-center justify-center text-center">
          <div className="absolute top-10 left-10 w-48 h-48 bg-primary/20 blur-[60px] rounded-full" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-primary/20 blur-[60px] rounded-full" />
          
          <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
            <div className="glass-card px-4 py-1.5 rounded-full text-onyx-foreground/90 font-bold text-sm tracking-wide mb-8 inline-flex items-center gap-2 border-white/20">
              <ScanLine className="w-4 h-4" /> NFC · QR Ready
            </div>
            
            <h3 className="text-3xl font-bold text-onyx-foreground mb-8">Scan to Save Contact</h3>
            
            <div className="bg-white p-6 rounded-3xl shadow-glow mb-10 w-full aspect-square flex items-center justify-center">
              <img src={qrUrl} alt="Contact QR Code" className="w-full h-full object-contain" />
            </div>

            <a href={`https://wa.me/${content.whatsapp}`} className="w-full bg-success text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-card">
              <MessageCircle className="w-6 h-6" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Footer({ content }: any) {
  return (
    <footer className="onyx-surface pt-20 pb-10 px-5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center">
        {content.logoUrl ? (
           <img src={content.logoUrl} alt="Logo" className="w-16 h-16 object-contain mb-6" />
        ) : (
          <div className="w-16 h-16 rounded-full gold-surface flex items-center justify-center font-bold text-white text-2xl mb-6">SF</div>
        )}
        <h2 className="text-onyx-foreground font-bold text-2xl mb-2">{content.businessName}</h2>
        <p className="text-onyx-foreground/70 mb-8 max-w-md">{content.description}</p>
        
        <div className="flex gap-4 mb-16">
          <a href={content.facebookUrl} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-onyx-foreground hover:border-primary hover:text-primary transition-colors">
            <Facebook className="w-5 h-5" />
          </a>
          <a href={content.instagramUrl} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-onyx-foreground hover:border-primary hover:text-primary transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href={`https://wa.me/${content.whatsapp}`} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-onyx-foreground hover:border-primary hover:text-primary transition-colors">
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>

        <div className="w-full h-px bg-white/10 mb-8" />
        
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-onyx-foreground/50 text-sm">
          <p>© {new Date().getFullYear()} {content.businessName}. All rights reserved.</p>
          <a href="/admin" className="hover:text-onyx-foreground transition-colors opacity-50 hover:opacity-100">
            Admin Login
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  const { content } = useSiteContent();

  return (
    <main className="w-full min-h-screen">
      <NavBar content={content} />
      <Hero content={content} />
      <QuickActions content={content} />
      <ShopHighlight content={content} />
      <About content={content} />
      <Services />
      <WhyUs />
      <Process />
      <Products content={content} />
      <Reviews />
      <Gallery content={content} />
      <Contact content={content} />
      <Footer content={content} />
    </main>
  );
}
