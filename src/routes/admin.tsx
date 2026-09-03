import { createFileRoute } from '@tanstack/react-router';
import { useSiteContent, fileToDataUrl, type SiteContent } from '../lib/site-content';
import { useState, useEffect } from 'react';
import { LogOut, Save, Image as ImageIcon, Trash2, Plus, ArrowLeft } from 'lucide-react';

export const Route = createFileRoute('/admin')({
  component: AdminPage,
  head: () => ({
    meta: [
      { name: 'robots', content: 'noindex' },
      { title: 'Admin - Smart Fix' }
    ]
  })
});

const ADMIN_EMAIL = 'smartfixtrainingcenter@gmail.com';
const ADMIN_PASSWORD = 'smartfix2026';
const SESSION_KEY = 'smartfix-admin-session-v1';

function AdminPage() {
  const { content, save, reset } = useSiteContent();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // Draft state
  const [draft, setDraft] = useState<SiteContent>(content);
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY);
    if (session === 'true') setIsAuthenticated(true);
    setIsChecking(false);
  }, []);

  useEffect(() => {
    setDraft(content);
  }, [content]);

  if (isChecking) return null;

  if (!isAuthenticated) {
    return <Login onLogin={() => {
      localStorage.setItem(SESSION_KEY, 'true');
      setIsAuthenticated(true);
    }} />;
  }

  const handleSave = () => {
    save(draft);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handleSignOut = () => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-secondary pb-32 font-sans text-foreground">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-5 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="p-2 -ml-2 rounded-full hover:bg-secondary transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </a>
            <h1 className="font-bold text-xl font-display">Editor</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-medium text-success transition-opacity ${savedToast ? 'opacity-100' : 'opacity-0'}`}>
              · saved
            </span>
            <button onClick={reset} className="text-sm font-medium text-destructive px-3 py-1.5 rounded-lg hover:bg-destructive/10 transition-colors">
              Reset
            </button>
            <button onClick={handleSave} className="gold-surface text-primary-foreground px-5 py-1.5 rounded-full font-bold text-sm shadow-gold hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center gap-2">
              <Save className="w-4 h-4" /> Save
            </button>
            <button onClick={handleSignOut} className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors ml-2">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 pt-10 space-y-8">
        
        <Card title="Business">
          <TextField label="Business Name" value={draft.businessName} onChange={v => setDraft({...draft, businessName: v})} />
          <TextField label="Tagline" value={draft.tagline} onChange={v => setDraft({...draft, tagline: v})} />
          <TextArea label="Description" value={draft.description} onChange={v => setDraft({...draft, description: v})} />
        </Card>

        <Card title="Contact">
          <div className="grid sm:grid-cols-2 gap-4">
            <TextField label="Phone (digits only)" value={draft.phone} onChange={v => setDraft({...draft, phone: v})} />
            <TextField label="WhatsApp (country code + number)" value={draft.whatsapp} onChange={v => setDraft({...draft, whatsapp: v})} />
          </div>
          <TextField label="Email" value={draft.email} onChange={v => setDraft({...draft, email: v})} />
          <TextField label="Hours" value={draft.hours} onChange={v => setDraft({...draft, hours: v})} />
        </Card>

        <Card title="Location">
          <TextArea 
            label="Address (One line per row)" 
            value={draft.addressLines.join('\n')} 
            onChange={v => setDraft({...draft, addressLines: v.split('\n')})} 
            rows={3}
          />
          <TextField label="Google Maps URL" value={draft.mapsUrl} onChange={v => setDraft({...draft, mapsUrl: v})} />
        </Card>

        <Card title="Social">
          <div className="grid sm:grid-cols-2 gap-4">
            <TextField label="Facebook URL" value={draft.facebookUrl} onChange={v => setDraft({...draft, facebookUrl: v})} />
            <TextField label="Instagram URL" value={draft.instagramUrl} onChange={v => setDraft({...draft, instagramUrl: v})} />
          </div>
        </Card>

        <Card title="Branding & Images">
          <ImagePicker label="Logo" value={draft.logoUrl} onChange={v => setDraft({...draft, logoUrl: v})} />
          <ImagePicker label="Hero Background" value={draft.heroImageUrl} onChange={v => setDraft({...draft, heroImageUrl: v})} />
          <ImagePicker label="Storefront (Shop Highlight)" value={draft.shopImageUrl} onChange={v => setDraft({...draft, shopImageUrl: v})} />
        </Card>

        <Card title="Gallery">
          <div className="space-y-4">
            {draft.galleryImages.map((img, i) => (
              <div key={i} className="flex gap-4 items-start p-4 bg-secondary rounded-2xl border border-border">
                <div className="flex-1 space-y-4">
                  <ImagePicker label={`Image ${i+1}`} value={img.url} onChange={v => {
                    const newArr = [...draft.galleryImages];
                    newArr[i].url = v;
                    setDraft({...draft, galleryImages: newArr});
                  }} />
                  <TextField label="Caption (Alt Text)" value={img.alt} onChange={v => {
                    const newArr = [...draft.galleryImages];
                    newArr[i].alt = v;
                    setDraft({...draft, galleryImages: newArr});
                  }} />
                </div>
                <button onClick={() => setDraft({...draft, galleryImages: draft.galleryImages.filter((_, idx) => idx !== i)})} className="text-destructive p-2 hover:bg-destructive/10 rounded-xl mt-6">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button onClick={() => setDraft({...draft, galleryImages: [...draft.galleryImages, { url: '', alt: '' }]})} className="w-full py-4 border-2 border-dashed border-border rounded-2xl text-muted-foreground font-medium flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors">
              <Plus className="w-5 h-5" /> Add Image
            </button>
          </div>
        </Card>

        <Card title="Products">
          <div className="space-y-4">
            {draft.products.map((p, i) => (
              <div key={i} className="flex gap-4 items-start p-4 bg-secondary rounded-2xl border border-border">
                <div className="flex-1 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <TextField label="Product Name" value={p.name} onChange={v => {
                      const newArr = [...draft.products];
                      newArr[i].name = v;
                      setDraft({...draft, products: newArr});
                    }} />
                    <TextField label="Price Label" value={p.price} onChange={v => {
                      const newArr = [...draft.products];
                      newArr[i].price = v;
                      setDraft({...draft, products: newArr});
                    }} />
                  </div>
                  <ImagePicker label="Product Image (Optional)" value={p.imageUrl} onChange={v => {
                    const newArr = [...draft.products];
                    newArr[i].imageUrl = v;
                    setDraft({...draft, products: newArr});
                  }} />
                </div>
                <button onClick={() => setDraft({...draft, products: draft.products.filter((_, idx) => idx !== i)})} className="text-destructive p-2 hover:bg-destructive/10 rounded-xl mt-6">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button onClick={() => setDraft({...draft, products: [...draft.products, { name: '', price: '', imageUrl: '' }]})} className="w-full py-4 border-2 border-dashed border-border rounded-2xl text-muted-foreground font-medium flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors">
              <Plus className="w-5 h-5" /> Add Product
            </button>
          </div>
        </Card>

      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Primitives
// -----------------------------------------------------------------------------

function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-5 font-sans relative">
      <a href="/" className="absolute top-6 left-6 text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
        <ArrowLeft className="w-4 h-4" /> Back to profile
      </a>
      <div className="glass-card p-8 md:p-12 w-full max-w-md rounded-3xl animate-fade-up shadow-card">
        <div className="w-16 h-16 rounded-2xl gold-surface mx-auto mb-6 flex items-center justify-center font-bold text-white text-2xl shadow-gold">SF</div>
        <h1 className="font-display font-bold text-3xl text-center mb-2">Admin Login</h1>
        <p className="text-center text-muted-foreground text-sm mb-8">Sign in to edit your digital profile.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-secondary rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary border border-transparent transition-all" />
          <input required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-secondary rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary border border-transparent transition-all" />
          {error && <p className="text-sm text-destructive text-center font-medium">{error}</p>}
          <button type="submit" className="w-full gold-surface text-primary-foreground py-3.5 rounded-xl font-bold shadow-gold hover:scale-[1.02] transition-transform mt-4">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-background rounded-3xl p-6 shadow-soft border border-border/50">
      <h3 className="font-display font-bold text-xl mb-6">{title}</h3>
      <div className="space-y-5">
        {children}
      </div>
    </div>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (val: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-muted-foreground">{label}</label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow text-sm" />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 4 }: { label: string; value: string; onChange: (val: string) => void; rows?: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-muted-foreground">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow text-sm resize-none" />
    </div>
  );
}

function ImagePicker({ label, value, onChange }: { label: string; value: string; onChange: (val: string) => void }) {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const dataUrl = await fileToDataUrl(file);
        onChange(dataUrl);
      } catch (err) {
        console.error("Failed to read file", err);
      }
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-muted-foreground">{label}</label>
      <div className="flex gap-3">
        {value ? (
          <img src={value} alt="Preview" className="w-12 h-12 rounded-lg object-cover border border-border shrink-0" />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0">
            <ImageIcon className="w-5 h-5 text-muted-foreground" />
          </div>
        )}
        <div className="flex-1 flex flex-col sm:flex-row gap-2">
          <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder="Image URL or Base64" className="flex-1 bg-background border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary text-sm" />
          <label className="shrink-0 bg-secondary border border-border text-foreground px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-accent cursor-pointer transition-colors text-center">
            Upload
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
}
