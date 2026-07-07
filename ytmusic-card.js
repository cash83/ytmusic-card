function t(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=window,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l;const c=window,d=c.trustedTypes,p=d?d.emptyScript:"",h=c.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?p:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_=(t,e)=>e!==t&&(e==e||t==t),v={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:_},y="finalized";let m=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||v}static finalize(){if(this.hasOwnProperty(y))return!1;this[y]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{i?t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):s.forEach(i=>{const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)})})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=v){var s;const o=this.constructor._$Ep(t,i);if(void 0!==o&&!0===i.reflect){const r=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:u).toAttribute(e,i.type);this._$El=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,o=s._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=s.getPropertyOptions(o),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:u;this._$El=o,this[o]=r.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||_)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var f;m[y]=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:m}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.6.3");const g=window,b=g.trustedTypes,x=b?b.createPolicy("lit-html",{createHTML:t=>t}):void 0,w="$lit$",$=`lit$${(Math.random()+"").slice(9)}$`,k="?"+$,A=`<${k}>`,S=document,C=()=>S.createComment(""),q=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,E="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,T=/>/g,R=RegExp(`>|${E}(?:([^\\s"'>=/]+)(${E}*=${E}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,O=/"/g,I=/^(?:script|style|textarea|title)$/i,z=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),N=z(1),B=z(2),V=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),U=new WeakMap,Q=S.createTreeWalker(S,129,null,!1);function Y(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(e):e}const W=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":"",n=M;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===M?"!--"===l[1]?n=L:void 0!==l[1]?n=T:void 0!==l[2]?(I.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=R):void 0!==l[3]&&(n=R):n===R?">"===l[0]?(n=null!=o?o:M,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?R:'"'===l[3]?O:H):n===O||n===H?n=R:n===L||n===T?n=M:(n=R,o=void 0);const p=n===R&&t[e+1].startsWith("/>")?" ":"";r+=n===M?i+A:c>=0?(s.push(a),i.slice(0,c)+w+i.slice(c)+$+p):i+$+(-2===c?(s.push(void 0),e):p)}return[Y(t,r+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class D{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[l,c]=W(t,e);if(this.el=D.createElement(l,i),Q.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=Q.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(w)||e.startsWith($)){const i=c[r++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+w).split($),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?X:"?"===e[1]?tt:"@"===e[1]?et:G})}else a.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(I.test(s.tagName)){const t=s.textContent.split($),e=t.length-1;if(e>0){s.textContent=b?b.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],C()),Q.nextNode(),a.push({type:2,index:++o});s.append(t[e],C())}}}else if(8===s.nodeType)if(s.data===k)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf($,t+1));)a.push({type:7,index:o}),t+=$.length-1}o++}}static createElement(t,e){const i=S.createElement("template");return i.innerHTML=t,i}}function F(t,e,i=t,s){var o,r,n,a;if(e===V)return e;let l=void 0!==s?null===(o=i._$Co)||void 0===o?void 0:o[s]:i._$Cl;const c=q(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(r=null==l?void 0:l._$AO)||void 0===r||r.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,s)),void 0!==s?(null!==(n=(a=i)._$Co)&&void 0!==n?n:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=F(t,l._$AS(t,e.values),l,s)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:S).importNode(i,!0);Q.currentNode=o;let r=Q.nextNode(),n=0,a=0,l=s[0];for(;void 0!==l;){if(n===l.index){let e;2===l.type?e=new Z(r,r.nextSibling,this,t):1===l.type?e=new l.ctor(r,l.name,l.strings,this,t):6===l.type&&(e=new it(r,this,t)),this._$AV.push(e),l=s[++a]}n!==(null==l?void 0:l.index)&&(r=Q.nextNode(),n++)}return Q.currentNode=S,o}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{constructor(t,e,i,s){var o;this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=F(this,t,e),q(t)?t===j||null==t||""===t?(this._$AH!==j&&this._$AR(),this._$AH=j):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>P(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==j&&q(this._$AH)?this._$AA.nextSibling.data=t:this.$(S.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=D.createElement(Y(s.h,s.h[0]),this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(i);else{const t=new K(o,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=U.get(t.strings);return void 0===e&&U.set(t.strings,e=new D(t)),e}T(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Z(this.k(C()),this.k(C()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class G{constructor(t,e,i,s,o){this.type=1,this._$AH=j,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=j}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=F(this,t,e,0),r=!q(t)||t!==this._$AH&&t!==V,r&&(this._$AH=t);else{const s=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=F(this,s[i+n],e,n),a===V&&(a=this._$AH[n]),r||(r=!q(a)||a!==this._$AH[n]),a===j?t=j:t!==j&&(t+=(null!=a?a:"")+o[n+1]),this._$AH[n]=a}r&&!s&&this.j(t)}j(t){t===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class X extends G{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===j?void 0:t}}const J=b?b.emptyScript:"";class tt extends G{constructor(){super(...arguments),this.type=4}j(t){t&&t!==j?this.element.setAttribute(this.name,J):this.element.removeAttribute(this.name)}}class et extends G{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=F(this,t,e,0))&&void 0!==i?i:j)===V)return;const s=this._$AH,o=t===j&&s!==j||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==j&&(s===j||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}}const st=g.litHtmlPolyfillSupport;null==st||st(D,Z),(null!==(f=g.litHtmlVersions)&&void 0!==f?f:g.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ot,rt;class nt extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,o;const r=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let n=r._$litPart$;if(void 0===n){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;r._$litPart$=n=new Z(e.insertBefore(C(),t),t,void 0,null!=i?i:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return V}}nt.finalized=!0,nt._$litElement$=!0,null===(ot=globalThis.litElementHydrateSupport)||void 0===ot||ot.call(globalThis,{LitElement:nt});const at=globalThis.litElementPolyfillSupport;null==at||at({LitElement:nt}),(null!==(rt=globalThis.litElementVersions)&&void 0!==rt?rt:globalThis.litElementVersions=[]).push("3.3.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e),ct=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function dt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):ct(t,e)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return dt({...t,state:!0})}
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
var ht;null===(ht=window.HTMLSlotElement)||void 0===ht||ht.prototype.assignedElements;class ut{}const _t=["track","playlist","tv_show","album"];function vt(t){return null==t?"0:00":new Date(1e3*t).toISOString().substring(14,19)}function yt(t,e,i){if(t===e)return!0;if(Array.isArray(t)&&Array.isArray(e))return t.length===e.length&&t.every((t,s)=>yt(t,e[s],i));if("object"==typeof t&&"object"==typeof e&&null!==t&&null!==e){if(Array.isArray(t)||Array.isArray(e))return!1;const s=Object.keys(t),o=Object.keys(e);if(s.length!==o.length||!s.every(t=>o.includes(t)))return!1;for(let s in t){if(i.includes(s))continue;if(!yt(t[s],e[s],i))return!1}return!0}return!1}const mt=N`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>arrow-left</title>
        <path
            d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
    </svg>
`;N`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
            d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z" />
    </svg>
`;const ft=N`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
            d="M2 11V13C7 13 11 17 11 22H13C13 15.9 8.1 11 2 11M20 2H10C8.9 2 8 2.9 8 4V10.5C9 11 9.9 11.7 10.7 12.4C11.6 11 13.2 10 15 10C17.8 10 20 12.2 20 15S17.8 20 15 20H14.8C14.9 20.7 15 21.3 15 22H20C21.1 22 22 21.1 22 20V4C22 2.9 21.1 2 20 2M15 8C13.9 8 13 7.1 13 6C13 4.9 13.9 4 15 4C16.1 4 17 4.9 17 6S16.1 8 15 8M15 18C14.8 18 14.5 18 14.3 17.9C13.8 16.4 13.1 15.1 12.2 13.9C12.6 12.8 13.7 11.9 15 11.9C16.7 11.9 18 13.2 18 14.9S16.7 18 15 18M2 15V17C4.8 17 7 19.2 7 22H9C9 18.1 5.9 15 2 15M2 19V22H5C5 20.3 3.7 19 2 19" />
    </svg>
`,gt=N`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
    </svg>
`,bt=N`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>forwardburger</title>
        <path
            d="M19,13H3V11H19L15,7L16.4,5.6L22.8,12L16.4,18.4L15,17L19,13M3,6H13V8H3V6M13,16V18H3V16H13Z" />
    </svg>
`,xt=N`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
            d="M12,10A2,2 0 0,1 14,12C14,12.5 13.82,12.94 13.53,13.29L16.7,22H14.57L12,14.93L9.43,22H7.3L10.47,13.29C10.18,12.94 10,12.5 10,12A2,2 0 0,1 12,10M12,8A4,4 0 0,0 8,12C8,12.5 8.1,13 8.28,13.46L7.4,15.86C6.53,14.81 6,13.47 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12C18,13.47 17.47,14.81 16.6,15.86L15.72,13.46C15.9,13 16,12.5 16,12A4,4 0 0,0 12,8M12,4A8,8 0 0,0 4,12C4,14.36 5,16.5 6.64,17.94L5.92,19.94C3.54,18.11 2,15.23 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12C22,15.23 20.46,18.11 18.08,19.94L17.36,17.94C19,16.5 20,14.36 20,12A8,8 0 0,0 12,4Z" />
    </svg>
`,wt=N`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>repeat</title>
        <path
            d="M17,17H7V14L3,18L7,22V19H19V13H17M7,7H17V10L21,6L17,2V5H5V11H7V7Z" />
    </svg>
`,$t=N`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>shuffle-variant</title>
        <path
            d="M17,3L22.25,7.5L17,12L22.25,16.5L17,21V18H14.26L11.44,15.18L13.56,13.06L15.5,15H17V12L17,9H15.5L6.5,18H2V15H5.26L14.26,6H17V3M2,6H6.5L9.32,8.82L7.2,10.94L5.26,9H2V6Z" />
    </svg>
`,kt=N`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>skip-next</title>
        <path d="M16,18H18V6H16M6,18L14.5,12L6,6V18Z" />
    </svg>
`,At=N`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>skip-previous</title>
        <path d="M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z" />
    </svg>
`,St=N`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>pause</title>
        <path d="M14,19H18V5H14M6,19H10V5H6V19Z" />
    </svg>
`,Ct=N`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>play</title>
        <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
    </svg>
`;N`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>thumb-up</title>
        <path
            d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z" />
    </svg>
`,N`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>thumb-up-outline</title>
        <path
            d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z" />
    </svg>
`;const qt=N`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>volume-high</title>
        <path
            d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
    </svg>
`,Pt=N` <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <title>volume-off</title>
    <path
        d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
</svg>`;let Et=class extends nt{constructor(){super(...arguments),this._actions=[],this._hasAdditionalActions=!1}firstUpdated(t){this.element.can_expand?this._primaryAction="more":this._primaryAction="play",this._hasAdditionalActions=this.element.can_expand==this.element.can_play?this.element.can_expand:"track"==this.element.media_content_type,this.requestUpdate()}render(){return N`
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
            ${this._hasAdditionalActions?N`
                      <div class="divider"></div>
                      <div class="actions">
                          ${"more"!=this._primaryAction?this._renderMoreButton(this.element):N``}
                          ${"play"!=this._primaryAction?this._renderPlayButton(this.element):N``}
                          ${this._renderRadioButton(this.element)}
                      </div>
                  `:""}
        `}_performPrimaryAction(){"more"==this._primaryAction&&this._fireNavigateEvent(this.element),"play"==this._primaryAction&&this._play(this.element)}_renderAction(){return"more"==this._primaryAction?N`<span class="meta-icon">${bt}</span>`:"play"==this._primaryAction?N`<ha-icon icon="mdi:play"></ha-icon>`:N``}_renderMoreButton(t){return t.can_expand?N`
            <button
                class="icon-btn"
                @click=${e=>{e.stopPropagation(),this._fireNavigateEvent(t)}}
            >
                ${bt}
            </button>
        `:N``}_renderPlayButton(t){return t.can_play?N`
            <button
                class="icon-btn"
                @click=${e=>{e.stopPropagation(),this._play(t)}}
            >
                ${Ct}
            </button>
        `:N``}_renderRadioButton(t){if("track"==t.media_content_type){const e="track"==t.media_content_type?t.media_content_id:this.entity.attributes.videoId;return N`
                <button
                    class="icon-btn"
                    @click=${t=>{t.stopPropagation(),this._startRadio(e)}}
                >
                    ${xt}
                </button>
            `}return j}_renderThumbnail(t){return""==t.thumbnail?N`<div class="empty-thumbnail thumbnail">
                <ha-icon icon="mdi:music-box"></ha-icon>
            </div>`:N`
            <img class="thumbnail" src="${t.thumbnail}" />
        `}async _fireNavigateEvent(t){this.dispatchEvent(new CustomEvent("navigate",{detail:{action:t}}))}async _startRadio(t){this.hass.callService("media_player","shuffle_set",{entity_id:this.entity.entity_id,shuffle:!1}),this.hass.callService("media_player","play_media",{entity_id:this.entity.entity_id,media_content_id:t,media_content_type:"vid_channel"})}async _play(t){"PLAYLIST_GOTO_TRACK"!=t.media_content_type?_t.includes(t.media_class)&&this.hass.callService("media_player","play_media",{entity_id:this.entity.entity_id,media_content_id:t.media_content_id,media_content_type:t.media_content_type}):this.hass.callService("ytube_music_player","call_method",{entity_id:this.entity.entity_id,command:"goto_track",parameters:t.media_content_id})}static get styles(){return[n`
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
            `]}};t([pt()],Et.prototype,"entity",void 0),t([pt()],Et.prototype,"hass",void 0),t([pt()],Et.prototype,"element",void 0),t([pt()],Et.prototype,"current",void 0),Et=t([lt("ytmusic-list-item")],Et);let Mt=class extends nt{constructor(){super(...arguments),this._actions=[],this._hasAdditionalActions=!1}firstUpdated(t){this.element.can_expand?this._primaryAction="more":this._primaryAction="play",this._hasAdditionalActions=this.element.can_expand==this.element.can_play?this.element.can_expand:"track"==this.element.media_content_type,this.requestUpdate()}render(){return N`
            <div class="grid-item" @click=${this._performPrimaryAction}>
                <div>${this._renderThumbnail(this.element)}</div>
                <span class="title"> ${this.element.title}</span>
                <div class="actions">
                    ${this._hasAdditionalActions?N`
                              ${"more"!=this._primaryAction?this._renderMoreButton(this.element):N``}
                              ${"play"!=this._primaryAction?this._renderPlayButton(this.element):N``}
                              ${this._renderRadioButton(this.element)}
                          `:""}
                </div>
            </div>
        `}_performPrimaryAction(){"more"==this._primaryAction&&this._fireNavigateEvent(this.element),"play"==this._primaryAction&&this._play(this.element)}_renderMoreButton(t){return t.can_expand?N`
            <button
                class="icon-btn"
                @click=${e=>{e.stopPropagation(),this._fireNavigateEvent(t)}}
            >
                ${bt}
            </button>
        `:N``}_renderPlayButton(t){return t.can_play?N`
            <button
                class="icon-btn"
                @click=${e=>{e.stopPropagation(),this._play(t)}}
            >
                ${Ct}
            </button>
        `:N``}_renderRadioButton(t){if("track"==t.media_content_type){const e="track"==t.media_content_type?t.media_content_id:this.entity.attributes.videoId;return N`
                <button
                    class="icon-btn"
                    @click=${t=>{t.stopPropagation(),this._startRadio(e)}}
                >
                    ${xt}
                </button>
            `}return j}_renderThumbnail(t){return""==t.thumbnail?N`<div class="empty-thumbnail thumbnail">
                <ha-icon icon="mdi:music-box"></ha-icon>
            </div>`:N`<img class="thumbnail" src="${t.thumbnail}" />`}async _fireNavigateEvent(t){this.dispatchEvent(new CustomEvent("navigate",{detail:{action:t}}))}async _startRadio(t){this.hass.callService("media_player","shuffle_set",{entity_id:this.entity.entity_id,shuffle:!1}),this.hass.callService("media_player","play_media",{entity_id:this.entity.entity_id,media_content_id:t,media_content_type:"vid_channel"})}async _play(t){"PLAYLIST_GOTO_TRACK"!=t.media_content_type?_t.includes(t.media_class)&&this.hass.callService("media_player","play_media",{entity_id:this.entity.entity_id,media_content_id:t.media_content_id,media_content_type:t.media_content_type}):this.hass.callService("ytube_music_player","call_method",{entity_id:this.entity.entity_id,command:"goto_track",parameters:t.media_content_id})}static get styles(){return[n`
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
            `]}};t([pt()],Mt.prototype,"entity",void 0),t([pt()],Mt.prototype,"hass",void 0),t([pt()],Mt.prototype,"element",void 0),t([pt()],Mt.prototype,"current",void 0),Mt=t([lt("ytmusic-grid-item")],Mt);let Lt=class extends nt{constructor(){super(...arguments),this.columns=1,this.grid=!1}render(){if(4==this.state)return N`<div class="loading">Loading...</div>`;if(8==this.state)return N`<div class="empty">No results</div>`;if(16==this.state)return N`<div class="error">Unknown Error</div>`;if(2==this.state){if(0==this.elements.length)return N``;let t;return t=this.grid?this.elements.map(t=>N`
                        <ytmusic-grid-item
                            .hass=${this.hass}
                            .entity=${this.entity}
                            .element=${t}
                            .current=${this._is_current(t)}
                            @navigate=${t=>this._fireNavigateEvent(t.detail.action)}
                        ></ytmusic-grid-item>
                    `):this.elements.map(t=>N`
                        <ytmusic-list-item
                            .hass=${this.hass}
                            .entity=${this.entity}
                            .element=${t}
                            .current=${this._is_current(t)}
                            @navigate=${t=>this._fireNavigateEvent(t.detail.action)}
                        ></ytmusic-list-item>
                    `),N`
                <div
                    class="container"
                    style="--ytmusic-list-columns: ${this.columns}"
                >
                    ${t}
                </div>
            `}}_is_current(t){return null!=this.entity&&(("number"==typeof(e=t.media_content_id)||"string"==typeof e&&""!==e.trim())&&!isNaN(e)&&("current_track"in this.entity.attributes&&parseInt(t.media_content_id)-1==this.entity.attributes.current_track));var e}async _fireNavigateEvent(t){this.dispatchEvent(new CustomEvent("navigate",{detail:{action:t}}))}static get styles(){return[n`
                .container {
                    display: grid;
                    grid-template-columns: repeat(
                        var(--ytmusic-list-columns, 1),
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
            `]}};t([pt()],Lt.prototype,"entity",void 0),t([pt()],Lt.prototype,"hass",void 0),t([pt()],Lt.prototype,"elements",void 0),t([pt()],Lt.prototype,"state",void 0),t([dt()],Lt.prototype,"columns",void 0),t([dt()],Lt.prototype,"grid",void 0),Lt=t([lt("ytmusic-list")],Lt);let Tt=class extends nt{constructor(){super(...arguments),this.hideSearch=!1,this._browseHistory=[],this._previousBrowseHistory=[]}updated(t){t.has("initialAction")?(this._browseHistory=[],this._previousBrowseHistory=[],this._browse(this.initialAction)):t.has("entity")&&this.entity&&this.initialAction&&0===this._browseHistory.length&&this._browse(this.initialAction)}firstUpdated(t){this._polrYTubeList=this.renderRoot.querySelector("ytmusic-list"),this._searchTextField=this.renderRoot.querySelector("#query")}render(){return N`
            <div class="container">
                ${this._renderSearch()} ${this._renderNavigation()}
                ${this._renderPlay()}
                <ytmusic-list
                    .hass=${this.hass}
                    .entity=${this.entity}
                    @navigate=${t=>this._browse(t.detail.action)}
                    .grid=${this.coverNavigation}
                    columns=${this.coverNavigation?"3":"1"}
                ></ytmusic-list>
            </div>
        `}_renderSearch(){return this.hideSearch?j:N`
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
        `}loadElement(t){this._browseHistory=[],this._isSearchResults=!1,this._browse(t)}async searchExternal(t){var e;if(!t||""===t)return;const i={entity_id:null===(e=this.entity)||void 0===e?void 0:e.entity_id,query:t,limit:40};await this.hass.callService("ytube_music_player","search",i),this._fetchSearchResults()}async _browse(t){var e;if(this._polrYTubeList&&this.entity){if(this._polrYTubeList.state=4,this._browseHistory.push(t),(null===(e=t.children)||void 0===e?void 0:e.length)>0)this._polrYTubeList.elements=t.children,this._polrYTubeList.state=2;else try{const e={type:"media_player/browse_media",entity_id:this.entity.entity_id};null!=t.media_content_type&&(e.media_content_type=t.media_content_type),null!=t.media_content_id&&(e.media_content_id=t.media_content_id);const i=await this.hass.callWS(e);this._polrYTubeList.elements=i.children,this._polrYTubeList.state=2}catch(e){this._polrYTubeList.state=16,console.error(e,t.media_content_type,t.media_content_id)}this.requestUpdate()}}async _fetchSearchResults(){var t,e;this._polrYTubeList.state=4;try{let i=await this.hass.callWS({type:"media_player/browse_media",entity_id:null===(t=this.entity)||void 0===t?void 0:t.entity_id,media_content_type:"search",media_content_id:""});(null===(e=i.children)||void 0===e?void 0:e.length)>0?(i.children.filter(t=>!t.media_content_id.startsWith("MPSP")),this._isSearchResults||(this._previousBrowseHistory=this._browseHistory),this._isSearchResults=!0,this._browseHistory=[],this._browse(i),this.requestUpdate()):this._polrYTubeList.state=8}catch(t){this._polrYTubeList.state=16,console.error(t)}}_renderNavigation(){if(this._browseHistory.length<=1&&!this._isSearchResults)return N``;let t;t=this._browseHistory.length>2?[this._browseHistory[0].title,"...",this._browseHistory[this._browseHistory.length-1].title]:this._browseHistory.map(t=>t.title);let e=N`
            ${
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function*(t,e){const i="function"==typeof e;if(void 0!==t){let s=-1;for(const o of t)s>-1&&(yield i?e(s):e),s++,yield o}}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */(function*(t,e){if(void 0!==t){let i=0;for(const s of t)yield e(s,i++)}}(t,t=>N`<span class="crumb">${t}</span>`),N`<span class="separator">/</span>`)}
        `;return N`
            <div class="navigation-row">
                ${this._isSearchResults?N`
                          <button
                              class="icon-btn"
                              @click=${()=>{this._isSearchResults=!1,this._browseHistory=this._previousBrowseHistory,this._searchTextField.value="",this._browse(this._browseHistory.pop())}}
                          >
                              ${gt}
                          </button>
                      `:j}
                ${this._browseHistory.length>1?N`
                          <button
                              class="icon-btn"
                              @click=${()=>this._browse(this._browseHistory.pop()&&this._browseHistory.pop())}
                          >
                              ${mt}
                          </button>
                      `:j}
                ${this._browseHistory.length>1||this._isSearchResults?N`<div class="breadcrumb">${e}</div>`:j}
            </div>
        `}_renderPlay(){const t=this._browseHistory[this._browseHistory.length-1];if(null==t?void 0:t.can_play)return N`
                <div class="playable_result">
                    ${t.title}
                    <button
                        class="play-btn"
                        @click=${()=>this.hass.callService("media_player","play_media",{entity_id:this.entity.entity_id,media_content_id:t.media_content_id,media_content_type:t.media_content_type})}
                    >
                        Play
                    </button>
                </div>
            `}_handleSearchInput(t){13==t.keyCode&&(this._search(),this._searchTextField.blur())}async _search(){var t,e,i,s;const o=null===(t=this.shadowRoot.querySelector("#query"))||void 0===t?void 0:t.value,r=null===(e=this.renderRoot.querySelector("#filter"))||void 0===e?void 0:e.value;if(!o||""==o)return;let n;n="all"==r?{entity_id:null===(i=this.entity)||void 0===i?void 0:i.entity_id,query:o,limit:40}:{entity_id:null===(s=this.entity)||void 0===s?void 0:s.entity_id,query:o,filter:r,limit:40},await this.hass.callService("ytube_music_player","search",n),this._fetchSearchResults()}static get styles(){return[n`
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
                    background: var(--card-background-color);
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

                ytmusic-list {
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
            `]}};t([pt()],Tt.prototype,"entity",void 0),t([pt()],Tt.prototype,"hass",void 0),t([dt()],Tt.prototype,"initialAction",void 0),t([dt()],Tt.prototype,"coverNavigation",void 0),t([dt({type:Boolean})],Tt.prototype,"hideSearch",void 0),t([pt()],Tt.prototype,"initialElements",void 0),t([pt()],Tt.prototype,"_browseHistory",void 0),t([pt()],Tt.prototype,"_previousBrowseHistory",void 0),t([pt()],Tt.prototype,"_polrYTubeList",void 0),t([pt()],Tt.prototype,"_searchTextField",void 0),t([pt()],Tt.prototype,"_isSearchResults",void 0),Tt=t([lt("ytmusic-browser")],Tt);let Rt=class extends nt{constructor(){super(),this._elements=[],this._limit=25}firstUpdated(t){this._polrYTubeBrowser=this.renderRoot.querySelector("ytmusic-browser"),this._searchTextField=this.renderRoot.querySelector("#query")}_renderResults(){return N`
            <ytmusic-browser
                .hass=${this._hass}
                .entity=${this._entity}
                .initialAction=${this.initialAction}
            ></ytmusic-browser>
        `}render(){return N`
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
                        <option value="albums">Albums</option>
                        <option value="playlists">Playlists</option>
                    </select>
                </div>
                <div class="results">${this._renderResults()}</div>
            </div>
        `}async _fetchResults(){var t,e;try{let i=await this._hass.callWS({type:"media_player/browse_media",entity_id:null===(t=this._entity)||void 0===t?void 0:t.entity_id,media_content_type:"search",media_content_id:""});(null===(e=i.children)||void 0===e?void 0:e.length)>0&&(i.children.filter(t=>!t.media_content_id.startsWith("MPSP")),this._elements=i,this._polrYTubeBrowser.loadElement(i),this.requestUpdate())}catch(t){console.error(t)}}handleKey(t){13==t.keyCode&&(this._search(),this._searchTextField.blur())}async _search(){var t,e;const i=this.shadowRoot.querySelector("#query").value,s=this.renderRoot.querySelector("#filter").value;let o;o="all"==s?{entity_id:null===(t=this._entity)||void 0===t?void 0:t.entity_id,query:i,limit:this._limit}:{entity_id:null===(e=this._entity)||void 0===e?void 0:e.entity_id,query:i,filter:s,limit:this._limit},await this._hass.callService("ytube_music_player","search",o),this._fetchResults()}};Rt.styles=n`
        .search {
            display: grid;
            grid-template-columns: 1fr min-content;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
        }

        input[type="search"] {
            height: 40px;
            background: #1e1e1e;
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 24px;
            color: #ffffff;
            font-size: 14px;
            padding: 0 16px;
            outline: none;
            width: 100%;
            box-sizing: border-box;
        }

        input[type="search"]::placeholder {
            color: rgba(255,255,255,0.38);
        }

        select {
            height: 40px;
            background: #1e1e1e;
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 20px;
            color: #ffffff;
            font-size: 13px;
            font-weight: 500;
            padding: 0 10px;
            cursor: pointer;
            outline: none;
        }

        select option {
            background: #282828;
            color: #ffffff;
        }
    `,t([pt()],Rt.prototype,"_hass",void 0),t([pt()],Rt.prototype,"_entity",void 0),t([pt()],Rt.prototype,"_limit",void 0),t([pt()],Rt.prototype,"_polrYTubeBrowser",void 0),t([pt()],Rt.prototype,"_elements",void 0),t([pt()],Rt.prototype,"_searchTextField",void 0),t([pt()],Rt.prototype,"initialAction",void 0),Rt=t([lt("ytmusic-search")],Rt);const Ht=N`
    <svg viewBox="0 0 24 24" class="yt-icon" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FF0000" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
    </svg>
`;class Ot extends nt{constructor(){super(...arguments),this._config={},this._menuOpen=!1}static getConfigElement(){}static getStubConfig(){return{entity_id:"media_player.ytube_music_player"}}setConfig(t){if(!t.entity_id)throw new Error("entity_id must be specified");this._config=structuredClone(t),"header"in this._config||(this._config.header="YouTube Music Search"),this._initialAction=new ut,this._initialAction.title="Home",this._initialAction.media_content_type=null,this._initialAction.media_content_id=null}set hass(t){this._hass=t;const e=this._hass.states[this._config.entity_id];yt(this._entity,e,[])||(this._entity=structuredClone(e))}render(){var t,e,i,s;const o=null===(e=null===(t=this._entity)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.volume_level,r=null!=o?Math.round(100*o):50,n=null===(s=null===(i=this._entity)||void 0===i?void 0:i.attributes)||void 0===s?void 0:s.is_volume_muted;return N`
            <ha-card>
                <div class="yt-header">
                    <div class="yt-logo">
                        ${Ht}
                        <span class="yt-title">Music</span>
                    </div>
                    <div class="header-actions">
                        <button class="icon-btn" @click=${this._toggleMute}>
                            <ha-icon icon="${n?"mdi:volume-off":"mdi:volume-high"}"></ha-icon>
                        </button>
                        <input
                            type="range"
                            class="vol-slider"
                            min="0" max="100" step="1"
                            .value=${String(r)}
                            @change=${this._onVolumeChange}
                        />
                        ${this._renderSourceSelector()}
                    </div>
                </div>
                <div class="search-wrap">
                    <ytmusic-search
                        ._hass=${this._hass}
                        ._entity=${this._entity}
                        .initialAction=${this._initialAction}
                    ></ytmusic-search>
                </div>
            </ha-card>
        `}_renderSourceSelector(){var t;if(!this._hass)return N``;let e=[];for(const[i,s]of Object.entries(this._hass.states))if(i.startsWith("media_player")){if(null===(t=null==s?void 0:s.attributes)||void 0===t?void 0:t.remote_player_id)continue;if("speakers"in this._config&&!this._config.speakers.includes(i))continue;e.push([i,s.attributes.friendly_name])}return e.sort((t,e)=>t[1]<e[1]?-1:1),N`
            <div class="source-wrap">
                <button class="icon-btn cast-btn" @click=${this._toggleMenu}>
                    ${ft}
                </button>
                ${this._menuOpen?N`
                    <div
                        class="source-menu"
                        @click=${t=>t.stopPropagation()}
                        @wheel=${this._onSourceMenuWheel}
                    >
                        ${e.map(t=>{var e,i;return N`
                            <div
                                class="menu-item ${t[0]===(null===(i=null===(e=this._entity)||void 0===e?void 0:e.attributes)||void 0===i?void 0:i.remote_player_id)?"selected":""}"
                                @click=${()=>this._selectSource(t[0])}
                            >${t[1]}</div>
                        `})}
                    </div>
                `:j}
            </div>
        `}_toggleMenu(t){t.stopPropagation(),this._menuOpen=!this._menuOpen,this._menuOpen&&document.addEventListener("click",()=>{this._menuOpen=!1},{once:!0})}_onSourceMenuWheel(t){t.stopPropagation(),t.preventDefault(),t.currentTarget.scrollTop+=t.deltaY}async _selectSource(t){var e,i;this._menuOpen=!1;const s=null===(i=null===(e=this._entity)||void 0===e?void 0:e.attributes)||void 0===i?void 0:i.remote_player_id;""!==t&&t!==s&&this._hass.callService("media_player","select_source",{entity_id:this._config.entity_id,source:t})}_onVolumeChange(t){const e=Number(t.target.value);this._hass.callService("media_player","volume_set",{entity_id:this._config.entity_id,volume_level:e/100})}async _toggleMute(){var t,e;this._hass.callService("media_player","volume_mute",{entity_id:this._config.entity_id,is_volume_muted:!(null===(e=null===(t=this._entity)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.is_volume_muted)})}static get styles(){return[n`
            :host {
                --yt-bg: #0f0f0f;
                --yt-surface: #1e1e1e;
                --yt-surface2: #282828;
                --yt-red: #ff0000;
                --yt-text: #ffffff;
                --yt-text2: rgba(255,255,255,0.6);
                --yt-text3: rgba(255,255,255,0.38);
            }

            ha-card {
                background: var(--yt-bg) !important;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                border-radius: 12px;
                color: var(--yt-text);
            }

            /* ── HEADER ── */
            .yt-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 16px 8px;
                flex-shrink: 0;
                gap: 8px;
            }

            .yt-logo {
                display: flex;
                align-items: center;
                gap: 6px;
                flex-shrink: 0;
            }

            .yt-icon { width: 26px; height: 26px; }

            .yt-title {
                font-size: 17px;
                font-weight: 600;
                color: var(--yt-text);
                letter-spacing: 0.3px;
            }

            .header-actions {
                display: flex;
                align-items: center;
                gap: 6px;
            }

            /* ── VOLUME ── */
            .vol-slider {
                width: 80px;
                -webkit-appearance: none;
                appearance: none;
                height: 3px;
                border-radius: 2px;
                background: rgba(255,255,255,0.25);
                outline: none;
                cursor: pointer;
                flex-shrink: 0;
            }

            .vol-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: var(--yt-text);
                cursor: pointer;
            }

            .vol-slider::-moz-range-thumb {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: var(--yt-text);
                cursor: pointer;
                border: none;
            }

            /* ── SEARCH WRAPPER ── */
            .search-wrap {
                flex: 1;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                padding: 0 8px 8px;
            }

            ytmusic-search {
                flex: 1;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                --primary-text-color: #ffffff;
                --rgb-primary-text-color: 255, 255, 255;
                --primary-color: #ff0000;
                --rgb-primary-color: 255, 0, 0;
                --card-background-color: #1e1e1e;
                color: #ffffff;
            }

            /* ── ICON BUTTONS ── */
            .icon-btn {
                background: none;
                border: none;
                cursor: pointer;
                padding: 6px;
                border-radius: 50%;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                color: var(--yt-text);
                --mdc-icon-size: 20px;
                flex-shrink: 0;
            }

            .icon-btn:hover { background: rgba(255,255,255,0.08); }

            .icon-btn svg {
                width: 20px;
                height: 20px;
                fill: currentColor;
            }

            .cast-btn svg { width: 18px; height: 18px; }

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
                overscroll-behavior: contain;
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
        `]}}t([dt()],Ot.prototype,"_config",void 0),t([pt()],Ot.prototype,"_entity",void 0),t([pt()],Ot.prototype,"_menuOpen",void 0),customElements.define("ytmusic-search-card",Ot),window.customCards=window.customCards||[],window.customCards.push({type:"ytmusic-search-card",name:"YTMusic Search",description:"Requires the ytube_media_player integration"});let It=class extends nt{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.step=1}render(){return N`<ha-slider
            min=${this.min}
            max=${this.max}
            step=${this.step}
            .value=${this.value}
            @change=${t=>{this.value=t.target.value,this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}
        ></ha-slider>`}};It.styles=n`
        :host {
            display: contents;
        }
        ha-slider {
            width: 100%;
        }
    `,t([dt({type:Number})],It.prototype,"value",void 0),t([dt({type:Number})],It.prototype,"min",void 0),t([dt({type:Number})],It.prototype,"max",void 0),t([dt({type:Number})],It.prototype,"step",void 0),It=t([lt("ytmusic-slider")],It);let zt=class extends nt{constructor(){super(...arguments),this._repeatActive=void 0,this._shuffleActive=void 0,this._pct=0}async connectedCallback(){super.connectedCallback(),this._trackProgress()}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.tracker),this.tracker=null}_wavePath(t=800){let e="M0 12 Q10 6 20 12";for(let i=40;i<=t;i+=20)e+=` T${i} 12`;return e}_wave(t){return B`<svg class="wave" width="800" height="24" viewBox="0 0 800 24"
            preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="${this._wavePath(800)}" fill="none" stroke="${t}"
                stroke-width="3" stroke-linecap="round"></path>
        </svg>`}render(){var t,e,i,s,o,r,n,a,l,c,d,p,h,u,_,v,y;const m="playing"===(null===(t=this.entity)||void 0===t?void 0:t.state),f=vt(null===(i=null===(e=this.entity)||void 0===e?void 0:e.attributes)||void 0===i?void 0:i.media_duration),g=Math.max(0,Math.min(100,this._pct)),b=Math.round(100*(null!==(r=null===(o=null===(s=this.entity)||void 0===s?void 0:s.attributes)||void 0===o?void 0:o.volume_level)&&void 0!==r?r:0)),x=!!(null===(a=null===(n=this.entity)||void 0===n?void 0:n.attributes)||void 0===a?void 0:a.is_volume_muted),w="music_assistant"===(null===(c=null===(l=this.entity)||void 0===l?void 0:l.attributes)||void 0===c?void 0:c.app_id),$=void 0!==this._shuffleActive?this._shuffleActive:!!(null===(p=null===(d=this.entity)||void 0===d?void 0:d.attributes)||void 0===p?void 0:p.shuffle),k=void 0!==this._repeatActive?this._repeatActive:!(!(null===(u=null===(h=this.entity)||void 0===h?void 0:h.attributes)||void 0===u?void 0:u.repeat)||"off"===(null===(v=null===(_=this.entity)||void 0===_?void 0:_.attributes)||void 0===v?void 0:v.repeat));return N`
            <!-- wavy progress -->
            <div class="wavebar">
                <span class="t">${null!==(y=this.progressTime)&&void 0!==y?y:"0:00"}</span>
                <div class="wave-wrap ${m?"playing":""}" @click=${this._seekClick}>
                    <div class="wlayer grey">${this._wave("#3a3a3a")}</div>
                    <div class="wlayer red" style="width:${g}%">${this._wave("var(--yt-red, #ff0000)")}</div>
                    <div class="whandle" style="left:${g}%"></div>
                </div>
                <span class="t">${f}</span>
            </div>

            <!-- transport: prev square / play big / next square -->
            <div class="controls">
                <button class="sq" @click=${this._skipPrevious}>${At}</button>
                <button class="playbtn" @click=${this._togglePlayPause}>
                    ${m?St:Ct}
                </button>
                <button class="sq" @click=${this._skipNext}>${kt}</button>
            </div>

            <!-- labeled pills -->
            <div class="pills">
                <button class="pill ${$?"on":""}" @click=${this._shuffleList}>
                    ${$t}<span>Casuale</span>
                </button>
                <button class="pill ${k?"on":""}" @click=${this._changeRepeat}>
                    ${wt}<span>Ripeti</span>
                </button>
                <button class="pill pill-icon" title="Opzioni" @click=${this._openQueueOptions}>
                    <ha-icon icon="mdi:dots-vertical"></ha-icon>
                </button>
            </div>

            <!-- volume pill + speaker on the right -->
            <div class="volume">
                ${w?j:N`<button class="radio-btn" @click=${this._startRadio} title="Radio">
                    ${xt}
                </button>`}
                <div class="volwrap">
                    <div class="volfill" style="width:${x?0:b}%"></div>
                    <div class="volthumb" style="left:${x?0:b}%"></div>
                    <input class="vol" type="range" min="0" max="100" step="1"
                        .value=${String(x?0:b)} @input=${this._changeVolumeInput} />
                </div>
                <button class="spk" @click=${this._toggleMute}>
                    ${x?Pt:qt}
                </button>
            </div>
        `}_seekClick(t){var e,i,s;const o=t.currentTarget.getBoundingClientRect(),r=Math.max(0,Math.min(1,(t.clientX-o.left)/o.width)),n=null!==(s=null===(i=null===(e=this.entity)||void 0===e?void 0:e.attributes)||void 0===i?void 0:i.media_duration)&&void 0!==s?s:0;n&&(this._pct=100*r,this.hass.callService("media_player","media_seek",{entity_id:this.entity.entity_id,seek_position:Math.round(r*n)}))}_changeVolumeInput(t){const e=Number(t.target.value);this.hass.callService("media_player","volume_set",{entity_id:this.entity.entity_id,volume_level:e/100})}async _changeRepeat(){var t,e;let i;switch(null===(e=null===(t=this.entity)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.repeat){case"off":i="one";break;case"one":i="all";break;case"all":i="off"}this._repeatActive="off"!==i,this.hass.callService("media_player","repeat_set",{entity_id:this.entity.entity_id,repeat:i}),this.requestUpdate()}async _likeSong(){var t;await this.hass.callService("ytube_music_player","rate_track",{entity_id:null===(t=this.entity)||void 0===t?void 0:t.entity_id,rating:"thumb_toggle_up_middle"}),this.requestUpdate()}_openQueueOptions(){this.dispatchEvent(new CustomEvent("ytmusic-queue-options",{bubbles:!0,composed:!0}))}async _shuffleList(){var t,e;const i=null===(e=null===(t=this.entity)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.shuffle;this._shuffleActive=!i,this.hass.callService("media_player","shuffle_set",{entity_id:this.entity.entity_id,shuffle:!i}),this.requestUpdate()}async _skipNext(){this.hass.callService("media_player","media_next_track",{entity_id:this.entity.entity_id})}async _startRadio(){var t,e;await this.hass.callService("media_player","shuffle_set",{entity_id:this.entity.entity_id,shuffle:!1}),this.hass.callService("media_player","play_media",{entity_id:this.entity.entity_id,media_content_id:null===(e=null===(t=this.entity)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.videoId,media_content_type:"vid_channel"})}async _toggleMute(){var t,e;this.hass.callService("media_player","volume_mute",{entity_id:this.entity.entity_id,is_volume_muted:!(null===(e=null===(t=this.entity)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.is_volume_muted)})}async _trackProgress(){var t,e,i,s,o,r,n;const a=Date.now(),l=Date.parse(null===(e=null===(t=this.entity)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.media_position_updated_at),c=null===(s=null===(i=this.entity)||void 0===i?void 0:i.attributes)||void 0===s?void 0:s.media_duration,d=null===(r=null===(o=this.entity)||void 0===o?void 0:o.attributes)||void 0===r?void 0:r.media_position;if(null!=d){const t="playing"===(null===(n=this.entity)||void 0===n?void 0:n.state)?d+(a-l)/1e3:d;this.progressTime=vt(t),c&&(this._pct=Math.min(t/c*100,100))}this.tracker||(this.tracker=setInterval(()=>this._trackProgress(),1e3))}async _skipPrevious(){this.hass.callService("media_player","media_previous_track",{entity_id:this.entity.entity_id})}async _togglePlayPause(){this.hass.callService("media_player","media_play_pause",{entity_id:this.entity.entity_id})}static get styles(){return[n`
                :host {
                    display: grid;
                    gap: 14px;
                    padding-bottom: 16px;
                    --yt-red: var(--yt-red, #ff0000);
                }

                /* ---- wavy progress ---- */
                .wavebar {
                    display: grid;
                    grid-template-columns: min-content 1fr min-content;
                    align-items: center;
                    gap: 8px;
                }
                .wavebar .t {
                    font-size: 11px;
                    color: var(--secondary-text-color, #9a9a9a);
                    white-space: nowrap;
                }
                .wave-wrap {
                    position: relative;
                    height: 24px;
                    cursor: pointer;
                }
                .wlayer {
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    overflow: hidden;
                }
                .wlayer.grey { right: 0; }
                .wlayer svg.wave {
                    height: 100%;
                    width: 800px;
                    display: block;
                }
                .wave-wrap.playing svg.wave {
                    animation: wave-flow 1s linear infinite;
                }
                @keyframes wave-flow {
                    from { transform: translateX(0); }
                    to { transform: translateX(-40px); }
                }
                .whandle {
                    position: absolute;
                    top: 50%;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: var(--yt-red, #ff0000);
                    transform: translate(-50%, -50%);
                    box-shadow: 0 0 8px rgba(255, 0, 0, 0.6);
                    pointer-events: none;
                }

                /* ---- transport ---- */
                .controls {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 16px;
                }
                .sq, .playbtn {
                    border: none;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                }
                .sq {
                    width: 52px;
                    height: 44px;
                    border-radius: 14px;
                    background: #2c2c2e;
                }
                .sq:hover { background: #3a3a3c; }
                .playbtn {
                    width: 96px;
                    height: 52px;
                    border-radius: 16px;
                    background: var(--yt-red, #ff0000);
                    box-shadow: 0 6px 18px rgba(255, 0, 0, 0.4);
                }
                .playbtn:hover { filter: brightness(1.08); }
                .sq svg { width: 24px; height: 24px; fill: currentColor; }
                .playbtn svg { width: 30px; height: 30px; fill: currentColor; }

                /* ---- pills ---- */
                .pills {
                    display: flex;
                    justify-content: center;
                    gap: 8px;
                    flex-wrap: wrap;
                }
                .pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 7px 13px;
                    border-radius: 18px;
                    background: #1f1f1f;
                    border: 1px solid #333;
                    color: #fff;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                }
                .pill svg { width: 16px; height: 16px; fill: currentColor; }
                .pill-icon { padding: 7px 9px; --mdc-icon-size: 18px; }
                .pill-icon ha-icon { display: flex; }
                .pill.on {
                    background: rgba(255, 0, 0, 0.14);
                    border-color: var(--yt-red, #ff0000);
                }
                .pill.on svg { fill: var(--yt-red, #ff0000); }

                /* ---- volume ---- */
                .volume {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .radio-btn, .spk {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: var(--primary-text-color, #fff);
                    display: inline-flex;
                    padding: 2px;
                }
                .radio-btn svg, .spk svg { width: 22px; height: 22px; fill: currentColor; }
                .spk { color: var(--yt-red, #ff0000); }
                .volwrap {
                    position: relative;
                    flex: 1;
                    height: 26px;
                    border-radius: 13px;
                    background: #2a2f3a;
                    overflow: hidden;
                }
                .volfill {
                    position: absolute;
                    left: 0; top: 0; bottom: 0;
                    background: var(--yt-red, #ff0000);
                    opacity: 0.85;
                    border-radius: 13px;
                }
                .volthumb {
                    position: absolute;
                    top: 3px;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #fff;
                    transform: translateX(-50%);
                    pointer-events: none;
                }
                .vol {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    margin: 0;
                    opacity: 0;
                    cursor: pointer;
                }
            `]}};t([dt()],zt.prototype,"hass",void 0),t([dt()],zt.prototype,"entity",void 0),t([pt()],zt.prototype,"_repeatActive",void 0),t([pt()],zt.prototype,"_shuffleActive",void 0),t([pt()],zt.prototype,"_pct",void 0),t([dt()],zt.prototype,"progressTime",void 0),zt=t([lt("ytmusic-media-control")],zt);const Nt=["show_search","show_queue","queue_actions","enqueue_menu","media_browser","players","show_chips","cover_animation","cover_glow"],Bt={it:{entity_id:"Entità (media player)",header:"Titolo",speakers:"Casse mostrate (vuoto = tutte)",show_search:"Mostra tasto Cerca",show_queue:"Mostra tab In coda",queue_actions:"Azioni sulla coda (sposta/rimuovi)",enqueue_menu:"Menu Aggiungi/Riproduci (ricerca e categorie)",media_browser:"Browser avanzato (Consigliati/Recenti/Libreria)",players:"Casse multi-room (raggruppa + volume)",show_chips:"Mostra chip categorie",cover_animation:"Anima copertina (ondeggia)",cover_glow:"Alone colorato dietro la copertina",anim_speed:"Velocità animazione copertina (secondi)",glow_size:"Dimensione alone (%)"},en:{entity_id:"Entity (media player)",header:"Header",speakers:"Shown players (empty = all)",show_search:"Show search button",show_queue:"Show queue tab",queue_actions:"Queue actions (move/remove)",enqueue_menu:"Add/Play menu (search & categories)",media_browser:"Advanced browser (Recommendations/Recent/Library)",players:"Multi-room players (group + volume)",show_chips:"Show category chips",cover_animation:"Animate cover (undulate)",cover_glow:"Colored halo behind the cover",anim_speed:"Cover animation speed (seconds)",glow_size:"Halo size (%)"}};class Vt extends nt{constructor(){super(...arguments),this._config={},this._computeLabel=t=>{var e;return null!==(e=Bt[(navigator.language||"en").toLowerCase().startsWith("it")?"it":"en"][t.name])&&void 0!==e?e:t.name}}setConfig(t){this._config=t||{}}set hass(t){this._hass=t}get hass(){return this._hass}get _schema(){return[{name:"entity_id",required:!0,selector:{entity:{domain:"media_player"}}},{name:"header",selector:{text:{}}},{name:"speakers",selector:{entity:{domain:"media_player",multiple:!0}}},...Nt.map(t=>({name:t,selector:{boolean:{}}})),{name:"anim_speed",selector:{number:{min:2,max:15,step:.5,mode:"box",unit_of_measurement:"s"}}},{name:"glow_size",selector:{number:{min:60,max:160,step:5,mode:"box",unit_of_measurement:"%"}}}]}get _data(){var t,e;const i=Object.assign({},this._config);for(const t of Nt)i[t]=!1!==this._config[t];return i.anim_speed=null!==(t=this._config.anim_speed)&&void 0!==t?t:6,i.glow_size=null!==(e=this._config.glow_size)&&void 0!==e?e:100,i}_valueChanged(t){t.stopPropagation();const e=Object.assign({},t.detail.value);this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}render(){return this._hass?N`
            <ha-form
                .hass=${this._hass}
                .data=${this._data}
                .schema=${this._schema}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._valueChanged}
            ></ha-form>
        `:j}}t([pt()],Vt.prototype,"_config",void 0),t([pt()],Vt.prototype,"_hass",void 0),customElements.define("ytmusic-playing-card-editor",Vt);const jt={it:["Per te","Scelte rapide","Dalla community","Radio per te","Playlist","Recenti"],en:["For You","Quick picks","From the community","Radio for you","Playlists","Recent"]},Ut={it:"Brani, album, artisti...",en:"Songs, albums, artists..."};function Qt(){return(navigator.language||"en").toLowerCase().startsWith("it")?"it":"en"}const Yt=function(){var t;const e=Qt(),i=null!==(t=jt[e])&&void 0!==t?t:jt.en;return[{label:i[0],source:"root",titleKey:"home"},{label:i[1],source:"home",titleKey:"scelte"},{label:i[2],source:"home",titleKey:"community"},{label:i[3],source:"home",titleKey:"radio"},{label:i[4],source:"root",titleKey:"playlist"},{label:i[5],source:"root",titleKey:"last played"}]}(),Wt=N`
    <svg viewBox="0 0 24 24" class="yt-icon" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FF0000" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
    </svg>
`,Dt={it:{nowPlaying:"In riproduzione",tabPlay:"Riproduzione",queue:"In coda",noQueue:"Nessuna coda attiva"},en:{nowPlaying:"Now Playing",tabPlay:"Playing",queue:"Queue",noQueue:"No active queue"}};function Ft(t){var e,i;return null!==(i=(null!==(e=Dt[Qt()])&&void 0!==e?e:Dt.en)[t])&&void 0!==i?i:t}const Kt={it:{artists:"Artisti",albums:"Album",tracks:"Brani",playlists:"Playlist","radio stations":"Radio",radios:"Radio",audiobooks:"Audiolibri",podcasts:"Podcast",favorites:"Preferiti"}};function Zt(t){var e;const i=Kt[Qt()];return i&&null!==(e=i[(null!=t?t:"").toLowerCase()])&&void 0!==e?e:t}const Gt={it:[{label:"Tutto",value:""},{label:"Brani",value:"track"},{label:"Album",value:"album"},{label:"Artisti",value:"artist"},{label:"Playlist",value:"playlist"},{label:"Radio",value:"radio"}],en:[{label:"All",value:""},{label:"Tracks",value:"track"},{label:"Albums",value:"album"},{label:"Artists",value:"artist"},{label:"Playlists",value:"playlist"},{label:"Radios",value:"radio"}]};class Xt extends nt{constructor(){super(...arguments),this._config={},this._menuOpen=null,this._playerExpanded=!0,this._showQueue=!1,this._queueTracks=[],this._queueLoading=!1,this._queueCurrentIndex=-1,this._activeFilter=0,this._popupOpen=!1,this._popupLoading=!1,this._popupItems=[],this._popupTitle="",this._popupStack=[],this._categories=[],this._searchOpen=!1,this._searchQuery="",this._searchType="",this._searchResults=[],this._searchLoading=!1,this._searchActive=!1,this._enqueueItem=null,this._playersOpen=!1,this._queueMenuOpen=!1,this._transferMode=!1,this._rootItems=[],this._homeItems=[],this._rootLoaded=!1,this._maConfigEntryIdByEntity={}}static getConfigElement(){return document.createElement("ytmusic-playing-card-editor")}static getStubConfig(){return{entity_id:"media_player.ytube_music_player",header:"YouTube Music"}}setConfig(t){if(!t.entity_id)throw new Error("entity_id must be specified");this._config=structuredClone(t),"header"in this._config||(this._config.header="YouTube Music"),"initialAction"in this._config||(this._config.initialAction=new ut,this._config.initialAction.title=jt[Qt()][0],this._config.initialAction.media_content_type=null,this._config.initialAction.media_content_id=null),"coverNavigation"in this._config||(this._config.coverNavigation=!0)}set hass(t){this._hass=t;const e=this._hass.states[this._config.entity_id];yt(this._entity,e,[])||(this._entity=structuredClone(e))}updated(t){super.updated(t),t.has("_entity")&&this._entity&&!this._rootLoaded&&(this._rootLoaded=!0,this._loadRoot())}get _isMA(){var t,e;return"music_assistant"===(null===(e=null===(t=this._entity)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.app_id)}_feat(t){var e;return!1!==(null===(e=this._config)||void 0===e?void 0:e[t])}async _browseInto(t){const e=await this._hass.callWS({type:"media_player/browse_media",entity_id:this._config.entity_id,media_content_type:null==t?void 0:t.media_content_type,media_content_id:null==t?void 0:t.media_content_id});return((null==e?void 0:e.children)||[]).filter(t=>{var e;return!(null===(e=t.media_content_id)||void 0===e?void 0:e.startsWith("MPSP"))})}async _loadRoot(){try{const t=await this._hass.callWS({type:"media_player/browse_media",entity_id:this._config.entity_id});if(this._rootItems=((null==t?void 0:t.children)||[]).filter(t=>{var e;return!(null===(e=t.media_content_id)||void 0===e?void 0:e.startsWith("MPSP"))}),this._isMA){const t=["tracks","playlists","radio stations","radios"],e=this._rootItems.filter(e=>{var i;return e.can_expand&&t.includes((null!==(i=e.title)&&void 0!==i?i:"").toLowerCase())}).map(t=>({label:Zt(t.title),item:t})),i=[];if(this._feat("media_browser")){const t="it"===Qt();i.push({label:t?"Consigliati":"Recommendations",special:"recommendations"}),i.push({label:t?"Recenti":"Recent",special:"recent"}),i.push({label:t?"Libreria":"Library",special:"library"})}this._categories=[...i,...e]}else{const t=this._rootItems.find(t=>{var e;return"home"===(null===(e=t.title)||void 0===e?void 0:e.toLowerCase())})||this._rootItems[0];if(t)try{this._homeItems=await this._browseInto(t)}catch(t){console.error("YTube: failed to load home sections",t)}const e=t=>{var e;return null!==(e=null==t?void 0:t.toLowerCase())&&void 0!==e?e:""};this._categories=Yt.map((t,i)=>{let s=("home"===t.source?this._homeItems:this._rootItems).find(i=>e(i.title).includes(t.titleKey));return s||0!==i||(s=this._rootItems[0]),{label:t.label,item:s}}).filter(t=>t.item)}}catch(t){console.error("YTMusic: failed to load root items",t)}}_navigateToFilter(t){if(!this._browser||0===this._rootItems.length)return;const e=Yt[t],i="home"===e.source?this._homeItems:this._rootItems;let s=i.find(t=>(t=>{var e;return null!==(e=null==t?void 0:t.toLowerCase())&&void 0!==e?e:""})(t.title).includes(e.titleKey));s||0!==t||(s=this._rootItems[0]),s&&this._browser.loadElement(s)}async _openChipPopup(t,e){this._activeFilter=e,this._popupTitle=t.label,this._popupStack=[],this._popupItems=[],this._popupOpen=!0,this._popupLoading=!0;try{t.special?this._popupItems=await this._maBrowse(t.special):t.item&&(this._popupItems=await this._browseInto(t.item))}catch(t){console.error("YTMusic: chip popup load failed",t)}this._popupLoading=!1}_maItem(t){const e=Array.isArray(t.artists)?t.artists.map(t=>null==t?void 0:t.name).filter(Boolean).join(", "):"",i=t.name||t.title||"";return{title:e?`${e} - ${i}`:i,thumbnail:t.image||t.thumbnail||"",media_content_id:t.uri||t.media_content_id,media_content_type:t.media_type||t.media_content_type||"track"}}async _maBrowse(t){var e,i;const s="it"===Qt();if("recommendations"===t){const t=await this._hass.callWS({type:"call_service",domain:"mass_queue",service:"get_recommendations",service_data:{entity:this._config.entity_id},return_response:!0}),i=(null===(e=null==t?void 0:t.response)||void 0===e?void 0:e.response)||(null==t?void 0:t.response)||[];return(Array.isArray(i)?i:[]).map(t=>{const e=(t.items||[]).map(t=>t.image).filter(Boolean);return{title:t.name,thumbnail:t.image||e[0]||"",mosaic:!t.image&&e.length>=4?e.slice(0,4):null,folderIcon:t.image||e.length?"":"mdi:folder-music",children:(t.items||[]).map(t=>this._maItem(t))}})}if("recent"===t){const t=await this._getMAConfigEntryId(this._config.entity_id),e=await this._hass.callWS({type:"call_service",domain:"music_assistant",service:"get_library",service_data:{config_entry_id:t,media_type:"track",order_by:"last_played_desc",limit:100},return_response:!0});return((null===(i=null==e?void 0:e.response)||void 0===i?void 0:i.items)||[]).map(t=>this._maItem(t))}if("library"===t){const t=await this._getMAConfigEntryId(this._config.entity_id),e=(e,i,s)=>({title:i,folderIcon:s,load:{domain:"music_assistant",service:"get_library",service_data:{config_entry_id:t,media_type:e,limit:300}}});return[e("playlist",s?"Playlist":"Playlists","mdi:playlist-music"),e("album",s?"Album":"Albums","mdi:album"),e("artist",s?"Artisti":"Artists","mdi:account-music"),e("track",s?"Brani":"Tracks","mdi:music-note"),e("radio","Radio","mdi:radio")]}return[]}_popupBack(){const t=this._popupStack[this._popupStack.length-1];t&&(this._popupStack=this._popupStack.slice(0,-1),this._popupTitle=t.title,this._popupItems=t.items)}async _playPopupItem(t){var e;if(t.children)return this._popupStack=[...this._popupStack,{title:this._popupTitle,items:this._popupItems}],this._popupTitle=this._cleanTitle(t.title),void(this._popupItems=t.children);if(t.load){this._popupStack=[...this._popupStack,{title:this._popupTitle,items:this._popupItems}],this._popupTitle=this._cleanTitle(t.title),this._popupItems=[],this._popupLoading=!0;try{const i=await this._hass.callWS(Object.assign(Object.assign({type:"call_service"},t.load),{return_response:!0}));this._popupItems=((null===(e=null==i?void 0:i.response)||void 0===e?void 0:e.items)||[]).map(t=>this._maItem(t))}catch(t){console.error("YTMusic: favorites load failed",t),this._popupItems=[]}this._popupLoading=!1}else this._hass.callService("media_player","play_media",{entity_id:this._config.entity_id,media_content_id:t.media_content_id,media_content_type:t.media_content_type}),this._popupOpen=!1}async _getMAConfigEntryId(t){var e,i;if(this._maConfigEntryIdByEntity[t])return this._maConfigEntryIdByEntity[t];const s=null===(i=null===(e=this._hass.entities)||void 0===e?void 0:e[t])||void 0===i?void 0:i.config_entry_id;if(s)return this._maConfigEntryIdByEntity[t]=s,s;try{const e=await this._hass.callWS({type:"config_entries/get",domain:"music_assistant"}),i=Array.isArray(e)?e:(null==e?void 0:e.entries)||(null==e?void 0:e.data)||[],s=i.find(t=>"music_assistant"===t.domain)||i[0],o=s&&(s.entry_id||s.entryId||s.id);if(o)return this._maConfigEntryIdByEntity[t]=o,o}catch(t){console.warn("YTMusic: failed to resolve Music Assistant config entry",t)}return null}async _doSearch(){var t,e,i;const s=this._searchQuery.trim();if(s){this._searchLoading=!0;try{if(this._isMA){const o=await this._getMAConfigEntryId(this._config.entity_id);if(o){const i={config_entry_id:o,name:s,limit:20};this._searchType&&(i.media_type=[this._searchType]);const r=await this._hass.callWS({type:"call_service",domain:"music_assistant",service:"search",service_data:i,return_response:!0}),n=(null==r?void 0:r.response)||{},a={track:"tracks",album:"albums",artist:"artists",playlist:"playlists",radio:"radio"},l=this._searchType?[a[this._searchType]]:["tracks","artists","albums","playlists","radio"],c=[];for(const i of l)for(const s of n[i]||[]){const i=null===(e=null===(t=s.artists)||void 0===t?void 0:t[0])||void 0===e?void 0:e.name;c.push({title:i?`${i} - ${s.name}`:s.name,thumbnail:s.image||"",media_content_id:s.uri,media_content_type:s.media_type})}this._searchResults=c}else{const t={entity_id:this._config.entity_id,search_query:s};this._searchType&&(t.media_filter_classes=[this._searchType]);const e=await this._hass.callWS({type:"call_service",domain:"media_player",service:"search_media",service_data:t,return_response:!0}),o=null===(i=null==e?void 0:e.response)||void 0===i?void 0:i[this._config.entity_id];this._searchResults=((null==o?void 0:o.result)||[]).filter(t=>{var e;return!(null===(e=t.media_content_id)||void 0===e?void 0:e.startsWith("MPSP"))})}}else{const t={track:"songs",album:"albums",artist:"artists",playlist:"playlists"},e={entity_id:this._config.entity_id,query:s,limit:40},i=t[this._searchType];i&&(e.filter=i),await this._hass.callService("ytube_music_player","search",e);const o=await this._hass.callWS({type:"media_player/browse_media",entity_id:this._config.entity_id,media_content_type:"search",media_content_id:""});this._searchResults=((null==o?void 0:o.children)||[]).filter(t=>{var e;return!(null===(e=t.media_content_id)||void 0===e?void 0:e.startsWith("MPSP"))})}}catch(t){console.error("YTMusic: search failed",t),this._searchResults=[]}this._searchLoading=!1}else this._searchResults=[]}_setSearchType(t){this._searchType=t,this._searchQuery.trim()&&this._doSearch()}_cleanTitle(t){return(t||"").replace(/^(Track|Album|Artist|Playlist|Radio|Video|Brano|Artista|Brani):\s*/i,"")}_playSearchItem(t){this._hass.callService("media_player","play_media",{entity_id:this._config.entity_id,media_content_id:t.media_content_id,media_content_type:t.media_content_type}),setTimeout(()=>{this._showQueue&&this._fetchQueue()},1e3)}_enqueueOptions(){const t="it"===Qt();return[{key:"play",icon:"mdi:play",label:t?"Riproduci ora":"Play now"},{key:"next",icon:"mdi:playlist-play",label:t?"Riproduci dopo":"Play next"},{key:"add",icon:"mdi:playlist-plus",label:t?"Aggiungi in coda":"Add to queue"},{key:"replace",icon:"mdi:playlist-remove",label:t?"Riproduci e svuota coda":"Play now & clear queue"},{key:"radio",radio:!0,icon:"mdi:radio-tower",label:"Play radio"}]}_openEnqueueMenu(t,e){e.stopPropagation(),this._enqueueItem=t}_enqueue(t){const e=this._enqueueItem;if(this._enqueueItem=null,!e)return;const i={entity_id:this._config.entity_id,media_id:e.media_content_id,media_type:e.media_content_type};t.radio?i.radio_mode=!0:i.enqueue=t.key,this._hass.callService("music_assistant","play_media",i),setTimeout(()=>{this._showQueue&&this._fetchQueue()},1e3)}_renderEnqueueMenu(){var t;return N`
            <div class="chip-popup-backdrop" @click=${()=>{this._enqueueItem=null}}>
                <div class="enq-menu" @click=${t=>t.stopPropagation()}>
                    <div class="cp-handle"></div>
                    <div class="enq-title">${this._cleanTitle((null===(t=this._enqueueItem)||void 0===t?void 0:t.title)||"")}</div>
                    ${this._enqueueOptions().map(t=>N`
                        <button class="enq-opt" @click=${()=>this._enqueue(t)}>
                            <ha-icon icon="${t.icon}"></ha-icon>
                            <span>${t.label}</span>
                        </button>`)}
                </div>
            </div>
        `}_renderSearchPopup(){const t=null!==(e=Gt[Qt()])&&void 0!==e?e:Gt.en;var e;return N`
            <div class="chip-popup-backdrop" @click=${()=>{this._searchOpen=!1}}>
                <div class="chip-popup" @click=${t=>t.stopPropagation()}>
                    <div class="cp-handle"></div>
                    <div class="cp-head">
                        <input class="cp-search" type="text" placeholder="${"it"===Qt()?"Cerca…":"Search…"}"
                            .value=${this._searchQuery}
                            @input=${t=>{this._searchQuery=t.target.value}}
                            @keydown=${t=>{"Enter"===t.key&&this._doSearch()}} />
                        <button class="icon-btn" @click=${()=>this._doSearch()}>
                            <ha-icon icon="mdi:magnify"></ha-icon>
                        </button>
                        <button class="icon-btn" @click=${()=>{this._searchOpen=!1}}>
                            <ha-icon icon="mdi:close"></ha-icon>
                        </button>
                    </div>
                    <div class="cp-types" @wheel=${this._onPillsWheel}>
                        ${t.map(t=>N`
                            <button class="fp-chip ${this._searchType===t.value?"active":""}"
                                @click=${()=>this._setSearchType(t.value)}>${t.label}</button>`)}
                    </div>
                    ${this._searchLoading?N`<div class="cp-msg"><ha-icon icon="mdi:loading" class="spin"></ha-icon></div>`:this._searchResults.length?N`<div class="cp-list">
                                ${this._searchResults.map(t=>N`
                                    <div class="cp-item" @click=${()=>this._playSearchItem(t)}>
                                        ${t.thumbnail?N`<img class="cp-thumb" src="${t.thumbnail}">`:N`<div class="cp-thumb cp-thumb-ph"><ha-icon icon="mdi:music"></ha-icon></div>`}
                                        <div class="cp-info"><div class="cp-t">${this._cleanTitle(t.title)}</div></div>
                                        ${this._isMA&&this._feat("enqueue_menu")?N`<button class="cp-more" @click=${e=>this._openEnqueueMenu(t,e)}><ha-icon icon="mdi:dots-vertical"></ha-icon></button>`:N`<ha-icon icon="mdi:play" class="cp-play"></ha-icon>`}
                                    </div>`)}
                              </div>`:N`<div class="cp-msg">${this._searchQuery?"it"===Qt()?"Nessun risultato":"No results":"it"===Qt()?"Digita per cercare":"Type to search"}</div>`}
                </div>
            </div>
        `}_renderChipPopup(){return N`
            <div class="chip-popup-backdrop" @click=${()=>{this._popupOpen=!1}}>
                <div class="chip-popup" @click=${t=>t.stopPropagation()}>
                    <div class="cp-handle"></div>
                    <div class="cp-head">
                        ${this._popupStack.length?N`<button class="icon-btn" @click=${()=>this._popupBack()}>
                                <ha-icon icon="mdi:arrow-left"></ha-icon></button>`:j}
                        <span class="cp-title">${this._cleanTitle(this._popupTitle)}</span>
                        <button class="icon-btn" @click=${()=>{this._popupOpen=!1}}>
                            <ha-icon icon="mdi:close"></ha-icon>
                        </button>
                    </div>
                    ${this._popupLoading?N`<div class="cp-msg"><ha-icon icon="mdi:loading" class="spin"></ha-icon></div>`:this._popupItems.length?this._popupUsesGrid()?N`<div class="cp-grid">
                                    ${this._popupItems.map(t=>this._renderPopupTile(t))}
                                  </div>`:N`<div class="cp-list">
                                    ${this._popupItems.map(t=>this._renderPopupRow(t))}
                                  </div>`:N`<div class="cp-msg">${"it"===Qt()?"Nessun elemento":"No items"}</div>`}
                </div>
            </div>
        `}_popupUsesGrid(){return this._popupItems.length>0}_renderPopupTile(t){var e;const i=!(!t.children&&!t.load),s=!i&&"track"===(null!==(e=t.media_content_type)&&void 0!==e?e:"track");return N`
            <div class="cp-tile" @click=${()=>this._playPopupItem(t)}>
                <div class="cp-tile-art">
                    ${t.mosaic?N`<div class="cp-mosaic">${t.mosaic.map(t=>N`<img src="${t}">`)}</div>`:t.thumbnail?N`<img src="${t.thumbnail}">`:N`<div class="cp-tile-ph"><ha-icon icon="${t.folderIcon||"mdi:music"}"></ha-icon></div>`}
                    ${i?j:this._isMA&&this._feat("enqueue_menu")?N`<button class="cp-tile-more" @click=${e=>this._openEnqueueMenu(t,e)}>
                                <ha-icon icon="mdi:dots-vertical"></ha-icon></button>`:N`<div class="cp-tile-play"><ha-icon icon="mdi:play"></ha-icon></div>`}
                </div>
                <div class="cp-tile-label ${s?"":"bold"}">${this._cleanTitle(t.title)}</div>
            </div>`}_renderPopupRow(t){const e=!(!t.children&&!t.load);return N`
            <div class="cp-item" @click=${()=>this._playPopupItem(t)}>
                ${t.thumbnail?N`<img class="cp-thumb" src="${t.thumbnail}">`:N`<div class="cp-thumb cp-thumb-ph"><ha-icon icon="${t.folderIcon||"mdi:music"}"></ha-icon></div>`}
                <div class="cp-info"><div class="cp-t">${this._cleanTitle(t.title)}</div></div>
                ${e?N`<ha-icon icon="mdi:chevron-right" class="cp-play"></ha-icon>`:this._isMA&&this._feat("enqueue_menu")?N`<button class="cp-more" @click=${e=>this._openEnqueueMenu(t,e)}><ha-icon icon="mdi:dots-vertical"></ha-icon></button>`:N`<ha-icon icon="mdi:play" class="cp-play"></ha-icon>`}
            </div>`}_maPlayers(){var t,e,i,s,o;const r=(null===(t=this._hass)||void 0===t?void 0:t.entities)||{},n=this._config.speakers,a=Array.isArray(n)&&n.length>0,l=[];for(const[t,c]of Object.entries((null===(e=this._hass)||void 0===e?void 0:e.states)||{})){if(!t.startsWith("media_player."))continue;const e=c;if("unavailable"!==e.state&&"unknown"!==e.state){if(a){if(!n.includes(t))continue}else{if(!("music_assistant"===(null===(i=r[t])||void 0===i?void 0:i.platform)||"music_assistant"===(null===(s=e.attributes)||void 0===s?void 0:s.app_id)||Array.isArray(null===(o=e.attributes)||void 0===o?void 0:o.group_members)))continue}l.push({id:t,state:e.state,attributes:e.attributes})}}const c=this._config.entity_id;return l.sort((t,e)=>{if(t.id===c)return-1;if(e.id===c)return 1;const i="playing"===t.state?0:1,s="playing"===e.state?0:1;return i!==s?i-s:(t.attributes.friendly_name||"")<(e.attributes.friendly_name||"")?-1:1}),l}_togglePlayerGroup(t,e){var i,s;e.stopPropagation();const o=this._config.entity_id;if(t.id===o)return;((null===(s=null===(i=this._entity)||void 0===i?void 0:i.attributes)||void 0===s?void 0:s.group_members)||[]).includes(t.id)?this._hass.callService("media_player","unjoin",{entity_id:t.id}):this._hass.callService("media_player","join",{entity_id:o,group_members:[t.id]})}_setPlayerVolume(t,e,i){i.stopPropagation(),this._hass.callService("media_player","volume_set",{entity_id:t.id,volume_level:e})}_renderPlayersPopup(){var t,e;const i="it"===Qt(),s=this._config.entity_id,o=(null===(e=null===(t=this._entity)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.group_members)||[],r=this._maPlayers();return N`
            <div class="chip-popup-backdrop" @click=${()=>{this._playersOpen=!1,this._transferMode=!1}}>
                <div class="chip-popup" @click=${t=>t.stopPropagation()}>
                    <div class="cp-handle"></div>
                    <div class="cp-head">
                        <span class="cp-title">${this._transferMode?i?"Trasferisci la coda a…":"Transfer queue to…":i?"Casse":"Players"}</span>
                        <button class="icon-btn" @click=${()=>{this._playersOpen=!1,this._transferMode=!1}}>
                            <ha-icon icon="mdi:close"></ha-icon>
                        </button>
                    </div>
                    <div class="cp-list">
                        ${r.map(t=>{const e=t.id===s,r=e||o.includes(t.id),n="playing"===t.state,a="number"==typeof t.attributes.volume_level?t.attributes.volume_level:0;return N`
                                <div class="pl-row ${r?"grouped":""} ${this._transferMode&&!e?"pickable":""}"
                                    @click=${()=>{this._transferMode&&!e&&this._transferQueueTo(t.id)}}>
                                    <ha-icon class="pl-ico" icon="${n?"mdi:speaker-play":"mdi:speaker"}"></ha-icon>
                                    <div class="pl-info">
                                        <div class="pl-name">${t.attributes.friendly_name||t.id}</div>
                                        <div class="pl-vol">
                                            <ha-icon icon="mdi:volume-medium"></ha-icon>
                                            <input type="range" min="0" max="1" step="0.01" .value=${String(a)}
                                                @change=${e=>this._setPlayerVolume(t,parseFloat(e.target.value),e)}
                                                @click=${t=>t.stopPropagation()} />
                                        </div>
                                    </div>
                                    ${this._transferMode?e?N`<span class="pl-master">${i?"Principale":"Main"}</span>`:N`<ha-icon class="pl-arrow" icon="mdi:arrow-right-bold-circle"></ha-icon>`:e?N`<span class="pl-master">${i?"Principale":"Main"}</span>`:N`<button class="pl-group ${r?"on":""}"
                                                title=${r?i?"Sgancia":"Ungroup":i?"Raggruppa":"Group"}
                                                @click=${e=>this._togglePlayerGroup(t,e)}>
                                                <ha-icon icon="${r?"mdi:link-variant":"mdi:link-variant-plus"}"></ha-icon>
                                            </button>`}
                                </div>`})}
                        ${0===r.length?N`<div class="cp-msg">${i?"Nessuna cassa":"No players"}</div>`:j}
                    </div>
                </div>
            </div>
        `}_clearQueue(){this._queueMenuOpen=!1,this._hass.callService("media_player","clear_playlist",{entity_id:this._config.entity_id}),setTimeout(()=>{this._showQueue&&this._fetchQueue()},600)}_startTransfer(){this._queueMenuOpen=!1,this._transferMode=!0,this._playersOpen=!0}_transferQueueTo(t){this._transferMode=!1,this._playersOpen=!1,this._hass.callService("music_assistant","transfer_queue",{entity_id:t,source_player:this._config.entity_id})}_turnOff(){this._queueMenuOpen=!1,this._hass.callService("media_player","turn_off",{entity_id:this._config.entity_id})}_renderQueueMenu(){const t="it"===Qt();return N`
            <div class="chip-popup-backdrop" @click=${()=>{this._queueMenuOpen=!1}}>
                <div class="enq-menu" @click=${t=>t.stopPropagation()}>
                    <div class="cp-handle"></div>
                    ${this._isMA?N`
                            <button class="enq-opt" @click=${()=>this._startTransfer()}>
                                <ha-icon icon="mdi:swap-horizontal"></ha-icon>
                                <span>${t?"Trasferisci la coda a un'altra cassa":"Transfer queue to another player"}</span>
                            </button>
                            <button class="enq-opt" @click=${()=>this._clearQueue()}>
                                <ha-icon icon="mdi:playlist-remove"></ha-icon>
                                <span>${t?"Svuota la coda":"Clear the queue"}</span>
                            </button>`:N`
                            <button class="enq-opt" @click=${()=>this._turnOff()}>
                                <ha-icon icon="mdi:power"></ha-icon>
                                <span>${t?"Spegni":"Turn off"}</span>
                            </button>`}
                </div>
            </div>
        `}_onPillsWheel(t){0!==t.deltaY&&(t.preventDefault(),t.currentTarget.scrollLeft+=t.deltaY)}render(){return N`
            <ha-card>
                ${this._renderFullPlayer()}
                ${this._popupOpen?this._renderChipPopup():j}
                ${this._searchOpen?this._renderSearchPopup():j}
                ${this._enqueueItem?this._renderEnqueueMenu():j}
                ${this._playersOpen?this._renderPlayersPopup():j}
                ${this._queueMenuOpen?this._renderQueueMenu():j}
            </ha-card>
        `}_renderHeader(){return N`
            <div class="yt-header">
                <div class="yt-logo">
                    ${Wt}
                    <span class="yt-title">Music</span>
                </div>
                <div class="header-actions">
                    <button class="icon-btn" @click=${()=>{this._searchActive=!0}}>
                        <ha-icon icon="mdi:magnify"></ha-icon>
                    </button>
                    ${this._renderSourceSelector("header")}
                </div>
            </div>
        `}_renderSearchHeader(){return N`
            <div class="yt-header search-mode">
                <button class="icon-btn" @click=${()=>{this._searchActive=!1}}>
                    <ha-icon icon="mdi:arrow-left"></ha-icon>
                </button>
                <input
                    type="search"
                    class="search-input"
                    id="searchInput"
                    placeholder="${Ut[Qt()]}"
                    @keyup=${this._handleSearchKey}
                    autofocus
                />
            </div>
        `}_renderSourceSelector(t="header"){var e;if(!this._hass)return N``;let i=[];for(const[t,s]of Object.entries(this._hass.states))if(t.startsWith("media_player")){if(null===(e=null==s?void 0:s.attributes)||void 0===e?void 0:e.remote_player_id)continue;const o=this._config.speakers;if(Array.isArray(o)&&o.length&&!o.includes(t))continue;i.push([t,s.attributes.friendly_name])}return i.sort((t,e)=>t[1]<e[1]?-1:1),N`
            <div class="source-wrap">
                <button class="icon-btn cast-btn" @click=${e=>{this._isMA&&this._feat("players")?(e.stopPropagation(),this._playersOpen=!0):this._toggleMenu(e,t)}}>
                    ${ft}
                </button>
                ${this._menuOpen===t?N`
                    <div
                        class="source-menu"
                        @click=${t=>t.stopPropagation()}
                        @wheel=${this._onSourceMenuWheel}
                    >
                        ${i.map(t=>{var e,i;return N`
                            <div
                                class="menu-item ${t[0]===(null===(i=null===(e=this._entity)||void 0===e?void 0:e.attributes)||void 0===i?void 0:i.remote_player_id)?"selected":""}"
                                @click=${()=>this._selectSource(t[0])}
                            >${t[1]}</div>
                        `})}
                    </div>
                `:j}
            </div>
        `}_renderMiniPlayer(){var t,e,i,s,o,r,n,a,l;const c=(null===(e=null===(t=this._entity)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.entity_picture_local)||(null===(s=null===(i=this._entity)||void 0===i?void 0:i.attributes)||void 0===s?void 0:s.entity_picture),d=(null===(r=null===(o=this._entity)||void 0===o?void 0:o.attributes)||void 0===r?void 0:r.media_title)||"Sconosciuto",p=(null===(a=null===(n=this._entity)||void 0===n?void 0:n.attributes)||void 0===a?void 0:a.media_artist)||"",h="playing"===(null===(l=this._entity)||void 0===l?void 0:l.state),u=this._getProgress();return N`
            <div class="mini-player" @click=${()=>{this._playerExpanded=!0}}>
                <div class="mini-progress-bar">
                    <div class="mini-progress-fill" style="width: ${u}%"></div>
                </div>
                ${c?N`<img class="mini-art" src="${c}">`:N`<div class="mini-art-ph"><ha-icon icon="mdi:music"></ha-icon></div>`}
                <div class="mini-info">
                    <div class="mini-title">${d}</div>
                    ${p?N`<div class="mini-artist">${p}</div>`:j}
                </div>
                <button class="mini-btn" @click=${t=>{t.stopPropagation(),this._togglePlayPause()}}>
                    ${h?St:Ct}
                </button>
                <button class="mini-btn" @click=${t=>{t.stopPropagation(),this._skipNext()}}>
                    ${kt}
                </button>
            </div>
        `}_renderFullPlayer(){var t,e,i,s,o,r,n,a,l,c,d;const p=(null===(e=null===(t=this._entity)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.entity_picture_local)||(null===(s=null===(i=this._entity)||void 0===i?void 0:i.attributes)||void 0===s?void 0:s.entity_picture),h=(null===(r=null===(o=this._entity)||void 0===o?void 0:o.attributes)||void 0===r?void 0:r.media_title)||"Sconosciuto",u=(null===(a=null===(n=this._entity)||void 0===n?void 0:n.attributes)||void 0===a?void 0:a.media_artist)||"",_="playing"===(null===(l=this._entity)||void 0===l?void 0:l.state),v=_&&this._feat("cover_animation"),y=_&&this._feat("cover_glow"),m=null!==(c=this._config.anim_speed)&&void 0!==c?c:6,f=null!==(d=this._config.glow_size)&&void 0!==d?d:100;return N`
            <div class="full-player" style="${`--fp-anim:${m}s; --fp-hue:${2*m}s; --fp-glow-size:${f}%;`+(p?` --fp-bg: url('${p}');`:"")}">
                <div class="fp-bg-blur"></div>
                <div class="fp-content">
                    <div class="fp-header">
                        <span class="fp-logo">${Wt}<b>Music</b></span>
                        <span class="fp-from">${Ft("nowPlaying")}</span>
                        ${this._feat("show_search")?N`
                        <button class="icon-btn" @click=${()=>{this._searchOpen=!0}}>
                            <ha-icon icon="mdi:magnify"></ha-icon>
                        </button>`:j}
                        ${this._renderSourceSelector("full-player")}
                    </div>
                    <div class="fp-tabs">
                        <button class="fp-tab ${this._showQueue?"":"active"}"
                            @click=${()=>{this._showQueue=!1}}>
                            ${Ft("tabPlay")}
                        </button>
                        ${this._feat("show_queue")?N`
                        <button class="fp-tab ${this._showQueue?"active":""}"
                            @click=${()=>{this._showQueue=!0,this._fetchQueue()}}>
                            ${Ft("queue")}
                        </button>`:j}
                        <button class="fp-tab-opts" title="${"it"===Qt()?"Opzioni coda":"Queue options"}"
                            @click=${()=>{this._queueMenuOpen=!0}}>
                            <ha-icon icon="mdi:dots-vertical"></ha-icon>
                        </button>
                    </div>
                    ${this._feat("show_chips")?N`
                    <div class="fp-chips" @wheel=${this._onPillsWheel}>
                        ${this._categories.map((t,e)=>N`
                            <button class="fp-chip ${this._activeFilter===e?"active":""}"
                                @click=${()=>this._openChipPopup(t,e)}
                            >${t.label}</button>`)}
                    </div>`:j}
                    ${this._showQueue?this._renderQueue():N`
                        <div class="fp-art-wrap">
                            <div class="fp-glow ${y?"on":""}"></div>
                            ${p?N`<img class="fp-art ${v?"playing":""}" src="${p}">`:N`<div class="fp-art-ph ${v?"playing":""}"><ha-icon icon="mdi:music-note" style="--mdc-icon-size:80px"></ha-icon></div>`}
                        </div>
                        <div class="fp-info">
                            <div>
                                <div class="fp-title">${h}</div>
                                <div class="fp-artist">${u}</div>
                            </div>
                        </div>
                        <ytmusic-media-control
                            .hass=${this._hass}
                            .entity=${this._entity}
                            @ytmusic-queue-options=${()=>{this._queueMenuOpen=!0}}
                        ></ytmusic-media-control>
                    `}
                </div>
            </div>
        `}async _fetchQueue(){var t,e,i,s;if(this._entity&&"off"!==this._entity.state)if(this._queueLoading=!0,this._queueTracks=[],this._isMA){try{const s=await this._hass.callWS({type:"call_service",domain:"mass_queue",service:"get_queue_items",service_data:{entity:this._config.entity_id,limit_before:3,limit_after:400},return_response:!0}),o=(null===(t=null==s?void 0:s.response)||void 0===t?void 0:t[this._config.entity_id])||[],r=null===(i=null===(e=this._entity)||void 0===e?void 0:e.attributes)||void 0===i?void 0:i.media_content_id;this._queueCurrentIndex=o.findIndex(t=>t.media_content_id===r),this._queueTracks=o.map(t=>({title:t.media_artist?`${t.media_artist} - ${t.media_title}`:t.media_title,thumbnail:t.local_image_encoded||t.media_image||"",queue_item_id:t.queue_item_id}))}catch(t){try{const t=await this._hass.callWS({type:"call_service",domain:"music_assistant",service:"get_queue",target:{entity_id:this._config.entity_id},return_response:!0}),e=null===(s=null==t?void 0:t.response)||void 0===s?void 0:s[this._config.entity_id],i=[null==e?void 0:e.current_item,null==e?void 0:e.next_item].filter(Boolean);this._queueCurrentIndex=(null==e?void 0:e.current_item)?0:-1,this._queueTracks=i.map(t=>{var e,i;const s=t.media_item||{},o=(null===(i=null===(e=s.artists)||void 0===e?void 0:e[0])||void 0===i?void 0:i.name)||"",r=s.name||t.name||"";return{title:o?`${o} - ${r}`:r,thumbnail:s.image||""}})}catch(t){console.error("[MA queue] no queue source available",t),this._queueTracks=[]}}this._queueLoading=!1}else{try{const t=await this._hass.callWS({type:"media_player/browse_media",entity_id:this._config.entity_id,media_content_type:"cur_playlists",media_content_id:""});this._queueTracks=t&&t.children?t.children:[]}catch(t){this._queueTracks=[]}this._queueLoading=!1}}_queueItemClick(t){var e,i;if(this._isMA){const s=null===(i=null===(e=this._queueTracks)||void 0===e?void 0:e[t])||void 0===i?void 0:i.queue_item_id;if(void 0===s)return;return this._hass.callService("mass_queue","play_queue_item",{entity:this._config.entity_id,queue_item_id:s}),this._queueCurrentIndex=t,this.requestUpdate(),void setTimeout(()=>this._fetchQueue(),1e3)}this._hass.callService("ytube_music_player","call_method",{entity_id:this._config.entity_id,command:"goto_track",parameters:t+1})}async _maQueueAction(t,e,i){if(i.stopPropagation(),e){try{await this._hass.callService("mass_queue",t,{entity:this._config.entity_id,queue_item_id:e})}catch(e){console.error(`YTMusic: mass_queue.${t} failed`,e)}setTimeout(()=>this._fetchQueue(),300)}}_renderQueue(){var t,e;const i=this._isMA?this._queueCurrentIndex:void 0!==(null===(e=null===(t=this._entity)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.current_track)?this._entity.attributes.current_track:-1;return this._queueLoading?N`
            <div class="fp-queue-loading">
                <ha-icon icon="mdi:loading" class="spin"></ha-icon>
            </div>`:this._queueTracks&&this._queueTracks.length?N`
            <div class="fp-queue-list">
                ${this._queueTracks.map((t,e)=>{const s=t.title||"",o=s.indexOf(" - "),r=o>0?s.substring(0,o):"",n=o>0?s.substring(o+3):s,a=t.thumbnail||"",l=e===i,c=t.queue_item_id,d=this._isMA&&this._feat("queue_actions")&&void 0!==c&&i>=0&&e>i;return N`
                        <div class="fp-queue-item ${l?"current":""}"
                            @click=${()=>this._queueItemClick(e)}>
                            ${a?N`<img class="fp-qi-thumb" src="${a}">`:N`<div class="fp-qi-thumb-ph"><ha-icon icon="mdi:music"></ha-icon></div>`}
                            <div class="fp-qi-info">
                                <div class="fp-qi-title">${n}</div>
                                ${r?N`<div class="fp-qi-artist">${r}</div>`:j}
                            </div>
                            ${l?N`<ha-icon icon="mdi:volume-high" class="fp-qi-playing"></ha-icon>`:j}
                            ${d?N`
                                <div class="fp-qi-actions" @click=${t=>t.stopPropagation()}>
                                    <button class="fp-qi-act" title="Riproduci dopo"
                                        @click=${t=>this._maQueueAction("move_queue_item_next",c,t)}>
                                        <ha-icon icon="mdi:playlist-play"></ha-icon></button>
                                    ${e>i+1?N`
                                    <button class="fp-qi-act" title="Su"
                                        @click=${t=>this._maQueueAction("move_queue_item_up",c,t)}>
                                        <ha-icon icon="mdi:arrow-up"></ha-icon></button>`:j}
                                    <button class="fp-qi-act" title="Giù"
                                        @click=${t=>this._maQueueAction("move_queue_item_down",c,t)}>
                                        <ha-icon icon="mdi:arrow-down"></ha-icon></button>
                                    <button class="fp-qi-act" title="Rimuovi"
                                        @click=${t=>this._maQueueAction("remove_queue_item",c,t)}>
                                        <ha-icon icon="mdi:close"></ha-icon></button>
                                </div>`:j}
                        </div>
                    `})}
            </div>
        `:N`
            <div class="fp-queue-empty">${Ft("noQueue")}</div>`}_selectFilter(t,e){this._activeFilter=t,this._rootItems.length>0?this._navigateToFilter(t):(this._rootLoaded=!1,this._loadRoot())}_handleSearchKey(t){if(13===t.keyCode){const t=this.renderRoot.querySelector("#searchInput");(null==t?void 0:t.value)&&this._browser&&(this._browser.searchExternal(t.value),this._searchActive=!1)}}_getProgress(){var t,e,i,s;const o=null===(e=null===(t=this._entity)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.media_duration,r=null===(s=null===(i=this._entity)||void 0===i?void 0:i.attributes)||void 0===s?void 0:s.media_position;return o&&null!=r?Math.min(r/o*100,100):0}_toggleMenu(t,e="header"){t.stopPropagation(),this._menuOpen=this._menuOpen===e?null:e,this._menuOpen&&document.addEventListener("click",()=>{this._menuOpen=null},{once:!0})}_onSourceMenuWheel(t){t.stopPropagation(),t.preventDefault(),t.currentTarget.scrollTop+=t.deltaY}async _selectSource(t){var e,i;const s=null===(i=null===(e=this._entity)||void 0===e?void 0:e.attributes)||void 0===i?void 0:i.remote_player_id;this._menuOpen=null,""!==t&&t!==s&&this._hass.callService("media_player","select_source",{entity_id:this._config.entity_id,source:t})}async _togglePlayPause(){this._hass.callService("media_player","media_play_pause",{entity_id:this._config.entity_id})}async _skipNext(){this._hass.callService("media_player","media_next_track",{entity_id:this._config.entity_id})}static get styles(){return[n`
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

            ytmusic-browser {
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
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 16px 0;
                min-height: 0;
            }

            /* animated colored halo behind the cover */
            .fp-glow {
                position: absolute;
                width: min(var(--fp-glow-size, 100%), 130vw);
                aspect-ratio: 1 / 1;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(255,0,0,0.85) 0%, rgba(255,0,0,0.5) 40%, rgba(255,0,0,0.15) 62%, rgba(255,0,0,0) 78%);
                filter: blur(30px);
                z-index: 0;
                opacity: 0;
                transition: opacity 0.5s ease;
                pointer-events: none;
            }
            .fp-glow.on {
                opacity: 1;
                animation: fp-glow-pulse var(--fp-anim, 6s) ease-in-out infinite,
                           fp-glow-hue var(--fp-hue, 12s) linear infinite;
            }
            @keyframes fp-glow-pulse {
                0%, 100% { transform: scale(0.82); }
                50%      { transform: scale(1.35); }
            }
            @keyframes fp-glow-hue {
                from { filter: blur(30px) hue-rotate(0deg); }
                to   { filter: blur(30px) hue-rotate(360deg); }
            }

            .fp-art {
                position: relative;
                z-index: 1;
                max-width: 100%;
                max-height: 100%;
                border-radius: 50%;
                box-shadow: 0 8px 40px rgba(0,0,0,0.6);
                aspect-ratio: 1/1;
                object-fit: cover;
            }

            .fp-art-ph {
                position: relative;
                z-index: 1;
                width: 240px;
                height: 240px;
                border-radius: 50%;
                background: var(--yt-surface);
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--yt-text2);
            }

            /* undulating "breathing" cover while playing — stays round, never square */
            .fp-art.playing,
            .fp-art-ph.playing {
                animation: fp-ondula var(--fp-anim, 6s) ease-in-out infinite;
            }
            @keyframes fp-ondula {
                0%   { border-radius: 50%; transform: translateY(0) rotate(0deg) scale(1); }
                25%  { border-radius: 40% 60% 55% 45% / 52% 42% 58% 48%; transform: translateY(-11px) rotate(-2.6deg) scale(1.05); }
                50%  { border-radius: 60% 40% 46% 54% / 58% 50% 50% 42%; transform: translateY(8px) rotate(2.2deg) scale(0.94); }
                75%  { border-radius: 46% 54% 60% 40% / 44% 58% 42% 56%; transform: translateY(-6px) rotate(1.8deg) scale(1.03); }
                100% { border-radius: 50%; transform: translateY(0) rotate(0deg) scale(1); }
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

            /* ── FULL PLAYER TABS ── */
            .fp-tabs {
                display: flex;
                border-bottom: 1px solid rgba(255,255,255,0.1);
                flex-shrink: 0;
                margin: 4px -20px 0;
                padding: 0 20px;
            }

            /* quick-access category chips inside the player */
            .fp-chips {
                display: flex;
                gap: 8px;
                overflow-x: auto;
                flex-shrink: 0;
                margin: 0 -20px;
                padding: 10px 20px 2px;
                scrollbar-width: none;
            }
            .fp-chips::-webkit-scrollbar { display: none; }
            .fp-chip {
                flex: 0 0 auto;
                padding: 6px 14px;
                border-radius: 16px;
                background: #1f1f1f;
                border: 1px solid #333;
                color: var(--yt-text, #ddd);
                font-size: 12px;
                font-weight: 600;
                white-space: nowrap;
                cursor: pointer;
            }
            .fp-chip.active {
                background: #fff;
                color: #0f0f0f;
                border-color: #fff;
            }

            .fp-logo {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                font-size: 14px;
                color: var(--yt-text);
            }
            .fp-logo svg { width: 20px; height: 20px; }

            /* chip category popup — semi-transparent bottom sheet, player visible behind */
            .chip-popup-backdrop {
                position: absolute;
                inset: 0;
                z-index: 300;
                background: rgba(0, 0, 0, 0.35);
                display: flex;
                align-items: flex-end;
                animation: cp-fade 0.15s ease;
            }
            @keyframes cp-fade { from { opacity: 0; } to { opacity: 1; } }
            .chip-popup, .chip-popup * { box-sizing: border-box; }
            .chip-popup {
                width: 100%;
                height: 70%;
                max-width: 100%;
                background: rgba(20, 20, 20, 0.9);
                backdrop-filter: blur(18px);
                -webkit-backdrop-filter: blur(18px);
                border-radius: 20px 20px 0 0;
                border-top: 1px solid rgba(255,255,255,0.12);
                padding: 10px 14px 18px;
                display: flex;
                flex-direction: column;
                box-shadow: 0 -12px 40px rgba(0,0,0,0.55);
                animation: cp-slide 0.2s ease;
            }
            .cp-handle {
                width: 42px;
                height: 4px;
                border-radius: 2px;
                background: rgba(255,255,255,0.3);
                margin: 2px auto 10px;
                flex-shrink: 0;
            }
            @keyframes cp-slide { from { transform: translateY(30px); } to { transform: translateY(0); } }
            .cp-head {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 8px;
                margin-bottom: 8px;
                flex-shrink: 0;
            }
            .cp-title { font-size: 16px; font-weight: 700; color: var(--yt-text); }
            .cp-list { flex: 1; min-height: 0; overflow-y: auto; scrollbar-width: none; }
            .cp-list::-webkit-scrollbar { width: 0; display: none; }
            .cp-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 8px 8px;
                border-radius: 8px;
                cursor: pointer;
            }
            .cp-play { margin-right: 2px; }
            .cp-item:hover { background: rgba(255,255,255,0.06); }
            .cp-thumb {
                width: 46px;
                height: 46px;
                border-radius: 6px;
                object-fit: cover;
                flex-shrink: 0;
            }
            .cp-thumb-ph {
                background: var(--yt-surface);
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--yt-text2);
            }
            .cp-info { flex: 1; min-width: 0; }
            .cp-t {
                font-size: 13px;
                font-weight: 600;
                color: var(--yt-text);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .cp-play { color: var(--yt-red, #ff0000); flex-shrink: 0; }
            .cp-more {
                background: none;
                border: none;
                color: var(--yt-text2);
                cursor: pointer;
                flex-shrink: 0;
                padding: 4px;
                border-radius: 50%;
                display: flex;
                --mdc-icon-size: 20px;
            }
            .cp-more:hover { color: #fff; background: rgba(255,255,255,0.1); }

            .cp-grid {
                flex: 1;
                overflow-y: auto;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 14px 12px;
                padding: 4px 2px 8px;
                align-content: start;
                scrollbar-width: none;
            }
            .cp-grid::-webkit-scrollbar { display: none; }
            .cp-tile { cursor: pointer; }
            .cp-tile-art {
                position: relative;
                width: 100%;
                aspect-ratio: 1 / 1;
                border-radius: 12px;
                overflow: hidden;
                background: rgba(255,255,255,0.06);
            }
            .cp-tile-art img { width: 100%; height: 100%; object-fit: cover; display: block; }
            .cp-mosaic {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: 1fr 1fr;
                width: 100%; height: 100%;
            }
            .cp-mosaic img { width: 100%; height: 100%; object-fit: cover; display: block; }
            .cp-tile-ph {
                width: 100%; height: 100%;
                display: flex; align-items: center; justify-content: center;
                color: var(--yt-text2); --mdc-icon-size: 40px;
            }
            .cp-tile-more {
                position: absolute; top: 6px; right: 6px;
                width: 30px; height: 30px;
                border: none; border-radius: 50%;
                background: rgba(0,0,0,0.55);
                color: #fff; cursor: pointer;
                display: flex; align-items: center; justify-content: center;
                --mdc-icon-size: 18px;
            }
            .cp-tile-play {
                position: absolute; bottom: 6px; right: 6px;
                width: 34px; height: 34px; border-radius: 50%;
                background: var(--yt-red, #ff0000); color: #fff;
                display: flex; align-items: center; justify-content: center;
                --mdc-icon-size: 20px;
                opacity: 0; transition: opacity 0.15s;
            }
            .cp-tile:hover .cp-tile-play { opacity: 1; }
            .cp-tile-label {
                margin-top: 6px;
                font-size: 12.5px;
                color: var(--yt-text);
                line-height: 1.25;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .cp-tile-label.bold { font-weight: 600; }
            .enq-menu {
                width: 100%;
                max-width: 100%;
                background: rgba(28, 28, 28, 0.96);
                backdrop-filter: blur(18px);
                -webkit-backdrop-filter: blur(18px);
                border-radius: 20px 20px 0 0;
                border-top: 1px solid rgba(255,255,255,0.12);
                padding: 10px 10px 20px;
                display: flex;
                flex-direction: column;
                box-shadow: 0 -12px 40px rgba(0,0,0,0.6);
                animation: cp-slide 0.2s ease;
            }
            .enq-title {
                font-size: 14px;
                font-weight: 700;
                color: var(--yt-text);
                padding: 4px 10px 10px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                border-bottom: 1px solid rgba(255,255,255,0.08);
                margin-bottom: 4px;
            }
            .enq-opt {
                display: flex;
                align-items: center;
                gap: 14px;
                width: 100%;
                background: none;
                border: none;
                color: var(--yt-text);
                cursor: pointer;
                padding: 13px 12px;
                border-radius: 10px;
                font-size: 14px;
                text-align: left;
                --mdc-icon-size: 22px;
            }
            .enq-opt ha-icon { color: var(--yt-text2); flex-shrink: 0; }
            .enq-opt:hover { background: rgba(255,255,255,0.08); }
            .enq-opt:hover ha-icon { color: var(--yt-red, #ff0000); }

            .pl-row {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 10px 6px;
                border-radius: 12px;
            }
            .pl-row.grouped { background: rgba(255,0,0,0.10); }
            .pl-ico { color: var(--yt-text2); flex-shrink: 0; --mdc-icon-size: 26px; }
            .pl-row.grouped .pl-ico { color: var(--yt-red, #ff0000); }
            .pl-info { flex: 1; min-width: 0; }
            .pl-name {
                font-size: 14px;
                font-weight: 600;
                color: var(--yt-text);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .pl-vol {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-top: 4px;
                --mdc-icon-size: 16px;
                color: var(--yt-text2);
            }
            .pl-vol input[type="range"] {
                flex: 1;
                height: 4px;
                -webkit-appearance: none;
                appearance: none;
                background: rgba(255,255,255,0.2);
                border-radius: 2px;
                accent-color: var(--yt-red, #ff0000);
                cursor: pointer;
            }
            .pl-group {
                background: rgba(255,255,255,0.08);
                border: none;
                color: var(--yt-text2);
                cursor: pointer;
                flex-shrink: 0;
                width: 38px;
                height: 38px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                --mdc-icon-size: 20px;
            }
            .pl-group.on { background: rgba(255,0,0,0.2); color: var(--yt-red, #ff0000); }
            .pl-group:hover { color: #fff; }
            .pl-row.pickable { cursor: pointer; }
            .pl-row.pickable:hover { background: rgba(255,255,255,0.06); }
            .pl-arrow { color: var(--yt-red, #ff0000); flex-shrink: 0; --mdc-icon-size: 26px; }
            .pl-master {
                flex-shrink: 0;
                font-size: 11px;
                font-weight: 700;
                color: var(--yt-red, #ff0000);
                text-transform: uppercase;
                letter-spacing: 0.5px;
                padding-right: 6px;
            }
            .cp-msg {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 34px;
                text-align: center;
                color: var(--yt-text2);
            }
            .cp-search {
                flex: 1;
                min-width: 0;
                background: rgba(255,255,255,0.08);
                border: none;
                border-radius: 10px;
                padding: 9px 12px;
                color: var(--yt-text);
                font-size: 14px;
                outline: none;
            }
            .cp-types {
                display: flex;
                gap: 8px;
                overflow-x: auto;
                justify-content: safe center;
                padding: 6px 8px 10px;
                flex-shrink: 0;
                scrollbar-width: none;
            }
            .cp-types::-webkit-scrollbar { display: none; }

            .fp-tab {
                background: none;
                border: none;
                color: var(--yt-text2);
                font-size: 14px;
                font-weight: 600;
                padding: 10px 18px;
                cursor: pointer;
                border-bottom: 2px solid transparent;
                margin-bottom: -1px;
                transition: color 0.15s;
            }

            .fp-tab.active {
                color: var(--yt-text);
                border-bottom-color: var(--yt-red);
            }

            .fp-tab:hover { color: var(--yt-text); }

            .fp-tab-opts {
                margin-left: auto;
                background: none;
                border: none;
                color: var(--yt-text2);
                cursor: pointer;
                display: flex;
                align-items: center;
                padding: 0 4px;
                --mdc-icon-size: 22px;
            }
            .fp-tab-opts:hover { color: var(--yt-text); }

            /* ── QUEUE LIST ── */
            .fp-queue-list {
                flex: 1;
                overflow-y: auto;
                padding: 8px 0;
                scrollbar-width: thin;
                scrollbar-color: rgba(255,255,255,0.2) transparent;
            }

            .fp-queue-item {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 8px 4px;
                border-radius: 6px;
                cursor: pointer;
                transition: background 0.1s;
            }

            .fp-queue-item:hover { background: rgba(255,255,255,0.06); }
            .fp-queue-item.current { background: rgba(255,255,255,0.08); }

            .fp-qi-thumb {
                width: 42px;
                height: 42px;
                border-radius: 4px;
                object-fit: cover;
                flex-shrink: 0;
            }

            .fp-qi-thumb-ph {
                width: 42px;
                height: 42px;
                border-radius: 4px;
                background: var(--yt-surface2);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                color: var(--yt-text2);
            }

            .fp-qi-info {
                flex: 1;
                min-width: 0;
            }

            .fp-qi-title {
                font-size: 14px;
                font-weight: 500;
                color: var(--yt-text);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .fp-qi-artist {
                font-size: 12px;
                color: var(--yt-text2);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .fp-queue-item.current .fp-qi-title { color: var(--yt-red); }

            .fp-qi-playing {
                color: var(--yt-red);
                flex-shrink: 0;
                --mdc-icon-size: 18px;
            }

            .fp-qi-actions {
                display: flex;
                align-items: center;
                gap: 2px;
                flex-shrink: 0;
                opacity: 0.55;
                transition: opacity 0.15s;
            }
            .fp-queue-item:hover .fp-qi-actions { opacity: 1; }
            .fp-qi-act {
                background: none;
                border: none;
                color: var(--yt-text2);
                cursor: pointer;
                padding: 4px;
                border-radius: 50%;
                display: flex;
                --mdc-icon-size: 18px;
            }
            .fp-qi-act:hover { color: #fff; background: rgba(255,255,255,0.1); }

            .fp-queue-loading, .fp-queue-empty {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--yt-text2);
                font-size: 14px;
            }

            @keyframes spin { to { transform: rotate(360deg); } }
            .spin { animation: spin 1s linear infinite; }

            /* ── MEDIA CONTROL in full player (force dark-theme colors) ── */
            ytmusic-media-control {
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
                overscroll-behavior: contain;
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
        `]}}t([pt()],Xt.prototype,"_config",void 0),t([pt()],Xt.prototype,"_entity",void 0),t([pt()],Xt.prototype,"_menuOpen",void 0),t([pt()],Xt.prototype,"_playerExpanded",void 0),t([pt()],Xt.prototype,"_showQueue",void 0),t([pt()],Xt.prototype,"_queueTracks",void 0),t([pt()],Xt.prototype,"_queueLoading",void 0),t([pt()],Xt.prototype,"_queueCurrentIndex",void 0),t([pt()],Xt.prototype,"_activeFilter",void 0),t([pt()],Xt.prototype,"_popupOpen",void 0),t([pt()],Xt.prototype,"_popupLoading",void 0),t([pt()],Xt.prototype,"_popupItems",void 0),t([pt()],Xt.prototype,"_popupTitle",void 0),t([pt()],Xt.prototype,"_popupStack",void 0),t([pt()],Xt.prototype,"_categories",void 0),t([pt()],Xt.prototype,"_searchOpen",void 0),t([pt()],Xt.prototype,"_searchQuery",void 0),t([pt()],Xt.prototype,"_searchType",void 0),t([pt()],Xt.prototype,"_searchResults",void 0),t([pt()],Xt.prototype,"_searchLoading",void 0),t([pt()],Xt.prototype,"_searchActive",void 0),t([pt()],Xt.prototype,"_enqueueItem",void 0),t([pt()],Xt.prototype,"_playersOpen",void 0),t([pt()],Xt.prototype,"_queueMenuOpen",void 0),t([pt()],Xt.prototype,"_transferMode",void 0),t([
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function(t){return(({finisher:t,descriptor:e})=>(i,s)=>{var o;if(void 0===s){const s=null!==(o=i.originalKey)&&void 0!==o?o:i.key,r=null!=e?{kind:"method",placement:"prototype",key:s,descriptor:e(i.key)}:{...i,key:s};return null!=t&&(r.finisher=function(e){t(e,s)}),r}{const o=i.constructor;void 0!==e&&Object.defineProperty(i,s,e(s)),null==t||t(o,s)}})({descriptor:e=>{const i={get(){var e,i;return null!==(i=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t))&&void 0!==i?i:null},enumerable:!0,configurable:!0};return i}})}("ytmusic-browser")],Xt.prototype,"_browser",void 0),customElements.define("ytmusic-playing-card",Xt),window.customCards=window.customCards||[],window.customCards.push({type:"ytmusic-playing-card",name:"YTMusic Playing",description:"Requires the ytube_media_player integration"});export{Xt as YTMusicPlayingCard,Ot as YTMusicSearchCard};
