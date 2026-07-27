/**
 * TEMPORARY type augmentation - delete once `@equinor/fusion-wc-searchable-dropdown@4.2.0`
 * (or later) is published and installed.
 *
 * `@equinor/fusion-wc-searchable-dropdown` gains an opt-in `topLayer` boolean property
 * (`top-layer` attribute) in equinor/fusion-web-components#2368, tracked by
 * equinor/fusion-core-tasks#1428. That change ships as a **minor** release, so the
 * existing `^4.1.1` dependency range already permits it once published - no dependency
 * bump is required here. At the time this file was authored, that release did not yet
 * exist on npm, so the currently installed version does not declare `topLayer` on its
 * runtime prototype.
 *
 * This augmentation exists purely so `topLayer` type-checks as a valid prop on
 * `Dropdown`/`ContextSelector` today. It has **no runtime effect**: `createComponent`
 * (see `packages/utils/src/hooks/useElementProps.ts`) forwards properties by inspecting
 * the actual installed custom element's prototype, so setting `topLayer` against a
 * pre-4.2.0 build of `fwc-searchable-dropdown` is a harmless no-op - the result list
 * keeps its existing (non-top-layer) rendering until the dependency is upgraded.
 * No other code changes are needed once that version is installed.
 */
export {};

declare module '@equinor/fusion-wc-searchable-dropdown' {
  interface SearchableDropdownProps {
    /**
     * Render the result list in the browser's top layer using the native
     * {@link https://developer.mozilla.org/docs/Web/API/Popover_API | Popover API}
     * (`popover="manual"`) instead of a shadow-DOM-relative, absolutely positioned box,
     * so it can reliably render above content that creates its own independent
     * stacking context elsewhere in the host application. Falls back automatically to
     * the previous behavior when the Popover API is unsupported.
     *
     * @defaultValue false
     */
    topLayer?: boolean;
  }

  interface SearchableDropdownElement {
    topLayer: boolean;
  }
}
