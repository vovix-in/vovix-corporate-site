# Product demos

Static, self-contained demo pages served from `public/demo/`. The Vovix Lens filings demo that used to live here was retired with the product.

---

# Vovix Phonics — interactive demo

- Live file: `public/demo/phonics.html` → served at **https://www.vovix.in/demo/phonics** (rewrite in `next.config.mjs`) and `/demo/phonics.html`.
- Single self-contained page (teacher portal + child app, embedded audio). No build step; Vercel serves it from `public/`.
- To update: replace `public/demo/phonics.html` and push to `main`.
- Not linked from the site navigation and excluded from `sitemap.xml` on purpose — share the URL directly with prospects.

---

# Vovix One — driving school demo (Sri Sastha Driving School)

- Live file: `public/demo/driving-school.html` → served at **https://www.vovix.in/demo/driving-school** (rewrite in `next.config.mjs`) and `/demo/driving-school.html`.
- Single self-contained page: phone app mock (enrol, verify, students, Form 5, WhatsApp, website), the desktop Sarathi helper mock, and the public one-page site. All data is sample data; nothing is sent anywhere. Demo login password is `demo1234`.
- Source of truth is the `vovix-one-demo` working folder (`index.html` + `app.js`); this file is the two combined into one document. To update: rebuild the combined file, replace `public/demo/driving-school.html`, push to `main`.
- Not linked from the site navigation, `noindex`, and excluded from `sitemap.xml` on purpose — share the URL directly with the client.

---

# Vovix Centre Management — sales demo (Phonics Groove Classes)

- Live file: `public/demo/centre-management.html` → served at **https://www.vovix.in/demo/centre-management** (rewrite in `next.config.mjs`) and `/demo/centre-management.html`.
- Single self-contained page (fonts embedded, no third-party requests): the Android app shown in a tablet frame (Centre Head) and phone frames (Teacher, Parent), with a guided tour and Reset. All data is sample data and is kept only in the visitor's browser (`localStorage`); nothing is sent anywhere. WhatsApp is simulated (Phase 2) and payments are recorded, not processed.
- Source of truth is `demo/index.html` in `vovixadmin/vovix-phonics` (QA: `node demo/qa/e2e.js` there). To update: copy that file here as `public/demo/centre-management.html` and push to `main`.
- Not linked from the site navigation, `noindex`, and excluded from `sitemap.xml` on purpose — share the URL directly with prospects.
