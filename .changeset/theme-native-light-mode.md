---
"@equinor/fusion-web-theme": patch
---

Temporarily include `color-scheme: only light` in the generated color declarations
so consuming root styles keep browser-native controls light until Fusion supports
dark mode. Existing theme variables and their order are unchanged. Importing the
package does not inject CSS or select the modern EDS token palette.
