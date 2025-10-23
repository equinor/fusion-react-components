---
"@equinor/fusion-react-stepper": patch
---

fix: remove unnecessary dependencies from useEffect in Step component

This fixes potential infinite re-renders by removing handleChange, stepKey, stepKeys, and isCurrent from the useEffect dependency array, keeping only the essential 'done' dependency.
