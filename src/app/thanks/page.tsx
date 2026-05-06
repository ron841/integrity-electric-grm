import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Message received — Integrity Electric",
  description: "Your message reached the Integrity Electric team. Same-day callback expected on weekdays.",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <main id="main">
      <header className="nav">
        <div className="container nav-inner">
          <a href="/" className="nav-mark" aria-label="Integrity Electric — home">
            <img
              src="/assets/integritylogo.jpg"
              alt="Integrity Electrical Contracting of Florida"
            />
          </a>
          <nav className="nav-links" aria-label="Primary">
            <a href="/#services">Services</a>
            <a href="/reviews">Reviews</a>
            <a href="/#about">About</a>
            <a href="/#faq">FAQ</a>
            <a href="/#contact">Contact</a>
          </nav>
          <a href="tel:+13523076335" className="nav-cta">
            Call (352) 307-6335
          </a>
        </div>
      </header>

      <div className="thanks-page">
        <div className="thanks-card">
          <span className="eyebrow">Got it</span>
          <h1>Message received.</h1>
          <p>
            The team will reach out — same-day on weekdays in most cases. If
            it&apos;s urgent or after Friday noon, calling gets you faster.
          </p>
          <a href="tel:+13523076335" className="btn-primary" style={{ background: "var(--accent)", color: "var(--bg)" }}>
            Call (352) 307-6335
          </a>
          <p style={{ marginTop: 32 }}>
            <a href="/" className="proof-cta">← Back to home</a>
          </p>
        </div>
      </div>
    </main>
  );
}
