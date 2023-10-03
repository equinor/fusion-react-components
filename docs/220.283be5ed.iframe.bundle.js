"use strict";(self.webpackChunk_equinor_fusion_react_components_stories=self.webpackChunk_equinor_fusion_react_components_stories||[]).push([[220],{"../node_modules/@equinor/fusion-wc-textinput/node_modules/@equinor/fusion-wc-icon/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{IconElement:()=>IconElement,IconType:()=>IconType,createIcon:()=>createIcon,default:()=>lib,iconNames:()=>iconNames,tag:()=>tag});var tslib_es6=__webpack_require__("../node_modules/tslib/tslib.es6.mjs"),fusion_element=__webpack_require__("../node_modules/@equinor/fusion-wc-textinput/node_modules/@equinor/fusion-wc-core/lib/decorators/fusion-element.js"),lit=__webpack_require__("../node_modules/lit/index.js"),decorators=__webpack_require__("../node_modules/lit/decorators.js"),esm=__webpack_require__("../node_modules/@equinor/eds-icons/dist/esm/index.js");const iconNames=Object.keys(esm);var IconType;!function(IconType){IconType.EDS="eds"}(IconType||(IconType={}));const createIcon=(name,type=IconType.EDS)=>{if(type===IconType.EDS){return esm[name]?(({height,width,svgPathData})=>lit.YP`
  <svg viewBox="0 0 ${width} ${height}">
    <path fill-rule="evenodd" clip-rule="evenodd" d="${svgPathData}"></path>
  </svg>
`)(esm[name]):(console.warn("could not find icon",name),null)}},create_icon=createIcon,style=lit.iv`
  :host {
    display: inline-flex;
    height: 1.5em;
    width: 1.5em;
  }
  svg {
    height: 100%;
    width: auto;
    fill: currentColor;
  }
`;class IconElement extends lit.oi{render(){return this.icon?create_icon(this.icon):null}}IconElement.styles=[style],(0,tslib_es6.gn)([(0,decorators.Cb)()],IconElement.prototype,"icon",void 0),(0,tslib_es6.gn)([(0,decorators.Cb)()],IconElement.prototype,"type",void 0);const tag="fwc-icon";let _=class _ extends IconElement{};_=(0,tslib_es6.gn)([(0,fusion_element.S)(tag)],_);const lib=_}}]);
//# sourceMappingURL=220.283be5ed.iframe.bundle.js.map