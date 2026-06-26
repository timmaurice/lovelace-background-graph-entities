function t(t,e,n,i){var r,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,n,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(s=(o<3?r(s):o>3?r(e,n,s):r(e,n))||s);return o>3&&s&&Object.defineProperty(e,n,s),s}console.groupCollapsed("%c📈 BACKGROUND GRAPH ENTITIES%cv1.8.0","color: orange; font-weight: bold; background: black; padding: 2px 4px; border-radius: 2px 0 0 2px;","color: white; font-weight: bold; background: dimgray; padding: 2px 4px; border-radius: 0 2px 2px 0;"),console.info("The `background-graph-entities` custom component for Home Assistant displays a list of entities with their current state and a mini graph showing the entity's history. This component is ideal for monitoring various sensor data, such as temperature, humidity, or other metrics."),console.info("Github:  https://github.com/timmaurice/lovelace-background-graph-entities.git"),console.info("Sponsor: https://buymeacoffee.com/timmaurice"),console.groupEnd(),"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,n=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let o=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(n&&void 0===t){const n=void 0!==e&&1===e.length;n&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&r.set(e,t))}return t}toString(){return this.cssText}};const s=t=>new o("string"==typeof t?t:t+"",void 0,i),a=(t,...e)=>{const n=1===t.length?t[0]:e.reduce((e,n,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[i+1],t[0]);return new o(n,t,i)},l=n?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return s(e)})(t):t,{is:h,defineProperty:c,getOwnPropertyDescriptor:u,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:g}=Object,f=globalThis,_=f.trustedTypes,m=_?_.emptyScript:"",v=f.reactiveElementPolyfillSupport,y=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=null!==t;break;case Number:n=null===t?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch(t){n=null}}return n}},$=(t,e)=>!h(t,e),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(t,n,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,n){const{get:i,set:r}=u(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);r?.call(this,e),this.requestUpdate(t,o,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const n of e)this.createProperty(n,t[n])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,n]of e)this.elementProperties.set(t,n)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const n=this._$Eu(t,e);void 0!==n&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const n=new Set(t.flat(1/0).reverse());for(const t of n)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const n=e.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const n of e.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(n)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const n of i){const i=document.createElement("style"),r=e.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=n.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,n){this._$AK(t,n)}_$ET(t,e){const n=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,n);if(void 0!==i&&!0===n.reflect){const r=(void 0!==n.converter?.toAttribute?n.converter:b).toAttribute(e,n.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const n=this.constructor,i=n._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=n.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=i;const o=r.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,n,i=!1,r){if(void 0!==t){const o=this.constructor;if(!1===i&&(r=this[t]),n??=o.getPropertyOptions(t),!((n.hasChanged??$)(r,e)||n.useDefault&&n.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,n))))return;this.C(t,e,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:n,reflect:i,wrapped:r},o){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||n||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,n]of t){const{wrapped:t}=n,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,n,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,v?.({ReactiveElement:x}),(f.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C=globalThis,A=t=>t,M=C.trustedTypes,k=M?M.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+S,N=`<${T}>`,D=document,U=()=>D.createComment(""),I=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,H="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,z=/>/g,F=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,q=/"/g,V=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...n)=>({_$litType$:t,strings:e,values:n}))(1),G=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),B=new WeakMap,W=D.createTreeWalker(D,129);function Z(t,e){if(!P(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const X=(t,e)=>{const n=t.length-1,i=[];let r,o=2===e?"<svg>":3===e?"<math>":"",s=O;for(let e=0;e<n;e++){const n=t[e];let a,l,h=-1,c=0;for(;c<n.length&&(s.lastIndex=c,l=s.exec(n),null!==l);)c=s.lastIndex,s===O?"!--"===l[1]?s=L:void 0!==l[1]?s=z:void 0!==l[2]?(V.test(l[2])&&(r=RegExp("</"+l[2],"g")),s=F):void 0!==l[3]&&(s=F):s===F?">"===l[0]?(s=r??O,h=-1):void 0===l[1]?h=-2:(h=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?F:'"'===l[3]?q:R):s===q||s===R?s=F:s===L||s===z?s=O:(s=F,r=void 0);const u=s===F&&t[e+1].startsWith("/>")?" ":"";o+=s===O?n+N:h>=0?(i.push(a),n.slice(0,h)+E+n.slice(h)+S+u):n+S+(-2===h?e:u)}return[Z(t,o+(t[n]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class J{constructor({strings:t,_$litType$:e},n){let i;this.parts=[];let r=0,o=0;const s=t.length-1,a=this.parts,[l,h]=X(t,e);if(this.el=J.createElement(l,n),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=W.nextNode())&&a.length<s;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(E)){const e=h[o++],n=i.getAttribute(t).split(S),s=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:s[2],strings:n,ctor:"."===s[1]?nt:"?"===s[1]?it:"@"===s[1]?rt:et}),i.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(V.test(i.tagName)){const t=i.textContent.split(S),e=t.length-1;if(e>0){i.textContent=M?M.emptyScript:"";for(let n=0;n<e;n++)i.append(t[n],U()),W.nextNode(),a.push({type:2,index:++r});i.append(t[e],U())}}}else if(8===i.nodeType)if(i.data===T)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(S,t+1));)a.push({type:7,index:r}),t+=S.length-1}r++}}static createElement(t,e){const n=D.createElement("template");return n.innerHTML=t,n}}function K(t,e,n=t,i){if(e===G)return e;let r=void 0!==i?n._$Co?.[i]:n._$Cl;const o=I(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,n,i)),void 0!==i?(n._$Co??=[])[i]=r:n._$Cl=r),void 0!==r&&(e=K(t,r._$AS(t,e.values),r,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:n}=this._$AD,i=(t?.creationScope??D).importNode(e,!0);W.currentNode=i;let r=W.nextNode(),o=0,s=0,a=n[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new tt(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new ot(r,this,t)),this._$AV.push(e),a=n[++s]}o!==a?.index&&(r=W.nextNode(),o++)}return W.currentNode=D,i}p(t){let e=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,n,i){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),I(t)?t===Y||null==t||""===t?(this._$AH!==Y&&this._$AR(),this._$AH=Y):t!==this._$AH&&t!==G&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>P(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Y&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(D.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:n}=t,i="number"==typeof n?this._$AC(t):(void 0===n.el&&(n.el=J.createElement(Z(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),n=t.u(this.options);t.p(e),this.T(n),this._$AH=t}}_$AC(t){let e=B.get(t.strings);return void 0===e&&B.set(t.strings,e=new J(t)),e}k(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let n,i=0;for(const r of t)i===e.length?e.push(n=new tt(this.O(U()),this.O(U()),this,this.options)):n=e[i],n._$AI(r),i++;i<e.length&&(this._$AR(n&&n._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,n,i,r){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Y}_$AI(t,e=this,n,i){const r=this.strings;let o=!1;if(void 0===r)t=K(this,t,e,0),o=!I(t)||t!==this._$AH&&t!==G,o&&(this._$AH=t);else{const i=t;let s,a;for(t=r[0],s=0;s<r.length-1;s++)a=K(this,i[n+s],e,s),a===G&&(a=this._$AH[s]),o||=!I(a)||a!==this._$AH[s],a===Y?t=Y:t!==Y&&(t+=(a??"")+r[s+1]),this._$AH[s]=a}o&&!i&&this.j(t)}j(t){t===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class nt extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Y?void 0:t}}class it extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Y)}}class rt extends et{constructor(t,e,n,i,r){super(t,e,n,i,r),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??Y)===G)return;const n=this._$AH,i=t===Y&&n!==Y||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==Y&&(n===Y||i);i&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const st=C.litHtmlPolyfillSupport;st?.(J,tt),(C.litHtmlVersions??=[]).push("3.3.3");const at=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class lt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,n)=>{const i=n?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=n?.renderBefore??null;i._$litPart$=r=new tt(e.insertBefore(U(),t),t,void 0,n??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}}lt._$litElement$=!0,lt.finalized=!0,at.litElementHydrateSupport?.({LitElement:lt});const ht=at.litElementPolyfillSupport;ht?.({LitElement:lt}),(at.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct=t=>(e,n)=>{void 0!==n?n.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ut={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:$},dt=(t=ut,e,n)=>{const{kind:i,metadata:r}=n;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),o.set(n.name,t),"accessor"===i){const{name:i}=n;return{set(n){const r=e.get.call(this);e.set.call(this,n),this.requestUpdate(i,r,t,!0,n)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=n;return function(n){const r=this[i];e.call(this,n),this.requestUpdate(i,r,t,!0,n)}}throw Error("Unsupported decorator location: "+i)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return(e,n)=>"object"==typeof n?dt(t,e,n):((t,e,n)=>{const i=e.hasOwnProperty(n);return e.constructor.createProperty(n,t),i?Object.getOwnPropertyDescriptor(e,n):void 0})(t,e,n)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function gt(t){return pt({...t,state:!0,attribute:!1})}function ft(t,e){return null==t||null==e?NaN:t<e?-1:t>e?1:t>=e?0:NaN}function _t(t,e){return null==t||null==e?NaN:e<t?-1:e>t?1:e>=t?0:NaN}function mt(t){let e,n,i;function r(t,i,r=0,o=t.length){if(r<o){if(0!==e(i,i))return o;do{const e=r+o>>>1;n(t[e],i)<0?r=e+1:o=e}while(r<o)}return r}return 2!==t.length?(e=ft,n=(e,n)=>ft(t(e),n),i=(e,n)=>t(e)-n):(e=t===ft||t===_t?t:vt,n=t,i=t),{left:r,center:function(t,e,n=0,o=t.length){const s=r(t,e,n,o-1);return s>n&&i(t[s-1],e)>-i(t[s],e)?s-1:s},right:function(t,i,r=0,o=t.length){if(r<o){if(0!==e(i,i))return o;do{const e=r+o>>>1;n(t[e],i)<=0?r=e+1:o=e}while(r<o)}return r}}}function vt(){return 0}const yt=mt(ft).right;function bt(t,e){let n,i;if(void 0===e)for(const e of t)null!=e&&(void 0===n?e>=e&&(n=i=e):(n>e&&(n=e),i<e&&(i=e)));else{let r=-1;for(let o of t)null!=(o=e(o,++r,t))&&(void 0===n?o>=o&&(n=i=o):(n>o&&(n=o),i<o&&(i=o)))}return[n,i]}mt(function(t){return null===t?NaN:+t}).center;const $t=Math.sqrt(50),wt=Math.sqrt(10),xt=Math.sqrt(2);function Ct(t,e,n){const i=(e-t)/Math.max(0,n),r=Math.floor(Math.log10(i)),o=i/Math.pow(10,r),s=o>=$t?10:o>=wt?5:o>=xt?2:1;let a,l,h;return r<0?(h=Math.pow(10,-r)/s,a=Math.round(t*h),l=Math.round(e*h),a/h<t&&++a,l/h>e&&--l,h=-h):(h=Math.pow(10,r)*s,a=Math.round(t/h),l=Math.round(e/h),a*h<t&&++a,l*h>e&&--l),l<a&&.5<=n&&n<2?Ct(t,e,2*n):[a,l,h]}function At(t,e,n){return Ct(t=+t,e=+e,n=+n)[2]}function Mt(t,e,n){n=+n;const i=(e=+e)<(t=+t),r=i?At(e,t,n):At(t,e,n);return(i?-1:1)*(r<0?1/-r:r)}function kt(t,e){switch(arguments.length){case 0:break;case 1:this.range(t);break;default:this.range(e).domain(t)}return this}function Et(t,e,n){t.prototype=e.prototype=n,n.constructor=t}function St(t,e){var n=Object.create(t.prototype);for(var i in e)n[i]=e[i];return n}function Tt(){}var Nt=.7,Dt=1/Nt,Ut="\\s*([+-]?\\d+)\\s*",It="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",Pt="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Ht=/^#([0-9a-f]{3,8})$/,Ot=new RegExp(`^rgb\\(${Ut},${Ut},${Ut}\\)$`),Lt=new RegExp(`^rgb\\(${Pt},${Pt},${Pt}\\)$`),zt=new RegExp(`^rgba\\(${Ut},${Ut},${Ut},${It}\\)$`),Ft=new RegExp(`^rgba\\(${Pt},${Pt},${Pt},${It}\\)$`),Rt=new RegExp(`^hsl\\(${It},${Pt},${Pt}\\)$`),qt=new RegExp(`^hsla\\(${It},${Pt},${Pt},${It}\\)$`),Vt={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function jt(){return this.rgb().formatHex()}function Gt(){return this.rgb().formatRgb()}function Yt(t){var e,n;return t=(t+"").trim().toLowerCase(),(e=Ht.exec(t))?(n=e[1].length,e=parseInt(e[1],16),6===n?Bt(e):3===n?new Xt(e>>8&15|e>>4&240,e>>4&15|240&e,(15&e)<<4|15&e,1):8===n?Wt(e>>24&255,e>>16&255,e>>8&255,(255&e)/255):4===n?Wt(e>>12&15|e>>8&240,e>>8&15|e>>4&240,e>>4&15|240&e,((15&e)<<4|15&e)/255):null):(e=Ot.exec(t))?new Xt(e[1],e[2],e[3],1):(e=Lt.exec(t))?new Xt(255*e[1]/100,255*e[2]/100,255*e[3]/100,1):(e=zt.exec(t))?Wt(e[1],e[2],e[3],e[4]):(e=Ft.exec(t))?Wt(255*e[1]/100,255*e[2]/100,255*e[3]/100,e[4]):(e=Rt.exec(t))?ne(e[1],e[2]/100,e[3]/100,1):(e=qt.exec(t))?ne(e[1],e[2]/100,e[3]/100,e[4]):Vt.hasOwnProperty(t)?Bt(Vt[t]):"transparent"===t?new Xt(NaN,NaN,NaN,0):null}function Bt(t){return new Xt(t>>16&255,t>>8&255,255&t,1)}function Wt(t,e,n,i){return i<=0&&(t=e=n=NaN),new Xt(t,e,n,i)}function Zt(t,e,n,i){return 1===arguments.length?function(t){return t instanceof Tt||(t=Yt(t)),t?new Xt((t=t.rgb()).r,t.g,t.b,t.opacity):new Xt}(t):new Xt(t,e,n,null==i?1:i)}function Xt(t,e,n,i){this.r=+t,this.g=+e,this.b=+n,this.opacity=+i}function Jt(){return`#${ee(this.r)}${ee(this.g)}${ee(this.b)}`}function Kt(){const t=Qt(this.opacity);return`${1===t?"rgb(":"rgba("}${te(this.r)}, ${te(this.g)}, ${te(this.b)}${1===t?")":`, ${t})`}`}function Qt(t){return isNaN(t)?1:Math.max(0,Math.min(1,t))}function te(t){return Math.max(0,Math.min(255,Math.round(t)||0))}function ee(t){return((t=te(t))<16?"0":"")+t.toString(16)}function ne(t,e,n,i){return i<=0?t=e=n=NaN:n<=0||n>=1?t=e=NaN:e<=0&&(t=NaN),new re(t,e,n,i)}function ie(t){if(t instanceof re)return new re(t.h,t.s,t.l,t.opacity);if(t instanceof Tt||(t=Yt(t)),!t)return new re;if(t instanceof re)return t;var e=(t=t.rgb()).r/255,n=t.g/255,i=t.b/255,r=Math.min(e,n,i),o=Math.max(e,n,i),s=NaN,a=o-r,l=(o+r)/2;return a?(s=e===o?(n-i)/a+6*(n<i):n===o?(i-e)/a+2:(e-n)/a+4,a/=l<.5?o+r:2-o-r,s*=60):a=l>0&&l<1?0:s,new re(s,a,l,t.opacity)}function re(t,e,n,i){this.h=+t,this.s=+e,this.l=+n,this.opacity=+i}function oe(t){return(t=(t||0)%360)<0?t+360:t}function se(t){return Math.max(0,Math.min(1,t||0))}function ae(t,e,n){return 255*(t<60?e+(n-e)*t/60:t<180?n:t<240?e+(n-e)*(240-t)/60:e)}Et(Tt,Yt,{copy(t){return Object.assign(new this.constructor,this,t)},displayable(){return this.rgb().displayable()},hex:jt,formatHex:jt,formatHex8:function(){return this.rgb().formatHex8()},formatHsl:function(){return ie(this).formatHsl()},formatRgb:Gt,toString:Gt}),Et(Xt,Zt,St(Tt,{brighter(t){return t=null==t?Dt:Math.pow(Dt,t),new Xt(this.r*t,this.g*t,this.b*t,this.opacity)},darker(t){return t=null==t?Nt:Math.pow(Nt,t),new Xt(this.r*t,this.g*t,this.b*t,this.opacity)},rgb(){return this},clamp(){return new Xt(te(this.r),te(this.g),te(this.b),Qt(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Jt,formatHex:Jt,formatHex8:function(){return`#${ee(this.r)}${ee(this.g)}${ee(this.b)}${ee(255*(isNaN(this.opacity)?1:this.opacity))}`},formatRgb:Kt,toString:Kt})),Et(re,function(t,e,n,i){return 1===arguments.length?ie(t):new re(t,e,n,null==i?1:i)},St(Tt,{brighter(t){return t=null==t?Dt:Math.pow(Dt,t),new re(this.h,this.s,this.l*t,this.opacity)},darker(t){return t=null==t?Nt:Math.pow(Nt,t),new re(this.h,this.s,this.l*t,this.opacity)},rgb(){var t=this.h%360+360*(this.h<0),e=isNaN(t)||isNaN(this.s)?0:this.s,n=this.l,i=n+(n<.5?n:1-n)*e,r=2*n-i;return new Xt(ae(t>=240?t-240:t+120,r,i),ae(t,r,i),ae(t<120?t+240:t-120,r,i),this.opacity)},clamp(){return new re(oe(this.h),se(this.s),se(this.l),Qt(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const t=Qt(this.opacity);return`${1===t?"hsl(":"hsla("}${oe(this.h)}, ${100*se(this.s)}%, ${100*se(this.l)}%${1===t?")":`, ${t})`}`}}));var le=t=>()=>t;function he(t){return 1===(t=+t)?ce:function(e,n){return n-e?function(t,e,n){return t=Math.pow(t,n),e=Math.pow(e,n)-t,n=1/n,function(i){return Math.pow(t+i*e,n)}}(e,n,t):le(isNaN(e)?n:e)}}function ce(t,e){var n=e-t;return n?function(t,e){return function(n){return t+n*e}}(t,n):le(isNaN(t)?e:t)}var ue=function t(e){var n=he(e);function i(t,e){var i=n((t=Zt(t)).r,(e=Zt(e)).r),r=n(t.g,e.g),o=n(t.b,e.b),s=ce(t.opacity,e.opacity);return function(e){return t.r=i(e),t.g=r(e),t.b=o(e),t.opacity=s(e),t+""}}return i.gamma=t,i}(1);function de(t,e){e||(e=[]);var n,i=t?Math.min(e.length,t.length):0,r=e.slice();return function(o){for(n=0;n<i;++n)r[n]=t[n]*(1-o)+e[n]*o;return r}}function pe(t,e){var n,i=e?e.length:0,r=t?Math.min(i,t.length):0,o=new Array(r),s=new Array(i);for(n=0;n<r;++n)o[n]=be(t[n],e[n]);for(;n<i;++n)s[n]=e[n];return function(t){for(n=0;n<r;++n)s[n]=o[n](t);return s}}function ge(t,e){var n=new Date;return t=+t,e=+e,function(i){return n.setTime(t*(1-i)+e*i),n}}function fe(t,e){return t=+t,e=+e,function(n){return t*(1-n)+e*n}}function _e(t,e){var n,i={},r={};for(n in null!==t&&"object"==typeof t||(t={}),null!==e&&"object"==typeof e||(e={}),e)n in t?i[n]=be(t[n],e[n]):r[n]=e[n];return function(t){for(n in i)r[n]=i[n](t);return r}}var me=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,ve=new RegExp(me.source,"g");function ye(t,e){var n,i,r,o=me.lastIndex=ve.lastIndex=0,s=-1,a=[],l=[];for(t+="",e+="";(n=me.exec(t))&&(i=ve.exec(e));)(r=i.index)>o&&(r=e.slice(o,r),a[s]?a[s]+=r:a[++s]=r),(n=n[0])===(i=i[0])?a[s]?a[s]+=i:a[++s]=i:(a[++s]=null,l.push({i:s,x:fe(n,i)})),o=ve.lastIndex;return o<e.length&&(r=e.slice(o),a[s]?a[s]+=r:a[++s]=r),a.length<2?l[0]?function(t){return function(e){return t(e)+""}}(l[0].x):function(t){return function(){return t}}(e):(e=l.length,function(t){for(var n,i=0;i<e;++i)a[(n=l[i]).i]=n.x(t);return a.join("")})}function be(t,e){var n,i=typeof e;return null==e||"boolean"===i?le(e):("number"===i?fe:"string"===i?(n=Yt(e))?(e=n,ue):ye:e instanceof Yt?ue:e instanceof Date?ge:function(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}(e)?de:Array.isArray(e)?pe:"function"!=typeof e.valueOf&&"function"!=typeof e.toString||isNaN(e)?_e:fe)(t,e)}function $e(t,e){return t=+t,e=+e,function(n){return Math.round(t*(1-n)+e*n)}}function we(t){return+t}var xe=[0,1];function Ce(t){return t}function Ae(t,e){return(e-=t=+t)?function(n){return(n-t)/e}:function(t){return function(){return t}}(isNaN(e)?NaN:.5)}function Me(t,e,n){var i=t[0],r=t[1],o=e[0],s=e[1];return r<i?(i=Ae(r,i),o=n(s,o)):(i=Ae(i,r),o=n(o,s)),function(t){return o(i(t))}}function ke(t,e,n){var i=Math.min(t.length,e.length)-1,r=new Array(i),o=new Array(i),s=-1;for(t[i]<t[0]&&(t=t.slice().reverse(),e=e.slice().reverse());++s<i;)r[s]=Ae(t[s],t[s+1]),o[s]=n(e[s],e[s+1]);return function(e){var n=yt(t,e,1,i)-1;return o[n](r[n](e))}}function Ee(t,e){return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown())}function Se(){var t,e,n,i,r,o,s=xe,a=xe,l=be,h=Ce;function c(){var t=Math.min(s.length,a.length);return h!==Ce&&(h=function(t,e){var n;return t>e&&(n=t,t=e,e=n),function(n){return Math.max(t,Math.min(e,n))}}(s[0],s[t-1])),i=t>2?ke:Me,r=o=null,u}function u(e){return null==e||isNaN(e=+e)?n:(r||(r=i(s.map(t),a,l)))(t(h(e)))}return u.invert=function(n){return h(e((o||(o=i(a,s.map(t),fe)))(n)))},u.domain=function(t){return arguments.length?(s=Array.from(t,we),c()):s.slice()},u.range=function(t){return arguments.length?(a=Array.from(t),c()):a.slice()},u.rangeRound=function(t){return a=Array.from(t),l=$e,c()},u.clamp=function(t){return arguments.length?(h=!!t||Ce,c()):h!==Ce},u.interpolate=function(t){return arguments.length?(l=t,c()):l},u.unknown=function(t){return arguments.length?(n=t,u):n},function(n,i){return t=n,e=i,c()}}function Te(){return Se()(Ce,Ce)}function Ne(t,e){if(!isFinite(t)||0===t)return null;var n=(t=e?t.toExponential(e-1):t.toExponential()).indexOf("e"),i=t.slice(0,n);return[i.length>1?i[0]+i.slice(2):i,+t.slice(n+1)]}function De(t){return(t=Ne(Math.abs(t)))?t[1]:NaN}var Ue,Ie=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function Pe(t){if(!(e=Ie.exec(t)))throw new Error("invalid format: "+t);var e;return new He({fill:e[1],align:e[2],sign:e[3],symbol:e[4],zero:e[5],width:e[6],comma:e[7],precision:e[8]&&e[8].slice(1),trim:e[9],type:e[10]})}function He(t){this.fill=void 0===t.fill?" ":t.fill+"",this.align=void 0===t.align?">":t.align+"",this.sign=void 0===t.sign?"-":t.sign+"",this.symbol=void 0===t.symbol?"":t.symbol+"",this.zero=!!t.zero,this.width=void 0===t.width?void 0:+t.width,this.comma=!!t.comma,this.precision=void 0===t.precision?void 0:+t.precision,this.trim=!!t.trim,this.type=void 0===t.type?"":t.type+""}function Oe(t,e){var n=Ne(t,e);if(!n)return t+"";var i=n[0],r=n[1];return r<0?"0."+new Array(-r).join("0")+i:i.length>r+1?i.slice(0,r+1)+"."+i.slice(r+1):i+new Array(r-i.length+2).join("0")}Pe.prototype=He.prototype,He.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(void 0===this.width?"":Math.max(1,0|this.width))+(this.comma?",":"")+(void 0===this.precision?"":"."+Math.max(0,0|this.precision))+(this.trim?"~":"")+this.type};var Le={"%":(t,e)=>(100*t).toFixed(e),b:t=>Math.round(t).toString(2),c:t=>t+"",d:function(t){return Math.abs(t=Math.round(t))>=1e21?t.toLocaleString("en").replace(/,/g,""):t.toString(10)},e:(t,e)=>t.toExponential(e),f:(t,e)=>t.toFixed(e),g:(t,e)=>t.toPrecision(e),o:t=>Math.round(t).toString(8),p:(t,e)=>Oe(100*t,e),r:Oe,s:function(t,e){var n=Ne(t,e);if(!n)return Ue=void 0,t.toPrecision(e);var i=n[0],r=n[1],o=r-(Ue=3*Math.max(-8,Math.min(8,Math.floor(r/3))))+1,s=i.length;return o===s?i:o>s?i+new Array(o-s+1).join("0"):o>0?i.slice(0,o)+"."+i.slice(o):"0."+new Array(1-o).join("0")+Ne(t,Math.max(0,e+o-1))[0]},X:t=>Math.round(t).toString(16).toUpperCase(),x:t=>Math.round(t).toString(16)};function ze(t){return t}var Fe,Re,qe,Ve=Array.prototype.map,je=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function Ge(t){var e,n,i=void 0===t.grouping||void 0===t.thousands?ze:(e=Ve.call(t.grouping,Number),n=t.thousands+"",function(t,i){for(var r=t.length,o=[],s=0,a=e[0],l=0;r>0&&a>0&&(l+a+1>i&&(a=Math.max(1,i-l)),o.push(t.substring(r-=a,r+a)),!((l+=a+1)>i));)a=e[s=(s+1)%e.length];return o.reverse().join(n)}),r=void 0===t.currency?"":t.currency[0]+"",o=void 0===t.currency?"":t.currency[1]+"",s=void 0===t.decimal?".":t.decimal+"",a=void 0===t.numerals?ze:function(t){return function(e){return e.replace(/[0-9]/g,function(e){return t[+e]})}}(Ve.call(t.numerals,String)),l=void 0===t.percent?"%":t.percent+"",h=void 0===t.minus?"−":t.minus+"",c=void 0===t.nan?"NaN":t.nan+"";function u(t,e){var n=(t=Pe(t)).fill,u=t.align,d=t.sign,p=t.symbol,g=t.zero,f=t.width,_=t.comma,m=t.precision,v=t.trim,y=t.type;"n"===y?(_=!0,y="g"):Le[y]||(void 0===m&&(m=12),v=!0,y="g"),(g||"0"===n&&"="===u)&&(g=!0,n="0",u="=");var b=(e&&void 0!==e.prefix?e.prefix:"")+("$"===p?r:"#"===p&&/[boxX]/.test(y)?"0"+y.toLowerCase():""),$=("$"===p?o:/[%p]/.test(y)?l:"")+(e&&void 0!==e.suffix?e.suffix:""),w=Le[y],x=/[defgprs%]/.test(y);function C(t){var e,r,o,l=b,p=$;if("c"===y)p=w(t)+p,t="";else{var C=(t=+t)<0||1/t<0;if(t=isNaN(t)?c:w(Math.abs(t),m),v&&(t=function(t){t:for(var e,n=t.length,i=1,r=-1;i<n;++i)switch(t[i]){case".":r=e=i;break;case"0":0===r&&(r=i),e=i;break;default:if(!+t[i])break t;r>0&&(r=0)}return r>0?t.slice(0,r)+t.slice(e+1):t}(t)),C&&0===+t&&"+"!==d&&(C=!1),l=(C?"("===d?d:h:"-"===d||"("===d?"":d)+l,p=("s"!==y||isNaN(t)||void 0===Ue?"":je[8+Ue/3])+p+(C&&"("===d?")":""),x)for(e=-1,r=t.length;++e<r;)if(48>(o=t.charCodeAt(e))||o>57){p=(46===o?s+t.slice(e+1):t.slice(e))+p,t=t.slice(0,e);break}}_&&!g&&(t=i(t,1/0));var A=l.length+t.length+p.length,M=A<f?new Array(f-A+1).join(n):"";switch(_&&g&&(t=i(M+t,M.length?f-p.length:1/0),M=""),u){case"<":t=l+t+p+M;break;case"=":t=l+M+t+p;break;case"^":t=M.slice(0,A=M.length>>1)+l+t+p+M.slice(A);break;default:t=M+l+t+p}return a(t)}return m=void 0===m?6:/[gprs]/.test(y)?Math.max(1,Math.min(21,m)):Math.max(0,Math.min(20,m)),C.toString=function(){return t+""},C}return{format:u,formatPrefix:function(t,e){var n=3*Math.max(-8,Math.min(8,Math.floor(De(e)/3))),i=Math.pow(10,-n),r=u(((t=Pe(t)).type="f",t),{suffix:je[8+n/3]});return function(t){return r(i*t)}}}}function Ye(t,e,n,i){var r,o=Mt(t,e,n);switch((i=Pe(null==i?",f":i)).type){case"s":var s=Math.max(Math.abs(t),Math.abs(e));return null!=i.precision||isNaN(r=function(t,e){return Math.max(0,3*Math.max(-8,Math.min(8,Math.floor(De(e)/3)))-De(Math.abs(t)))}(o,s))||(i.precision=r),qe(i,s);case"":case"e":case"g":case"p":case"r":null!=i.precision||isNaN(r=function(t,e){return t=Math.abs(t),e=Math.abs(e)-t,Math.max(0,De(e)-De(t))+1}(o,Math.max(Math.abs(t),Math.abs(e))))||(i.precision=r-("e"===i.type));break;case"f":case"%":null!=i.precision||isNaN(r=function(t){return Math.max(0,-De(Math.abs(t)))}(o))||(i.precision=r-2*("%"===i.type))}return Re(i)}function Be(t){var e=t.domain;return t.ticks=function(t){var n=e();return function(t,e,n){if(!((n=+n)>0))return[];if((t=+t)===(e=+e))return[t];const i=e<t,[r,o,s]=i?Ct(e,t,n):Ct(t,e,n);if(!(o>=r))return[];const a=o-r+1,l=new Array(a);if(i)if(s<0)for(let t=0;t<a;++t)l[t]=(o-t)/-s;else for(let t=0;t<a;++t)l[t]=(o-t)*s;else if(s<0)for(let t=0;t<a;++t)l[t]=(r+t)/-s;else for(let t=0;t<a;++t)l[t]=(r+t)*s;return l}(n[0],n[n.length-1],null==t?10:t)},t.tickFormat=function(t,n){var i=e();return Ye(i[0],i[i.length-1],null==t?10:t,n)},t.nice=function(n){null==n&&(n=10);var i,r,o=e(),s=0,a=o.length-1,l=o[s],h=o[a],c=10;for(h<l&&(r=l,l=h,h=r,r=s,s=a,a=r);c-- >0;){if((r=At(l,h,n))===i)return o[s]=l,o[a]=h,e(o);if(r>0)l=Math.floor(l/r)*r,h=Math.ceil(h/r)*r;else{if(!(r<0))break;l=Math.ceil(l*r)/r,h=Math.floor(h*r)/r}i=r}return t},t}function We(){var t=Te();return t.copy=function(){return Ee(t,We())},kt.apply(t,arguments),Be(t)}Fe=Ge({thousands:",",grouping:[3],currency:["$",""]}),Re=Fe.format,qe=Fe.formatPrefix;const Ze=new Date,Xe=new Date;function Je(t,e,n,i){function r(e){return t(e=0===arguments.length?new Date:new Date(+e)),e}return r.floor=e=>(t(e=new Date(+e)),e),r.ceil=n=>(t(n=new Date(n-1)),e(n,1),t(n),n),r.round=t=>{const e=r(t),n=r.ceil(t);return t-e<n-t?e:n},r.offset=(t,n)=>(e(t=new Date(+t),null==n?1:Math.floor(n)),t),r.range=(n,i,o)=>{const s=[];if(n=r.ceil(n),o=null==o?1:Math.floor(o),!(n<i&&o>0))return s;let a;do{s.push(a=new Date(+n)),e(n,o),t(n)}while(a<n&&n<i);return s},r.filter=n=>Je(e=>{if(e>=e)for(;t(e),!n(e);)e.setTime(e-1)},(t,i)=>{if(t>=t)if(i<0)for(;++i<=0;)for(;e(t,-1),!n(t););else for(;--i>=0;)for(;e(t,1),!n(t););}),n&&(r.count=(e,i)=>(Ze.setTime(+e),Xe.setTime(+i),t(Ze),t(Xe),Math.floor(n(Ze,Xe))),r.every=t=>(t=Math.floor(t),isFinite(t)&&t>0?t>1?r.filter(i?e=>i(e)%t===0:e=>r.count(0,e)%t===0):r:null)),r}const Ke=Je(()=>{},(t,e)=>{t.setTime(+t+e)},(t,e)=>e-t);Ke.every=t=>(t=Math.floor(t),isFinite(t)&&t>0?t>1?Je(e=>{e.setTime(Math.floor(e/t)*t)},(e,n)=>{e.setTime(+e+n*t)},(e,n)=>(n-e)/t):Ke:null),Ke.range;const Qe=1e3,tn=6e4,en=36e5,nn=864e5,rn=6048e5,on=2592e6,sn=31536e6,an=Je(t=>{t.setTime(t-t.getMilliseconds())},(t,e)=>{t.setTime(+t+e*Qe)},(t,e)=>(e-t)/Qe,t=>t.getUTCSeconds());an.range;const ln=Je(t=>{t.setTime(t-t.getMilliseconds()-t.getSeconds()*Qe)},(t,e)=>{t.setTime(+t+e*tn)},(t,e)=>(e-t)/tn,t=>t.getMinutes());ln.range;const hn=Je(t=>{t.setUTCSeconds(0,0)},(t,e)=>{t.setTime(+t+e*tn)},(t,e)=>(e-t)/tn,t=>t.getUTCMinutes());hn.range;const cn=Je(t=>{t.setTime(t-t.getMilliseconds()-t.getSeconds()*Qe-t.getMinutes()*tn)},(t,e)=>{t.setTime(+t+e*en)},(t,e)=>(e-t)/en,t=>t.getHours());cn.range;const un=Je(t=>{t.setUTCMinutes(0,0,0)},(t,e)=>{t.setTime(+t+e*en)},(t,e)=>(e-t)/en,t=>t.getUTCHours());un.range;const dn=Je(t=>t.setHours(0,0,0,0),(t,e)=>t.setDate(t.getDate()+e),(t,e)=>(e-t-(e.getTimezoneOffset()-t.getTimezoneOffset())*tn)/nn,t=>t.getDate()-1);dn.range;const pn=Je(t=>{t.setUTCHours(0,0,0,0)},(t,e)=>{t.setUTCDate(t.getUTCDate()+e)},(t,e)=>(e-t)/nn,t=>t.getUTCDate()-1);pn.range;const gn=Je(t=>{t.setUTCHours(0,0,0,0)},(t,e)=>{t.setUTCDate(t.getUTCDate()+e)},(t,e)=>(e-t)/nn,t=>Math.floor(t/nn));function fn(t){return Je(e=>{e.setDate(e.getDate()-(e.getDay()+7-t)%7),e.setHours(0,0,0,0)},(t,e)=>{t.setDate(t.getDate()+7*e)},(t,e)=>(e-t-(e.getTimezoneOffset()-t.getTimezoneOffset())*tn)/rn)}gn.range;const _n=fn(0),mn=fn(1),vn=fn(2),yn=fn(3),bn=fn(4),$n=fn(5),wn=fn(6);function xn(t){return Je(e=>{e.setUTCDate(e.getUTCDate()-(e.getUTCDay()+7-t)%7),e.setUTCHours(0,0,0,0)},(t,e)=>{t.setUTCDate(t.getUTCDate()+7*e)},(t,e)=>(e-t)/rn)}_n.range,mn.range,vn.range,yn.range,bn.range,$n.range,wn.range;const Cn=xn(0),An=xn(1),Mn=xn(2),kn=xn(3),En=xn(4),Sn=xn(5),Tn=xn(6);Cn.range,An.range,Mn.range,kn.range,En.range,Sn.range,Tn.range;const Nn=Je(t=>{t.setDate(1),t.setHours(0,0,0,0)},(t,e)=>{t.setMonth(t.getMonth()+e)},(t,e)=>e.getMonth()-t.getMonth()+12*(e.getFullYear()-t.getFullYear()),t=>t.getMonth());Nn.range;const Dn=Je(t=>{t.setUTCDate(1),t.setUTCHours(0,0,0,0)},(t,e)=>{t.setUTCMonth(t.getUTCMonth()+e)},(t,e)=>e.getUTCMonth()-t.getUTCMonth()+12*(e.getUTCFullYear()-t.getUTCFullYear()),t=>t.getUTCMonth());Dn.range;const Un=Je(t=>{t.setMonth(0,1),t.setHours(0,0,0,0)},(t,e)=>{t.setFullYear(t.getFullYear()+e)},(t,e)=>e.getFullYear()-t.getFullYear(),t=>t.getFullYear());Un.every=t=>isFinite(t=Math.floor(t))&&t>0?Je(e=>{e.setFullYear(Math.floor(e.getFullYear()/t)*t),e.setMonth(0,1),e.setHours(0,0,0,0)},(e,n)=>{e.setFullYear(e.getFullYear()+n*t)}):null,Un.range;const In=Je(t=>{t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)},(t,e)=>{t.setUTCFullYear(t.getUTCFullYear()+e)},(t,e)=>e.getUTCFullYear()-t.getUTCFullYear(),t=>t.getUTCFullYear());In.every=t=>isFinite(t=Math.floor(t))&&t>0?Je(e=>{e.setUTCFullYear(Math.floor(e.getUTCFullYear()/t)*t),e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0)},(e,n)=>{e.setUTCFullYear(e.getUTCFullYear()+n*t)}):null,In.range;const[Pn,Hn]=function(t,e,n,i,r,o){const s=[[an,1,Qe],[an,5,5e3],[an,15,15e3],[an,30,3e4],[o,1,tn],[o,5,3e5],[o,15,9e5],[o,30,18e5],[r,1,en],[r,3,108e5],[r,6,216e5],[r,12,432e5],[i,1,nn],[i,2,1728e5],[n,1,rn],[e,1,on],[e,3,7776e6],[t,1,sn]];function a(e,n,i){const r=Math.abs(n-e)/i,o=mt(([,,t])=>t).right(s,r);if(o===s.length)return t.every(Mt(e/sn,n/sn,i));if(0===o)return Ke.every(Math.max(Mt(e,n,i),1));const[a,l]=s[r/s[o-1][2]<s[o][2]/r?o-1:o];return a.every(l)}return[function(t,e,n){const i=e<t;i&&([t,e]=[e,t]);const r=n&&"function"==typeof n.range?n:a(t,e,n),o=r?r.range(t,+e+1):[];return i?o.reverse():o},a]}(Un,Nn,_n,dn,cn,ln);function On(t){if(0<=t.y&&t.y<100){var e=new Date(-1,t.m,t.d,t.H,t.M,t.S,t.L);return e.setFullYear(t.y),e}return new Date(t.y,t.m,t.d,t.H,t.M,t.S,t.L)}function Ln(t){if(0<=t.y&&t.y<100){var e=new Date(Date.UTC(-1,t.m,t.d,t.H,t.M,t.S,t.L));return e.setUTCFullYear(t.y),e}return new Date(Date.UTC(t.y,t.m,t.d,t.H,t.M,t.S,t.L))}function zn(t,e,n){return{y:t,m:e,d:n,H:0,M:0,S:0,L:0}}var Fn,Rn,qn={"-":"",_:" ",0:"0"},Vn=/^\s*\d+/,jn=/^%/,Gn=/[\\^$*+?|[\]().{}]/g;function Yn(t,e,n){var i=t<0?"-":"",r=(i?-t:t)+"",o=r.length;return i+(o<n?new Array(n-o+1).join(e)+r:r)}function Bn(t){return t.replace(Gn,"\\$&")}function Wn(t){return new RegExp("^(?:"+t.map(Bn).join("|")+")","i")}function Zn(t){return new Map(t.map((t,e)=>[t.toLowerCase(),e]))}function Xn(t,e,n){var i=Vn.exec(e.slice(n,n+1));return i?(t.w=+i[0],n+i[0].length):-1}function Jn(t,e,n){var i=Vn.exec(e.slice(n,n+1));return i?(t.u=+i[0],n+i[0].length):-1}function Kn(t,e,n){var i=Vn.exec(e.slice(n,n+2));return i?(t.U=+i[0],n+i[0].length):-1}function Qn(t,e,n){var i=Vn.exec(e.slice(n,n+2));return i?(t.V=+i[0],n+i[0].length):-1}function ti(t,e,n){var i=Vn.exec(e.slice(n,n+2));return i?(t.W=+i[0],n+i[0].length):-1}function ei(t,e,n){var i=Vn.exec(e.slice(n,n+4));return i?(t.y=+i[0],n+i[0].length):-1}function ni(t,e,n){var i=Vn.exec(e.slice(n,n+2));return i?(t.y=+i[0]+(+i[0]>68?1900:2e3),n+i[0].length):-1}function ii(t,e,n){var i=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n,n+6));return i?(t.Z=i[1]?0:-(i[2]+(i[3]||"00")),n+i[0].length):-1}function ri(t,e,n){var i=Vn.exec(e.slice(n,n+1));return i?(t.q=3*i[0]-3,n+i[0].length):-1}function oi(t,e,n){var i=Vn.exec(e.slice(n,n+2));return i?(t.m=i[0]-1,n+i[0].length):-1}function si(t,e,n){var i=Vn.exec(e.slice(n,n+2));return i?(t.d=+i[0],n+i[0].length):-1}function ai(t,e,n){var i=Vn.exec(e.slice(n,n+3));return i?(t.m=0,t.d=+i[0],n+i[0].length):-1}function li(t,e,n){var i=Vn.exec(e.slice(n,n+2));return i?(t.H=+i[0],n+i[0].length):-1}function hi(t,e,n){var i=Vn.exec(e.slice(n,n+2));return i?(t.M=+i[0],n+i[0].length):-1}function ci(t,e,n){var i=Vn.exec(e.slice(n,n+2));return i?(t.S=+i[0],n+i[0].length):-1}function ui(t,e,n){var i=Vn.exec(e.slice(n,n+3));return i?(t.L=+i[0],n+i[0].length):-1}function di(t,e,n){var i=Vn.exec(e.slice(n,n+6));return i?(t.L=Math.floor(i[0]/1e3),n+i[0].length):-1}function pi(t,e,n){var i=jn.exec(e.slice(n,n+1));return i?n+i[0].length:-1}function gi(t,e,n){var i=Vn.exec(e.slice(n));return i?(t.Q=+i[0],n+i[0].length):-1}function fi(t,e,n){var i=Vn.exec(e.slice(n));return i?(t.s=+i[0],n+i[0].length):-1}function _i(t,e){return Yn(t.getDate(),e,2)}function mi(t,e){return Yn(t.getHours(),e,2)}function vi(t,e){return Yn(t.getHours()%12||12,e,2)}function yi(t,e){return Yn(1+dn.count(Un(t),t),e,3)}function bi(t,e){return Yn(t.getMilliseconds(),e,3)}function $i(t,e){return bi(t,e)+"000"}function wi(t,e){return Yn(t.getMonth()+1,e,2)}function xi(t,e){return Yn(t.getMinutes(),e,2)}function Ci(t,e){return Yn(t.getSeconds(),e,2)}function Ai(t){var e=t.getDay();return 0===e?7:e}function Mi(t,e){return Yn(_n.count(Un(t)-1,t),e,2)}function ki(t){var e=t.getDay();return e>=4||0===e?bn(t):bn.ceil(t)}function Ei(t,e){return t=ki(t),Yn(bn.count(Un(t),t)+(4===Un(t).getDay()),e,2)}function Si(t){return t.getDay()}function Ti(t,e){return Yn(mn.count(Un(t)-1,t),e,2)}function Ni(t,e){return Yn(t.getFullYear()%100,e,2)}function Di(t,e){return Yn((t=ki(t)).getFullYear()%100,e,2)}function Ui(t,e){return Yn(t.getFullYear()%1e4,e,4)}function Ii(t,e){var n=t.getDay();return Yn((t=n>=4||0===n?bn(t):bn.ceil(t)).getFullYear()%1e4,e,4)}function Pi(t){var e=t.getTimezoneOffset();return(e>0?"-":(e*=-1,"+"))+Yn(e/60|0,"0",2)+Yn(e%60,"0",2)}function Hi(t,e){return Yn(t.getUTCDate(),e,2)}function Oi(t,e){return Yn(t.getUTCHours(),e,2)}function Li(t,e){return Yn(t.getUTCHours()%12||12,e,2)}function zi(t,e){return Yn(1+pn.count(In(t),t),e,3)}function Fi(t,e){return Yn(t.getUTCMilliseconds(),e,3)}function Ri(t,e){return Fi(t,e)+"000"}function qi(t,e){return Yn(t.getUTCMonth()+1,e,2)}function Vi(t,e){return Yn(t.getUTCMinutes(),e,2)}function ji(t,e){return Yn(t.getUTCSeconds(),e,2)}function Gi(t){var e=t.getUTCDay();return 0===e?7:e}function Yi(t,e){return Yn(Cn.count(In(t)-1,t),e,2)}function Bi(t){var e=t.getUTCDay();return e>=4||0===e?En(t):En.ceil(t)}function Wi(t,e){return t=Bi(t),Yn(En.count(In(t),t)+(4===In(t).getUTCDay()),e,2)}function Zi(t){return t.getUTCDay()}function Xi(t,e){return Yn(An.count(In(t)-1,t),e,2)}function Ji(t,e){return Yn(t.getUTCFullYear()%100,e,2)}function Ki(t,e){return Yn((t=Bi(t)).getUTCFullYear()%100,e,2)}function Qi(t,e){return Yn(t.getUTCFullYear()%1e4,e,4)}function tr(t,e){var n=t.getUTCDay();return Yn((t=n>=4||0===n?En(t):En.ceil(t)).getUTCFullYear()%1e4,e,4)}function er(){return"+0000"}function nr(){return"%"}function ir(t){return+t}function rr(t){return Math.floor(+t/1e3)}function or(t){return new Date(t)}function sr(t){return t instanceof Date?+t:+new Date(+t)}function ar(t,e,n,i,r,o,s,a,l,h){var c=Te(),u=c.invert,d=c.domain,p=h(".%L"),g=h(":%S"),f=h("%I:%M"),_=h("%I %p"),m=h("%a %d"),v=h("%b %d"),y=h("%B"),b=h("%Y");function $(t){return(l(t)<t?p:a(t)<t?g:s(t)<t?f:o(t)<t?_:i(t)<t?r(t)<t?m:v:n(t)<t?y:b)(t)}return c.invert=function(t){return new Date(u(t))},c.domain=function(t){return arguments.length?d(Array.from(t,sr)):d().map(or)},c.ticks=function(e){var n=d();return t(n[0],n[n.length-1],null==e?10:e)},c.tickFormat=function(t,e){return null==e?$:h(e)},c.nice=function(t){var n=d();return t&&"function"==typeof t.range||(t=e(n[0],n[n.length-1],null==t?10:t)),t?d(function(t,e){var n,i=0,r=(t=t.slice()).length-1,o=t[i],s=t[r];return s<o&&(n=i,i=r,r=n,n=o,o=s,s=n),t[i]=e.floor(o),t[r]=e.ceil(s),t}(n,t)):c},c.copy=function(){return Ee(c,ar(t,e,n,i,r,o,s,a,l,h))},c}function lr(){return kt.apply(ar(Pn,Hn,Un,Nn,_n,dn,cn,ln,an,Rn).domain([new Date(2e3,0,1),new Date(2e3,0,2)]),arguments)}!function(t){Fn=function(t){var e=t.dateTime,n=t.date,i=t.time,r=t.periods,o=t.days,s=t.shortDays,a=t.months,l=t.shortMonths,h=Wn(r),c=Zn(r),u=Wn(o),d=Zn(o),p=Wn(s),g=Zn(s),f=Wn(a),_=Zn(a),m=Wn(l),v=Zn(l),y={a:function(t){return s[t.getDay()]},A:function(t){return o[t.getDay()]},b:function(t){return l[t.getMonth()]},B:function(t){return a[t.getMonth()]},c:null,d:_i,e:_i,f:$i,g:Di,G:Ii,H:mi,I:vi,j:yi,L:bi,m:wi,M:xi,p:function(t){return r[+(t.getHours()>=12)]},q:function(t){return 1+~~(t.getMonth()/3)},Q:ir,s:rr,S:Ci,u:Ai,U:Mi,V:Ei,w:Si,W:Ti,x:null,X:null,y:Ni,Y:Ui,Z:Pi,"%":nr},b={a:function(t){return s[t.getUTCDay()]},A:function(t){return o[t.getUTCDay()]},b:function(t){return l[t.getUTCMonth()]},B:function(t){return a[t.getUTCMonth()]},c:null,d:Hi,e:Hi,f:Ri,g:Ki,G:tr,H:Oi,I:Li,j:zi,L:Fi,m:qi,M:Vi,p:function(t){return r[+(t.getUTCHours()>=12)]},q:function(t){return 1+~~(t.getUTCMonth()/3)},Q:ir,s:rr,S:ji,u:Gi,U:Yi,V:Wi,w:Zi,W:Xi,x:null,X:null,y:Ji,Y:Qi,Z:er,"%":nr},$={a:function(t,e,n){var i=p.exec(e.slice(n));return i?(t.w=g.get(i[0].toLowerCase()),n+i[0].length):-1},A:function(t,e,n){var i=u.exec(e.slice(n));return i?(t.w=d.get(i[0].toLowerCase()),n+i[0].length):-1},b:function(t,e,n){var i=m.exec(e.slice(n));return i?(t.m=v.get(i[0].toLowerCase()),n+i[0].length):-1},B:function(t,e,n){var i=f.exec(e.slice(n));return i?(t.m=_.get(i[0].toLowerCase()),n+i[0].length):-1},c:function(t,n,i){return C(t,e,n,i)},d:si,e:si,f:di,g:ni,G:ei,H:li,I:li,j:ai,L:ui,m:oi,M:hi,p:function(t,e,n){var i=h.exec(e.slice(n));return i?(t.p=c.get(i[0].toLowerCase()),n+i[0].length):-1},q:ri,Q:gi,s:fi,S:ci,u:Jn,U:Kn,V:Qn,w:Xn,W:ti,x:function(t,e,i){return C(t,n,e,i)},X:function(t,e,n){return C(t,i,e,n)},y:ni,Y:ei,Z:ii,"%":pi};function w(t,e){return function(n){var i,r,o,s=[],a=-1,l=0,h=t.length;for(n instanceof Date||(n=new Date(+n));++a<h;)37===t.charCodeAt(a)&&(s.push(t.slice(l,a)),null!=(r=qn[i=t.charAt(++a)])?i=t.charAt(++a):r="e"===i?" ":"0",(o=e[i])&&(i=o(n,r)),s.push(i),l=a+1);return s.push(t.slice(l,a)),s.join("")}}function x(t,e){return function(n){var i,r,o=zn(1900,void 0,1);if(C(o,t,n+="",0)!=n.length)return null;if("Q"in o)return new Date(o.Q);if("s"in o)return new Date(1e3*o.s+("L"in o?o.L:0));if(e&&!("Z"in o)&&(o.Z=0),"p"in o&&(o.H=o.H%12+12*o.p),void 0===o.m&&(o.m="q"in o?o.q:0),"V"in o){if(o.V<1||o.V>53)return null;"w"in o||(o.w=1),"Z"in o?(r=(i=Ln(zn(o.y,0,1))).getUTCDay(),i=r>4||0===r?An.ceil(i):An(i),i=pn.offset(i,7*(o.V-1)),o.y=i.getUTCFullYear(),o.m=i.getUTCMonth(),o.d=i.getUTCDate()+(o.w+6)%7):(r=(i=On(zn(o.y,0,1))).getDay(),i=r>4||0===r?mn.ceil(i):mn(i),i=dn.offset(i,7*(o.V-1)),o.y=i.getFullYear(),o.m=i.getMonth(),o.d=i.getDate()+(o.w+6)%7)}else("W"in o||"U"in o)&&("w"in o||(o.w="u"in o?o.u%7:"W"in o?1:0),r="Z"in o?Ln(zn(o.y,0,1)).getUTCDay():On(zn(o.y,0,1)).getDay(),o.m=0,o.d="W"in o?(o.w+6)%7+7*o.W-(r+5)%7:o.w+7*o.U-(r+6)%7);return"Z"in o?(o.H+=o.Z/100|0,o.M+=o.Z%100,Ln(o)):On(o)}}function C(t,e,n,i){for(var r,o,s=0,a=e.length,l=n.length;s<a;){if(i>=l)return-1;if(37===(r=e.charCodeAt(s++))){if(r=e.charAt(s++),!(o=$[r in qn?e.charAt(s++):r])||(i=o(t,n,i))<0)return-1}else if(r!=n.charCodeAt(i++))return-1}return i}return y.x=w(n,y),y.X=w(i,y),y.c=w(e,y),b.x=w(n,b),b.X=w(i,b),b.c=w(e,b),{format:function(t){var e=w(t+="",y);return e.toString=function(){return t},e},parse:function(t){var e=x(t+="",!1);return e.toString=function(){return t},e},utcFormat:function(t){var e=w(t+="",b);return e.toString=function(){return t},e},utcParse:function(t){var e=x(t+="",!0);return e.toString=function(){return t},e}}}(t),Rn=Fn.format,Fn.parse,Fn.utcFormat,Fn.utcParse}({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});var hr="http://www.w3.org/1999/xhtml",cr={svg:"http://www.w3.org/2000/svg",xhtml:hr,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function ur(t){var e=t+="",n=e.indexOf(":");return n>=0&&"xmlns"!==(e=t.slice(0,n))&&(t=t.slice(n+1)),cr.hasOwnProperty(e)?{space:cr[e],local:t}:t}function dr(t){return function(){var e=this.ownerDocument,n=this.namespaceURI;return n===hr&&e.documentElement.namespaceURI===hr?e.createElement(t):e.createElementNS(n,t)}}function pr(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function gr(t){var e=ur(t);return(e.local?pr:dr)(e)}function fr(){}function _r(t){return null==t?fr:function(){return this.querySelector(t)}}function mr(){return[]}function vr(t){return function(){return function(t){return null==t?[]:Array.isArray(t)?t:Array.from(t)}(t.apply(this,arguments))}}function yr(t){return function(e){return e.matches(t)}}var br=Array.prototype.find;function $r(){return this.firstElementChild}var wr=Array.prototype.filter;function xr(){return Array.from(this.children)}function Cr(t){return new Array(t.length)}function Ar(t,e){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=e}function Mr(t,e,n,i,r,o){for(var s,a=0,l=e.length,h=o.length;a<h;++a)(s=e[a])?(s.__data__=o[a],i[a]=s):n[a]=new Ar(t,o[a]);for(;a<l;++a)(s=e[a])&&(r[a]=s)}function kr(t,e,n,i,r,o,s){var a,l,h,c=new Map,u=e.length,d=o.length,p=new Array(u);for(a=0;a<u;++a)(l=e[a])&&(p[a]=h=s.call(l,l.__data__,a,e)+"",c.has(h)?r[a]=l:c.set(h,l));for(a=0;a<d;++a)h=s.call(t,o[a],a,o)+"",(l=c.get(h))?(i[a]=l,l.__data__=o[a],c.delete(h)):n[a]=new Ar(t,o[a]);for(a=0;a<u;++a)(l=e[a])&&c.get(p[a])===l&&(r[a]=l)}function Er(t){return t.__data__}function Sr(t){return"object"==typeof t&&"length"in t?t:Array.from(t)}function Tr(t,e){return t<e?-1:t>e?1:t>=e?0:NaN}function Nr(t){return function(){this.removeAttribute(t)}}function Dr(t){return function(){this.removeAttributeNS(t.space,t.local)}}function Ur(t,e){return function(){this.setAttribute(t,e)}}function Ir(t,e){return function(){this.setAttributeNS(t.space,t.local,e)}}function Pr(t,e){return function(){var n=e.apply(this,arguments);null==n?this.removeAttribute(t):this.setAttribute(t,n)}}function Hr(t,e){return function(){var n=e.apply(this,arguments);null==n?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,n)}}function Or(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView}function Lr(t){return function(){this.style.removeProperty(t)}}function zr(t,e,n){return function(){this.style.setProperty(t,e,n)}}function Fr(t,e,n){return function(){var i=e.apply(this,arguments);null==i?this.style.removeProperty(t):this.style.setProperty(t,i,n)}}function Rr(t){return function(){delete this[t]}}function qr(t,e){return function(){this[t]=e}}function Vr(t,e){return function(){var n=e.apply(this,arguments);null==n?delete this[t]:this[t]=n}}function jr(t){return t.trim().split(/^|\s+/)}function Gr(t){return t.classList||new Yr(t)}function Yr(t){this._node=t,this._names=jr(t.getAttribute("class")||"")}function Br(t,e){for(var n=Gr(t),i=-1,r=e.length;++i<r;)n.add(e[i])}function Wr(t,e){for(var n=Gr(t),i=-1,r=e.length;++i<r;)n.remove(e[i])}function Zr(t){return function(){Br(this,t)}}function Xr(t){return function(){Wr(this,t)}}function Jr(t,e){return function(){(e.apply(this,arguments)?Br:Wr)(this,t)}}function Kr(){this.textContent=""}function Qr(t){return function(){this.textContent=t}}function to(t){return function(){var e=t.apply(this,arguments);this.textContent=null==e?"":e}}function eo(){this.innerHTML=""}function no(t){return function(){this.innerHTML=t}}function io(t){return function(){var e=t.apply(this,arguments);this.innerHTML=null==e?"":e}}function ro(){this.nextSibling&&this.parentNode.appendChild(this)}function oo(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function so(){return null}function ao(){var t=this.parentNode;t&&t.removeChild(this)}function lo(){var t=this.cloneNode(!1),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}function ho(){var t=this.cloneNode(!0),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}function co(t){return function(){var e=this.__on;if(e){for(var n,i=0,r=-1,o=e.length;i<o;++i)n=e[i],t.type&&n.type!==t.type||n.name!==t.name?e[++r]=n:this.removeEventListener(n.type,n.listener,n.options);++r?e.length=r:delete this.__on}}}function uo(t,e,n){return function(){var i,r=this.__on,o=function(t){return function(e){t.call(this,e,this.__data__)}}(e);if(r)for(var s=0,a=r.length;s<a;++s)if((i=r[s]).type===t.type&&i.name===t.name)return this.removeEventListener(i.type,i.listener,i.options),this.addEventListener(i.type,i.listener=o,i.options=n),void(i.value=e);this.addEventListener(t.type,o,n),i={type:t.type,name:t.name,value:e,listener:o,options:n},r?r.push(i):this.__on=[i]}}function po(t,e,n){var i=Or(t),r=i.CustomEvent;"function"==typeof r?r=new r(e,n):(r=i.document.createEvent("Event"),n?(r.initEvent(e,n.bubbles,n.cancelable),r.detail=n.detail):r.initEvent(e,!1,!1)),t.dispatchEvent(r)}function go(t,e){return function(){return po(this,t,e)}}function fo(t,e){return function(){return po(this,t,e.apply(this,arguments))}}Ar.prototype={constructor:Ar,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,e){return this._parent.insertBefore(t,e)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}},Yr.prototype={add:function(t){this._names.indexOf(t)<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var e=this._names.indexOf(t);e>=0&&(this._names.splice(e,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};var _o=[null];function mo(t,e){this._groups=t,this._parents=e}function vo(t){return"string"==typeof t?new mo([[document.querySelector(t)]],[document.documentElement]):new mo([[t]],_o)}function yo(t){return function(){return t}}mo.prototype={constructor:mo,select:function(t){"function"!=typeof t&&(t=_r(t));for(var e=this._groups,n=e.length,i=new Array(n),r=0;r<n;++r)for(var o,s,a=e[r],l=a.length,h=i[r]=new Array(l),c=0;c<l;++c)(o=a[c])&&(s=t.call(o,o.__data__,c,a))&&("__data__"in o&&(s.__data__=o.__data__),h[c]=s);return new mo(i,this._parents)},selectAll:function(t){t="function"==typeof t?vr(t):function(t){return null==t?mr:function(){return this.querySelectorAll(t)}}(t);for(var e=this._groups,n=e.length,i=[],r=[],o=0;o<n;++o)for(var s,a=e[o],l=a.length,h=0;h<l;++h)(s=a[h])&&(i.push(t.call(s,s.__data__,h,a)),r.push(s));return new mo(i,r)},selectChild:function(t){return this.select(null==t?$r:function(t){return function(){return br.call(this.children,t)}}("function"==typeof t?t:yr(t)))},selectChildren:function(t){return this.selectAll(null==t?xr:function(t){return function(){return wr.call(this.children,t)}}("function"==typeof t?t:yr(t)))},filter:function(t){"function"!=typeof t&&(t=function(t){return function(){return this.matches(t)}}(t));for(var e=this._groups,n=e.length,i=new Array(n),r=0;r<n;++r)for(var o,s=e[r],a=s.length,l=i[r]=[],h=0;h<a;++h)(o=s[h])&&t.call(o,o.__data__,h,s)&&l.push(o);return new mo(i,this._parents)},data:function(t,e){if(!arguments.length)return Array.from(this,Er);var n=e?kr:Mr,i=this._parents,r=this._groups;"function"!=typeof t&&(t=function(t){return function(){return t}}(t));for(var o=r.length,s=new Array(o),a=new Array(o),l=new Array(o),h=0;h<o;++h){var c=i[h],u=r[h],d=u.length,p=Sr(t.call(c,c&&c.__data__,h,i)),g=p.length,f=a[h]=new Array(g),_=s[h]=new Array(g);n(c,u,f,_,l[h]=new Array(d),p,e);for(var m,v,y=0,b=0;y<g;++y)if(m=f[y]){for(y>=b&&(b=y+1);!(v=_[b])&&++b<g;);m._next=v||null}}return(s=new mo(s,i))._enter=a,s._exit=l,s},enter:function(){return new mo(this._enter||this._groups.map(Cr),this._parents)},exit:function(){return new mo(this._exit||this._groups.map(Cr),this._parents)},join:function(t,e,n){var i=this.enter(),r=this,o=this.exit();return"function"==typeof t?(i=t(i))&&(i=i.selection()):i=i.append(t+""),null!=e&&(r=e(r))&&(r=r.selection()),null==n?o.remove():n(o),i&&r?i.merge(r).order():r},merge:function(t){for(var e=t.selection?t.selection():t,n=this._groups,i=e._groups,r=n.length,o=i.length,s=Math.min(r,o),a=new Array(r),l=0;l<s;++l)for(var h,c=n[l],u=i[l],d=c.length,p=a[l]=new Array(d),g=0;g<d;++g)(h=c[g]||u[g])&&(p[g]=h);for(;l<r;++l)a[l]=n[l];return new mo(a,this._parents)},selection:function(){return this},order:function(){for(var t=this._groups,e=-1,n=t.length;++e<n;)for(var i,r=t[e],o=r.length-1,s=r[o];--o>=0;)(i=r[o])&&(s&&4^i.compareDocumentPosition(s)&&s.parentNode.insertBefore(i,s),s=i);return this},sort:function(t){function e(e,n){return e&&n?t(e.__data__,n.__data__):!e-!n}t||(t=Tr);for(var n=this._groups,i=n.length,r=new Array(i),o=0;o<i;++o){for(var s,a=n[o],l=a.length,h=r[o]=new Array(l),c=0;c<l;++c)(s=a[c])&&(h[c]=s);h.sort(e)}return new mo(r,this._parents).order()},call:function(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this},nodes:function(){return Array.from(this)},node:function(){for(var t=this._groups,e=0,n=t.length;e<n;++e)for(var i=t[e],r=0,o=i.length;r<o;++r){var s=i[r];if(s)return s}return null},size:function(){let t=0;for(const e of this)++t;return t},empty:function(){return!this.node()},each:function(t){for(var e=this._groups,n=0,i=e.length;n<i;++n)for(var r,o=e[n],s=0,a=o.length;s<a;++s)(r=o[s])&&t.call(r,r.__data__,s,o);return this},attr:function(t,e){var n=ur(t);if(arguments.length<2){var i=this.node();return n.local?i.getAttributeNS(n.space,n.local):i.getAttribute(n)}return this.each((null==e?n.local?Dr:Nr:"function"==typeof e?n.local?Hr:Pr:n.local?Ir:Ur)(n,e))},style:function(t,e,n){return arguments.length>1?this.each((null==e?Lr:"function"==typeof e?Fr:zr)(t,e,null==n?"":n)):function(t,e){return t.style.getPropertyValue(e)||Or(t).getComputedStyle(t,null).getPropertyValue(e)}(this.node(),t)},property:function(t,e){return arguments.length>1?this.each((null==e?Rr:"function"==typeof e?Vr:qr)(t,e)):this.node()[t]},classed:function(t,e){var n=jr(t+"");if(arguments.length<2){for(var i=Gr(this.node()),r=-1,o=n.length;++r<o;)if(!i.contains(n[r]))return!1;return!0}return this.each(("function"==typeof e?Jr:e?Zr:Xr)(n,e))},text:function(t){return arguments.length?this.each(null==t?Kr:("function"==typeof t?to:Qr)(t)):this.node().textContent},html:function(t){return arguments.length?this.each(null==t?eo:("function"==typeof t?io:no)(t)):this.node().innerHTML},raise:function(){return this.each(ro)},lower:function(){return this.each(oo)},append:function(t){var e="function"==typeof t?t:gr(t);return this.select(function(){return this.appendChild(e.apply(this,arguments))})},insert:function(t,e){var n="function"==typeof t?t:gr(t),i=null==e?so:"function"==typeof e?e:_r(e);return this.select(function(){return this.insertBefore(n.apply(this,arguments),i.apply(this,arguments)||null)})},remove:function(){return this.each(ao)},clone:function(t){return this.select(t?ho:lo)},datum:function(t){return arguments.length?this.property("__data__",t):this.node().__data__},on:function(t,e,n){var i,r,o=function(t){return t.trim().split(/^|\s+/).map(function(t){var e="",n=t.indexOf(".");return n>=0&&(e=t.slice(n+1),t=t.slice(0,n)),{type:t,name:e}})}(t+""),s=o.length;if(!(arguments.length<2)){for(a=e?uo:co,i=0;i<s;++i)this.each(a(o[i],e,n));return this}var a=this.node().__on;if(a)for(var l,h=0,c=a.length;h<c;++h)for(i=0,l=a[h];i<s;++i)if((r=o[i]).type===l.type&&r.name===l.name)return l.value},dispatch:function(t,e){return this.each(("function"==typeof e?fo:go)(t,e))},[Symbol.iterator]:function*(){for(var t=this._groups,e=0,n=t.length;e<n;++e)for(var i,r=t[e],o=0,s=r.length;o<s;++o)(i=r[o])&&(yield i)}};const bo=Math.PI,$o=2*bo,wo=1e-6,xo=$o-wo;function Co(t){this._+=t[0];for(let e=1,n=t.length;e<n;++e)this._+=arguments[e]+t[e]}class Ao{constructor(t){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=null==t?Co:function(t){let e=Math.floor(t);if(!(e>=0))throw new Error(`invalid digits: ${t}`);if(e>15)return Co;const n=10**e;return function(t){this._+=t[0];for(let e=1,i=t.length;e<i;++e)this._+=Math.round(arguments[e]*n)/n+t[e]}}(t)}moveTo(t,e){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}`}closePath(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(t,e){this._append`L${this._x1=+t},${this._y1=+e}`}quadraticCurveTo(t,e,n,i){this._append`Q${+t},${+e},${this._x1=+n},${this._y1=+i}`}bezierCurveTo(t,e,n,i,r,o){this._append`C${+t},${+e},${+n},${+i},${this._x1=+r},${this._y1=+o}`}arcTo(t,e,n,i,r){if(t=+t,e=+e,n=+n,i=+i,(r=+r)<0)throw new Error(`negative radius: ${r}`);let o=this._x1,s=this._y1,a=n-t,l=i-e,h=o-t,c=s-e,u=h*h+c*c;if(null===this._x1)this._append`M${this._x1=t},${this._y1=e}`;else if(u>wo)if(Math.abs(c*a-l*h)>wo&&r){let d=n-o,p=i-s,g=a*a+l*l,f=d*d+p*p,_=Math.sqrt(g),m=Math.sqrt(u),v=r*Math.tan((bo-Math.acos((g+u-f)/(2*_*m)))/2),y=v/m,b=v/_;Math.abs(y-1)>wo&&this._append`L${t+y*h},${e+y*c}`,this._append`A${r},${r},0,0,${+(c*d>h*p)},${this._x1=t+b*a},${this._y1=e+b*l}`}else this._append`L${this._x1=t},${this._y1=e}`;else;}arc(t,e,n,i,r,o){if(t=+t,e=+e,o=!!o,(n=+n)<0)throw new Error(`negative radius: ${n}`);let s=n*Math.cos(i),a=n*Math.sin(i),l=t+s,h=e+a,c=1^o,u=o?i-r:r-i;null===this._x1?this._append`M${l},${h}`:(Math.abs(this._x1-l)>wo||Math.abs(this._y1-h)>wo)&&this._append`L${l},${h}`,n&&(u<0&&(u=u%$o+$o),u>xo?this._append`A${n},${n},0,1,${c},${t-s},${e-a}A${n},${n},0,1,${c},${this._x1=l},${this._y1=h}`:u>wo&&this._append`A${n},${n},0,${+(u>=bo)},${c},${this._x1=t+n*Math.cos(r)},${this._y1=e+n*Math.sin(r)}`)}rect(t,e,n,i){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}h${n=+n}v${+i}h${-n}Z`}toString(){return this._}}function Mo(t){this._context=t}function ko(t){return new Mo(t)}function Eo(t){return t[0]}function So(t){return t[1]}function To(t,e){var n=yo(!0),i=null,r=ko,o=null,s=function(t){let e=3;return t.digits=function(n){if(!arguments.length)return e;if(null==n)e=null;else{const t=Math.floor(n);if(!(t>=0))throw new RangeError(`invalid digits: ${n}`);e=t}return t},()=>new Ao(e)}(a);function a(a){var l,h,c,u=(a=function(t){return"object"==typeof t&&"length"in t?t:Array.from(t)}(a)).length,d=!1;for(null==i&&(o=r(c=s())),l=0;l<=u;++l)!(l<u&&n(h=a[l],l,a))===d&&((d=!d)?o.lineStart():o.lineEnd()),d&&o.point(+t(h,l,a),+e(h,l,a));if(c)return o=null,c+""||null}return t="function"==typeof t?t:void 0===t?Eo:yo(t),e="function"==typeof e?e:void 0===e?So:yo(e),a.x=function(e){return arguments.length?(t="function"==typeof e?e:yo(+e),a):t},a.y=function(t){return arguments.length?(e="function"==typeof t?t:yo(+t),a):e},a.defined=function(t){return arguments.length?(n="function"==typeof t?t:yo(!!t),a):n},a.curve=function(t){return arguments.length?(r=t,null!=i&&(o=r(i)),a):r},a.context=function(t){return arguments.length?(null==t?i=o=null:o=r(i=t),a):i},a}function No(t,e,n){t._context.bezierCurveTo((2*t._x0+t._x1)/3,(2*t._y0+t._y1)/3,(t._x0+2*t._x1)/3,(t._y0+2*t._y1)/3,(t._x0+4*t._x1+e)/6,(t._y0+4*t._y1+n)/6)}function Do(t){this._context=t}function Uo(t){this._context=t}function Io(t){var e,n,i=t.length-1,r=new Array(i),o=new Array(i),s=new Array(i);for(r[0]=0,o[0]=2,s[0]=t[0]+2*t[1],e=1;e<i-1;++e)r[e]=1,o[e]=4,s[e]=4*t[e]+2*t[e+1];for(r[i-1]=2,o[i-1]=7,s[i-1]=8*t[i-1]+t[i],e=1;e<i;++e)n=r[e]/o[e-1],o[e]-=n,s[e]-=n*s[e-1];for(r[i-1]=s[i-1]/o[i-1],e=i-2;e>=0;--e)r[e]=(s[e]-r[e+1])/o[e];for(o[i-1]=(t[i]+r[i-1])/2,e=0;e<i-1;++e)o[e]=2*t[e+1]-r[e+1];return[r,o]}function Po(t,e){this._context=t,this._t=e}Mo.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;default:this._context.lineTo(t,e)}}},Do.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){switch(this._point){case 3:No(this,this._x1,this._y1);case 2:this._context.lineTo(this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;break;case 2:this._point=3,this._context.lineTo((5*this._x0+this._x1)/6,(5*this._y0+this._y1)/6);default:No(this,t,e)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=e}},Uo.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=[],this._y=[]},lineEnd:function(){var t=this._x,e=this._y,n=t.length;if(n)if(this._line?this._context.lineTo(t[0],e[0]):this._context.moveTo(t[0],e[0]),2===n)this._context.lineTo(t[1],e[1]);else for(var i=Io(t),r=Io(e),o=0,s=1;s<n;++o,++s)this._context.bezierCurveTo(i[0][o],r[0][o],i[1][o],r[1][o],t[s],e[s]);(this._line||0!==this._line&&1===n)&&this._context.closePath(),this._line=1-this._line,this._x=this._y=null},point:function(t,e){this._x.push(+t),this._y.push(+e)}},Po.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=this._y=NaN,this._point=0},lineEnd:function(){0<this._t&&this._t<1&&2===this._point&&this._context.lineTo(this._x,this._y),(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line>=0&&(this._t=1-this._t,this._line=1-this._line)},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;default:if(this._t<=0)this._context.lineTo(this._x,e),this._context.lineTo(t,e);else{var n=this._x*(1-this._t)+t*this._t;this._context.lineTo(n,this._y),this._context.lineTo(n,e)}}this._x=t,this._y=e}};const Ho=a`.card-content{padding:16px}.card-content.tile{padding:10px}.card-content.short .graph-container{right:70px}.entity-row{align-items:center;cursor:pointer;display:flex;height:40px;margin-bottom:8px;position:relative}.entity-row:last-of-type{margin-bottom:0}.tile .entity-row{height:34px}.tile .entity-row .entity-info{align-items:flex-start;display:flex;flex-direction:column;justify-content:center}.tile .entity-row .entity-value{align-items:center;display:flex;font-size:var(--ha-font-size-s);font-weight:var(--ha-font-weight-normal);gap:4px;line-height:var(--ha-line-height-condensed);margin-left:initial}.tile .entity-row .icon-container{height:36px;width:36px}.entity-icon{color:var(--primary-text-color);fill:currentColor;margin-right:8px;text-align:center;width:40px}.tile .entity-icon{cursor:pointer}.icon-container{align-items:center;border-radius:50%;display:flex;height:40px;justify-content:center;margin-right:8px;transition:background-color .2s ease-in-out;width:40px}.icon-container .entity-icon{color:var(--state-inactive-color);margin-right:0}.icon-container.active{background-color:color-mix(in srgb, var(--bge-icon-color, var(--state-active-color)) 20%, transparent)}.icon-container.active .entity-icon{color:var(--state-active-color)}.icon-container.inactive{background-color:color-mix(in srgb, var(--state-inactive-color) 20%, transparent)}.entity-name{align-items:flex-start;display:flex;flex-direction:column;z-index:1}.entity-value{color:var(--primary-text-color);margin-left:auto;text-transform:none !important;z-index:1}.value-label,.secondary-value-inline,.secondary-value{color:var(--secondary-text-color);font-size:var(--ha-font-size-s);font-weight:var(--ha-font-weight-normal)}.secondary-value{margin-left:2px}.value-label{margin-left:4px}.tile .entity-name{font-weight:bold}.graph-container{bottom:0;left:45px;pointer-events:none;position:absolute;right:0;top:0}.no-icon .graph-container{left:0}.graph-container svg{height:100%;width:100%}.graph-path,.graph-path-glow-outer,.graph-path-glow-inner{fill:none;stroke-linecap:round;stroke-linejoin:round}.graph-dot{opacity:0;transition:opacity .2s ease-in-out}.entity-row:hover .graph-dot{opacity:1}.entity-with-toggle{align-items:center;display:flex;margin-left:auto;z-index:1}.entity-with-toggle .entity-value{text-transform:initial}.card-header{align-items:center;color:var(--ha-card-header-color, var(--primary-text-color));display:flex;font-family:var(--ha-card-header-font-family, inherit);font-size:var(--ha-card-header-font-size, 24px);font-weight:normal;justify-content:space-between;letter-spacing:-0.012em;line-height:32px;padding:24px 16px 16px}.card-header .name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.card-header .value{color:var(--secondary-text-color);flex-shrink:0;font-weight:normal;margin-left:16px}`,Oo=1e3,Lo=36e5;const zo=(t,e,n)=>{const i=e??{language:"en"},r={};return void 0!==n&&(r.minimumFractionDigits=n,r.maximumFractionDigits=n),"none"===i.number_format&&(r.useGrouping=!1),new Intl.NumberFormat((t=>{switch(t.number_format){case"comma_decimal":return["en-US","en"];case"decimal_comma":return["de","es","it"];case"space_comma":return["fr","sv","cs"];case"system":return;default:return t.language}})(i),r).format(t)},Fo="background-graph-entities",Ro=`${Fo}-editor`,qo="Unavailable",Vo={linear:ko,step:function(t){return new Po(t,.5)},spline:function(t){return new Do(t)},natural:function(t){return new Uo(t)}};let jo=class extends lt{constructor(){super(...arguments),this.editMode=!1,this._entities=[],this._history=new Map,this._historyFetched=!1,this._renderRetryMap=new Map,this._lastSortedEntityIds=[]}setConfig(t){if(!t||!t.entities||!Array.isArray(t.entities)||0===t.entities.length)throw new Error("You need to define at least one entity");this._config=t,this._entities=t.entities.map(t=>"string"==typeof t?{entity:t}:t),this._historyFetched=!1,this._history=new Map,this._setupUpdateInterval()}connectedCallback(){super.connectedCallback(),this._setupUpdateInterval()}disconnectedCallback(){super.disconnectedCallback(),this._timerId&&(clearInterval(this._timerId),this._timerId=void 0),this._renderRetryMap.clear()}_setupUpdateInterval(){if(this._timerId&&clearInterval(this._timerId),!this._config)return;const t=this._config.update_interval;t&&(this._timerId=window.setInterval(()=>this._fetchAndStoreAllHistory(),t*Oo))}static async getConfigElement(){const t=window.loadCardHelpers;if(!t)throw new Error("This card requires Home Assistant 2023.4+ and `loadCardHelpers` is not available.");const e=await t(),n=await e.createCardElement({type:"entities",entities:[]});return await n.constructor.getConfigElement(),await Promise.resolve().then(function(){return Cs}),document.createElement(Ro)}static getStubConfig(){return{entities:[{entity:"sun.sun"}],hours_to_show:24}}updated(t){this._config&&this.hass&&!this._historyFetched&&(this._historyFetched=!0,this._fetchAndStoreAllHistory());const e=this._getSortedEntities().map(t=>t.entity),n=e.length!==this._lastSortedEntityIds.length||e.some((t,e)=>t!==this._lastSortedEntityIds[e]);n&&(this._lastSortedEntityIds=e),(t.has("_history")||t.has("editMode")||n)&&requestAnimationFrame(()=>this._renderAllGraphs())}_getCurveFactory(){const t=this._config?.curve||"spline";return Vo[t]??Vo.spline}_renderAllGraphs(){if(!this.isConnected)return;const t=this.renderRoot.querySelectorAll(".graph-container");this._config?.entities&&t.forEach(t=>{const e=t.dataset.entityId;if(e){const n=this._entities.find(t=>t.entity===e),i=n.graph_entity||e,r=this._history.get(i);this._renderD3Graph(t,r?.downsampled,n)}})}_createGradient(t,e,n,i){const r=bt(i,t=>t.value),o=t.append("defs").append("linearGradient").attr("id",n).attr("gradientUnits","userSpaceOnUse").attr("x1",0).attr("y1",e(r[0])).attr("x2",0).attr("y2",e(r[1])),s=[...i].sort((t,e)=>t.value-e.value);return s.forEach(t=>{const e=r[1]-r[0],n=e>0?(t.value-r[0])/e:0;o.append("stop").attr("offset",100*Math.max(0,Math.min(1,n))+"%").attr("stop-color",t.color)}),`url(#${n})`}_setupGradient(t,e,n,i){const r=this.hass.themes?.darkMode??!1?"white":"black";if(i?.overwrite_graph_appearance){const o=i.color_thresholds;return o&&o.length>0?this._createGradient(t,e,n,o):i.line_color??this._config.line_color??r}const o=this._config.color_thresholds;return o&&o.length>0?this._createGradient(t,e,n,o):this._config.line_color??r}_getDotColor(t,e){const n=this.hass.themes?.darkMode??!1?"white":"black";let i,r;if(e?.overwrite_graph_appearance&&(i=e.color_thresholds,r=e.line_color),void 0===i&&(i=this._config.color_thresholds),void 0===r&&(r=this._config.line_color),i&&i.length>0){const e=[...i].sort((t,e)=>t.value-e.value),n=We().domain(e.map(t=>t.value)).range(e.map(t=>t.color)).clamp(!0);return n(t)}return r??n}_pickHistoryValue(t,e){if(!t)return;const n="max"===e||"min"===e?t.raw:t.downsampled;if(!n||0===n.length)return;const i=n.map(t=>t.value).filter(t=>Number.isFinite(t));if(0!==i.length){if("max"===e)return function(t){let e;for(const n of t)null!=n&&(e<n||void 0===e&&n>=n)&&(e=n);return e}(i);if("min"===e)return function(t){let e;for(const n of t)null!=n&&(e>n||void 0===e&&n>=n)&&(e=n);return e}(i);if("avg"===e)return i.reduce((t,e)=>t+e,0)/i.length;if("median"===e){const t=[...i].sort((t,e)=>t-e),e=Math.floor(t.length/2);return t.length%2==0?(t[e-1]+t[e])/2:t[e]}return i[i.length-1]}}_getAutoIconColor(t){if(!t.auto_icon_color)return;const e=t.graph_entity||t.entity,n=this._history.get(e),i=t.auto_icon_color_source??"latest",r=this._pickHistoryValue(n,i);return void 0!==r?this._getDotColor(r,t):void 0}_getSortedEntities(){if(!this.hass||!this._config||!this._entities)return[];if(!this._config.sort||!this._config.sort.method||"none"===this._config.sort.method)return this._entities;const{method:t,reverse:e,numeric:n=!0}=this._config.sort,i=[...this._entities],r=new Map;return this._entities.forEach((t,e)=>r.set(t,e)),i.sort((i,o)=>{const s=this.hass.states[i.entity],a=this.hass.states[o.entity],l=!!s&&"unavailable"!==s.state&&"unknown"!==s.state,h=!!a&&"unavailable"!==a.state&&"unknown"!==a.state;if("name"!==t){if(l!==h)return l?-1:1;if(!l&&!h)return(r.get(i)??0)-(r.get(o)??0)}let c=0;if("name"===t){const t=i.name||s?.attributes.friendly_name||i.entity,e=o.name||a?.attributes.friendly_name||o.entity;c=t.localeCompare(e,this.hass.language||"en",{sensitivity:"base",numeric:n})}else if("state"===t||"value"===t){let e,r;if("state"===t)e=s.state,r=a.state;else{const t=parseFloat(s.state),n=!("on"===s.state||"off"===s.state||i.graph_entity&&i.graph_entity!==i.entity)?i.value_source??"latest":"latest";let l=t;if("latest"!==n){const t=this._pickHistoryValue(this._history.get(i.entity),n);void 0!==t&&(l=t)}e=isNaN(l)?s.state:l;const h=parseFloat(a.state),c=!("on"===a.state||"off"===a.state||o.graph_entity&&o.graph_entity!==o.entity)?o.value_source??"latest":"latest";let u=h;if("latest"!==c){const t=this._pickHistoryValue(this._history.get(o.entity),c);void 0!==t&&(u=t)}r=isNaN(u)?a.state:u}if(n){const t="number"==typeof e?e:parseFloat(e),n="number"==typeof r?r:parseFloat(r),i=!isNaN(t),o=!isNaN(n);c=i&&o?t-n:i!==o?i?-1:1:String(e).localeCompare(String(r),this.hass.language||"en",{sensitivity:"base",numeric:!0})}else c=String(e).localeCompare(String(r),this.hass.language||"en",{sensitivity:"base"})}return e&&(c=-c),0===c?(r.get(i)??0)-(r.get(o)??0):c}),i}getCardSize(){return this._config?.entities.length?this._config.entities.length+1:1}_openEntityPopup(t){const e=new CustomEvent("hass-more-info",{bubbles:!0,cancelable:!1,composed:!0,detail:{entityId:t}});this.dispatchEvent(e)}_toggleEntity(t){this.hass.callService("homeassistant","toggle",{entity_id:t})}_renderEntityRow(t){const e=this.hass.states[t.entity];if(!e)return this._renderUnavailableEntityRow(t);const n=this.hass.entities[t.entity],i=e.attributes.unit_of_measurement??"",r=parseFloat(e.state);let o;const s="on"===e.state||"off"===e.state,a=t.entity.split(".")[0],l=s&&!["binary_sensor","sensor","update"].includes(a),h=!0===this._config.tile_style,c=s&&"on"===e.state,u=this._getAutoIconColor(t),d=u??t.icon_color,p=t.show_graph_entity_state??!1,g=t.show_icon??this._config.show_icon??!0;let f;if(t.graph_entity&&p){const e=this.hass.states[t.graph_entity];if(e){const n=this.hass.entities[t.graph_entity],i=e.attributes.unit_of_measurement??"",r=parseFloat(e.state),o=n?.display_precision;let s=e.state;isNaN(r)||"number"!=typeof o||(s=zo(r,this.hass.locale,o)),f=[s,i].filter(Boolean).join(" ")}else f=this.hass.localize("state.default.unavailable")||qo}const _=d?`color: ${d}`:"",m=e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.stopPropagation(),this._toggleEntity(t.entity))},v=!(s||t.graph_entity&&t.graph_entity!==t.entity),y=v?t.value_source??"latest":"latest",b=v?t.value_label:void 0;let $=r,w=e.state;if("latest"!==y){const e=this._pickHistoryValue(this._history.get(t.entity),y);void 0!==e&&($=e,w=String(e))}if("min"===i.toLowerCase())if($>=60){const t=$%60;o=`${Math.floor($/60)}h ${Math.floor(t)}min`}else o=`${Math.floor($)} ${i}`;else{const t=!isNaN(r)&&e.state.includes(".")?e.state.length-e.state.indexOf(".")-1:isNaN(r)?void 0:0,s=n?.display_precision??t;let a=w;isNaN($)||"number"!=typeof s||(a=zo($,this.hass.locale,s)),o=[a,i].filter(Boolean).join(" ")}return h?j`
        <div
          class="entity-row ${g?"":"no-icon"}"
          style=${d?`--bge-icon-color: ${d};${u?` --state-active-color: ${u};`:""}`:""}
          @click=${()=>this._openEntityPopup(t.entity)}
        >
          ${g?j`
                <div
                  class="icon-container ${s?c?"active":"inactive":""}"
                  role=${l?"button":"img"}
                  aria-label=${l?`Toggle ${t.name||t.entity}`:""}
                  aria-pressed=${l?c:"false"}
                  tabindex=${l?"0":"-1"}
                  @click=${e=>{l&&(e.stopPropagation(),this._toggleEntity(t.entity))}}
                  @keydown=${l?m:null}
                >
                  ${t.icon?j`<ha-icon class="entity-icon" .icon=${t.icon} style=${_}></ha-icon>`:j`<ha-state-icon
                        class="entity-icon"
                        .hass=${this.hass}
                        .stateObj=${e}
                        .stateColor=${h&&!u}
                        style=${_}
                      ></ha-state-icon>`}
                </div>
              `:""}
          <div class="entity-info">
            <div class="entity-name">
              ${t.name||e.attributes.friendly_name||t.entity}
            </div>
            <div class="entity-value">
              <span class="primary-value">${o}</span>
              ${b?j`<span class="value-label">${b}</span>`:""}
              ${f?j`<span class="secondary-value">· ${f}</span>`:""}
            </div>
          </div>
          <div class="graph-container" data-entity-id=${t.entity}></div>
        </div>
      `:j`
      <div class="entity-row ${g?"":"no-icon"}" @click=${()=>this._openEntityPopup(t.entity)}>
        ${g?t.icon?j`<ha-icon class="entity-icon" .icon=${t.icon} style=${_}></ha-icon>`:j`<ha-state-icon
                class="entity-icon"
                .hass=${this.hass}
                .stateObj=${e}
                .stateColor=${h&&!u}
                style=${_}
              ></ha-state-icon>`:""}
        <div class="entity-name">
          ${t.name||e.attributes.friendly_name||t.entity}
          ${l&&!h&&f?j`<span class="secondary-value-inline">${f}</span>`:""}
        </div>
        <div class="graph-container" data-entity-id=${t.entity}></div>
        ${l&&!h?j`
              <div class="entity-value entity-with-toggle">
                <ha-switch
                  aria-label=${`Toggle ${t.name||t.entity}`}
                  .checked=${"on"===e.state}
                  @click=${e=>{e.stopPropagation(),this._toggleEntity(t.entity)}}
                ></ha-switch>
              </div>
            `:j`<div class="entity-value">
              <span class="primary-value">${o}</span>
              ${b?j`<span class="value-label">${b}</span>`:""}
              ${!l&&f?j`<span class="secondary-value">· ${f}</span>`:""}
            </div>`}
      </div>
    `}_renderUnavailableEntityRow(t){const e=t.show_icon??this._config.show_icon??!0;return j`
      <div
        class="entity-row unavailable ${e?"":"no-icon"}"
        @click=${()=>this._openEntityPopup(t.entity)}
      >
        ${e?j`<ha-icon class="entity-icon" icon=${"mdi:alert-circle-outline"}></ha-icon>`:""}
        <div class="entity-name">${t.name||t.entity}</div>
        <div class="graph-container" data-entity-id=${t.entity}></div>
        <div class="entity-value">${this.hass.localize("state.default.unavailable")||qo}</div>
      </div>
    `}_renderD3Graph(t,e,n){const i=this._renderRetryMap.get(t)||0;if(!t.isConnected||0===t.clientWidth||0===t.clientHeight)return void(i<10&&(this._renderRetryMap.set(t,i+1),requestAnimationFrame(()=>this._renderD3Graph(t,e,n))));if(this._renderRetryMap.delete(t),vo(t).html(""),!e||0===e.length)return;const r=t.clientWidth,o=t.clientHeight,s=this._config?.hours_to_show||24,a=new Date,l=new Date;l.setHours(a.getHours()-s);const h=[l,a],c=[...e],u=c[c.length-1];if(u&&c.push({timestamp:a,value:u.value}),c.length<2)return;const d=bt(c,t=>t.value),p=n?.overwrite_graph_appearance&&void 0!==n.graph_min?n.graph_min:this._config.graph_min,g=n?.overwrite_graph_appearance&&void 0!==n.graph_max?n.graph_max:this._config.graph_max;"number"==typeof p&&(d[0]=p),"number"==typeof g&&(d[1]=g),d[0]===d[1]&&(d[0]-=1,d[1]+=1);const f=.1*(d[1]-d[0]);"number"!=typeof p&&(d[0]-=f),"number"!=typeof g&&(d[1]+=f);const _=lr().domain(h).range([0,r]),m=We().domain(d).range([o,0]),v=vo(t).append("svg").attr("viewBox",`0 0 ${r} ${o}`).attr("preserveAspectRatio","none"),y=this._config?.line_width||3,b=n?.overwrite_graph_appearance&&void 0!==n.line_opacity?n.line_opacity:this._config?.line_opacity??.2,$=`bge-gradient-${t.dataset.entityId?.replace(".","_")}`,w=this._setupGradient(v,m,$,n),x=To().x(t=>_(t.timestamp)).y(t=>m(t.value)).curve(this._getCurveFactory());this._config.line_glow&&(v.append("path").datum(c).attr("class","graph-path-glow-outer").attr("d",x).attr("stroke",w).attr("stroke-opacity",Number((.35*b).toFixed(3))).attr("stroke-width",y+1.5).style("filter","blur(3px)"),v.append("path").datum(c).attr("class","graph-path-glow-inner").attr("d",x).attr("stroke",w).attr("stroke-opacity",Number((.65*b).toFixed(3))).attr("stroke-width",y+.5).style("filter","blur(1px)")),v.append("path").datum(c).attr("class","graph-path").attr("d",x).attr("stroke",w).attr("stroke-opacity",b).attr("stroke-width",y);const C=e.slice(1);this.editMode&&v.selectAll(".graph-dot").data(C).enter().append("circle").attr("class","graph-dot").attr("cx",t=>_(t.timestamp)).attr("cy",t=>m(t.value)).attr("r",2).attr("fill",t=>this._getDotColor(t.value,n))}async _fetchAndStoreAllHistory(){if(0===this._entities.length)return void(this._history.size>0&&(this._history=new Map));const t=new Map,e=this._entities.map(async e=>{const n=e.graph_entity||e.entity,i=await this._fetchHistory(n,e.entity);t.set(n,i)});await Promise.all(e),this._history=new Map([...t.entries()].filter(([,t])=>null!==t))}async _fetchHistory(t,e){if(!this.hass?.callWS)return null;const n=this._config?.hours_to_show||24,i=this._config?.points_per_hour||1,r=new Date;r.setHours(r.getHours()-n);try{const e=(await this.hass.callWS({type:"history/history_during_period",start_time:r.toISOString(),end_time:(new Date).toISOString(),entity_ids:[t],minimal_response:!0,no_attributes:!0,include_start_time_state:!0}))[t];if(!e)return{raw:[],downsampled:[]};const o=e.map(t=>{let e;return e="on"===t.s?1:"off"===t.s?0:Number(t.s),{timestamp:new Date(t.lu*Oo),value:e}}).filter(t=>!isNaN(t.value)),s=function(t,e,n){if(n<=0||0===t.length)return t;const i=[...t,{timestamp:new Date,value:t[t.length-1]?.value??0}],r=new Date,o=new Date(r.getTime()-e*Lo),s=Lo/n,a=Math.ceil((r.getTime()-o.getTime())/s),l=[];let h=t.length>0?t[0].value:0;for(let e=0;e<a;e++){const n=new Date(o.getTime()+(e+1)*s);let r;const a=o.getTime()+e*s,c=a+s;let u=0,d=0;for(let t=0;t<i.length-1;t++){const e=i[t],n=i[t+1],r=Math.max(e.timestamp.getTime(),a),o=Math.min(n.timestamp.getTime(),c);if(r<o){const t=o-r;u+=e.value*t,d+=t}}d>0?(r=u/d,h=t.filter(t=>t.timestamp.getTime()<=c).pop()?.value??h):r=h,l.push({timestamp:n,value:r})}return t.length>0&&l.unshift({timestamp:o,value:t[0].value}),l}(o,n,i);return{raw:o,downsampled:s}}catch(n){return console.error(`Error fetching history for ${e||t} (using ${t}):`,n),null}}_getAverageTitleSuffix(){if(!this._config?.average_in_title)return"";let t=0,e=0,n=null,i=!0,r=0;for(const o of this._entities){const s=this.hass.states[o.entity];if(!s)continue;if("on"===s.state||"off"===s.state)continue;const a=parseFloat(s.state);if(isNaN(a))continue;const l=!o.graph_entity||o.graph_entity===o.entity?o.value_source??"latest":"latest";let h=a;if("latest"!==l){const t=this._pickHistoryValue(this._history.get(o.entity),l);void 0!==t&&(h=t)}t+=h,e++;const c=s.attributes.unit_of_measurement??"";null===n?n=c:n!==c&&(i=!1);const u=this.hass.entities[o.entity],d=s.state.includes(".")?s.state.length-s.state.indexOf(".")-1:0,p=u?.display_precision??d;void 0!==p&&p>r&&(r=p)}if(0===e)return"";return zo(t/e,this.hass.locale,r)+(i&&n?` ${n}`:"")}render(){if(!this._config||!this.hass)return j``;const t=this._getSortedEntities(),e=this._config.title,n=this._getAverageTitleSuffix();return j`
      <ha-card>
        ${e||n?j`
              <div class="card-header">
                <div class="name">${e}</div>
                <div class="value">${n}</div>
              </div>
            `:""}
        <div
          class="card-content ${this._config.tile_style?"tile":""} ${"short"===this._config.line_length?"short":""}"
        >
          ${t.map(t=>this._renderEntityRow(t))}
        </div>
      </ha-card>
    `}static{this.styles=a`
    ${s(Ho)}
  `}};t([pt({attribute:!1})],jo.prototype,"hass",void 0),t([pt({type:Boolean,reflect:!0})],jo.prototype,"editMode",void 0),t([gt()],jo.prototype,"_config",void 0),t([gt()],jo.prototype,"_entities",void 0),t([gt()],jo.prototype,"_history",void 0),jo=t([ct(Fo)],jo),"undefined"==typeof window||customElements.get("ha-switch")||customElements.define("ha-switch",class extends HTMLElement{}),"undefined"!=typeof window&&(window.customCards=window.customCards||[],window.customCards.push({type:Fo,name:"Background Graph Entities",description:"A card to display entities with a background graph.",documentationURL:"https://github.com/timmaurice/lovelace-background-graph-entities"}));const Go={de:{editor:{general:"Allgemein",title:"Titel (Optional)",average_in_title:"Durchschnitt im Titel anzeigen",average_in_title_helper:"Ist nur sinnvoll beim Vergleich von Daten desselben Typs (z. B. nur Temperaturen oder nur Luftfeuchtigkeiten). Der Durchschnitt verschiedener Messwerte ist nicht empfehlenswert.",layout:"Layout",tile_style:"Kompakterer Kachel-Stil",graph_appearance:"Graph-Darstellung",hours_to_show:"Stunden zum Anzeigen",line_width:"Linienbreite",line_length:"Linienlänge",line_lengths:{long:"Lang",short:"Kurz"},line_color:"Linienfarbe",line_opacity:"Linienopazität",line_glow:"Leuchteffekt",color_mode:"Farbmodus",color_modes:{single:"Einzelfarbe",threshold:"Schwellenwerte"},color_thresholds:"Farbschwellenwerte",add_threshold:"Schwellenwert hinzufügen",value:"Wert",color:"Farbe",data_settings:"Dateneinstellungen",points_per_hour:"Punkte pro Stunde",update_interval:"Aktualisierungsintervall (Sekunden)",entities:"Entitäten",entity:"Entität",add_entity:"Entität hinzufügen",optional_overrides:"Optionale Überschreibungen",name:"Name",icon:"Icon",icon_color:"Icon-Farbe",auto_icon_color:"Automatische Icon-Farbe",auto_icon_color_source:"Quelle für automatische Icon-Farbe",value_source:"Angezeigter Wert",value_sources:{latest:"Aktuell",max:"Maximum",min:"Minimum",avg:"Durchschnitt",median:"Median"},value_label:"Wert-Label",value_label_helper:"Suffix nach dem Wert, z. B. (Spitze)",graph_entity:"Graph-Entität (Optional)",show_graph_entity_state:"Zustand der Graph-Entität anzeigen",graph_entity_helper:"Überschreibt die Entität, die für die Verlaufsdaten des Graphen verwendet wird.",curve:"Kurventyp",curves:{spline:"Spline",linear:"Linear",step:"Stufe",natural:"Natürlich"},graph_min:"Untere Graph-Grenze",graph_max:"Obere Graph-Grenze",show_icon:"Icon anzeigen",sorting:"Sortierung",sort_method:"Sortiermethode",sort_methods:{none:"Keine (Originale Reihenfolge)",name:"Name",state:"Zustand",value:"Angezeigter Wert"},sort_reverse:"Reihenfolge umkehren",sort_numeric:"Numerische Sortierung"}},en:{editor:{general:"General",title:"Title (Optional)",average_in_title:"Show Average in Title",average_in_title_helper:"Only makes sense when comparing data of the same type (e.g., all temperatures or all humidities). Averaging different metrics is not recommended.",layout:"Layout",tile_style:"More Compact Tile Style",graph_appearance:"Graph Appearance",hours_to_show:"Hours To Show",line_width:"Line Width",line_length:"Line Length",line_lengths:{long:"Long",short:"Short"},line_color:"Line Color",line_opacity:"Line Opacity",line_glow:"Line Glow",color_mode:"Color Mode",color_modes:{single:"Single Color",threshold:"Thresholds"},color_thresholds:"Color Thresholds",add_threshold:"Add Threshold",value:"Value",color:"Color",data_settings:"Data Settings",points_per_hour:"Points per Hour",update_interval:"Update Interval (seconds)",entities:"Entities",entity:"Entity",add_entity:"Add Entity",optional_overrides:"Optional Overrides",name:"Name",icon:"Icon",icon_color:"Icon Color",auto_icon_color:"Auto Icon Color",auto_icon_color_source:"Auto Icon Color Source",value_source:"Displayed Value",value_sources:{latest:"Latest",max:"Max",min:"Min",avg:"Average",median:"Median"},value_label:"Value Label",value_label_helper:"Suffix shown after the value, e.g. (peak)",graph_entity:"Graph Entity (Optional)",show_graph_entity_state:"Show Graph Entity State",graph_entity_helper:"Override the entity used for the graph's history data.",curve:"Curve Type",curves:{spline:"Spline",linear:"Linear",step:"Step",natural:"Natural"},graph_min:"Graph Lower Bound",graph_max:"Graph Upper Bound",show_icon:"Show Icon",sorting:"Sorting",sort_method:"Sort Method",sort_methods:{none:"None (Original Order)",name:"Name",state:"State",value:"Displayed Value"},sort_reverse:"Reverse Order",sort_numeric:"Numeric Sorting"}},fr:{editor:{general:"Général",title:"Titre (Optionnel)",average_in_title:"Afficher la moyenne dans le titre",average_in_title_helper:"N'a de sens que lors de la comparaison de données du même type (par exemple, uniquement des températures ou uniquement des humidités). La moyenne de différentes mesures n'est pas recommandée.",layout:"Mise en page",tile_style:"Style de tuile plus compact",graph_appearance:"Apparence du graphique",hours_to_show:"Heures à afficher",line_width:"Largeur de la ligne",line_length:"Longueur de la ligne",line_lengths:{long:"Longue",short:"Courte"},line_color:"Couleur de la ligne",line_opacity:"Opacité de la ligne",line_glow:"Effet de lueur",color_mode:"Mode de couleur",color_modes:{single:"Couleur unique",threshold:"Seuils"},color_thresholds:"Seuils de couleur",add_threshold:"Ajouter un seuil",value:"Valeur",color:"Couleur",data_settings:"Paramètres des données",points_per_hour:"Points par heure",update_interval:"Intervalle de mise à jour (secondes)",entities:"Entités",entity:"Entité",add_entity:"Ajouter une entité",optional_overrides:"Remplacements optionnels",name:"Nom",icon:"Icône",icon_color:"Couleur de l'icône",auto_icon_color:"Couleur d'icône automatique",auto_icon_color_source:"Source de la couleur d'icône automatique",value_source:"Valeur affichée",value_sources:{latest:"Dernier",max:"Maximum",min:"Minimum",avg:"Moyenne",median:"Médiane"},value_label:"Étiquette de la valeur",value_label_helper:"Suffixe affiché après la valeur, ex. (pic)",graph_entity:"Entité du graphique (Optionnel)",show_graph_entity_state:"Afficher l'état de l'entité du graphique",graph_entity_helper:"Remplace l'entité utilisée pour les données d'historique du graphique.",curve:"Type de courbe",curves:{spline:"Spline",linear:"Linéaire",step:"Marche",natural:"Naturelle"},graph_min:"Limite inférieure du graphique",graph_max:"Limite supérieure du graphique",show_icon:"Afficher l'icône",sorting:"Tri",sort_method:"Méthode de tri",sort_methods:{none:"Aucun (Ordre d'origine)",name:"Nom",state:"État",value:"Valeur affichée"},sort_reverse:"Inverser l'ordre",sort_numeric:"Tri numérique"}}};function Yo(t,e){let n=e.split(".").reduce((t,e)=>t&&"object"==typeof t?t[e]:void 0,Go[t]);return void 0===n&&"en"!==t&&(n=Yo("en",e)),"string"==typeof n?n:void 0}function Bo(t,e,n={}){const i=Yo(t.language||"en",e.replace("component.bge.",""));if("string"==typeof i){let t=i;for(const e in n)t=t.replace(`{${e}}`,String(n[e]));return t}return e}const Wo=a`.color-input-wrapper{position:relative;flex:1}.color-picker-popup{position:absolute;top:100%;left:0;z-index:10;padding:8px;background-color:var(--card-background-color, white);border:1px solid var(--divider-color);border-radius:var(--ha-card-border-radius, 4px);box-shadow:0px 5px 5px -3px rgba(0,0,0,.2),0px 8px 10px 1px rgba(0,0,0,.14),0px 3px 14px 2px rgba(0,0,0,.12)}.color-picker-popup rgb-string-color-picker{width:200px;height:200px}.color-preview{width:28px;height:28px;border-radius:4px;border:1px solid var(--divider-color);cursor:pointer;box-sizing:border-box}.card-config{--bge-editor-spacing: 8px;display:flex;flex-direction:column;gap:16px}.color-picker-popup{display:none}.side-by-side{display:flex;gap:16px}.side-by-side.margin-bottom{margin-bottom:16px}.side-by-side>*{flex:1}.dropdown-wrapper{margin-top:8px}.entities-container{display:flex;flex-direction:column;gap:12px}.entity-container{align-items:center;border:1px solid var(--divider-color);border-radius:var(--ha-card-border-radius, 4px);display:flex;gap:var(--bge-editor-spacing);padding:var(--bge-editor-spacing);transition:border-color .2s ease-in-out,box-shadow .2s ease-in-out,background-color .2s ease-in-out}.entity-container.dragging{background:var(--secondary-background-color);opacity:.5}.entity-container.drag-over{border-color:var(--primary-color);border-style:dashed;box-shadow:0 0 5px var(--primary-color)}.drag-handle{color:var(--secondary-text-color);cursor:move}.entity-content{flex-grow:1}.entity-main{align-items:center;display:flex;gap:var(--bge-editor-spacing)}.entity-main ha-entity-picker{flex-grow:1}ha-slider{width:100%}ha-expansion-panel{--expansion-panel-content-padding: 0;margin-top:var(--bge-editor-spacing)}ha-expansion-panel[outlined][expanded]{--ha-card-background: var(--secondary-background-color)}.overrides{display:flex;flex-direction:column;gap:16px;padding:16px}pre{background:var(--secondary-background-color);border-radius:var(--ha-card-border-radius, 4px);font-size:12px;padding:var(--bge-editor-spacing);white-space:pre-wrap;word-break:break-all}.threshold-container{align-items:center;display:flex;gap:var(--bge-editor-spacing);min-width:0}.threshold-container .drag-handle{flex-shrink:0}.threshold-container .remove-icon{flex-shrink:0}.threshold-container .threshold-inputs{align-items:center;display:flex;flex-grow:1;gap:16px;min-width:0}.threshold-container .threshold-inputs>ha-input{flex:1 1 0;min-width:0}.add-threshold-button{margin-top:16px}h4{margin-bottom:8px;margin-top:0}.color-input-wrapper{align-items:center;display:flex;flex:1 1 0;gap:var(--bge-editor-spacing);min-width:0}.color-input-wrapper ha-input{flex:1 1 0;min-width:0}.color-input-wrapper.disabled{opacity:.5}.color-input-wrapper.disabled .color-preview{cursor:not-allowed}.color-preview{border:1px solid var(--divider-color);border-radius:4px;box-sizing:border-box;cursor:pointer;flex-shrink:0;height:28px;width:28px}.opacity-slider-container{display:flex;flex-direction:column;width:100%}.label-container{color:var(--secondary-text-color);display:flex;font-size:12px;justify-content:space-between;margin-left:3px}.header{align-items:center;display:flex;gap:var(--bge-editor-spacing);margin-bottom:16px}.header .title{font-size:1.2em;font-weight:500}ha-icon-button ha-icon{transform:translate(0px, -3px)}h3{margin-bottom:8px}.add-entity-button{width:fit-content}.dropdown-trigger{cursor:pointer;display:block;position:relative}.dropdown-textfield{pointer-events:none;width:100%}.formfield-with-help{align-items:center;display:flex;gap:8px}.formfield-with-help .tooltip-container{display:inline-flex;position:relative}.formfield-with-help .tooltip-container .help-icon{--mdc-icon-size: 18px;color:var(--secondary-text-color);cursor:help}.formfield-with-help .tooltip-container .tooltip-content{background-color:var(--card-background-color, var(--paper-card-background-color, var(--primary-background-color)));border:1px solid var(--divider-color);border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,.15);color:var(--primary-text-color);font-size:12px;font-weight:normal;line-height:1.4;opacity:0;padding:8px 12px;pointer-events:none;position:absolute;left:50%;top:calc(100% + 10px);transition:opacity .2s ease-in-out,transform .2s ease-in-out;transform:translateX(-50%) translateY(-4px);width:240px;z-index:100;white-space:normal}.formfield-with-help .tooltip-container .tooltip-content::after,.formfield-with-help .tooltip-container .tooltip-content::before{bottom:100%;left:50%;border:solid rgba(0,0,0,0);content:" ";height:0;width:0;position:absolute;pointer-events:none}.formfield-with-help .tooltip-container .tooltip-content::after{border-color:hsla(0,0%,100%,0);border-bottom-color:var(--card-background-color, var(--paper-card-background-color, var(--primary-background-color)));border-width:6px;margin-left:-6px}.formfield-with-help .tooltip-container .tooltip-content::before{border-color:hsla(0,0%,100%,0);border-bottom-color:var(--divider-color);border-width:7px;margin-left:-7px}.formfield-with-help .tooltip-container:hover .tooltip-content{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0)}`,Zo=(t,e=0,n=1)=>t>n?n:t<e?e:t,Xo=(t,e=0,n=Math.pow(10,e))=>Math.round(n*t)/n,Jo=t=>("#"===t[0]&&(t=t.substring(1)),t.length<6?{r:parseInt(t[0]+t[0],16),g:parseInt(t[1]+t[1],16),b:parseInt(t[2]+t[2],16),a:4===t.length?Xo(parseInt(t[3]+t[3],16)/255,2):1}:{r:parseInt(t.substring(0,2),16),g:parseInt(t.substring(2,4),16),b:parseInt(t.substring(4,6),16),a:8===t.length?Xo(parseInt(t.substring(6,8),16)/255,2):1}),Ko=t=>{const{h:e,s:n,l:i}=(({h:t,s:e,v:n,a:i})=>{const r=(200-e)*n/100;return{h:Xo(t),s:Xo(r>0&&r<200?e*n/100/(r<=100?r:200-r)*100:0),l:Xo(r/2),a:Xo(i,2)}})(t);return`hsl(${e}, ${n}%, ${i}%)`},Qo=({h:t,s:e,v:n,a:i})=>{t=t/360*6,e/=100,n/=100;const r=Math.floor(t),o=n*(1-e),s=n*(1-(t-r)*e),a=n*(1-(1-t+r)*e),l=r%6;return{r:Xo(255*[n,s,o,o,a,n][l]),g:Xo(255*[a,n,n,s,o,o][l]),b:Xo(255*[o,o,a,n,n,s][l]),a:Xo(i,2)}},ts=t=>{const e=t.toString(16);return e.length<2?"0"+e:e},es=({r:t,g:e,b:n,a:i})=>{const r=i<1?ts(Xo(255*i)):"";return"#"+ts(t)+ts(e)+ts(n)+r},ns=({r:t,g:e,b:n,a:i})=>{const r=Math.max(t,e,n),o=r-Math.min(t,e,n),s=o?r===t?(e-n)/o:r===e?2+(n-t)/o:4+(t-e)/o:0;return{h:Xo(60*(s<0?s+6:s)),s:Xo(r?o/r*100:0),v:Xo(r/255*100),a:i}},is=(t,e)=>{if(t===e)return!0;for(const n in t)if(t[n]!==e[n])return!1;return!0},rs={},os=t=>{let e=rs[t];return e||(e=document.createElement("template"),e.innerHTML=t,rs[t]=e),e},ss=(t,e,n)=>{t.dispatchEvent(new CustomEvent(e,{bubbles:!0,detail:n}))};let as=!1;const ls=t=>"touches"in t,hs=(t,e)=>{const n=ls(e)?e.touches[0]:e,i=t.el.getBoundingClientRect();ss(t.el,"move",t.getMove({x:Zo((n.pageX-(i.left+window.pageXOffset))/i.width),y:Zo((n.pageY-(i.top+window.pageYOffset))/i.height)}))};class cs{constructor(t,e,n,i){const r=os(`<div role="slider" tabindex="0" part="${e}" ${n}><div part="${e}-pointer"></div></div>`);t.appendChild(r.content.cloneNode(!0));const o=t.querySelector(`[part=${e}]`);o.addEventListener("mousedown",this),o.addEventListener("touchstart",this),o.addEventListener("keydown",this),this.el=o,this.xy=i,this.nodes=[o.firstChild,o]}set dragging(t){const e=t?document.addEventListener:document.removeEventListener;e(as?"touchmove":"mousemove",this),e(as?"touchend":"mouseup",this)}handleEvent(t){switch(t.type){case"mousedown":case"touchstart":if(t.preventDefault(),!(t=>!(as&&!ls(t)||(as||(as=ls(t)),0)))(t)||!as&&0!=t.button)return;this.el.focus(),hs(this,t),this.dragging=!0;break;case"mousemove":case"touchmove":t.preventDefault(),hs(this,t);break;case"mouseup":case"touchend":this.dragging=!1;break;case"keydown":((t,e)=>{const n=e.keyCode;n>40||t.xy&&n<37||n<33||(e.preventDefault(),ss(t.el,"move",t.getMove({x:39===n?.01:37===n?-.01:34===n?.05:33===n?-.05:35===n?1:36===n?-1:0,y:40===n?.01:38===n?-.01:0},!0)))})(this,t)}}style(t){t.forEach((t,e)=>{for(const n in t)this.nodes[e].style.setProperty(n,t[n])})}}class us extends cs{constructor(t){super(t,"hue",'aria-label="Hue" aria-valuemin="0" aria-valuemax="360"',!1)}update({h:t}){this.h=t,this.style([{left:t/360*100+"%",color:Ko({h:t,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuenow",`${Xo(t)}`)}getMove(t,e){return{h:e?Zo(this.h+360*t.x,0,360):360*t.x}}}class ds extends cs{constructor(t){super(t,"saturation",'aria-label="Color"',!0)}update(t){this.hsva=t,this.style([{top:100-t.v+"%",left:`${t.s}%`,color:Ko(t)},{"background-color":Ko({h:t.h,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuetext",`Saturation ${Xo(t.s)}%, Brightness ${Xo(t.v)}%`)}getMove(t,e){return{s:e?Zo(this.hsva.s+100*t.x,0,100):100*t.x,v:e?Zo(this.hsva.v-100*t.y,0,100):Math.round(100-100*t.y)}}}const ps=Symbol("same"),gs=Symbol("color"),fs=Symbol("hsva"),_s=Symbol("update"),ms=Symbol("parts"),vs=Symbol("css"),ys=Symbol("sliders");class bs extends HTMLElement{static get observedAttributes(){return["color"]}get[vs](){return[':host{display:flex;flex-direction:column;position:relative;width:200px;height:200px;user-select:none;-webkit-user-select:none;cursor:default}:host([hidden]){display:none!important}[role=slider]{position:relative;touch-action:none;user-select:none;-webkit-user-select:none;outline:0}[role=slider]:last-child{border-radius:0 0 8px 8px}[part$=pointer]{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;display:flex;place-content:center center;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}[part$=pointer]::after{content:"";width:100%;height:100%;border-radius:inherit;background-color:currentColor}[role=slider]:focus [part$=pointer]{transform:translate(-50%,-50%) scale(1.1)}',"[part=hue]{flex:0 0 24px;background:linear-gradient(to right,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%)}[part=hue-pointer]{top:50%;z-index:2}","[part=saturation]{flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,rgba(255,255,255,0));box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part=saturation-pointer]{z-index:3}"]}get[ys](){return[ds,us]}get color(){return this[gs]}set color(t){if(!this[ps](t)){const e=this.colorModel.toHsva(t);this[_s](e),this[gs]=t}}constructor(){super();const t=os(`<style>${this[vs].join("")}</style>`),e=this.attachShadow({mode:"open"});e.appendChild(t.content.cloneNode(!0)),e.addEventListener("move",this),this[ms]=this[ys].map(t=>new t(e))}connectedCallback(){if(this.hasOwnProperty("color")){const t=this.color;delete this.color,this.color=t}else this.color||(this.color=this.colorModel.defaultColor)}attributeChangedCallback(t,e,n){const i=this.colorModel.fromAttr(n);this[ps](i)||(this.color=i)}handleEvent(t){const e=this[fs],n={...e,...t.detail};let i;this[_s](n),is(n,e)||this[ps](i=this.colorModel.fromHsva(n))||(this[gs]=i,ss(this,"color-changed",{value:i}))}[ps](t){return this.color&&this.colorModel.equal(t,this.color)}[_s](t){this[fs]=t,this[ms].forEach(e=>e.update(t))}}const $s={defaultColor:"#000",toHsva:t=>ns(Jo(t)),fromHsva:({h:t,s:e,v:n})=>es(Qo({h:t,s:e,v:n,a:1})),equal:(t,e)=>t.toLowerCase()===e.toLowerCase()||is(Jo(t),Jo(e)),fromAttr:t=>t};class ws extends bs{get colorModel(){return $s}}window.customElements.get("hex-color-picker")||window.customElements.define("hex-color-picker",class extends ws{});let xs=class extends lt{constructor(){super(...arguments),this._config={type:"custom:background-graph-entities",entities:[],color_thresholds:[]},this._draggedIndex=null,this._dropIndex=null,this._draggedThresholdIndex=null,this._dropThresholdIndex=null,this._activeColorPicker=null,this._editingIndex=null,this._handleOutsideClick=t=>{if(!this._activeColorPicker)return;const e=t.composedPath()[0];e.closest(".color-input-wrapper")||e.closest(".color-picker-popup")||this._closeActiveColorPicker()}}setConfig(t){const e=(t.entities||[]).filter(Boolean).map(t=>"string"==typeof t?{entity:t}:t);this._config={...t,entities:e},this.requestUpdate()}connectedCallback(){super.connectedCallback(),document.addEventListener("mousedown",this._handleOutsideClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("mousedown",this._handleOutsideClick)}_closeActiveColorPicker(){if(!this._activeColorPicker)return;this.renderRoot.querySelectorAll(".color-picker-popup").forEach(t=>t.style.display="none"),this._activeColorPicker=null}_updateEntityOrGlobalConfig(t,e){this._updateConfig(n=>{if(null===t)return e(n);{const i=[...n.entities];return i[t]=e(i[t]),{...n,entities:i}}})}_updateConfig(t){if(!this._config)return;const e=t(this._config);this._config=e,((t,e,n,i)=>{const r=new CustomEvent(e,{bubbles:!0,cancelable:!1,composed:!0,...i,detail:n});t.dispatchEvent(r)})(this,"config-changed",{config:e})}_toggleColorPicker(t,e){t.stopPropagation();const n=this.renderRoot.querySelector(`.color-picker-popup[data-picker-id="${e}"]`);if(!n)return;const i=this._activeColorPicker===e;this._closeActiveColorPicker(),i||(n.style.display="block",this._activeColorPicker=e)}_handleColorModeChange(t,e=null){const n=t.detail?.value??t.target.value;this._updateEntityOrGlobalConfig(e,t=>{const i=(t.color_thresholds?.length??0)>0?"threshold":"single";if(n===i)return t;const r={...t};return"threshold"===n?(null!==e&&delete r.line_color,r.color_thresholds&&0!==r.color_thresholds.length||(r.color_thresholds=[{value:0,color:"#000000"}])):delete r.color_thresholds,r})}_sortValueChanged(t){const e=t.target,n=e.configValue;n&&this._config&&this._updateConfig(i=>{const r={...i},o={...r.sort||{}};let s;return s="ha-switch"===e.tagName?.toLowerCase()?e.checked:"ha-select"===e.tagName?.toLowerCase()?t.detail?.value??e.value:e.value,"sort_method"===n?"none"!==s&&s?o.method=s:delete o.method:"sort_reverse"===n?!1!==s&&s?o.reverse=!0:delete o.reverse:"sort_numeric"===n&&(!0===s||void 0===s?delete o.numeric:o.numeric=!1),0===Object.keys(o).length?delete r.sort:r.sort=o,r})}_valueChanged(t){const e=t.target,n=e.configValue;n&&this._config&&this._updateConfig(i=>{const r={...i};let o;return o="ha-switch"===e.tagName?.toLowerCase()?e.checked:"ha-select"===e.tagName?.toLowerCase()?t.detail?.value??e.value:e.value,"number"===e.type&&(o=""===e.value?void 0:Number(e.value)),void 0===o||"number"==typeof o&&isNaN(o)?delete r[n]:r[n]=o,r})}_entitySwitchChanged(t){const e=t.target,n=Number(e.dataset.index),i=e.dataset.field;if(isNaN(n)||!i)return;const r=e.checked;this._updateEntityOrGlobalConfig(n,t=>{const e={...t};return e[i]=r,e})}_entityAttributeChanged(t){const e=t.target,n=Number(e.dataset.index),i=e.dataset.field;if(isNaN(n)||!i)return;let r=t.detail?.value??e.value;"ha-slider"!==e.tagName.toLowerCase()&&"number"!==e.type||(r=""===e.value?void 0:Number(e.value)),this._updateEntityOrGlobalConfig(n,t=>{const e={...t};return""===r||void 0===r||"number"==typeof r&&isNaN(r)?delete e[i]:e[i]=r,e})}_colorPicked(t){const e=t.target.configValue;if(!e)return;const n=t.detail.value;this._updateConfig(t=>{if(t[e]===n)return t;const i={...t};return n?i[e]=n:delete i[e],i})}_thresholdChanged(t,e,n=null){const i=t.target,r=i.dataset.field,o=i.tagName.toLowerCase().includes("color-picker")?t.detail.value:i.value,s="value"===r?Number(o):o;this._updateEntityOrGlobalConfig(n,t=>{if(!t.color_thresholds)return t;const n=[...t.color_thresholds];return n[e]={...n[e],[r]:s},{...t,color_thresholds:n}})}_addThreshold(t=null){const e={value:0,color:"#000000"};this._updateEntityOrGlobalConfig(t,t=>{const n=[...t.color_thresholds||[],e];return{...t,color_thresholds:n}})}_removeThreshold(t,e=null){this._updateEntityOrGlobalConfig(e,e=>{if(!e.color_thresholds)return e;const n=[...e.color_thresholds];if(n.splice(t,1),0===n.length){const t={...e};return delete t.color_thresholds,t}return{...e,color_thresholds:n}})}_handleThresholdDragStart(t,e){this._draggedThresholdIndex=e,t.dataTransfer&&(t.dataTransfer.effectAllowed="move")}_handleThresholdDragOver(t,e){t.preventDefault(),e!==this._draggedThresholdIndex&&(this._dropThresholdIndex=e)}_handleThresholdDrop(t,e=null){t.preventDefault(),null!==this._draggedThresholdIndex&&null!==this._dropThresholdIndex&&(this._updateEntityOrGlobalConfig(e,t=>{if(!t.color_thresholds)return t;const e=[...t.color_thresholds],[n]=e.splice(this._draggedThresholdIndex,1);return e.splice(this._dropThresholdIndex,0,n),{...t,color_thresholds:e}}),this._draggedThresholdIndex=null,this._dropThresholdIndex=null)}_handleDragStart(t,e){this._draggedIndex=e,t.dataTransfer&&(t.dataTransfer.effectAllowed="move",t.dataTransfer.setData("text/plain",String(e)))}_handleDragOver(t,e){t.preventDefault(),e!==this._draggedIndex&&(this._dropIndex=e)}_handleDragLeave(){this._dropIndex=null}_handleDrop(t){t.preventDefault(),null!==this._draggedIndex&&null!==this._dropIndex&&this._draggedIndex!==this._dropIndex?(this._updateConfig(t=>{const e=[...t.entities],[n]=e.splice(this._draggedIndex,1);return e.splice(this._dropIndex,0,n),{...t,entities:e}}),this._handleDragEnd()):this._handleDragEnd()}_handleDragEnd(){this._draggedIndex=null,this._dropIndex=null}_addEntity(){this._updateConfig(t=>({...t,entities:[...t.entities,{entity:""}]}))}_removeEntity(t){this._updateConfig(e=>{const n=[...e.entities];return n.splice(t,1),{...e,entities:n}})}_overwriteAppearanceChanged(t){const e=t.target,n=Number(e.dataset.index);if(isNaN(n))return;const i=e.checked;this._updateEntityOrGlobalConfig(n,t=>{const e={...t};return i?e.overwrite_graph_appearance=!0:(delete e.overwrite_graph_appearance,delete e.line_color,delete e.line_opacity,delete e.color_thresholds,delete e.graph_min,delete e.graph_max),e}),this.requestUpdate()}_editEntity(t){this._editingIndex=t,this.requestUpdate()}_goBack(){this._editingIndex=null,this.requestUpdate()}_renderEntityEditor(){if(null===this._editingIndex)return j``;const t=this._config.entities[this._editingIndex];if(!t)return j``;const e=this.hass.states[t.entity],n=t.name||e?.attributes.friendly_name||t.entity,i=t.overwrite_graph_appearance??!1,r=t.icon_color||"var(--primary-text-color)",o=!(!e||("on"===e?.state||"off"===e?.state)||t.graph_entity&&t.graph_entity!==t.entity),s=t=>Bo(this.hass,`component.bge.editor.value_sources.${t}`),a=t.value_source??"latest",l=t.auto_icon_color_source??"latest",h=(t,e)=>{const n=this._editingIndex;null!==n&&this._updateEntityOrGlobalConfig(n,n=>{const i={...n};return"latest"!==e&&e?i[t]=e:delete i[t],i})};return j`
      <div class="header">
        <ha-icon-button @click=${this._goBack}><ha-icon icon="mdi:chevron-left"></ha-icon></ha-icon-button>
        <span class="title">${n}</span>
      </div>
      <div class="card-config">
        <ha-input
          .label=${Bo(this.hass,"component.bge.editor.name")}
          .value=${t.name||""}
          .configValue=${"name"}
          data-index=${this._editingIndex}
          data-field="name"
          @change=${this._entityAttributeChanged}
        ></ha-input>
        <ha-icon-picker
          .hass=${this.hass}
          .label=${Bo(this.hass,"component.bge.editor.icon")}
          .value=${t.icon||""}
          data-index=${this._editingIndex}
          data-field="icon"
          @value-changed=${this._entityAttributeChanged}
        ></ha-icon-picker>
        <ha-entity-picker
          .hass=${this.hass}
          .label=${Bo(this.hass,"component.bge.editor.graph_entity")}
          .value=${t.graph_entity||""}
          .helper=${Bo(this.hass,"component.bge.editor.graph_entity_helper")}
          data-index=${this._editingIndex}
          data-field="graph_entity"
          @value-changed=${this._entityAttributeChanged}
        ></ha-entity-picker>

        <ha-formfield .label=${Bo(this.hass,"component.bge.editor.show_icon")}>
          <ha-switch
            .checked=${!1!==t.show_icon}
            data-index=${this._editingIndex}
            data-field="show_icon"
            @change=${this._entitySwitchChanged}
          ></ha-switch>
        </ha-formfield>

        ${t.graph_entity?j`
              <ha-formfield .label=${Bo(this.hass,"component.bge.editor.show_graph_entity_state")}>
                <ha-switch
                  .checked=${!0===t.show_graph_entity_state}
                  data-index=${this._editingIndex}
                  data-field="show_graph_entity_state"
                  @change=${this._entitySwitchChanged}
                ></ha-switch>
              </ha-formfield>
            `:""}
        <ha-formfield .label=${Bo(this.hass,"component.bge.editor.auto_icon_color")}>
          <ha-switch
            .checked=${!0===t.auto_icon_color}
            data-index=${this._editingIndex}
            data-field="auto_icon_color"
            @change=${this._entitySwitchChanged}
          ></ha-switch>
        </ha-formfield>

        <div class="${t.auto_icon_color?"side-by-side":""}">
          ${t.auto_icon_color?j`
                <div class="dropdown-wrapper">
                  <ha-select
                    .label=${Bo(this.hass,"component.bge.editor.auto_icon_color_source")}
                    .value=${l}
                    .options=${[{value:"latest",label:s("latest")},{value:"max",label:s("max")},{value:"min",label:s("min")},{value:"avg",label:s("avg")},{value:"median",label:s("median")}]}
                    @selected=${t=>h("auto_icon_color_source",t.detail.value)}
                    @closed=${t=>t.stopPropagation()}
                  >
                  </ha-select>
                </div>
              `:""}

          <div
            class="color-input-wrapper ${t.auto_icon_color?"disabled":""}"
            data-picker-id="entity_icon_color_${this._editingIndex}"
            @mousedown=${e=>t.auto_icon_color?void 0:this._toggleColorPicker(e,`entity_icon_color_${this._editingIndex}`)}
          >
            <ha-input
              .label=${Bo(this.hass,"component.bge.editor.icon_color")}
              .value=${t.icon_color??""}
              .placeholder=${"var(--primary-text-color)"}
              .disabled=${!0===t.auto_icon_color}
              data-index=${this._editingIndex}
              data-field="icon_color"
              @change=${this._entityAttributeChanged}
            ></ha-input>
            <div class="color-preview" style="background-color: ${r}"></div>
            <div
              class="color-picker-popup"
              data-picker-id="entity_icon_color_${this._editingIndex}"
              @mousedown=${t=>t.stopPropagation()}
            >
              <hex-color-picker
                .color=${r}
                data-index=${this._editingIndex}
                data-field="icon_color"
                @color-changed=${this._entityAttributeChanged}
              ></hex-color-picker>
            </div>
          </div>
        </div>

        ${o?j`
              <div class="side-by-side">
                <div class="dropdown-wrapper">
                  <ha-select
                    .label=${Bo(this.hass,"component.bge.editor.value_source")}
                    .value=${a}
                    .options=${[{value:"latest",label:s("latest")},{value:"max",label:s("max")},{value:"min",label:s("min")},{value:"avg",label:s("avg")},{value:"median",label:s("median")}]}
                    @selected=${t=>h("value_source",t.detail.value)}
                    @closed=${t=>t.stopPropagation()}
                  >
                  </ha-select>
                </div>
                <ha-input
                  .label=${Bo(this.hass,"component.bge.editor.value_label")}
                  .value=${t.value_label??""}
                  .helper=${Bo(this.hass,"component.bge.editor.value_label_helper")}
                  helperPersistent
                  data-index=${this._editingIndex}
                  data-field="value_label"
                  @change=${this._entityAttributeChanged}
                ></ha-input>
              </div>
            `:""}

        <ha-formfield .label=${Bo(this.hass,"component.bge.editor.optional_overrides")}>
          <ha-switch
            .checked=${i}
            data-index=${this._editingIndex}
            @change=${this._overwriteAppearanceChanged}
          ></ha-switch>
        </ha-formfield>

        ${i?this._renderEntityGraphAppearanceEditor(this._editingIndex):""}
      </div>
    `}_renderGraphBoundsEditor(t,e,n){return j`
      <div class="side-by-side">
        <ha-input
          .label=${Bo(this.hass,"component.bge.editor.graph_min")}
          type="number"
          .value=${t.graph_min??""}
          data-field="graph_min"
          .configValue=${"graph_min"}
          data-index=${n}
          @change=${e}
        ></ha-input>
        <ha-input
          .label=${Bo(this.hass,"component.bge.editor.graph_max")}
          type="number"
          .value=${t.graph_max??""}
          data-field="graph_max"
          .configValue=${"graph_max"}
          data-index=${n}
          @change=${e}
        ></ha-input>
      </div>
    `}_renderEntityGraphAppearanceEditor(t){const e=this._config.entities[t];if(!e)return j``;const n=(e.color_thresholds?.length??0)>0?"threshold":"single",i=this.hass.themes?.darkMode??!1?"white":"black",r=e.line_color||this._config.line_color||i;return j`
      <div class="overrides">
        <h3>${Bo(this.hass,"component.bge.editor.graph_appearance")}</h3>

        <div class="opacity-slider-container">
          <div class="label-container">
            <span>${Bo(this.hass,"component.bge.editor.line_opacity")}</span>
            <span>${Number(e.line_opacity??this._config.line_opacity??.2).toFixed(3)}</span>
          </div>
          <ha-slider
            size="s"
            min="0.05"
            max="0.8"
            step="0.025"
            .value=${e.line_opacity??this._config.line_opacity??.2}
            data-index=${t}
            data-field="line_opacity"
            @change=${this._entityAttributeChanged}
            pin
          ></ha-slider>
        </div>

        ${this._renderGraphBoundsEditor(e,this._entityAttributeChanged,t)}

        <div class="dropdown-wrapper">
          <ha-select
            .label=${Bo(this.hass,"component.bge.editor.color_mode")}
            .value=${n}
            .options=${[{value:"single",label:Bo(this.hass,"component.bge.editor.color_modes.single")},{value:"threshold",label:Bo(this.hass,"component.bge.editor.color_modes.threshold")}]}
            @selected=${e=>this._handleColorModeChange(e,t)}
            @closed=${t=>t.stopPropagation()}
          >
          </ha-select>
        </div>

        ${"single"===n?j`
              <div
                class="color-input-wrapper"
                data-picker-id="entity_line_color_${t}"
                @mousedown=${e=>this._toggleColorPicker(e,`entity_line_color_${t}`)}
              >
                <ha-input
                  .label=${Bo(this.hass,"component.bge.editor.line_color")}
                  .value=${e.line_color??""}
                  .placeholder=${this._config.line_color||i}
                  data-index=${t}
                  data-field="line_color"
                  @change=${this._entityAttributeChanged}
                ></ha-input>
                <div class="color-preview" style="background-color: ${r}"></div>
                <div
                  class="color-picker-popup"
                  data-picker-id="entity_line_color_${t}"
                  @mousedown=${t=>t.stopPropagation()}
                >
                  <hex-color-picker
                    .color=${r}
                    data-index=${t}
                    data-field="line_color"
                    @color-changed=${this._entityAttributeChanged}
                  ></hex-color-picker>
                </div>
              </div>
            `:this._renderEntityThresholdsEditor(t)}
      </div>
    `}_renderEntityThresholdsEditor(t){const e=this._config.entities[t];return e?j`
      <div>
        <h4>${Bo(this.hass,"component.bge.editor.color_thresholds")}</h4>
        <div class="entities-container">
          ${(e.color_thresholds||[]).map((e,n)=>j`
              <div
                class="entity-container threshold-container ${this._dropThresholdIndex===n?"drag-over":""} ${this._draggedThresholdIndex===n?"dragging":""}"
                draggable="true"
                @dragstart=${t=>this._handleThresholdDragStart(t,n)}
                @dragover=${t=>this._handleThresholdDragOver(t,n)}
                @dragleave=${()=>this._dropThresholdIndex=null}
                @drop=${e=>this._handleThresholdDrop(e,t)}
                @dragend=${()=>{this._draggedThresholdIndex=null,this._dropThresholdIndex=null}}
              >
                <div class="drag-handle">
                  <ha-icon icon="mdi:drag-vertical"></ha-icon>
                </div>
                <div class="threshold-inputs">
                  <ha-input
                    .label=${Bo(this.hass,"component.bge.editor.value")}
                    type="number"
                    .value=${String(e.value)}
                    data-field="value"
                    @change=${e=>this._thresholdChanged(e,n,t)}
                  ></ha-input>
                  <div
                    class="color-input-wrapper"
                    data-picker-id=${`entity_${t}_threshold_${n}`}
                    @mousedown=${e=>this._toggleColorPicker(e,`entity_${t}_threshold_${n}`)}
                  >
                    <ha-input
                      .label=${Bo(this.hass,"component.bge.editor.color")}
                      .value=${e.color}
                      data-field="color"
                      @change=${e=>this._thresholdChanged(e,n,t)}
                    ></ha-input>
                    <div class="color-preview" style="background-color: ${e.color}"></div>
                    <div
                      class="color-picker-popup"
                      data-picker-id=${`entity_${t}_threshold_${n}`}
                      @mousedown=${t=>t.stopPropagation()}
                    >
                      <hex-color-picker
                        .color=${e.color}
                        data-field="color"
                        @color-changed=${e=>this._thresholdChanged(e,n,t)}
                      ></hex-color-picker>
                    </div>
                  </div>
                </div>
                <ha-icon-button class="remove-icon" @click=${()=>this._removeThreshold(n,t)}
                  ><ha-icon icon="mdi:close"></ha-icon
                ></ha-icon-button>
              </div>
            `)}
        </div>
        <ha-button size="s" class="add-threshold-button" @click=${()=>this._addThreshold(t)}>
          ${Bo(this.hass,"component.bge.editor.add_threshold")}
        </ha-button>
      </div>
    `:j``}render(){return this.hass&&this._config?null!==this._editingIndex?this._renderEntityEditor():this._renderMainConfig():j`<div>Waiting for config…</div>`}_renderMainConfig(){const t=(this._config.color_thresholds?.length??0)>0?"threshold":"single",e=this.hass.themes?.darkMode??!1?"white":"black";return j`
      <div class="card-config">
        <h3>${Bo(this.hass,"component.bge.editor.general")}</h3>
        <div class="side-by-side">
          <ha-input
            .label=${Bo(this.hass,"component.bge.editor.title")}
            .value=${this._config.title||""}
            .configValue=${"title"}
            @change=${this._valueChanged}
          ></ha-input>
        </div>
        <div class="formfield-with-help">
          <ha-formfield .label=${Bo(this.hass,"component.bge.editor.average_in_title")}>
            <ha-switch
              .checked=${!0===this._config.average_in_title}
              .configValue=${"average_in_title"}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
          <div class="tooltip-container">
            <ha-icon class="help-icon" icon="mdi:help-circle-outline"></ha-icon>
            <div class="tooltip-content">${Bo(this.hass,"component.bge.editor.average_in_title_helper")}</div>
          </div>
        </div>

        <h3>${Bo(this.hass,"component.bge.editor.layout")}</h3>
        <ha-formfield .label=${Bo(this.hass,"component.bge.editor.tile_style")}>
          <ha-switch
            .checked=${!0===this._config.tile_style}
            .configValue=${"tile_style"}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>
        <ha-formfield .label=${Bo(this.hass,"component.bge.editor.show_icon")}>
          <ha-switch
            .checked=${!1!==this._config.show_icon}
            .configValue=${"show_icon"}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>

        <h3>${Bo(this.hass,"component.bge.editor.graph_appearance")}</h3>
        <div class="side-by-side">
          <ha-input
            .label=${Bo(this.hass,"component.bge.editor.hours_to_show")}
            type="number"
            .value=${String(this._config.hours_to_show??24)}
            .configValue=${"hours_to_show"}
            @change=${this._valueChanged}
          ></ha-input>

          <ha-input
            .label=${Bo(this.hass,"component.bge.editor.line_width")}
            type="number"
            .value=${String(this._config.line_width??3)}
            .configValue=${"line_width"}
            @change=${this._valueChanged}
          ></ha-input>
        </div>

        <div class="side-by-side">
          <div class="dropdown-wrapper">
            <ha-select
              .label=${Bo(this.hass,"component.bge.editor.line_length")}
              .value=${this._config.line_length||"long"}
              .configValue=${"line_length"}
              .options=${[{value:"long",label:Bo(this.hass,"component.bge.editor.line_lengths.long")},{value:"short",label:Bo(this.hass,"component.bge.editor.line_lengths.short")}]}
              @selected=${this._valueChanged}
              @closed=${t=>t.stopPropagation()}
            >
            </ha-select>
          </div>
          <div class="dropdown-wrapper">
            <ha-select
              .label=${Bo(this.hass,"component.bge.editor.curve")}
              .value=${this._config.curve||"spline"}
              .configValue=${"curve"}
              .options=${[{value:"spline",label:Bo(this.hass,"component.bge.editor.curves.spline")},{value:"linear",label:Bo(this.hass,"component.bge.editor.curves.linear")},{value:"natural",label:Bo(this.hass,"component.bge.editor.curves.natural")},{value:"step",label:Bo(this.hass,"component.bge.editor.curves.step")}]}
              @selected=${this._valueChanged}
              @closed=${t=>t.stopPropagation()}
            >
            </ha-select>
          </div>
        </div>

        <ha-formfield .label=${Bo(this.hass,"component.bge.editor.line_glow")}>
          <ha-switch
            .checked=${!0===this._config.line_glow}
            .configValue=${"line_glow"}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>

        ${this._renderGraphBoundsEditor(this._config,this._valueChanged)}

        <div class="opacity-slider-container">
          <div class="label-container">
            <span>${Bo(this.hass,"component.bge.editor.line_opacity")}</span>
            <span>${Number(this._config.line_opacity??.2).toFixed(3)}</span>
          </div>
          <ha-slider
            size="s"
            min="0.05"
            max="0.8"
            step="0.025"
            .value=${this._config.line_opacity??.2}
            .configValue=${"line_opacity"}
            @change=${this._valueChanged}
            pin
          ></ha-slider>
        </div>

        <div class="side-by-side">
          <div class="dropdown-wrapper">
            <ha-select
              .label=${Bo(this.hass,"component.bge.editor.color_mode")}
              .value=${t}
              .options=${[{value:"single",label:Bo(this.hass,"component.bge.editor.color_modes.single")},{value:"threshold",label:Bo(this.hass,"component.bge.editor.color_modes.threshold")}]}
              @selected=${t=>this._handleColorModeChange(t,null)}
              @closed=${t=>t.stopPropagation()}
            >
            </ha-select>
          </div>
        </div>

        ${"single"===t?j`
              <div
                class="color-input-wrapper"
                data-picker-id="line_color"
                @mousedown=${t=>this._toggleColorPicker(t,"line_color")}
              >
                <ha-input
                  .label=${Bo(this.hass,"component.bge.editor.line_color")}
                  .value=${this._config.line_color||e}
                  .configValue=${"line_color"}
                  @change=${this._valueChanged}
                ></ha-input>
                <div
                  class="color-preview"
                  style="background-color: ${this._config.line_color||e}"
                ></div>
                <div
                  class="color-picker-popup"
                  data-picker-id="line_color"
                  @mousedown=${t=>t.stopPropagation()}
                >
                  <hex-color-picker
                    .color=${this._config.line_color||e}
                    .configValue=${"line_color"}
                    @color-changed=${this._colorPicked}
                  ></hex-color-picker>
                </div>
              </div>
            `:j`
              <div>
                <h3>${Bo(this.hass,"component.bge.editor.color_thresholds")}</h3>
                <div class="entities-container">
                  ${(this._config.color_thresholds||[]).map((t,e)=>j`
                      <div
                        class="entity-container threshold-container ${this._dropThresholdIndex===e?"drag-over":""} ${this._draggedThresholdIndex===e?"dragging":""}"
                        draggable="true"
                        @dragstart=${t=>this._handleThresholdDragStart(t,e)}
                        @dragover=${t=>this._handleThresholdDragOver(t,e)}
                        @dragleave=${()=>this._dropThresholdIndex=null}
                        @drop=${t=>this._handleThresholdDrop(t,null)}
                        @dragend=${()=>{this._draggedThresholdIndex=null,this._dropThresholdIndex=null}}
                      >
                        <div class="drag-handle">
                          <ha-icon icon="mdi:drag-vertical"></ha-icon>
                        </div>
                        <div class="threshold-inputs">
                          <ha-input
                            .label=${Bo(this.hass,"component.bge.editor.value")}
                            type="number"
                            .value=${String(t.value)}
                            data-field="value"
                            @change=${t=>this._thresholdChanged(t,e,null)}
                          ></ha-input>
                          <div
                            class="color-input-wrapper"
                            data-picker-id=${`threshold_${e}`}
                            @mousedown=${t=>this._toggleColorPicker(t,`threshold_${e}`)}
                          >
                            <ha-input
                              .label=${Bo(this.hass,"component.bge.editor.color")}
                              .value=${t.color}
                              data-field="color"
                              data-index=${String(e)}
                              @change=${t=>this._thresholdChanged(t,e,null)}
                            ></ha-input>
                            <div class="color-preview" style="background-color: ${t.color}"></div>
                            <div
                              class="color-picker-popup"
                              data-picker-id=${`threshold_${e}`}
                              @mousedown=${t=>t.stopPropagation()}
                            >
                              <hex-color-picker
                                .color=${t.color}
                                data-field="color"
                                @color-changed=${t=>this._thresholdChanged(t,e,null)}
                              ></hex-color-picker>
                            </div>
                          </div>
                        </div>
                        <ha-icon-button class="remove-icon" @click=${()=>this._removeThreshold(e,null)}
                          ><ha-icon icon="mdi:close"></ha-icon
                        ></ha-icon-button>
                      </div>
                    `)}
                </div>
                <ha-button size="s" class="add-threshold-button" @click=${()=>this._addThreshold(null)}>
                  ${Bo(this.hass,"component.bge.editor.add_threshold")}
                </ha-button>
              </div>
            `}

        <h3>${Bo(this.hass,"component.bge.editor.sorting")}</h3>
        <div class="side-by-side">
          <div class="dropdown-wrapper">
            <ha-select
              .label=${Bo(this.hass,"component.bge.editor.sort_method")}
              .value=${this._config.sort?.method||"none"}
              .configValue=${"sort_method"}
              .options=${[{value:"none",label:Bo(this.hass,"component.bge.editor.sort_methods.none")},{value:"name",label:Bo(this.hass,"component.bge.editor.sort_methods.name")},{value:"state",label:Bo(this.hass,"component.bge.editor.sort_methods.state")},{value:"value",label:Bo(this.hass,"component.bge.editor.sort_methods.value")}]}
              @selected=${this._sortValueChanged}
              @closed=${t=>t.stopPropagation()}
            >
            </ha-select>
          </div>
          <ha-formfield .label=${Bo(this.hass,"component.bge.editor.sort_reverse")}>
            <ha-switch
              .checked=${!0===this._config.sort?.reverse}
              .configValue=${"sort_reverse"}
              .disabled=${"none"===this._config.sort?.method||!this._config.sort?.method}
              @change=${this._sortValueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>
        <div class="side-by-side margin-bottom">
          <ha-formfield .label=${Bo(this.hass,"component.bge.editor.sort_numeric")}>
            <ha-switch
              .checked=${!1!==this._config.sort?.numeric}
              .configValue=${"sort_numeric"}
              .disabled=${"none"===this._config.sort?.method||!this._config.sort?.method}
              @change=${this._sortValueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>

        <h3>${Bo(this.hass,"component.bge.editor.data_settings")}</h3>
        <div class="side-by-side">
          <ha-input
            .label=${Bo(this.hass,"component.bge.editor.points_per_hour")}
            type="number"
            .value=${String(this._config.points_per_hour??1)}
            .configValue=${"points_per_hour"}
            @change=${this._valueChanged}
          ></ha-input>
          <ha-input
            .label=${Bo(this.hass,"component.bge.editor.update_interval")}
            type="number"
            .value=${String(this._config.update_interval??600)}
            .configValue=${"update_interval"}
            @change=${this._valueChanged}
          ></ha-input>
        </div>

        <h3>${Bo(this.hass,"component.bge.editor.entities")}</h3>

        <div class="entities-container">
          ${this._config.entities.map((t,e)=>j`
              <div
                class="entity-container ${this._dropIndex===e?"drag-over":""} ${this._draggedIndex===e?"dragging":""}"
                @dragover=${t=>this._handleDragOver(t,e)}
                @dragleave=${this._handleDragLeave}
                @drop=${this._handleDrop}
                @dragend=${this._handleDragEnd}
              >
                <div
                  class="drag-handle"
                  draggable="true"
                  @dragstart=${t=>this._handleDragStart(t,e)}
                >
                  <ha-icon icon="mdi:drag-vertical"></ha-icon>
                </div>
                <div class="entity-content">
                  <div class="entity-main">
                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${t.entity}
                      data-index=${e}
                      data-field="entity"
                      @mousedown=${t=>t.stopPropagation()}
                      @value-changed=${this._entityAttributeChanged}
                      allow-custom-entity
                    ></ha-entity-picker>
                    <ha-icon-button
                      class="edit-icon"
                      @mousedown=${t=>t.stopPropagation()}
                      @click=${()=>this._editEntity(e)}
                      ><ha-icon icon="mdi:pencil"></ha-icon
                    ></ha-icon-button>
                    <ha-icon-button
                      class="remove-icon"
                      @mousedown=${t=>t.stopPropagation()}
                      @click=${()=>this._removeEntity(e)}
                      ><ha-icon icon="mdi:close"></ha-icon
                    ></ha-icon-button>
                  </div>
                </div>
              </div>
            `)}
        </div>
        <ha-button size="s" class="add-entity-button" @click=${this._addEntity}>
          ${Bo(this.hass,"component.bge.editor.add_entity")}
        </ha-button>
      </div>
    `}static{this.styles=a`
    ${s(Wo)}
  `}};t([pt({attribute:!1})],xs.prototype,"hass",void 0),t([gt()],xs.prototype,"_config",void 0),t([gt()],xs.prototype,"_draggedIndex",void 0),t([gt()],xs.prototype,"_dropIndex",void 0),t([gt()],xs.prototype,"_draggedThresholdIndex",void 0),t([gt()],xs.prototype,"_dropThresholdIndex",void 0),t([gt()],xs.prototype,"_activeColorPicker",void 0),t([gt()],xs.prototype,"_editingIndex",void 0),xs=t([ct("background-graph-entities-editor")],xs);var Cs=Object.freeze({__proto__:null,get BackgroundGraphEntitiesEditor(){return xs}});export{jo as BackgroundGraphEntities};
