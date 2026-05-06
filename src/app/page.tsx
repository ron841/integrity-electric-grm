export default function Home() {
  return (
    <>
      {/* NAV */}
      <header className="nav">
        <div className="container nav-inner">
          <a href="#top" className="nav-mark" data-slot="nav.wordmark">
            Integrity <span>Electric</span>
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
          <img
            className="hero-img"
            src="/assets/hero-truck.jpg"
            alt="The Integrity Electric service truck and scissor-lift trailer parked at a Marion County horse property, brick paver drive and fence line behind."
            data-slot="hero.image"
          />
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

        {/* TRUST MARQUEE */}
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
                style={{ fontSize: "clamp(18px, 1.7vw, 22px)" }}
                data-slot="trust.item_4.value"
              >
                Residential · Ag · Commercial
              </div>
              <div className="trust-label" data-slot="trust.item_4.label">
                one electrician for every property
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
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
              <article className="service-card">
                <span className="service-num">01</span>
                <h3
                  className="service-title"
                  data-slot="services.card_1.title"
                >
                  Residential electrical
                </h3>
                <p className="service-body" data-slot="services.card_1.body">
                  Outlets, switches, fixtures, troubleshooting, and the small
                  repairs that turn into bigger ones if you wait.
                </p>
              </article>
              <article className="service-card">
                <span className="service-num">02</span>
                <h3
                  className="service-title"
                  data-slot="services.card_2.title"
                >
                  Panels, poles, and service work
                </h3>
                <p className="service-body" data-slot="services.card_2.body">
                  Panel upgrades, utility-pole replacement, permitting, and
                  inspections — full project, start to inspector-cleared.
                </p>
              </article>
              <article className="service-card">
                <span className="service-num">03</span>
                <h3
                  className="service-title"
                  data-slot="services.card_3.title"
                >
                  Generator inlet switches
                </h3>
                <p className="service-body" data-slot="services.card_3.body">
                  The job that used to take three estimate calls. Free quote,
                  scheduled the next day, installed by the team —
                  neighbor-tested.
                </p>
              </article>
              <article className="service-card">
                <span className="service-num">04</span>
                <h3
                  className="service-title"
                  data-slot="services.card_4.title"
                >
                  Pool and heat-pump wiring
                </h3>
                <p className="service-body" data-slot="services.card_4.body">
                  New equipment, corrected installs, and the wiring the last
                  electrician didn&apos;t finish — diagnosed in an hour, fixed
                  the same visit.
                </p>
              </article>
              <article className="service-card">
                <span className="service-num">05</span>
                <h3
                  className="service-title"
                  data-slot="services.card_5.title"
                >
                  Barns and outbuildings
                </h3>
                <p className="service-body" data-slot="services.card_5.body">
                  Old barns brought up to code, tack rooms, barn apartments,
                  and the agricultural buildings nobody else wants to touch.
                </p>
              </article>
              <article className="service-card">
                <span className="service-num">06</span>
                <h3
                  className="service-title"
                  data-slot="services.card_6.title"
                >
                  Shops and small commercial
                </h3>
                <p className="service-body" data-slot="services.card_6.body">
                  Bay lights, outlets, switches, panels, underground wire —
                  full shop builds with the owner in the room making changes
                  as you go.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* PROOF */}
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
                  <span
                    className="quote-attribution"
                    data-slot="proof.review_1.attribution"
                  >
                    Micah H. · Google · 10 months ago
                  </span>
                  <span
                    className="quote-context"
                    data-slot="proof.review_1.context"
                  >
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
                  <span
                    className="quote-attribution"
                    data-slot="proof.review_2.attribution"
                  >
                    Kaliway F. · Google · 9 months ago
                  </span>
                  <span
                    className="quote-context"
                    data-slot="proof.review_2.context"
                  >
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
                  <span
                    className="quote-attribution"
                    data-slot="proof.review_3.attribution"
                  >
                    Vanessa S. · Google · 2 years ago
                  </span>
                  <span
                    className="quote-context"
                    data-slot="proof.review_3.context"
                  >
                    Barn rewiring and tack-room build
                  </span>
                </div>
              </article>
            </div>
            <div
              className="proof-photos"
              aria-label="Recent finished-work photos (operator-curated at walkthrough)"
            >
              <div className="proof-photo" data-slot="proof.photo_1">
                Photo 01
              </div>
              <div className="proof-photo" data-slot="proof.photo_2">
                Photo 02
              </div>
              <div className="proof-photo" data-slot="proof.photo_3">
                Photo 03
              </div>
              <div className="proof-photo" data-slot="proof.photo_4">
                Photo 04
              </div>
            </div>
            <div className="proof-cta-row">
              <a
                href="https://www.google.com/search?q=Integrity+Electrical+Contracting+of+Florida+Belleview"
                className="proof-cta"
                data-slot="proof.cta_to_google"
                target="_blank"
                rel="noopener"
              >
                See all 106 reviews on Google →
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
                <summary data-slot="faq.q1.q">
                  How fast can someone come out?
                </summary>
                <p className="faq-answer" data-slot="faq.q1.a">
                  Often same-day. Customers describe calling in the morning
                  and having the team on site by afternoon — and free
                  estimates scheduled for the next business day. Friday
                  call-by-noon is the rough ceiling for same-week
                  scheduling.
                </p>
              </details>
              <details className="faq-item">
                <summary data-slot="faq.q2.q">
                  What kind of jobs do you take?
                </summary>
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
                <span
                  className="eyebrow"
                  data-slot="contact.section_eyebrow"
                >
                  Get in touch
                </span>
                <h2
                  className="section-title"
                  data-slot="contact.section_title"
                >
                  Free estimate. Same conversation either way.
                </h2>
              </div>
              <p className="section-lead" data-slot="contact.section_lead">
                Phone is fastest. Email and the form below both reach the
                team — phone gets you a callback the same day in most
                cases.
              </p>
            </div>
            <div className="contact-grid">
              <div className="contact-phone-block">
                <span className="phone-label">
                  Call the lead electrician
                </span>
                <a
                  href="tel:+13523076335"
                  className="phone-num"
                  data-slot="contact.phone"
                >
                  (352) 307-6335
                </a>
                <p
                  className="contact-phone-note"
                  data-slot="contact.phone_note"
                >
                  Lead electrician answers most days.
                </p>
              </div>
              <div className="contact-secondary">
                <div className="contact-row">
                  <span className="contact-row-label">Email</span>
                  <span className="contact-row-value">
                    <a
                      href="mailto:integrity.elec@aol.com"
                      data-slot="contact.email"
                    >
                      integrity.elec@aol.com
                    </a>
                  </span>
                </div>
                <div className="contact-row">
                  <span className="contact-row-label">Address</span>
                  <span className="contact-row-value">
                    <span data-slot="contact.address_street">
                      7325 SE 105th Pl
                    </span>
                    <br />
                    <span data-slot="contact.address_locality">
                      Belleview, FL 34420
                    </span>
                  </span>
                </div>
                <div className="contact-row">
                  <span className="contact-row-label">Hours</span>
                  <div className="hours-table">
                    <span className="hours-day">Mon</span>
                    <span
                      className="hours-time"
                      data-slot="contact.hours.mon"
                    >
                      7:30 AM – 5:00 PM
                    </span>
                    <span className="hours-day">Tue</span>
                    <span
                      className="hours-time"
                      data-slot="contact.hours.tue"
                    >
                      7:30 AM – 5:00 PM
                    </span>
                    <span className="hours-day">Wed</span>
                    <span
                      className="hours-time"
                      data-slot="contact.hours.wed"
                    >
                      7:30 AM – 5:00 PM
                    </span>
                    <span className="hours-day">Thu</span>
                    <span
                      className="hours-time"
                      data-slot="contact.hours.thu"
                    >
                      7:30 AM – 5:00 PM
                    </span>
                    <span className="hours-day">Fri</span>
                    <span
                      className="hours-time"
                      data-slot="contact.hours.fri"
                    >
                      7:30 AM – 5:00 PM*
                    </span>
                    <span className="hours-day">Sat</span>
                    <span
                      className="hours-time"
                      data-slot="contact.hours.sat"
                    >
                      9:00 AM – 12:00 PM
                    </span>
                    <span className="hours-day">Sun</span>
                    <span
                      className="hours-time closed"
                      data-slot="contact.hours.sun"
                    >
                      Closed
                    </span>
                  </div>
                  <p
                    className="hours-note"
                    data-slot="contact.hours.fri_note"
                  >
                    *Friday hours pending walkthrough confirmation —
                    captured data shows 5:00 AM, PM intended.
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
            <span data-slot="footer.fl_license" hidden>
              FL EC# (pending walkthrough)
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
