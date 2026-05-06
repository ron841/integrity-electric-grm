import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Google reviews — Integrity Electric · Belleview, FL",
  description:
    "Curated set of recent Google reviews for Integrity Electrical Contracting of Florida Inc. — pulled from the live GBP listing.",
  alternates: { canonical: "/reviews" },
  robots: { index: true, follow: true },
};

type Review = {
  rating: number;
  name: string;
  date: string;
  context: string;
  body: string;
};

const positiveReviews: Review[] = [
  {
    rating: 5,
    name: "Micah Hyatt",
    date: "10 months ago",
    context: "Pole replacement and new panel",
    body:
      "My utility pole on my property rotted and needed to be replaced. I called a few places many of which didn't install the poles themselves. I called Integrity and spoke to Mathew and within an hour he was able to come over and give me a free estimate. Within 10 minutes of looking at it all he immediately knew what had to be done. With a quote and a plan we were able to get the permitting done and the next day the pole and new panel installed. Mathew sent over Rob and Justin who worked in the rain and the summer heat tirelessly. They went above and beyond even switching over my internet box for me onto the new pole and checking all the wiring to ensure that everything would be cleared by the inspector and was safe. This team at Integrity I truly believe know what that word means.",
  },
  {
    rating: 5,
    name: "Kaliway Fields",
    date: "9 months ago",
    context: "Generator inlet switch installation",
    body:
      "Recently purchased a home and were looking to get a generator inlet switch installed. I called multiple companies to set up estimates, however Matthew was the only one to actually answer the phone. He scheduled us for the very next day for a free estimate and showed up at the exact time we discussed. While here he made us feel he was knowledgeable with the scope of work we were seeking to have done. We felt comfortable and not pressured at all. His communication was exceptional. His prices were spot on with other companies. We chose to move forward with Integrity. I made the call Wednesday to schedule an estimate, Matthew came out Thursday to give the estimate, and the work was completed on Monday afternoon by their team. They installed another inlet switch a few houses down and the neighbor had the same experience as we did. Every encounter was hands down 5 stars.",
  },
  {
    rating: 5,
    name: "J. Winnett",
    date: "2 months ago",
    context: "Pool heat-pump rewire correction",
    body:
      "I called Integrity Electrical Contracting of Florida to correct the work of a previous electrician that wired a new swimming pool heat pump. Mathew answered the phone and set up an appointment for that afternoon. Matt arrived on schedule and proceeded to correct the issues within 1 hour. I couldn't be happier with the service and highly recommend Integrity Electrical Contracting of Florida.",
  },
  {
    rating: 5,
    name: "Vanessa Scoggins",
    date: "2 years ago",
    context: "Barn rewire and tack-room build",
    body:
      "My husband and I bought a farm that had an old barn. It was very overdue for new electric, lights, and updates in the tack room and barn apartment. After calling around and experiencing no shows, high prices, too low of prices, and just overall low quality workers and service we finally were recommended to Integrity. Matthew is extremely clear and great at communicating (which is a huge difference between him and the other companies). He shows up on time, understands the needs, and gets it done properly. I will be hiring him again for the house and highly recommend Matthew and his team at Integrity to anyone needing electrical work done in Ocala.",
  },
  {
    rating: 5,
    name: "Diane Haverly",
    date: "6 months ago",
    context: "Same-day residential service",
    body:
      "Came the same day that I called and was completely knowledgeable for the task at hand. He was done in less than an hour. We were very pleased. Excellent. We will use them again when we need their service. Thank you. — Paul and Diane Haverly.",
  },
  {
    rating: 5,
    name: "Casey Deluca",
    date: "3 months ago",
    context: "Repeat customer — house and office",
    body:
      "I have used Integrity Electric at both my house and my office. I have recommended them to friends and family. Their quality and professionalism are unmatched.",
  },
  {
    rating: 5,
    name: "Zach Smallridge",
    date: "2 years ago",
    context: "Shop project — full electrical",
    body:
      "Matt and his crew did a great job on my shop project. Great communication and attention to details. They were accommodating as we made plenty of changes and additions throughout the project. They installed bay lights, outlets, switches, panels, underground wire — the whole 9 yards. I highly recommend.",
  },
  {
    rating: 5,
    name: "Shawn Thomas",
    date: "5 months ago",
    context: "General construction electrical",
    body:
      "Integrity Electric has been great to work with. Matthew is very professional, and the work is top quality. — Shawn.",
  },
];

const criticalReviews: Review[] = [
  {
    rating: 2,
    name: "Giovanni Torres",
    date: "—",
    context: "Light fixture and outlet relocation",
    body:
      "Updated initial 5-star review. After the original $1,900 job a callback for an unfinished outlet led to a $175 disputed service-call charge that wasn't communicated up front. The technician on site (Justin) diagnosed and fixed the issue quickly. Customer-service gap on the billing side was the issue.",
  },
  {
    rating: 1,
    name: "Marcia Lentz",
    date: "4 months ago",
    context: "Receipt request after cash payment",
    body:
      "Requested a receipt for two cash payments and didn't receive timely follow-up. The work itself was completed.",
  },
];

function Card({ r, kind }: { r: Review; kind: "positive" | "negative" }) {
  return (
    <article className={`review-card ${kind === "negative" ? "negative" : ""}`}>
      <div className="stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
      <p className="body">&ldquo;{r.body}&rdquo;</p>
      <div className="meta">
        <div><span className="name">{r.name}</span> · <span className="date">Google · {r.date}</span></div>
        <div style={{ color: "var(--fg-muted)", fontStyle: "italic", marginTop: 4 }}>{r.context}</div>
      </div>
    </article>
  );
}

export default function ReviewsPage() {
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

      <section className="reviews-hero">
        <div className="container">
          <span className="eyebrow">Reviews</span>
          <h1>The full Google read.</h1>
          <p className="subhead">
            A curated set of the most recent Google reviews. The full
            106-review corpus lives on the Google listing — the link below
            opens it. Eight positives surface here; two critical reviews are
            included so the picture isn&apos;t one-sided.
          </p>
          <p style={{ marginTop: 18 }}>
            <a
              href="https://www.google.com/maps/place/?q=place_id:ChIJy-BZ5zTP54gRfo78eg_6t7g"
              className="proof-cta"
              target="_blank"
              rel="noopener"
            >
              See all 106 on Google →
            </a>
          </p>
        </div>
      </section>

      <section className="container">
        <h2 className="reviews-section-label">Five-star reviews</h2>
        <div className="reviews-grid">
          {positiveReviews.map((r) => (
            <Card key={r.name} r={r} kind="positive" />
          ))}
        </div>

        <h2 className="reviews-section-label" style={{ marginTop: 80 }}>
          Where things didn&apos;t go right
        </h2>
        <p style={{ color: "var(--fg-muted)", fontStyle: "italic", marginBottom: 0, fontFamily: "var(--serif)", fontSize: 17 }}>
          Two critical reviews from the Google corpus. Posting both for transparency.
        </p>
        <div className="reviews-grid">
          {criticalReviews.map((r) => (
            <Card key={r.name} r={r} kind="negative" />
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", padding: "60px 0" }}>
          <a href="/" className="proof-cta">← Back to home</a>
        </div>
      </section>

      <a href="tel:+13523076335" className="sticky-call">
        Call (352) 307-6335
      </a>
    </main>
  );
}
