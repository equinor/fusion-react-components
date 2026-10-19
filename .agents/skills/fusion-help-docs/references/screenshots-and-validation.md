# Screenshots, validation, and keeping help in sync

Fusion Help opens in a narrow side sheet in the portal (about 450 CSS px wide). Full-page
screenshots shrink to roughly a third of their size there and become unreadable. This reference
describes a pattern that keeps help images readable, reproducible, and in step with the app.

## Write for the side sheet

- Second person, task first, short sentences, exact UI labels in **bold**. Use bold for UI text only.
- Describe controls and workflows that exist now. Keep issue numbers, implementation details,
  release plans, and open product questions out of end-user help.
- Avoid tables with more than two short columns; use bullets or short subsections. Keep list nesting
  to one level.
- Add one screenshot per decision or control the reader must find, and no more. Do not add an image
  that only repeats a button the text already names.
- Write alt text that says what the image shows and which control is outlined.

## Capture components with Playwright stories

A **story** is a Playwright test that brings the app into the state an article describes, asserts
that state with accessible locators, and captures **one component**, never the whole page.

```ts
// Right: the dialog the step explains, with the control it names outlined.
await capture(dialog, 'leave-dialog', {
  highlight: dialog.getByRole('button', { name: 'Keep local copy and leave' }),
});

// Right: a component that fills the page, reflowed to a readable width first.
await capture(page.getByRole('region', { name: 'Your work orders' }), 'home-work-orders', { width: 600 });

// Right: the area spanning a header and a few rows, instead of a whole grid.
await capture([rows.first(), rows.nth(5)], 'work-order-grid');

// Wrong: a full-page capture. It becomes unreadable in the side sheet.
await capture(page.getByTestId('app-layout'), 'work-orders');
```

Start from [`assets/capture-story-helper.ts`](../assets/capture-story-helper.ts). It:

- clips to the component (or the area spanning several locators) with a small margin;
- outlines the control a step names with an overlay, so clipping containers such as grid cells
  cannot cut the outline off, and modal dialogs in the top layer still show it;
- optionally reflows the page to a narrower `width` before capturing;
- moves the pointer away and waits for transitions, so no hover state or tooltip is captured;
- disables animations and hides the caret.

Recommended Playwright settings for stories: light color scheme, a viewport narrower than a
desktop (for example 1100 × 800), and `deviceScaleFactor: 2` for sharp text when the image is scaled
down.

Rules that keep stories reliable:

- Give each story fresh, seeded data and a signed-in test persona, so stories run in parallel and
  reruns start from the same state.
- Stories are documentation, not tests. Do not move end-to-end assertions into them, and do not
  capture help images from end-to-end journeys.
- Write the image name as a string literal in the `capture` call, so a validator can find which
  stories produce which images by reading the source.
- Allow a retry and generous timeouts when stories run against a cold container stack.

## Generate images; do not hand-maintain them

Treat images as build output. Capture them in CI from the exact app version being documented,
before `fhelp article sync`, and keep the images folder out of version control. Images then always
show the released UI, and nobody has to update screenshots by hand. Images must still be PNG.

If authoring articles as templates, render them to the Markdown `fhelp` publishes in a build step.
A `{{screenshot "name" "alt"}}` helper and an `{{article "slug"}}` helper that inserts another
article's current title keep image and cross-article references checkable.

## Validate before publishing

Add a validation script that fails the pull request when:

- an article shows an image that no story captures, or that has not been captured;
- a story captures an image that no article shows, or the images folder holds a dead image;
- the same image is shown by two articles;
- an image is wider than the side sheet can usefully show (for example over 1240 px at 2× scale);
- frontmatter or config is invalid for `fhelp`: missing `slug`, `title`, `appKey`, or `summary`; a
  slug that is not lowercase kebab-case with the app prefix; a duplicate slug; a non-numeric
  `sortOrder`;
- the app links to an article slug that does not exist, or whose title changed (keep the app's
  help-button slugs and titles in one source file the validator can read).

## Keep help in sync with the app

After any change to what users see or do (labels, buttons, dialogs, pages, flows, roles, statuses):

1. Search articles, FAQs, and stories for the old and new label text.
   - A match in an article or FAQ: reread the whole section; the text may now be wrong.
   - A match in a story: the locator may break or the image may now show something else.
   - No match, but a new workflow or page: decide which article covers it, or add one.
2. Verify behavior against the code and the running app, never from memory or from a spec that the
   code does not implement yet.
3. Update the article and its story, recapture, and open every captured image: readable at side-sheet
   width, outline on the right control, no hover state, tooltip, or clipped text.
4. Run the validator.
5. If help is versioned separately from the app (for example its own Changesets package), add a help
   release entry written for help readers, and publish the help after or together with the app
   release it documents.

For substantial changes, review the rendered help as its readers would: a first-time user, an
experienced user, and someone checking structure for the narrow panel. Each should be able to finish
their task from the help alone.
