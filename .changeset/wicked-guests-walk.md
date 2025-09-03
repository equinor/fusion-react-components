---
"@equinor/fusion-react-components-stories": patch
---

Update person provider mock resolver implementation

- Fixed import path to use published package instead of src path
- Updated faker image generation to use urlPicsumPhotos instead of deprecated urlLoremFlickr
- Reduced photo loading timeout from max 1000ms to 100ms for better storybook performance
- Simplified reduce function syntax
