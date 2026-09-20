# Round 1 remediation: evidence integrity

Read `reviews/claude-hostile-review-2026-09-19.md` in full before making any changes.

That file is the controlling defect report for this remediation round. The hostile review examined runtime commit `65a7cec57e2c54cf8e7b30da88f2159127d08c0b`. The review itself was subsequently archived in the repository without changing runtime behavior.

This is a narrowly scoped corrective pass. Do not undertake general prose revision, information-architecture redesign, branding changes, People/corpus remediation, GIS redesign, navigation work, or feature development in this round.

## 1. Repair the Documentary Edition

Audit all 19 documentary packets and all corresponding chapter "Primary-source window" material.

For every document:

- identify the actual textual witness being quoted;
- use the exact wording of that witness;
- mark every omission with an ellipsis;
- do not silently modernize punctuation or wording;
- do not reconstruct sentences from multiple fragments;
- provide a real document, edition, archival, statutory, or page-level identifier where available;
- distinguish the repository or transcription host from the actual document provenance;
- rename **"Diplomatic reading"** to **"Excerpt"** unless the text is genuinely a diplomatic transcription from an identified witness;
- ensure Chicago, MLA, BibTeX, and RIS exports describe the actual document being shown rather than an interpretive web page.

Give particular attention to the defects identified under B1 in the hostile review:

- Treaty of Fort Jackson;
- Porter at Nuku Hiva;
- Sackets Harbor vessel-return packet;
- McClure / Newark attribution;
- British war-aims memorandum;
- Embargo Act;
- Rush-Bagot;
- Fort McHenry / Key text;
- Jackson proclamation of 21 September 1814;
- Cochrane proclamation;
- Madison war message;
- Baltimore riot pamphlet;
- Dolley Madison letter.

For the Dolley Madison letter, explicitly state the surviving-text provenance and the fact that the original August 1814 letter does not survive if that is confirmed by the source used.

If a quotation or attribution cannot be verified from an adequate witness, remove it or replace it with a verifiable source rather than preserving it because it is already in the site.

## 2. Repair evidence navigation

Fix the section-level "Evidence for this section" links so every displayed source chip resolves to an actual source anchor on the same page.

The source list at the bottom of a chapter should include the union of:

- chapter-level source references;
- section-level source references;
- the primary-source-window source reference.

Fix the broken internal Evidence Laboratory links identified under B3, including the incorrect event slug and incorrect `/explore/...` object/document routes.

Also inspect the related `lib/interactive-history.ts` link identified by the review.

Remove the automatic final-paragraph superscript citation that always points to the chapter's first source regardless of the claim.

## 3. Repair Evidence Laboratory confidence language

Address M3.

Remove numerical confidence percentages and progress bars.

Replace them with the project's existing evidence-status vocabulary, such as:

- Documented
- Strongly supported
- Plausible / inferential
- Later recollection
- Oral tradition / community memory
- Disputed
- Unresolved

Make sure the label describes the evidentiary status of the proposition, not a numerical confidence in the site's own verdict.

Add at least one relevant primary trace to each evidence ledger where reasonably available.

Correct the Jefferson-letter paraphrase noted in M3.

## 4. Apply only the already well-established factual corrections

Address only the M1 corrections that the hostile review itself identifies as web-verified or independently confirmed.

These include, at minimum:

- Federalist congressional opposition to the declaration of war;
- USS *Essex* retaining its name in Royal Navy service;
- the Treasury succession of Jones, Campbell, and Dallas;
- Thames and Moraviantown being two names for the same battle;
- the Treaty of Ghent containing eleven articles;
- destruction of USS *Carolina*;
- "Alabama Territory" being anachronistic for 1814;
- the treatment of *General Pike* at Sackets Harbor;
- any other factual correction for which Appendix A says the review has direct documentary or institutional verification.

Do **not** silently implement findings that Appendix A labels knowledge-based, unverified, or requiring a page-image check.

Instead, produce a short deferred-verification list covering those claims, including:

- Porter's declaration wording;
- McClure attribution;
- Baltimore pamphlet title-page couplet;
- Brock and the Upper Canada Assembly;
- Native strength at Lundy's Lane;
- Dolley Madison copy wording/details beyond what you can verify;
- Brown's Chippawa sentence;
- British war-aims sentence;
- the Baltimore-page "more than 500 British vessels" attribution.

If you independently verify one of these from a reliable source during this round, document the source and then correct it. Otherwise leave the substantive claim unchanged and defer it.

## 5. Preserve scope

Do not remediate the following yet:

- B2 People/prosopography/data-model issues;
- M2 broad source-registry expansion;
- M4 narrative architecture;
- M5 voice restructuring;
- M6 participation gaps;
- M7 GIS;
- M8 metadata;
- M9 pagination;
- general Moderate or Polish findings unrelated to evidence integrity.

Those are separate remediation rounds.

Do not change the project branding, Fort McHenry canton icon, JH publisher identity, footer design, or navigation.

## 6. Verification

Before committing:

- run the production build;
- run lint;
- run TypeScript checks;
- verify all 19 documentary packets render;
- verify every section evidence link resolves;
- verify every Evidence Laboratory internal link resolves;
- verify every documentary citation export is syntactically valid;
- confirm every quoted excerpt has an identified witness;
- scan all changed files for replacement characters;
- scan all changed prose for em dash characters;
- confirm no unrelated files changed.

Commit this as a single focused remediation with a message such as:

**Repair documentary and evidence integrity**

## 7. Completion report

At the end, report:

1. the commit SHA;
2. every file changed;
3. every documentary packet changed and the witness used;
4. factual corrections applied;
5. findings deliberately deferred because they still require verification;
6. build, lint, type-check, link, and quotation-audit results;
7. confirmation that no out-of-scope remediation was performed.
