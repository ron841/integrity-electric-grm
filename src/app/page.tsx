import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* NAV — logo image (per O1 v2 reversal) */}
      <header className="nav">
        <div className="container nav-inner">
          <a href="#top" className="nav-mark" data-slot="nav.wordmark" aria-label="Integrity Electric — home">
            <img
              src="/assets/integritylogo.jpg"
              alt="Integrity Electrical Contracting of Florida"
            />
          </a>
          <nav className="nav-links" aria-label="Primary">
            <a href="#services">Services</a>
            <a href="#proof">Reviews</a>
            <a href="#about">About</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </nav>
          <a
            href="tel:+13523076335"
            className="nav-cta"
            data-screen-label="01 Hero Call"
          >
            Call (352) 307-6335
          </a>
        </div>
      </header>

      <main id="main">
        {/* HERO */}
        <section id="top" className="hero" data-screen-label="01 Hero">
          <div className="hero-img-wrap">
            <Image
              src="/assets/hero-truck.jpg"
              alt="The Integrity Electric service truck and scissor-lift trailer parked at a Marion County horse property, brick paver drive and fence line behind."
              data-slot="hero.image"
              fill
              priority
              sizes="100vw"
            />
          </div>
          <div className="hero-overlay"></div>
          <div className="container hero-inner">
            <p className="eyebrow hero-eyebrow" data-slot="hero.eyebrow">
              4.8 stars · 106 Google reviews
            </p>
            <h1 data-slot="hero.headline">
              The electrician who <em>answers the phone</em>, names the price,
              and finishes what the last guy didn&apos;t.
            </h1>
            <p className="hero-subhead" data-slot="hero.subhead">
              Residential, agricultural, and small-commercial electrical out of
              Belleview — panels, generators, pool wiring, barns, and shops.
            </p>
            <div className="hero-ctas">
              <a
                href="tel:+13523076335"
                className="btn-primary"
                data-slot="hero.cta_primary"
              >
                Call (352) 307-6335
              </a>
              <a
                href="#proof"
                className="btn-secondary"
                data-slot="hero.cta_secondary"
              >
                See the work
              </a>
            </div>
            <blockquote className="hero-trust" data-slot="hero.trust_line">
              &ldquo;The only one to actually answer the phone.&rdquo;
              <cite>Kaliway F., Google review</cite>
            </blockquote>
          </div>
        </section>

        {/* TRUST MARQUEE — 5 cells with license (D-22 resolved from logo) */}
        <section className="trust" data-screen-label="02 Trust">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-value">
                <span
                  className="trust-value-stars"
                  data-slot="trust.item_1.value"
                >
                  4.8 ★
                </span>
              </div>
              <div className="trust-label" data-slot="trust.item_1.label">
                across 106 Google reviews
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-value" data-slot="trust.item_2.value">
                Same-day
              </div>
              <div className="trust-label" data-slot="trust.item_2.label">
                callbacks and free estimates
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-value" data-slot="trust.item_3.value">
                Marion County
              </div>
              <div className="trust-label" data-slot="trust.item_3.label">
                electrician based in Belleview
              </div>
            </div>
            <div className="trust-item">
              <div
                className="trust-value"
                style={{ fontSize: "clamp(16px, 1.5vw, 20px)" }}
                data-slot="trust.item_4.value"
              >
                Residential · Ag · Commercial
              </div>
              <div className="trust-label" data-slot="trust.item_4.label">
                one electrician for every property
              </div>
            </div>
            <div className="trust-item">
              <div
                className="trust-value"
                style={{ fontSize: "clamp(20px, 2vw, 26px)" }}
                data-slot="trust.item_5.value"
              >
                EC13006493
              </div>
              <div className="trust-label" data-slot="trust.item_5.label">
                Florida-licensed electrical contractor
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES — photo cards (E1 v2 fix-now) */}
        <section
          id="services"
          className="section"
          data-screen-label="03 Services"
        >
          <div className="container">
            <div className="section-head">
              <div className="label-stack">
                <span
                  className="eyebrow"
                  data-slot="services.section_eyebrow"
                >
                  What they do
                </span>
                <h2
                  className="section-title"
                  data-slot="services.section_title"
                >
                  Every kind of electrical work in Marion County
                </h2>
              </div>
              <p
                className="section-lead"
                data-slot="services.section_lead"
              >
                Twelve trades&apos; worth of jobs across one
                electrician&apos;s calendar — homes, farms, shops, and the
                projects the first guy didn&apos;t finish.
              </p>
            </div>
            <div className="services-grid">
              {[
                { num: "01", slot: "services.card_1", title: "Residential electrical", body: "Outlets, switches, fixtures, troubleshooting, and the small repairs that turn into bigger ones if you wait.", photo: "/assets/photos/gbp-01.jpg" },
                { num: "02", slot: "services.card_2", title: "Panels, poles, and service work", body: "Panel upgrades, utility-pole replacement, permitting, and inspections — full project, start to inspector-cleared.", photo: "/assets/photos/gbp-02.jpg" },
                { num: "03", slot: "services.card_3", title: "Generator inlet switches", body: "The job that used to take three estimate calls. Free quote, scheduled the next day, installed by the team — neighbor-tested.", photo: "/assets/photos/gbp-03.jpg" },
                { num: "04", slot: "services.card_4", title: "Pool and heat-pump wiring", body: "New equipment, corrected installs, and the wiring the last electrician didn't finish — diagnosed in an hour, fixed the same visit.", photo: "/assets/photos/gbp-04.jpg" },
                { num: "05", slot: "services.card_5", title: "Barns and outbuildings", body: "Old barns brought up to code, tack rooms, barn apartments, and the agricultural buildings nobody else wants to touch.", photo: "/assets/photos/gbp-05.jpg" },
                { num: "06", slot: "services.card_6", title: "Shops and small commercial", body: "Bay lights, outlets, switches, panels, underground wire — full shop builds with the owner in the room making changes as you go.", photo: "/assets/photos/gbp-06.jpg" },
              ].map((s) => (
                <article key={s.num} className="service-card">
                  <div className="service-photo">
                    <Image
                      src={s.photo}
                      alt={`Integrity Electric ${s.title.toLowerCase()} job photo`}
                      width={800}
                      height={600}
                      sizes="(max-width: 600px) 100vw, (max-width: 980px) 50vw, 33vw"
                    />
                  </div>
                  <div className="service-body-wrap">
                    <span className="service-num">{s.num}</span>
                    <h3 className="service-title" data-slot={`${s.slot}.title`}>{s.title}</h3>
                    <p className="service-body" data-slot={`${s.slot}.body`}>{s.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROOF — 6 quotes + real photo grid */}
        <section
          id="proof"
          className="section proof"
          data-screen-label="04 Proof"
        >
          <div className="container">
            <div className="section-head">
              <div className="label-stack">
                <span className="eyebrow" data-slot="proof.section_eyebrow">
                  Proof
                </span>
                <h2 className="section-title" data-slot="proof.section_title">
                  A hundred and six reviews. Four-point-eight stars.
                </h2>
              </div>
              <p className="section-lead" data-slot="proof.section_lead">
                Real jobs from real Marion County customers — pulled straight
                from Google.
              </p>
            </div>

            {/* Curated leads — first row */}
            <div className="proof-quotes">
              <article className="quote-card">
                <div className="quote-stars">★★★★★</div>
                <p className="quote-body" data-slot="proof.review_1.body">
                  &ldquo;Within 10 minutes of looking at it all he immediately
                  knew what had to be done… they went above and beyond even
                  switching over my internet box for me onto the new pole and
                  checking all the wiring to ensure that everything would be
                  cleared by the inspector and was safe.&rdquo;
                </p>
                <div className="quote-meta">
                  <span className="quote-attribution" data-slot="proof.review_1.attribution">
                    Micah H. · Google · 10 months ago
                  </span>
                  <span className="quote-context" data-slot="proof.review_1.context">
                    Pole replacement and new panel
                  </span>
                </div>
              </article>
              <article className="quote-card">
                <div className="quote-stars">★★★★★</div>
                <p className="quote-body" data-slot="proof.review_2.body">
                  &ldquo;Matthew was the only one to actually answer the
                  phone! He scheduled us for the very next day for a free
                  estimate and showed up at the exact time we discussed…
                  every encounter was hands down 5 stars.&rdquo;
                </p>
                <div className="quote-meta">
                  <span className="quote-attribution" data-slot="proof.review_2.attribution">
                    Kaliway F. · Google · 9 months ago
                  </span>
                  <span className="quote-context" data-slot="proof.review_2.context">
                    Generator inlet switch installation
                  </span>
                </div>
              </article>
              <article className="quote-card">
                <div className="quote-stars">★★★★★</div>
                <p className="quote-body" data-slot="proof.review_3.body">
                  &ldquo;After calling around and experiencing no shows, high
                  prices, too low of prices, and just overall low quality
                  workers and service we finally were recommended to
                  Integrity… he shows up on time, understands the needs and
                  gets it done properly.&rdquo;
                </p>
                <div className="quote-meta">
                  <span className="quote-attribution" data-slot="proof.review_3.attribution">
                    Vanessa S. · Google · 2 years ago
                  </span>
                  <span className="quote-context" data-slot="proof.review_3.context">
                    Barn rewiring and tack-room build
                  </span>
                </div>
              </article>
            </div>

            {/* Second row — 3 more curated quotes */}
            <div className="proof-quotes row-2">
              <article className="quote-card">
                <div className="quote-stars">★★★★★</div>
                <p className="quote-body" data-slot="proof.review_4.body">
                  &ldquo;I called Integrity to correct the work of a previous
                  electrician that wired a new swimming pool heat pump.
                  Mathew answered the phone and set up an appointment that
                  fit my schedule. The crew showed up on time and did
                  excellent work.&rdquo;
                </p>
                <div className="quote-meta">
                  <span className="quote-attribution" data-slot="proof.review_4.attribution">
                    J. Winnett · Google · 2 months ago
                  </span>
                  <span className="quote-context" data-slot="proof.review_4.context">
                    Pool heat-pump rewire and correction
                  </span>
                </div>
              </article>
              <article className="quote-card">
                <div className="quote-stars">★★★★★</div>
                <p className="quote-body" data-slot="proof.review_5.body">
                  &ldquo;Came the same day that I called and was completely
                  knowledgeable for the task at hand. He was done in less
                  than an hour. We were very pleased. Excellent. We will use
                  them again when we need their services.&rdquo;
                </p>
                <div className="quote-meta">
                  <span className="quote-attribution" data-slot="proof.review_5.attribution">
                    Diane H. · Google · 6 months ago
                  </span>
                  <span className="quote-context" data-slot="proof.review_5.context">
                    Same-day residential service
                  </span>
                </div>
              </article>
              <article className="quote-card">
                <div className="quote-stars">★★★★★</div>
                <p className="quote-body" data-slot="proof.review_6.body">
                  &ldquo;I have used Integrity Electric at both my house and
                  my office. I have recommended them to friends and family.
                  Their quality and professionalism are unmatched!&rdquo;
                </p>
                <div className="quote-meta">
                  <span className="quote-attribution" data-slot="proof.review_6.attribution">
                    Casey D. · Google · 3 months ago
                  </span>
                  <span className="quote-context" data-slot="proof.review_6.context">
                    Repeat customer — house and office
                  </span>
                </div>
              </article>
            </div>

            {/* Photo grid — 4 real photos (E2 v2 fix-now) */}
            <div
              className="proof-photos"
              aria-label="Recent finished-work photos"
            >
              {[
                { slot: "proof.photo_1", src: "/assets/photos/gbp-07.jpg" },
                { slot: "proof.photo_2", src: "/assets/photos/gbp-08.jpg" },
                { slot: "proof.photo_3", src: "/assets/photos/gbp-09.jpg" },
                { slot: "proof.photo_4", src: "/assets/photos/gbp-10.jpg" },
              ].map((p, i) => (
                <div className="proof-photo" data-slot={p.slot} key={p.slot}>
                  <Image
                    src={p.src}
                    alt={`Integrity Electric finished-work photo ${i + 1}`}
                    width={600}
                    height={750}
                    sizes="(max-width: 760px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>

            <div className="proof-cta-row">
              <a
                href="/reviews"
                className="proof-cta"
                data-slot="proof.cta_to_reviews_page"
              >
                Read all 106 reviews →
              </a>
              <a
                href="https://www.google.com/maps/place/?q=place_id:ChIJy-BZ5zTP54gRfo78eg_6t7g"
                className="proof-cta"
                data-slot="proof.cta_to_google"
                target="_blank"
                rel="noopener"
              >
                On Google →
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section" data-screen-label="05 About">
          <div className="container about-grid">
            <div className="label-stack">
              <span className="eyebrow" data-slot="about.section_eyebrow">
                About
              </span>
              <h2 className="section-title" data-slot="about.section_title">
                A Belleview electrician with a Marion County book.
              </h2>
            </div>
            <div className="about-paras">
              <p data-slot="about.para_1">
                The Integrity team works out of Belleview and runs jobs from
                Ocala out to The Villages — homes, horse properties, shops,
                and the occasional commercial building. The lead electrician
                answers the phone himself. The estimates are free and they
                show up when they say.
              </p>
              <p data-slot="about.para_2">
                Most of the calls start the same way: somebody&apos;s already
                had an electrician out, and the work didn&apos;t get
                finished, or the price didn&apos;t add up, or the phone
                stopped getting picked up. Integrity gets the second call.
                The team diagnoses the actual problem fast, names the price,
                and finishes the job — pole, panel, pool pump, barn, shop,
                generator, whatever&apos;s actually wrong.
              </p>
              <p data-slot="about.para_3">
                One-hundred-six reviews on Google and a four-point-eight
                average mostly say the same three things: he picked up the
                phone, he showed up on time, and the work was done right.
                That&apos;s the whole pitch.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="section faq"
          data-screen-label="06 FAQ"
        >
          <div className="container">
            <div className="section-head">
              <div className="label-stack">
                <span className="eyebrow" data-slot="faq.section_eyebrow">
                  Common questions
                </span>
                <h2 className="section-title" data-slot="faq.section_title">
                  What people usually want to know before they call.
                </h2>
              </div>
            </div>
            <div className="faq-list">
              <details className="faq-item">
                <summary data-slot="faq.q1.q">How fast can someone come out?</summary>
                <p className="faq-answer" data-slot="faq.q1.a">
                  Often same-day. Customers describe calling in the morning
                  and having the team on site by afternoon — and free
                  estimates scheduled for the next business day. Friday
                  call-by-noon is the rough ceiling for same-week scheduling.
                </p>
              </details>
              <details className="faq-item">
                <summary data-slot="faq.q2.q">What kind of jobs do you take?</summary>
                <p className="faq-answer" data-slot="faq.q2.a">
                  Residential repair and troubleshooting, full panel and
                  service upgrades, generator inlet switches, pool and
                  heat-pump wiring, barn and outbuilding electrical, and
                  small-commercial shop builds. If it&apos;s electrical and
                  it&apos;s in Marion County, it&apos;s probably a yes.
                </p>
              </details>
              <details className="faq-item">
                <summary data-slot="faq.q3.q">Are estimates free?</summary>
                <p className="faq-answer" data-slot="faq.q3.a">
                  Yes — estimates are free, and the team will quote the job
                  before any work starts. The Google reviews from Kaliway
                  and Micah walk through the order of operations: call,
                  scheduled estimate, written number, then the job.
                </p>
              </details>
              <details className="faq-item">
                <summary data-slot="faq.q4.q">Where do you work?</summary>
                <p className="faq-answer" data-slot="faq.q4.a">
                  Based in Belleview. Regular service area covers Marion
                  County — Ocala, The Villages, Summerfield, Dunnellon, and
                  the surrounding agricultural properties.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="section"
          data-screen-label="07 Contact"
        >
          <div className="container">
            <div className="section-head">
              <div className="label-stack">
                <span className="eyebrow" data-slot="contact.section_eyebrow">
                  Get in touch
                </span>
                <h2 className="section-title" data-slot="contact.section_title">
                  Free estimate. Same conversation either way.
                </h2>
              </div>
              <p className="section-lead" data-slot="contact.section_lead">
                Phone is fastest. Email and the form below both reach the
                team — phone gets you a callback the same day in most cases.
              </p>
            </div>
            <div className="contact-grid">
              <div className="contact-phone-block">
                <span className="phone-label">Call the lead electrician</span>
                <a
                  href="tel:+13523076335"
                  className="phone-num"
                  data-slot="contact.phone"
                >
                  (352) 307-6335
                </a>
                <p className="contact-phone-note" data-slot="contact.phone_note">
                  Lead electrician answers most days.
                </p>
              </div>
              <div className="contact-secondary">
                <div className="contact-row">
                  <span className="contact-row-label">Email</span>
                  <span className="contact-row-value">
                    <a href="mailto:integrity.elec@aol.com" data-slot="contact.email">
                      integrity.elec@aol.com
                    </a>
                  </span>
                </div>
                <div className="contact-row">
                  <span className="contact-row-label">Address</span>
                  <span className="contact-row-value">
                    <span data-slot="contact.address_street">7325 SE 105th Pl</span>
                    <br />
                    <span data-slot="contact.address_locality">Belleview, FL 34420</span>
                  </span>
                </div>
                <div className="contact-row">
                  <span className="contact-row-label">Hours</span>
                  <div className="hours-table">
                    <span className="hours-day">Mon</span>
                    <span className="hours-time" data-slot="contact.hours.mon">7:30 AM – 5:00 PM</span>
                    <span className="hours-day">Tue</span>
                    <span className="hours-time" data-slot="contact.hours.tue">7:30 AM – 5:00 PM</span>
                    <span className="hours-day">Wed</span>
                    <span className="hours-time" data-slot="contact.hours.wed">7:30 AM – 5:00 PM</span>
                    <span className="hours-day">Thu</span>
                    <span className="hours-time" data-slot="contact.hours.thu">7:30 AM – 5:00 PM</span>
                    <span className="hours-day">Fri</span>
                    <span className="hours-time" data-slot="contact.hours.fri">7:30 AM – 5:00 PM*</span>
                    <span className="hours-day">Sat</span>
                    <span className="hours-time" data-slot="contact.hours.sat">9:00 AM – 12:00 PM</span>
                    <span className="hours-day">Sun</span>
                    <span className="hours-time closed" data-slot="contact.hours.sun">Closed</span>
                  </div>
                  <p className="hours-note" data-slot="contact.hours.fri_note">
                    *Friday hours pending walkthrough confirmation — captured data shows 5:00 AM, PM intended.
                  </p>
                </div>
                <div className="contact-row">
                  <span className="contact-row-label">Facebook</span>
                  <span className="contact-row-value">
                    <a
                      href="https://www.facebook.com/Integrityelectric1/"
                      data-slot="contact.facebook"
                      target="_blank"
                      rel="noopener"
                    >
                      facebook.com/Integrityelectric1
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT FORM (D-18 v2 reversal) */}
        <section
          id="contact-form"
          className="contact-form-section"
          data-screen-label="08 Contact form"
        >
          <div className="container">
            <div className="contact-form-grid">
              <div className="label-stack">
                <span className="eyebrow" data-slot="form.section_eyebrow">
                  Send a message
                </span>
                <h2
                  className="section-title"
                  style={{ fontSize: "clamp(28px, 3.4vw, 44px)" }}
                  data-slot="form.section_title"
                >
                  Prefer email? Tell us about the job.
                </h2>
                <p className="section-lead" style={{ fontSize: "16px", maxWidth: "44ch" }}>
                  We respond same-day on weekdays. For emergencies and Friday-after-noon scheduling, call instead.
                </p>
              </div>
              <form
                className="contact-form"
                action="https://api.staticforms.xyz/submit"
                method="post"
                data-slot="form.element"
              >
                <input type="hidden" name="accessKey" value="sf_e0e200934d4f36c17a10d00c" />
                <input type="hidden" name="subject" value="Integrity Electric · Contact form" />
                <input type="hidden" name="redirectTo" value="https://integrity-electric-grm.vercel.app/thanks" />
                <input type="hidden" name="replyTo" value="@" />
                <div className="honeypot">
                  <label htmlFor="gotcha">Leave blank</label>
                  <input type="text" id="gotcha" name="$gotcha" tabIndex={-1} autoComplete="off" />
                </div>
                <div>
                  <label htmlFor="form-name">Name</label>
                  <input id="form-name" name="name" type="text" required autoComplete="name" />
                </div>
                <div>
                  <label htmlFor="form-email">Email</label>
                  <input id="form-email" name="email" type="email" required autoComplete="email" />
                </div>
                <div>
                  <label htmlFor="form-phone">Phone (optional)</label>
                  <input id="form-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div>
                  <label htmlFor="form-message">What&apos;s the job?</label>
                  <textarea id="form-message" name="message" required></textarea>
                </div>
                <button type="submit">Send to Integrity</button>
                <p className="contact-form-note">
                  Goes straight to the team. We don&apos;t share your info.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-col">
              <div className="footer-mark" data-slot="footer.wordmark">
                Integrity <span>Electric</span>
              </div>
              <p className="footer-tagline" data-slot="footer.tagline">
                Marion County&apos;s pick-up-the-phone electrician.
              </p>
            </div>
            <div className="footer-col">
              <p className="footer-col-title">Visit</p>
              <p data-slot="footer.contact_line">
                7325 SE 105th Pl
                <br />
                Belleview, FL 34420
                <br />
                <a href="tel:+13523076335">(352) 307-6335</a>
              </p>
            </div>
            <div className="footer-col">
              <p className="footer-col-title">Hours</p>
              <p>
                Mon–Fri 7:30 AM – 5:00 PM
                <br />
                Sat 9:00 AM – 12:00 PM
                <br />
                Sun closed
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <span data-slot="footer.copyright">
              © 2026{" "}
              <span data-slot="footer.legal_name">
                Integrity Electrical Contracting of Florida Inc.
              </span>{" "}
              All rights reserved.
            </span>
            <span data-slot="footer.fl_license">
              FL EC# EC13006493
            </span>
          </div>
        </div>
      </footer>

      <a
        href="tel:+13523076335"
        className="sticky-call"
        data-slot="sticky.cta_label"
      >
        Call (352) 307-6335
      </a>
    </>
  );
}
