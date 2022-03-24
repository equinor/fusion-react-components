export const agStyles = String.raw`/**
 ****************************
 * Generic Styles
 ****************************
*/
ag-grid, ag-grid-angular, ag-grid-ng2, ag-grid-polymer, ag-grid-aurelia {
  display: block;
}

.ag-hidden {
  display: none !important;
}

.ag-invisible {
  visibility: hidden !important;
}

.ag-drag-handle {
  cursor: -webkit-grab;
  cursor: grab;
}

.ag-column-drop-wrapper {
  display: flex;
}

.ag-column-drop-horizontal-half-width {
  display: inline-block;
  width: 50% !important;
}

.ag-unselectable {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.ag-selectable {
  -moz-user-select: text;
  -webkit-user-select: text;
  -ms-user-select: text;
  user-select: text;
}

.ag-tab {
  position: relative;
}

.ag-tab-guard {
  position: absolute;
  width: 0;
  height: 0;
  display: block;
}

.ag-select-agg-func-popup {
  position: absolute;
}

.ag-input-wrapper, .ag-picker-field-wrapper {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  line-height: normal;
  position: relative;
}

.ag-shake-left-to-right {
  -webkit-animation-direction: alternate;
          animation-direction: alternate;
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
  -webkit-animation-name: ag-shake-left-to-right;
          animation-name: ag-shake-left-to-right;
}

@-webkit-keyframes ag-shake-left-to-right {
  from {
    padding-left: 6px;
    padding-right: 2px;
  }
  to {
    padding-left: 2px;
    padding-right: 6px;
  }
}

@keyframes ag-shake-left-to-right {
  from {
    padding-left: 6px;
    padding-right: 2px;
  }
  to {
    padding-left: 2px;
    padding-right: 6px;
  }
}
.ag-root-wrapper {
  cursor: default;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.ag-root-wrapper.ag-layout-normal {
  height: 100%;
}

.ag-watermark {
  position: absolute;
  bottom: 20px;
  right: 25px;
  opacity: 0.5;
  transition: opacity 1s ease-out 3s;
}
.ag-watermark::before {
  content: "";
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDIzNSA0MCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxuczpzZXJpZj0iaHR0cDovL3d3dy5zZXJpZi5jb20vIiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDAuNjM1NzIzLDAsMCwwLjYzNTcyMywtNDkyLjkyMSwtMzIzLjYwOCkiPgogICAgICAgIDxwYXRoIGQ9Ik0xMDk5LjQsNTQ5LjRMMTA5OS40LDUzNi45TDEwNzguMSw1MzYuOUwxMDY1LjYsNTQ5LjRMMTA5OS40LDU0OS40WiIgc3R5bGU9ImZpbGw6cmdiKDI0LDI5LDMxKTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KICAgICAgICA8cGF0aCBkPSJNMTEyMy40LDUxOC40TDEwOTYuNyw1MTguNEwxMDg0LjEsNTMwLjlMMTEyMy40LDUzMC45TDExMjMuNCw1MTguNFoiIHN0eWxlPSJmaWxsOnJnYigyNCwyOSwzMSk7ZmlsbC1ydWxlOm5vbnplcm87Ii8+CiAgICAgICAgPHBhdGggZD0iTTEwNTMuMiw1NjEuOUwxMDU5LjYsNTU1LjVMMTA4MS4yLDU1NS41TDEwODEuMiw1NjhMMTA1My4yLDU2OEwxMDUzLjIsNTYxLjlaIiBzdHlsZT0iZmlsbDpyZ2IoMjQsMjksMzEpO2ZpbGwtcnVsZTpub256ZXJvOyIvPgogICAgICAgIDxwYXRoIGQ9Ik0xMDU3LjksNTQzLjNMMTA3MS43LDU0My4zTDEwODQuMyw1MzAuOEwxMDU3LjksNTMwLjhMMTA1Ny45LDU0My4zWiIgc3R5bGU9ImZpbGw6cmdiKDI0LDI5LDMxKTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KICAgICAgICA8cGF0aCBkPSJNMTA0Mi44LDU2MS45TDEwNTMuMiw1NjEuOUwxMDY1LjYsNTQ5LjRMMTA0Mi44LDU0OS40TDEwNDIuOCw1NjEuOVoiIHN0eWxlPSJmaWxsOnJnYigyNCwyOSwzMSk7ZmlsbC1ydWxlOm5vbnplcm87Ii8+CiAgICAgICAgPHBhdGggZD0iTTEwOTYuNyw1MTguNEwxMDkwLjMsNTI0LjhMMTA0OS41LDUyNC44TDEwNDkuNSw1MTIuM0wxMDk2LjcsNTEyLjNMMTA5Ni43LDUxOC40WiIgc3R5bGU9ImZpbGw6cmdiKDI0LDI5LDMxKTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KICAgICAgICA8cGF0aCBkPSJNODI4LjYsNTU5LjdMODA5LDU1OS43TDgwNS42LDU2OC4xTDc5Nyw1NjguMUw4MTUuMSw1MjUuN0w4MjIuNiw1MjUuN0w4NDAuNyw1NjguMUw4MzIsNTY4LjFMODI4LjYsNTU5LjdaTTgyNS45LDU1M0w4MTguOCw1MzUuN0w4MTEuNyw1NTNMODI1LjksNTUzWiIgc3R5bGU9ImZpbGw6cmdiKDI0LDI5LDMxKTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KICAgICAgICA8cGF0aCBkPSJNOTYwLjEsNTQxLjNDOTYyLjYsNTM3LjYgOTY4LjksNTM3LjIgOTcxLjUsNTM3LjJMOTcxLjUsNTQ0LjRDOTY4LjMsNTQ0LjQgOTY1LjEsNTQ0LjUgOTYzLjIsNTQ1LjlDOTYxLjMsNTQ3LjMgOTYwLjMsNTQ5LjIgOTYwLjMsNTUxLjVMOTYwLjMsNTY4LjFMOTUyLjUsNTY4LjFMOTUyLjUsNTM3LjJMOTYwLDUzNy4yTDk2MC4xLDU0MS4zWiIgc3R5bGU9ImZpbGw6cmdiKDI0LDI5LDMxKTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KICAgICAgICA8cmVjdCB4PSI5NzUuOCIgeT0iNTM3LjIiIHdpZHRoPSI3LjgiIGhlaWdodD0iMzAuOSIgc3R5bGU9ImZpbGw6cmdiKDI0LDI5LDMxKTsiLz4KICAgICAgICA8cmVjdCB4PSI5NzUuOCIgeT0iNTIzLjQiIHdpZHRoPSI3LjgiIGhlaWdodD0iOS4yIiBzdHlsZT0iZmlsbDpyZ2IoMjQsMjksMzEpOyIvPgogICAgICAgIDxwYXRoIGQ9Ik0xMDIyLjMsNTIzLjRMMTAyMi4zLDU2OC4xTDEwMTQuOCw1NjguMUwxMDE0LjYsNTYzLjRDMTAxMy41LDU2NSAxMDEyLjEsNTY2LjMgMTAxMC40LDU2Ny4zQzEwMDguNyw1NjguMiAxMDA2LjYsNTY4LjcgMTAwNC4yLDU2OC43QzEwMDIuMSw1NjguNyAxMDAwLjEsNTY4LjMgOTk4LjQsNTY3LjZDOTk2LjYsNTY2LjggOTk1LDU2NS44IDk5My43LDU2NC40Qzk5Mi40LDU2MyA5OTEuMyw1NjEuMyA5OTAuNiw1NTkuNEM5ODkuOCw1NTcuNSA5ODkuNSw1NTUuMyA5ODkuNSw1NTIuOUM5ODkuNSw1NTAuNSA5ODkuOSw1NDguMyA5OTAuNiw1NDYuM0M5OTEuNCw1NDQuMyA5OTIuNCw1NDIuNiA5OTMuNyw1NDEuMkM5OTUsNTM5LjggOTk2LjYsNTM4LjcgOTk4LjQsNTM3LjlDMTAwMC4yLDUzNy4xIDEwMDIuMSw1MzYuNyAxMDA0LjIsNTM2LjdDMTAwNi42LDUzNi43IDEwMDguNiw1MzcuMSAxMDEwLjMsNTM4QzEwMTIsNTM4LjkgMTAxMy40LDU0MC4xIDEwMTQuNSw1NDEuOEwxMDE0LjUsNTIzLjVMMTAyMi4zLDUyMy41TDEwMjIuMyw1MjMuNFpNMTAwNS45LDU2MkMxMDA4LjUsNTYyIDEwMTAuNSw1NjEuMSAxMDEyLjEsNTU5LjRDMTAxMy43LDU1Ny43IDEwMTQuNSw1NTUuNCAxMDE0LjUsNTUyLjZDMTAxNC41LDU0OS44IDEwMTMuNyw1NDcuNiAxMDEyLjEsNTQ1LjhDMTAxMC41LDU0NC4xIDEwMDguNSw1NDMuMiAxMDA1LjksNTQzLjJDMTAwMy40LDU0My4yIDEwMDEuMyw1NDQuMSA5OTkuOCw1NDUuOEM5OTguMiw1NDcuNSA5OTcuNCw1NDkuOCA5OTcuNCw1NTIuNkM5OTcuNCw1NTUuNCA5OTguMiw1NTcuNiA5OTkuOCw1NTkuM0MxMDAxLjQsNTYxLjEgMTAwMy40LDU2MiAxMDA1LjksNTYyIiBzdHlsZT0iZmlsbDpyZ2IoMjQsMjksMzEpO2ZpbGwtcnVsZTpub256ZXJvOyIvPgogICAgICAgIDxwYXRoIGQ9Ik04ODUuOCw1NDQuMkw4NjYuNSw1NDQuMkw4NjYuNSw1NTAuOUw4NzcuNSw1NTAuOUM4NzcuMiw1NTQuMyA4NzUuOSw1NTYuOSA4NzMuNyw1NTlDODcxLjUsNTYxIDg2OC43LDU2MiA4NjUuMSw1NjJDODYzLjEsNTYyIDg2MS4yLDU2MS42IDg1OS42LDU2MC45Qzg1Ny45LDU2MC4yIDg1Ni41LDU1OS4yIDg1NS4zLDU1Ny44Qzg1NC4xLDU1Ni41IDg1My4yLDU1NC45IDg1Mi41LDU1M0M4NTEuOCw1NTEuMSA4NTEuNSw1NDkuMSA4NTEuNSw1NDYuOEM4NTEuNSw1NDQuNSA4NTEuOCw1NDIuNSA4NTIuNSw1NDAuNkM4NTMuMSw1MzguNyA4NTQuMSw1MzcuMiA4NTUuMyw1MzUuOEM4NTYuNSw1MzQuNSA4NTcuOSw1MzMuNSA4NTkuNiw1MzIuN0M4NjEuMyw1MzIgODYzLjEsNTMxLjYgODY1LjIsNTMxLjZDODY5LjQsNTMxLjYgODcyLjYsNTMyLjYgODc0LjgsNTM0LjZMODgwLDUyOS40Qzg3Ni4xLDUyNi40IDg3MS4xLDUyNC44IDg2NS4yLDUyNC44Qzg2MS45LDUyNC44IDg1OC45LDUyNS4zIDg1Ni4yLDUyNi40Qzg1My41LDUyNy41IDg1MS4yLDUyOC45IDg0OS4zLDUzMC44Qzg0Ny40LDUzMi43IDg0NS45LDUzNSA4NDQuOSw1MzcuN0M4NDMuOSw1NDAuNCA4NDMuNCw1NDMuNCA4NDMuNCw1NDYuNkM4NDMuNCw1NDkuOCA4NDMuOSw1NTIuOCA4NDUsNTU1LjVDODQ2LjEsNTU4LjIgODQ3LjUsNTYwLjUgODQ5LjQsNTYyLjRDODUxLjMsNTY0LjMgODUzLjYsNTY1LjggODU2LjMsNTY2LjhDODU5LDU2Ny45IDg2Miw1NjguNCA4NjUuMiw1NjguNEM4NjguNCw1NjguNCA4NzEuMyw1NjcuOSA4NzMuOSw1NjYuOEM4NzYuNSw1NjUuNyA4NzguNyw1NjQuMyA4ODAuNSw1NjIuNEM4ODIuMyw1NjAuNSA4ODMuNyw1NTguMiA4ODQuNyw1NTUuNUM4ODUuNyw1NTIuOCA4ODYuMiw1NDkuOCA4ODYuMiw1NDYuNkw4ODYuMiw1NDUuM0M4ODUuOSw1NDUuMSA4ODUuOCw1NDQuNiA4ODUuOCw1NDQuMiIgc3R5bGU9ImZpbGw6cmdiKDI0LDI5LDMxKTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KICAgICAgICA8cGF0aCBkPSJNOTQ2LjgsNTQ0LjJMOTI3LjUsNTQ0LjJMOTI3LjUsNTUwLjlMOTM4LjUsNTUwLjlDOTM4LjIsNTU0LjMgOTM2LjksNTU2LjkgOTM0LjcsNTU5QzkzMi41LDU2MSA5MjkuNyw1NjIgOTI2LjEsNTYyQzkyNC4xLDU2MiA5MjIuMiw1NjEuNiA5MjAuNiw1NjAuOUM5MTguOSw1NjAuMiA5MTcuNSw1NTkuMiA5MTYuMyw1NTcuOEM5MTUuMSw1NTYuNSA5MTQuMiw1NTQuOSA5MTMuNSw1NTNDOTEyLjgsNTUxLjEgOTEyLjUsNTQ5LjEgOTEyLjUsNTQ2LjhDOTEyLjUsNTQ0LjUgOTEyLjgsNTQyLjUgOTEzLjUsNTQwLjZDOTE0LjEsNTM4LjcgOTE1LjEsNTM3LjIgOTE2LjMsNTM1LjhDOTE3LjUsNTM0LjUgOTE4LjksNTMzLjUgOTIwLjYsNTMyLjdDOTIyLjMsNTMyIDkyNC4xLDUzMS42IDkyNi4yLDUzMS42QzkzMC40LDUzMS42IDkzMy42LDUzMi42IDkzNS44LDUzNC42TDk0MSw1MjkuNEM5MzcuMSw1MjYuNCA5MzIuMSw1MjQuOCA5MjYuMiw1MjQuOEM5MjIuOSw1MjQuOCA5MTkuOSw1MjUuMyA5MTcuMiw1MjYuNEM5MTQuNSw1MjcuNSA5MTIuMiw1MjguOSA5MTAuMyw1MzAuOEM5MDguNCw1MzIuNyA5MDYuOSw1MzUgOTA1LjksNTM3LjdDOTA0LjksNTQwLjQgOTA0LjQsNTQzLjQgOTA0LjQsNTQ2LjZDOTA0LjQsNTQ5LjggOTA0LjksNTUyLjggOTA2LDU1NS41QzkwNy4xLDU1OC4yIDkwOC41LDU2MC41IDkxMC40LDU2Mi40QzkxMi4zLDU2NC4zIDkxNC42LDU2NS44IDkxNy4zLDU2Ni44QzkyMCw1NjcuOSA5MjMsNTY4LjQgOTI2LjIsNTY4LjRDOTI5LjQsNTY4LjQgOTMyLjMsNTY3LjkgOTM0LjksNTY2LjhDOTM3LjUsNTY1LjcgOTM5LjcsNTY0LjMgOTQxLjUsNTYyLjRDOTQzLjMsNTYwLjUgOTQ0LjcsNTU4LjIgOTQ1LjcsNTU1LjVDOTQ2LjcsNTUyLjggOTQ3LjIsNTQ5LjggOTQ3LjIsNTQ2LjZMOTQ3LjIsNTQ1LjNDOTQ2LjksNTQ1LjEgOTQ2LjgsNTQ0LjYgOTQ2LjgsNTQ0LjIiIHN0eWxlPSJmaWxsOnJnYigyNCwyOSwzMSk7ZmlsbC1ydWxlOm5vbnplcm87Ii8+CiAgICA8L2c+Cjwvc3ZnPgo=);
  background-repeat: no-repeat;
  background-size: 170px 40px;
  display: block;
  height: 40px;
  width: 170px;
  opacity: 0.5;
}

.ag-watermark-text {
  opacity: 0.5;
  font-weight: bold;
  font-family: Impact, sans-serif;
  font-size: 19px;
  padding-left: 0.7rem;
}

.ag-root-wrapper-body {
  display: flex;
  flex-direction: row;
}
.ag-root-wrapper-body.ag-layout-normal {
  flex: 1 1 auto;
  height: 0;
  min-height: 0;
}

.ag-root {
  position: relative;
  display: flex;
  flex-direction: column;
}
.ag-root.ag-layout-normal, .ag-root.ag-layout-auto-height {
  overflow: hidden;
  flex: 1 1 auto;
  width: 0;
}
.ag-root.ag-layout-normal {
  height: 100%;
}

/**
 ****************************
 * Viewports
 ****************************
*/
.ag-header-viewport,
.ag-floating-top-viewport,
.ag-body-viewport,
.ag-center-cols-viewport,
.ag-floating-bottom-viewport,
.ag-body-horizontal-scroll-viewport,
.ag-virtual-list-viewport {
  position: relative;
  height: 100%;
  min-width: 0px;
  overflow: hidden;
  flex: 1 1 auto;
}

.ag-body-viewport {
  display: flex;
}
.ag-body-viewport.ag-layout-normal {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.ag-center-cols-viewport {
  width: 100%;
  overflow-x: auto;
}

.ag-body-horizontal-scroll-viewport {
  overflow-x: scroll;
}

.ag-virtual-list-viewport {
  overflow: auto;
  width: 100%;
}

/**
 ****************************
 * Containers
 ****************************
*/
.ag-header-container,
.ag-floating-top-container,
.ag-body-container,
.ag-pinned-right-cols-container,
.ag-center-cols-container,
.ag-pinned-left-cols-container,
.ag-floating-bottom-container,
.ag-body-horizontal-scroll-container,
.ag-full-width-container,
.ag-floating-bottom-full-width-container,
.ag-virtual-list-container {
  position: relative;
}

.ag-header-container, .ag-floating-top-container, .ag-floating-bottom-container {
  height: 100%;
  white-space: nowrap;
}

.ag-center-cols-container {
  display: block;
}

.ag-pinned-right-cols-container {
  display: block;
}

.ag-body-horizontal-scroll-container {
  height: 100%;
}

.ag-full-width-container,
.ag-floating-top-full-width-container,
.ag-floating-bottom-full-width-container {
  position: absolute;
  top: 0px;
  left: 0px;
  pointer-events: none;
}

.ag-full-width-container {
  width: 100%;
}

.ag-floating-bottom-full-width-container, .ag-floating-top-full-width-container {
  display: inline-block;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.ag-virtual-list-container {
  overflow: hidden;
}

/**
 ****************************
 * Scrollers
 ****************************
*/
.ag-center-cols-clipper {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  min-height: 100%;
  transform: translate3d(0, 0, 0);
}

.ag-body-horizontal-scroll {
  min-height: 0;
  min-width: 0;
  width: 100%;
  display: flex;
  position: relative;
}
.ag-body-horizontal-scroll.ag-scrollbar-invisible {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
}
.ag-body-horizontal-scroll.ag-scrollbar-invisible.ag-scrollbar-scrolling, .ag-body-horizontal-scroll.ag-scrollbar-invisible.ag-scrollbar-active {
  pointer-events: all;
}

.ag-force-vertical-scroll {
  overflow-y: scroll !important;
}

.ag-horizontal-left-spacer, .ag-horizontal-right-spacer {
  height: 100%;
  min-width: 0;
  overflow-x: scroll;
}
.ag-horizontal-left-spacer.ag-scroller-corner, .ag-horizontal-right-spacer.ag-scroller-corner {
  overflow-x: hidden;
}

/**
 ****************************
 * Headers
 ****************************
*/
.ag-header, .ag-pinned-left-header, .ag-pinned-right-header {
  display: inline-block;
  overflow: hidden;
  position: relative;
}

.ag-header-cell-sortable {
  cursor: pointer;
}

.ag-header {
  display: flex;
  width: 100%;
  white-space: nowrap;
}

.ag-pinned-left-header {
  height: 100%;
}

.ag-pinned-right-header {
  height: 100%;
}

.ag-header-row {
  position: absolute;
  overflow: hidden;
}

.ag-header-cell {
  display: inline-flex;
  align-items: center;
  position: absolute;
  height: 100%;
  overflow: hidden;
}

.ag-header-cell.ag-header-active .ag-header-cell-menu-button {
  opacity: 1;
}

.ag-header-cell-menu-button:not(.ag-header-menu-always-show) {
  transition: opacity 0.2s;
  opacity: 0;
}

.ag-header-group-cell-label, .ag-header-cell-label {
  display: flex;
  flex: 1 1 auto;
  overflow: hidden;
  align-items: center;
  text-overflow: ellipsis;
  align-self: stretch;
}

.ag-header-cell-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ag-right-aligned-header .ag-header-cell-label {
  flex-direction: row-reverse;
}

.ag-header-group-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ag-header-cell-resize {
  position: absolute;
  z-index: 2;
  height: 100%;
  width: 8px;
  top: 0;
  cursor: ew-resize;
}
.ag-ltr .ag-header-cell-resize {
  right: -4px;
}
.ag-rtl .ag-header-cell-resize {
  left: -4px;
}

.ag-pinned-left-header .ag-header-cell-resize {
  right: -4px;
}

.ag-pinned-right-header .ag-header-cell-resize {
  left: -4px;
}

.ag-header-select-all {
  display: flex;
}

/**
 ****************************
 * Columns
 ****************************
*/
.ag-column-moving .ag-cell {
  transition: left 0.2s;
}
.ag-column-moving .ag-header-cell {
  transition: left 0.2s;
}
.ag-column-moving .ag-header-group-cell {
  transition: left 0.2s, width 0.2s;
}

/**
 ****************************
 * Column Panel
 ****************************
*/
.ag-column-panel {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1 1 auto;
}

.ag-column-select {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 3 1 0px;
}

.ag-column-select-header {
  position: relative;
  display: flex;
  flex: none;
}

.ag-column-select-header-icon {
  position: relative;
}

.ag-column-select-header-filter-wrapper {
  flex: 1 1 auto;
}

.ag-column-select-header-filter {
  width: 100%;
}

.ag-column-select-list {
  flex: 1 1 0px;
  overflow: hidden;
}

.ag-column-drop {
  position: relative;
  display: inline-flex;
  align-items: center;
  overflow: auto;
  width: 100%;
}

.ag-column-drop-list {
  display: flex;
  align-items: center;
}

.ag-column-drop-cell {
  position: relative;
  display: flex;
  align-items: center;
}

.ag-column-drop-cell-text {
  overflow: hidden;
  flex: 1 1 auto;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ag-column-drop-vertical {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: stretch;
  flex: 1 1 0px;
}

.ag-column-drop-vertical-title-bar {
  display: flex;
  align-items: center;
  flex: none;
}

.ag-column-drop-vertical-list {
  position: relative;
  align-items: stretch;
  flex-grow: 1;
  flex-direction: column;
  overflow-x: auto;
}
.ag-column-drop-vertical-list > * {
  flex: none;
}

.ag-column-drop-empty .ag-column-drop-vertical-list {
  overflow: hidden;
}

.ag-column-drop-vertical-empty-message {
  display: block;
}

.ag-column-drop.ag-column-drop-horizontal {
  white-space: nowrap;
  overflow: hidden;
}

.ag-column-drop-cell-button {
  cursor: pointer;
}

.ag-filter-toolpanel {
  flex: 1 1 0px;
  min-width: 0;
}

.ag-filter-toolpanel-header {
  position: relative;
}

.ag-filter-toolpanel-header, .ag-filter-toolpanel-search {
  display: flex;
  align-items: center;
}
.ag-filter-toolpanel-header > *, .ag-filter-toolpanel-search > * {
  display: flex;
  align-items: center;
}

.ag-filter-apply-panel {
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
}

/**
 ****************************
 * Rows
 ****************************
*/
.ag-row-animation .ag-row {
  transition: transform 0.4s, top 0.4s, background-color 0.1s, opacity 0.2s;
}

.ag-row-animation .ag-row.ag-after-created {
  transition: transform 0.4s, top 0.4s, height 0.4s, background-color 0.1s, opacity 0.2s;
}

.ag-row-no-animation .ag-row {
  transition: background-color 0.1s;
}

.ag-row {
  white-space: nowrap;
  width: 100%;
}

.ag-row-loading {
  display: flex;
  align-items: center;
}

.ag-row-position-absolute {
  position: absolute;
}

.ag-row-position-relative {
  position: relative;
}

.ag-full-width-row {
  overflow: hidden;
  pointer-events: all;
}

.ag-row-inline-editing {
  z-index: 1;
}

.ag-row-dragging {
  z-index: 2;
}

.ag-stub-cell {
  display: flex;
  align-items: center;
}

/**
 ****************************
 * Cells
 ****************************
*/
.ag-cell {
  display: inline-block;
  position: absolute;
  white-space: nowrap;
  height: 100%;
}

.ag-cell-value, .ag-group-value {
  overflow: hidden;
  text-overflow: ellipsis;
}

.ag-cell-wrap-text {
  white-space: normal;
  word-break: break-all;
}

.ag-cell-wrapper {
  display: flex;
  align-items: center;
}
.ag-cell-wrapper.ag-row-group {
  align-items: flex-start;
}

.ag-sparkline-wrapper {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}

.ag-full-width-row .ag-cell-wrapper.ag-row-group {
  height: 100%;
  align-items: center;
}

.ag-cell-inline-editing {
  z-index: 1;
}
.ag-cell-inline-editing .ag-cell-wrapper,
.ag-cell-inline-editing .ag-cell-edit-wrapper,
.ag-cell-inline-editing .ag-cell-editor,
.ag-cell-inline-editing .ag-cell-editor .ag-wrapper,
.ag-cell-inline-editing .ag-cell-editor input {
  height: 100%;
  width: 100%;
  line-height: normal;
}

.ag-cell .ag-icon {
  display: inline-block;
  vertical-align: middle;
}

/**
 ****************************
 * Filters
 ****************************
*/
.ag-set-filter-item {
  display: flex;
  align-items: center;
  height: 100%;
}

.ag-set-filter-item-value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ag-set-filter-item-checkbox {
  display: flex;
}

.ag-filter-body-wrapper {
  display: flex;
  flex-direction: column;
}

.ag-filter-filter {
  flex: 1 1 0px;
}

.ag-filter-condition {
  display: flex;
  justify-content: center;
}

/**
 ****************************
 * Floating Filter
 ****************************
*/
.ag-floating-filter-body {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  height: 100%;
}

.ag-floating-filter-full-body {
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  width: 100%;
  align-items: center;
  overflow: hidden;
}

.ag-floating-filter-full-body > div {
  flex: 1 1 auto;
}

.ag-floating-filter-input {
  align-items: center;
  display: flex;
  width: 100%;
}
.ag-floating-filter-input > * {
  flex: 1 1 auto;
}

.ag-floating-filter-button {
  display: flex;
  flex: none;
}

/**
 ****************************
 * Drag & Drop
 ****************************
*/
.ag-dnd-ghost {
  position: absolute;
  display: inline-flex;
  align-items: center;
  cursor: move;
  white-space: nowrap;
  z-index: 9999;
}

/**
 ****************************
 * Overlay
 ****************************
*/
.ag-overlay {
  height: 100%;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;
}

.ag-overlay-panel {
  display: flex;
  height: 100%;
  width: 100%;
}

.ag-overlay-wrapper {
  display: flex;
  flex: none;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.ag-overlay-loading-wrapper {
  pointer-events: all;
}

/**
 ****************************
 * Popup
 ****************************
*/
.ag-popup-child {
  z-index: 5;
  top: 0;
}

.ag-popup-editor {
  position: absolute;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  z-index: 1;
}

.ag-large-text-input {
  display: block;
}

/**
 ****************************
 * Virtual Lists
 ****************************
*/
.ag-virtual-list-item {
  position: absolute;
  width: 100%;
}

/**
 ****************************
 * Floating Top and Bottom
 ****************************
*/
.ag-floating-top {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  position: relative;
  display: flex;
}

.ag-pinned-left-floating-top {
  display: inline-block;
  overflow: hidden;
  position: relative;
  min-width: 0px;
}

.ag-pinned-right-floating-top {
  display: inline-block;
  overflow: hidden;
  position: relative;
  min-width: 0px;
}

.ag-floating-bottom {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  position: relative;
  display: flex;
}

.ag-pinned-left-floating-bottom {
  display: inline-block;
  overflow: hidden;
  position: relative;
  min-width: 0px;
}

.ag-pinned-right-floating-bottom {
  display: inline-block;
  overflow: hidden;
  position: relative;
  min-width: 0px;
}

/**
 ****************************
 * Dialog
 ****************************
*/
.ag-dialog, .ag-panel {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.ag-panel-title-bar {
  display: flex;
  flex: none;
  align-items: center;
  cursor: default;
}

.ag-panel-title-bar-title {
  flex: 1 1 auto;
}

.ag-panel-title-bar-buttons {
  display: flex;
}

.ag-panel-title-bar-button {
  cursor: pointer;
}

.ag-panel-content-wrapper {
  display: flex;
  flex: 1 1 auto;
  position: relative;
  overflow: hidden;
}

.ag-dialog {
  position: absolute;
}

.ag-resizer {
  position: absolute;
  pointer-events: none;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  z-index: 1;
}
.ag-resizer.ag-resizer-topLeft {
  top: 0;
  left: 0;
  height: 5px;
  width: 5px;
  cursor: nwse-resize;
}
.ag-resizer.ag-resizer-top {
  top: 0;
  left: 5px;
  right: 5px;
  height: 5px;
  cursor: ns-resize;
}
.ag-resizer.ag-resizer-topRight {
  top: 0;
  right: 0;
  height: 5px;
  width: 5px;
  cursor: nesw-resize;
}
.ag-resizer.ag-resizer-right {
  top: 5px;
  right: 0;
  bottom: 5px;
  width: 5px;
  cursor: ew-resize;
}
.ag-resizer.ag-resizer-bottomRight {
  bottom: 0;
  right: 0;
  height: 5px;
  width: 5px;
  cursor: nwse-resize;
}
.ag-resizer.ag-resizer-bottom {
  bottom: 0;
  left: 5px;
  right: 5px;
  height: 5px;
  cursor: ns-resize;
}
.ag-resizer.ag-resizer-bottomLeft {
  bottom: 0;
  left: 0;
  height: 5px;
  width: 5px;
  cursor: nesw-resize;
}
.ag-resizer.ag-resizer-left {
  left: 0;
  top: 5px;
  bottom: 5px;
  width: 5px;
  cursor: ew-resize;
}

/**
 ****************************
 * Tooltip
 ****************************
*/
.ag-tooltip {
  position: absolute;
  pointer-events: none;
  z-index: 99999;
}

.ag-tooltip-custom {
  position: absolute;
  pointer-events: none;
  z-index: 99999;
}

/**
 ****************************
 * Animations
 ****************************
*/
.ag-value-slide-out {
  margin-right: 5px;
  opacity: 1;
  transition: opacity 3s, margin-right 3s;
  transition-timing-function: linear;
}

.ag-value-slide-out-end {
  margin-right: 10px;
  opacity: 0;
}

.ag-opacity-zero {
  opacity: 0 !important;
}

/**
 ****************************
 * Menu
 ****************************
*/
.ag-menu {
  max-height: 100%;
  overflow-y: auto;
  position: absolute;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

.ag-menu-column-select-wrapper {
  height: 265px;
  overflow: auto;
}
.ag-menu-column-select-wrapper .ag-column-select {
  height: 100%;
}

.ag-menu-list {
  display: table;
  width: 100%;
}

.ag-menu-option, .ag-menu-separator {
  display: table-row;
}

.ag-menu-option-part, .ag-menu-separator-part {
  display: table-cell;
  vertical-align: middle;
}

.ag-menu-option-text {
  white-space: nowrap;
}

.ag-compact-menu-option {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
}

.ag-compact-menu-option-text {
  white-space: nowrap;
  flex: 1 1 auto;
}

/**
 ****************************
 * Rich Select
 ****************************
*/
.ag-rich-select {
  cursor: default;
  outline: none;
}

.ag-rich-select-value {
  display: flex;
  align-items: center;
}

.ag-rich-select-value-icon {
  flex: 1 1 auto;
  order: 1;
}
.ag-ltr .ag-rich-select-value-icon {
  text-align: right;
}
.ag-rtl .ag-rich-select-value-icon {
  text-align: left;
}

.ag-rich-select-list {
  position: relative;
}

.ag-rich-select-virtual-list-item {
  display: flex;
}

.ag-rich-select-row {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  white-space: nowrap;
}

/**
 ****************************
 * Pagination
 ****************************
*/
.ag-paging-panel {
  align-items: center;
  display: flex;
  justify-content: flex-end;
}

.ag-paging-page-summary-panel {
  display: flex;
  align-items: center;
}

.ag-paging-button {
  position: relative;
}

.ag-disabled .ag-paging-page-summary-panel {
  pointer-events: none;
}

/**
 ****************************
 * Tool Panel
 ****************************
*/
.ag-tool-panel-wrapper {
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  cursor: default;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

.ag-column-select-column,
.ag-column-select-column-group,
.ag-select-agg-func-item {
  position: relative;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 100%;
}
.ag-column-select-column > *,
.ag-column-select-column-group > *,
.ag-select-agg-func-item > * {
  flex: none;
}

.ag-column-select-checkbox {
  display: flex;
}

.ag-tool-panel-horizontal-resize {
  cursor: ew-resize;
  height: 100%;
  position: absolute;
  top: 0;
  width: 5px;
  z-index: 1;
}

.ag-ltr .ag-side-bar-left .ag-tool-panel-horizontal-resize {
  right: -3px;
}
.ag-rtl .ag-side-bar-left .ag-tool-panel-horizontal-resize {
  left: -3px;
}

.ag-ltr .ag-side-bar-right .ag-tool-panel-horizontal-resize {
  left: -3px;
}
.ag-rtl .ag-side-bar-right .ag-tool-panel-horizontal-resize {
  right: -3px;
}

.ag-details-row {
  width: 100%;
}

.ag-details-row-fixed-height {
  height: 100%;
}

.ag-details-grid {
  width: 100%;
}

.ag-details-grid-fixed-height {
  height: 100%;
}

.ag-header-group-cell {
  display: flex;
  align-items: center;
  height: 100%;
  position: absolute;
}

.ag-cell-label-container {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.ag-right-aligned-header .ag-cell-label-container {
  flex-direction: row;
}

/**
 ****************************
 * Side Bar
 ****************************
*/
.ag-side-bar {
  display: flex;
  flex-direction: row-reverse;
}

.ag-side-bar-left {
  order: -1;
  flex-direction: row;
}

.ag-side-button-button {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  outline: none;
  cursor: pointer;
}

.ag-side-button-label {
  -ms-writing-mode: tb-lr;
      writing-mode: vertical-lr;
}

/**
 ****************************
 * Status Bar
 ****************************
*/
.ag-status-bar {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}

.ag-status-panel {
  display: inline-flex;
}

.ag-status-name-value {
  white-space: nowrap;
}

.ag-status-bar-left {
  display: inline-flex;
}

.ag-status-bar-center {
  display: inline-flex;
}

.ag-status-bar-right {
  display: inline-flex;
}

/**
 ****************************
 * Widgets
 ****************************
*/
.ag-icon {
  display: block;
  speak: none;
}

.ag-group {
  position: relative;
  width: 100%;
}

.ag-group-title-bar {
  display: flex;
  align-items: center;
}

.ag-group-title {
  display: block;
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ag-group-title-bar .ag-group-title {
  cursor: default;
}

.ag-group-toolbar {
  display: flex;
  align-items: center;
}

.ag-group-container {
  display: flex;
}

.ag-disabled .ag-group-container {
  pointer-events: none;
}

.ag-group-container-horizontal {
  flex-direction: row;
  flex-wrap: wrap;
}

.ag-group-container-vertical {
  flex-direction: column;
}

.ag-column-group-icons {
  display: block;
}
.ag-column-group-icons > * {
  cursor: pointer;
}

.ag-group-item-alignment-stretch .ag-group-item {
  align-items: stretch;
}

.ag-group-item-alignment-start .ag-group-item {
  align-items: flex-start;
}

.ag-group-item-alignment-end .ag-group-item {
  align-items: flex-end;
}

.ag-toggle-button-icon {
  transition: right 0.3s;
  position: absolute;
  top: -1px;
}

.ag-input-field, .ag-select {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.ag-input-field-input {
  flex: 1 1 auto;
  width: 100%;
  min-width: 0;
}

.ag-floating-filter-input .ag-input-field-input[type=date] {
  width: 1px;
}

.ag-range-field {
  display: flex;
  align-items: center;
}

.ag-angle-select {
  display: flex;
  align-items: center;
}

.ag-angle-select-wrapper {
  display: flex;
}

.ag-angle-select-parent-circle {
  display: block;
  position: relative;
}

.ag-angle-select-child-circle {
  position: absolute;
}

.ag-slider-wrapper {
  display: flex;
}
.ag-slider-wrapper .ag-input-field {
  flex: 1 1 auto;
}

.ag-picker-field-display {
  flex: 1 1 auto;
}

.ag-picker-field {
  display: flex;
  align-items: center;
}

.ag-picker-field-icon {
  display: flex;
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
}

.ag-picker-field-wrapper {
  overflow: hidden;
}

.ag-label-align-right .ag-label {
  order: 1;
}
.ag-label-align-right > * {
  flex: none;
}

.ag-label-align-top {
  flex-direction: column;
  align-items: flex-start;
}
.ag-label-align-top > * {
  align-self: stretch;
}

.ag-color-panel {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.ag-spectrum-color {
  flex: 1 1 auto;
  position: relative;
  overflow: hidden;
  cursor: default;
}

.ag-spectrum-fill {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.ag-spectrum-val {
  cursor: pointer;
}

.ag-spectrum-dragger {
  position: absolute;
  pointer-events: none;
  cursor: pointer;
}

.ag-spectrum-hue {
  cursor: default;
  background: linear-gradient(to left, #ff0000 3%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
}

.ag-spectrum-alpha {
  cursor: default;
}

.ag-spectrum-hue-background {
  width: 100%;
  height: 100%;
}

.ag-spectrum-alpha-background {
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), black);
  width: 100%;
  height: 100%;
}

.ag-spectrum-tool {
  cursor: pointer;
}

.ag-spectrum-slider {
  position: absolute;
  pointer-events: none;
}

.ag-recent-colors {
  display: flex;
}

.ag-recent-color {
  cursor: pointer;
}

.ag-ltr .ag-column-select-indent-1 {
  padding-left: 20px;
}
.ag-rtl .ag-column-select-indent-1 {
  padding-right: 20px;
}

.ag-ltr .ag-row-group-indent-1 {
  padding-left: 20px;
}
.ag-rtl .ag-row-group-indent-1 {
  padding-right: 20px;
}

.ag-ltr .ag-column-select-indent-2 {
  padding-left: 40px;
}
.ag-rtl .ag-column-select-indent-2 {
  padding-right: 40px;
}

.ag-ltr .ag-row-group-indent-2 {
  padding-left: 40px;
}
.ag-rtl .ag-row-group-indent-2 {
  padding-right: 40px;
}

.ag-ltr .ag-column-select-indent-3 {
  padding-left: 60px;
}
.ag-rtl .ag-column-select-indent-3 {
  padding-right: 60px;
}

.ag-ltr .ag-row-group-indent-3 {
  padding-left: 60px;
}
.ag-rtl .ag-row-group-indent-3 {
  padding-right: 60px;
}

.ag-ltr .ag-column-select-indent-4 {
  padding-left: 80px;
}
.ag-rtl .ag-column-select-indent-4 {
  padding-right: 80px;
}

.ag-ltr .ag-row-group-indent-4 {
  padding-left: 80px;
}
.ag-rtl .ag-row-group-indent-4 {
  padding-right: 80px;
}

.ag-ltr .ag-column-select-indent-5 {
  padding-left: 100px;
}
.ag-rtl .ag-column-select-indent-5 {
  padding-right: 100px;
}

.ag-ltr .ag-row-group-indent-5 {
  padding-left: 100px;
}
.ag-rtl .ag-row-group-indent-5 {
  padding-right: 100px;
}

.ag-ltr .ag-column-select-indent-6 {
  padding-left: 120px;
}
.ag-rtl .ag-column-select-indent-6 {
  padding-right: 120px;
}

.ag-ltr .ag-row-group-indent-6 {
  padding-left: 120px;
}
.ag-rtl .ag-row-group-indent-6 {
  padding-right: 120px;
}

.ag-ltr .ag-column-select-indent-7 {
  padding-left: 140px;
}
.ag-rtl .ag-column-select-indent-7 {
  padding-right: 140px;
}

.ag-ltr .ag-row-group-indent-7 {
  padding-left: 140px;
}
.ag-rtl .ag-row-group-indent-7 {
  padding-right: 140px;
}

.ag-ltr .ag-column-select-indent-8 {
  padding-left: 160px;
}
.ag-rtl .ag-column-select-indent-8 {
  padding-right: 160px;
}

.ag-ltr .ag-row-group-indent-8 {
  padding-left: 160px;
}
.ag-rtl .ag-row-group-indent-8 {
  padding-right: 160px;
}

.ag-ltr .ag-column-select-indent-9 {
  padding-left: 180px;
}
.ag-rtl .ag-column-select-indent-9 {
  padding-right: 180px;
}

.ag-ltr .ag-row-group-indent-9 {
  padding-left: 180px;
}
.ag-rtl .ag-row-group-indent-9 {
  padding-right: 180px;
}

.ag-ltr .ag-column-select-indent-10 {
  padding-left: 200px;
}
.ag-rtl .ag-column-select-indent-10 {
  padding-right: 200px;
}

.ag-ltr .ag-row-group-indent-10 {
  padding-left: 200px;
}
.ag-rtl .ag-row-group-indent-10 {
  padding-right: 200px;
}

.ag-ltr .ag-column-select-indent-11 {
  padding-left: 220px;
}
.ag-rtl .ag-column-select-indent-11 {
  padding-right: 220px;
}

.ag-ltr .ag-row-group-indent-11 {
  padding-left: 220px;
}
.ag-rtl .ag-row-group-indent-11 {
  padding-right: 220px;
}

.ag-ltr .ag-column-select-indent-12 {
  padding-left: 240px;
}
.ag-rtl .ag-column-select-indent-12 {
  padding-right: 240px;
}

.ag-ltr .ag-row-group-indent-12 {
  padding-left: 240px;
}
.ag-rtl .ag-row-group-indent-12 {
  padding-right: 240px;
}

.ag-ltr .ag-column-select-indent-13 {
  padding-left: 260px;
}
.ag-rtl .ag-column-select-indent-13 {
  padding-right: 260px;
}

.ag-ltr .ag-row-group-indent-13 {
  padding-left: 260px;
}
.ag-rtl .ag-row-group-indent-13 {
  padding-right: 260px;
}

.ag-ltr .ag-column-select-indent-14 {
  padding-left: 280px;
}
.ag-rtl .ag-column-select-indent-14 {
  padding-right: 280px;
}

.ag-ltr .ag-row-group-indent-14 {
  padding-left: 280px;
}
.ag-rtl .ag-row-group-indent-14 {
  padding-right: 280px;
}

.ag-ltr .ag-column-select-indent-15 {
  padding-left: 300px;
}
.ag-rtl .ag-column-select-indent-15 {
  padding-right: 300px;
}

.ag-ltr .ag-row-group-indent-15 {
  padding-left: 300px;
}
.ag-rtl .ag-row-group-indent-15 {
  padding-right: 300px;
}

.ag-ltr .ag-column-select-indent-16 {
  padding-left: 320px;
}
.ag-rtl .ag-column-select-indent-16 {
  padding-right: 320px;
}

.ag-ltr .ag-row-group-indent-16 {
  padding-left: 320px;
}
.ag-rtl .ag-row-group-indent-16 {
  padding-right: 320px;
}

.ag-ltr .ag-column-select-indent-17 {
  padding-left: 340px;
}
.ag-rtl .ag-column-select-indent-17 {
  padding-right: 340px;
}

.ag-ltr .ag-row-group-indent-17 {
  padding-left: 340px;
}
.ag-rtl .ag-row-group-indent-17 {
  padding-right: 340px;
}

.ag-ltr .ag-column-select-indent-18 {
  padding-left: 360px;
}
.ag-rtl .ag-column-select-indent-18 {
  padding-right: 360px;
}

.ag-ltr .ag-row-group-indent-18 {
  padding-left: 360px;
}
.ag-rtl .ag-row-group-indent-18 {
  padding-right: 360px;
}

.ag-ltr .ag-column-select-indent-19 {
  padding-left: 380px;
}
.ag-rtl .ag-column-select-indent-19 {
  padding-right: 380px;
}

.ag-ltr .ag-row-group-indent-19 {
  padding-left: 380px;
}
.ag-rtl .ag-row-group-indent-19 {
  padding-right: 380px;
}

.ag-ltr .ag-column-select-indent-20 {
  padding-left: 400px;
}
.ag-rtl .ag-column-select-indent-20 {
  padding-right: 400px;
}

.ag-ltr .ag-row-group-indent-20 {
  padding-left: 400px;
}
.ag-rtl .ag-row-group-indent-20 {
  padding-right: 400px;
}

.ag-ltr .ag-column-select-indent-21 {
  padding-left: 420px;
}
.ag-rtl .ag-column-select-indent-21 {
  padding-right: 420px;
}

.ag-ltr .ag-row-group-indent-21 {
  padding-left: 420px;
}
.ag-rtl .ag-row-group-indent-21 {
  padding-right: 420px;
}

.ag-ltr .ag-column-select-indent-22 {
  padding-left: 440px;
}
.ag-rtl .ag-column-select-indent-22 {
  padding-right: 440px;
}

.ag-ltr .ag-row-group-indent-22 {
  padding-left: 440px;
}
.ag-rtl .ag-row-group-indent-22 {
  padding-right: 440px;
}

.ag-ltr .ag-column-select-indent-23 {
  padding-left: 460px;
}
.ag-rtl .ag-column-select-indent-23 {
  padding-right: 460px;
}

.ag-ltr .ag-row-group-indent-23 {
  padding-left: 460px;
}
.ag-rtl .ag-row-group-indent-23 {
  padding-right: 460px;
}

.ag-ltr .ag-column-select-indent-24 {
  padding-left: 480px;
}
.ag-rtl .ag-column-select-indent-24 {
  padding-right: 480px;
}

.ag-ltr .ag-row-group-indent-24 {
  padding-left: 480px;
}
.ag-rtl .ag-row-group-indent-24 {
  padding-right: 480px;
}

.ag-ltr .ag-column-select-indent-25 {
  padding-left: 500px;
}
.ag-rtl .ag-column-select-indent-25 {
  padding-right: 500px;
}

.ag-ltr .ag-row-group-indent-25 {
  padding-left: 500px;
}
.ag-rtl .ag-row-group-indent-25 {
  padding-right: 500px;
}

.ag-ltr .ag-column-select-indent-26 {
  padding-left: 520px;
}
.ag-rtl .ag-column-select-indent-26 {
  padding-right: 520px;
}

.ag-ltr .ag-row-group-indent-26 {
  padding-left: 520px;
}
.ag-rtl .ag-row-group-indent-26 {
  padding-right: 520px;
}

.ag-ltr .ag-column-select-indent-27 {
  padding-left: 540px;
}
.ag-rtl .ag-column-select-indent-27 {
  padding-right: 540px;
}

.ag-ltr .ag-row-group-indent-27 {
  padding-left: 540px;
}
.ag-rtl .ag-row-group-indent-27 {
  padding-right: 540px;
}

.ag-ltr .ag-column-select-indent-28 {
  padding-left: 560px;
}
.ag-rtl .ag-column-select-indent-28 {
  padding-right: 560px;
}

.ag-ltr .ag-row-group-indent-28 {
  padding-left: 560px;
}
.ag-rtl .ag-row-group-indent-28 {
  padding-right: 560px;
}

.ag-ltr .ag-column-select-indent-29 {
  padding-left: 580px;
}
.ag-rtl .ag-column-select-indent-29 {
  padding-right: 580px;
}

.ag-ltr .ag-row-group-indent-29 {
  padding-left: 580px;
}
.ag-rtl .ag-row-group-indent-29 {
  padding-right: 580px;
}

.ag-ltr .ag-column-select-indent-30 {
  padding-left: 600px;
}
.ag-rtl .ag-column-select-indent-30 {
  padding-right: 600px;
}

.ag-ltr .ag-row-group-indent-30 {
  padding-left: 600px;
}
.ag-rtl .ag-row-group-indent-30 {
  padding-right: 600px;
}

.ag-ltr .ag-column-select-indent-31 {
  padding-left: 620px;
}
.ag-rtl .ag-column-select-indent-31 {
  padding-right: 620px;
}

.ag-ltr .ag-row-group-indent-31 {
  padding-left: 620px;
}
.ag-rtl .ag-row-group-indent-31 {
  padding-right: 620px;
}

.ag-ltr .ag-column-select-indent-32 {
  padding-left: 640px;
}
.ag-rtl .ag-column-select-indent-32 {
  padding-right: 640px;
}

.ag-ltr .ag-row-group-indent-32 {
  padding-left: 640px;
}
.ag-rtl .ag-row-group-indent-32 {
  padding-right: 640px;
}

.ag-ltr .ag-column-select-indent-33 {
  padding-left: 660px;
}
.ag-rtl .ag-column-select-indent-33 {
  padding-right: 660px;
}

.ag-ltr .ag-row-group-indent-33 {
  padding-left: 660px;
}
.ag-rtl .ag-row-group-indent-33 {
  padding-right: 660px;
}

.ag-ltr .ag-column-select-indent-34 {
  padding-left: 680px;
}
.ag-rtl .ag-column-select-indent-34 {
  padding-right: 680px;
}

.ag-ltr .ag-row-group-indent-34 {
  padding-left: 680px;
}
.ag-rtl .ag-row-group-indent-34 {
  padding-right: 680px;
}

.ag-ltr .ag-column-select-indent-35 {
  padding-left: 700px;
}
.ag-rtl .ag-column-select-indent-35 {
  padding-right: 700px;
}

.ag-ltr .ag-row-group-indent-35 {
  padding-left: 700px;
}
.ag-rtl .ag-row-group-indent-35 {
  padding-right: 700px;
}

.ag-ltr .ag-column-select-indent-36 {
  padding-left: 720px;
}
.ag-rtl .ag-column-select-indent-36 {
  padding-right: 720px;
}

.ag-ltr .ag-row-group-indent-36 {
  padding-left: 720px;
}
.ag-rtl .ag-row-group-indent-36 {
  padding-right: 720px;
}

.ag-ltr .ag-column-select-indent-37 {
  padding-left: 740px;
}
.ag-rtl .ag-column-select-indent-37 {
  padding-right: 740px;
}

.ag-ltr .ag-row-group-indent-37 {
  padding-left: 740px;
}
.ag-rtl .ag-row-group-indent-37 {
  padding-right: 740px;
}

.ag-ltr .ag-column-select-indent-38 {
  padding-left: 760px;
}
.ag-rtl .ag-column-select-indent-38 {
  padding-right: 760px;
}

.ag-ltr .ag-row-group-indent-38 {
  padding-left: 760px;
}
.ag-rtl .ag-row-group-indent-38 {
  padding-right: 760px;
}

.ag-ltr .ag-column-select-indent-39 {
  padding-left: 780px;
}
.ag-rtl .ag-column-select-indent-39 {
  padding-right: 780px;
}

.ag-ltr .ag-row-group-indent-39 {
  padding-left: 780px;
}
.ag-rtl .ag-row-group-indent-39 {
  padding-right: 780px;
}

.ag-ltr .ag-column-select-indent-40 {
  padding-left: 800px;
}
.ag-rtl .ag-column-select-indent-40 {
  padding-right: 800px;
}

.ag-ltr .ag-row-group-indent-40 {
  padding-left: 800px;
}
.ag-rtl .ag-row-group-indent-40 {
  padding-right: 800px;
}

.ag-ltr .ag-column-select-indent-41 {
  padding-left: 820px;
}
.ag-rtl .ag-column-select-indent-41 {
  padding-right: 820px;
}

.ag-ltr .ag-row-group-indent-41 {
  padding-left: 820px;
}
.ag-rtl .ag-row-group-indent-41 {
  padding-right: 820px;
}

.ag-ltr .ag-column-select-indent-42 {
  padding-left: 840px;
}
.ag-rtl .ag-column-select-indent-42 {
  padding-right: 840px;
}

.ag-ltr .ag-row-group-indent-42 {
  padding-left: 840px;
}
.ag-rtl .ag-row-group-indent-42 {
  padding-right: 840px;
}

.ag-ltr .ag-column-select-indent-43 {
  padding-left: 860px;
}
.ag-rtl .ag-column-select-indent-43 {
  padding-right: 860px;
}

.ag-ltr .ag-row-group-indent-43 {
  padding-left: 860px;
}
.ag-rtl .ag-row-group-indent-43 {
  padding-right: 860px;
}

.ag-ltr .ag-column-select-indent-44 {
  padding-left: 880px;
}
.ag-rtl .ag-column-select-indent-44 {
  padding-right: 880px;
}

.ag-ltr .ag-row-group-indent-44 {
  padding-left: 880px;
}
.ag-rtl .ag-row-group-indent-44 {
  padding-right: 880px;
}

.ag-ltr .ag-column-select-indent-45 {
  padding-left: 900px;
}
.ag-rtl .ag-column-select-indent-45 {
  padding-right: 900px;
}

.ag-ltr .ag-row-group-indent-45 {
  padding-left: 900px;
}
.ag-rtl .ag-row-group-indent-45 {
  padding-right: 900px;
}

.ag-ltr .ag-column-select-indent-46 {
  padding-left: 920px;
}
.ag-rtl .ag-column-select-indent-46 {
  padding-right: 920px;
}

.ag-ltr .ag-row-group-indent-46 {
  padding-left: 920px;
}
.ag-rtl .ag-row-group-indent-46 {
  padding-right: 920px;
}

.ag-ltr .ag-column-select-indent-47 {
  padding-left: 940px;
}
.ag-rtl .ag-column-select-indent-47 {
  padding-right: 940px;
}

.ag-ltr .ag-row-group-indent-47 {
  padding-left: 940px;
}
.ag-rtl .ag-row-group-indent-47 {
  padding-right: 940px;
}

.ag-ltr .ag-column-select-indent-48 {
  padding-left: 960px;
}
.ag-rtl .ag-column-select-indent-48 {
  padding-right: 960px;
}

.ag-ltr .ag-row-group-indent-48 {
  padding-left: 960px;
}
.ag-rtl .ag-row-group-indent-48 {
  padding-right: 960px;
}

.ag-ltr .ag-column-select-indent-49 {
  padding-left: 980px;
}
.ag-rtl .ag-column-select-indent-49 {
  padding-right: 980px;
}

.ag-ltr .ag-row-group-indent-49 {
  padding-left: 980px;
}
.ag-rtl .ag-row-group-indent-49 {
  padding-right: 980px;
}

.ag-ltr .ag-column-select-indent-50 {
  padding-left: 1000px;
}
.ag-rtl .ag-column-select-indent-50 {
  padding-right: 1000px;
}

.ag-ltr .ag-row-group-indent-50 {
  padding-left: 1000px;
}
.ag-rtl .ag-row-group-indent-50 {
  padding-right: 1000px;
}

.ag-ltr .ag-column-select-indent-51 {
  padding-left: 1020px;
}
.ag-rtl .ag-column-select-indent-51 {
  padding-right: 1020px;
}

.ag-ltr .ag-row-group-indent-51 {
  padding-left: 1020px;
}
.ag-rtl .ag-row-group-indent-51 {
  padding-right: 1020px;
}

.ag-ltr .ag-column-select-indent-52 {
  padding-left: 1040px;
}
.ag-rtl .ag-column-select-indent-52 {
  padding-right: 1040px;
}

.ag-ltr .ag-row-group-indent-52 {
  padding-left: 1040px;
}
.ag-rtl .ag-row-group-indent-52 {
  padding-right: 1040px;
}

.ag-ltr .ag-column-select-indent-53 {
  padding-left: 1060px;
}
.ag-rtl .ag-column-select-indent-53 {
  padding-right: 1060px;
}

.ag-ltr .ag-row-group-indent-53 {
  padding-left: 1060px;
}
.ag-rtl .ag-row-group-indent-53 {
  padding-right: 1060px;
}

.ag-ltr .ag-column-select-indent-54 {
  padding-left: 1080px;
}
.ag-rtl .ag-column-select-indent-54 {
  padding-right: 1080px;
}

.ag-ltr .ag-row-group-indent-54 {
  padding-left: 1080px;
}
.ag-rtl .ag-row-group-indent-54 {
  padding-right: 1080px;
}

.ag-ltr .ag-column-select-indent-55 {
  padding-left: 1100px;
}
.ag-rtl .ag-column-select-indent-55 {
  padding-right: 1100px;
}

.ag-ltr .ag-row-group-indent-55 {
  padding-left: 1100px;
}
.ag-rtl .ag-row-group-indent-55 {
  padding-right: 1100px;
}

.ag-ltr .ag-column-select-indent-56 {
  padding-left: 1120px;
}
.ag-rtl .ag-column-select-indent-56 {
  padding-right: 1120px;
}

.ag-ltr .ag-row-group-indent-56 {
  padding-left: 1120px;
}
.ag-rtl .ag-row-group-indent-56 {
  padding-right: 1120px;
}

.ag-ltr .ag-column-select-indent-57 {
  padding-left: 1140px;
}
.ag-rtl .ag-column-select-indent-57 {
  padding-right: 1140px;
}

.ag-ltr .ag-row-group-indent-57 {
  padding-left: 1140px;
}
.ag-rtl .ag-row-group-indent-57 {
  padding-right: 1140px;
}

.ag-ltr .ag-column-select-indent-58 {
  padding-left: 1160px;
}
.ag-rtl .ag-column-select-indent-58 {
  padding-right: 1160px;
}

.ag-ltr .ag-row-group-indent-58 {
  padding-left: 1160px;
}
.ag-rtl .ag-row-group-indent-58 {
  padding-right: 1160px;
}

.ag-ltr .ag-column-select-indent-59 {
  padding-left: 1180px;
}
.ag-rtl .ag-column-select-indent-59 {
  padding-right: 1180px;
}

.ag-ltr .ag-row-group-indent-59 {
  padding-left: 1180px;
}
.ag-rtl .ag-row-group-indent-59 {
  padding-right: 1180px;
}

.ag-ltr .ag-column-select-indent-60 {
  padding-left: 1200px;
}
.ag-rtl .ag-column-select-indent-60 {
  padding-right: 1200px;
}

.ag-ltr .ag-row-group-indent-60 {
  padding-left: 1200px;
}
.ag-rtl .ag-row-group-indent-60 {
  padding-right: 1200px;
}

.ag-ltr .ag-column-select-indent-61 {
  padding-left: 1220px;
}
.ag-rtl .ag-column-select-indent-61 {
  padding-right: 1220px;
}

.ag-ltr .ag-row-group-indent-61 {
  padding-left: 1220px;
}
.ag-rtl .ag-row-group-indent-61 {
  padding-right: 1220px;
}

.ag-ltr .ag-column-select-indent-62 {
  padding-left: 1240px;
}
.ag-rtl .ag-column-select-indent-62 {
  padding-right: 1240px;
}

.ag-ltr .ag-row-group-indent-62 {
  padding-left: 1240px;
}
.ag-rtl .ag-row-group-indent-62 {
  padding-right: 1240px;
}

.ag-ltr .ag-column-select-indent-63 {
  padding-left: 1260px;
}
.ag-rtl .ag-column-select-indent-63 {
  padding-right: 1260px;
}

.ag-ltr .ag-row-group-indent-63 {
  padding-left: 1260px;
}
.ag-rtl .ag-row-group-indent-63 {
  padding-right: 1260px;
}

.ag-ltr .ag-column-select-indent-64 {
  padding-left: 1280px;
}
.ag-rtl .ag-column-select-indent-64 {
  padding-right: 1280px;
}

.ag-ltr .ag-row-group-indent-64 {
  padding-left: 1280px;
}
.ag-rtl .ag-row-group-indent-64 {
  padding-right: 1280px;
}

.ag-ltr .ag-column-select-indent-65 {
  padding-left: 1300px;
}
.ag-rtl .ag-column-select-indent-65 {
  padding-right: 1300px;
}

.ag-ltr .ag-row-group-indent-65 {
  padding-left: 1300px;
}
.ag-rtl .ag-row-group-indent-65 {
  padding-right: 1300px;
}

.ag-ltr .ag-column-select-indent-66 {
  padding-left: 1320px;
}
.ag-rtl .ag-column-select-indent-66 {
  padding-right: 1320px;
}

.ag-ltr .ag-row-group-indent-66 {
  padding-left: 1320px;
}
.ag-rtl .ag-row-group-indent-66 {
  padding-right: 1320px;
}

.ag-ltr .ag-column-select-indent-67 {
  padding-left: 1340px;
}
.ag-rtl .ag-column-select-indent-67 {
  padding-right: 1340px;
}

.ag-ltr .ag-row-group-indent-67 {
  padding-left: 1340px;
}
.ag-rtl .ag-row-group-indent-67 {
  padding-right: 1340px;
}

.ag-ltr .ag-column-select-indent-68 {
  padding-left: 1360px;
}
.ag-rtl .ag-column-select-indent-68 {
  padding-right: 1360px;
}

.ag-ltr .ag-row-group-indent-68 {
  padding-left: 1360px;
}
.ag-rtl .ag-row-group-indent-68 {
  padding-right: 1360px;
}

.ag-ltr .ag-column-select-indent-69 {
  padding-left: 1380px;
}
.ag-rtl .ag-column-select-indent-69 {
  padding-right: 1380px;
}

.ag-ltr .ag-row-group-indent-69 {
  padding-left: 1380px;
}
.ag-rtl .ag-row-group-indent-69 {
  padding-right: 1380px;
}

.ag-ltr .ag-column-select-indent-70 {
  padding-left: 1400px;
}
.ag-rtl .ag-column-select-indent-70 {
  padding-right: 1400px;
}

.ag-ltr .ag-row-group-indent-70 {
  padding-left: 1400px;
}
.ag-rtl .ag-row-group-indent-70 {
  padding-right: 1400px;
}

.ag-ltr .ag-column-select-indent-71 {
  padding-left: 1420px;
}
.ag-rtl .ag-column-select-indent-71 {
  padding-right: 1420px;
}

.ag-ltr .ag-row-group-indent-71 {
  padding-left: 1420px;
}
.ag-rtl .ag-row-group-indent-71 {
  padding-right: 1420px;
}

.ag-ltr .ag-column-select-indent-72 {
  padding-left: 1440px;
}
.ag-rtl .ag-column-select-indent-72 {
  padding-right: 1440px;
}

.ag-ltr .ag-row-group-indent-72 {
  padding-left: 1440px;
}
.ag-rtl .ag-row-group-indent-72 {
  padding-right: 1440px;
}

.ag-ltr .ag-column-select-indent-73 {
  padding-left: 1460px;
}
.ag-rtl .ag-column-select-indent-73 {
  padding-right: 1460px;
}

.ag-ltr .ag-row-group-indent-73 {
  padding-left: 1460px;
}
.ag-rtl .ag-row-group-indent-73 {
  padding-right: 1460px;
}

.ag-ltr .ag-column-select-indent-74 {
  padding-left: 1480px;
}
.ag-rtl .ag-column-select-indent-74 {
  padding-right: 1480px;
}

.ag-ltr .ag-row-group-indent-74 {
  padding-left: 1480px;
}
.ag-rtl .ag-row-group-indent-74 {
  padding-right: 1480px;
}

.ag-ltr .ag-column-select-indent-75 {
  padding-left: 1500px;
}
.ag-rtl .ag-column-select-indent-75 {
  padding-right: 1500px;
}

.ag-ltr .ag-row-group-indent-75 {
  padding-left: 1500px;
}
.ag-rtl .ag-row-group-indent-75 {
  padding-right: 1500px;
}

.ag-ltr .ag-column-select-indent-76 {
  padding-left: 1520px;
}
.ag-rtl .ag-column-select-indent-76 {
  padding-right: 1520px;
}

.ag-ltr .ag-row-group-indent-76 {
  padding-left: 1520px;
}
.ag-rtl .ag-row-group-indent-76 {
  padding-right: 1520px;
}

.ag-ltr .ag-column-select-indent-77 {
  padding-left: 1540px;
}
.ag-rtl .ag-column-select-indent-77 {
  padding-right: 1540px;
}

.ag-ltr .ag-row-group-indent-77 {
  padding-left: 1540px;
}
.ag-rtl .ag-row-group-indent-77 {
  padding-right: 1540px;
}

.ag-ltr .ag-column-select-indent-78 {
  padding-left: 1560px;
}
.ag-rtl .ag-column-select-indent-78 {
  padding-right: 1560px;
}

.ag-ltr .ag-row-group-indent-78 {
  padding-left: 1560px;
}
.ag-rtl .ag-row-group-indent-78 {
  padding-right: 1560px;
}

.ag-ltr .ag-column-select-indent-79 {
  padding-left: 1580px;
}
.ag-rtl .ag-column-select-indent-79 {
  padding-right: 1580px;
}

.ag-ltr .ag-row-group-indent-79 {
  padding-left: 1580px;
}
.ag-rtl .ag-row-group-indent-79 {
  padding-right: 1580px;
}

.ag-ltr .ag-column-select-indent-80 {
  padding-left: 1600px;
}
.ag-rtl .ag-column-select-indent-80 {
  padding-right: 1600px;
}

.ag-ltr .ag-row-group-indent-80 {
  padding-left: 1600px;
}
.ag-rtl .ag-row-group-indent-80 {
  padding-right: 1600px;
}

.ag-ltr .ag-column-select-indent-81 {
  padding-left: 1620px;
}
.ag-rtl .ag-column-select-indent-81 {
  padding-right: 1620px;
}

.ag-ltr .ag-row-group-indent-81 {
  padding-left: 1620px;
}
.ag-rtl .ag-row-group-indent-81 {
  padding-right: 1620px;
}

.ag-ltr .ag-column-select-indent-82 {
  padding-left: 1640px;
}
.ag-rtl .ag-column-select-indent-82 {
  padding-right: 1640px;
}

.ag-ltr .ag-row-group-indent-82 {
  padding-left: 1640px;
}
.ag-rtl .ag-row-group-indent-82 {
  padding-right: 1640px;
}

.ag-ltr .ag-column-select-indent-83 {
  padding-left: 1660px;
}
.ag-rtl .ag-column-select-indent-83 {
  padding-right: 1660px;
}

.ag-ltr .ag-row-group-indent-83 {
  padding-left: 1660px;
}
.ag-rtl .ag-row-group-indent-83 {
  padding-right: 1660px;
}

.ag-ltr .ag-column-select-indent-84 {
  padding-left: 1680px;
}
.ag-rtl .ag-column-select-indent-84 {
  padding-right: 1680px;
}

.ag-ltr .ag-row-group-indent-84 {
  padding-left: 1680px;
}
.ag-rtl .ag-row-group-indent-84 {
  padding-right: 1680px;
}

.ag-ltr .ag-column-select-indent-85 {
  padding-left: 1700px;
}
.ag-rtl .ag-column-select-indent-85 {
  padding-right: 1700px;
}

.ag-ltr .ag-row-group-indent-85 {
  padding-left: 1700px;
}
.ag-rtl .ag-row-group-indent-85 {
  padding-right: 1700px;
}

.ag-ltr .ag-column-select-indent-86 {
  padding-left: 1720px;
}
.ag-rtl .ag-column-select-indent-86 {
  padding-right: 1720px;
}

.ag-ltr .ag-row-group-indent-86 {
  padding-left: 1720px;
}
.ag-rtl .ag-row-group-indent-86 {
  padding-right: 1720px;
}

.ag-ltr .ag-column-select-indent-87 {
  padding-left: 1740px;
}
.ag-rtl .ag-column-select-indent-87 {
  padding-right: 1740px;
}

.ag-ltr .ag-row-group-indent-87 {
  padding-left: 1740px;
}
.ag-rtl .ag-row-group-indent-87 {
  padding-right: 1740px;
}

.ag-ltr .ag-column-select-indent-88 {
  padding-left: 1760px;
}
.ag-rtl .ag-column-select-indent-88 {
  padding-right: 1760px;
}

.ag-ltr .ag-row-group-indent-88 {
  padding-left: 1760px;
}
.ag-rtl .ag-row-group-indent-88 {
  padding-right: 1760px;
}

.ag-ltr .ag-column-select-indent-89 {
  padding-left: 1780px;
}
.ag-rtl .ag-column-select-indent-89 {
  padding-right: 1780px;
}

.ag-ltr .ag-row-group-indent-89 {
  padding-left: 1780px;
}
.ag-rtl .ag-row-group-indent-89 {
  padding-right: 1780px;
}

.ag-ltr .ag-column-select-indent-90 {
  padding-left: 1800px;
}
.ag-rtl .ag-column-select-indent-90 {
  padding-right: 1800px;
}

.ag-ltr .ag-row-group-indent-90 {
  padding-left: 1800px;
}
.ag-rtl .ag-row-group-indent-90 {
  padding-right: 1800px;
}

.ag-ltr .ag-column-select-indent-91 {
  padding-left: 1820px;
}
.ag-rtl .ag-column-select-indent-91 {
  padding-right: 1820px;
}

.ag-ltr .ag-row-group-indent-91 {
  padding-left: 1820px;
}
.ag-rtl .ag-row-group-indent-91 {
  padding-right: 1820px;
}

.ag-ltr .ag-column-select-indent-92 {
  padding-left: 1840px;
}
.ag-rtl .ag-column-select-indent-92 {
  padding-right: 1840px;
}

.ag-ltr .ag-row-group-indent-92 {
  padding-left: 1840px;
}
.ag-rtl .ag-row-group-indent-92 {
  padding-right: 1840px;
}

.ag-ltr .ag-column-select-indent-93 {
  padding-left: 1860px;
}
.ag-rtl .ag-column-select-indent-93 {
  padding-right: 1860px;
}

.ag-ltr .ag-row-group-indent-93 {
  padding-left: 1860px;
}
.ag-rtl .ag-row-group-indent-93 {
  padding-right: 1860px;
}

.ag-ltr .ag-column-select-indent-94 {
  padding-left: 1880px;
}
.ag-rtl .ag-column-select-indent-94 {
  padding-right: 1880px;
}

.ag-ltr .ag-row-group-indent-94 {
  padding-left: 1880px;
}
.ag-rtl .ag-row-group-indent-94 {
  padding-right: 1880px;
}

.ag-ltr .ag-column-select-indent-95 {
  padding-left: 1900px;
}
.ag-rtl .ag-column-select-indent-95 {
  padding-right: 1900px;
}

.ag-ltr .ag-row-group-indent-95 {
  padding-left: 1900px;
}
.ag-rtl .ag-row-group-indent-95 {
  padding-right: 1900px;
}

.ag-ltr .ag-column-select-indent-96 {
  padding-left: 1920px;
}
.ag-rtl .ag-column-select-indent-96 {
  padding-right: 1920px;
}

.ag-ltr .ag-row-group-indent-96 {
  padding-left: 1920px;
}
.ag-rtl .ag-row-group-indent-96 {
  padding-right: 1920px;
}

.ag-ltr .ag-column-select-indent-97 {
  padding-left: 1940px;
}
.ag-rtl .ag-column-select-indent-97 {
  padding-right: 1940px;
}

.ag-ltr .ag-row-group-indent-97 {
  padding-left: 1940px;
}
.ag-rtl .ag-row-group-indent-97 {
  padding-right: 1940px;
}

.ag-ltr .ag-column-select-indent-98 {
  padding-left: 1960px;
}
.ag-rtl .ag-column-select-indent-98 {
  padding-right: 1960px;
}

.ag-ltr .ag-row-group-indent-98 {
  padding-left: 1960px;
}
.ag-rtl .ag-row-group-indent-98 {
  padding-right: 1960px;
}

.ag-ltr .ag-column-select-indent-99 {
  padding-left: 1980px;
}
.ag-rtl .ag-column-select-indent-99 {
  padding-right: 1980px;
}

.ag-ltr .ag-row-group-indent-99 {
  padding-left: 1980px;
}
.ag-rtl .ag-row-group-indent-99 {
  padding-right: 1980px;
}

.ag-ltr {
  direction: ltr;
}
.ag-ltr .ag-body, .ag-ltr .ag-floating-top, .ag-ltr .ag-floating-bottom, .ag-ltr .ag-header, .ag-ltr .ag-body-viewport, .ag-ltr .ag-body-horizontal-scroll {
  flex-direction: row;
}

.ag-rtl {
  direction: rtl;
}
.ag-rtl .ag-body, .ag-rtl .ag-floating-top, .ag-rtl .ag-floating-bottom, .ag-rtl .ag-header, .ag-rtl .ag-body-viewport, .ag-rtl .ag-body-horizontal-scroll {
  flex-direction: row-reverse;
}
.ag-rtl .ag-icon-contracted,
.ag-rtl .ag-icon-tree-closed {
  display: block;
  transform: rotate(180deg);
}

.ag-layout-print.ag-body-viewport {
  flex: none;
}
.ag-layout-print.ag-root-wrapper {
  display: inline-flex;
}
.ag-layout-print .ag-center-cols-clipper {
  min-width: 100%;
}
.ag-layout-print .ag-body-horizontal-scroll {
  display: none;
}
.ag-layout-print.ag-force-vertical-scroll {
  overflow-y: visible !important;
}

@media print {
  .ag-root-wrapper.ag-layout-print,
.ag-root-wrapper.ag-layout-print .ag-root-wrapper-body,
.ag-root-wrapper.ag-layout-print .ag-root,
.ag-root-wrapper.ag-layout-print .ag-body-viewport,
.ag-root-wrapper.ag-layout-print .ag-center-cols-container,
.ag-root-wrapper.ag-layout-print .ag-center-cols-viewport,
.ag-root-wrapper.ag-layout-print .ag-center-cols-clipper,
.ag-root-wrapper.ag-layout-print .ag-body-horizontal-scroll-viewport,
.ag-root-wrapper.ag-layout-print .ag-virtual-list-viewport {
    height: auto !important;
    overflow: hidden !important;
    display: block !important;
  }
  .ag-root-wrapper.ag-layout-print .ag-row {
    page-break-inside: avoid;
  }
}
.ag-body .ag-body-viewport {
  -webkit-overflow-scrolling: touch;
}

.ag-chart {
  position: relative;
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.ag-chart-components-wrapper {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  overflow: hidden;
}

.ag-chart-title-edit {
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  text-align: center;
}

.ag-chart-title-edit.currently-editing {
  display: inline-block;
}

.ag-chart-canvas-wrapper {
  position: relative;
  flex: 1 1 auto;
  overflow: hidden;
}

.ag-charts-canvas {
  display: block;
}

.ag-chart-menu {
  position: absolute;
  top: 10px;
  width: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.ag-ltr .ag-chart-menu {
  right: 20px;
}
.ag-rtl .ag-chart-menu {
  left: 20px;
}

.ag-chart-docked-container {
  position: relative;
  width: 0;
  min-width: 0;
  transition: min-width 0.4s;
}

.ag-chart-menu-hidden ~ .ag-chart-docked-container {
  max-width: 0;
  overflow: hidden;
}

.ag-chart-tabbed-menu {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.ag-chart-tabbed-menu-header {
  flex: none;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  cursor: default;
}

.ag-chart-tabbed-menu-body {
  display: flex;
  flex: 1 1 auto;
  align-items: stretch;
  overflow: hidden;
}

.ag-chart-tab {
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
}

.ag-chart-settings {
  overflow-x: hidden;
}

.ag-chart-settings-wrapper {
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
}

.ag-chart-settings-nav-bar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  padding: 0 10px;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

.ag-chart-settings-card-selector {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex: 1 1 auto;
  height: 100%;
  padding: 0 10px;
}

.ag-chart-settings-card-item {
  cursor: pointer;
  width: 10px;
  height: 10px;
  background-color: #000;
  position: relative;
}
.ag-chart-settings-card-item.ag-not-selected {
  opacity: 0.2;
}
.ag-chart-settings-card-item::before {
  content: " ";
  display: block;
  position: absolute;
  background-color: transparent;
  left: 50%;
  top: 50%;
  margin-left: -10px;
  margin-top: -10px;
  width: 20px;
  height: 20px;
}

.ag-chart-settings-prev,
.ag-chart-settings-next {
  position: relative;
  flex: none;
}

.ag-chart-settings-prev-button,
.ag-chart-settings-next-button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
}

.ag-chart-settings-mini-charts-container {
  position: relative;
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
}

.ag-chart-settings-mini-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
}
.ag-chart-settings-mini-wrapper.ag-animating {
  transition: left 0.3s;
  transition-timing-function: ease-in-out;
}

.ag-chart-mini-thumbnail {
  cursor: pointer;
}

.ag-chart-mini-thumbnail-canvas {
  display: block;
}

.ag-chart-data-wrapper,
.ag-chart-format-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

.ag-chart-data-wrapper {
  height: 100%;
  overflow-y: auto;
}

.ag-chart-data-section,
.ag-chart-format-section {
  display: flex;
  margin: 0;
}

.ag-chart-empty-text {
  display: flex;
  top: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.ag-chart .ag-chart-menu {
  opacity: 0;
  pointer-events: none;
}

.ag-chart-menu-hidden:hover .ag-chart-menu {
  opacity: 1;
  pointer-events: all;
}

.ag-charts-font-size-color {
  display: flex;
  align-self: stretch;
  justify-content: space-between;
}

.ag-charts-data-group-item {
  position: relative;
}

.ag-date-time-list-page-title-bar {
  display: flex;
}

.ag-date-time-list-page-column-labels-row,
.ag-date-time-list-page-entries-row {
  display: flex;
}

.ag-date-time-list-page-column-label,
.ag-date-time-list-page-entry {
  flex-basis: 0;
  flex-grow: 1;
}

.ag-date-time-list-page-entry {
  cursor: pointer;
}

@font-face {
  font-family: "agGridAlpine";
  src: url(data:application/font-woff;charset=utf-8;base64,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) format("woff");
  font-weight: normal;
  font-style: normal;
}
.ag-icon {
  font-family: "agGridAlpine";
  font-size: 16px;
  line-height: 16px;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.ag-icon-aggregation::before {
  content: "\f101";
}

.ag-icon-arrows::before {
  content: "\f102";
}

.ag-icon-asc::before {
  content: "\f103";
}

.ag-icon-cancel::before {
  content: "\f104";
}

.ag-icon-chart::before {
  content: "\f105";
}

.ag-icon-color-picker::before {
  content: "\f109";
}

.ag-icon-columns::before {
  content: "\f10a";
}

.ag-icon-contracted::before {
  content: "\f10b";
}

.ag-icon-copy::before {
  content: "\f10c";
}

.ag-icon-cross::before {
  content: "\f10d";
}

.ag-icon-csv::before {
  content: "\f10e";
}

.ag-icon-desc::before {
  content: "\f10f";
}

.ag-icon-excel::before {
  content: "\f110";
}

.ag-icon-expanded::before {
  content: "\f111";
}

.ag-icon-eye-slash::before {
  content: "\f112";
}

.ag-icon-eye::before {
  content: "\f113";
}

.ag-icon-filter::before {
  content: "\f114";
}

.ag-icon-first::before {
  content: "\f115";
}

.ag-icon-grip::before {
  content: "\f116";
}

.ag-icon-group::before {
  content: "\f117";
}

.ag-icon-last::before {
  content: "\f118";
}

.ag-icon-left::before {
  content: "\f119";
}

.ag-icon-linked::before {
  content: "\f11a";
}

.ag-icon-loading::before {
  content: "\f11b";
}

.ag-icon-maximize::before {
  content: "\f11c";
}

.ag-icon-menu::before {
  content: "\f11d";
}

.ag-icon-minimize::before {
  content: "\f11e";
}

.ag-icon-next::before {
  content: "\f11f";
}

.ag-icon-none::before {
  content: "\f120";
}

.ag-icon-not-allowed::before {
  content: "\f121";
}

.ag-icon-paste::before {
  content: "\f122";
}

.ag-icon-pin::before {
  content: "\f123";
}

.ag-icon-pivot::before {
  content: "\f124";
}

.ag-icon-previous::before {
  content: "\f125";
}

.ag-icon-right::before {
  content: "\f128";
}

.ag-icon-save::before {
  content: "\f129";
}

.ag-icon-small-down::before {
  content: "\f12a";
}

.ag-icon-small-left::before {
  content: "\f12b";
}

.ag-icon-small-right::before {
  content: "\f12c";
}

.ag-icon-small-up::before {
  content: "\f12d";
}

.ag-icon-tick::before {
  content: "\f12e";
}

.ag-icon-tree-closed::before {
  content: "\f12f";
}

.ag-icon-tree-indeterminate::before {
  content: "\f130";
}

.ag-icon-tree-open::before {
  content: "\f131";
}

.ag-icon-unlinked::before {
  content: "\f132";
}

.ag-icon-row-drag::before {
  content: "\f116";
}

.ag-left-arrow::before {
  content: "\f119";
}

.ag-right-arrow::before {
  content: "\f128";
}

.ag-theme-alpine {
  -webkit-font-smoothing: antialiased;
  color: #181d1f;
  color: var(--ag-foreground-color, #181d1f);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  font-size: 13px;
  line-height: normal;
}
@font-face {
  font-family: "agGridAlpine";
  src: url(data:application/font-woff;charset=utf-8;base64,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) format("woff");
  font-weight: normal;
  font-style: normal;
}
.ag-theme-alpine .ag-icon {
  font-family: "agGridAlpine";
  font-size: 16px;
  line-height: 16px;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.ag-theme-alpine .ag-icon-aggregation::before {
  content: "\f101";
}
.ag-theme-alpine .ag-icon-arrows::before {
  content: "\f102";
}
.ag-theme-alpine .ag-icon-asc::before {
  content: "\f103";
}
.ag-theme-alpine .ag-icon-cancel::before {
  content: "\f104";
}
.ag-theme-alpine .ag-icon-chart::before {
  content: "\f105";
}
.ag-theme-alpine .ag-icon-color-picker::before {
  content: "\f109";
}
.ag-theme-alpine .ag-icon-columns::before {
  content: "\f10a";
}
.ag-theme-alpine .ag-icon-contracted::before {
  content: "\f10b";
}
.ag-theme-alpine .ag-icon-copy::before {
  content: "\f10c";
}
.ag-theme-alpine .ag-icon-cross::before {
  content: "\f10d";
}
.ag-theme-alpine .ag-icon-csv::before {
  content: "\f10e";
}
.ag-theme-alpine .ag-icon-desc::before {
  content: "\f10f";
}
.ag-theme-alpine .ag-icon-excel::before {
  content: "\f110";
}
.ag-theme-alpine .ag-icon-expanded::before {
  content: "\f111";
}
.ag-theme-alpine .ag-icon-eye-slash::before {
  content: "\f112";
}
.ag-theme-alpine .ag-icon-eye::before {
  content: "\f113";
}
.ag-theme-alpine .ag-icon-filter::before {
  content: "\f114";
}
.ag-theme-alpine .ag-icon-first::before {
  content: "\f115";
}
.ag-theme-alpine .ag-icon-grip::before {
  content: "\f116";
}
.ag-theme-alpine .ag-icon-group::before {
  content: "\f117";
}
.ag-theme-alpine .ag-icon-last::before {
  content: "\f118";
}
.ag-theme-alpine .ag-icon-left::before {
  content: "\f119";
}
.ag-theme-alpine .ag-icon-linked::before {
  content: "\f11a";
}
.ag-theme-alpine .ag-icon-loading::before {
  content: "\f11b";
}
.ag-theme-alpine .ag-icon-maximize::before {
  content: "\f11c";
}
.ag-theme-alpine .ag-icon-menu::before {
  content: "\f11d";
}
.ag-theme-alpine .ag-icon-minimize::before {
  content: "\f11e";
}
.ag-theme-alpine .ag-icon-next::before {
  content: "\f11f";
}
.ag-theme-alpine .ag-icon-none::before {
  content: "\f120";
}
.ag-theme-alpine .ag-icon-not-allowed::before {
  content: "\f121";
}
.ag-theme-alpine .ag-icon-paste::before {
  content: "\f122";
}
.ag-theme-alpine .ag-icon-pin::before {
  content: "\f123";
}
.ag-theme-alpine .ag-icon-pivot::before {
  content: "\f124";
}
.ag-theme-alpine .ag-icon-previous::before {
  content: "\f125";
}
.ag-theme-alpine .ag-icon-right::before {
  content: "\f128";
}
.ag-theme-alpine .ag-icon-save::before {
  content: "\f129";
}
.ag-theme-alpine .ag-icon-small-down::before {
  content: "\f12a";
}
.ag-theme-alpine .ag-icon-small-left::before {
  content: "\f12b";
}
.ag-theme-alpine .ag-icon-small-right::before {
  content: "\f12c";
}
.ag-theme-alpine .ag-icon-small-up::before {
  content: "\f12d";
}
.ag-theme-alpine .ag-icon-tick::before {
  content: "\f12e";
}
.ag-theme-alpine .ag-icon-tree-closed::before {
  content: "\f12f";
}
.ag-theme-alpine .ag-icon-tree-indeterminate::before {
  content: "\f130";
}
.ag-theme-alpine .ag-icon-tree-open::before {
  content: "\f131";
}
.ag-theme-alpine .ag-icon-unlinked::before {
  content: "\f132";
}
.ag-theme-alpine .ag-icon-row-drag::before {
  content: "\f116";
}
.ag-theme-alpine .ag-left-arrow::before {
  content: "\f119";
}
.ag-theme-alpine .ag-right-arrow::before {
  content: "\f128";
}
.ag-theme-alpine .ag-root-wrapper {
  background-color: #fff;
  background-color: var(--ag-background-color, #fff);
}
.ag-theme-alpine [class^=ag-], .ag-theme-alpine [class^=ag-]:focus, .ag-theme-alpine [class^=ag-]:after, .ag-theme-alpine [class^=ag-]:before {
  box-sizing: border-box;
  outline: none;
}
.ag-theme-alpine [class^=ag-]::-ms-clear {
  display: none;
}
.ag-theme-alpine .ag-checkbox .ag-input-wrapper,
.ag-theme-alpine .ag-radio-button .ag-input-wrapper {
  overflow: visible;
}
.ag-theme-alpine .ag-range-field .ag-input-wrapper {
  height: 100%;
}
.ag-theme-alpine .ag-toggle-button {
  flex: none;
  width: unset;
  min-width: unset;
}
.ag-theme-alpine .ag-ltr .ag-label-align-right .ag-label {
  margin-left: 6px;
}

.ag-theme-alpine .ag-rtl .ag-label-align-right .ag-label {
  margin-right: 6px;
}

.ag-theme-alpine input[class^=ag-] {
  margin: 0;
  background-color: #fff;
  background-color: var(--ag-background-color, #fff);
}
.ag-theme-alpine textarea[class^=ag-],
.ag-theme-alpine select[class^=ag-] {
  background-color: #fff;
  background-color: var(--ag-background-color, #fff);
}
.ag-theme-alpine input[class^=ag-]:not([type]),
.ag-theme-alpine input[class^=ag-][type=text],
.ag-theme-alpine input[class^=ag-][type=number],
.ag-theme-alpine input[class^=ag-][type=tel],
.ag-theme-alpine input[class^=ag-][type=date],
.ag-theme-alpine input[class^=ag-][type=datetime-local],
.ag-theme-alpine textarea[class^=ag-] {
  font-size: inherit;
  line-height: inherit;
  color: inherit;
  border-width: 1px;
  border-style: solid;
  border-color: #babfc7;
  border-color: var(--ag-input-border-color, var(--ag-border-color, #babfc7));
}
.ag-theme-alpine input[class^=ag-]:not([type]):disabled,
.ag-theme-alpine input[class^=ag-][type=text]:disabled,
.ag-theme-alpine input[class^=ag-][type=number]:disabled,
.ag-theme-alpine input[class^=ag-][type=tel]:disabled,
.ag-theme-alpine input[class^=ag-][type=date]:disabled,
.ag-theme-alpine input[class^=ag-][type=datetime-local]:disabled,
.ag-theme-alpine textarea[class^=ag-]:disabled {
  color: rgba(24, 29, 31, 0.5);
  color: var(--ag-disabled-foreground-color, rgba(24, 29, 31, 0.5));
  background-color: #f1f2f4;
  background-color: var(--ag-input-disabled-background-color, #f1f2f4);
  border-color: rgba(186, 191, 199, 0.3);
  border-color: var(--ag-input-disabled-border-color, rgba(186, 191, 199, 0.3));
}
.ag-theme-alpine input[class^=ag-]:not([type]):focus,
.ag-theme-alpine input[class^=ag-][type=text]:focus,
.ag-theme-alpine input[class^=ag-][type=number]:focus,
.ag-theme-alpine input[class^=ag-][type=tel]:focus,
.ag-theme-alpine input[class^=ag-][type=date]:focus,
.ag-theme-alpine input[class^=ag-][type=datetime-local]:focus,
.ag-theme-alpine textarea[class^=ag-]:focus {
  outline: none;
  box-shadow: 0 0 2px 0.1rem rgba(255, 20, 147, 0.4);
  border-color: rgba(255, 20, 147, 0.4);
  border-color: var(--ag-input-focus-border-color, rgba(255, 20, 147, 0.4));
}
.ag-theme-alpine input[class^=ag-]:not([type]):invalid,
.ag-theme-alpine input[class^=ag-][type=text]:invalid,
.ag-theme-alpine input[class^=ag-][type=number]:invalid,
.ag-theme-alpine input[class^=ag-][type=tel]:invalid,
.ag-theme-alpine input[class^=ag-][type=date]:invalid,
.ag-theme-alpine input[class^=ag-][type=datetime-local]:invalid,
.ag-theme-alpine textarea[class^=ag-]:invalid {
  border-width: 2px;
  border-style: solid;
  border-color: #e02525;
  border-color: var(--ag-input-border-color-invalid, var(--ag-invalid-color, #e02525));
}
.ag-theme-alpine input[class^=ag-][type=number] {
  -moz-appearance: textfield;
}
.ag-theme-alpine input[class^=ag-][type=number]::-webkit-outer-spin-button, .ag-theme-alpine input[class^=ag-][type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.ag-theme-alpine input[class^=ag-][type=range] {
  padding: 0;
}
.ag-theme-alpine input[class^=ag-][type=button]:focus, .ag-theme-alpine button[class^=ag-]:focus {
  box-shadow: 0 0 2px 0.1rem rgba(255, 20, 147, 0.4);
}
.ag-theme-alpine .ag-drag-handle {
  color: #181d1f;
  color: var(--ag-secondary-foreground-color, var(--ag-foreground-color, #181d1f));
}
.ag-theme-alpine .ag-list-item, .ag-theme-alpine .ag-virtual-list-item {
  height: 24px;
}
.ag-theme-alpine .ag-keyboard-focus .ag-virtual-list-item:focus {
  outline: none;
}
.ag-theme-alpine .ag-keyboard-focus .ag-virtual-list-item:focus::after {
  content: "";
  position: absolute;
  background-color: transparent;
  pointer-events: none;
  top: 4px;
  left: 4px;
  display: block;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  border: 1px solid;
  border-color: rgba(255, 20, 147, 0.4);
  border-color: var(--ag-input-focus-border-color, rgba(255, 20, 147, 0.4));
}
.ag-theme-alpine .ag-select-list {
  background-color: #fff;
  background-color: var(--ag-background-color, #fff);
  overflow-y: auto;
  overflow-x: hidden;
}
.ag-theme-alpine .ag-list-item {
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ag-theme-alpine .ag-list-item.ag-active-item {
  background-color: rgba(255, 20, 147, 0.1);
  background-color: var(--ag-row-hover-color, rgba(255, 20, 147, 0.1));
}
.ag-theme-alpine .ag-select-list-item {
  padding-left: 4px;
  padding-right: 4px;
  cursor: default;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.ag-theme-alpine .ag-select-list-item span {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.ag-theme-alpine .ag-select .ag-picker-field-wrapper {
  background-color: #fff;
  background-color: var(--ag-background-color, #fff);
  min-height: 24px;
  cursor: default;
}
.ag-theme-alpine .ag-select.ag-disabled .ag-picker-field-wrapper:focus {
  box-shadow: none;
}
.ag-theme-alpine .ag-select:not(.ag-cell-editor) {
  height: 24px;
}
.ag-theme-alpine .ag-select .ag-picker-field-display {
  margin: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ag-theme-alpine .ag-select .ag-picker-field-icon {
  display: flex;
  align-items: center;
}
.ag-theme-alpine .ag-select.ag-disabled {
  opacity: 0.5;
}
.ag-theme-alpine .ag-rich-select {
  background-color: #f8f8f8;
  background-color: var(--ag-control-panel-background-color, #f8f8f8);
}
.ag-theme-alpine .ag-rich-select-list {
  width: 100%;
  min-width: 200px;
  height: 273px;
}
.ag-theme-alpine .ag-rich-select-value {
  padding: 0 6px 0 18px;
  height: 42px;
  border-bottom: solid 1px;
  border-bottom-color: #dde2eb;
  border-bottom-color: var(--ag-secondary-border-color, #dde2eb);
}
.ag-theme-alpine .ag-rich-select-virtual-list-item {
  cursor: default;
  height: 24px;
}
.ag-theme-alpine .ag-rich-select-virtual-list-item:hover {
  background-color: rgba(255, 20, 147, 0.1);
  background-color: var(--ag-row-hover-color, rgba(255, 20, 147, 0.1));
}
.ag-theme-alpine .ag-rich-select-row {
  padding-left: 18px;
}
.ag-theme-alpine .ag-rich-select-row-selected {
  background-color: rgba(255, 20, 147, 0.3);
  background-color: var(--ag-selected-row-background-color, rgba(255, 20, 147, 0.3));
}
.ag-theme-alpine .ag-row-drag,
.ag-theme-alpine .ag-selection-checkbox,
.ag-theme-alpine .ag-group-expanded,
.ag-theme-alpine .ag-group-contracted {
  color: #181d1f;
  color: var(--ag-secondary-foreground-color, var(--ag-foreground-color, #181d1f));
}
.ag-theme-alpine .ag-ltr .ag-row-drag, .ag-theme-alpine .ag-ltr .ag-selection-checkbox, .ag-theme-alpine .ag-ltr .ag-group-expanded, .ag-theme-alpine .ag-ltr .ag-group-contracted {
  margin-right: 12px;
}

.ag-theme-alpine .ag-rtl .ag-row-drag, .ag-theme-alpine .ag-rtl .ag-selection-checkbox, .ag-theme-alpine .ag-rtl .ag-group-expanded, .ag-theme-alpine .ag-rtl .ag-group-contracted {
  margin-left: 12px;
}

.ag-theme-alpine .ag-cell-wrapper > *:not(.ag-cell-value):not(.ag-group-value) {
  height: min(var(--ag-row-height, 40px), 40px);
  display: flex;
  align-items: center;
  flex: none;
}
.ag-theme-alpine .ag-group-expanded,
.ag-theme-alpine .ag-group-contracted {
  cursor: pointer;
}
.ag-theme-alpine .ag-group-title-bar-icon {
  cursor: pointer;
  flex: none;
  color: #181d1f;
  color: var(--ag-secondary-foreground-color, var(--ag-foreground-color, #181d1f));
}
.ag-theme-alpine .ag-ltr .ag-group-child-count {
  margin-left: 2px;
}

.ag-theme-alpine .ag-rtl .ag-group-child-count {
  margin-right: 2px;
}

.ag-theme-alpine .ag-group-title-bar {
  background-color: #fff;
  background-color: var(--ag-subheader-background-color, #fff);
  padding: 6px;
}
.ag-theme-alpine .ag-group-toolbar {
  padding: 6px;
}
.ag-theme-alpine .ag-disabled-group-title-bar, .ag-theme-alpine .ag-disabled-group-container {
  opacity: 0.5;
}
.ag-theme-alpine .group-item {
  margin: 3px 0;
}
.ag-theme-alpine .ag-label {
  white-space: nowrap;
}
.ag-theme-alpine .ag-ltr .ag-label {
  margin-right: 6px;
}

.ag-theme-alpine .ag-rtl .ag-label {
  margin-left: 6px;
}

.ag-theme-alpine .ag-label-align-top .ag-label {
  margin-bottom: 3px;
}
.ag-theme-alpine .ag-ltr .ag-slider-field, .ag-theme-alpine .ag-ltr .ag-angle-select-field {
  margin-right: 12px;
}

.ag-theme-alpine .ag-rtl .ag-slider-field, .ag-theme-alpine .ag-rtl .ag-angle-select-field {
  margin-left: 12px;
}

.ag-theme-alpine .ag-angle-select-parent-circle {
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border: solid 1px;
  border-color: #babfc7;
  border-color: var(--ag-border-color, #babfc7);
  background-color: #fff;
  background-color: var(--ag-background-color, #fff);
}
.ag-theme-alpine .ag-angle-select-child-circle {
  top: 4px;
  left: 12px;
  width: 6px;
  height: 6px;
  margin-left: -3px;
  margin-top: -4px;
  border-radius: 3px;
  background-color: #181d1f;
  background-color: var(--ag-secondary-foreground-color, var(--ag-foreground-color, #181d1f));
}
.ag-theme-alpine .ag-picker-field-wrapper {
  border: 1px solid;
  border-color: #babfc7;
  border-color: var(--ag-border-color, #babfc7);
  border-radius: 5px;
}
.ag-theme-alpine .ag-picker-field-wrapper:focus {
  box-shadow: 0 0 2px 0.1rem rgba(255, 20, 147, 0.4);
}
.ag-theme-alpine .ag-picker-field-button {
  background-color: #fff;
  background-color: var(--ag-background-color, #fff);
  color: #181d1f;
  color: var(--ag-secondary-foreground-color, var(--ag-foreground-color, #181d1f));
}
.ag-theme-alpine .ag-dialog.ag-color-dialog {
  border-radius: 5px;
}
.ag-theme-alpine .ag-color-picker .ag-picker-field-display {
  height: 16px;
}
.ag-theme-alpine .ag-color-panel {
  padding: 6px;
}
.ag-theme-alpine .ag-spectrum-color {
  background-color: red;
  border-radius: 2px;
}
.ag-theme-alpine .ag-spectrum-tools {
  padding: 10px;
}
.ag-theme-alpine .ag-spectrum-sat {
  background-image: linear-gradient(to right, white, rgba(204, 154, 129, 0));
}
.ag-theme-alpine .ag-spectrum-val {
  background-image: linear-gradient(to top, black, rgba(204, 154, 129, 0));
}
.ag-theme-alpine .ag-spectrum-dragger {
  border-radius: 12px;
  height: 12px;
  width: 12px;
  border: 1px solid white;
  background: black;
  box-shadow: 0 0 2px 0px rgba(0, 0, 0, 0.24);
}
.ag-theme-alpine .ag-spectrum-hue-background {
  border-radius: 2px;
}
.ag-theme-alpine .ag-spectrum-alpha-background {
  border-radius: 2px;
}
.ag-theme-alpine .ag-spectrum-tool {
  margin-bottom: 10px;
  height: 11px;
  border-radius: 2px;
}
.ag-theme-alpine .ag-spectrum-slider {
  margin-top: -12px;
  width: 13px;
  height: 13px;
  border-radius: 13px;
  background-color: #f8f8f8;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
}
.ag-theme-alpine .ag-recent-color {
  margin: 0 3px;
}
.ag-theme-alpine .ag-recent-color:first-child {
  margin-left: 0;
}
.ag-theme-alpine .ag-recent-color:last-child {
  margin-right: 0;
}
.ag-theme-alpine.ag-dnd-ghost {
  border: solid 1px;
  border-color: #babfc7;
  border-color: var(--ag-border-color, #babfc7);
  background: #fff;
  background: var(--ag-background-color, #fff);
  border-radius: 3px;
  box-shadow: 0 1px 4px 1px rgba(186, 191, 199, 0.4);
  padding: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  border: solid 1px;
  border-color: #dde2eb;
  border-color: var(--ag-secondary-border-color, #dde2eb);
  color: #181d1f;
  color: var(--ag-secondary-foreground-color, var(--ag-foreground-color, #181d1f));
  height: 48px !important;
  line-height: 48px;
  margin: 0;
  padding: 0 12px;
  transform: translateY(12px);
}
.ag-theme-alpine .ag-dnd-ghost-icon {
  margin-right: 6px;
  color: #181d1f;
  color: var(--ag-foreground-color, #181d1f);
}
.ag-theme-alpine .ag-popup-child:not(.ag-tooltip-custom) {
  box-shadow: 0 1px 4px 1px rgba(186, 191, 199, 0.4);
}
.ag-dragging-range-handle .ag-theme-alpine .ag-dialog, .ag-dragging-fill-handle .ag-theme-alpine .ag-dialog {
  opacity: 0.7;
  pointer-events: none;
}
.ag-theme-alpine .ag-dialog {
  border-radius: 3px;
  border: solid 1px;
  border-color: #babfc7;
  border-color: var(--ag-border-color, #babfc7);
}
.ag-theme-alpine .ag-panel {
  background-color: #fff;
  background-color: var(--ag-background-color, #fff);
}
.ag-theme-alpine .ag-panel-title-bar {
  background-color: #f8f8f8;
  background-color: var(--ag-header-background-color, #f8f8f8);
  color: #181d1f;
  color: var(--ag-header-foreground-color, var(--ag-secondary-foreground-color, var(--ag-foreground-color, #181d1f)));
  height: 48px;
  padding: 6px 18px;
  border-bottom: solid 1px;
  border-bottom-color: #babfc7;
  border-bottom-color: var(--ag-border-color, #babfc7);
}
.ag-theme-alpine .ag-ltr .ag-panel-title-bar-button {
  margin-left: 6px;
}

.ag-theme-alpine .ag-rtl .ag-panel-title-bar-button {
  margin-right: 6px;
}

.ag-theme-alpine .ag-tooltip {
  background-color: #f8f8f8;
  background-color: var(--ag-header-background-color, #f8f8f8);
  color: #181d1f;
  color: var(--ag-foreground-color, #181d1f);
  padding: 6px;
  border: solid 1px;
  border-color: #babfc7;
  border-color: var(--ag-border-color, #babfc7);
  border-radius: 3px;
  transition: opacity 1s;
  white-space: normal;
}
.ag-theme-alpine .ag-tooltip.ag-tooltip-hiding {
  opacity: 0;
}
.ag-theme-alpine .ag-tooltip-custom {
  transition: opacity 1s;
}
.ag-theme-alpine .ag-tooltip-custom.ag-tooltip-hiding {
  opacity: 0;
}
.ag-theme-alpine .ag-ltr .ag-column-select-indent-1 {
  padding-left: 16px;
}

.ag-theme-alpine .ag-rtl .ag-column-select-indent-1 {
  padding-right: 16px;
}

.ag-theme-alpine .ag-ltr .ag-column-select-indent-2 {
  padding-left: 32px;
}

.ag-theme-alpine .ag-rtl .ag-column-select-indent-2 {
  padding-right: 32px;
}

.ag-theme-alpine .ag-ltr .ag-column-select-indent-3 {
  padding-left: 48px;
}

.ag-theme-alpine .ag-rtl .ag-column-select-indent-3 {
  padding-right: 48px;
}

.ag-theme-alpine .ag-ltr .ag-column-select-indent-4 {
  padding-left: 64px;
}

.ag-theme-alpine .ag-rtl .ag-column-select-indent-4 {
  padding-right: 64px;
}

.ag-theme-alpine .ag-ltr .ag-column-select-indent-5 {
  padding-left: 80px;
}

.ag-theme-alpine .ag-rtl .ag-column-select-indent-5 {
  padding-right: 80px;
}

.ag-theme-alpine .ag-ltr .ag-column-select-indent-6 {
  padding-left: 96px;
}

.ag-theme-alpine .ag-rtl .ag-column-select-indent-6 {
  padding-right: 96px;
}

.ag-theme-alpine .ag-ltr .ag-column-select-indent-7 {
  padding-left: 112px;
}

.ag-theme-alpine .ag-rtl .ag-column-select-indent-7 {
  padding-right: 112px;
}

.ag-theme-alpine .ag-ltr .ag-column-select-indent-8 {
  padding-left: 128px;
}

.ag-theme-alpine .ag-rtl .ag-column-select-indent-8 {
  padding-right: 128px;
}

.ag-theme-alpine .ag-ltr .ag-column-select-indent-9 {
  padding-left: 144px;
}

.ag-theme-alpine .ag-rtl .ag-column-select-indent-9 {
  padding-right: 144px;
}

.ag-theme-alpine .ag-column-select-header-icon {
  cursor: pointer;
}
.ag-theme-alpine .ag-keyboard-focus .ag-column-select-header-icon:focus {
  outline: none;
}
.ag-theme-alpine .ag-keyboard-focus .ag-column-select-header-icon:focus::after {
  content: "";
  position: absolute;
  background-color: transparent;
  pointer-events: none;
  top: 0px;
  left: 0px;
  display: block;
  width: calc(100% - 0px);
  height: calc(100% - 0px);
  border: 1px solid;
  border-color: rgba(255, 20, 147, 0.4);
  border-color: var(--ag-input-focus-border-color, rgba(255, 20, 147, 0.4));
}
.ag-theme-alpine .ag-ltr .ag-column-group-icons:not(:last-child), .ag-theme-alpine .ag-ltr .ag-column-select-header-icon:not(:last-child), .ag-theme-alpine .ag-ltr .ag-column-select-header-checkbox:not(:last-child), .ag-theme-alpine .ag-ltr .ag-column-select-header-filter-wrapper:not(:last-child), .ag-theme-alpine .ag-ltr .ag-column-select-checkbox:not(:last-child), .ag-theme-alpine .ag-ltr .ag-column-select-column-drag-handle:not(:last-child), .ag-theme-alpine .ag-ltr .ag-column-select-column-group-drag-handle:not(:last-child), .ag-theme-alpine .ag-ltr .ag-column-select-column-label:not(:last-child) {
  margin-right: 12px;
}

.ag-theme-alpine .ag-rtl .ag-column-group-icons:not(:last-child), .ag-theme-alpine .ag-rtl .ag-column-select-header-icon:not(:last-child), .ag-theme-alpine .ag-rtl .ag-column-select-header-checkbox:not(:last-child), .ag-theme-alpine .ag-rtl .ag-column-select-header-filter-wrapper:not(:last-child), .ag-theme-alpine .ag-rtl .ag-column-select-checkbox:not(:last-child), .ag-theme-alpine .ag-rtl .ag-column-select-column-drag-handle:not(:last-child), .ag-theme-alpine .ag-rtl .ag-column-select-column-group-drag-handle:not(:last-child), .ag-theme-alpine .ag-rtl .ag-column-select-column-label:not(:last-child) {
  margin-left: 12px;
}

.ag-theme-alpine .ag-keyboard-focus .ag-column-select-virtual-list-item:focus {
  outline: none;
}
.ag-theme-alpine .ag-keyboard-focus .ag-column-select-virtual-list-item:focus::after {
  content: "";
  position: absolute;
  background-color: transparent;
  pointer-events: none;
  top: 1px;
  left: 1px;
  display: block;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  border: 1px solid;
  border-color: rgba(255, 20, 147, 0.4);
  border-color: var(--ag-input-focus-border-color, rgba(255, 20, 147, 0.4));
}
.ag-theme-alpine .ag-column-select-column-group:not(:last-child),
.ag-theme-alpine .ag-column-select-column:not(:last-child) {
  margin-bottom: 9px;
}
.ag-theme-alpine .ag-column-select-column-readonly,
.ag-theme-alpine .ag-column-select-column-group-readonly {
  color: rgba(24, 29, 31, 0.5);
  color: var(--ag-disabled-foreground-color, rgba(24, 29, 31, 0.5));
  pointer-events: none;
}
.ag-theme-alpine .ag-ltr .ag-column-select-add-group-indent {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-column-select-add-group-indent {
  margin-right: 28px;
}

.ag-theme-alpine .ag-column-select-virtual-list-viewport {
  padding: 6px 0px;
}
.ag-theme-alpine .ag-column-select-virtual-list-item {
  padding: 0 12px;
}
.ag-theme-alpine .ag-rtl {
  text-align: right;
}
.ag-theme-alpine .ag-root-wrapper {
  border: solid 1px;
  border-color: #babfc7;
  border-color: var(--ag-border-color, #babfc7);
}
.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-1 {
  padding-left: 46px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-1 {
  padding-right: 46px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-1 {
  padding-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-1 {
  padding-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-1 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-1 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-2 {
  padding-left: 74px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-2 {
  padding-right: 74px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-2 {
  padding-left: 56px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-2 {
  padding-right: 56px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-2 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-2 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-3 {
  padding-left: 102px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-3 {
  padding-right: 102px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-3 {
  padding-left: 84px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-3 {
  padding-right: 84px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-3 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-3 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-4 {
  padding-left: 130px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-4 {
  padding-right: 130px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-4 {
  padding-left: 112px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-4 {
  padding-right: 112px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-4 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-4 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-5 {
  padding-left: 158px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-5 {
  padding-right: 158px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-5 {
  padding-left: 140px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-5 {
  padding-right: 140px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-5 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-5 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-6 {
  padding-left: 186px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-6 {
  padding-right: 186px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-6 {
  padding-left: 168px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-6 {
  padding-right: 168px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-6 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-6 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-7 {
  padding-left: 214px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-7 {
  padding-right: 214px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-7 {
  padding-left: 196px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-7 {
  padding-right: 196px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-7 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-7 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-8 {
  padding-left: 242px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-8 {
  padding-right: 242px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-8 {
  padding-left: 224px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-8 {
  padding-right: 224px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-8 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-8 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-9 {
  padding-left: 270px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-9 {
  padding-right: 270px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-9 {
  padding-left: 252px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-9 {
  padding-right: 252px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-9 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-9 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-10 {
  padding-left: 298px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-10 {
  padding-right: 298px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-10 {
  padding-left: 280px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-10 {
  padding-right: 280px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-10 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-10 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-11 {
  padding-left: 326px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-11 {
  padding-right: 326px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-11 {
  padding-left: 308px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-11 {
  padding-right: 308px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-11 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-11 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-12 {
  padding-left: 354px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-12 {
  padding-right: 354px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-12 {
  padding-left: 336px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-12 {
  padding-right: 336px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-12 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-12 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-13 {
  padding-left: 382px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-13 {
  padding-right: 382px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-13 {
  padding-left: 364px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-13 {
  padding-right: 364px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-13 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-13 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-14 {
  padding-left: 410px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-14 {
  padding-right: 410px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-14 {
  padding-left: 392px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-14 {
  padding-right: 392px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-14 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-14 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-15 {
  padding-left: 438px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-15 {
  padding-right: 438px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-15 {
  padding-left: 420px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-15 {
  padding-right: 420px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-15 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-15 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-16 {
  padding-left: 466px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-16 {
  padding-right: 466px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-16 {
  padding-left: 448px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-16 {
  padding-right: 448px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-16 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-16 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-17 {
  padding-left: 494px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-17 {
  padding-right: 494px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-17 {
  padding-left: 476px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-17 {
  padding-right: 476px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-17 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-17 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-18 {
  padding-left: 522px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-18 {
  padding-right: 522px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-18 {
  padding-left: 504px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-18 {
  padding-right: 504px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-18 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-18 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-19 {
  padding-left: 550px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-19 {
  padding-right: 550px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-19 {
  padding-left: 532px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-19 {
  padding-right: 532px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-19 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-19 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-20 {
  padding-left: 578px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-20 {
  padding-right: 578px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-20 {
  padding-left: 560px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-20 {
  padding-right: 560px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-20 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-20 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-21 {
  padding-left: 606px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-21 {
  padding-right: 606px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-21 {
  padding-left: 588px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-21 {
  padding-right: 588px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-21 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-21 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-22 {
  padding-left: 634px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-22 {
  padding-right: 634px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-22 {
  padding-left: 616px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-22 {
  padding-right: 616px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-22 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-22 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-23 {
  padding-left: 662px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-23 {
  padding-right: 662px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-23 {
  padding-left: 644px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-23 {
  padding-right: 644px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-23 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-23 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-24 {
  padding-left: 690px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-24 {
  padding-right: 690px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-24 {
  padding-left: 672px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-24 {
  padding-right: 672px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-24 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-24 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-25 {
  padding-left: 718px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-25 {
  padding-right: 718px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-25 {
  padding-left: 700px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-25 {
  padding-right: 700px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-25 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-25 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-26 {
  padding-left: 746px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-26 {
  padding-right: 746px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-26 {
  padding-left: 728px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-26 {
  padding-right: 728px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-26 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-26 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-27 {
  padding-left: 774px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-27 {
  padding-right: 774px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-27 {
  padding-left: 756px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-27 {
  padding-right: 756px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-27 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-27 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-28 {
  padding-left: 802px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-28 {
  padding-right: 802px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-28 {
  padding-left: 784px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-28 {
  padding-right: 784px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-28 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-28 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-29 {
  padding-left: 830px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-29 {
  padding-right: 830px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-29 {
  padding-left: 812px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-29 {
  padding-right: 812px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-29 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-29 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-30 {
  padding-left: 858px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-30 {
  padding-right: 858px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-30 {
  padding-left: 840px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-30 {
  padding-right: 840px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-30 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-30 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-31 {
  padding-left: 886px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-31 {
  padding-right: 886px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-31 {
  padding-left: 868px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-31 {
  padding-right: 868px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-31 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-31 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-32 {
  padding-left: 914px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-32 {
  padding-right: 914px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-32 {
  padding-left: 896px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-32 {
  padding-right: 896px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-32 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-32 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-33 {
  padding-left: 942px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-33 {
  padding-right: 942px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-33 {
  padding-left: 924px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-33 {
  padding-right: 924px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-33 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-33 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-34 {
  padding-left: 970px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-34 {
  padding-right: 970px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-34 {
  padding-left: 952px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-34 {
  padding-right: 952px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-34 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-34 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-35 {
  padding-left: 998px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-35 {
  padding-right: 998px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-35 {
  padding-left: 980px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-35 {
  padding-right: 980px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-35 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-35 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-36 {
  padding-left: 1026px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-36 {
  padding-right: 1026px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-36 {
  padding-left: 1008px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-36 {
  padding-right: 1008px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-36 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-36 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-37 {
  padding-left: 1054px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-37 {
  padding-right: 1054px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-37 {
  padding-left: 1036px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-37 {
  padding-right: 1036px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-37 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-37 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-38 {
  padding-left: 1082px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-38 {
  padding-right: 1082px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-38 {
  padding-left: 1064px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-38 {
  padding-right: 1064px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-38 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-38 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-39 {
  padding-left: 1110px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-39 {
  padding-right: 1110px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-39 {
  padding-left: 1092px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-39 {
  padding-right: 1092px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-39 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-39 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-40 {
  padding-left: 1138px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-40 {
  padding-right: 1138px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-40 {
  padding-left: 1120px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-40 {
  padding-right: 1120px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-40 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-40 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-41 {
  padding-left: 1166px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-41 {
  padding-right: 1166px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-41 {
  padding-left: 1148px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-41 {
  padding-right: 1148px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-41 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-41 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-42 {
  padding-left: 1194px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-42 {
  padding-right: 1194px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-42 {
  padding-left: 1176px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-42 {
  padding-right: 1176px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-42 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-42 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-43 {
  padding-left: 1222px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-43 {
  padding-right: 1222px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-43 {
  padding-left: 1204px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-43 {
  padding-right: 1204px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-43 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-43 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-44 {
  padding-left: 1250px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-44 {
  padding-right: 1250px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-44 {
  padding-left: 1232px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-44 {
  padding-right: 1232px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-44 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-44 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-45 {
  padding-left: 1278px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-45 {
  padding-right: 1278px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-45 {
  padding-left: 1260px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-45 {
  padding-right: 1260px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-45 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-45 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-46 {
  padding-left: 1306px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-46 {
  padding-right: 1306px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-46 {
  padding-left: 1288px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-46 {
  padding-right: 1288px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-46 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-46 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-47 {
  padding-left: 1334px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-47 {
  padding-right: 1334px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-47 {
  padding-left: 1316px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-47 {
  padding-right: 1316px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-47 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-47 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-48 {
  padding-left: 1362px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-48 {
  padding-right: 1362px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-48 {
  padding-left: 1344px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-48 {
  padding-right: 1344px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-48 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-48 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-49 {
  padding-left: 1390px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-49 {
  padding-right: 1390px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-49 {
  padding-left: 1372px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-49 {
  padding-right: 1372px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-49 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-49 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-50 {
  padding-left: 1418px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-50 {
  padding-right: 1418px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-50 {
  padding-left: 1400px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-50 {
  padding-right: 1400px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-50 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-50 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-51 {
  padding-left: 1446px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-51 {
  padding-right: 1446px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-51 {
  padding-left: 1428px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-51 {
  padding-right: 1428px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-51 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-51 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-52 {
  padding-left: 1474px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-52 {
  padding-right: 1474px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-52 {
  padding-left: 1456px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-52 {
  padding-right: 1456px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-52 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-52 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-53 {
  padding-left: 1502px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-53 {
  padding-right: 1502px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-53 {
  padding-left: 1484px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-53 {
  padding-right: 1484px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-53 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-53 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-54 {
  padding-left: 1530px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-54 {
  padding-right: 1530px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-54 {
  padding-left: 1512px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-54 {
  padding-right: 1512px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-54 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-54 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-55 {
  padding-left: 1558px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-55 {
  padding-right: 1558px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-55 {
  padding-left: 1540px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-55 {
  padding-right: 1540px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-55 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-55 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-56 {
  padding-left: 1586px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-56 {
  padding-right: 1586px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-56 {
  padding-left: 1568px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-56 {
  padding-right: 1568px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-56 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-56 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-57 {
  padding-left: 1614px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-57 {
  padding-right: 1614px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-57 {
  padding-left: 1596px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-57 {
  padding-right: 1596px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-57 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-57 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-58 {
  padding-left: 1642px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-58 {
  padding-right: 1642px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-58 {
  padding-left: 1624px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-58 {
  padding-right: 1624px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-58 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-58 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-59 {
  padding-left: 1670px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-59 {
  padding-right: 1670px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-59 {
  padding-left: 1652px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-59 {
  padding-right: 1652px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-59 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-59 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-60 {
  padding-left: 1698px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-60 {
  padding-right: 1698px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-60 {
  padding-left: 1680px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-60 {
  padding-right: 1680px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-60 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-60 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-61 {
  padding-left: 1726px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-61 {
  padding-right: 1726px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-61 {
  padding-left: 1708px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-61 {
  padding-right: 1708px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-61 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-61 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-62 {
  padding-left: 1754px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-62 {
  padding-right: 1754px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-62 {
  padding-left: 1736px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-62 {
  padding-right: 1736px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-62 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-62 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-63 {
  padding-left: 1782px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-63 {
  padding-right: 1782px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-63 {
  padding-left: 1764px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-63 {
  padding-right: 1764px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-63 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-63 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-64 {
  padding-left: 1810px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-64 {
  padding-right: 1810px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-64 {
  padding-left: 1792px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-64 {
  padding-right: 1792px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-64 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-64 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-65 {
  padding-left: 1838px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-65 {
  padding-right: 1838px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-65 {
  padding-left: 1820px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-65 {
  padding-right: 1820px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-65 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-65 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-66 {
  padding-left: 1866px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-66 {
  padding-right: 1866px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-66 {
  padding-left: 1848px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-66 {
  padding-right: 1848px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-66 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-66 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-67 {
  padding-left: 1894px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-67 {
  padding-right: 1894px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-67 {
  padding-left: 1876px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-67 {
  padding-right: 1876px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-67 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-67 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-68 {
  padding-left: 1922px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-68 {
  padding-right: 1922px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-68 {
  padding-left: 1904px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-68 {
  padding-right: 1904px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-68 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-68 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-69 {
  padding-left: 1950px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-69 {
  padding-right: 1950px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-69 {
  padding-left: 1932px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-69 {
  padding-right: 1932px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-69 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-69 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-70 {
  padding-left: 1978px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-70 {
  padding-right: 1978px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-70 {
  padding-left: 1960px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-70 {
  padding-right: 1960px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-70 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-70 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-71 {
  padding-left: 2006px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-71 {
  padding-right: 2006px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-71 {
  padding-left: 1988px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-71 {
  padding-right: 1988px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-71 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-71 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-72 {
  padding-left: 2034px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-72 {
  padding-right: 2034px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-72 {
  padding-left: 2016px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-72 {
  padding-right: 2016px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-72 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-72 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-73 {
  padding-left: 2062px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-73 {
  padding-right: 2062px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-73 {
  padding-left: 2044px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-73 {
  padding-right: 2044px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-73 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-73 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-74 {
  padding-left: 2090px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-74 {
  padding-right: 2090px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-74 {
  padding-left: 2072px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-74 {
  padding-right: 2072px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-74 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-74 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-75 {
  padding-left: 2118px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-75 {
  padding-right: 2118px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-75 {
  padding-left: 2100px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-75 {
  padding-right: 2100px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-75 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-75 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-76 {
  padding-left: 2146px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-76 {
  padding-right: 2146px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-76 {
  padding-left: 2128px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-76 {
  padding-right: 2128px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-76 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-76 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-77 {
  padding-left: 2174px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-77 {
  padding-right: 2174px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-77 {
  padding-left: 2156px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-77 {
  padding-right: 2156px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-77 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-77 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-78 {
  padding-left: 2202px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-78 {
  padding-right: 2202px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-78 {
  padding-left: 2184px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-78 {
  padding-right: 2184px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-78 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-78 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-79 {
  padding-left: 2230px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-79 {
  padding-right: 2230px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-79 {
  padding-left: 2212px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-79 {
  padding-right: 2212px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-79 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-79 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-80 {
  padding-left: 2258px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-80 {
  padding-right: 2258px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-80 {
  padding-left: 2240px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-80 {
  padding-right: 2240px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-80 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-80 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-81 {
  padding-left: 2286px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-81 {
  padding-right: 2286px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-81 {
  padding-left: 2268px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-81 {
  padding-right: 2268px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-81 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-81 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-82 {
  padding-left: 2314px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-82 {
  padding-right: 2314px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-82 {
  padding-left: 2296px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-82 {
  padding-right: 2296px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-82 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-82 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-83 {
  padding-left: 2342px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-83 {
  padding-right: 2342px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-83 {
  padding-left: 2324px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-83 {
  padding-right: 2324px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-83 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-83 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-84 {
  padding-left: 2370px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-84 {
  padding-right: 2370px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-84 {
  padding-left: 2352px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-84 {
  padding-right: 2352px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-84 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-84 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-85 {
  padding-left: 2398px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-85 {
  padding-right: 2398px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-85 {
  padding-left: 2380px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-85 {
  padding-right: 2380px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-85 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-85 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-86 {
  padding-left: 2426px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-86 {
  padding-right: 2426px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-86 {
  padding-left: 2408px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-86 {
  padding-right: 2408px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-86 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-86 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-87 {
  padding-left: 2454px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-87 {
  padding-right: 2454px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-87 {
  padding-left: 2436px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-87 {
  padding-right: 2436px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-87 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-87 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-88 {
  padding-left: 2482px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-88 {
  padding-right: 2482px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-88 {
  padding-left: 2464px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-88 {
  padding-right: 2464px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-88 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-88 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-89 {
  padding-left: 2510px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-89 {
  padding-right: 2510px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-89 {
  padding-left: 2492px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-89 {
  padding-right: 2492px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-89 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-89 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-90 {
  padding-left: 2538px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-90 {
  padding-right: 2538px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-90 {
  padding-left: 2520px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-90 {
  padding-right: 2520px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-90 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-90 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-91 {
  padding-left: 2566px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-91 {
  padding-right: 2566px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-91 {
  padding-left: 2548px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-91 {
  padding-right: 2548px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-91 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-91 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-92 {
  padding-left: 2594px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-92 {
  padding-right: 2594px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-92 {
  padding-left: 2576px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-92 {
  padding-right: 2576px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-92 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-92 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-93 {
  padding-left: 2622px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-93 {
  padding-right: 2622px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-93 {
  padding-left: 2604px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-93 {
  padding-right: 2604px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-93 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-93 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-94 {
  padding-left: 2650px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-94 {
  padding-right: 2650px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-94 {
  padding-left: 2632px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-94 {
  padding-right: 2632px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-94 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-94 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-95 {
  padding-left: 2678px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-95 {
  padding-right: 2678px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-95 {
  padding-left: 2660px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-95 {
  padding-right: 2660px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-95 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-95 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-96 {
  padding-left: 2706px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-96 {
  padding-right: 2706px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-96 {
  padding-left: 2688px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-96 {
  padding-right: 2688px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-96 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-96 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-97 {
  padding-left: 2734px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-97 {
  padding-right: 2734px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-97 {
  padding-left: 2716px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-97 {
  padding-right: 2716px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-97 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-97 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-98 {
  padding-left: 2762px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-98 {
  padding-right: 2762px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-98 {
  padding-left: 2744px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-98 {
  padding-right: 2744px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-98 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-98 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row > .ag-cell-wrapper.ag-row-group-indent-99 {
  padding-left: 2790px;
}

.ag-theme-alpine .ag-rtl .ag-row > .ag-cell-wrapper.ag-row-group-indent-99 {
  padding-right: 2790px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-indent-99 {
  padding-left: 2772px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-indent-99 {
  padding-right: 2772px;
}

.ag-theme-alpine .ag-ltr .ag-row-level-99 .ag-pivot-leaf-group {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-level-99 .ag-pivot-leaf-group {
  margin-right: 28px;
}

.ag-theme-alpine .ag-ltr .ag-row-group-leaf-indent {
  margin-left: 28px;
}

.ag-theme-alpine .ag-rtl .ag-row-group-leaf-indent {
  margin-right: 28px;
}

.ag-theme-alpine .ag-value-change-delta {
  padding-right: 2px;
}
.ag-theme-alpine .ag-value-change-delta-up {
  color: #43a047;
  color: var(--ag-value-change-delta-up-color, #43a047);
}
.ag-theme-alpine .ag-value-change-delta-down {
  color: #e53935;
  color: var(--ag-value-change-delta-down-color, #e53935);
}
.ag-theme-alpine .ag-value-change-value {
  background-color: transparent;
  border-radius: 1px;
  padding-left: 1px;
  padding-right: 1px;
  transition: background-color 1s;
}
.ag-theme-alpine .ag-value-change-value-highlight {
  background-color: rgba(22, 160, 133, 0.5);
  background-color: var(--ag-value-change-value-highlight-background-color, rgba(22, 160, 133, 0.5));
  transition: background-color 0.1s;
}
.ag-theme-alpine .ag-cell-data-changed {
  background-color: rgba(22, 160, 133, 0.5) !important;
  background-color: var(--ag-value-change-value-highlight-background-color, rgba(22, 160, 133, 0.5)) !important;
}
.ag-theme-alpine .ag-cell-data-changed-animation {
  background-color: transparent;
}
.ag-theme-alpine .ag-cell-highlight {
  background-color: #2196f3 !important;
  background-color: var(--ag-range-selection-highlight-color, var(--ag-range-selection-border-color, #2196f3)) !important;
}
.ag-theme-alpine .ag-row {
  height: 42px;
  background-color: #fff;
  background-color: var(--ag-background-color, #fff);
  color: #181d1f;
  color: var(--ag-data-color, var(--ag-foreground-color, #181d1f));
  border-width: 1px;
  border-color: #dde2eb;
  border-color: var(--ag-row-border-color, var(--ag-secondary-border-color, #dde2eb));
  border-bottom-style: solid;
}
.ag-theme-alpine .ag-row-highlight-above::after, .ag-theme-alpine .ag-row-highlight-below::after {
  content: "";
  position: absolute;
  width: calc(100% - 1px);
  height: 1px;
  background-color: #2196f3;
  background-color: var(--ag-range-selection-border-color, #2196f3);
  left: 1px;
}
.ag-theme-alpine .ag-row-highlight-above::after {
  top: -1px;
}
.ag-theme-alpine .ag-row-highlight-above.ag-row-first::after {
  top: 0;
}
.ag-theme-alpine .ag-row-highlight-below::after {
  bottom: 0px;
}
.ag-theme-alpine .ag-row-odd {
  background-color: #fcfcfc;
  background-color: var(--ag-odd-row-background-color, #fcfcfc);
}
.ag-theme-alpine .ag-body-horizontal-scroll:not(.ag-scrollbar-invisible) .ag-horizontal-left-spacer:not(.ag-scroller-corner) {
  border-right: solid 1px;
  border-right-color: #babfc7;
  border-right-color: var(--ag-border-color, #babfc7);
}
.ag-theme-alpine .ag-body-horizontal-scroll:not(.ag-scrollbar-invisible) .ag-horizontal-right-spacer:not(.ag-scroller-corner) {
  border-left: solid 1px;
  border-left-color: #babfc7;
  border-left-color: var(--ag-border-color, #babfc7);
}
.ag-theme-alpine .ag-row-hover {
  background-color: rgba(255, 20, 147, 0.1);
  background-color: var(--ag-row-hover-color, rgba(255, 20, 147, 0.1));
}
.ag-theme-alpine .ag-column-hover {
  background-color: rgba(255, 20, 147, 0.1);
  background-color: var(--ag-column-hover-color, rgba(255, 20, 147, 0.1));
}
.ag-theme-alpine .ag-ltr .ag-right-aligned-cell {
  text-align: right;
}

.ag-theme-alpine .ag-rtl .ag-right-aligned-cell {
  text-align: left;
}

.ag-theme-alpine .ag-ltr .ag-right-aligned-cell .ag-cell-value, .ag-theme-alpine .ag-ltr .ag-right-aligned-cell .ag-group-value {
  margin-left: auto;
}

.ag-theme-alpine .ag-rtl .ag-right-aligned-cell .ag-cell-value, .ag-theme-alpine .ag-rtl .ag-right-aligned-cell .ag-group-value {
  margin-right: auto;
}

.ag-theme-alpine .ag-cell, .ag-theme-alpine .ag-full-width-row .ag-cell-wrapper.ag-row-group {
  border: 1px solid transparent;
  line-height: min(var(--ag-row-height, 40px), 40px);
  padding-left: 17px;
  padding-right: 17px;
  -webkit-font-smoothing: subpixel-antialiased;
}
.ag-theme-alpine .ag-row > .ag-cell-wrapper {
  padding-left: 17px;
  padding-right: 17px;
}
.ag-theme-alpine .ag-row-dragging {
  cursor: move;
  opacity: 0.5;
}
.ag-theme-alpine .ag-cell-inline-editing {
  border: solid 1px;
  border-color: #babfc7;
  border-color: var(--ag-border-color, #babfc7);
  background: #fff;
  background: var(--ag-background-color, #fff);
  border-radius: 3px;
  box-shadow: 0 1px 4px 1px rgba(186, 191, 199, 0.4);
  padding: 6px;
  padding: 0;
  height: 42px;
  background-color: #f8f8f8;
  background-color: var(--ag-control-panel-background-color, #f8f8f8);
}
.ag-theme-alpine .ag-popup-editor {
  border: solid 1px;
  border-color: #babfc7;
  border-color: var(--ag-border-color, #babfc7);
  background: #fff;
  background: var(--ag-background-color, #fff);
  border-radius: 3px;
  box-shadow: 0 1px 4px 1px rgba(186, 191, 199, 0.4);
  padding: 6px;
  background-color: #f8f8f8;
  background-color: var(--ag-control-panel-background-color, #f8f8f8);
  padding: 0;
}
.ag-theme-alpine .ag-large-text-input {
  height: auto;
  padding: 18px;
}
.ag-theme-alpine .ag-details-row {
  padding: 30px;
  background-color: #fff;
  background-color: var(--ag-background-color, #fff);
}
.ag-theme-alpine .ag-layout-auto-height .ag-center-cols-clipper, .ag-theme-alpine .ag-layout-auto-height .ag-center-cols-container, .ag-theme-alpine .ag-layout-print .ag-center-cols-clipper, .ag-theme-alpine .ag-layout-print .ag-center-cols-container {
  min-height: 50px;
}
.ag-theme-alpine .ag-overlay-loading-wrapper {
  background-color: rgba(255, 255, 255, 0.66);
  background-color: var(--ag-modal-overlay-background-color, rgba(255, 255, 255, 0.66));
}
.ag-theme-alpine .ag-overlay-loading-center {
  border: solid 1px;
  border-color: #babfc7;
  border-color: var(--ag-border-color, #babfc7);
  background: #fff;
  background: var(--ag-background-color, #fff);
  border-radius: 3px;
  box-shadow: 0 1px 4px 1px rgba(186, 191, 199, 0.4);
  padding: 6px;
}
.ag-theme-alpine .ag-overlay-no-rows-wrapper.ag-layout-auto-height {
  padding-top: 30px;
}
.ag-theme-alpine .ag-loading {
  padding-left: 18px;
  display: flex;
  height: 100%;
  align-items: center;
}
.ag-theme-alpine .ag-loading-icon {
  padding-right: 12px;
}
.ag-theme-alpine .ag-icon-loading {
  -webkit-animation-name: spin;
          animation-name: spin;
  -webkit-animation-duration: 1000ms;
          animation-duration: 1000ms;
  -webkit-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
          animation-timing-function: linear;
}
@-webkit-keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.ag-theme-alpine .ag-floating-top {
  border-bottom: solid 1px;
  border-bottom-color: #babfc7;
  border-bottom-color: var(--ag-border-color, #babfc7);
}
.ag-theme-alpine .ag-floating-bottom {
  border-top: solid 1px;
  border-top-color: #babfc7;
  border-top-color: var(--ag-border-color, #babfc7);
}
.ag-theme-alpine .ag-ltr .ag-cell {
  border-right: solid transparent;
}

.ag-theme-alpine .ag-rtl .ag-cell {
  border-left: solid transparent;
}

.ag-theme-alpine .ag-ltr .ag-cell {
  border-right-width: 1px;
}

.ag-theme-alpine .ag-rtl .ag-cell {
  border-left-width: 1px;
}

.ag-theme-alpine .ag-cell.ag-cell-first-right-pinned:not(.ag-cell-range-left):not(.ag-cell-range-single-cell) {
  border-left: solid 1px;
  border-left-color: #babfc7;
  border-left-color: var(--ag-border-color, #babfc7);
}
.ag-theme-alpine .ag-cell.ag-cell-last-left-pinned:not(.ag-cell-range-right):not(.ag-cell-range-single-cell) {
  border-right: solid 1px;
  border-right-color: #babfc7;
  border-right-color: var(--ag-border-color, #babfc7);
}
.ag-theme-alpine .ag-row-selected {
  background-color: rgba(255, 20, 147, 0.3);
  background-color: var(--ag-selected-row-background-color, rgba(255, 20, 147, 0.3));
}
.ag-theme-alpine .ag-cell-range-selected:not(.ag-cell-focus),
.ag-theme-alpine .ag-body-viewport:not(.ag-has-focus) .ag-cell-range-single-cell:not(.ag-cell-inline-editing) {
  background-color: rgba(33, 150, 243, 0.2);
  background-color: var(--ag-range-selection-background-color, rgba(33, 150, 243, 0.2));
}
.ag-theme-alpine .ag-cell-range-selected:not(.ag-cell-focus).ag-cell-range-chart,
.ag-theme-alpine .ag-body-viewport:not(.ag-has-focus) .ag-cell-range-single-cell:not(.ag-cell-inline-editing).ag-cell-range-chart {
  background-color: rgba(0, 88, 255, 0.1) !important;
  background-color: var(--ag-range-selection-chart-background-color, rgba(0, 88, 255, 0.1)) !important;
}
.ag-theme-alpine .ag-cell-range-selected:not(.ag-cell-focus).ag-cell-range-chart.ag-cell-range-chart-category,
.ag-theme-alpine .ag-body-viewport:not(.ag-has-focus) .ag-cell-range-single-cell:not(.ag-cell-inline-editing).ag-cell-range-chart.ag-cell-range-chart-category {
  background-color: rgba(0, 255, 132, 0.1) !important;
  background-color: var(--ag-range-selection-chart-category-background-color, rgba(0, 255, 132, 0.1)) !important;
}
.ag-theme-alpine .ag-cell-range-selected-1:not(.ag-cell-focus),
.ag-theme-alpine .ag-root:not(.ag-context-menu-open) .ag-body-viewport:not(.ag-has-focus) .ag-cell-range-selected-1:not(.ag-cell-inline-editing) {
  background-color: rgba(33, 150, 243, 0.2);
  background-color: var(--ag-range-selection-background-color-1, var(--ag-range-selection-background-color, rgba(33, 150, 243, 0.2)));
}
.ag-theme-alpine .ag-cell-range-selected-2:not(.ag-cell-focus),
.ag-theme-alpine .ag-body-viewport:not(.ag-has-focus) .ag-cell-range-selected-2 {
  background-color: rgba(33, 150, 243, 0.36);
  background-color: var(--ag-range-selection-background-color-2, rgba(33, 150, 243, 0.36));
}
.ag-theme-alpine .ag-cell-range-selected-3:not(.ag-cell-focus),
.ag-theme-alpine .ag-body-viewport:not(.ag-has-focus) .ag-cell-range-selected-3 {
  background-color: rgba(33, 150, 243, 0.488);
  background-color: var(--ag-range-selection-background-color-3, rgba(33, 150, 243, 0.488));
}
.ag-theme-alpine .ag-cell-range-selected-4:not(.ag-cell-focus),
.ag-theme-alpine .ag-body-viewport:not(.ag-has-focus) .ag-cell-range-selected-4 {
  background-color: rgba(33, 150, 243, 0.5904);
  background-color: var(--ag-range-selection-background-color-4, rgba(33, 150, 243, 0.5904));
}
.ag-theme-alpine .ag-cell.ag-cell-range-selected:not(.ag-cell-range-single-cell).ag-cell-range-top {
  border-top-color: #2196f3;
  border-top-color: var(--ag-range-selection-border-color, #2196f3);
}
.ag-theme-alpine .ag-cell.ag-cell-range-selected:not(.ag-cell-range-single-cell).ag-cell-range-right {
  border-right-color: #2196f3;
  border-right-color: var(--ag-range-selection-border-color, #2196f3);
}
.ag-theme-alpine .ag-cell.ag-cell-range-selected:not(.ag-cell-range-single-cell).ag-cell-range-bottom {
  border-bottom-color: #2196f3;
  border-bottom-color: var(--ag-range-selection-border-color, #2196f3);
}
.ag-theme-alpine .ag-cell.ag-cell-range-selected:not(.ag-cell-range-single-cell).ag-cell-range-left {
  border-left-color: #2196f3;
  border-left-color: var(--ag-range-selection-border-color, #2196f3);
}
.ag-theme-alpine .ag-ltr .ag-has-focus .ag-cell-focus:not(.ag-cell-range-selected),
.ag-theme-alpine .ag-ltr .ag-context-menu-open .ag-cell-focus:not(.ag-cell-range-selected),
.ag-theme-alpine .ag-ltr .ag-has-focus .ag-full-width-row.ag-row-focus .ag-cell-wrapper.ag-row-group,
.ag-theme-alpine .ag-ltr .ag-cell-range-single-cell,
.ag-theme-alpine .ag-ltr .ag-cell-range-single-cell.ag-cell-range-handle, .ag-theme-alpine .ag-rtl .ag-has-focus .ag-cell-focus:not(.ag-cell-range-selected),
.ag-theme-alpine .ag-rtl .ag-context-menu-open .ag-cell-focus:not(.ag-cell-range-selected),
.ag-theme-alpine .ag-rtl .ag-has-focus .ag-full-width-row.ag-row-focus .ag-cell-wrapper.ag-row-group,
.ag-theme-alpine .ag-rtl .ag-cell-range-single-cell,
.ag-theme-alpine .ag-rtl .ag-cell-range-single-cell.ag-cell-range-handle {
  border: 1px solid;
  border-color: #2196f3;
  border-color: var(--ag-range-selection-border-color, #2196f3);
  outline: initial;
}
.ag-theme-alpine .ag-cell.ag-selection-fill-top,
.ag-theme-alpine .ag-cell.ag-selection-fill-top.ag-cell-range-selected {
  border-top: 1px dashed;
  border-top-color: #2196f3;
  border-top-color: var(--ag-range-selection-border-color, #2196f3);
}
.ag-theme-alpine .ag-ltr .ag-cell.ag-selection-fill-right, .ag-theme-alpine .ag-ltr .ag-cell.ag-selection-fill-right.ag-cell-range-selected {
  border-right: 1px dashed;
  border-right-color: #2196f3;
  border-right-color: var(--ag-range-selection-border-color, #2196f3);
}

.ag-theme-alpine .ag-rtl .ag-cell.ag-selection-fill-right, .ag-theme-alpine .ag-rtl .ag-cell.ag-selection-fill-right.ag-cell-range-selected {
  border-left: 1px dashed;
  border-left-color: #2196f3;
  border-left-color: var(--ag-range-selection-border-color, #2196f3);
}

.ag-theme-alpine .ag-cell.ag-selection-fill-bottom,
.ag-theme-alpine .ag-cell.ag-selection-fill-bottom.ag-cell-range-selected {
  border-bottom: 1px dashed;
  border-bottom-color: #2196f3;
  border-bottom-color: var(--ag-range-selection-border-color, #2196f3);
}
.ag-theme-alpine .ag-ltr .ag-cell.ag-selection-fill-left, .ag-theme-alpine .ag-ltr .ag-cell.ag-selection-fill-left.ag-cell-range-selected {
  border-left: 1px dashed;
  border-left-color: #2196f3;
  border-left-color: var(--ag-range-selection-border-color, #2196f3);
}

.ag-theme-alpine .ag-rtl .ag-cell.ag-selection-fill-left, .ag-theme-alpine .ag-rtl .ag-cell.ag-selection-fill-left.ag-cell-range-selected {
  border-right: 1px dashed;
  border-right-color: #2196f3;
  border-right-color: var(--ag-range-selection-border-color, #2196f3);
}

.ag-theme-alpine .ag-range-handle, .ag-theme-alpine .ag-fill-handle {
  position: absolute;
  width: 6px;
  height: 6px;
  bottom: -1px;
  background-color: #2196f3;
  background-color: var(--ag-range-selection-border-color, #2196f3);
}
.ag-theme-alpine .ag-ltr .ag-range-handle, .ag-theme-alpine .ag-ltr .ag-fill-handle {
  right: -1px;
}

.ag-theme-alpine .ag-rtl .ag-range-handle, .ag-theme-alpine .ag-rtl .ag-fill-handle {
  left: -1px;
}

.ag-theme-alpine .ag-fill-handle {
  cursor: cell;
}
.ag-theme-alpine .ag-range-handle {
  cursor: nwse-resize;
}
.ag-theme-alpine .ag-cell-inline-editing {
  border-color: rgba(255, 20, 147, 0.4) !important;
  border-color: var(--ag-input-focus-border-color, rgba(255, 20, 147, 0.4)) !important;
}
.ag-theme-alpine .ag-menu {
  border: solid 1px;
  border-color: #babfc7;
  border-color: var(--ag-border-color, #babfc7);
  background: #fff;
  background: var(--ag-background-color, #fff);
  border-radius: 3px;
  box-shadow: 0 1px 4px 1px rgba(186, 191, 199, 0.4);
  padding: 6px;
  padding: 0;
}
.ag-theme-alpine .ag-menu-list {
  cursor: default;
  padding: 6px 0;
}
.ag-theme-alpine .ag-menu-separator {
  height: 13px;
}
.ag-theme-alpine .ag-menu-separator-part::after {
  content: "";
  display: block;
  border-top: solid 1px;
  border-top-color: #babfc7;
  border-top-color: var(--ag-border-color, #babfc7);
}
.ag-theme-alpine .ag-menu-option-active, .ag-theme-alpine .ag-compact-menu-option-active {
  background-color: rgba(255, 20, 147, 0.1);
  background-color: var(--ag-row-hover-color, rgba(255, 20, 147, 0.1));
}
.ag-theme-alpine .ag-menu-option-part, .ag-theme-alpine .ag-compact-menu-option-part {
  line-height: 16px;
  padding: 8px 0;
}
.ag-theme-alpine .ag-menu-option-disabled, .ag-theme-alpine .ag-compact-menu-option-disabled {
  opacity: 0.5;
}
.ag-theme-alpine .ag-menu-option-icon, .ag-theme-alpine .ag-compact-menu-option-icon {
  width: 16px;
}
.ag-theme-alpine .ag-ltr .ag-menu-option-icon, .ag-theme-alpine .ag-ltr .ag-compact-menu-option-icon {
  padding-left: 12px;
}

.ag-theme-alpine .ag-rtl .ag-menu-option-icon, .ag-theme-alpine .ag-rtl .ag-compact-menu-option-icon {
  padding-right: 12px;
}

.ag-theme-alpine .ag-menu-option-text, .ag-theme-alpine .ag-compact-menu-option-text {
  padding-left: 12px;
  padding-right: 12px;
}
.ag-theme-alpine .ag-ltr .ag-menu-option-shortcut, .ag-theme-alpine .ag-ltr .ag-compact-menu-option-shortcut {
  padding-right: 6px;
}

.ag-theme-alpine .ag-rtl .ag-menu-option-shortcut, .ag-theme-alpine .ag-rtl .ag-compact-menu-option-shortcut {
  padding-left: 6px;
}

.ag-theme-alpine .ag-menu-option-popup-pointer, .ag-theme-alpine .ag-compact-menu-option-popup-pointer {
  padding-right: 6px;
}
.ag-theme-alpine .ag-tabs {
  min-width: 240px;
}
.ag-theme-alpine .ag-tabs-header {
  width: 100%;
  display: flex;
}
.ag-theme-alpine .ag-tab {
  border-bottom: 2px solid transparent;
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex: 1 1 auto;
  transition: border-bottom 0.3s;
}
.ag-theme-alpine .ag-keyboard-focus .ag-tab:focus {
  outline: none;
}
.ag-theme-alpine .ag-keyboard-focus .ag-tab:focus::after {
  content: "";
  position: absolute;
  background-color: transparent;
  pointer-events: none;
  top: 4px;
  left: 4px;
  display: block;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  border: 1px solid;
  border-color: rgba(255, 20, 147, 0.4);
  border-color: var(--ag-input-focus-border-color, rgba(255, 20, 147, 0.4));
}
.ag-theme-alpine .ag-tab-selected {
  border-bottom-color: deeppink;
  border-bottom-color: var(--ag-selected-tab-underline-color, var(--ag-alpine-active-color, deeppink));
}
.ag-theme-alpine .ag-menu-header {
  color: #181d1f;
  color: var(--ag-secondary-foreground-color, var(--ag-foreground-color, #181d1f));
}
.ag-theme-alpine .ag-filter-separator {
  border-top: solid 1px;
  border-top-color: #babfc7;
  border-top-color: var(--ag-border-color, #babfc7);
}
.ag-theme-alpine .ag-menu:not(.ag-tabs) .ag-filter-select {
  min-width: 155px;
}
.ag-theme-alpine .ag-tabs .ag-filter-select {
  min-width: 214px;
}
.ag-theme-alpine .ag-filter-select .ag-picker-field-wrapper {
  width: 0;
}
.ag-theme-alpine .ag-filter-condition-operator {
  height: 17px;
}
.ag-theme-alpine .ag-ltr .ag-filter-condition-operator-or {
  margin-left: 12px;
}

.ag-theme-alpine .ag-rtl .ag-filter-condition-operator-or {
  margin-right: 12px;
}

.ag-theme-alpine .ag-set-filter-select-all {
  padding-top: 12px;
}
.ag-theme-alpine .ag-set-filter-list, .ag-theme-alpine .ag-filter-no-matches {
  height: 144px;
}
.ag-theme-alpine .ag-set-filter-filter {
  margin-top: 12px;
  margin-left: 12px;
  margin-right: 12px;
}
.ag-theme-alpine .ag-filter-to {
  margin-top: 9px;
}
.ag-theme-alpine .ag-mini-filter {
  margin: 12px 12px;
}
.ag-theme-alpine .ag-set-filter-item {
  margin: 0px 12px;
}
.ag-theme-alpine .ag-ltr .ag-set-filter-item-value {
  margin-left: 12px;
}

.ag-theme-alpine .ag-rtl .ag-set-filter-item-value {
  margin-right: 12px;
}

.ag-theme-alpine .ag-filter-apply-panel {
  padding: 12px 12px;
  border-top: solid 1px;
  border-top-color: #dde2eb;
  border-top-color: var(--ag-secondary-border-color, #dde2eb);
}
.ag-theme-alpine .ag-filter-apply-panel-button {
  line-height: 1.5;
}
.ag-theme-alpine .ag-ltr .ag-filter-apply-panel-button {
  margin-left: 12px;
}

.ag-theme-alpine .ag-rtl .ag-filter-apply-panel-button {
  margin-right: 12px;
}

.ag-theme-alpine .ag-simple-filter-body-wrapper {
  padding: 12px 12px;
  padding-bottom: 3px;
}
.ag-theme-alpine .ag-simple-filter-body-wrapper > * {
  margin-bottom: 9px;
}
.ag-theme-alpine .ag-filter-no-matches {
  padding: 12px 12px;
}
.ag-theme-alpine .ag-multi-filter-menu-item {
  margin: 6px 0;
}
.ag-theme-alpine .ag-multi-filter-group-title-bar {
  padding: 12px 6px;
  background-color: transparent;
}
.ag-theme-alpine .ag-keyboard-focus .ag-multi-filter-group-title-bar:focus {
  outline: none;
}
.ag-theme-alpine .ag-keyboard-focus .ag-multi-filter-group-title-bar:focus::after {
  content: "";
  position: absolute;
  background-color: transparent;
  pointer-events: none;
  top: 4px;
  left: 4px;
  display: block;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  border: 1px solid;
  border-color: rgba(255, 20, 147, 0.4);
  border-color: var(--ag-input-focus-border-color, rgba(255, 20, 147, 0.4));
}
.ag-theme-alpine .ag-side-bar {
  position: relative;
}
.ag-theme-alpine .ag-tool-panel-wrapper {
  width: 250px;
  background-color: #f8f8f8;
  background-color: var(--ag-control-panel-background-color, #f8f8f8);
}
.ag-theme-alpine .ag-side-buttons {
  padding-top: 24px;
  width: 20px;
  position: relative;
  color: #181d1f;
  color: var(--ag-foreground-color, #181d1f);
  overflow: hidden;
}
.ag-theme-alpine button.ag-side-button-button {
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  background: transparent;
  padding: 12px 0 12px 0;
  width: 100%;
  margin: 0;
  min-height: 108px;
  background-position-y: center;
  background-position-x: center;
  background-repeat: no-repeat;
  border: none;
}
.ag-theme-alpine button.ag-side-button-button:focus {
  box-shadow: none;
}
.ag-theme-alpine .ag-keyboard-focus .ag-side-button-button:focus {
  outline: none;
}
.ag-theme-alpine .ag-keyboard-focus .ag-side-button-button:focus::after {
  content: "";
  position: absolute;
  background-color: transparent;
  pointer-events: none;
  top: 4px;
  left: 4px;
  display: block;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  border: 1px solid;
  border-color: rgba(255, 20, 147, 0.4);
  border-color: var(--ag-input-focus-border-color, rgba(255, 20, 147, 0.4));
}
.ag-theme-alpine .ag-side-button-icon-wrapper {
  margin-bottom: 3px;
}
.ag-theme-alpine .ag-ltr .ag-side-bar-left,
.ag-theme-alpine .ag-rtl .ag-side-bar-right {
  border-right: solid 1px;
  border-right-color: #babfc7;
  border-right-color: var(--ag-border-color, #babfc7);
}
.ag-theme-alpine .ag-ltr .ag-side-bar-left .ag-tool-panel-wrapper,
.ag-theme-alpine .ag-rtl .ag-side-bar-right .ag-tool-panel-wrapper {
  border-left: solid 1px;
  border-left-color: #babfc7;
  border-left-color: var(--ag-border-color, #babfc7);
}
.ag-theme-alpine .ag-ltr .ag-side-bar-left .ag-side-button-button,
.ag-theme-alpine .ag-rtl .ag-side-bar-right .ag-side-button-button {
  border-right: 2px solid transparent;
  transition: border-right 0.3s;
}
.ag-theme-alpine .ag-ltr .ag-side-bar-left .ag-selected .ag-side-button-button,
.ag-theme-alpine .ag-rtl .ag-side-bar-right .ag-selected .ag-side-button-button {
  border-right-color: deeppink;
  border-right-color: var(--ag-selected-tab-underline-color, var(--ag-alpine-active-color, deeppink));
}
.ag-theme-alpine .ag-rtl .ag-side-bar-left,
.ag-theme-alpine .ag-ltr .ag-side-bar-right {
  border-left: solid 1px;
  border-left-color: #babfc7;
  border-left-color: var(--ag-border-color, #babfc7);
}
.ag-theme-alpine .ag-rtl .ag-side-bar-left .ag-tool-panel-wrapper,
.ag-theme-alpine .ag-ltr .ag-side-bar-right .ag-tool-panel-wrapper {
  border-right: solid 1px;
  border-right-color: #babfc7;
  border-right-color: var(--ag-border-color, #babfc7);
}
.ag-theme-alpine .ag-rtl .ag-side-bar-left .ag-side-button-button,
.ag-theme-alpine .ag-ltr .ag-side-bar-right .ag-side-button-button {
  border-left: 2px solid transparent;
  transition: border-left 0.3s;
}
.ag-theme-alpine .ag-rtl .ag-side-bar-left .ag-selected .ag-side-button-button,
.ag-theme-alpine .ag-ltr .ag-side-bar-right .ag-selected .ag-side-button-button {
  border-left-color: deeppink;
  border-left-color: var(--ag-selected-tab-underline-color, var(--ag-alpine-active-color, deeppink));
}
.ag-theme-alpine .ag-filter-toolpanel-header {
  height: 36px;
}
.ag-theme-alpine .ag-ltr .ag-filter-toolpanel-header, .ag-theme-alpine .ag-ltr .ag-filter-toolpanel-search {
  padding-left: 6px;
}

.ag-theme-alpine .ag-rtl .ag-filter-toolpanel-header, .ag-theme-alpine .ag-rtl .ag-filter-toolpanel-search {
  padding-right: 6px;
}

.ag-theme-alpine .ag-keyboard-focus .ag-filter-toolpanel-header:focus {
  outline: none;
}
.ag-theme-alpine .ag-keyboard-focus .ag-filter-toolpanel-header:focus::after {
  content: "";
  position: absolute;
  background-color: transparent;
  pointer-events: none;
  top: 4px;
  left: 4px;
  display: block;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  border: 1px solid;
  border-color: rgba(255, 20, 147, 0.4);
  border-color: var(--ag-input-focus-border-color, rgba(255, 20, 147, 0.4));
}
.ag-theme-alpine .ag-filter-toolpanel-group.ag-has-filter > .ag-group-title-bar .ag-group-title::after {
  font-family: "agGridAlpine";
  font-size: 16px;
  line-height: 16px;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f114";
  position: absolute;
}
.ag-theme-alpine .ag-ltr .ag-filter-toolpanel-group.ag-has-filter > .ag-group-title-bar .ag-group-title::after {
  padding-left: 6px;
}

.ag-theme-alpine .ag-rtl .ag-filter-toolpanel-group.ag-has-filter > .ag-group-title-bar .ag-group-title::after {
  padding-right: 6px;
}

.ag-theme-alpine .ag-filter-toolpanel-group-level-0-header {
  height: 48px;
}
.ag-theme-alpine .ag-filter-toolpanel-group-item {
  margin-top: 3px;
  margin-bottom: 3px;
}
.ag-theme-alpine .ag-filter-toolpanel-search {
  height: 48px;
}
.ag-theme-alpine .ag-filter-toolpanel-search-input {
  flex-grow: 1;
  height: 24px;
}
.ag-theme-alpine .ag-ltr .ag-filter-toolpanel-search-input {
  margin-right: 6px;
}

.ag-theme-alpine .ag-rtl .ag-filter-toolpanel-search-input {
  margin-left: 6px;
}

.ag-theme-alpine .ag-filter-toolpanel-group-level-0 {
  border-top: solid 1px;
  border-top-color: #dde2eb;
  border-top-color: var(--ag-secondary-border-color, #dde2eb);
}
.ag-theme-alpine .ag-ltr .ag-filter-toolpanel-expand, .ag-theme-alpine .ag-ltr .ag-filter-toolpanel-group-title-bar-icon {
  margin-right: 6px;
}

.ag-theme-alpine .ag-rtl .ag-filter-toolpanel-expand, .ag-theme-alpine .ag-rtl .ag-filter-toolpanel-group-title-bar-icon {
  margin-left: 6px;
}

.ag-theme-alpine .ag-filter-toolpanel-group-level-1 .ag-filter-toolpanel-group-level-1-header.ag-filter-toolpanel-group-title-bar {
  background-color: transparent;
}
.ag-theme-alpine .ag-ltr .ag-filter-toolpanel-group-level-1 .ag-filter-toolpanel-group-level-2-header {
  padding-left: 22px;
}

.ag-theme-alpine .ag-rtl .ag-filter-toolpanel-group-level-1 .ag-filter-toolpanel-group-level-2-header {
  padding-right: 22px;
}

.ag-theme-alpine .ag-filter-toolpanel-group-level-2 .ag-filter-toolpanel-group-level-2-header.ag-filter-toolpanel-group-title-bar {
  background-color: transparent;
}
.ag-theme-alpine .ag-ltr .ag-filter-toolpanel-group-level-2 .ag-filter-toolpanel-group-level-3-header {
  padding-left: 38px;
}

.ag-theme-alpine .ag-rtl .ag-filter-toolpanel-group-level-2 .ag-filter-toolpanel-group-level-3-header {
  padding-right: 38px;
}

.ag-theme-alpine .ag-filter-toolpanel-group-level-3 .ag-filter-toolpanel-group-level-3-header.ag-filter-toolpanel-group-title-bar {
  background-color: transparent;
}
.ag-theme-alpine .ag-ltr .ag-filter-toolpanel-group-level-3 .ag-filter-toolpanel-group-level-4-header {
  padding-left: 54px;
}

.ag-theme-alpine .ag-rtl .ag-filter-toolpanel-group-level-3 .ag-filter-toolpanel-group-level-4-header {
  padding-right: 54px;
}

.ag-theme-alpine .ag-filter-toolpanel-group-level-4 .ag-filter-toolpanel-group-level-4-header.ag-filter-toolpanel-group-title-bar {
  background-color: transparent;
}
.ag-theme-alpine .ag-ltr .ag-filter-toolpanel-group-level-4 .ag-filter-toolpanel-group-level-5-header {
  padding-left: 70px;
}

.ag-theme-alpine .ag-rtl .ag-filter-toolpanel-group-level-4 .ag-filter-toolpanel-group-level-5-header {
  padding-right: 70px;
}

.ag-theme-alpine .ag-filter-toolpanel-group-level-5 .ag-filter-toolpanel-group-level-5-header.ag-filter-toolpanel-group-title-bar {
  background-color: transparent;
}
.ag-theme-alpine .ag-ltr .ag-filter-toolpanel-group-level-5 .ag-filter-toolpanel-group-level-6-header {
  padding-left: 86px;
}

.ag-theme-alpine .ag-rtl .ag-filter-toolpanel-group-level-5 .ag-filter-toolpanel-group-level-6-header {
  padding-right: 86px;
}

.ag-theme-alpine .ag-filter-toolpanel-group-level-6 .ag-filter-toolpanel-group-level-6-header.ag-filter-toolpanel-group-title-bar {
  background-color: transparent;
}
.ag-theme-alpine .ag-ltr .ag-filter-toolpanel-group-level-6 .ag-filter-toolpanel-group-level-7-header {
  padding-left: 102px;
}

.ag-theme-alpine .ag-rtl .ag-filter-toolpanel-group-level-6 .ag-filter-toolpanel-group-level-7-header {
  padding-right: 102px;
}

.ag-theme-alpine .ag-filter-toolpanel-group-level-7 .ag-filter-toolpanel-group-level-7-header.ag-filter-toolpanel-group-title-bar {
  background-color: transparent;
}
.ag-theme-alpine .ag-ltr .ag-filter-toolpanel-group-level-7 .ag-filter-toolpanel-group-level-8-header {
  padding-left: 118px;
}

.ag-theme-alpine .ag-rtl .ag-filter-toolpanel-group-level-7 .ag-filter-toolpanel-group-level-8-header {
  padding-right: 118px;
}

.ag-theme-alpine .ag-filter-toolpanel-group-level-8 .ag-filter-toolpanel-group-level-8-header.ag-filter-toolpanel-group-title-bar {
  background-color: transparent;
}
.ag-theme-alpine .ag-ltr .ag-filter-toolpanel-group-level-8 .ag-filter-toolpanel-group-level-9-header {
  padding-left: 134px;
}

.ag-theme-alpine .ag-rtl .ag-filter-toolpanel-group-level-8 .ag-filter-toolpanel-group-level-9-header {
  padding-right: 134px;
}

.ag-theme-alpine .ag-filter-toolpanel-group-level-9 .ag-filter-toolpanel-group-level-9-header.ag-filter-toolpanel-group-title-bar {
  background-color: transparent;
}
.ag-theme-alpine .ag-ltr .ag-filter-toolpanel-group-level-9 .ag-filter-toolpanel-group-level-10-header {
  padding-left: 150px;
}

.ag-theme-alpine .ag-rtl .ag-filter-toolpanel-group-level-9 .ag-filter-toolpanel-group-level-10-header {
  padding-right: 150px;
}

.ag-theme-alpine .ag-filter-toolpanel-group-level-10 .ag-filter-toolpanel-group-level-10-header.ag-filter-toolpanel-group-title-bar {
  background-color: transparent;
}
.ag-theme-alpine .ag-ltr .ag-filter-toolpanel-group-level-10 .ag-filter-toolpanel-group-level-11-header {
  padding-left: 166px;
}

.ag-theme-alpine .ag-rtl .ag-filter-toolpanel-group-level-10 .ag-filter-toolpanel-group-level-11-header {
  padding-right: 166px;
}

.ag-theme-alpine .ag-filter-toolpanel-instance-header.ag-filter-toolpanel-group-level-1-header {
  padding-left: 6px;
}
.ag-theme-alpine .ag-filter-toolpanel-instance-filter {
  border-top: solid 1px;
  border-top-color: #babfc7;
  border-top-color: var(--ag-border-color, #babfc7);
  border-bottom: solid 1px;
  border-bottom-color: #babfc7;
  border-bottom-color: var(--ag-border-color, #babfc7);
  margin-top: 6px;
}
.ag-theme-alpine .ag-ltr .ag-filter-toolpanel-instance-header-icon {
  margin-left: 6px;
}

.ag-theme-alpine .ag-rtl .ag-filter-toolpanel-instance-header-icon {
  margin-right: 6px;
}

.ag-theme-alpine .ag-pivot-mode-panel {
  min-height: 48px;
  height: 48px;
  display: flex;
}
.ag-theme-alpine .ag-pivot-mode-select {
  display: flex;
  align-items: center;
}
.ag-theme-alpine .ag-ltr .ag-pivot-mode-select {
  margin-left: 12px;
}

.ag-theme-alpine .ag-rtl .ag-pivot-mode-select {
  margin-right: 12px;
}

.ag-theme-alpine .ag-keyboard-focus .ag-column-select-header:focus {
  outline: none;
}
.ag-theme-alpine .ag-keyboard-focus .ag-column-select-header:focus::after {
  content: "";
  position: absolute;
  background-color: transparent;
  pointer-events: none;
  top: 4px;
  left: 4px;
  display: block;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  border: 1px solid;
  border-color: rgba(255, 20, 147, 0.4);
  border-color: var(--ag-input-focus-border-color, rgba(255, 20, 147, 0.4));
}
.ag-theme-alpine .ag-column-select-header {
  height: 48px;
  align-items: center;
  padding: 0 12px;
  border-bottom: solid 1px;
  border-bottom-color: #dde2eb;
  border-bottom-color: var(--ag-secondary-border-color, #dde2eb);
}
.ag-theme-alpine .ag-column-panel-column-select {
  border-bottom: solid 1px;
  border-bottom-color: #dde2eb;
  border-bottom-color: var(--ag-secondary-border-color, #dde2eb);
  border-top: solid 1px;
  border-top-color: #dde2eb;
  border-top-color: var(--ag-secondary-border-color, #dde2eb);
}
.ag-theme-alpine .ag-column-group-icons,
.ag-theme-alpine .ag-column-select-header-icon {
  color: #181d1f;
  color: var(--ag-secondary-foreground-color, var(--ag-foreground-color, #181d1f));
}
.ag-theme-alpine .ag-column-select-list .ag-list-item-hovered::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #2196f3;
  background-color: var(--ag-range-selection-border-color, #2196f3);
}
.ag-theme-alpine .ag-column-select-list .ag-item-highlight-top::after {
  top: 0;
}
.ag-theme-alpine .ag-column-select-list .ag-item-highlight-bottom::after {
  bottom: 0;
}
.ag-theme-alpine .ag-header {
  background-color: #f8f8f8;
  background-color: var(--ag-header-background-color, #f8f8f8);
  border-bottom: solid 1px;
  border-bottom-color: #babfc7;
  border-bottom-color: var(--ag-border-color, #babfc7);
}
.ag-theme-alpine .ag-header-row {
  color: #181d1f;
  color: var(--ag-header-foreground-color, var(--ag-secondary-foreground-color, var(--ag-foreground-color, #181d1f)));
  height: 48px;
}
.ag-theme-alpine .ag-pinned-right-header {
  border-left: solid 1px;
  border-left-color: #babfc7;
  border-left-color: var(--ag-border-color, #babfc7);
}
.ag-theme-alpine .ag-pinned-left-header {
  border-right: solid 1px;
  border-right-color: #babfc7;
  border-right-color: var(--ag-border-color, #babfc7);
}
.ag-theme-alpine .ag-ltr .ag-header-cell:not(.ag-right-aligned-header) .ag-header-label-icon {
  margin-left: 6px;
}

.ag-theme-alpine .ag-rtl .ag-header-cell:not(.ag-right-aligned-header) .ag-header-label-icon {
  margin-right: 6px;
}

.ag-theme-alpine .ag-ltr .ag-header-cell.ag-right-aligned-header .ag-header-label-icon {
  margin-right: 6px;
}

.ag-theme-alpine .ag-rtl .ag-header-cell.ag-right-aligned-header .ag-header-label-icon {
  margin-left: 6px;
}

.ag-theme-alpine .ag-header-cell,
.ag-theme-alpine .ag-header-group-cell {
  padding-left: 18px;
  padding-right: 18px;
}
.ag-theme-alpine .ag-header-cell.ag-header-cell-moving,
.ag-theme-alpine .ag-header-group-cell.ag-header-cell-moving {
  background-color: #fff;
  background-color: var(--ag-header-cell-moving-background-color, var(--ag-background-color, #fff));
}
.ag-theme-alpine .ag-keyboard-focus .ag-header-cell:focus {
  outline: none;
}
.ag-theme-alpine .ag-keyboard-focus .ag-header-cell:focus::after {
  content: "";
  position: absolute;
  background-color: transparent;
  pointer-events: none;
  top: 4px;
  left: 4px;
  display: block;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  border: 1px solid;
  border-color: rgba(255, 20, 147, 0.4);
  border-color: var(--ag-input-focus-border-color, rgba(255, 20, 147, 0.4));
}
.ag-theme-alpine .ag-keyboard-focus .ag-header-group-cell:focus {
  outline: none;
}
.ag-theme-alpine .ag-keyboard-focus .ag-header-group-cell:focus::after {
  content: "";
  position: absolute;
  background-color: transparent;
  pointer-events: none;
  top: 4px;
  left: 4px;
  display: block;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  border: 1px solid;
  border-color: rgba(255, 20, 147, 0.4);
  border-color: var(--ag-input-focus-border-color, rgba(255, 20, 147, 0.4));
}
.ag-theme-alpine .ag-header-icon {
  color: #181d1f;
  color: var(--ag-secondary-foreground-color, var(--ag-foreground-color, #181d1f));
}
.ag-theme-alpine .ag-header-expand-icon {
  cursor: pointer;
}
.ag-theme-alpine .ag-ltr .ag-header-expand-icon {
  padding-left: 4px;
}

.ag-theme-alpine .ag-rtl .ag-header-expand-icon {
  padding-right: 4px;
}

.ag-theme-alpine .ag-header-row:not(:first-child) .ag-header-cell,
.ag-theme-alpine .ag-header-row:not(:first-child) .ag-header-group-cell.ag-header-group-cell-with-group {
  border-top: solid 1px;
  border-top-color: #babfc7;
  border-top-color: var(--ag-border-color, #babfc7);
}
.ag-theme-alpine .ag-header-cell-resize {
  display: flex;
  align-items: center;
}
.ag-theme-alpine .ag-header-cell-resize::after {
  content: "";
  position: absolute;
  z-index: 1;
  display: block;
  left: calc(50% - 1px);
  width: 2px;
  height: 30%;
  top: calc(50% - 15%);
  background-color: rgba(186, 191, 199, 0.5);
  background-color: var(--ag-header-column-resize-handle-color, rgba(186, 191, 199, 0.5));
}
.ag-theme-alpine .ag-pinned-right-header .ag-header-cell-resize::after {
  left: calc(50% - 2px);
}
.ag-theme-alpine .ag-ltr .ag-header-select-all {
  margin-right: 18px;
}

.ag-theme-alpine .ag-rtl .ag-header-select-all {
  margin-left: 18px;
}

.ag-theme-alpine .ag-ltr .ag-floating-filter-button {
  margin-left: 18px;
}

.ag-theme-alpine .ag-rtl .ag-floating-filter-button {
  margin-right: 18px;
}

.ag-theme-alpine .ag-floating-filter-button-button {
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  background: transparent;
  border: none;
  height: 16px;
  padding: 0;
  width: 16px;
}
.ag-theme-alpine .ag-filter-loading {
  background-color: #f8f8f8;
  background-color: var(--ag-control-panel-background-color, #f8f8f8);
  height: 100%;
  padding: 12px 12px;
  position: absolute;
  width: 100%;
  z-index: 1;
}
.ag-theme-alpine .ag-paging-panel {
  border-top: 1px solid;
  border-top-color: #babfc7;
  border-top-color: var(--ag-border-color, #babfc7);
  color: #181d1f;
  color: var(--ag-secondary-foreground-color, var(--ag-foreground-color, #181d1f));
  height: 48px;
}
.ag-theme-alpine .ag-paging-panel > * {
  margin: 0 18px;
}
.ag-theme-alpine .ag-paging-button {
  cursor: pointer;
}
.ag-theme-alpine .ag-paging-button.ag-disabled {
  cursor: default;
  color: rgba(24, 29, 31, 0.5);
  color: var(--ag-disabled-foreground-color, rgba(24, 29, 31, 0.5));
}
.ag-theme-alpine .ag-keyboard-focus .ag-paging-button:focus {
  outline: none;
}
.ag-theme-alpine .ag-keyboard-focus .ag-paging-button:focus::after {
  content: "";
  position: absolute;
  background-color: transparent;
  pointer-events: none;
  top: 0px;
  left: 0px;
  display: block;
  width: calc(100% - 0px);
  height: calc(100% - 0px);
  border: 1px solid;
  border-color: rgba(255, 20, 147, 0.4);
  border-color: var(--ag-input-focus-border-color, rgba(255, 20, 147, 0.4));
}
.ag-theme-alpine .ag-paging-button, .ag-theme-alpine .ag-paging-description {
  margin: 0 6px;
}
.ag-theme-alpine .ag-status-bar {
  border-top: solid 1px;
  border-top-color: #babfc7;
  border-top-color: var(--ag-border-color, #babfc7);
  color: rgba(24, 29, 31, 0.5);
  color: var(--ag-disabled-foreground-color, rgba(24, 29, 31, 0.5));
  padding-right: 24px;
  padding-left: 24px;
  line-height: 1.5;
}
.ag-theme-alpine .ag-status-name-value-value {
  color: #181d1f;
  color: var(--ag-foreground-color, #181d1f);
}
.ag-theme-alpine .ag-status-bar-center {
  text-align: center;
}
.ag-theme-alpine .ag-status-name-value {
  margin-left: 6px;
  margin-right: 6px;
  padding-top: 12px;
  padding-bottom: 12px;
}
.ag-theme-alpine .ag-column-drop-cell {
  background: rgba(24, 29, 31, 0.07);
  background: var(--ag-chip-background-color, rgba(24, 29, 31, 0.07));
  border-radius: 24px;
  height: 24px;
  padding: 0 3px;
  border: 1px solid transparent;
}
.ag-theme-alpine .ag-keyboard-focus .ag-column-drop-cell:focus {
  outline: none;
}
.ag-theme-alpine .ag-keyboard-focus .ag-column-drop-cell:focus::after {
  content: "";
  position: absolute;
  background-color: transparent;
  pointer-events: none;
  top: 2px;
  left: 2px;
  display: block;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  border: 1px solid;
  border-color: rgba(255, 20, 147, 0.4);
  border-color: var(--ag-input-focus-border-color, rgba(255, 20, 147, 0.4));
}
.ag-theme-alpine .ag-column-drop-cell-text {
  margin: 0 6px;
}
.ag-theme-alpine .ag-column-drop-cell-button {
  min-width: 24px;
  margin: 0 3px;
  color: #181d1f;
  color: var(--ag-secondary-foreground-color, var(--ag-foreground-color, #181d1f));
}
.ag-theme-alpine .ag-column-drop-cell-drag-handle {
  margin-left: 12px;
}
.ag-theme-alpine .ag-column-drop-cell-ghost {
  opacity: 0.5;
}
.ag-theme-alpine .ag-column-drop-horizontal {
  background-color: #f8f8f8;
  background-color: var(--ag-control-panel-background-color, #f8f8f8);
  color: #181d1f;
  color: var(--ag-secondary-foreground-color, var(--ag-foreground-color, #181d1f));
  height: 42px;
  border-bottom: solid 1px;
  border-bottom-color: #babfc7;
  border-bottom-color: var(--ag-border-color, #babfc7);
}
.ag-theme-alpine .ag-ltr .ag-column-drop-horizontal {
  padding-left: 18px;
}

.ag-theme-alpine .ag-rtl .ag-column-drop-horizontal {
  padding-right: 18px;
}

.ag-theme-alpine .ag-ltr .ag-column-drop-horizontal-half-width:not(:last-child) {
  border-right: solid 1px;
  border-right-color: #babfc7;
  border-right-color: var(--ag-border-color, #babfc7);
}

.ag-theme-alpine .ag-rtl .ag-column-drop-horizontal-half-width:not(:last-child) {
  border-left: solid 1px;
  border-left-color: #babfc7;
  border-left-color: var(--ag-border-color, #babfc7);
}

.ag-theme-alpine .ag-column-drop-horizontal-cell-separator {
  margin: 0 6px;
  color: #181d1f;
  color: var(--ag-secondary-foreground-color, var(--ag-foreground-color, #181d1f));
}
.ag-theme-alpine .ag-column-drop-horizontal-empty-message {
  color: rgba(24, 29, 31, 0.5);
  color: var(--ag-disabled-foreground-color, rgba(24, 29, 31, 0.5));
}
.ag-theme-alpine .ag-ltr .ag-column-drop-horizontal-icon {
  margin-right: 18px;
}

.ag-theme-alpine .ag-rtl .ag-column-drop-horizontal-icon {
  margin-left: 18px;
}

.ag-theme-alpine .ag-column-drop-vertical-list {
  padding-bottom: 6px;
  padding-right: 6px;
  padding-left: 6px;
}
.ag-theme-alpine .ag-column-drop-vertical-cell {
  margin-top: 6px;
}
.ag-theme-alpine .ag-column-drop-vertical {
  min-height: 50px;
  border-bottom: solid 1px;
  border-bottom-color: #dde2eb;
  border-bottom-color: var(--ag-secondary-border-color, #dde2eb);
}
.ag-theme-alpine .ag-column-drop-vertical.ag-last-column-drop {
  border-bottom: none;
}
.ag-theme-alpine .ag-column-drop-vertical-icon {
  margin-left: 6px;
  margin-right: 6px;
}
.ag-theme-alpine .ag-column-drop-vertical-empty-message {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  color: rgba(24, 29, 31, 0.5);
  color: var(--ag-disabled-foreground-color, rgba(24, 29, 31, 0.5));
  margin-top: 6px;
}
.ag-theme-alpine .ag-select-agg-func-popup {
  border: solid 1px;
  border-color: #babfc7;
  border-color: var(--ag-border-color, #babfc7);
  background: #fff;
  background: var(--ag-background-color, #fff);
  border-radius: 3px;
  box-shadow: 0 1px 4px 1px rgba(186, 191, 199, 0.4);
  padding: 6px;
  background: #fff;
  background: var(--ag-background-color, #fff);
  height: 105px;
  padding: 0;
}
.ag-theme-alpine .ag-select-agg-func-virtual-list-item {
  cursor: default;
  padding-left: 12px;
}
.ag-theme-alpine .ag-select-agg-func-virtual-list-item:hover {
  background-color: rgba(255, 20, 147, 0.3);
  background-color: var(--ag-selected-row-background-color, rgba(255, 20, 147, 0.3));
}
.ag-theme-alpine .ag-keyboard-focus .ag-select-agg-func-virtual-list-item:focus {
  outline: none;
}
.ag-theme-alpine .ag-keyboard-focus .ag-select-agg-func-virtual-list-item:focus::after {
  content: "";
  position: absolute;
  background-color: transparent;
  pointer-events: none;
  top: 1px;
  left: 1px;
  display: block;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  border: 1px solid;
  border-color: rgba(255, 20, 147, 0.4);
  border-color: var(--ag-input-focus-border-color, rgba(255, 20, 147, 0.4));
}
.ag-theme-alpine .ag-chart-menu {
  border-radius: 3px;
  background: #fff;
  background: var(--ag-background-color, #fff);
}
.ag-theme-alpine .ag-chart-menu-icon {
  opacity: 0.5;
  line-height: 24px;
  font-size: 24px;
  width: 24px;
  height: 24px;
  margin: 2px 0;
  cursor: pointer;
  border-radius: 3px;
  color: #181d1f;
  color: var(--ag-secondary-foreground-color, var(--ag-foreground-color, #181d1f));
}
.ag-theme-alpine .ag-chart-menu-icon:hover {
  opacity: 1;
}
.ag-theme-alpine .ag-chart-mini-thumbnail {
  border: 1px solid;
  border-color: #dde2eb;
  border-color: var(--ag-secondary-border-color, #dde2eb);
  border-radius: 5px;
  margin: 5px;
}
.ag-theme-alpine .ag-chart-mini-thumbnail:nth-last-child(3), .ag-theme-alpine .ag-chart-mini-thumbnail:nth-last-child(3) ~ .ag-chart-mini-thumbnail {
  margin-left: auto;
  margin-right: auto;
}
.ag-theme-alpine .ag-ltr .ag-chart-mini-thumbnail:first-child {
  margin-left: 0;
}

.ag-theme-alpine .ag-rtl .ag-chart-mini-thumbnail:first-child {
  margin-right: 0;
}

.ag-theme-alpine .ag-ltr .ag-chart-mini-thumbnail:last-child {
  margin-right: 0;
}

.ag-theme-alpine .ag-rtl .ag-chart-mini-thumbnail:last-child {
  margin-left: 0;
}

.ag-theme-alpine .ag-chart-mini-thumbnail.ag-selected {
  border-color: deeppink;
  border-color: var(--ag-minichart-selected-chart-color, var(--ag-checkbox-checked-color, var(--ag-alpine-active-color, deeppink)));
}
.ag-theme-alpine .ag-chart-settings-card-item {
  background: #181d1f;
  background: var(--ag-foreground-color, #181d1f);
  width: 8px;
  height: 8px;
  border-radius: 4px;
}
.ag-theme-alpine .ag-chart-settings-card-item.ag-selected {
  background-color: deeppink;
  background-color: var(--ag-minichart-selected-page-color, var(--ag-checkbox-checked-color, var(--ag-alpine-active-color, deeppink)));
}
.ag-theme-alpine .ag-chart-data-column-drag-handle {
  margin-left: 6px;
}
.ag-theme-alpine .ag-charts-settings-group-title-bar,
.ag-theme-alpine .ag-charts-data-group-title-bar,
.ag-theme-alpine .ag-charts-format-top-level-group-title-bar {
  border-top: solid 1px;
  border-top-color: #dde2eb;
  border-top-color: var(--ag-secondary-border-color, #dde2eb);
}
.ag-theme-alpine .ag-charts-settings-group-container {
  padding: 6px;
}
.ag-theme-alpine .ag-charts-data-group-container {
  padding: 6px 12px;
}
.ag-theme-alpine .ag-charts-data-group-container .ag-charts-data-group-item:not(.ag-charts-format-sub-level-group) {
  height: 24px;
}
.ag-theme-alpine .ag-charts-data-group-container .ag-list-item-hovered::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #2196f3;
  background-color: var(--ag-range-selection-border-color, #2196f3);
}
.ag-theme-alpine .ag-charts-data-group-container .ag-item-highlight-top::after {
  top: 0;
}
.ag-theme-alpine .ag-charts-data-group-container .ag-item-highlight-bottom::after {
  bottom: 0;
}
.ag-theme-alpine .ag-charts-format-top-level-group-container {
  margin-left: 12px;
  padding: 6px;
}
.ag-theme-alpine .ag-charts-format-top-level-group-item {
  margin: 6px 0;
}
.ag-theme-alpine .ag-charts-format-sub-level-group-container {
  padding: 12px 12px;
  padding-bottom: 3px;
}
.ag-theme-alpine .ag-charts-format-sub-level-group-container > * {
  margin-bottom: 9px;
}
.ag-theme-alpine .ag-charts-group-container.ag-group-container-horizontal {
  padding: 6px;
}
.ag-theme-alpine .ag-chart-data-section,
.ag-theme-alpine .ag-chart-format-section {
  display: flex;
  margin: 0;
}
.ag-theme-alpine .ag-chart-menu-panel {
  background-color: #f8f8f8;
  background-color: var(--ag-control-panel-background-color, #f8f8f8);
}
.ag-theme-alpine .ag-ltr .ag-chart-menu-panel {
  border-left: solid 1px;
  border-left-color: #babfc7;
  border-left-color: var(--ag-border-color, #babfc7);
}

.ag-theme-alpine .ag-rtl .ag-chart-menu-panel {
  border-right: solid 1px;
  border-right-color: #babfc7;
  border-right-color: var(--ag-border-color, #babfc7);
}

.ag-theme-alpine .ag-date-time-list-page-title {
  flex-grow: 1;
  text-align: center;
}
.ag-theme-alpine .ag-date-time-list-page-column-label {
  text-align: center;
}
.ag-theme-alpine .ag-date-time-list-page-entry {
  text-align: center;
}
.ag-theme-alpine .ag-checkbox-input-wrapper {
  font-family: "agGridAlpine";
  font-size: 16px;
  line-height: 16px;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 16px;
  height: 16px;
  background-color: #fff;
  background-color: var(--ag-checkbox-background-color, var(--ag-background-color, #fff));
  border-radius: 3px;
  display: inline-block;
  vertical-align: middle;
  flex: none;
}
.ag-theme-alpine .ag-checkbox-input-wrapper input, .ag-theme-alpine .ag-checkbox-input-wrapper input {
  -webkit-appearance: none;
  opacity: 0;
  width: 100%;
  height: 100%;
}
.ag-theme-alpine .ag-checkbox-input-wrapper:focus-within, .ag-theme-alpine .ag-checkbox-input-wrapper:active {
  outline: none;
  box-shadow: 0 0 2px 0.1rem rgba(255, 20, 147, 0.4);
}
.ag-theme-alpine .ag-checkbox-input-wrapper.ag-disabled {
  opacity: 0.5;
}
.ag-theme-alpine .ag-checkbox-input-wrapper::after {
  content: "\f108";
  color: #999;
  color: var(--ag-checkbox-unchecked-color, #999);
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}
.ag-theme-alpine .ag-checkbox-input-wrapper.ag-checked::after {
  content: "\f106";
  color: deeppink;
  color: var(--ag-checkbox-checked-color, var(--ag-alpine-active-color, deeppink));
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}
.ag-theme-alpine .ag-checkbox-input-wrapper.ag-indeterminate::after {
  content: "\f107";
  color: #999;
  color: var(--ag-checkbox-indeterminate-color, var(--ag-checkbox-unchecked-color, #999));
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}
.ag-theme-alpine .ag-toggle-button-input-wrapper {
  box-sizing: border-box;
  width: 28px;
  height: 18px;
  background-color: #999;
  background-color: var(--ag-toggle-button-off-background-color, var(--ag-checkbox-unchecked-color, #999));
  border-radius: 9px;
  position: relative;
  flex: none;
  border: 1px solid;
  border-color: #999;
  border-color: var(--ag-toggle-button-off-border-color, var(--ag-checkbox-unchecked-color, #999));
}
.ag-theme-alpine .ag-toggle-button-input-wrapper input {
  opacity: 0;
  height: 100%;
  width: 100%;
}
.ag-theme-alpine .ag-toggle-button-input-wrapper:focus-within {
  outline: none;
  box-shadow: 0 0 2px 0.1rem rgba(255, 20, 147, 0.4);
}
.ag-theme-alpine .ag-toggle-button-input-wrapper.ag-disabled {
  opacity: 0.5;
}
.ag-theme-alpine .ag-toggle-button-input-wrapper.ag-checked {
  background-color: deeppink;
  background-color: var(--ag-toggle-button-on-background-color, var(--ag-checkbox-checked-color, var(--ag-alpine-active-color, deeppink)));
  border-color: deeppink;
  border-color: var(--ag-toggle-button-on-border-color, var(--ag-checkbox-checked-color, var(--ag-alpine-active-color, deeppink)));
}
.ag-theme-alpine .ag-toggle-button-input-wrapper::before {
  content: " ";
  position: absolute;
  top: -1px;
  left: -1px;
  display: block;
  box-sizing: border-box;
  height: 18px;
  width: 18px;
  background-color: #fff;
  background-color: var(--ag-toggle-button-switch-background-color, var(--ag-background-color, #fff));
  border-radius: 9px;
  transition: left 100ms;
  border: 1px solid;
  border-color: #999;
  border-color: var(--ag-toggle-button-switch-border-color, var(--ag-toggle-button-off-border-color, var(--ag-checkbox-unchecked-color, #999)));
}
.ag-theme-alpine .ag-toggle-button-input-wrapper.ag-checked::before {
  left: calc(100% - 18px );
  border-color: deeppink;
  border-color: var(--ag-toggle-button-on-border-color, var(--ag-checkbox-checked-color, var(--ag-alpine-active-color, deeppink)));
}
.ag-theme-alpine .ag-radio-button-input-wrapper {
  font-family: "agGridAlpine";
  font-size: 16px;
  line-height: 16px;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 16px;
  height: 16px;
  background-color: #fff;
  background-color: var(--ag-checkbox-background-color, var(--ag-background-color, #fff));
  border-radius: 3px;
  display: inline-block;
  vertical-align: middle;
  flex: none;
  border-radius: 16px;
}
.ag-theme-alpine .ag-radio-button-input-wrapper input, .ag-theme-alpine .ag-radio-button-input-wrapper input {
  -webkit-appearance: none;
  opacity: 0;
  width: 100%;
  height: 100%;
}
.ag-theme-alpine .ag-radio-button-input-wrapper:focus-within, .ag-theme-alpine .ag-radio-button-input-wrapper:active {
  outline: none;
  box-shadow: 0 0 2px 0.1rem rgba(255, 20, 147, 0.4);
}
.ag-theme-alpine .ag-radio-button-input-wrapper.ag-disabled {
  opacity: 0.5;
}
.ag-theme-alpine .ag-radio-button-input-wrapper::after {
  content: "\f126";
  color: #999;
  color: var(--ag-checkbox-unchecked-color, #999);
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}
.ag-theme-alpine .ag-radio-button-input-wrapper.ag-checked::after {
  content: "\f127";
  color: deeppink;
  color: var(--ag-checkbox-checked-color, var(--ag-alpine-active-color, deeppink));
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}
.ag-theme-alpine input[class^=ag-][type=range] {
  -webkit-appearance: none;
  width: 100%;
  height: 100%;
  background: none;
  overflow: visible;
}
.ag-theme-alpine input[class^=ag-][type=range]::-webkit-slider-runnable-track {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 3px;
  background-color: #babfc7;
  background-color: var(--ag-border-color, #babfc7);
  border-radius: 3px;
  border-radius: 3px;
}
.ag-theme-alpine input[class^=ag-][type=range]::-moz-range-track {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 3px;
  background-color: #babfc7;
  background-color: var(--ag-border-color, #babfc7);
  border-radius: 3px;
  border-radius: 3px;
}
.ag-theme-alpine input[class^=ag-][type=range]::-ms-track {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 3px;
  background-color: #babfc7;
  background-color: var(--ag-border-color, #babfc7);
  border-radius: 3px;
  border-radius: 3px;
  color: transparent;
  width: calc(100% - 2px);
}
.ag-theme-alpine input[class^=ag-][type=range]::-webkit-slider-thumb {
  margin: 0;
  padding: 0;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background-color: #fff;
  background-color: var(--ag-background-color, #fff);
  border: 1px solid;
  border-color: #999;
  border-color: var(--ag-checkbox-unchecked-color, #999);
  border-radius: 16px;
  transform: translateY(-6.5px);
}
.ag-theme-alpine input[class^=ag-][type=range]::-ms-thumb {
  margin: 0;
  padding: 0;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background-color: #fff;
  background-color: var(--ag-background-color, #fff);
  border: 1px solid;
  border-color: #999;
  border-color: var(--ag-checkbox-unchecked-color, #999);
  border-radius: 16px;
}
.ag-theme-alpine input[class^=ag-][type=range]::-moz-ag-range-thumb {
  margin: 0;
  padding: 0;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background-color: #fff;
  background-color: var(--ag-background-color, #fff);
  border: 1px solid;
  border-color: #999;
  border-color: var(--ag-checkbox-unchecked-color, #999);
  border-radius: 16px;
}
.ag-theme-alpine input[class^=ag-][type=range]:focus {
  outline: none;
}
.ag-theme-alpine input[class^=ag-][type=range]:focus::-webkit-slider-thumb {
  box-shadow: 0 0 2px 0.1rem rgba(255, 20, 147, 0.4);
  border-color: deeppink;
  border-color: var(--ag-checkbox-checked-color, var(--ag-alpine-active-color, deeppink));
}
.ag-theme-alpine input[class^=ag-][type=range]:focus::-ms-thumb {
  box-shadow: 0 0 2px 0.1rem rgba(255, 20, 147, 0.4);
  border-color: deeppink;
  border-color: var(--ag-checkbox-checked-color, var(--ag-alpine-active-color, deeppink));
}
.ag-theme-alpine input[class^=ag-][type=range]:focus::-moz-ag-range-thumb {
  box-shadow: 0 0 2px 0.1rem rgba(255, 20, 147, 0.4);
  border-color: deeppink;
  border-color: var(--ag-checkbox-checked-color, var(--ag-alpine-active-color, deeppink));
}
.ag-theme-alpine input[class^=ag-][type=range]:active::-webkit-slider-runnable-track {
  background-color: rgba(255, 20, 147, 0.4);
  background-color: var(--ag-input-focus-border-color, rgba(255, 20, 147, 0.4));
}
.ag-theme-alpine input[class^=ag-][type=range]:active::-moz-ag-range-track {
  background-color: rgba(255, 20, 147, 0.4);
  background-color: var(--ag-input-focus-border-color, rgba(255, 20, 147, 0.4));
}
.ag-theme-alpine input[class^=ag-][type=range]:active::-ms-track {
  background-color: rgba(255, 20, 147, 0.4);
  background-color: var(--ag-input-focus-border-color, rgba(255, 20, 147, 0.4));
}
.ag-theme-alpine input[class^=ag-][type=range]:disabled {
  opacity: 0.5;
}
.ag-theme-alpine .ag-filter-toolpanel-header,
.ag-theme-alpine .ag-filter-toolpanel-search,
.ag-theme-alpine .ag-status-bar,
.ag-theme-alpine .ag-header-row,
.ag-theme-alpine .ag-panel-title-bar-title,
.ag-theme-alpine .ag-multi-filter-group-title-bar {
  font-weight: 700;
  color: #181d1f;
  color: var(--ag-header-foreground-color, var(--ag-secondary-foreground-color, var(--ag-foreground-color, #181d1f)));
}
.ag-theme-alpine .ag-rtl .ag-pinned-left-header .ag-header-row::before, .ag-theme-alpine .ag-ltr .ag-pinned-right-header .ag-header-row::after {
  content: "";
  position: absolute;
  height: calc(100% - 20px);
  top: 10px;
  width: 1px;
  background-color: #babfc7;
  background-color: var(--ag-border-color, #babfc7);
}
.ag-theme-alpine .ag-ltr .ag-pinned-right-header .ag-header-row::after {
  right: 0;
}
.ag-theme-alpine .ag-rtl .ag-pinned-left-header .ag-header-row::before {
  left: 0;
}
.ag-theme-alpine .ag-row {
  font-size: 14px;
}
.ag-theme-alpine input[class^=ag-]:not([type]),
.ag-theme-alpine input[class^=ag-][type=text],
.ag-theme-alpine input[class^=ag-][type=number],
.ag-theme-alpine input[class^=ag-][type=tel],
.ag-theme-alpine input[class^=ag-][type=date],
.ag-theme-alpine input[class^=ag-][type=datetime-local],
.ag-theme-alpine textarea[class^=ag-] {
  min-height: 24px;
  border-radius: 3px;
}
.ag-theme-alpine .ag-ltr input[class^=ag-]:not([type]),
.ag-theme-alpine .ag-ltr input[class^=ag-][type=text],
.ag-theme-alpine .ag-ltr input[class^=ag-][type=number],
.ag-theme-alpine .ag-ltr input[class^=ag-][type=tel],
.ag-theme-alpine .ag-ltr input[class^=ag-][type=date],
.ag-theme-alpine .ag-ltr input[class^=ag-][type=datetime-local],
.ag-theme-alpine .ag-ltr textarea[class^=ag-] {
  padding-left: 6px;
}

.ag-theme-alpine .ag-rtl input[class^=ag-]:not([type]),
.ag-theme-alpine .ag-rtl input[class^=ag-][type=text],
.ag-theme-alpine .ag-rtl input[class^=ag-][type=number],
.ag-theme-alpine .ag-rtl input[class^=ag-][type=tel],
.ag-theme-alpine .ag-rtl input[class^=ag-][type=date],
.ag-theme-alpine .ag-rtl input[class^=ag-][type=datetime-local],
.ag-theme-alpine .ag-rtl textarea[class^=ag-] {
  padding-right: 6px;
}

.ag-theme-alpine .ag-tab {
  padding: 9px;
  transition: color 0.4s;
}
.ag-theme-alpine .ag-tab-selected {
  color: deeppink;
  color: var(--ag-alpine-active-color, deeppink);
}
.ag-theme-alpine .ag-menu {
  background-color: #f8f8f8;
  background-color: var(--ag-control-panel-background-color, #f8f8f8);
}
.ag-theme-alpine .ag-menu-header {
  background-color: #f8f8f8;
  background-color: var(--ag-control-panel-background-color, #f8f8f8);
  padding-top: 1px;
}
.ag-theme-alpine .ag-tabs-header {
  border-bottom: solid 1px;
  border-bottom-color: #babfc7;
  border-bottom-color: var(--ag-border-color, #babfc7);
}
.ag-theme-alpine .ag-charts-settings-group-title-bar,
.ag-theme-alpine .ag-charts-data-group-title-bar,
.ag-theme-alpine .ag-charts-format-top-level-group-title-bar {
  padding: 6px 12px;
  line-height: 20px;
}
.ag-theme-alpine .ag-chart-mini-thumbnail {
  background-color: #fff;
  background-color: var(--ag-background-color, #fff);
}
.ag-theme-alpine .ag-chart-settings-nav-bar {
  border-top: solid 1px;
  border-top-color: #dde2eb;
  border-top-color: var(--ag-secondary-border-color, #dde2eb);
}
.ag-theme-alpine .ag-ltr .ag-group-title-bar-icon {
  margin-right: 6px;
}

.ag-theme-alpine .ag-rtl .ag-group-title-bar-icon {
  margin-left: 6px;
}

.ag-theme-alpine .ag-charts-format-top-level-group-toolbar {
  margin-top: 6px;
}
.ag-theme-alpine .ag-ltr .ag-charts-format-top-level-group-toolbar {
  padding-left: 20px;
}

.ag-theme-alpine .ag-rtl .ag-charts-format-top-level-group-toolbar {
  padding-right: 20px;
}

.ag-theme-alpine .ag-charts-format-sub-level-group {
  border-left: dashed 1px;
  border-left-color: #babfc7;
  border-left-color: var(--ag-border-color, #babfc7);
  padding-left: 6px;
  margin-bottom: 12px;
}
.ag-theme-alpine .ag-charts-format-sub-level-group-title-bar {
  padding-top: 0;
  padding-bottom: 0;
  background: none;
  font-weight: 700;
}
.ag-theme-alpine .ag-charts-format-sub-level-group-container {
  padding-bottom: 0;
}
.ag-theme-alpine .ag-charts-format-sub-level-group-item:last-child {
  margin-bottom: 0;
}
.ag-theme-alpine .ag-dnd-ghost {
  font-size: 12px;
  font-weight: 700;
}
.ag-theme-alpine .ag-side-buttons {
  width: 30px;
}
.ag-theme-alpine .ag-standard-button {
  -moz-appearance: none;
       appearance: none;
  -webkit-appearance: none;
  border-radius: 3px;
  border: 1px solid;
  border-color: deeppink;
  border-color: var(--ag-alpine-active-color, deeppink);
  color: deeppink;
  color: var(--ag-alpine-active-color, deeppink);
  background-color: #fff;
  background-color: var(--ag-background-color, #fff);
  font-weight: 600;
  padding: 6px 12px;
}
.ag-theme-alpine .ag-standard-button:hover {
  border-color: deeppink;
  border-color: var(--ag-alpine-active-color, deeppink);
  background-color: rgba(255, 20, 147, 0.1);
  background-color: var(--ag-row-hover-color, rgba(255, 20, 147, 0.1));
}
.ag-theme-alpine .ag-standard-button:active {
  border-color: deeppink;
  border-color: var(--ag-alpine-active-color, deeppink);
  background-color: deeppink;
  background-color: var(--ag-alpine-active-color, deeppink);
  color: #fff;
  color: var(--ag-background-color, #fff);
}
.ag-theme-alpine .ag-standard-button:disabled {
  color: rgba(24, 29, 31, 0.5);
  color: var(--ag-disabled-foreground-color, rgba(24, 29, 31, 0.5));
  background-color: #f1f2f4;
  background-color: var(--ag-input-disabled-background-color, #f1f2f4);
  border-color: rgba(186, 191, 199, 0.3);
  border-color: var(--ag-input-disabled-border-color, rgba(186, 191, 199, 0.3));
}
.ag-theme-alpine .ag-column-drop-vertical {
  min-height: 75px;
}
.ag-theme-alpine .ag-column-drop-vertical-title-bar {
  padding: 12px;
  padding-bottom: 0px;
}
.ag-theme-alpine .ag-column-drop-vertical-empty-message {
  display: flex;
  align-items: center;
  border: dashed 1px;
  border-color: #babfc7;
  border-color: var(--ag-border-color, #babfc7);
  margin: 12px;
  padding: 12px;
}
.ag-theme-alpine .ag-column-drop-empty-message {
  color: #181d1f;
  color: var(--ag-foreground-color, #181d1f);
  opacity: 0.75;
}
.ag-theme-alpine .ag-status-bar {
  font-weight: normal;
}
.ag-theme-alpine .ag-status-name-value-value {
  font-weight: 700;
}
.ag-theme-alpine .ag-paging-number, .ag-theme-alpine .ag-paging-row-summary-panel-number {
  font-weight: 700;
}
.ag-theme-alpine .ag-column-drop-cell-button {
  opacity: 0.5;
}
.ag-theme-alpine .ag-column-drop-cell-button:hover {
  opacity: 0.75;
}
.ag-theme-alpine .ag-header-cell-menu-button:hover,
.ag-theme-alpine .ag-side-button-button:hover,
.ag-theme-alpine .ag-tab:hover,
.ag-theme-alpine .ag-panel-title-bar-button:hover,
.ag-theme-alpine .ag-header-expand-icon:hover,
.ag-theme-alpine .ag-column-group-icons:hover,
.ag-theme-alpine .ag-group-expanded .ag-icon:hover,
.ag-theme-alpine .ag-group-contracted .ag-icon:hover,
.ag-theme-alpine .ag-chart-settings-prev:hover,
.ag-theme-alpine .ag-chart-settings-next:hover,
.ag-theme-alpine .ag-group-title-bar-icon:hover,
.ag-theme-alpine .ag-column-select-header-icon:hover,
.ag-theme-alpine .ag-floating-filter-button-button:hover,
.ag-theme-alpine .ag-filter-toolpanel-expand:hover,
.ag-theme-alpine .ag-chart-menu-icon:hover {
  color: deeppink;
  color: var(--ag-alpine-active-color, deeppink);
}
.ag-theme-alpine .ag-chart-settings-card-item.ag-not-selected:hover {
  opacity: 0.35;
}
.ag-theme-alpine .ag-ltr .ag-panel-title-bar-button {
  margin-left: 12px;
  margin-right: 6px;
}

.ag-theme-alpine .ag-rtl .ag-panel-title-bar-button {
  margin-right: 12px;
  margin-left: 6px;
}

.ag-theme-alpine .ag-filter-toolpanel-group-container {
  padding-left: 6px;
}
.ag-theme-alpine .ag-filter-toolpanel-instance-filter {
  border: none;
  background-color: #f8f8f8;
  background-color: var(--ag-control-panel-background-color, #f8f8f8);
  border-left: dashed 1px;
  border-left-color: #babfc7;
  border-left-color: var(--ag-border-color, #babfc7);
  margin-left: 8px;
  padding-left: 8px;
  margin-right: 12px;
}
.ag-theme-alpine .ag-set-filter-list {
  padding-top: 3px;
  padding-bottom: 3px;
}
.ag-theme-alpine .ag-layout-auto-height .ag-center-cols-clipper, .ag-theme-alpine .ag-layout-auto-height .ag-center-cols-container, .ag-theme-alpine .ag-layout-print .ag-center-cols-clipper, .ag-theme-alpine .ag-layout-print .ag-center-cols-container {
  min-height: 150px;
}
.ag-theme-alpine .ag-overlay-no-rows-wrapper.ag-layout-auto-height {
  padding-top: 60px;
}
.ag-theme-alpine .ag-date-time-list-page-entry-is-current {
  background-color: deeppink;
  background-color: var(--ag-alpine-active-color, deeppink);
}
.ag-theme-alpine .ag-header {
  text-style: italic;
}
`;
