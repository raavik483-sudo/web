import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Lightweight visual in hero to keep LCP fast (no heavy 3D/video)
function ModelViewerPlaceholder() {
  return (
    <div
      aria-hidden
      className="w-full h-full"
      style={{
        background:
          "radial-gradient(60% 60% at 70% 30%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%), linear-gradient(180deg,#0f1724 0%, #0b1220 100%)",
      }}
    />
  );
}

export default function DevdhanLanding() {
  // ===== Brand & Contact =====
  const PHONE = "+91-XXXX"; // TODO: replace
  const WHATSAPP = "918888888888"; // TODO: replace
  const BRAND = "Devdhan Interiors";
  const CITY = "Hyderabad";
  const EXPERIENCE_CENTRE = "2 km ahead of Dammaiguda, Ambedkar Nagar";

  // ===== State =====
  const [form, setForm] = useState({ name: "", phone: "", projectType: "Apartment", location: CITY, message: "" });
  const [immersive, setImmersive] = useState(true);

  // ===== Derived =====
  const whatsappHref = useMemo(() => {
    const text = encodeURIComponent(
      `Hi ${BRAND}, I’d like a 3D design & quote.\n\nName: ${form.name}\nPhone: ${form.phone}\nProject: ${form.projectType}\nLocation: ${form.location}\nNotes: ${form.message}\n\nI agree to pay after design approval.`
    );
    return `https://wa.me/${WHATSAPP}?text=${text}`;
  }, [form, WHATSAPP]);

  const orgSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      name: BRAND,
      address: { "@type": "PostalAddress", addressLocality: CITY, streetAddress: EXPERIENCE_CENTRE },
      telephone: PHONE,
      areaServed: [CITY, "Telangana", "India", "Turkey"],
      priceRange: "₹₹",
      sameAs: [],
    }),
    [BRAND]
  );

  // ===== Handlers =====
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (typeof window !== "undefined") window.open(whatsappHref, "_blank");
    // fire-and-forget lead capture (non-blocking)
    if (typeof fetch !== "undefined") {
      fetch("/api/leads", {
        method: "POST",
        body: JSON.stringify({ ...form, source: "landing-fast" }),
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      }).catch(() => {});
    }
  }

  // ===== Immersive cursor (kept), but cheap =====
  useEffect(() => {
    if (!immersive || typeof window === "undefined") return;
    const onMove = (e) => {
      document.documentElement.style.setProperty("--cursorX", `${e.clientX}px`);
      document.documentElement.style.setProperty("--cursorY", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [immersive]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 text-neutral-900" style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif" }}>
      <Head>
        <title>{BRAND} — Luxury Interiors in {CITY}</title>
        <meta name="description" content={`${BRAND} crafts world-class interiors and resorts. In-house design & delivery.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta property="og:title" content={`${BRAND} — Luxury Interiors`} />
        <meta property="og:description" content={`Premium interior design in ${CITY}. Turkey projects & resorts showcase.`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta name="theme-color" content="#0b1220" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </Head>

      {/* ===== Header (sticky, tiny) ===== */}
      <header className="fixed inset-x-0 top-0 z-50 bg-white/50 backdrop-blur supports-[backdrop-filter]:bg-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-black text-white grid place-items-center font-extrabold">D</div>
            <div className="text-sm leading-tight">
              <div className="font-semibold">{BRAND}</div>
              <div className="text-[11px] text-neutral-500">{CITY} • Interiors</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href={`tel:${PHONE}`} className="text-xs bg-white px-3 py-1.5 rounded-xl shadow">Call</a>
            <a href={whatsappHref} className="text-xs bg-white px-3 py-1.5 rounded-xl shadow">WhatsApp</a>
          </div>
        </div>
      </header>

      {/* ===== Hero (fast LCP) ===== */}
      <main>
        <section className="relative min-h-[88vh] overflow-hidden">
          <div className="absolute inset-0 -z-20"><ModelViewerPlaceholder /></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-28 sm:py-36">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="max-w-2xl">
              <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight">World‑Class Interiors. Built to Last.</h1>
              <p className="mt-4 text-neutral-200 text-lg md:text-xl">Studio-led design, in‑house craft, and theatre‑grade installation across India & Turkey.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#lead-form"><Button size="lg" className="rounded-2xl">Get 3D Concept</Button></a>
                <a href={whatsappHref} target="_blank" rel="noreferrer"><Button size="lg" variant="outline" className="rounded-2xl"><MessageCircle className="h-5 w-5 mr-2"/> WhatsApp</Button></a>
                <button onClick={() => setImmersive((s) => !s)} className="text-xs text-white/90 border border-white/20 rounded-2xl px-3">Immersive: {immersive ? 'On' : 'Off'}</button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== About / Philosophy ===== */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold">Craft, Control & Care</h2>
              <p className="mt-3 text-neutral-700">Designing in-house + manufacturing + installation lets us keep finish quality, timelines and pricing under absolute control. No middlemen. Real accountability.</p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-4 text-sm text-neutral-700">
                <li className="rounded-xl bg-white shadow p-3">Studio-led concepts & material boards</li>
                <li className="rounded-xl bg-white shadow p-3">In-house manufacture & QA</li>
                <li className="rounded-xl bg-white shadow p-3">45–60 day full delivery</li>
                <li className="rounded-xl bg-white shadow p-3">Aftercare & warranty support</li>
              </ul>
            </div>
            <div className="rounded-3xl overflow-hidden shadow bg-white p-6">
              <div className="text-sm text-neutral-500">Experience Centre</div>
              <div className="text-lg font-semibold">{EXPERIENCE_CENTRE}</div>
              <div className="mt-4">Walk-in materials, mockups and live demonstrations.</div>
              <div className="mt-6 flex gap-3">
                <a href={`tel:${PHONE}`}><Button className="rounded-2xl">Call Now</Button></a>
                <a href={whatsappHref} target="_blank" rel="noreferrer"><Button variant="outline" className="rounded-2xl">WhatsApp</Button></a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Turkey Projects & Resorts (lightweight placeholders, lazy media) ===== */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <h2 className="text-3xl font-extrabold text-center mb-10">Turkey Projects & Resorts</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="rounded-3xl overflow-hidden shadow-lg transition-transform hover:scale-[1.01]">
                <div className="h-48 w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" aria-label={`Turkey Project ${i}`} />
                <CardContent>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-700">Cinematic resort & interior project in Turkey. Fully designed & delivered by {BRAND}.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ===== Lead Form (fast, minimal) ===== */}
        <section className="bg-white py-16" aria-labelledby="lead-title">
          <div className="max-w-4xl mx-auto px-6">
            <h2 id="lead-title" className="text-2xl md:text-3xl font-extrabold">Tell us about your project</h2>
            <p className="text-neutral-600 mt-2">We’ll reply on WhatsApp quickly. Payment occurs after you approve the design.</p>
            <Card className="rounded-3xl shadow-2xl backdrop-blur bg-white/90 mt-6">
              <CardHeader>
                <CardTitle className="text-lg">3D Concept Request</CardTitle>
              </CardHeader>
              <CardContent>
                <form id="lead-form" onSubmit={handleSubmit} className="grid gap-3">
                  <Input name="name" required value={form.name} onChange={handleChange} placeholder="Full name" className="rounded-2xl" />
                  <Input name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="98XXXXXXXX" className="rounded-2xl" />
                  <Select value={form.projectType} onValueChange={(v) => setForm((f) => ({ ...f, projectType: v }))}>
                    <SelectTrigger className="rounded-2xl"><SelectValue placeholder="Project type" /></SelectTrigger>
                    <SelectContent>
                      {["Apartment", "Villa", "Office", "Restaurant", "Resort", "Retail"].map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input name="location" value={form.location} onChange={handleChange} className="rounded-2xl" placeholder="City / Area" />
                  <Textarea name="message" value={form.message} onChange={handleChange} placeholder="Notes (e.g., 3BHK, kitchen + wardrobes)" className="rounded-2xl" />
                  <div className="flex gap-3">
                    <Button type="submit" className="rounded-2xl flex-1">Send via WhatsApp</Button>
                    <Button type="button" variant="outline" asChild className="rounded-2xl"><a href={whatsappHref} target="_blank" rel="noreferrer">Open Chat</a></Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="bg-neutral-950 text-neutral-300 py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6">
          <div>
            <div className="text-white font-semibold">{BRAND}</div>
            <div className="text-sm mt-2">Luxury interiors. {CITY}.</div>
          </div>
          <div>
            <div className="font-medium text-white">Services</div>
            <ul className="mt-2 text-sm space-y-1">
              <li>Full Home Interiors</li>
              <li>Modular Kitchens</li>
              <li>Wardrobes</li>
              <li>Resorts & Hospitality</li>
            </ul>
          </div>
          <div>
            <div className="font-medium text-white">Contact</div>
            <div className="mt-2 text-sm">{PHONE} • WhatsApp: +{WHATSAPP}</div>
            <div className="mt-2 text-sm">{EXPERIENCE_CENTRE}</div>
          </div>
          <div>
            <div className="font-medium text-white">Hours</div>
            <div className="mt-2 text-sm">Mon–Sun • 10am – 8pm</div>
            <div className="mt-4">© {new Date().getFullYear()} {BRAND}</div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-3 rounded-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl"
      >
        <MessageCircle className="h-5 w-5" /> Chat
      </a>

      {/* Immersive cursor */}
      <div
        aria-hidden
        className="pointer-events-none fixed z-50"
        style={{ left: "var(--cursorX)", top: "var(--cursorY)", transform: "translate(-50%,-50%)" }}
      >
        {immersive && <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur border border-white/20" />}
      </div>

      <style jsx global>{`
        :root { --cursorX: 50vw; --cursorY: 50vh; }
        html, body, #__next { height: 100%; }
        /* Reduce motion preference */
        @media (prefers-reduced-motion: reduce) {
          .motion-safe\:hidden { display: none; }
        }
      `}</style>
    </div>
  );
}
