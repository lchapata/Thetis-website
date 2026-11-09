/*
  Thetis site styles
  Organized for readability without changing the current design.
*/

/* Shared section spacing and text treatments */
.principles-intro {
  max-width: 680px;
  margin: 0 auto 38px;
  color: rgba(251, 249, 244, 0.78);
}

.program-copy {
  padding: 21px 24px 24px;
}

.program-copy h3 {
  margin: 0 0 8px;
  font-family: var(--serif);
  font-size: 23px;
}

.program-copy p {
  margin: 0;
  color: var(--muted);
}

/* Team section */
.team-section {
  padding: 100px 0;
}

.team-heading {
  max-width: 680px;
  margin: 0 auto 38px;
  text-align: center;
}

.team-heading h2 {
  margin-bottom: 14px;
}

.team-heading > p:last-child {
  color: var(--muted);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.team-card {
  display: grid;
  grid-template-columns: 180px 1fr;
  overflow: hidden;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 4px;
}

.team-card img {
  width: 100%;
  height: 100%;
  min-height: 230px;
  object-fit: cover;
  object-position: top center;
}

.team-card > div {
  align-self: center;
  padding: 24px;
}

.team-card h3 {
  margin: 0 0 10px;
  font-family: var(--serif);
  font-size: 24px;
}

.team-card p {
  margin: 0;
  color: var(--muted);
}

.team-note {
  margin: 22px 0 0;
  color: var(--muted);
  font-size: 13px;
}

/* Motto section */
.motto {
  padding: 90px 0;
  text-align: center;
}

.motto-inner {
  max-width: 800px;
}

.motto h2 {
  font-size: clamp(38px, 5vw, 58px);
}

.motto-quote {
  margin: 28px auto 14px;
  color: var(--gold-light);
  font-family: var(--serif);
  font-size: clamp(22px, 3vw, 30px);
}

.motto-inner > p:last-child {
  max-width: 650px;
  margin: 0 auto;
  color: rgba(251, 249, 244, 0.78);
}

/* FAQ and contact form */
.faq-section {
  padding: 90px 0;
}

.faq-inner {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 60px;
}

.faq-inner h2 {
  font-size: clamp(34px, 4vw, 48px);
}

.faq-list details {
  border-bottom: 1px solid var(--line);
  padding: 18px 0;
}

.faq-list details:first-child {
  border-top: 1px solid var(--line);
}

.faq-list summary {
  cursor: pointer;
  font-weight: 700;
}

.faq-list details p {
  margin: 12px 0 0;
  color: var(--muted);
}

.interest-panel {
  padding: 28px;
  background: var(--paper);
  color: var(--ink);
}

.interest-panel h3 {
  margin: 0 0 20px;
  font-family: var(--serif);
  font-size: 26px;
}

.field {
  display: grid;
  gap: 6px;
  margin-bottom: 16px;
}

.field label {
  font-size: 14px;
  font-weight: 700;
}

.field input,
.field textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--line);
  border-radius: 2px;
  background: #fff;
  color: var(--ink);
  font: inherit;
}

.field input:focus,
.field textarea:focus {
  outline: 2px solid var(--forest-2);
  outline-offset: 2px;
}

.field textarea {
  resize: vertical;
}

.field .optional {
  font-weight: 400;
  color: var(--muted);
}

.interest-panel .button {
  border: 0;
  cursor: pointer;
  font: inherit;
  font-weight: 700;
}

#form-status {
  font-size: 14px;
  font-weight: 600;
}

#form-status:empty {
  display: none;
}

.form-note,
.form-disclosure {
  font-size: 13px;
  line-height: 1.55;
}

.form-disclosure {
  margin: 12px 0 0;
  color: var(--muted);
}

/* Responsive adjustments */
@media (max-width: 900px) {
  .team-card {
    grid-template-columns: 140px 1fr;
  }

  .faq-inner {
    grid-template-columns: 1fr;
    gap: 22px;
  }
}

@media (max-width: 680px) {
  .team-section,
  .faq-section {
    padding: 68px 0;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }

  .team-card {
    grid-template-columns: 120px 1fr;
  }

  .team-card > div {
    padding: 16px;
  }

  .team-card h3 {
    font-size: 20px;
  }
}
