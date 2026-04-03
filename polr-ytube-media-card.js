function t(t,e,i,s){var r,n=arguments.length,o=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(n<3?r(o):n>3?r(e,i,o):r(e,i))||o);return n>3&&o&&Object.defineProperty(e,i,o),o
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}const e=window,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new n(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var l;const d=window,c=d.trustedTypes,h=c?c.emptyScript:"",p=d.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>e!==t&&(e==e||t==t),y={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:v},_="finalized";let m=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const r=this[t];this[e]=s,this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||y}static finalize(){if(this.hasOwnProperty(_))return!1;this[_]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{i?t.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((i=>{const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=y){var s;const r=this.constructor._$Ep(t,i);if(void 0!==r&&!0===i.reflect){const n=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:u).toAttribute(e,i.type);this._$El=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,r=s._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=s.getPropertyOptions(r),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:u;this._$El=r,this[r]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||v)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var g;m[_]=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},null==p||p({ReactiveElement:m}),(null!==(l=d.reactiveElementVersions)&&void 0!==l?l:d.reactiveElementVersions=[]).push("1.6.2");const f=window,b=f.trustedTypes,x=b?b.createPolicy("lit-html",{createHTML:t=>t}):void 0,$="$lit$",w=`lit$${(Math.random()+"").slice(9)}$`,A="?"+w,S=`<${A}>`,k=document,C=()=>k.createComment(""),L=t=>null===t||"object"!=typeof t&&"function"!=typeof t,E=Array.isArray,H="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,M=/>/g,T=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,V=/"/g,O=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),U=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),z=new WeakMap,I=k.createTreeWalker(k,129,null,!1),q=(t,e)=>{const i=t.length-1,s=[];let r,n=2===e?"<svg>":"",o=P;for(let e=0;e<i;e++){const i=t[e];let a,l,d=-1,c=0;for(;c<i.length&&(o.lastIndex=c,l=o.exec(i),null!==l);)c=o.lastIndex,o===P?"!--"===l[1]?o=R:void 0!==l[1]?o=M:void 0!==l[2]?(O.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=T):void 0!==l[3]&&(o=T):o===T?">"===l[0]?(o=null!=r?r:P,d=-1):void 0===l[1]?d=-2:(d=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?T:'"'===l[3]?V:N):o===V||o===N?o=T:o===R||o===M?o=P:(o=T,r=void 0);const h=o===T&&t[e+1].startsWith("/>")?" ":"";n+=o===P?i+S:d>=0?(s.push(a),i.slice(0,d)+$+i.slice(d)+w+h):i+w+(-2===d?(s.push(void 0),e):h)}const a=n+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==x?x.createHTML(a):a,s]};class Y{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[l,d]=q(t,e);if(this.el=Y.createElement(l,i),I.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=I.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith($)||e.startsWith(w)){const i=d[n++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+$).split(w),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:r,name:e[2],strings:t,ctor:"."===e[1]?Z:"?"===e[1]?J:"@"===e[1]?Q:K})}else a.push({type:6,index:r})}for(const e of t)s.removeAttribute(e)}if(O.test(s.tagName)){const t=s.textContent.split(w),e=t.length-1;if(e>0){s.textContent=b?b.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],C()),I.nextNode(),a.push({type:2,index:++r});s.append(t[e],C())}}}else if(8===s.nodeType)if(s.data===A)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(w,t+1));)a.push({type:7,index:r}),t+=w.length-1}r++}}static createElement(t,e){const i=k.createElement("template");return i.innerHTML=t,i}}function F(t,e,i=t,s){var r,n,o,a;if(e===U)return e;let l=void 0!==s?null===(r=i._$Co)||void 0===r?void 0:r[s]:i._$Cl;const d=L(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===d?l=void 0:(l=new d(t),l._$AT(t,i,s)),void 0!==s?(null!==(o=(a=i)._$Co)&&void 0!==o?o:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=F(t,l._$AS(t,e.values),l,s)),e}class D{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,r=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:k).importNode(i,!0);I.currentNode=r;let n=I.nextNode(),o=0,a=0,l=s[0];for(;void 0!==l;){if(o===l.index){let e;2===l.type?e=new W(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new X(n,this,t)),this._$AV.push(e),l=s[++a]}o!==(null==l?void 0:l.index)&&(n=I.nextNode(),o++)}return I.currentNode=k,r}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class W{constructor(t,e,i,s){var r;this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(r=null==s?void 0:s.isConnected)||void 0===r||r}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=F(this,t,e),L(t)?t===j||null==t||""===t?(this._$AH!==j&&this._$AR(),this._$AH=j):t!==this._$AH&&t!==U&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>E(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==j&&L(this._$AH)?this._$AA.nextSibling.data=t:this.$(k.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,r="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Y.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===r)this._$AH.v(i);else{const t=new D(r,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=z.get(t.strings);return void 0===e&&z.set(t.strings,e=new Y(t)),e}T(t){E(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new W(this.k(C()),this.k(C()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class K{constructor(t,e,i,s,r){this.type=1,this._$AH=j,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=j}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const r=this.strings;let n=!1;if(void 0===r)t=F(this,t,e,0),n=!L(t)||t!==this._$AH&&t!==U,n&&(this._$AH=t);else{const s=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=F(this,s[i+o],e,o),a===U&&(a=this._$AH[o]),n||(n=!L(a)||a!==this._$AH[o]),a===j?t=j:t!==j&&(t+=(null!=a?a:"")+r[o+1]),this._$AH[o]=a}n&&!s&&this.j(t)}j(t){t===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Z extends K{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===j?void 0:t}}const G=b?b.emptyScript:"";class J extends K{constructor(){super(...arguments),this.type=4}j(t){t&&t!==j?this.element.setAttribute(this.name,G):this.element.removeAttribute(this.name)}}class Q extends K{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=F(this,t,e,0))&&void 0!==i?i:j)===U)return;const s=this._$AH,r=t===j&&s!==j||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==j&&(s===j||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class X{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}}const tt=f.litHtmlPolyfillSupport;null==tt||tt(Y,W),(null!==(g=f.litHtmlVersions)&&void 0!==g?g:f.litHtmlVersions=[]).push("2.7.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var et,it;class st extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,r;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let o=n._$litPart$;if(void 0===o){const t=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:null;n._$litPart$=o=new W(e.insertBefore(C(),t),t,void 0,null!=i?i:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return U}}st.finalized=!0,st._$litElement$=!0,null===(et=globalThis.litElementHydrateSupport)||void 0===et||et.call(globalThis,{LitElement:st});const rt=globalThis.litElementPolyfillSupport;null==rt||rt({LitElement:st}),(null!==(it=globalThis.litElementVersions)&&void 0!==it?it:globalThis.litElementVersions=[]).push("3.3.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,ot=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}},at=(t,e,i)=>{e.constructor.createProperty(i,t)};function lt(t){return(e,i)=>void 0!==i?at(t,e,i):ot(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function dt(t){return lt({...t,state:!0})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ct;null===(ct=window.HTMLSlotElement)||void 0===ct||ct.prototype.assignedElements;class ht{}const pt=["track","playlist","tv_show","album"];function ut(t){return null==t?"0:00":new Date(1e3*t).toISOString().substring(14,19)}function vt(t,e,i){if(t===e)return!0;if(Array.isArray(t)&&Array.isArray(e))return t.length===e.length&&t.every(((t,s)=>vt(t,e[s],i)));if("object"==typeof t&&"object"==typeof e&&null!==t&&null!==e){if(Array.isArray(t)||Array.isArray(e))return!1;const s=Object.keys(t),r=Object.keys(e);if(s.length!==r.length||!s.every((t=>r.includes(t))))return!1;for(let s in t){if(i.includes(s))continue;if(!vt(t[s],e[s],i))return!1}return!0}return!1}const yt=B`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>arrow-left</title>
        <path
            d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
    </svg>
`,_t=B`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
            d="M2 11V13C7 13 11 17 11 22H13C13 15.9 8.1 11 2 11M20 2H10C8.9 2 8 2.9 8 4V10.5C9 11 9.9 11.7 10.7 12.4C11.6 11 13.2 10 15 10C17.8 10 20 12.2 20 15S17.8 20 15 20H14.8C14.9 20.7 15 21.3 15 22H20C21.1 22 22 21.1 22 20V4C22 2.9 21.1 2 20 2M15 8C13.9 8 13 7.1 13 6C13 4.9 13.9 4 15 4C16.1 4 17 4.9 17 6S16.1 8 15 8M15 18C14.8 18 14.5 18 14.3 17.9C13.8 16.4 13.1 15.1 12.2 13.9C12.6 12.8 13.7 11.9 15 11.9C16.7 11.9 18 13.2 18 14.9S16.7 18 15 18M2 15V17C4.8 17 7 19.2 7 22H9C9 18.1 5.9 15 2 15M2 19V22H5C5 20.3 3.7 19 2 19" />
    </svg>
`,mt=B`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
    </svg>
`,gt=B`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>forwardburger</title>
        <path
            d="M19,13H3V11H19L15,7L16.4,5.6L22.8,12L16.4,18.4L15,17L19,13M3,6H13V8H3V6M13,16V18H3V16H13Z" />
    </svg>
`,ft=B`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
            d="M12,10A2,2 0 0,1 14,12C14,12.5 13.82,12.94 13.53,13.29L16.7,22H14.57L12,14.93L9.43,22H7.3L10.47,13.29C10.18,12.94 10,12.5 10,12A2,2 0 0,1 12,10M12,8A4,4 0 0,0 8,12C8,12.5 8.1,13 8.28,13.46L7.4,15.86C6.53,14.81 6,13.47 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12C18,13.47 17.47,14.81 16.6,15.86L15.72,13.46C15.9,13 16,12.5 16,12A4,4 0 0,0 12,8M12,4A8,8 0 0,0 4,12C4,14.36 5,16.5 6.64,17.94L5.92,19.94C3.54,18.11 2,15.23 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12C22,15.23 20.46,18.11 18.08,19.94L17.36,17.94C19,16.5 20,14.36 20,12A8,8 0 0,0 12,4Z" />
    </svg>
`,bt=B`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>repeat</title>
        <path
            d="M17,17H7V14L3,18L7,22V19H19V13H17M7,7H17V10L21,6L17,2V5H5V11H7V7Z" />
    </svg>
`,xt=B`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>shuffle-variant</title>
        <path
            d="M17,3L22.25,7.5L17,12L22.25,16.5L17,21V18H14.26L11.44,15.18L13.56,13.06L15.5,15H17V12L17,9H15.5L6.5,18H2V15H5.26L14.26,6H17V3M2,6H6.5L9.32,8.82L7.2,10.94L5.26,9H2V6Z" />
    </svg>
`,$t=B`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>skip-next</title>
        <path d="M16,18H18V6H16M6,18L14.5,12L6,6V18Z" />
    </svg>
`,wt=B`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>skip-previous</title>
        <path d="M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z" />
    </svg>
`,At=B`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>pause</title>
        <path d="M14,19H18V5H14M6,19H10V5H6V19Z" />
    </svg>
`,St=B`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>play</title>
        <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
    </svg>
`,kt=B`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>thumb-up</title>
        <path
            d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z" />
    </svg>
`,Ct=B`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>thumb-up-outline</title>
        <path
            d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z" />
    </svg>
`,Lt=B`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>volume-high</title>
        <path
            d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
    </svg>
`,Et=B` <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <title>volume-off</title>
    <path
        d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
</svg>`;let Ht=class extends st{constructor(){super(...arguments),this._actions=[],this._hasAdditionalActions=!1}firstUpdated(t){this.element.can_expand?this._primaryAction="more":this._primaryAction="play",this._hasAdditionalActions=this.element.can_expand==this.element.can_play?this.element.can_expand:"track"==this.element.media_content_type,this.requestUpdate()}render(){return B`
            <div
                class="list-item ${this.current?"activated":""}"
                @click=${this._performPrimaryAction}
            >
                <div class="graphic">
                    ${this._renderThumbnail(this.element)}
                </div>
                <span class="primary-text">${this.element.title}</span>
                <div class="meta">${this._renderAction()}</div>
            </div>
            ${this._hasAdditionalActions?B`
                      <div class="divider"></div>
                      <div class="actions">
                          ${"more"!=this._primaryAction?this._renderMoreButton(this.element):B``}
                          ${"play"!=this._primaryAction?this._renderPlayButton(this.element):B``}
                          ${this._renderRadioButton(this.element)}
                      </div>
                  `:""}
        `}_performPrimaryAction(){"more"==this._primaryAction&&this._fireNavigateEvent(this.element),"play"==this._primaryAction&&this._play(this.element)}_renderAction(){return"more"==this._primaryAction?B`<span class="meta-icon">${gt}</span>`:"play"==this._primaryAction?B`<ha-icon icon="mdi:play"></ha-icon>`:B``}_renderMoreButton(t){return t.can_expand?B`
            <button
                class="icon-btn"
                @click=${e=>{e.stopPropagation(),this._fireNavigateEvent(t)}}
            >
                ${gt}
            </button>
        `:B``}_renderPlayButton(t){return t.can_play?B`
            <button
                class="icon-btn"
                @click=${e=>{e.stopPropagation(),this._play(t)}}
            >
                ${St}
            </button>
        `:B``}_renderRadioButton(t){if("track"==t.media_content_type){const e="track"==t.media_content_type?t.media_content_id:this.entity.attributes.videoId;return B`
                <button
                    class="icon-btn"
                    @click=${t=>{t.stopPropagation(),this._startRadio(e)}}
                >
                    ${ft}
                </button>
            `}return j}_renderThumbnail(t){return""==t.thumbnail?B`<div class="empty-thumbnail thumbnail">
                <ha-icon icon="mdi:music-box"></ha-icon>
            </div>`:B`
            <img class="thumbnail" src="${t.thumbnail}" />
        `}async _fireNavigateEvent(t){this.dispatchEvent(new CustomEvent("navigate",{detail:{action:t}}))}async _startRadio(t){this.hass.callService("media_player","shuffle_set",{entity_id:this.entity.entity_id,shuffle:!1}),this.hass.callService("media_player","play_media",{entity_id:this.entity.entity_id,media_content_id:t,media_content_type:"vid_channel"})}async _play(t){"PLAYLIST_GOTO_TRACK"!=t.media_content_type?pt.includes(t.media_class)&&this.hass.callService("media_player","play_media",{entity_id:this.entity.entity_id,media_content_id:t.media_content_id,media_content_type:t.media_content_type}):this.hass.callService("ytube_music_player","call_method",{entity_id:this.entity.entity_id,command:"goto_track",parameters:t.media_content_id})}static get styles(){return[o`
                :host {
                    display: grid;
                    grid-template-columns: 1fr min-content min-content;
                    align-items: center;
                }

                .list-item {
                    display: grid;
                    grid-template-columns: 40px 1fr min-content;
                    gap: 8px;
                    align-items: center;
                    padding: 4px 8px;
                    border-radius: 12px;
                    cursor: pointer;
                    min-height: 48px;
                }

                .list-item:hover {
                    background: rgba(var(--rgb-primary-text-color), 0.06);
                }

                .list-item.activated {
                    background: rgba(var(--rgb-primary-color), 0.15);
                }

                .graphic {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    flex-shrink: 0;
                }

                .thumbnail {
                    width: 40px;
                    height: 40px;
                    border-radius: 5%;
                    object-fit: cover;
                }

                .empty-thumbnail {
                    display: flex;
                    background-color: rgba(111, 111, 111, 0.2);
                    border-radius: 5%;
                    height: 40px;
                    width: 40px;
                    align-items: center;
                    justify-content: center;
                }

                .primary-text {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 14px;
                }

                .meta {
                    display: flex;
                    align-items: center;
                }

                .meta-icon svg,
                svg {
                    width: 18px;
                    height: 18px;
                    fill: var(--primary-text-color);
                }

                .divider {
                    width: 2px;
                    background: rgba(var(--rgb-primary-text-color), 0.2);
                    height: 50%;
                    margin: 0 4px;
                }

                .actions {
                    display: grid;
                    grid-template-columns: auto;
                    align-items: center;
                }

                .icon-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 6px;
                    border-radius: 50%;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--primary-text-color);
                }

                .icon-btn:hover {
                    background: rgba(var(--rgb-primary-text-color), 0.08);
                }

                .icon-btn svg {
                    width: 18px;
                    height: 18px;
                    fill: currentColor;
                }
            `]}};t([dt()],Ht.prototype,"entity",void 0),t([dt()],Ht.prototype,"hass",void 0),t([dt()],Ht.prototype,"element",void 0),t([dt()],Ht.prototype,"current",void 0),Ht=t([nt("polr-ytube-list-item")],Ht);let Pt=class extends st{constructor(){super(...arguments),this._actions=[],this._hasAdditionalActions=!1}firstUpdated(t){this.element.can_expand?this._primaryAction="more":this._primaryAction="play",this._hasAdditionalActions=this.element.can_expand==this.element.can_play?this.element.can_expand:"track"==this.element.media_content_type,this.requestUpdate()}render(){return B`
            <div class="grid-item" @click=${this._performPrimaryAction}>
                <div>${this._renderThumbnail(this.element)}</div>
                <span class="title"> ${this.element.title}</span>
                <div class="actions">
                    ${this._hasAdditionalActions?B`
                              ${"more"!=this._primaryAction?this._renderMoreButton(this.element):B``}
                              ${"play"!=this._primaryAction?this._renderPlayButton(this.element):B``}
                              ${this._renderRadioButton(this.element)}
                          `:""}
                </div>
            </div>
        `}_performPrimaryAction(){"more"==this._primaryAction&&this._fireNavigateEvent(this.element),"play"==this._primaryAction&&this._play(this.element)}_renderMoreButton(t){return t.can_expand?B`
            <button
                class="icon-btn"
                @click=${e=>{e.stopPropagation(),this._fireNavigateEvent(t)}}
            >
                ${gt}
            </button>
        `:B``}_renderPlayButton(t){return t.can_play?B`
            <button
                class="icon-btn"
                @click=${e=>{e.stopPropagation(),this._play(t)}}
            >
                ${St}
            </button>
        `:B``}_renderRadioButton(t){if("track"==t.media_content_type){const e="track"==t.media_content_type?t.media_content_id:this.entity.attributes.videoId;return B`
                <button
                    class="icon-btn"
                    @click=${t=>{t.stopPropagation(),this._startRadio(e)}}
                >
                    ${ft}
                </button>
            `}return j}_renderThumbnail(t){return""==t.thumbnail?B`<div class="empty-thumbnail thumbnail">
                <ha-icon icon="mdi:music-box"></ha-icon>
            </div>`:B`<img class="thumbnail" src="${t.thumbnail}" />`}async _fireNavigateEvent(t){this.dispatchEvent(new CustomEvent("navigate",{detail:{action:t}}))}async _startRadio(t){this.hass.callService("media_player","shuffle_set",{entity_id:this.entity.entity_id,shuffle:!1}),this.hass.callService("media_player","play_media",{entity_id:this.entity.entity_id,media_content_id:t,media_content_type:"vid_channel"})}async _play(t){"PLAYLIST_GOTO_TRACK"!=t.media_content_type?pt.includes(t.media_class)&&this.hass.callService("media_player","play_media",{entity_id:this.entity.entity_id,media_content_id:t.media_content_id,media_content_type:t.media_content_type}):this.hass.callService("ytube_music_player","call_method",{entity_id:this.entity.entity_id,command:"goto_track",parameters:t.media_content_id})}static get styles(){return[o`
                :host {
                }

                .grid-item {
                    position: relative;
                    display: grid;
                    aspect-ratio: 1 / 1;
                    cursor: pointer;
                    border-radius: 5px;
                    overflow: hidden;
                }

                .grid-item:focus {
                    outline: dotted thin;
                }

                .title {
                    position: absolute;
                    z-index: 2;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    padding: 4px 8px;
                    background-color: color-mix(
                        in srgb,
                        var(--primary-color) 50%,
                        #000000aa
                    );
                    font-size: 12px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    color: #ffffff;
                }

                .actions {
                    position: absolute;
                    display: grid;
                    align-items: center;
                    grid-template-columns: auto;
                    top: 4px;
                    right: 4px;
                    background: rgba(0, 0, 0, 0.25);
                    border-radius: 9999px;
                }

                .thumbnail {
                    width: 100%;
                    height: 100%;
                }

                .empty-thumbnail {
                    display: flex;
                    background-color: rgba(111, 111, 111, 0.2);
                    align-items: center;
                    justify-content: center;
                }

                .icon-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 6px;
                    border-radius: 50%;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: #ffffff;
                }

                .icon-btn:hover {
                    background: rgba(255, 255, 255, 0.2);
                }

                .icon-btn svg {
                    width: 18px;
                    height: 18px;
                    fill: currentColor;
                }
            `]}};t([dt()],Pt.prototype,"entity",void 0),t([dt()],Pt.prototype,"hass",void 0),t([dt()],Pt.prototype,"element",void 0),t([dt()],Pt.prototype,"current",void 0),Pt=t([nt("polr-ytube-grid-item")],Pt);let Rt=class extends st{constructor(){super(...arguments),this.columns=1,this.grid=!1}render(){if(4==this.state)return B`<div class="loading">Loading...</div>`;if(8==this.state)return B`<div class="empty">No results</div>`;if(16==this.state)return B`<div class="error">Unknown Error</div>`;if(2==this.state){if(0==this.elements.length)return B``;let t;return t=this.grid?this.elements.map((t=>B`
                        <polr-ytube-grid-item
                            .hass=${this.hass}
                            .entity=${this.entity}
                            .element=${t}
                            .current=${this._is_current(t)}
                            @navigate=${t=>this._fireNavigateEvent(t.detail.action)}
                        ></polr-ytube-grid-item>
                    `)):this.elements.map((t=>B`
                        <polr-ytube-list-item
                            .hass=${this.hass}
                            .entity=${this.entity}
                            .element=${t}
                            .current=${this._is_current(t)}
                            @navigate=${t=>this._fireNavigateEvent(t.detail.action)}
                        ></polr-ytube-list-item>
                    `)),B`
                <div
                    class="container"
                    style="--polr-ytube-list-columns: ${this.columns}"
                >
                    ${t}
                </div>
            `}}_is_current(t){return null!=this.entity&&(("number"==typeof(e=t.media_content_id)||"string"==typeof e&&""!==e.trim())&&!isNaN(e)&&("current_track"in this.entity.attributes&&parseInt(t.media_content_id)-1==this.entity.attributes.current_track));var e}async _fireNavigateEvent(t){this.dispatchEvent(new CustomEvent("navigate",{detail:{action:t}}))}static get styles(){return[o`
                .container {
                    display: grid;
                    grid-template-columns: repeat(
                        var(--polr-ytube-list-columns, 1),
                        minmax(0, 1fr)
                    );
                    gap: 8px;
                    --mdc-list-item-graphic-size: 40px;
                }

                .empty,
                .loading,
                .error {
                    display: grid;
                    align-items: center;
                    justify-items: center;
                    height: 100px;
                    color: var(--primary-text-color, #ffffff);
                }
            `]}};t([dt()],Rt.prototype,"entity",void 0),t([dt()],Rt.prototype,"hass",void 0),t([dt()],Rt.prototype,"elements",void 0),t([dt()],Rt.prototype,"state",void 0),t([lt()],Rt.prototype,"columns",void 0),t([lt()],Rt.prototype,"grid",void 0),Rt=t([nt("polr-ytube-list")],Rt);let Mt=class extends st{constructor(){super(...arguments),this.hideSearch=!1,this._browseHistory=[],this._previousBrowseHistory=[]}updated(t){t.has("initialAction")&&(this._browseHistory=[],this._previousBrowseHistory=[],this._browse(this.initialAction))}firstUpdated(t){this._polrYTubeList=this.renderRoot.querySelector("polr-ytube-list"),this._searchTextField=this.renderRoot.querySelector("#query")}render(){return B`
            <div class="container">
                ${this._renderSearch()} ${this._renderNavigation()}
                ${this._renderPlay()}
                <polr-ytube-list
                    .hass=${this.hass}
                    .entity=${this.entity}
                    @navigate=${t=>this._browse(t.detail.action)}
                    .grid=${this.coverNavigation}
                    columns=${this.coverNavigation?"3":"1"}
                ></polr-ytube-list>
            </div>
        `}_renderSearch(){return this.hideSearch?j:B`
            <div class="search">
                <div class="search-input-wrap">
                    <ha-icon icon="mdi:magnify" class="search-icon"></ha-icon>
                    <input
                        type="search"
                        id="query"
                        placeholder="Search..."
                        @keyup="${this._handleSearchInput}"
                    />
                </div>
                <select id="filter" @change=${this._search}>
                    <option value="all">All</option>
                    <option value="artists">Artists</option>
                    <option value="songs" selected>Songs</option>
                    <option value="playlists">Playlists</option>
                </select>
            </div>
        `}loadElement(t){this._browseHistory=[],this._isSearchResults=!1,this._browse(t)}async searchExternal(t){var e;if(!t||""===t)return;const i={entity_id:null===(e=this.entity)||void 0===e?void 0:e.entity_id,query:t,limit:40};await this.hass.callService("ytube_music_player","search",i),this._fetchSearchResults()}async _browse(t){var e;if(this._polrYTubeList.state=4,this._browseHistory.push(t),(null===(e=t.children)||void 0===e?void 0:e.length)>0)this._polrYTubeList.elements=t.children,this._polrYTubeList.state=2;else try{const e={type:"media_player/browse_media",entity_id:this.entity.entity_id};null!=t.media_content_type&&(e.media_content_type=t.media_content_type),null!=t.media_content_id&&(e.media_content_id=t.media_content_id);const i=await this.hass.callWS(e);this._polrYTubeList.elements=i.children,this._polrYTubeList.state=2}catch(e){this._polrYTubeList.state=16,console.error(e,t.media_content_type,t.media_content_id)}this.requestUpdate()}async _fetchSearchResults(){var t,e;this._polrYTubeList.state=4;try{let i=await this.hass.callWS({type:"media_player/browse_media",entity_id:null===(t=this.entity)||void 0===t?void 0:t.entity_id,media_content_type:"search",media_content_id:""});(null===(e=i.children)||void 0===e?void 0:e.length)>0?(i.children.filter((t=>!t.media_content_id.startsWith("MPSP"))),this._isSearchResults||(this._previousBrowseHistory=this._browseHistory),this._isSearchResults=!0,this._browseHistory=[],this._browse(i),this.requestUpdate()):this._polrYTubeList.state=8}catch(t){this._polrYTubeList.state=16,console.error(t)}}_renderNavigation(){if(this._browseHistory.length<=1&&!this._isSearchResults)return B``;let t;t=this._browseHistory.length>2?[this._browseHistory[0].title,"...",this._browseHistory[this._browseHistory.length-1].title]:this._browseHistory.map((t=>t.title));let e=B`
            ${
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function*(t,e){const i="function"==typeof e;if(void 0!==t){let s=-1;for(const r of t)s>-1&&(yield i?e(s):e),s++,yield r}}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */(function*(t,e){if(void 0!==t){let i=0;for(const s of t)yield e(s,i++)}}(t,(t=>B`<span class="crumb">${t}</span>`)),B`<span class="separator">/</span>`)}
        `;return B`
            <div class="navigation-row">
                ${this._isSearchResults?B`
                          <button
                              class="icon-btn"
                              @click=${()=>{this._isSearchResults=!1,this._browseHistory=this._previousBrowseHistory,this._searchTextField.value="",this._browse(this._browseHistory.pop())}}
                          >
                              ${mt}
                          </button>
                      `:j}
                ${this._browseHistory.length>1?B`
                          <button
                              class="icon-btn"
                              @click=${()=>this._browse(this._browseHistory.pop()&&this._browseHistory.pop())}
                          >
                              ${yt}
                          </button>
                      `:j}
                ${this._browseHistory.length>1||this._isSearchResults?B`<div class="breadcrumb">${e}</div>`:j}
            </div>
        `}_renderPlay(){const t=this._browseHistory[this._browseHistory.length-1];if(null==t?void 0:t.can_play)return B`
                <div class="playable_result">
                    ${t.title}
                    <button
                        class="play-btn"
                        @click=${()=>this.hass.callService("media_player","play_media",{entity_id:this.entity.entity_id,media_content_id:t.media_content_id,media_content_type:t.media_content_type})}
                    >
                        Play
                    </button>
                </div>
            `}_handleSearchInput(t){13==t.keyCode&&(this._search(),this._searchTextField.blur())}async _search(){var t,e,i,s;const r=null===(t=this.shadowRoot.querySelector("#query"))||void 0===t?void 0:t.value,n=null===(e=this.renderRoot.querySelector("#filter"))||void 0===e?void 0:e.value;if(!r||""==r)return;let o;o="all"==n?{entity_id:null===(i=this.entity)||void 0===i?void 0:i.entity_id,query:r,limit:40}:{entity_id:null===(s=this.entity)||void 0===s?void 0:s.entity_id,query:r,filter:n,limit:40},await this.hass.callService("ytube_music_player","search",o),this._fetchSearchResults()}static get styles(){return[o`
                .container {
                    display: flex;
                    overflow: auto;
                    flex-grow: 1;
                    flex-direction: column;
                    gap: 8px;
                }

                .navigation-row {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    justify-content: flex-start;
                }

                .breadcrumb {
                    display: flex;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    align-items: center;
                    margin-left: 4px;
                }

                .crumb {
                    background-color: rgba(111, 111, 111, 0.2);
                    padding: 4px 8px;
                    border-radius: 4px;
                    text-transform: uppercase;
                    font-size: 10px;
                    font-weight: bold;
                }

                .separator {
                    font-weight: bold;
                    padding: 4px;
                }

                .search {
                    display: grid;
                    grid-template-columns: 1fr 120px;
                    align-items: center;
                    gap: 4px;
                }

                .search-input-wrap {
                    display: flex;
                    align-items: center;
                    background: rgba(var(--rgb-primary-text-color), 0.06);
                    border-radius: 4px;
                    padding: 0 8px;
                    height: 42px;
                    gap: 4px;
                }

                .search-input-wrap input {
                    flex: 1;
                    background: none;
                    border: none;
                    outline: none;
                    color: var(--primary-text-color);
                    font-size: 14px;
                    height: 100%;
                }

                .search-input-wrap ha-icon {
                    --mdc-icon-size: 18px;
                    opacity: 0.6;
                }

                select {
                    height: 42px;
                    background: rgba(var(--rgb-primary-text-color), 0.06);
                    border: none;
                    border-radius: 4px;
                    color: var(--primary-text-color);
                    font-size: 14px;
                    padding: 0 8px;
                    cursor: pointer;
                    outline: none;
                    width: 100%;
                }

                .playable_result {
                    display: inline-flex;
                    justify-content: space-between;
                    align-items: center;
                }

                polr-ytube-list {
                    overflow: auto;
                }

                .icon-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 6px;
                    border-radius: 50%;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--primary-text-color);
                    width: 30px;
                    height: 30px;
                }

                .icon-btn:hover {
                    background: rgba(var(--rgb-primary-text-color), 0.08);
                }

                .icon-btn svg {
                    width: 20px;
                    height: 20px;
                    fill: currentColor;
                }

                .play-btn {
                    background: var(--primary-color);
                    color: var(--text-primary-color);
                    border: none;
                    border-radius: 4px;
                    padding: 6px 16px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: bold;
                }

                .play-btn:hover {
                    opacity: 0.9;
                }
            `]}};t([dt()],Mt.prototype,"entity",void 0),t([dt()],Mt.prototype,"hass",void 0),t([lt()],Mt.prototype,"initialAction",void 0),t([lt()],Mt.prototype,"coverNavigation",void 0),t([lt({type:Boolean})],Mt.prototype,"hideSearch",void 0),t([dt()],Mt.prototype,"initialElements",void 0),t([dt()],Mt.prototype,"_browseHistory",void 0),t([dt()],Mt.prototype,"_previousBrowseHistory",void 0),t([dt()],Mt.prototype,"_polrYTubeList",void 0),t([dt()],Mt.prototype,"_searchTextField",void 0),t([dt()],Mt.prototype,"_isSearchResults",void 0),Mt=t([nt("polr-ytube-browser")],Mt);let Tt=class extends st{constructor(){super(),this._elements=[],this._limit=25}firstUpdated(t){this._polrYTubeBrowser=this.renderRoot.querySelector("polr-ytube-browser"),this._searchTextField=this.renderRoot.querySelector("#query")}_renderResults(){return B`
            <polr-ytube-browser
                .hass=${this._hass}
                .entity=${this._entity}
                .initialAction=${this.initialAction}
            ></polr-ytube-browser>
        `}render(){return B`
            <div class="content">
                <div class="search">
                    <input
                        type="search"
                        id="query"
                        placeholder="Search..."
                        @keyup="${this.handleKey}"
                    />
                    <select id="filter">
                        <option value="all">All</option>
                        <option value="artists">Artists</option>
                        <option value="songs" selected>Songs</option>
                        <option value="playlists">Playlists</option>
                    </select>
                </div>
                <div class="results">${this._renderResults()}</div>
            </div>
        `}async _fetchResults(){var t,e;try{let i=await this._hass.callWS({type:"media_player/browse_media",entity_id:null===(t=this._entity)||void 0===t?void 0:t.entity_id,media_content_type:"search",media_content_id:""});(null===(e=i.children)||void 0===e?void 0:e.length)>0&&(i.children.filter((t=>!t.media_content_id.startsWith("MPSP"))),this._elements=i,this._polrYTubeBrowser.loadElement(i),this.requestUpdate())}catch(t){console.error(t)}}handleKey(t){13==t.keyCode&&(this._search(),this._searchTextField.blur())}async _search(){var t,e;const i=this.shadowRoot.querySelector("#query").value,s=this.renderRoot.querySelector("#filter").value;let r;r="all"==s?{entity_id:null===(t=this._entity)||void 0===t?void 0:t.entity_id,query:i,limit:this._limit}:{entity_id:null===(e=this._entity)||void 0===e?void 0:e.entity_id,query:i,filter:s,limit:this._limit},await this._hass.callService("ytube_music_player","search",r),this._fetchResults()}};Tt.styles=o`
        .search {
            display: grid;
            grid-template-columns: 1fr min-content;
            align-items: center;
            gap: 4px;
            margin-bottom: 8px;
        }

        input[type="search"] {
            height: 42px;
            background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.06);
            border: none;
            border-radius: 4px;
            color: var(--primary-text-color);
            font-size: 14px;
            padding: 0 12px;
            outline: none;
            width: 100%;
            box-sizing: border-box;
        }

        select {
            height: 42px;
            background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.06);
            border: none;
            border-radius: 4px;
            color: var(--primary-text-color);
            font-size: 14px;
            padding: 0 8px;
            cursor: pointer;
            outline: none;
        }
    `,t([dt()],Tt.prototype,"_hass",void 0),t([dt()],Tt.prototype,"_entity",void 0),t([dt()],Tt.prototype,"_limit",void 0),t([dt()],Tt.prototype,"_polrYTubeBrowser",void 0),t([dt()],Tt.prototype,"_elements",void 0),t([dt()],Tt.prototype,"_searchTextField",void 0),t([dt()],Tt.prototype,"initialAction",void 0),Tt=t([nt("polr-ytube-search")],Tt);class Nt extends st{constructor(){super(...arguments),this._config={},this._runOnce=!1}static getConfigElement(){}static getStubConfig(){return{}}setConfig(t){if(!t.entity_id)throw new Error("entity_id must be specified");this._config=structuredClone(t),"header"in this._config||(this._config.header="YouTube Music Search"),"showHeader"in this._config||(this._config.showHeader=!1),"icon"in this._config||(this._config.searchTitle="mdi:speaker")}set hass(t){this._runOnce||(this._hass=t,this._entity=structuredClone(this._hass.states[this._config.entity_id]),this._runOnce=!0)}render(){const t=this._config.showHeader?B`
                  <div class="header">
                      <div class="icon-container">
                          <ha-icon icon="${this._config.icon}"></ha-icon>
                      </div>
                      <div class="info-container">
                          <div class="primary">${this._config.header}</div>
                      </div>
                  </div>
              `:B``;return B`
            <ha-card>
                ${t}
                <div class="content">
                    <polr-ytube-search
                        ._hass=${this._hass}
                        ._entity=${this._entity}>
                    </polr-ytube-search>
                </div>
            </ha-card>
        `}}Nt.styles=o`
        ha-card {
            overflow: hidden;
        }

        .header {
            display: grid;
            height: 40px;
            padding: 12px 12px 0 12px;
            grid-template-columns: min-content auto 40px;
            gap: 4px;
        }

        .icon-container {
            display: flex;
            height: 40px;
            width: 40px;
            border-radius: 50%;
            background: rgba(111, 111, 111, 0.2);
            place-content: center;
            align-items: center;
            margin-right: 12px;
        }

        .info-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .primary {
            font-weight: bold;
        }

        .action-container {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }

        .content {
            padding: 12px 12px 12px 12px;
        }
    `,t([lt()],Nt.prototype,"_config",void 0),t([lt()],Nt.prototype,"_hass",void 0),t([dt()],Nt.prototype,"_entity",void 0),t([dt()],Nt.prototype,"_runOnce",void 0),customElements.define("polr-ytube-search-card",Nt),window.customCards=window.customCards||[],window.customCards.push({type:"polr-ytube-search-card",name:"PoLR YouTube Search",description:"Requires the ytube_media_player integration"});let Vt=class extends st{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.step=1}render(){return B`<ha-slider
            min=${this.min}
            max=${this.max}
            step=${this.step}
            .value=${this.value}
            @change=${t=>{this.value=t.target.value,this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}
        ></ha-slider>`}};Vt.styles=o`
        :host {
            display: contents;
        }
        ha-slider {
            width: 100%;
        }
    `,t([lt({type:Number})],Vt.prototype,"value",void 0),t([lt({type:Number})],Vt.prototype,"min",void 0),t([lt({type:Number})],Vt.prototype,"max",void 0),t([lt({type:Number})],Vt.prototype,"step",void 0),Vt=t([nt("polr-slider")],Vt);let Ot=class extends st{async connectedCallback(){super.connectedCallback(),this._trackProgress()}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.tracker),this.tracker=null}firstUpdated(t){var e,i;this.volumeSlider=this.renderRoot.querySelector("#volume"),this.volumeSlider&&(this.volumeSlider.value=100*(null===(i=null===(e=this.entity)||void 0===e?void 0:e.attributes)||void 0===i?void 0:i.volume_level)),this.progressSlider=this.renderRoot.querySelector("#progressSlider")}render(){var t,e;return B`
            <div class="volume-row">
                <button class="icon-btn" @click=${this._toggleMute}>
                    ${(null===(e=null===(t=this.entity)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.is_volume_muted)?Et:Lt}
                </button>
                <polr-slider
                    id="volume"
                    min="0"
                    max="100"
                    step="1"
                    @change=${this._changeVolume}
                ></polr-slider>
            </div>
            <div class="action-row">
                ${this._renderLikeButton()} ${this._renderRadioButton()}
            </div>
            <div class="progress-row">${this._renderProgress()}</div>
            <div class="control-row">
                ${this._renderShuffle()} ${this._renderPrevious()}
                ${this._renderPlayPause()} ${this._renderNext()}
                ${this._renderRepeat()}
            </div>
        `}_renderLikeButton(){var t,e,i;return"likeStatus"in(null===(t=this.entity)||void 0===t?void 0:t.attributes)?B`
            <button class="icon-btn" @click=${()=>this._likeSong()}>
                ${"LIKE"==(null===(i=null===(e=this.entity)||void 0===e?void 0:e.attributes)||void 0===i?void 0:i.likeStatus)?kt:Ct}
            </button>
        `:B``}_renderNext(){return B`
            <button class="icon-btn" @click=${this._skipNext}>
                ${$t}
            </button>
        `}_renderPlayPause(){return B`
            <button class="icon-btn playPause" @click=${this._togglePlayPause}>
                ${"playing"==this.entity.state?At:St}
            </button>
        `}_renderPrevious(){return B`
            <button class="icon-btn" @click=${this._skipPrevious}>
                ${wt}
            </button>
        `}_renderProgress(){var t,e,i,s,r;let n=ut(null===(e=null===(t=this.entity)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.media_duration);return B`
            <div class="time">
                <span>${this.progressTime}</span>
                <polr-slider
                    id="progressSlider"
                    min="0"
                    step="1"
                    max=${Math.round(null!==(r=null===(s=null===(i=this.entity)||void 0===i?void 0:i.attributes)||void 0===s?void 0:s.media_duration)&&void 0!==r?r:0)}
                    @change=${this._seekProgress}
                ></polr-slider>
                <span>${n}</span>
            </div>
        `}_renderRadioButton(){return B`
            <button class="icon-btn" @click=${this._startRadio}>
                ${ft}
            </button>
        `}_renderRepeat(){return B`
            <button class="icon-btn" @click=${this._changeRepeat}>
                ${bt}
            </button>
        `}_renderShuffle(){return B`
            <button class="icon-btn" @click=${this._shuffleList}>
                ${xt}
            </button>
        `}async _changeRepeat(){var t,e;let i;switch(null===(e=null===(t=this.entity)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.repeat){case"off":i="one";break;case"one":i="all";break;case"all":i="off"}this.hass.callService("media_player","repeat_set",{entity_id:this.entity.entity_id,repeat:i})}async _changeVolume(){this.hass.callService("media_player","volume_set",{entity_id:this.entity.entity_id,volume_level:this.volumeSlider.value/100})}async _likeSong(){var t;await this.hass.callService("ytube_music_player","rate_track",{entity_id:null===(t=this.entity)||void 0===t?void 0:t.entity_id,rating:"thumb_toggle_up_middle"}),this.requestUpdate()}async _seekProgress(){let t=this.renderRoot.querySelector("#progressSlider");this.hass.callService("media_player","media_seek",{entity_id:this.entity.entity_id,seek_position:t.value})}async _shuffleList(){var t,e;const i=null===(e=null===(t=this.entity)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.shuffle;this.hass.callService("media_player","shuffle_set",{entity_id:this.entity.entity_id,shuffle:!i})}async _skipNext(){this.hass.callService("media_player","media_next_track",{entity_id:this.entity.entity_id})}async _startRadio(){var t,e;await this.hass.callService("media_player","shuffle_set",{entity_id:this.entity.entity_id,shuffle:!1}),this.hass.callService("media_player","play_media",{entity_id:this.entity.entity_id,media_content_id:null===(e=null===(t=this.entity)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.videoId,media_content_type:"vid_channel"})}async _toggleMute(){var t,e;this.hass.callService("media_player","volume_mute",{entity_id:this.entity.entity_id,is_volume_muted:!(null===(e=null===(t=this.entity)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.is_volume_muted)})}async _trackProgress(){var t,e,i,s,r,n;let o=Date.now(),a=Date.parse(null===(e=null===(t=this.entity)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.media_position_updated_at),l=(null===(s=null===(i=this.entity)||void 0===i?void 0:i.attributes)||void 0===s?void 0:s.media_position)+(o-a)/1e3;null!=this.progressSlider&&null!=(null===(n=null===(r=this.entity)||void 0===r?void 0:r.attributes)||void 0===n?void 0:n.media_position)&&(this.progressSlider.value=Math.round(l),this.progressTime=ut(l)),this.tracker||(this.tracker=setInterval((()=>this._trackProgress()),1e3))}async _skipPrevious(){this.hass.callService("media_player","media_previous_track",{entity_id:this.entity.entity_id})}async _togglePlayPause(){this.hass.callService("media_player","media_play_pause",{entity_id:this.entity.entity_id})}static get styles(){return[o`
                :host {
                    display: grid;
                    gap: 4px;
                }

                .icon-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 8px;
                    border-radius: 50%;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--primary-text-color);
                }

                .icon-btn:hover {
                    background: rgba(var(--rgb-primary-text-color), 0.08);
                }

                .icon-btn svg {
                    width: 24px;
                    height: 24px;
                    fill: currentColor;
                }

                .volume-row {
                    display: grid;
                    grid-template-columns: min-content 1fr;
                    align-items: center;
                    padding: 0 4px;
                }

                .action-row {
                    display: grid;
                    grid-template-columns: min-content min-content;
                    justify-content: space-evenly;
                }

                .progress-row {
                    display: grid;
                    grid-template-columns: 1fr;
                }

                .control-row {
                    display: grid;
                    grid-template-columns: min-content min-content min-content min-content min-content;
                    align-items: center;
                    justify-content: space-evenly;
                }

                .playPause svg {
                    width: 48px;
                    height: 48px;
                }

                .playPause {
                    padding: 8px;
                }

                .time {
                    display: grid;
                    grid-template-columns: min-content 1fr min-content;
                    align-items: center;
                }

                #volume {
                    --md-sys-color-primary: var(--primary-color);
                }

                #progressSlider {
                    --md-sys-color-primary: var(--primary-color);
                }
            `]}};t([lt()],Ot.prototype,"hass",void 0),t([lt()],Ot.prototype,"entity",void 0),t([lt()],Ot.prototype,"progressTime",void 0),Ot=t([nt("polr-media-control")],Ot);const Bt=[{label:"Per te",source:"root",titleKey:"home"},{label:"Scelte rapide",source:"home",titleKey:"scelte"},{label:"Dalla community",source:"home",titleKey:"community"},{label:"Radio per te",source:"home",titleKey:"radio"},{label:"Playlist",source:"root",titleKey:"playlist"},{label:"Recenti",source:"root",titleKey:"last played"}],Ut=B`
    <svg viewBox="0 0 24 24" class="yt-icon" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FF0000" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
    </svg>
`;class jt extends st{constructor(){super(...arguments),this._config={},this._menuOpen=!1,this._playerExpanded=!1,this._activeFilter=0,this._searchActive=!1,this._rootItems=[],this._homeItems=[],this._rootLoaded=!1}static getConfigElement(){}static getStubConfig(){return{entity_id:"media_player.ytube_music_player",header:"YouTube Music"}}setConfig(t){if(!t.entity_id)throw new Error("entity_id must be specified");this._config=structuredClone(t),"header"in this._config||(this._config.header="YouTube Music"),"initialAction"in this._config||(this._config.initialAction=new ht,this._config.initialAction.title="Per te",this._config.initialAction.media_content_type=null,this._config.initialAction.media_content_id=null),"coverNavigation"in this._config||(this._config.coverNavigation=!0)}set hass(t){this._hass=t;const e=this._hass.states[this._config.entity_id];vt(this._entity,e,[])||(this._entity=structuredClone(e))}updated(t){super.updated(t),t.has("_entity")&&this._entity&&!this._rootLoaded&&(this._rootLoaded=!0,this._loadRoot())}async _loadRoot(){try{const t=await this._hass.callWS({type:"media_player/browse_media",entity_id:this._config.entity_id});this._rootItems=((null==t?void 0:t.children)||[]).filter((t=>{var e;return!(null===(e=t.media_content_id)||void 0===e?void 0:e.startsWith("MPSP"))})),console.log("[YTube] root items:",this._rootItems.map((t=>`${t.title} [${t.media_content_type}]`)));const e=this._rootItems.find((t=>{var e;return"home"===(null===(e=t.title)||void 0===e?void 0:e.toLowerCase())}))||this._rootItems[0];if(e)try{const t=await this._hass.callWS({type:"media_player/browse_media",entity_id:this._config.entity_id,media_content_type:e.media_content_type,media_content_id:e.media_content_id});this._homeItems=((null==t?void 0:t.children)||[]).filter((t=>{var e;return!(null===(e=t.media_content_id)||void 0===e?void 0:e.startsWith("MPSP"))}))}catch(t){console.error("YTube: failed to load home sections",t)}await this.updateComplete,this._navigateToFilter(this._activeFilter)}catch(t){console.error("YTube: failed to load root items",t)}}_navigateToFilter(t){if(!this._browser||0===this._rootItems.length)return;const e=Bt[t],i="home"===e.source?this._homeItems:this._rootItems;let s=i.find((t=>(t=>{var e;return null!==(e=null==t?void 0:t.toLowerCase())&&void 0!==e?e:""})(t.title).includes(e.titleKey)));s||0!==t||(s=this._rootItems[0]),s&&this._browser.loadElement(s)}_onPillsWheel(t){0!==t.deltaY&&(t.preventDefault(),t.currentTarget.scrollLeft+=t.deltaY)}render(){var t;return B`
            <ha-card>
                ${this._searchActive?this._renderSearchHeader():this._renderHeader()}
                <div class="pills-container" @wheel=${this._onPillsWheel}>
                    <div class="pills-row">
                        ${Bt.map(((t,e)=>B`
                            <button
                                class="pill ${this._activeFilter===e?"active":""}"
                                @click=${()=>this._selectFilter(e,t)}
                            >${t.label}</button>
                        `))}
                    </div>
                </div>
                <div class="content-area">
                    <polr-ytube-browser
                        .hass=${this._hass}
                        .entity=${this._entity}
                        .initialAction=${this._config.initialAction}
                        .coverNavigation=${this._config.coverNavigation}
                        .hideSearch=${!0}
                    ></polr-ytube-browser>
                </div>
                ${"off"!==(null===(t=this._entity)||void 0===t?void 0:t.state)?this._renderMiniPlayer():j}
                ${this._playerExpanded?this._renderFullPlayer():j}
            </ha-card>
        `}_renderHeader(){return B`
            <div class="yt-header">
                <div class="yt-logo">
                    ${Ut}
                    <span class="yt-title">Music</span>
                </div>
                <div class="header-actions">
                    <button class="icon-btn" @click=${()=>{this._searchActive=!0}}>
                        <ha-icon icon="mdi:magnify"></ha-icon>
                    </button>
                    ${this._renderSourceSelector()}
                </div>
            </div>
        `}_renderSearchHeader(){return B`
            <div class="yt-header search-mode">
                <button class="icon-btn" @click=${()=>{this._searchActive=!1}}>
                    <ha-icon icon="mdi:arrow-left"></ha-icon>
                </button>
                <input
                    type="search"
                    class="search-input"
                    id="searchInput"
                    placeholder="Brani, album, artisti..."
                    @keyup=${this._handleSearchKey}
                    autofocus
                />
            </div>
        `}_renderSourceSelector(){var t;if(!this._hass)return B``;let e=[];for(const[i,s]of Object.entries(this._hass.states))if(i.startsWith("media_player")){if(null===(t=null==s?void 0:s.attributes)||void 0===t?void 0:t.remote_player_id)continue;if("speakers"in this._config&&!this._config.speakers.includes(i))continue;e.push([i,s.attributes.friendly_name])}return e.sort(((t,e)=>t[1]<e[1]?-1:1)),B`
            <div class="source-wrap">
                <button class="icon-btn cast-btn" @click=${this._toggleMenu}>
                    ${_t}
                </button>
                ${this._menuOpen?B`
                    <div class="source-menu" @click=${t=>t.stopPropagation()}>
                        ${e.map((t=>{var e,i;return B`
                            <div
                                class="menu-item ${t[0]===(null===(i=null===(e=this._entity)||void 0===e?void 0:e.attributes)||void 0===i?void 0:i.remote_player_id)?"selected":""}"
                                @click=${()=>this._selectSource(t[0])}
                            >${t[1]}</div>
                        `}))}
                    </div>
                `:j}
            </div>
        `}_renderMiniPlayer(){var t,e,i,s,r,n,o,a,l;const d=(null===(e=null===(t=this._entity)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.entity_picture_local)||(null===(s=null===(i=this._entity)||void 0===i?void 0:i.attributes)||void 0===s?void 0:s.entity_picture),c=(null===(n=null===(r=this._entity)||void 0===r?void 0:r.attributes)||void 0===n?void 0:n.media_title)||"Sconosciuto",h=(null===(a=null===(o=this._entity)||void 0===o?void 0:o.attributes)||void 0===a?void 0:a.media_artist)||"",p="playing"===(null===(l=this._entity)||void 0===l?void 0:l.state),u=this._getProgress();return B`
            <div class="mini-player" @click=${()=>{this._playerExpanded=!0}}>
                <div class="mini-progress-bar">
                    <div class="mini-progress-fill" style="width: ${u}%"></div>
                </div>
                ${d?B`<img class="mini-art" src="${d}">`:B`<div class="mini-art-ph"><ha-icon icon="mdi:music"></ha-icon></div>`}
                <div class="mini-info">
                    <div class="mini-title">${c}</div>
                    ${h?B`<div class="mini-artist">${h}</div>`:j}
                </div>
                <button class="mini-btn" @click=${t=>{t.stopPropagation(),this._togglePlayPause()}}>
                    ${p?At:St}
                </button>
                <button class="mini-btn" @click=${t=>{t.stopPropagation(),this._skipNext()}}>
                    ${$t}
                </button>
            </div>
        `}_renderFullPlayer(){var t,e,i,s,r,n,o,a;const l=(null===(e=null===(t=this._entity)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.entity_picture_local)||(null===(s=null===(i=this._entity)||void 0===i?void 0:i.attributes)||void 0===s?void 0:s.entity_picture),d=(null===(n=null===(r=this._entity)||void 0===r?void 0:r.attributes)||void 0===n?void 0:n.media_title)||"Sconosciuto",c=(null===(a=null===(o=this._entity)||void 0===o?void 0:o.attributes)||void 0===a?void 0:a.media_artist)||"";return B`
            <div class="full-player"
                style="${l?`--fp-bg: url('${l}')`:""}">
                <div class="fp-bg-blur"></div>
                <div class="fp-content">
                    <div class="fp-header">
                        <button class="icon-btn" @click=${()=>{this._playerExpanded=!1}}>
                            <ha-icon icon="mdi:chevron-down"></ha-icon>
                        </button>
                        <span class="fp-from">In riproduzione</span>
                        ${this._renderSourceSelector()}
                    </div>
                    <div class="fp-art-wrap">
                        ${l?B`<img class="fp-art" src="${l}">`:B`<div class="fp-art-ph"><ha-icon icon="mdi:music-note" style="--mdc-icon-size:80px"></ha-icon></div>`}
                    </div>
                    <div class="fp-info">
                        <div>
                            <div class="fp-title">${d}</div>
                            <div class="fp-artist">${c}</div>
                        </div>
                    </div>
                    <polr-media-control
                        .hass=${this._hass}
                        .entity=${this._entity}
                    ></polr-media-control>
                </div>
            </div>
        `}_selectFilter(t,e){this._activeFilter=t,this._rootItems.length>0?this._navigateToFilter(t):(this._rootLoaded=!1,this._loadRoot())}_handleSearchKey(t){if(13===t.keyCode){const t=this.renderRoot.querySelector("#searchInput");(null==t?void 0:t.value)&&this._browser&&(this._browser.searchExternal(t.value),this._searchActive=!1)}}_getProgress(){var t,e,i,s;const r=null===(e=null===(t=this._entity)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.media_duration,n=null===(s=null===(i=this._entity)||void 0===i?void 0:i.attributes)||void 0===s?void 0:s.media_position;return r&&null!=n?Math.min(n/r*100,100):0}_toggleMenu(t){t.stopPropagation(),this._menuOpen=!this._menuOpen,this._menuOpen&&document.addEventListener("click",(()=>{this._menuOpen=!1}),{once:!0})}async _selectSource(t){var e,i;const s=null===(i=null===(e=this._entity)||void 0===e?void 0:e.attributes)||void 0===i?void 0:i.remote_player_id;this._menuOpen=!1,""!==t&&t!==s&&this._hass.callService("media_player","select_source",{entity_id:this._config.entity_id,source:t})}async _togglePlayPause(){this._hass.callService("media_player","media_play_pause",{entity_id:this._config.entity_id})}async _skipNext(){this._hass.callService("media_player","media_next_track",{entity_id:this._config.entity_id})}static get styles(){return[o`
            :host {
                --yt-bg: #0f0f0f;
                --yt-surface: #1e1e1e;
                --yt-surface2: #282828;
                --yt-red: #ff0000;
                --yt-text: #ffffff;
                --yt-text2: rgba(255,255,255,0.6);
                --yt-text3: rgba(255,255,255,0.38);
                --yt-pill-bg: rgba(255,255,255,0.08);
                --yt-pill-border: rgba(255,255,255,0.15);
            }

            ha-card {
                background: var(--yt-bg) !important;
                height: 700px;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                position: relative;
                border-radius: 12px;
                color: var(--yt-text);
            }

            /* ── HEADER ── */
            .yt-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px 16px 8px;
                flex-shrink: 0;
                height: 52px;
            }

            .yt-logo {
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .yt-icon {
                width: 28px;
                height: 28px;
            }

            .yt-title {
                font-size: 18px;
                font-weight: 600;
                color: var(--yt-text);
                letter-spacing: 0.3px;
            }

            .header-actions {
                display: flex;
                align-items: center;
                gap: 4px;
            }

            .yt-header.search-mode {
                gap: 8px;
                padding: 8px 16px;
            }

            .search-input {
                flex: 1;
                background: var(--yt-surface);
                border: 1px solid rgba(255,255,255,0.12);
                border-radius: 24px;
                color: var(--yt-text);
                font-size: 15px;
                padding: 8px 16px;
                outline: none;
                height: 36px;
            }

            .search-input::placeholder { color: var(--yt-text3); }

            /* ── FILTER PILLS ── */
            .pills-container {
                padding: 0 16px 10px;
                flex-shrink: 0;
                overflow-x: auto;
                overflow-y: hidden;
                scrollbar-width: none;
                -ms-overflow-style: none;
            }
            .pills-container::-webkit-scrollbar { display: none; }

            .pills-row {
                display: flex;
                gap: 8px;
                padding-bottom: 2px;
            }

            .pill {
                flex-shrink: 0;
                background: var(--yt-pill-bg);
                border: 1px solid var(--yt-pill-border);
                border-radius: 20px;
                color: var(--yt-text);
                font-size: 13px;
                font-weight: 500;
                padding: 6px 14px;
                cursor: pointer;
                white-space: nowrap;
                transition: background 0.15s, border-color 0.15s;
            }

            .pill:hover {
                background: rgba(255,255,255,0.14);
            }

            .pill.active {
                background: var(--yt-text);
                border-color: var(--yt-text);
                color: var(--yt-bg);
            }

            /* ── CONTENT ── */
            .content-area {
                flex: 1;
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }

            polr-ytube-browser {
                flex: 1;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                --primary-text-color: #ffffff;
                --rgb-primary-text-color: 255, 255, 255;
                --primary-color: #ff0000;
                --rgb-primary-color: 255, 0, 0;
                color: #ffffff;
            }

            /* ── MINI PLAYER ── */
            .mini-player {
                position: relative;
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 8px 12px;
                background: var(--yt-surface);
                border-top: 1px solid rgba(255,255,255,0.06);
                cursor: pointer;
                flex-shrink: 0;
                height: 62px;
            }

            .mini-player:hover { background: var(--yt-surface2); }

            .mini-progress-bar {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: rgba(255,255,255,0.15);
            }

            .mini-progress-fill {
                height: 100%;
                background: var(--yt-red);
                transition: width 1s linear;
            }

            .mini-art {
                width: 44px;
                height: 44px;
                border-radius: 4px;
                object-fit: cover;
                flex-shrink: 0;
            }

            .mini-art-ph {
                width: 44px;
                height: 44px;
                border-radius: 4px;
                background: var(--yt-surface2);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                color: var(--yt-text2);
            }

            .mini-info {
                flex: 1;
                min-width: 0;
            }

            .mini-title {
                font-size: 14px;
                font-weight: 500;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: var(--yt-text);
            }

            .mini-artist {
                font-size: 12px;
                color: var(--yt-text2);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .mini-btn {
                background: none;
                border: none;
                cursor: pointer;
                padding: 8px;
                color: var(--yt-text);
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                flex-shrink: 0;
            }

            .mini-btn:hover { background: rgba(255,255,255,0.08); }

            .mini-btn svg {
                width: 22px;
                height: 22px;
                fill: currentColor;
            }

            /* ── FULL PLAYER ── */
            .full-player {
                position: absolute;
                inset: 0;
                z-index: 200;
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }

            .fp-bg-blur {
                position: absolute;
                inset: 0;
                background-color: #0a0a0a;
                background-image: var(--fp-bg);
                background-size: cover;
                background-position: center;
                filter: blur(40px) brightness(0.25) saturate(1.6);
                transform: scale(1.1);
                z-index: 0;
            }

            .fp-content {
                position: relative;
                z-index: 1;
                display: flex;
                flex-direction: column;
                height: 100%;
                padding: 0 20px 16px;
            }

            .fp-header {
                display: flex;
                align-items: center;
                padding: 12px 0 8px;
                gap: 8px;
            }

            .fp-from {
                flex: 1;
                text-align: center;
                font-size: 12px;
                font-weight: 600;
                color: var(--yt-text2);
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .fp-art-wrap {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 16px 0;
                min-height: 0;
            }

            .fp-art {
                max-width: 100%;
                max-height: 100%;
                border-radius: 8px;
                box-shadow: 0 8px 40px rgba(0,0,0,0.6);
                aspect-ratio: 1/1;
                object-fit: cover;
            }

            .fp-art-ph {
                width: 240px;
                height: 240px;
                border-radius: 8px;
                background: var(--yt-surface);
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--yt-text2);
            }

            .fp-info {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 8px 0 4px;
                flex-shrink: 0;
            }

            .fp-title {
                font-size: 20px;
                font-weight: 700;
                color: var(--yt-text);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .fp-artist {
                font-size: 14px;
                color: var(--yt-text2);
                margin-top: 2px;
            }

            /* ── MEDIA CONTROL in full player (force dark-theme colors) ── */
            polr-media-control {
                --primary-text-color: #ffffff;
                --rgb-primary-text-color: 255, 255, 255;
                --primary-color: #ff0000;
                --rgb-primary-color: 255, 0, 0;
            }

            /* ── ICON BUTTONS ── */
            .icon-btn {
                background: none;
                border: none;
                cursor: pointer;
                padding: 8px;
                border-radius: 50%;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                color: var(--yt-text);
                --mdc-icon-size: 22px;
            }

            .icon-btn:hover { background: rgba(255,255,255,0.08); }

            .icon-btn svg {
                width: 22px;
                height: 22px;
                fill: currentColor;
            }

            .cast-btn svg { width: 20px; height: 20px; }

            /* ── SOURCE DROPDOWN ── */
            .source-wrap { position: relative; }

            .source-menu {
                position: absolute;
                top: 100%;
                right: 0;
                z-index: 999;
                background: #2a2a2a;
                border-radius: 8px;
                box-shadow: 0 8px 24px rgba(0,0,0,0.5);
                min-width: 200px;
                max-height: 280px;
                overflow-y: auto;
                border: 1px solid rgba(255,255,255,0.1);
            }

            .menu-item {
                padding: 11px 16px;
                cursor: pointer;
                font-size: 14px;
                color: var(--yt-text);
            }

            .menu-item:hover { background: rgba(255,255,255,0.08); }
            .menu-item.selected { color: var(--yt-red); font-weight: 600; }
        `]}}t([dt()],jt.prototype,"_config",void 0),t([dt()],jt.prototype,"_entity",void 0),t([dt()],jt.prototype,"_menuOpen",void 0),t([dt()],jt.prototype,"_playerExpanded",void 0),t([dt()],jt.prototype,"_activeFilter",void 0),t([dt()],jt.prototype,"_searchActive",void 0),t([
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function(t,e){return(({finisher:t,descriptor:e})=>(i,s)=>{var r;if(void 0===s){const s=null!==(r=i.originalKey)&&void 0!==r?r:i.key,n=null!=e?{kind:"method",placement:"prototype",key:s,descriptor:e(i.key)}:{...i,key:s};return null!=t&&(n.finisher=function(e){t(e,s)}),n}{const r=i.constructor;void 0!==e&&Object.defineProperty(i,s,e(s)),null==t||t(r,s)}})({descriptor:i=>{const s={get(){var e,i;return null!==(i=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(e){const e="symbol"==typeof i?Symbol():"__"+i;s.get=function(){var i,s;return void 0===this[e]&&(this[e]=null!==(s=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(t))&&void 0!==s?s:null),this[e]}}return s}})}("polr-ytube-browser")],jt.prototype,"_browser",void 0),customElements.define("polr-ytube-playing-card",jt),window.customCards=window.customCards||[],window.customCards.push({type:"polr-ytube-playing-card",name:"PoLR YouTube Playing",description:"Requires the ytube_media_player integration"});export{jt as PoLRYTubePlayingCard,Nt as PoLRYTubeSearchCard};
