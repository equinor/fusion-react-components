# Changelog

## 0.1.2 - 2026-10-18

### patch

- [#291](https://github.com/equinor/fusion-skills/pull/291) [`31a05b2`](https://github.com/equinor/fusion-skills/commit/31a05b2a8705e40801dc8373dc3d072991cb5aad) - Convert article and release-note templates to `.md.hbs`, preserving end-user help structure and literal downstream renderer syntax.


  refs equinor/fusion-core-tasks#2432

## 0.1.1 - 2026-10-18

### patch

- [#285](https://github.com/equinor/fusion-skills/pull/285) [`8fa30e1`](https://github.com/equinor/fusion-skills/commit/8fa30e119d3959c4691c5e099b15bc6724e7794e) - Keep end-user help article and release-note templates as Markdown and replace

  fake Handlebars prose placeholders with angle placeholders. Leave real help
  renderer helpers and CI expression examples unchanged.

  resolves equinor/fusion-core-tasks#2444

## 0.1.0 - 2026-10-18

### minor

- [#274](https://github.com/equinor/fusion-skills/pull/274) [`a5249ae`](https://github.com/equinor/fusion-skills/commit/a5249ae8431eb69c62edab5a1dbaec5f3af81f77) - Add guidance for readable, reproducible help screenshots and keeping help in sync with the app


  - New `references/screenshots-and-validation.md`: writing for the narrow Fusion Help side sheet, capturing one component per image with Playwright stories, generating images in CI instead of committing them, validation rules for articles, images, and app help links, and a checklist for updating help after UI changes.
  - New `assets/capture-story-helper.ts`: a Playwright `capture` helper that clips to a component, outlines the control a step names, reflows to a readable width, and avoids hover states.
  - `SKILL.md` routes screenshot, validation, and help-sync requests to the new reference.

  resolves equinor/fusion-core-tasks#2404

## 0.0.3 - 2026-10-13

### patch

- [#255](https://github.com/equinor/fusion-skills/pull/255) [`fe03c5a`](https://github.com/equinor/fusion-skills/commit/fe03c5a24a5a011d5e6550e4f21d4387bae79ea0) Thanks [@alftore](https://github.com/alftore)! - Move CI/CD pipeline examples to `references/ci-pipelines.md` and point to the article and release note templates in `assets/` instead of repeating them inline, bringing `SKILL.md` under the 300-line warning.

## 0.0.2 - 2026-05-07

### patch

- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md and references.


  - Drop articles, filler, hedging from SKILL.md activation body
  - Compress cli-reference reference

## 0.0.1 - 2026-03-17

### patch

- [#83](https://github.com/equinor/fusion-skills/pull/83) [`f776146`](https://github.com/equinor/fusion-skills/commit/f776146b536cba9fe9c068ed07bad23abf4c2bcc) - Add fusion-help-docs skill


  - Guides app teams through authoring and publishing help documentation using fusion-help-cli
  - Covers articles, release notes, and FAQs
