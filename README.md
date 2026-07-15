# Smile & Co. Dental Clinic — Standalone Funnel

A plain HTML/CSS/JS rebuild of the 3-step "Free Smile Assessment" funnel, with **no dependency on GoHighLevel/FunnelGenie**. Copy, layout, colors, and images are matched to the original.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Landing page — hero, lead-capture form, trust badges, about, testimonials, final CTA |
| `booking.html` | Calendly-embedded scheduling page |
| `thank-you.html` | Post-booking confirmation page |

## Required setup before going live

These four steps all require accounts that only you can create (I can't sign up for third-party
services on your behalf) — each is a 2–5 minute task once you're ready:

1. **Form submissions (Formspree)**
   - Create a free form at [formspree.io](https://formspree.io) and copy your form endpoint.
   - In `index.html`, replace `https://formspree.io/f/YOUR_FORM_ID` in the `<form action="...">` attribute with your real endpoint.
   - Formspree's free tier covers 50 submissions/month; upgrade if volume is higher.

2. **Booking calendar (Calendly)**
   - Create a "Free Smile Assessment" (45 min) event type in Calendly.
   - In `booking.html`, replace `YOUR-CALENDLY-USERNAME/free-smile-assessment` in the `data-url` attribute with your real scheduling link.
   - The page already redirects visitors to `thank-you.html` automatically when a booking is confirmed (via the Calendly `event_scheduled` postMessage event).

3. **Tracking (Meta Pixel + GA4)** — already wired up, just needs real IDs
   - Replace every `YOUR_PIXEL_ID` (3 occurrences: `index.html`, `booking.html`, `thank-you.html`) with your Meta Pixel ID from Meta Events Manager.
   - Replace every `G-XXXXXXXXXX` (same 3 files) with your GA4 Measurement ID.
   - Events already fire at the right points: `PageView` on every page, `Lead` when the form is submitted, `Schedule` when someone reaches the thank-you page.

4. **Hosting**
   - Currently live on GitHub Pages (free): `https://cramone3.github.io/smile-and-co-funnel/`.
   - To use a custom domain instead, add a CNAME record in your Hostinger DNS pointing at that GitHub Pages URL (same pattern your portfolio site already uses).

## What changed vs. the original GHL/FunnelGenie funnel

- The lead form is a plain HTML form (previously a GHL LeadConnector widget with reCAPTCHA Enterprise + intl-tel-input).
- The calendar is a Calendly embed (previously GHL's native calendar widget).
- Images were downloaded from GHL's asset CDN and are now hosted locally in `assets/img/`.
- No `stcdn.leadconnectorhq.com` / `images.leadconnectorhq.com` / GHL scripts remain — the site has zero runtime dependency on your GHL sub-account.

## Recommendations for your review

**Form & lead handling**
- Formspree emails you each lead but doesn't do CRM/pipeline automation. If you rely on GHL's automations (SMS reminders, drip email, pipeline stages) for what happens *after* a lead submits, you'll lose that unless you either (a) keep a lightweight GHL sub-account just for automations and pipe Formspree submissions into it via Zapier/Make, or (b) rebuild those sequences in another tool (e.g., Mailgun, which you already use, plus the n8n workflows in the [Smile & Co CRM repo](https://github.com/Cramone3/smile-and-co-crm)).
- Basic honeypot spam protection is now built in (a hidden `_gotcha` field Formspree checks). This is lighter than the original's Google reCAPTCHA Enterprise — fine for low volume, but if spam becomes a problem, Formspree also supports reCAPTCHA on paid plans.

**Booking & reminders**
- Calendly's free tier only supports one event type — fine for this single-offer funnel, but if you expand to multiple offers you'll need a paid tier or an alternative like Cal.com (self-hostable, no event-type cap on the free tier).
- GHL calendars typically auto-send SMS/email reminders; Calendly does this too, but confirm your Calendly plan includes SMS reminders if that mattered in the original flow.

**Assets & branding**
- Several images (testimonial avatar, "logoipsum" testimonial logo, feature icons) are generic template stock assets, not real photos of your clinic/patients. Worth swapping for real photos before this goes live with real ad spend, since it's currently a demo/portfolio-style template rather than a real business.
- The phone/email/address in the footer are still placeholder values (`(555) 123-4567`, `hello@smileandco.com`) — update if this becomes a live funnel for a real client.

**Longer-term**
- If you plan to build funnels like this for multiple clients, it may be worth turning this into a small template/boilerplate (swap logo, colors, copy, and images per client) rather than rebuilding from scratch each time.
