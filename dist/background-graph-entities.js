function e(e,t,n,i){var r,o=arguments.length,a=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,n,a):r(t,n))||a);return o>3&&a&&Object.defineProperty(t,n,a),a}console.groupCollapsed("%c📈 BACKGROUND GRAPH ENTITIES%cv1.12.0","color: orange; font-weight: bold; background: black; padding: 2px 4px; border-radius: 2px 0 0 2px;","color: white; font-weight: bold; background: dimgray; padding: 2px 4px; border-radius: 0 2px 2px 0;"),console.info("The `background-graph-entities` custom component for Home Assistant displays a list of entities with their current state and a mini graph showing the entity's history. This component is ideal for monitoring various sensor data, such as temperature, humidity, or other metrics."),console.info("Github:  https://github.com/timmaurice/lovelace-background-graph-entities.git"),console.info("Sponsor: https://buymeacoffee.com/timmaurice"),console.groupEnd(),"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,n=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let o=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(n&&void 0===e){const n=void 0!==t&&1===t.length;n&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&r.set(t,e))}return e}toString(){return this.cssText}};const a=e=>new o("string"==typeof e?e:e+"",void 0,i),s=(e,...t)=>{const n=1===e.length?e[0]:t.reduce((t,n,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+e[i+1],e[0]);return new o(n,e,i)},l=n?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:h,defineProperty:c,getOwnPropertyDescriptor:u,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:g}=Object,f=globalThis,_=f.trustedTypes,m=_?_.emptyScript:"",v=f.reactiveElementPolyfillSupport,y=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=null!==e;break;case Number:n=null===e?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch(e){n=null}}return n}},x=(e,t)=>!h(e,t),$={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:x};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(e,n,t);void 0!==i&&c(this.prototype,e,i)}}static getPropertyDescriptor(e,t,n){const{get:i,set:r}=u(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const o=i?.call(this);r?.call(this,t),this.requestUpdate(e,o,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=g(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...d(e),...p(e)];for(const n of t)this.createProperty(n,e[n])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const n=this._$Eu(e,t);void 0!==n&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const e of n)t.unshift(l(e))}else void 0!==e&&t.push(l(e));return t}static _$Eu(e,t){const n=t.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(n)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const n of i){const i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=n.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){const n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(void 0!==i&&!0===n.reflect){const r=(void 0!==n.converter?.toAttribute?n.converter:b).toAttribute(t,n.type);this._$Em=e,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){const n=this.constructor,i=n._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=n.getPropertyOptions(i),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=i;const o=r.fromAttribute(t,e.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(e,t,n,i=!1,r){if(void 0!==e){const o=this.constructor;if(!1===i&&(r=this[e]),n??=o.getPropertyOptions(e),!((n.hasChanged??x)(r,t)||n.useDefault&&n.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:i,wrapped:r},o){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==r||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,n]of e){const{wrapped:e}=n,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,n,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=new Map,w[y("finalized")]=new Map,v?.({ReactiveElement:w}),(f.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C=globalThis,k=e=>e,A=C.trustedTypes,M=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+S,N=`<${T}>`,D=document,U=()=>D.createComment(""),I=e=>null===e||"object"!=typeof e&&"function"!=typeof e,P=Array.isArray,O="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,z=/>/g,F=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),V=/'/g,R=/"/g,q=/^(?:script|style|textarea|title)$/i,j=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),G=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),Y=new WeakMap,W=D.createTreeWalker(D,129);function Z(e,t){if(!P(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==M?M.createHTML(t):t}const J=(e,t)=>{const n=e.length-1,i=[];let r,o=2===t?"<svg>":3===t?"<math>":"",a=H;for(let t=0;t<n;t++){const n=e[t];let s,l,h=-1,c=0;for(;c<n.length&&(a.lastIndex=c,l=a.exec(n),null!==l);)c=a.lastIndex,a===H?"!--"===l[1]?a=L:void 0!==l[1]?a=z:void 0!==l[2]?(q.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=F):void 0!==l[3]&&(a=F):a===F?">"===l[0]?(a=r??H,h=-1):void 0===l[1]?h=-2:(h=a.lastIndex-l[2].length,s=l[1],a=void 0===l[3]?F:'"'===l[3]?R:V):a===R||a===V?a=F:a===L||a===z?a=H:(a=F,r=void 0);const u=a===F&&e[t+1].startsWith("/>")?" ":"";o+=a===H?n+N:h>=0?(i.push(s),n.slice(0,h)+E+n.slice(h)+S+u):n+S+(-2===h?t:u)}return[Z(e,o+(e[n]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class X{constructor({strings:e,_$litType$:t},n){let i;this.parts=[];let r=0,o=0;const a=e.length-1,s=this.parts,[l,h]=J(e,t);if(this.el=X.createElement(l,n),W.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=W.nextNode())&&s.length<a;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(E)){const t=h[o++],n=i.getAttribute(e).split(S),a=/([.?@])?(.*)/.exec(t);s.push({type:1,index:r,name:a[2],strings:n,ctor:"."===a[1]?ne:"?"===a[1]?ie:"@"===a[1]?re:te}),i.removeAttribute(e)}else e.startsWith(S)&&(s.push({type:6,index:r}),i.removeAttribute(e));if(q.test(i.tagName)){const e=i.textContent.split(S),t=e.length-1;if(t>0){i.textContent=A?A.emptyScript:"";for(let n=0;n<t;n++)i.append(e[n],U()),W.nextNode(),s.push({type:2,index:++r});i.append(e[t],U())}}}else if(8===i.nodeType)if(i.data===T)s.push({type:2,index:r});else{let e=-1;for(;-1!==(e=i.data.indexOf(S,e+1));)s.push({type:7,index:r}),e+=S.length-1}r++}}static createElement(e,t){const n=D.createElement("template");return n.innerHTML=e,n}}function K(e,t,n=e,i){if(t===G)return t;let r=void 0!==i?n._$Co?.[i]:n._$Cl;const o=I(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(e),r._$AT(e,n,i)),void 0!==i?(n._$Co??=[])[i]=r:n._$Cl=r),void 0!==r&&(t=K(e,r._$AS(e,t.values),r,i)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,i=(e?.creationScope??D).importNode(t,!0);W.currentNode=i;let r=W.nextNode(),o=0,a=0,s=n[0];for(;void 0!==s;){if(o===s.index){let t;2===s.type?t=new ee(r,r.nextSibling,this,e):1===s.type?t=new s.ctor(r,s.name,s.strings,this,e):6===s.type&&(t=new oe(r,this,e)),this._$AV.push(t),s=n[++a]}o!==s?.index&&(r=W.nextNode(),o++)}return W.currentNode=D,i}p(e){let t=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,i){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=K(this,e,t),I(e)?e===B||null==e||""===e?(this._$AH!==B&&this._$AR(),this._$AH=B):e!==this._$AH&&e!==G&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>P(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==B&&I(this._$AH)?this._$AA.nextSibling.data=e:this.T(D.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,i="number"==typeof n?this._$AC(e):(void 0===n.el&&(n.el=X.createElement(Z(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new Q(i,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=Y.get(e.strings);return void 0===t&&Y.set(e.strings,t=new X(e)),t}k(e){P(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,i=0;for(const r of e)i===t.length?t.push(n=new ee(this.O(U()),this.O(U()),this,this.options)):n=t[i],n._$AI(r),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,i,r){this.type=1,this._$AH=B,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=B}_$AI(e,t=this,n,i){const r=this.strings;let o=!1;if(void 0===r)e=K(this,e,t,0),o=!I(e)||e!==this._$AH&&e!==G,o&&(this._$AH=e);else{const i=e;let a,s;for(e=r[0],a=0;a<r.length-1;a++)s=K(this,i[n+a],t,a),s===G&&(s=this._$AH[a]),o||=!I(s)||s!==this._$AH[a],s===B?e=B:e!==B&&(e+=(s??"")+r[a+1]),this._$AH[a]=s}o&&!i&&this.j(e)}j(e){e===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ne extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===B?void 0:e}}class ie extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==B)}}class re extends te{constructor(e,t,n,i,r){super(e,t,n,i,r),this.type=5}_$AI(e,t=this){if((e=K(this,e,t,0)??B)===G)return;const n=this._$AH,i=e===B&&n!==B||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,r=e!==B&&(n===B||i);i&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){K(this,e)}}const ae=C.litHtmlPolyfillSupport;ae?.(X,ee),(C.litHtmlVersions??=[]).push("3.3.3");const se=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class le extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,n)=>{const i=n?.renderBefore??t;let r=i._$litPart$;if(void 0===r){const e=n?.renderBefore??null;i._$litPart$=r=new ee(t.insertBefore(U(),e),e,void 0,n??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}}le._$litElement$=!0,le.finalized=!0,se.litElementHydrateSupport?.({LitElement:le});const he=se.litElementPolyfillSupport;he?.({LitElement:le}),(se.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ce=e=>(t,n)=>{void 0!==n?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ue={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:x},de=(e=ue,t,n)=>{const{kind:i,metadata:r}=n;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),o.set(n.name,e),"accessor"===i){const{name:i}=n;return{set(n){const r=t.get.call(this);t.set.call(this,n),this.requestUpdate(i,r,e,!0,n)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=n;return function(n){const r=this[i];t.call(this,n),this.requestUpdate(i,r,e,!0,n)}}throw Error("Unsupported decorator location: "+i)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pe(e){return(t,n)=>"object"==typeof n?de(e,t,n):((e,t,n)=>{const i=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),i?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ge(e){return pe({...e,state:!0,attribute:!1})}function fe(e,t){return null==e||null==t?NaN:e<t?-1:e>t?1:e>=t?0:NaN}function _e(e,t){return null==e||null==t?NaN:t<e?-1:t>e?1:t>=e?0:NaN}function me(e){let t,n,i;function r(e,i,r=0,o=e.length){if(r<o){if(0!==t(i,i))return o;do{const t=r+o>>>1;n(e[t],i)<0?r=t+1:o=t}while(r<o)}return r}return 2!==e.length?(t=fe,n=(t,n)=>fe(e(t),n),i=(t,n)=>e(t)-n):(t=e===fe||e===_e?e:ve,n=e,i=e),{left:r,center:function(e,t,n=0,o=e.length){const a=r(e,t,n,o-1);return a>n&&i(e[a-1],t)>-i(e[a],t)?a-1:a},right:function(e,i,r=0,o=e.length){if(r<o){if(0!==t(i,i))return o;do{const t=r+o>>>1;n(e[t],i)<=0?r=t+1:o=t}while(r<o)}return r}}}function ve(){return 0}const ye=me(fe).right;function be(e,t){let n,i;if(void 0===t)for(const t of e)null!=t&&(void 0===n?t>=t&&(n=i=t):(n>t&&(n=t),i<t&&(i=t)));else{let r=-1;for(let o of e)null!=(o=t(o,++r,e))&&(void 0===n?o>=o&&(n=i=o):(n>o&&(n=o),i<o&&(i=o)))}return[n,i]}me(function(e){return null===e?NaN:+e}).center;const xe=Math.sqrt(50),$e=Math.sqrt(10),we=Math.sqrt(2);function Ce(e,t,n){const i=(t-e)/Math.max(0,n),r=Math.floor(Math.log10(i)),o=i/Math.pow(10,r),a=o>=xe?10:o>=$e?5:o>=we?2:1;let s,l,h;return r<0?(h=Math.pow(10,-r)/a,s=Math.round(e*h),l=Math.round(t*h),s/h<e&&++s,l/h>t&&--l,h=-h):(h=Math.pow(10,r)*a,s=Math.round(e/h),l=Math.round(t/h),s*h<e&&++s,l*h>t&&--l),l<s&&.5<=n&&n<2?Ce(e,t,2*n):[s,l,h]}function ke(e,t,n){return Ce(e=+e,t=+t,n=+n)[2]}function Ae(e,t,n){n=+n;const i=(t=+t)<(e=+e),r=i?ke(t,e,n):ke(e,t,n);return(i?-1:1)*(r<0?1/-r:r)}function Me(e,t){switch(arguments.length){case 0:break;case 1:this.range(e);break;default:this.range(t).domain(e)}return this}function Ee(e,t,n){e.prototype=t.prototype=n,n.constructor=e}function Se(e,t){var n=Object.create(e.prototype);for(var i in t)n[i]=t[i];return n}function Te(){}var Ne=.7,De=1/Ne,Ue="\\s*([+-]?\\d+)\\s*",Ie="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",Pe="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Oe=/^#([0-9a-f]{3,8})$/,He=new RegExp(`^rgb\\(${Ue},${Ue},${Ue}\\)$`),Le=new RegExp(`^rgb\\(${Pe},${Pe},${Pe}\\)$`),ze=new RegExp(`^rgba\\(${Ue},${Ue},${Ue},${Ie}\\)$`),Fe=new RegExp(`^rgba\\(${Pe},${Pe},${Pe},${Ie}\\)$`),Ve=new RegExp(`^hsl\\(${Ie},${Pe},${Pe}\\)$`),Re=new RegExp(`^hsla\\(${Ie},${Pe},${Pe},${Ie}\\)$`),qe={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function je(){return this.rgb().formatHex()}function Ge(){return this.rgb().formatRgb()}function Be(e){var t,n;return e=(e+"").trim().toLowerCase(),(t=Oe.exec(e))?(n=t[1].length,t=parseInt(t[1],16),6===n?Ye(t):3===n?new Je(t>>8&15|t>>4&240,t>>4&15|240&t,(15&t)<<4|15&t,1):8===n?We(t>>24&255,t>>16&255,t>>8&255,(255&t)/255):4===n?We(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|240&t,((15&t)<<4|15&t)/255):null):(t=He.exec(e))?new Je(t[1],t[2],t[3],1):(t=Le.exec(e))?new Je(255*t[1]/100,255*t[2]/100,255*t[3]/100,1):(t=ze.exec(e))?We(t[1],t[2],t[3],t[4]):(t=Fe.exec(e))?We(255*t[1]/100,255*t[2]/100,255*t[3]/100,t[4]):(t=Ve.exec(e))?nt(t[1],t[2]/100,t[3]/100,1):(t=Re.exec(e))?nt(t[1],t[2]/100,t[3]/100,t[4]):qe.hasOwnProperty(e)?Ye(qe[e]):"transparent"===e?new Je(NaN,NaN,NaN,0):null}function Ye(e){return new Je(e>>16&255,e>>8&255,255&e,1)}function We(e,t,n,i){return i<=0&&(e=t=n=NaN),new Je(e,t,n,i)}function Ze(e,t,n,i){return 1===arguments.length?function(e){return e instanceof Te||(e=Be(e)),e?new Je((e=e.rgb()).r,e.g,e.b,e.opacity):new Je}(e):new Je(e,t,n,null==i?1:i)}function Je(e,t,n,i){this.r=+e,this.g=+t,this.b=+n,this.opacity=+i}function Xe(){return`#${tt(this.r)}${tt(this.g)}${tt(this.b)}`}function Ke(){const e=Qe(this.opacity);return`${1===e?"rgb(":"rgba("}${et(this.r)}, ${et(this.g)}, ${et(this.b)}${1===e?")":`, ${e})`}`}function Qe(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function et(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function tt(e){return((e=et(e))<16?"0":"")+e.toString(16)}function nt(e,t,n,i){return i<=0?e=t=n=NaN:n<=0||n>=1?e=t=NaN:t<=0&&(e=NaN),new rt(e,t,n,i)}function it(e){if(e instanceof rt)return new rt(e.h,e.s,e.l,e.opacity);if(e instanceof Te||(e=Be(e)),!e)return new rt;if(e instanceof rt)return e;var t=(e=e.rgb()).r/255,n=e.g/255,i=e.b/255,r=Math.min(t,n,i),o=Math.max(t,n,i),a=NaN,s=o-r,l=(o+r)/2;return s?(a=t===o?(n-i)/s+6*(n<i):n===o?(i-t)/s+2:(t-n)/s+4,s/=l<.5?o+r:2-o-r,a*=60):s=l>0&&l<1?0:a,new rt(a,s,l,e.opacity)}function rt(e,t,n,i){this.h=+e,this.s=+t,this.l=+n,this.opacity=+i}function ot(e){return(e=(e||0)%360)<0?e+360:e}function at(e){return Math.max(0,Math.min(1,e||0))}function st(e,t,n){return 255*(e<60?t+(n-t)*e/60:e<180?n:e<240?t+(n-t)*(240-e)/60:t)}Ee(Te,Be,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:je,formatHex:je,formatHex8:function(){return this.rgb().formatHex8()},formatHsl:function(){return it(this).formatHsl()},formatRgb:Ge,toString:Ge}),Ee(Je,Ze,Se(Te,{brighter(e){return e=null==e?De:Math.pow(De,e),new Je(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=null==e?Ne:Math.pow(Ne,e),new Je(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new Je(et(this.r),et(this.g),et(this.b),Qe(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Xe,formatHex:Xe,formatHex8:function(){return`#${tt(this.r)}${tt(this.g)}${tt(this.b)}${tt(255*(isNaN(this.opacity)?1:this.opacity))}`},formatRgb:Ke,toString:Ke})),Ee(rt,function(e,t,n,i){return 1===arguments.length?it(e):new rt(e,t,n,null==i?1:i)},Se(Te,{brighter(e){return e=null==e?De:Math.pow(De,e),new rt(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=null==e?Ne:Math.pow(Ne,e),new rt(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+360*(this.h<0),t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,i=n+(n<.5?n:1-n)*t,r=2*n-i;return new Je(st(e>=240?e-240:e+120,r,i),st(e,r,i),st(e<120?e+240:e-120,r,i),this.opacity)},clamp(){return new rt(ot(this.h),at(this.s),at(this.l),Qe(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=Qe(this.opacity);return`${1===e?"hsl(":"hsla("}${ot(this.h)}, ${100*at(this.s)}%, ${100*at(this.l)}%${1===e?")":`, ${e})`}`}}));var lt=e=>()=>e;function ht(e){return 1===(e=+e)?ct:function(t,n){return n-t?function(e,t,n){return e=Math.pow(e,n),t=Math.pow(t,n)-e,n=1/n,function(i){return Math.pow(e+i*t,n)}}(t,n,e):lt(isNaN(t)?n:t)}}function ct(e,t){var n=t-e;return n?function(e,t){return function(n){return e+n*t}}(e,n):lt(isNaN(e)?t:e)}var ut=function e(t){var n=ht(t);function i(e,t){var i=n((e=Ze(e)).r,(t=Ze(t)).r),r=n(e.g,t.g),o=n(e.b,t.b),a=ct(e.opacity,t.opacity);return function(t){return e.r=i(t),e.g=r(t),e.b=o(t),e.opacity=a(t),e+""}}return i.gamma=e,i}(1);function dt(e,t){t||(t=[]);var n,i=e?Math.min(t.length,e.length):0,r=t.slice();return function(o){for(n=0;n<i;++n)r[n]=e[n]*(1-o)+t[n]*o;return r}}function pt(e,t){var n,i=t?t.length:0,r=e?Math.min(i,e.length):0,o=new Array(r),a=new Array(i);for(n=0;n<r;++n)o[n]=bt(e[n],t[n]);for(;n<i;++n)a[n]=t[n];return function(e){for(n=0;n<r;++n)a[n]=o[n](e);return a}}function gt(e,t){var n=new Date;return e=+e,t=+t,function(i){return n.setTime(e*(1-i)+t*i),n}}function ft(e,t){return e=+e,t=+t,function(n){return e*(1-n)+t*n}}function _t(e,t){var n,i={},r={};for(n in null!==e&&"object"==typeof e||(e={}),null!==t&&"object"==typeof t||(t={}),t)n in e?i[n]=bt(e[n],t[n]):r[n]=t[n];return function(e){for(n in i)r[n]=i[n](e);return r}}var mt=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,vt=new RegExp(mt.source,"g");function yt(e,t){var n,i,r,o=mt.lastIndex=vt.lastIndex=0,a=-1,s=[],l=[];for(e+="",t+="";(n=mt.exec(e))&&(i=vt.exec(t));)(r=i.index)>o&&(r=t.slice(o,r),s[a]?s[a]+=r:s[++a]=r),(n=n[0])===(i=i[0])?s[a]?s[a]+=i:s[++a]=i:(s[++a]=null,l.push({i:a,x:ft(n,i)})),o=vt.lastIndex;return o<t.length&&(r=t.slice(o),s[a]?s[a]+=r:s[++a]=r),s.length<2?l[0]?function(e){return function(t){return e(t)+""}}(l[0].x):function(e){return function(){return e}}(t):(t=l.length,function(e){for(var n,i=0;i<t;++i)s[(n=l[i]).i]=n.x(e);return s.join("")})}function bt(e,t){var n,i=typeof t;return null==t||"boolean"===i?lt(t):("number"===i?ft:"string"===i?(n=Be(t))?(t=n,ut):yt:t instanceof Be?ut:t instanceof Date?gt:function(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}(t)?dt:Array.isArray(t)?pt:"function"!=typeof t.valueOf&&"function"!=typeof t.toString||isNaN(t)?_t:ft)(e,t)}function xt(e,t){return e=+e,t=+t,function(n){return Math.round(e*(1-n)+t*n)}}function $t(e){return+e}var wt=[0,1];function Ct(e){return e}function kt(e,t){return(t-=e=+e)?function(n){return(n-e)/t}:function(e){return function(){return e}}(isNaN(t)?NaN:.5)}function At(e,t,n){var i=e[0],r=e[1],o=t[0],a=t[1];return r<i?(i=kt(r,i),o=n(a,o)):(i=kt(i,r),o=n(o,a)),function(e){return o(i(e))}}function Mt(e,t,n){var i=Math.min(e.length,t.length)-1,r=new Array(i),o=new Array(i),a=-1;for(e[i]<e[0]&&(e=e.slice().reverse(),t=t.slice().reverse());++a<i;)r[a]=kt(e[a],e[a+1]),o[a]=n(t[a],t[a+1]);return function(t){var n=ye(e,t,1,i)-1;return o[n](r[n](t))}}function Et(e,t){return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown())}function St(){var e,t,n,i,r,o,a=wt,s=wt,l=bt,h=Ct;function c(){var e=Math.min(a.length,s.length);return h!==Ct&&(h=function(e,t){var n;return e>t&&(n=e,e=t,t=n),function(n){return Math.max(e,Math.min(t,n))}}(a[0],a[e-1])),i=e>2?Mt:At,r=o=null,u}function u(t){return null==t||isNaN(t=+t)?n:(r||(r=i(a.map(e),s,l)))(e(h(t)))}return u.invert=function(n){return h(t((o||(o=i(s,a.map(e),ft)))(n)))},u.domain=function(e){return arguments.length?(a=Array.from(e,$t),c()):a.slice()},u.range=function(e){return arguments.length?(s=Array.from(e),c()):s.slice()},u.rangeRound=function(e){return s=Array.from(e),l=xt,c()},u.clamp=function(e){return arguments.length?(h=!!e||Ct,c()):h!==Ct},u.interpolate=function(e){return arguments.length?(l=e,c()):l},u.unknown=function(e){return arguments.length?(n=e,u):n},function(n,i){return e=n,t=i,c()}}function Tt(){return St()(Ct,Ct)}function Nt(e,t){if(!isFinite(e)||0===e)return null;var n=(e=t?e.toExponential(t-1):e.toExponential()).indexOf("e"),i=e.slice(0,n);return[i.length>1?i[0]+i.slice(2):i,+e.slice(n+1)]}function Dt(e){return(e=Nt(Math.abs(e)))?e[1]:NaN}var Ut,It=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function Pt(e){if(!(t=It.exec(e)))throw new Error("invalid format: "+e);var t;return new Ot({fill:t[1],align:t[2],sign:t[3],symbol:t[4],zero:t[5],width:t[6],comma:t[7],precision:t[8]&&t[8].slice(1),trim:t[9],type:t[10]})}function Ot(e){this.fill=void 0===e.fill?" ":e.fill+"",this.align=void 0===e.align?">":e.align+"",this.sign=void 0===e.sign?"-":e.sign+"",this.symbol=void 0===e.symbol?"":e.symbol+"",this.zero=!!e.zero,this.width=void 0===e.width?void 0:+e.width,this.comma=!!e.comma,this.precision=void 0===e.precision?void 0:+e.precision,this.trim=!!e.trim,this.type=void 0===e.type?"":e.type+""}function Ht(e,t){var n=Nt(e,t);if(!n)return e+"";var i=n[0],r=n[1];return r<0?"0."+new Array(-r).join("0")+i:i.length>r+1?i.slice(0,r+1)+"."+i.slice(r+1):i+new Array(r-i.length+2).join("0")}Pt.prototype=Ot.prototype,Ot.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(void 0===this.width?"":Math.max(1,0|this.width))+(this.comma?",":"")+(void 0===this.precision?"":"."+Math.max(0,0|this.precision))+(this.trim?"~":"")+this.type};var Lt={"%":(e,t)=>(100*e).toFixed(t),b:e=>Math.round(e).toString(2),c:e=>e+"",d:function(e){return Math.abs(e=Math.round(e))>=1e21?e.toLocaleString("en").replace(/,/g,""):e.toString(10)},e:(e,t)=>e.toExponential(t),f:(e,t)=>e.toFixed(t),g:(e,t)=>e.toPrecision(t),o:e=>Math.round(e).toString(8),p:(e,t)=>Ht(100*e,t),r:Ht,s:function(e,t){var n=Nt(e,t);if(!n)return Ut=void 0,e.toPrecision(t);var i=n[0],r=n[1],o=r-(Ut=3*Math.max(-8,Math.min(8,Math.floor(r/3))))+1,a=i.length;return o===a?i:o>a?i+new Array(o-a+1).join("0"):o>0?i.slice(0,o)+"."+i.slice(o):"0."+new Array(1-o).join("0")+Nt(e,Math.max(0,t+o-1))[0]},X:e=>Math.round(e).toString(16).toUpperCase(),x:e=>Math.round(e).toString(16)};function zt(e){return e}var Ft,Vt,Rt,qt=Array.prototype.map,jt=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function Gt(e){var t,n,i=void 0===e.grouping||void 0===e.thousands?zt:(t=qt.call(e.grouping,Number),n=e.thousands+"",function(e,i){for(var r=e.length,o=[],a=0,s=t[0],l=0;r>0&&s>0&&(l+s+1>i&&(s=Math.max(1,i-l)),o.push(e.substring(r-=s,r+s)),!((l+=s+1)>i));)s=t[a=(a+1)%t.length];return o.reverse().join(n)}),r=void 0===e.currency?"":e.currency[0]+"",o=void 0===e.currency?"":e.currency[1]+"",a=void 0===e.decimal?".":e.decimal+"",s=void 0===e.numerals?zt:function(e){return function(t){return t.replace(/[0-9]/g,function(t){return e[+t]})}}(qt.call(e.numerals,String)),l=void 0===e.percent?"%":e.percent+"",h=void 0===e.minus?"−":e.minus+"",c=void 0===e.nan?"NaN":e.nan+"";function u(e,t){var n=(e=Pt(e)).fill,u=e.align,d=e.sign,p=e.symbol,g=e.zero,f=e.width,_=e.comma,m=e.precision,v=e.trim,y=e.type;"n"===y?(_=!0,y="g"):Lt[y]||(void 0===m&&(m=12),v=!0,y="g"),(g||"0"===n&&"="===u)&&(g=!0,n="0",u="=");var b=(t&&void 0!==t.prefix?t.prefix:"")+("$"===p?r:"#"===p&&/[boxX]/.test(y)?"0"+y.toLowerCase():""),x=("$"===p?o:/[%p]/.test(y)?l:"")+(t&&void 0!==t.suffix?t.suffix:""),$=Lt[y],w=/[defgprs%]/.test(y);function C(e){var t,r,o,l=b,p=x;if("c"===y)p=$(e)+p,e="";else{var C=(e=+e)<0||1/e<0;if(e=isNaN(e)?c:$(Math.abs(e),m),v&&(e=function(e){e:for(var t,n=e.length,i=1,r=-1;i<n;++i)switch(e[i]){case".":r=t=i;break;case"0":0===r&&(r=i),t=i;break;default:if(!+e[i])break e;r>0&&(r=0)}return r>0?e.slice(0,r)+e.slice(t+1):e}(e)),C&&0===+e&&"+"!==d&&(C=!1),l=(C?"("===d?d:h:"-"===d||"("===d?"":d)+l,p=("s"!==y||isNaN(e)||void 0===Ut?"":jt[8+Ut/3])+p+(C&&"("===d?")":""),w)for(t=-1,r=e.length;++t<r;)if(48>(o=e.charCodeAt(t))||o>57){p=(46===o?a+e.slice(t+1):e.slice(t))+p,e=e.slice(0,t);break}}_&&!g&&(e=i(e,1/0));var k=l.length+e.length+p.length,A=k<f?new Array(f-k+1).join(n):"";switch(_&&g&&(e=i(A+e,A.length?f-p.length:1/0),A=""),u){case"<":e=l+e+p+A;break;case"=":e=l+A+e+p;break;case"^":e=A.slice(0,k=A.length>>1)+l+e+p+A.slice(k);break;default:e=A+l+e+p}return s(e)}return m=void 0===m?6:/[gprs]/.test(y)?Math.max(1,Math.min(21,m)):Math.max(0,Math.min(20,m)),C.toString=function(){return e+""},C}return{format:u,formatPrefix:function(e,t){var n=3*Math.max(-8,Math.min(8,Math.floor(Dt(t)/3))),i=Math.pow(10,-n),r=u(((e=Pt(e)).type="f",e),{suffix:jt[8+n/3]});return function(e){return r(i*e)}}}}function Bt(e,t,n,i){var r,o=Ae(e,t,n);switch((i=Pt(null==i?",f":i)).type){case"s":var a=Math.max(Math.abs(e),Math.abs(t));return null!=i.precision||isNaN(r=function(e,t){return Math.max(0,3*Math.max(-8,Math.min(8,Math.floor(Dt(t)/3)))-Dt(Math.abs(e)))}(o,a))||(i.precision=r),Rt(i,a);case"":case"e":case"g":case"p":case"r":null!=i.precision||isNaN(r=function(e,t){return e=Math.abs(e),t=Math.abs(t)-e,Math.max(0,Dt(t)-Dt(e))+1}(o,Math.max(Math.abs(e),Math.abs(t))))||(i.precision=r-("e"===i.type));break;case"f":case"%":null!=i.precision||isNaN(r=function(e){return Math.max(0,-Dt(Math.abs(e)))}(o))||(i.precision=r-2*("%"===i.type))}return Vt(i)}function Yt(e){var t=e.domain;return e.ticks=function(e){var n=t();return function(e,t,n){if(!((n=+n)>0))return[];if((e=+e)===(t=+t))return[e];const i=t<e,[r,o,a]=i?Ce(t,e,n):Ce(e,t,n);if(!(o>=r))return[];const s=o-r+1,l=new Array(s);if(i)if(a<0)for(let e=0;e<s;++e)l[e]=(o-e)/-a;else for(let e=0;e<s;++e)l[e]=(o-e)*a;else if(a<0)for(let e=0;e<s;++e)l[e]=(r+e)/-a;else for(let e=0;e<s;++e)l[e]=(r+e)*a;return l}(n[0],n[n.length-1],null==e?10:e)},e.tickFormat=function(e,n){var i=t();return Bt(i[0],i[i.length-1],null==e?10:e,n)},e.nice=function(n){null==n&&(n=10);var i,r,o=t(),a=0,s=o.length-1,l=o[a],h=o[s],c=10;for(h<l&&(r=l,l=h,h=r,r=a,a=s,s=r);c-- >0;){if((r=ke(l,h,n))===i)return o[a]=l,o[s]=h,t(o);if(r>0)l=Math.floor(l/r)*r,h=Math.ceil(h/r)*r;else{if(!(r<0))break;l=Math.ceil(l*r)/r,h=Math.floor(h*r)/r}i=r}return e},e}function Wt(){var e=Tt();return e.copy=function(){return Et(e,Wt())},Me.apply(e,arguments),Yt(e)}Ft=Gt({thousands:",",grouping:[3],currency:["$",""]}),Vt=Ft.format,Rt=Ft.formatPrefix;const Zt=new Date,Jt=new Date;function Xt(e,t,n,i){function r(t){return e(t=0===arguments.length?new Date:new Date(+t)),t}return r.floor=t=>(e(t=new Date(+t)),t),r.ceil=n=>(e(n=new Date(n-1)),t(n,1),e(n),n),r.round=e=>{const t=r(e),n=r.ceil(e);return e-t<n-e?t:n},r.offset=(e,n)=>(t(e=new Date(+e),null==n?1:Math.floor(n)),e),r.range=(n,i,o)=>{const a=[];if(n=r.ceil(n),o=null==o?1:Math.floor(o),!(n<i&&o>0))return a;let s;do{a.push(s=new Date(+n)),t(n,o),e(n)}while(s<n&&n<i);return a},r.filter=n=>Xt(t=>{if(t>=t)for(;e(t),!n(t);)t.setTime(t-1)},(e,i)=>{if(e>=e)if(i<0)for(;++i<=0;)for(;t(e,-1),!n(e););else for(;--i>=0;)for(;t(e,1),!n(e););}),n&&(r.count=(t,i)=>(Zt.setTime(+t),Jt.setTime(+i),e(Zt),e(Jt),Math.floor(n(Zt,Jt))),r.every=e=>(e=Math.floor(e),isFinite(e)&&e>0?e>1?r.filter(i?t=>i(t)%e===0:t=>r.count(0,t)%e===0):r:null)),r}const Kt=Xt(()=>{},(e,t)=>{e.setTime(+e+t)},(e,t)=>t-e);Kt.every=e=>(e=Math.floor(e),isFinite(e)&&e>0?e>1?Xt(t=>{t.setTime(Math.floor(t/e)*e)},(t,n)=>{t.setTime(+t+n*e)},(t,n)=>(n-t)/e):Kt:null),Kt.range;const Qt=1e3,en=6e4,tn=36e5,nn=864e5,rn=6048e5,on=2592e6,an=31536e6,sn=Xt(e=>{e.setTime(e-e.getMilliseconds())},(e,t)=>{e.setTime(+e+t*Qt)},(e,t)=>(t-e)/Qt,e=>e.getUTCSeconds());sn.range;const ln=Xt(e=>{e.setTime(e-e.getMilliseconds()-e.getSeconds()*Qt)},(e,t)=>{e.setTime(+e+t*en)},(e,t)=>(t-e)/en,e=>e.getMinutes());ln.range;const hn=Xt(e=>{e.setUTCSeconds(0,0)},(e,t)=>{e.setTime(+e+t*en)},(e,t)=>(t-e)/en,e=>e.getUTCMinutes());hn.range;const cn=Xt(e=>{e.setTime(e-e.getMilliseconds()-e.getSeconds()*Qt-e.getMinutes()*en)},(e,t)=>{e.setTime(+e+t*tn)},(e,t)=>(t-e)/tn,e=>e.getHours());cn.range;const un=Xt(e=>{e.setUTCMinutes(0,0,0)},(e,t)=>{e.setTime(+e+t*tn)},(e,t)=>(t-e)/tn,e=>e.getUTCHours());un.range;const dn=Xt(e=>e.setHours(0,0,0,0),(e,t)=>e.setDate(e.getDate()+t),(e,t)=>(t-e-(t.getTimezoneOffset()-e.getTimezoneOffset())*en)/nn,e=>e.getDate()-1);dn.range;const pn=Xt(e=>{e.setUTCHours(0,0,0,0)},(e,t)=>{e.setUTCDate(e.getUTCDate()+t)},(e,t)=>(t-e)/nn,e=>e.getUTCDate()-1);pn.range;const gn=Xt(e=>{e.setUTCHours(0,0,0,0)},(e,t)=>{e.setUTCDate(e.getUTCDate()+t)},(e,t)=>(t-e)/nn,e=>Math.floor(e/nn));function fn(e){return Xt(t=>{t.setDate(t.getDate()-(t.getDay()+7-e)%7),t.setHours(0,0,0,0)},(e,t)=>{e.setDate(e.getDate()+7*t)},(e,t)=>(t-e-(t.getTimezoneOffset()-e.getTimezoneOffset())*en)/rn)}gn.range;const _n=fn(0),mn=fn(1),vn=fn(2),yn=fn(3),bn=fn(4),xn=fn(5),$n=fn(6);function wn(e){return Xt(t=>{t.setUTCDate(t.getUTCDate()-(t.getUTCDay()+7-e)%7),t.setUTCHours(0,0,0,0)},(e,t)=>{e.setUTCDate(e.getUTCDate()+7*t)},(e,t)=>(t-e)/rn)}_n.range,mn.range,vn.range,yn.range,bn.range,xn.range,$n.range;const Cn=wn(0),kn=wn(1),An=wn(2),Mn=wn(3),En=wn(4),Sn=wn(5),Tn=wn(6);Cn.range,kn.range,An.range,Mn.range,En.range,Sn.range,Tn.range;const Nn=Xt(e=>{e.setDate(1),e.setHours(0,0,0,0)},(e,t)=>{e.setMonth(e.getMonth()+t)},(e,t)=>t.getMonth()-e.getMonth()+12*(t.getFullYear()-e.getFullYear()),e=>e.getMonth());Nn.range;const Dn=Xt(e=>{e.setUTCDate(1),e.setUTCHours(0,0,0,0)},(e,t)=>{e.setUTCMonth(e.getUTCMonth()+t)},(e,t)=>t.getUTCMonth()-e.getUTCMonth()+12*(t.getUTCFullYear()-e.getUTCFullYear()),e=>e.getUTCMonth());Dn.range;const Un=Xt(e=>{e.setMonth(0,1),e.setHours(0,0,0,0)},(e,t)=>{e.setFullYear(e.getFullYear()+t)},(e,t)=>t.getFullYear()-e.getFullYear(),e=>e.getFullYear());Un.every=e=>isFinite(e=Math.floor(e))&&e>0?Xt(t=>{t.setFullYear(Math.floor(t.getFullYear()/e)*e),t.setMonth(0,1),t.setHours(0,0,0,0)},(t,n)=>{t.setFullYear(t.getFullYear()+n*e)}):null,Un.range;const In=Xt(e=>{e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0)},(e,t)=>{e.setUTCFullYear(e.getUTCFullYear()+t)},(e,t)=>t.getUTCFullYear()-e.getUTCFullYear(),e=>e.getUTCFullYear());In.every=e=>isFinite(e=Math.floor(e))&&e>0?Xt(t=>{t.setUTCFullYear(Math.floor(t.getUTCFullYear()/e)*e),t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)},(t,n)=>{t.setUTCFullYear(t.getUTCFullYear()+n*e)}):null,In.range;const[Pn,On]=function(e,t,n,i,r,o){const a=[[sn,1,Qt],[sn,5,5e3],[sn,15,15e3],[sn,30,3e4],[o,1,en],[o,5,3e5],[o,15,9e5],[o,30,18e5],[r,1,tn],[r,3,108e5],[r,6,216e5],[r,12,432e5],[i,1,nn],[i,2,1728e5],[n,1,rn],[t,1,on],[t,3,7776e6],[e,1,an]];function s(t,n,i){const r=Math.abs(n-t)/i,o=me(([,,e])=>e).right(a,r);if(o===a.length)return e.every(Ae(t/an,n/an,i));if(0===o)return Kt.every(Math.max(Ae(t,n,i),1));const[s,l]=a[r/a[o-1][2]<a[o][2]/r?o-1:o];return s.every(l)}return[function(e,t,n){const i=t<e;i&&([e,t]=[t,e]);const r=n&&"function"==typeof n.range?n:s(e,t,n),o=r?r.range(e,+t+1):[];return i?o.reverse():o},s]}(Un,Nn,_n,dn,cn,ln);function Hn(e){if(0<=e.y&&e.y<100){var t=new Date(-1,e.m,e.d,e.H,e.M,e.S,e.L);return t.setFullYear(e.y),t}return new Date(e.y,e.m,e.d,e.H,e.M,e.S,e.L)}function Ln(e){if(0<=e.y&&e.y<100){var t=new Date(Date.UTC(-1,e.m,e.d,e.H,e.M,e.S,e.L));return t.setUTCFullYear(e.y),t}return new Date(Date.UTC(e.y,e.m,e.d,e.H,e.M,e.S,e.L))}function zn(e,t,n){return{y:e,m:t,d:n,H:0,M:0,S:0,L:0}}var Fn,Vn,Rn={"-":"",_:" ",0:"0"},qn=/^\s*\d+/,jn=/^%/,Gn=/[\\^$*+?|[\]().{}]/g;function Bn(e,t,n){var i=e<0?"-":"",r=(i?-e:e)+"",o=r.length;return i+(o<n?new Array(n-o+1).join(t)+r:r)}function Yn(e){return e.replace(Gn,"\\$&")}function Wn(e){return new RegExp("^(?:"+e.map(Yn).join("|")+")","i")}function Zn(e){return new Map(e.map((e,t)=>[e.toLowerCase(),t]))}function Jn(e,t,n){var i=qn.exec(t.slice(n,n+1));return i?(e.w=+i[0],n+i[0].length):-1}function Xn(e,t,n){var i=qn.exec(t.slice(n,n+1));return i?(e.u=+i[0],n+i[0].length):-1}function Kn(e,t,n){var i=qn.exec(t.slice(n,n+2));return i?(e.U=+i[0],n+i[0].length):-1}function Qn(e,t,n){var i=qn.exec(t.slice(n,n+2));return i?(e.V=+i[0],n+i[0].length):-1}function ei(e,t,n){var i=qn.exec(t.slice(n,n+2));return i?(e.W=+i[0],n+i[0].length):-1}function ti(e,t,n){var i=qn.exec(t.slice(n,n+4));return i?(e.y=+i[0],n+i[0].length):-1}function ni(e,t,n){var i=qn.exec(t.slice(n,n+2));return i?(e.y=+i[0]+(+i[0]>68?1900:2e3),n+i[0].length):-1}function ii(e,t,n){var i=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(n,n+6));return i?(e.Z=i[1]?0:-(i[2]+(i[3]||"00")),n+i[0].length):-1}function ri(e,t,n){var i=qn.exec(t.slice(n,n+1));return i?(e.q=3*i[0]-3,n+i[0].length):-1}function oi(e,t,n){var i=qn.exec(t.slice(n,n+2));return i?(e.m=i[0]-1,n+i[0].length):-1}function ai(e,t,n){var i=qn.exec(t.slice(n,n+2));return i?(e.d=+i[0],n+i[0].length):-1}function si(e,t,n){var i=qn.exec(t.slice(n,n+3));return i?(e.m=0,e.d=+i[0],n+i[0].length):-1}function li(e,t,n){var i=qn.exec(t.slice(n,n+2));return i?(e.H=+i[0],n+i[0].length):-1}function hi(e,t,n){var i=qn.exec(t.slice(n,n+2));return i?(e.M=+i[0],n+i[0].length):-1}function ci(e,t,n){var i=qn.exec(t.slice(n,n+2));return i?(e.S=+i[0],n+i[0].length):-1}function ui(e,t,n){var i=qn.exec(t.slice(n,n+3));return i?(e.L=+i[0],n+i[0].length):-1}function di(e,t,n){var i=qn.exec(t.slice(n,n+6));return i?(e.L=Math.floor(i[0]/1e3),n+i[0].length):-1}function pi(e,t,n){var i=jn.exec(t.slice(n,n+1));return i?n+i[0].length:-1}function gi(e,t,n){var i=qn.exec(t.slice(n));return i?(e.Q=+i[0],n+i[0].length):-1}function fi(e,t,n){var i=qn.exec(t.slice(n));return i?(e.s=+i[0],n+i[0].length):-1}function _i(e,t){return Bn(e.getDate(),t,2)}function mi(e,t){return Bn(e.getHours(),t,2)}function vi(e,t){return Bn(e.getHours()%12||12,t,2)}function yi(e,t){return Bn(1+dn.count(Un(e),e),t,3)}function bi(e,t){return Bn(e.getMilliseconds(),t,3)}function xi(e,t){return bi(e,t)+"000"}function $i(e,t){return Bn(e.getMonth()+1,t,2)}function wi(e,t){return Bn(e.getMinutes(),t,2)}function Ci(e,t){return Bn(e.getSeconds(),t,2)}function ki(e){var t=e.getDay();return 0===t?7:t}function Ai(e,t){return Bn(_n.count(Un(e)-1,e),t,2)}function Mi(e){var t=e.getDay();return t>=4||0===t?bn(e):bn.ceil(e)}function Ei(e,t){return e=Mi(e),Bn(bn.count(Un(e),e)+(4===Un(e).getDay()),t,2)}function Si(e){return e.getDay()}function Ti(e,t){return Bn(mn.count(Un(e)-1,e),t,2)}function Ni(e,t){return Bn(e.getFullYear()%100,t,2)}function Di(e,t){return Bn((e=Mi(e)).getFullYear()%100,t,2)}function Ui(e,t){return Bn(e.getFullYear()%1e4,t,4)}function Ii(e,t){var n=e.getDay();return Bn((e=n>=4||0===n?bn(e):bn.ceil(e)).getFullYear()%1e4,t,4)}function Pi(e){var t=e.getTimezoneOffset();return(t>0?"-":(t*=-1,"+"))+Bn(t/60|0,"0",2)+Bn(t%60,"0",2)}function Oi(e,t){return Bn(e.getUTCDate(),t,2)}function Hi(e,t){return Bn(e.getUTCHours(),t,2)}function Li(e,t){return Bn(e.getUTCHours()%12||12,t,2)}function zi(e,t){return Bn(1+pn.count(In(e),e),t,3)}function Fi(e,t){return Bn(e.getUTCMilliseconds(),t,3)}function Vi(e,t){return Fi(e,t)+"000"}function Ri(e,t){return Bn(e.getUTCMonth()+1,t,2)}function qi(e,t){return Bn(e.getUTCMinutes(),t,2)}function ji(e,t){return Bn(e.getUTCSeconds(),t,2)}function Gi(e){var t=e.getUTCDay();return 0===t?7:t}function Bi(e,t){return Bn(Cn.count(In(e)-1,e),t,2)}function Yi(e){var t=e.getUTCDay();return t>=4||0===t?En(e):En.ceil(e)}function Wi(e,t){return e=Yi(e),Bn(En.count(In(e),e)+(4===In(e).getUTCDay()),t,2)}function Zi(e){return e.getUTCDay()}function Ji(e,t){return Bn(kn.count(In(e)-1,e),t,2)}function Xi(e,t){return Bn(e.getUTCFullYear()%100,t,2)}function Ki(e,t){return Bn((e=Yi(e)).getUTCFullYear()%100,t,2)}function Qi(e,t){return Bn(e.getUTCFullYear()%1e4,t,4)}function er(e,t){var n=e.getUTCDay();return Bn((e=n>=4||0===n?En(e):En.ceil(e)).getUTCFullYear()%1e4,t,4)}function tr(){return"+0000"}function nr(){return"%"}function ir(e){return+e}function rr(e){return Math.floor(+e/1e3)}function or(e){return new Date(e)}function ar(e){return e instanceof Date?+e:+new Date(+e)}function sr(e,t,n,i,r,o,a,s,l,h){var c=Tt(),u=c.invert,d=c.domain,p=h(".%L"),g=h(":%S"),f=h("%I:%M"),_=h("%I %p"),m=h("%a %d"),v=h("%b %d"),y=h("%B"),b=h("%Y");function x(e){return(l(e)<e?p:s(e)<e?g:a(e)<e?f:o(e)<e?_:i(e)<e?r(e)<e?m:v:n(e)<e?y:b)(e)}return c.invert=function(e){return new Date(u(e))},c.domain=function(e){return arguments.length?d(Array.from(e,ar)):d().map(or)},c.ticks=function(t){var n=d();return e(n[0],n[n.length-1],null==t?10:t)},c.tickFormat=function(e,t){return null==t?x:h(t)},c.nice=function(e){var n=d();return e&&"function"==typeof e.range||(e=t(n[0],n[n.length-1],null==e?10:e)),e?d(function(e,t){var n,i=0,r=(e=e.slice()).length-1,o=e[i],a=e[r];return a<o&&(n=i,i=r,r=n,n=o,o=a,a=n),e[i]=t.floor(o),e[r]=t.ceil(a),e}(n,e)):c},c.copy=function(){return Et(c,sr(e,t,n,i,r,o,a,s,l,h))},c}function lr(){return Me.apply(sr(Pn,On,Un,Nn,_n,dn,cn,ln,sn,Vn).domain([new Date(2e3,0,1),new Date(2e3,0,2)]),arguments)}!function(e){Fn=function(e){var t=e.dateTime,n=e.date,i=e.time,r=e.periods,o=e.days,a=e.shortDays,s=e.months,l=e.shortMonths,h=Wn(r),c=Zn(r),u=Wn(o),d=Zn(o),p=Wn(a),g=Zn(a),f=Wn(s),_=Zn(s),m=Wn(l),v=Zn(l),y={a:function(e){return a[e.getDay()]},A:function(e){return o[e.getDay()]},b:function(e){return l[e.getMonth()]},B:function(e){return s[e.getMonth()]},c:null,d:_i,e:_i,f:xi,g:Di,G:Ii,H:mi,I:vi,j:yi,L:bi,m:$i,M:wi,p:function(e){return r[+(e.getHours()>=12)]},q:function(e){return 1+~~(e.getMonth()/3)},Q:ir,s:rr,S:Ci,u:ki,U:Ai,V:Ei,w:Si,W:Ti,x:null,X:null,y:Ni,Y:Ui,Z:Pi,"%":nr},b={a:function(e){return a[e.getUTCDay()]},A:function(e){return o[e.getUTCDay()]},b:function(e){return l[e.getUTCMonth()]},B:function(e){return s[e.getUTCMonth()]},c:null,d:Oi,e:Oi,f:Vi,g:Ki,G:er,H:Hi,I:Li,j:zi,L:Fi,m:Ri,M:qi,p:function(e){return r[+(e.getUTCHours()>=12)]},q:function(e){return 1+~~(e.getUTCMonth()/3)},Q:ir,s:rr,S:ji,u:Gi,U:Bi,V:Wi,w:Zi,W:Ji,x:null,X:null,y:Xi,Y:Qi,Z:tr,"%":nr},x={a:function(e,t,n){var i=p.exec(t.slice(n));return i?(e.w=g.get(i[0].toLowerCase()),n+i[0].length):-1},A:function(e,t,n){var i=u.exec(t.slice(n));return i?(e.w=d.get(i[0].toLowerCase()),n+i[0].length):-1},b:function(e,t,n){var i=m.exec(t.slice(n));return i?(e.m=v.get(i[0].toLowerCase()),n+i[0].length):-1},B:function(e,t,n){var i=f.exec(t.slice(n));return i?(e.m=_.get(i[0].toLowerCase()),n+i[0].length):-1},c:function(e,n,i){return C(e,t,n,i)},d:ai,e:ai,f:di,g:ni,G:ti,H:li,I:li,j:si,L:ui,m:oi,M:hi,p:function(e,t,n){var i=h.exec(t.slice(n));return i?(e.p=c.get(i[0].toLowerCase()),n+i[0].length):-1},q:ri,Q:gi,s:fi,S:ci,u:Xn,U:Kn,V:Qn,w:Jn,W:ei,x:function(e,t,i){return C(e,n,t,i)},X:function(e,t,n){return C(e,i,t,n)},y:ni,Y:ti,Z:ii,"%":pi};function $(e,t){return function(n){var i,r,o,a=[],s=-1,l=0,h=e.length;for(n instanceof Date||(n=new Date(+n));++s<h;)37===e.charCodeAt(s)&&(a.push(e.slice(l,s)),null!=(r=Rn[i=e.charAt(++s)])?i=e.charAt(++s):r="e"===i?" ":"0",(o=t[i])&&(i=o(n,r)),a.push(i),l=s+1);return a.push(e.slice(l,s)),a.join("")}}function w(e,t){return function(n){var i,r,o=zn(1900,void 0,1);if(C(o,e,n+="",0)!=n.length)return null;if("Q"in o)return new Date(o.Q);if("s"in o)return new Date(1e3*o.s+("L"in o?o.L:0));if(t&&!("Z"in o)&&(o.Z=0),"p"in o&&(o.H=o.H%12+12*o.p),void 0===o.m&&(o.m="q"in o?o.q:0),"V"in o){if(o.V<1||o.V>53)return null;"w"in o||(o.w=1),"Z"in o?(r=(i=Ln(zn(o.y,0,1))).getUTCDay(),i=r>4||0===r?kn.ceil(i):kn(i),i=pn.offset(i,7*(o.V-1)),o.y=i.getUTCFullYear(),o.m=i.getUTCMonth(),o.d=i.getUTCDate()+(o.w+6)%7):(r=(i=Hn(zn(o.y,0,1))).getDay(),i=r>4||0===r?mn.ceil(i):mn(i),i=dn.offset(i,7*(o.V-1)),o.y=i.getFullYear(),o.m=i.getMonth(),o.d=i.getDate()+(o.w+6)%7)}else("W"in o||"U"in o)&&("w"in o||(o.w="u"in o?o.u%7:"W"in o?1:0),r="Z"in o?Ln(zn(o.y,0,1)).getUTCDay():Hn(zn(o.y,0,1)).getDay(),o.m=0,o.d="W"in o?(o.w+6)%7+7*o.W-(r+5)%7:o.w+7*o.U-(r+6)%7);return"Z"in o?(o.H+=o.Z/100|0,o.M+=o.Z%100,Ln(o)):Hn(o)}}function C(e,t,n,i){for(var r,o,a=0,s=t.length,l=n.length;a<s;){if(i>=l)return-1;if(37===(r=t.charCodeAt(a++))){if(r=t.charAt(a++),!(o=x[r in Rn?t.charAt(a++):r])||(i=o(e,n,i))<0)return-1}else if(r!=n.charCodeAt(i++))return-1}return i}return y.x=$(n,y),y.X=$(i,y),y.c=$(t,y),b.x=$(n,b),b.X=$(i,b),b.c=$(t,b),{format:function(e){var t=$(e+="",y);return t.toString=function(){return e},t},parse:function(e){var t=w(e+="",!1);return t.toString=function(){return e},t},utcFormat:function(e){var t=$(e+="",b);return t.toString=function(){return e},t},utcParse:function(e){var t=w(e+="",!0);return t.toString=function(){return e},t}}}(e),Vn=Fn.format,Fn.parse,Fn.utcFormat,Fn.utcParse}({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});var hr="http://www.w3.org/1999/xhtml",cr={svg:"http://www.w3.org/2000/svg",xhtml:hr,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function ur(e){var t=e+="",n=t.indexOf(":");return n>=0&&"xmlns"!==(t=e.slice(0,n))&&(e=e.slice(n+1)),cr.hasOwnProperty(t)?{space:cr[t],local:e}:e}function dr(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===hr&&t.documentElement.namespaceURI===hr?t.createElement(e):t.createElementNS(n,e)}}function pr(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function gr(e){var t=ur(e);return(t.local?pr:dr)(t)}function fr(){}function _r(e){return null==e?fr:function(){return this.querySelector(e)}}function mr(){return[]}function vr(e){return function(){return function(e){return null==e?[]:Array.isArray(e)?e:Array.from(e)}(e.apply(this,arguments))}}function yr(e){return function(t){return t.matches(e)}}var br=Array.prototype.find;function xr(){return this.firstElementChild}var $r=Array.prototype.filter;function wr(){return Array.from(this.children)}function Cr(e){return new Array(e.length)}function kr(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}function Ar(e,t,n,i,r,o){for(var a,s=0,l=t.length,h=o.length;s<h;++s)(a=t[s])?(a.__data__=o[s],i[s]=a):n[s]=new kr(e,o[s]);for(;s<l;++s)(a=t[s])&&(r[s]=a)}function Mr(e,t,n,i,r,o,a){var s,l,h,c=new Map,u=t.length,d=o.length,p=new Array(u);for(s=0;s<u;++s)(l=t[s])&&(p[s]=h=a.call(l,l.__data__,s,t)+"",c.has(h)?r[s]=l:c.set(h,l));for(s=0;s<d;++s)h=a.call(e,o[s],s,o)+"",(l=c.get(h))?(i[s]=l,l.__data__=o[s],c.delete(h)):n[s]=new kr(e,o[s]);for(s=0;s<u;++s)(l=t[s])&&c.get(p[s])===l&&(r[s]=l)}function Er(e){return e.__data__}function Sr(e){return"object"==typeof e&&"length"in e?e:Array.from(e)}function Tr(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function Nr(e){return function(){this.removeAttribute(e)}}function Dr(e){return function(){this.removeAttributeNS(e.space,e.local)}}function Ur(e,t){return function(){this.setAttribute(e,t)}}function Ir(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function Pr(e,t){return function(){var n=t.apply(this,arguments);null==n?this.removeAttribute(e):this.setAttribute(e,n)}}function Or(e,t){return function(){var n=t.apply(this,arguments);null==n?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function Hr(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function Lr(e){return function(){this.style.removeProperty(e)}}function zr(e,t,n){return function(){this.style.setProperty(e,t,n)}}function Fr(e,t,n){return function(){var i=t.apply(this,arguments);null==i?this.style.removeProperty(e):this.style.setProperty(e,i,n)}}function Vr(e){return function(){delete this[e]}}function Rr(e,t){return function(){this[e]=t}}function qr(e,t){return function(){var n=t.apply(this,arguments);null==n?delete this[e]:this[e]=n}}function jr(e){return e.trim().split(/^|\s+/)}function Gr(e){return e.classList||new Br(e)}function Br(e){this._node=e,this._names=jr(e.getAttribute("class")||"")}function Yr(e,t){for(var n=Gr(e),i=-1,r=t.length;++i<r;)n.add(t[i])}function Wr(e,t){for(var n=Gr(e),i=-1,r=t.length;++i<r;)n.remove(t[i])}function Zr(e){return function(){Yr(this,e)}}function Jr(e){return function(){Wr(this,e)}}function Xr(e,t){return function(){(t.apply(this,arguments)?Yr:Wr)(this,e)}}function Kr(){this.textContent=""}function Qr(e){return function(){this.textContent=e}}function eo(e){return function(){var t=e.apply(this,arguments);this.textContent=null==t?"":t}}function to(){this.innerHTML=""}function no(e){return function(){this.innerHTML=e}}function io(e){return function(){var t=e.apply(this,arguments);this.innerHTML=null==t?"":t}}function ro(){this.nextSibling&&this.parentNode.appendChild(this)}function oo(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function ao(){return null}function so(){var e=this.parentNode;e&&e.removeChild(this)}function lo(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function ho(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function co(e){return function(){var t=this.__on;if(t){for(var n,i=0,r=-1,o=t.length;i<o;++i)n=t[i],e.type&&n.type!==e.type||n.name!==e.name?t[++r]=n:this.removeEventListener(n.type,n.listener,n.options);++r?t.length=r:delete this.__on}}}function uo(e,t,n){return function(){var i,r=this.__on,o=function(e){return function(t){e.call(this,t,this.__data__)}}(t);if(r)for(var a=0,s=r.length;a<s;++a)if((i=r[a]).type===e.type&&i.name===e.name)return this.removeEventListener(i.type,i.listener,i.options),this.addEventListener(i.type,i.listener=o,i.options=n),void(i.value=t);this.addEventListener(e.type,o,n),i={type:e.type,name:e.name,value:t,listener:o,options:n},r?r.push(i):this.__on=[i]}}function po(e,t,n){var i=Hr(e),r=i.CustomEvent;"function"==typeof r?r=new r(t,n):(r=i.document.createEvent("Event"),n?(r.initEvent(t,n.bubbles,n.cancelable),r.detail=n.detail):r.initEvent(t,!1,!1)),e.dispatchEvent(r)}function go(e,t){return function(){return po(this,e,t)}}function fo(e,t){return function(){return po(this,e,t.apply(this,arguments))}}kr.prototype={constructor:kr,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}},Br.prototype={add:function(e){this._names.indexOf(e)<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};var _o=[null];function mo(e,t){this._groups=e,this._parents=t}function vo(e){return"string"==typeof e?new mo([[document.querySelector(e)]],[document.documentElement]):new mo([[e]],_o)}function yo(e){return function(){return e}}mo.prototype={constructor:mo,select:function(e){"function"!=typeof e&&(e=_r(e));for(var t=this._groups,n=t.length,i=new Array(n),r=0;r<n;++r)for(var o,a,s=t[r],l=s.length,h=i[r]=new Array(l),c=0;c<l;++c)(o=s[c])&&(a=e.call(o,o.__data__,c,s))&&("__data__"in o&&(a.__data__=o.__data__),h[c]=a);return new mo(i,this._parents)},selectAll:function(e){e="function"==typeof e?vr(e):function(e){return null==e?mr:function(){return this.querySelectorAll(e)}}(e);for(var t=this._groups,n=t.length,i=[],r=[],o=0;o<n;++o)for(var a,s=t[o],l=s.length,h=0;h<l;++h)(a=s[h])&&(i.push(e.call(a,a.__data__,h,s)),r.push(a));return new mo(i,r)},selectChild:function(e){return this.select(null==e?xr:function(e){return function(){return br.call(this.children,e)}}("function"==typeof e?e:yr(e)))},selectChildren:function(e){return this.selectAll(null==e?wr:function(e){return function(){return $r.call(this.children,e)}}("function"==typeof e?e:yr(e)))},filter:function(e){"function"!=typeof e&&(e=function(e){return function(){return this.matches(e)}}(e));for(var t=this._groups,n=t.length,i=new Array(n),r=0;r<n;++r)for(var o,a=t[r],s=a.length,l=i[r]=[],h=0;h<s;++h)(o=a[h])&&e.call(o,o.__data__,h,a)&&l.push(o);return new mo(i,this._parents)},data:function(e,t){if(!arguments.length)return Array.from(this,Er);var n=t?Mr:Ar,i=this._parents,r=this._groups;"function"!=typeof e&&(e=function(e){return function(){return e}}(e));for(var o=r.length,a=new Array(o),s=new Array(o),l=new Array(o),h=0;h<o;++h){var c=i[h],u=r[h],d=u.length,p=Sr(e.call(c,c&&c.__data__,h,i)),g=p.length,f=s[h]=new Array(g),_=a[h]=new Array(g);n(c,u,f,_,l[h]=new Array(d),p,t);for(var m,v,y=0,b=0;y<g;++y)if(m=f[y]){for(y>=b&&(b=y+1);!(v=_[b])&&++b<g;);m._next=v||null}}return(a=new mo(a,i))._enter=s,a._exit=l,a},enter:function(){return new mo(this._enter||this._groups.map(Cr),this._parents)},exit:function(){return new mo(this._exit||this._groups.map(Cr),this._parents)},join:function(e,t,n){var i=this.enter(),r=this,o=this.exit();return"function"==typeof e?(i=e(i))&&(i=i.selection()):i=i.append(e+""),null!=t&&(r=t(r))&&(r=r.selection()),null==n?o.remove():n(o),i&&r?i.merge(r).order():r},merge:function(e){for(var t=e.selection?e.selection():e,n=this._groups,i=t._groups,r=n.length,o=i.length,a=Math.min(r,o),s=new Array(r),l=0;l<a;++l)for(var h,c=n[l],u=i[l],d=c.length,p=s[l]=new Array(d),g=0;g<d;++g)(h=c[g]||u[g])&&(p[g]=h);for(;l<r;++l)s[l]=n[l];return new mo(s,this._parents)},selection:function(){return this},order:function(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var i,r=e[t],o=r.length-1,a=r[o];--o>=0;)(i=r[o])&&(a&&4^i.compareDocumentPosition(a)&&a.parentNode.insertBefore(i,a),a=i);return this},sort:function(e){function t(t,n){return t&&n?e(t.__data__,n.__data__):!t-!n}e||(e=Tr);for(var n=this._groups,i=n.length,r=new Array(i),o=0;o<i;++o){for(var a,s=n[o],l=s.length,h=r[o]=new Array(l),c=0;c<l;++c)(a=s[c])&&(h[c]=a);h.sort(t)}return new mo(r,this._parents).order()},call:function(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this},nodes:function(){return Array.from(this)},node:function(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var i=e[t],r=0,o=i.length;r<o;++r){var a=i[r];if(a)return a}return null},size:function(){let e=0;for(const t of this)++e;return e},empty:function(){return!this.node()},each:function(e){for(var t=this._groups,n=0,i=t.length;n<i;++n)for(var r,o=t[n],a=0,s=o.length;a<s;++a)(r=o[a])&&e.call(r,r.__data__,a,o);return this},attr:function(e,t){var n=ur(e);if(arguments.length<2){var i=this.node();return n.local?i.getAttributeNS(n.space,n.local):i.getAttribute(n)}return this.each((null==t?n.local?Dr:Nr:"function"==typeof t?n.local?Or:Pr:n.local?Ir:Ur)(n,t))},style:function(e,t,n){return arguments.length>1?this.each((null==t?Lr:"function"==typeof t?Fr:zr)(e,t,null==n?"":n)):function(e,t){return e.style.getPropertyValue(t)||Hr(e).getComputedStyle(e,null).getPropertyValue(t)}(this.node(),e)},property:function(e,t){return arguments.length>1?this.each((null==t?Vr:"function"==typeof t?qr:Rr)(e,t)):this.node()[e]},classed:function(e,t){var n=jr(e+"");if(arguments.length<2){for(var i=Gr(this.node()),r=-1,o=n.length;++r<o;)if(!i.contains(n[r]))return!1;return!0}return this.each(("function"==typeof t?Xr:t?Zr:Jr)(n,t))},text:function(e){return arguments.length?this.each(null==e?Kr:("function"==typeof e?eo:Qr)(e)):this.node().textContent},html:function(e){return arguments.length?this.each(null==e?to:("function"==typeof e?io:no)(e)):this.node().innerHTML},raise:function(){return this.each(ro)},lower:function(){return this.each(oo)},append:function(e){var t="function"==typeof e?e:gr(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})},insert:function(e,t){var n="function"==typeof e?e:gr(e),i=null==t?ao:"function"==typeof t?t:_r(t);return this.select(function(){return this.insertBefore(n.apply(this,arguments),i.apply(this,arguments)||null)})},remove:function(){return this.each(so)},clone:function(e){return this.select(e?ho:lo)},datum:function(e){return arguments.length?this.property("__data__",e):this.node().__data__},on:function(e,t,n){var i,r,o=function(e){return e.trim().split(/^|\s+/).map(function(e){var t="",n=e.indexOf(".");return n>=0&&(t=e.slice(n+1),e=e.slice(0,n)),{type:e,name:t}})}(e+""),a=o.length;if(!(arguments.length<2)){for(s=t?uo:co,i=0;i<a;++i)this.each(s(o[i],t,n));return this}var s=this.node().__on;if(s)for(var l,h=0,c=s.length;h<c;++h)for(i=0,l=s[h];i<a;++i)if((r=o[i]).type===l.type&&r.name===l.name)return l.value},dispatch:function(e,t){return this.each(("function"==typeof t?fo:go)(e,t))},[Symbol.iterator]:function*(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var i,r=e[t],o=0,a=r.length;o<a;++o)(i=r[o])&&(yield i)}};const bo=Math.PI,xo=2*bo,$o=1e-6,wo=xo-$o;function Co(e){this._+=e[0];for(let t=1,n=e.length;t<n;++t)this._+=arguments[t]+e[t]}class ko{constructor(e){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=null==e?Co:function(e){let t=Math.floor(e);if(!(t>=0))throw new Error(`invalid digits: ${e}`);if(t>15)return Co;const n=10**t;return function(e){this._+=e[0];for(let t=1,i=e.length;t<i;++t)this._+=Math.round(arguments[t]*n)/n+e[t]}}(e)}moveTo(e,t){this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+t}`}closePath(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(e,t){this._append`L${this._x1=+e},${this._y1=+t}`}quadraticCurveTo(e,t,n,i){this._append`Q${+e},${+t},${this._x1=+n},${this._y1=+i}`}bezierCurveTo(e,t,n,i,r,o){this._append`C${+e},${+t},${+n},${+i},${this._x1=+r},${this._y1=+o}`}arcTo(e,t,n,i,r){if(e=+e,t=+t,n=+n,i=+i,(r=+r)<0)throw new Error(`negative radius: ${r}`);let o=this._x1,a=this._y1,s=n-e,l=i-t,h=o-e,c=a-t,u=h*h+c*c;if(null===this._x1)this._append`M${this._x1=e},${this._y1=t}`;else if(u>$o)if(Math.abs(c*s-l*h)>$o&&r){let d=n-o,p=i-a,g=s*s+l*l,f=d*d+p*p,_=Math.sqrt(g),m=Math.sqrt(u),v=r*Math.tan((bo-Math.acos((g+u-f)/(2*_*m)))/2),y=v/m,b=v/_;Math.abs(y-1)>$o&&this._append`L${e+y*h},${t+y*c}`,this._append`A${r},${r},0,0,${+(c*d>h*p)},${this._x1=e+b*s},${this._y1=t+b*l}`}else this._append`L${this._x1=e},${this._y1=t}`;else;}arc(e,t,n,i,r,o){if(e=+e,t=+t,o=!!o,(n=+n)<0)throw new Error(`negative radius: ${n}`);let a=n*Math.cos(i),s=n*Math.sin(i),l=e+a,h=t+s,c=1^o,u=o?i-r:r-i;null===this._x1?this._append`M${l},${h}`:(Math.abs(this._x1-l)>$o||Math.abs(this._y1-h)>$o)&&this._append`L${l},${h}`,n&&(u<0&&(u=u%xo+xo),u>wo?this._append`A${n},${n},0,1,${c},${e-a},${t-s}A${n},${n},0,1,${c},${this._x1=l},${this._y1=h}`:u>$o&&this._append`A${n},${n},0,${+(u>=bo)},${c},${this._x1=e+n*Math.cos(r)},${this._y1=t+n*Math.sin(r)}`)}rect(e,t,n,i){this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+t}h${n=+n}v${+i}h${-n}Z`}toString(){return this._}}function Ao(e){this._context=e}function Mo(e){return new Ao(e)}function Eo(e){return e[0]}function So(e){return e[1]}function To(e,t){var n=yo(!0),i=null,r=Mo,o=null,a=function(e){let t=3;return e.digits=function(n){if(!arguments.length)return t;if(null==n)t=null;else{const e=Math.floor(n);if(!(e>=0))throw new RangeError(`invalid digits: ${n}`);t=e}return e},()=>new ko(t)}(s);function s(s){var l,h,c,u=(s=function(e){return"object"==typeof e&&"length"in e?e:Array.from(e)}(s)).length,d=!1;for(null==i&&(o=r(c=a())),l=0;l<=u;++l)!(l<u&&n(h=s[l],l,s))===d&&((d=!d)?o.lineStart():o.lineEnd()),d&&o.point(+e(h,l,s),+t(h,l,s));if(c)return o=null,c+""||null}return e="function"==typeof e?e:void 0===e?Eo:yo(e),t="function"==typeof t?t:void 0===t?So:yo(t),s.x=function(t){return arguments.length?(e="function"==typeof t?t:yo(+t),s):e},s.y=function(e){return arguments.length?(t="function"==typeof e?e:yo(+e),s):t},s.defined=function(e){return arguments.length?(n="function"==typeof e?e:yo(!!e),s):n},s.curve=function(e){return arguments.length?(r=e,null!=i&&(o=r(i)),s):r},s.context=function(e){return arguments.length?(null==e?i=o=null:o=r(i=e),s):i},s}function No(e,t,n){e._context.bezierCurveTo((2*e._x0+e._x1)/3,(2*e._y0+e._y1)/3,(e._x0+2*e._x1)/3,(e._y0+2*e._y1)/3,(e._x0+4*e._x1+t)/6,(e._y0+4*e._y1+n)/6)}function Do(e){this._context=e}function Uo(e){this._context=e}function Io(e){var t,n,i=e.length-1,r=new Array(i),o=new Array(i),a=new Array(i);for(r[0]=0,o[0]=2,a[0]=e[0]+2*e[1],t=1;t<i-1;++t)r[t]=1,o[t]=4,a[t]=4*e[t]+2*e[t+1];for(r[i-1]=2,o[i-1]=7,a[i-1]=8*e[i-1]+e[i],t=1;t<i;++t)n=r[t]/o[t-1],o[t]-=n,a[t]-=n*a[t-1];for(r[i-1]=a[i-1]/o[i-1],t=i-2;t>=0;--t)r[t]=(a[t]-r[t+1])/o[t];for(o[i-1]=(e[i]+r[i-1])/2,t=0;t<i-1;++t)o[t]=2*e[t+1]-r[t+1];return[r,o]}function Po(e,t){this._context=e,this._t=t}Ao.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(e,t){switch(e=+e,t=+t,this._point){case 0:this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break;case 1:this._point=2;default:this._context.lineTo(e,t)}}},Do.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){switch(this._point){case 3:No(this,this._x1,this._y1);case 2:this._context.lineTo(this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(e,t){switch(e=+e,t=+t,this._point){case 0:this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break;case 1:this._point=2;break;case 2:this._point=3,this._context.lineTo((5*this._x0+this._x1)/6,(5*this._y0+this._y1)/6);default:No(this,e,t)}this._x0=this._x1,this._x1=e,this._y0=this._y1,this._y1=t}},Uo.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=[],this._y=[]},lineEnd:function(){var e=this._x,t=this._y,n=e.length;if(n)if(this._line?this._context.lineTo(e[0],t[0]):this._context.moveTo(e[0],t[0]),2===n)this._context.lineTo(e[1],t[1]);else for(var i=Io(e),r=Io(t),o=0,a=1;a<n;++o,++a)this._context.bezierCurveTo(i[0][o],r[0][o],i[1][o],r[1][o],e[a],t[a]);(this._line||0!==this._line&&1===n)&&this._context.closePath(),this._line=1-this._line,this._x=this._y=null},point:function(e,t){this._x.push(+e),this._y.push(+t)}},Po.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=this._y=NaN,this._point=0},lineEnd:function(){0<this._t&&this._t<1&&2===this._point&&this._context.lineTo(this._x,this._y),(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line>=0&&(this._t=1-this._t,this._line=1-this._line)},point:function(e,t){switch(e=+e,t=+t,this._point){case 0:this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break;case 1:this._point=2;default:if(this._t<=0)this._context.lineTo(this._x,t),this._context.lineTo(e,t);else{var n=this._x*(1-this._t)+e*this._t;this._context.lineTo(n,this._y),this._context.lineTo(n,t)}}this._x=e,this._y=t}};const Oo=s`.card-content{padding:16px}.card-content.tile{padding:10px}.card-content.short .graph-container{right:70px}.entity-row{align-items:center;cursor:pointer;display:flex;height:40px;margin-bottom:8px;position:relative}.entity-row:last-of-type{margin-bottom:0}.tile .entity-row{height:34px}.tile .entity-row .entity-info{align-items:flex-start;display:flex;flex-direction:column;justify-content:center}.tile .entity-row .entity-value{align-items:center;display:flex;flex-direction:row;font-size:var(--ha-font-size-s);font-weight:var(--ha-font-weight-normal);gap:4px;line-height:var(--ha-line-height-condensed);margin-left:initial}.tile .entity-row .icon-container{height:36px;width:36px}.entity-icon{color:var(--primary-text-color);fill:currentColor;margin-right:8px;text-align:center;width:40px}.tile .entity-icon{cursor:pointer}.icon-container{align-items:center;border-radius:50%;display:flex;height:40px;justify-content:center;margin-right:8px;transition:background-color .2s ease-in-out;width:40px}.icon-container .entity-icon{color:var(--state-inactive-color);margin-right:0}.icon-container.active{background-color:color-mix(in srgb, var(--bge-icon-color, var(--state-active-color)) 20%, transparent)}.icon-container.active .entity-icon{color:var(--state-active-color)}.icon-container.inactive{background-color:color-mix(in srgb, var(--state-inactive-color) 20%, transparent)}.entity-name{align-items:flex-start;display:flex;flex-direction:column;z-index:1}.entity-value{align-items:flex-end;color:var(--primary-text-color);display:flex;flex-direction:column;justify-content:center;line-height:var(--ha-line-height-condensed);margin-left:auto;text-transform:none !important;z-index:1}.companion-line{display:flex;gap:4px}.companion-line>span{margin-left:0}.companion-line>span+span::before{content:"· "}.extra-value-inline,.extra-value,.value-label,.secondary-value-inline,.secondary-value{color:var(--secondary-text-color);font-size:var(--ha-font-size-s);font-weight:var(--ha-font-weight-normal)}.secondary-value{margin-left:2px}.value-label{margin-left:4px}.extra-value{margin-left:2px}.tile .entity-name{font-weight:bold}.graph-container{bottom:0;left:45px;pointer-events:none;position:absolute;right:0;top:0}.no-icon .graph-container{left:0}.graph-container svg{height:100%;width:100%}.graph-path,.graph-path-glow-outer,.graph-path-glow-inner{fill:none;stroke-linecap:round;stroke-linejoin:round}.graph-dot{opacity:0;transition:opacity .2s ease-in-out}.entity-row:hover .graph-dot{opacity:1}.entity-with-toggle{align-items:center;display:flex;flex-direction:row;margin-left:auto;z-index:1}.entity-with-toggle .entity-value{text-transform:initial}.card-header{align-items:center;color:var(--ha-card-header-color, var(--primary-text-color));display:flex;font-family:var(--ha-card-header-font-family, inherit);font-size:var(--ha-card-header-font-size, 24px);font-weight:normal;justify-content:space-between;letter-spacing:-0.012em;line-height:32px;padding:24px 16px 16px}.card-header .name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.card-header .value{color:var(--secondary-text-color);flex-shrink:0;font-weight:normal;margin-left:16px}`,Ho=1e3,Lo=36e5;const zo=(e,t,n)=>{const i=t??{language:"en"},r={};return void 0!==n&&(r.minimumFractionDigits=n,r.maximumFractionDigits=n),"none"===i.number_format&&(r.useGrouping=!1),new Intl.NumberFormat((e=>{switch(e.number_format){case"comma_decimal":return["en-US","en"];case"decimal_comma":return["de","es","it"];case"space_comma":return["fr","sv","cs"];case"system":return;default:return e.language}})(i),r).format(e)};const Fo="background-graph-entities",Vo=`${Fo}-editor`,Ro="Unavailable",qo={linear:Mo,step:function(e){return new Po(e,.5)},spline:function(e){return new Do(e)},natural:function(e){return new Uo(e)}};let jo=class extends le{constructor(){super(...arguments),this.editMode=!1,this._entities=[],this._history=new Map,this._historyFetched=!1,this._transformCache=new Map,this._renderRetryMap=new Map,this._lastSortedEntityIds=[]}setConfig(e){if(!e||!e.entities||!Array.isArray(e.entities)||0===e.entities.length)throw new Error("You need to define at least one entity");this._config=e,this._entities=e.entities.map(e=>"string"==typeof e?{entity:e}:e),this._historyFetched=!1,this._history=new Map,this._setupUpdateInterval()}connectedCallback(){super.connectedCallback(),this._setupUpdateInterval()}disconnectedCallback(){super.disconnectedCallback(),this._timerId&&(clearInterval(this._timerId),this._timerId=void 0),this._renderRetryMap.clear()}_setupUpdateInterval(){if(this._timerId&&clearInterval(this._timerId),!this._config)return;const e=this._config.update_interval;e&&(this._timerId=window.setInterval(()=>this._fetchAndStoreAllHistory(),e*Ho))}static async getConfigElement(){const e=window.loadCardHelpers;if(!e)throw new Error("This card requires Home Assistant 2023.4+ and `loadCardHelpers` is not available.");const t=await e(),n=await t.createCardElement({type:"entities",entities:[]});return await n.constructor.getConfigElement(),await Promise.resolve().then(function(){return Ca}),document.createElement(Vo)}static getStubConfig(){return{entities:[{entity:"sun.sun"}],hours_to_show:24}}updated(e){this._config&&this.hass&&!this._historyFetched&&(this._historyFetched=!0,this._fetchAndStoreAllHistory());const t=this._getSortedEntities().map(e=>e.entity),n=t.length!==this._lastSortedEntityIds.length||t.some((e,t)=>e!==this._lastSortedEntityIds[t]);n&&(this._lastSortedEntityIds=t),(e.has("_history")||e.has("editMode")||n)&&requestAnimationFrame(()=>this._renderAllGraphs())}_getCurveFactory(){const e=this._config?.curve||"spline";return qo[e]??qo.spline}_renderAllGraphs(){if(!this.isConnected)return;const e=this.renderRoot.querySelectorAll(".graph-container");this._config?.entities&&e.forEach(e=>{const t=e.dataset.entityId;if(t){const n=this._entities[Number(e.dataset.entityIndex)],i=n?.entity===t?n:this._entities.find(e=>e.entity===t),r=i.graph_entity||t,o=this._history.get(r),a=this._getTransform(i),s=a&&o?.downsampled?o.downsampled.map(e=>({timestamp:e.timestamp,value:a(e.value)})):o?.downsampled;this._renderD3Graph(e,s,i)}})}_createGradient(e,t,n,i){const r=be(i,e=>e.value),o=e.append("defs").append("linearGradient").attr("id",n).attr("gradientUnits","userSpaceOnUse").attr("x1",0).attr("y1",t(r[0])).attr("x2",0).attr("y2",t(r[1])),a=[...i].sort((e,t)=>e.value-t.value);return a.forEach(e=>{const t=r[1]-r[0],n=t>0?(e.value-r[0])/t:0;o.append("stop").attr("offset",100*Math.max(0,Math.min(1,n))+"%").attr("stop-color",e.color)}),`url(#${n})`}_setupGradient(e,t,n,i){const r=this.hass.themes?.darkMode??!1?"white":"black";if(i?.overwrite_graph_appearance){const o=i.color_thresholds;return o&&o.length>0?this._createGradient(e,t,n,o):i.line_color??this._config.line_color??r}const o=this._config.color_thresholds;return o&&o.length>0?this._createGradient(e,t,n,o):this._config.line_color??r}_getDotColor(e,t){const n=this.hass.themes?.darkMode??!1?"white":"black";let i,r;if(t?.overwrite_graph_appearance&&(i=t.color_thresholds,r=t.line_color),void 0===i&&(i=this._config.color_thresholds),void 0===r&&(r=this._config.line_color),i&&i.length>0){const t=[...i].sort((e,t)=>e.value-t.value),n=Wt().domain(t.map(e=>e.value)).range(t.map(e=>e.color)).clamp(!0);return n(e)}return r??n}_pickHistoryValue(e,t,n){if(!e)return;const i="max"===t||"min"===t?e.raw:e.downsampled;if(!i||0===i.length)return;const r=i.map(e=>n?n(e.value):e.value).filter(e=>Number.isFinite(e));if(0!==r.length){if("max"===t)return function(e){let t;for(const n of e)null!=n&&(t<n||void 0===t&&n>=n)&&(t=n);return t}(r);if("min"===t)return function(e){let t;for(const n of e)null!=n&&(t>n||void 0===t&&n>=n)&&(t=n);return t}(r);if("avg"===t)return r.reduce((e,t)=>e+t,0)/r.length;if("median"===t){const e=[...r].sort((e,t)=>e-t),t=Math.floor(e.length/2);return e.length%2==0?(e[t-1]+e[t])/2:e[t]}return r[r.length-1]}}_getCompiledTransform(e,t){if(!e)return;const n=`${t}\n${e}`;let i=this._transformCache.get(n);return void 0===i&&(i=function(e,t){let n=e.trim();const i=n[0];let r;n.length>=2&&("'"===i||'"'===i)&&n.endsWith(i)&&(n=n.slice(1,-1).trim());try{r=new Function("x",`"use strict"; return (\n${n}\n);`)}catch(n){return void console.warn(`background-graph-entities: invalid value_transform for ${t}: "${e}"`,n)}let o=!1;return e=>{if(!Number.isFinite(e))return e;try{const n=r(e);if("number"==typeof n&&Number.isFinite(n))return n;o||(o=!0,console.warn(`background-graph-entities: value_transform for ${t} returned a non-numeric result`))}catch(e){o||(o=!0,console.warn(`background-graph-entities: value_transform for ${t} threw`,e))}return NaN}}(e,t)??null,this._transformCache.set(n,i)),i??void 0}_getTransform(e){return this._getCompiledTransform(e.value_transform,e.entity)}_getEffectiveValue(e,t){const n=parseFloat(t.state),i=!("on"===t.state||"off"===t.state||e.graph_entity&&e.graph_entity!==e.entity),r=i?e.value_source??"latest":"latest";let o=this._getTransform(e);const a=o?o(n):n,s=!!e.value_transform&&(!o||Number.isFinite(n)&&!Number.isFinite(a));s&&(o=void 0);let l=s?n:a,h=o&&Number.isFinite(n)?String(l):t.state;if("latest"!==r){const t=this._pickHistoryValue(this._history.get(e.entity),r,o);void 0!==t&&(l=t,h=String(t))}return{num:l,str:h,broken:s,canUseValueSource:i}}_transformPrecisionFloor(e){const t=Math.abs(e);return!Number.isFinite(e)||0===t||t>=10?0:Math.min(Math.ceil(-Math.log10(t))+1,20)}_getAutoIconColor(e){if(!e.auto_icon_color)return;const t=e.graph_entity||e.entity,n=this._history.get(t),i=e.auto_icon_color_source??"latest",r=this._pickHistoryValue(n,i,this._getTransform(e));return void 0!==r?this._getDotColor(r,e):void 0}_getSortedEntities(){if(!this.hass||!this._config||!this._entities)return[];if(!this._config.sort||!this._config.sort.method||"none"===this._config.sort.method)return this._entities;const{method:e,reverse:t,numeric:n=!0}=this._config.sort,i=[...this._entities],r=new Map;return this._entities.forEach((e,t)=>r.set(e,t)),i.sort((i,o)=>{const a=this.hass.states[i.entity],s=this.hass.states[o.entity],l=!!a&&"unavailable"!==a.state&&"unknown"!==a.state,h=!!s&&"unavailable"!==s.state&&"unknown"!==s.state;if("name"!==e){if(l!==h)return l?-1:1;if(!l&&!h)return(r.get(i)??0)-(r.get(o)??0)}let c=0;if("name"===e){const e=i.name||a?.attributes.friendly_name||i.entity,t=o.name||s?.attributes.friendly_name||o.entity;c=e.localeCompare(t,this.hass.language||"en",{sensitivity:"base",numeric:n})}else if("state"===e||"value"===e){let t,r;if("state"===e)t=a.state,r=s.state;else{const e=this._getEffectiveValue(i,a).num;t=isNaN(e)?a.state:e;const n=this._getEffectiveValue(o,s).num;r=isNaN(n)?s.state:n}if(n){const e="number"==typeof t?t:parseFloat(t),n="number"==typeof r?r:parseFloat(r),i=!isNaN(e),o=!isNaN(n);c=i&&o?e-n:i!==o?i?-1:1:String(t).localeCompare(String(r),this.hass.language||"en",{sensitivity:"base",numeric:!0})}else c=String(t).localeCompare(String(r),this.hass.language||"en",{sensitivity:"base"})}return t&&(c=-c),0===c?(r.get(i)??0)-(r.get(o)??0):c}),i}getCardSize(){return this._config?.entities.length?this._config.entities.length+1:1}_openEntityPopup(e){const t=new CustomEvent("hass-more-info",{bubbles:!0,cancelable:!1,composed:!0,detail:{entityId:e}});this.dispatchEvent(t)}_toggleEntity(e){this.hass.callService("homeassistant","toggle",{entity_id:e})}_localizeSpecialState(e){return"unavailable"===e?this.hass.localize("state.default.unavailable")||Ro:"unknown"===e?this.hass.localize("state.default.unknown")||"Unknown":void 0}_formatCompanionValue(e,t,n,i){const r=this.hass.states[e],o=!0===t?r?.attributes.friendly_name??e:"string"==typeof t?t:void 0;let a;if(r){const t=this._localizeSpecialState(r.state);if(t)a=t;else{const t=parseFloat(r.state),o=this._getCompiledTransform(n,e),s=o?o(t):t,l=!!n&&(!o||Number.isFinite(t)&&!Number.isFinite(s)),h=l?t:s,c=(l?void 0:!1===i?"":i)??r.attributes.unit_of_measurement??"";let u=this.hass.entities[e]?.display_precision;if(!l&&o&&void 0===u&&!isNaN(t)){const e=r.state.includes(".")?r.state.length-r.state.indexOf(".")-1:0;u=Math.max(e,this._transformPrecisionFloor(h))}a=[isNaN(h)||"number"!=typeof u?r.state:zo(h,this.hass.locale,u),c].filter(Boolean).join(" ")}}else a=this.hass.localize("state.default.unavailable")||Ro;return o?`${o}: ${a}`:a}_renderEntityRow(e){const t=this.hass.states[e.entity];if(!t)return this._renderUnavailableEntityRow(e);const n=this.hass.entities[e.entity],i=this._entities.indexOf(e),r=parseFloat(t.state);let o;const a="on"===t.state||"off"===t.state,s=e.entity.split(".")[0],l=a&&!["binary_sensor","sensor","update"].includes(s),h=!0===this._config.tile_style,c=a&&"on"===t.state,u=this._getAutoIconColor(e),d=u??e.icon_color,p=e.show_graph_entity_state??!1,g=e.show_icon??this._config.show_icon??!0,f=e.graph_entity&&p?this._formatCompanionValue(e.graph_entity):void 0,_=e.extra_value_entity?this._formatCompanionValue(e.extra_value_entity,e.extra_value_name,e.extra_value_transform,e.extra_value_unit):void 0,m=d?`color: ${d}`:"",v=t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),t.stopPropagation(),this._toggleEntity(e.entity))},{num:y,str:b,broken:x,canUseValueSource:$}=this._getEffectiveValue(e,t),w=$?e.value_label:void 0,C=!1===e.value_unit?"":e.value_unit,k=(x?void 0:C)??t.attributes.unit_of_measurement??"",A=this._localizeSpecialState(b);if(A)o=A;else if("min"===k.toLowerCase())if(y>=60){const e=y%60;o=`${Math.floor(y/60)}h ${Math.floor(e)}min`}else o=`${Math.floor(y)} ${k}`;else{let i=!isNaN(r)&&t.state.includes(".")?t.state.length-t.state.indexOf(".")-1:isNaN(r)?void 0:0;!x&&e.value_transform&&void 0!==i&&(i=Math.max(i,this._transformPrecisionFloor(y)));const a=n?.display_precision??i;let s=b;isNaN(y)||"number"!=typeof a||(s=zo(y,this.hass.locale,a)),o=[s,k].filter(Boolean).join(" ")}return h?j`
        <div
          class="entity-row ${g?"":"no-icon"}"
          style=${d?`--bge-icon-color: ${d};${u?` --state-active-color: ${u};`:""}`:""}
          @click=${()=>this._openEntityPopup(e.entity)}
        >
          ${g?j`
                  <div
                    class="icon-container ${a?c?"active":"inactive":""}"
                    role=${l?"button":"img"}
                    aria-label=${l?`Toggle ${e.name||e.entity}`:""}
                    aria-pressed=${l?c:"false"}
                    tabindex=${l?"0":"-1"}
                    @click=${t=>{l&&(t.stopPropagation(),this._toggleEntity(e.entity))}}
                    @keydown=${l?v:null}
                  >
                    ${e.icon?j`<ha-icon class="entity-icon" .icon=${e.icon} style=${m}></ha-icon>`:j`<ha-state-icon
                            class="entity-icon"
                            .hass=${this.hass}
                            .stateObj=${t}
                            .stateColor=${h&&!u}
                            style=${m}
                          ></ha-state-icon>`}
                  </div>
                `:""}
          <div class="entity-info">
            <div class="entity-name">
              ${e.name||t.attributes.friendly_name||e.entity}
            </div>
            <div class="entity-value">
              <span class="primary-value">${o}</span>
              ${w?j`<span class="value-label">${w}</span>`:""}
              ${f?j`<span class="secondary-value">· ${f}</span>`:""}
              ${_?j`<span class="extra-value">· ${_}</span>`:""}
            </div>
          </div>
          <div class="graph-container" data-entity-id=${e.entity} data-entity-index=${i}></div>
        </div>
      `:j`
      <div class="entity-row ${g?"":"no-icon"}" @click=${()=>this._openEntityPopup(e.entity)}>
        ${g?e.icon?j`<ha-icon class="entity-icon" .icon=${e.icon} style=${m}></ha-icon>`:j`<ha-state-icon
                  class="entity-icon"
                  .hass=${this.hass}
                  .stateObj=${t}
                  .stateColor=${h&&!u}
                  style=${m}
                ></ha-state-icon>`:""}
        <div class="entity-name">
          ${e.name||t.attributes.friendly_name||e.entity}
          ${l&&!h&&f?j`<span class="secondary-value-inline">${f}</span>`:""}
          ${l&&!h&&_?j`<span class="extra-value-inline">${_}</span>`:""}
        </div>
        <div class="graph-container" data-entity-id=${e.entity} data-entity-index=${i}></div>
        ${l&&!h?j`
                <div class="entity-value entity-with-toggle">
                  <ha-switch
                    aria-label=${`Toggle ${e.name||e.entity}`}
                    .checked=${"on"===t.state}
                    @click=${t=>{t.stopPropagation(),this._toggleEntity(e.entity)}}
                  ></ha-switch>
                </div>
              `:j`<div class="entity-value">
                <span class="value-line">
                  <span class="primary-value">${o}</span>
                  ${w?j`<span class="value-label">${w}</span>`:""}
                </span>
                ${l||!f&&!_?"":j`<span class="companion-line">
                        ${f?j`<span class="secondary-value">${f}</span>`:""}
                        ${_?j`<span class="extra-value">${_}</span>`:""}
                      </span>`}
              </div>`}
      </div>
    `}_renderUnavailableEntityRow(e){const t=e.show_icon??this._config.show_icon??!0;return j`
      <div
        class="entity-row unavailable ${t?"":"no-icon"}"
        @click=${()=>this._openEntityPopup(e.entity)}
      >
        ${t?j`<ha-icon class="entity-icon" icon=${"mdi:alert-circle-outline"}></ha-icon>`:""}
        <div class="entity-name">${e.name||e.entity}</div>
        <div
          class="graph-container"
          data-entity-id=${e.entity}
          data-entity-index=${this._entities.indexOf(e)}
        ></div>
        <div class="entity-value">${this.hass.localize("state.default.unavailable")||Ro}</div>
      </div>
    `}_renderD3Graph(e,t,n){const i=this._renderRetryMap.get(e)||0;if(!e.isConnected||0===e.clientWidth||0===e.clientHeight)return void(i<10&&(this._renderRetryMap.set(e,i+1),requestAnimationFrame(()=>this._renderD3Graph(e,t,n))));if(this._renderRetryMap.delete(e),vo(e).html(""),!t||0===t.length)return;const r=e.clientWidth,o=e.clientHeight,a=this._config?.hours_to_show||24,s=new Date,l=new Date;l.setHours(s.getHours()-a);const h=[l,s],c=[...t],u=c[c.length-1];if(u&&c.push({timestamp:s,value:u.value}),c.filter(e=>Number.isFinite(e.value)).length<2)return;const d=be(c,e=>e.value),p=n?.overwrite_graph_appearance&&void 0!==n.graph_min?n.graph_min:this._config.graph_min,g=n?.overwrite_graph_appearance&&void 0!==n.graph_max?n.graph_max:this._config.graph_max;"number"==typeof p&&(d[0]=p),"number"==typeof g&&(d[1]=g),d[0]===d[1]&&(d[0]-=1,d[1]+=1);const f=.1*(d[1]-d[0]);"number"!=typeof p&&(d[0]-=f),"number"!=typeof g&&(d[1]+=f);const _=lr().domain(h).range([0,r]),m=Wt().domain(d).range([o,0]),v=vo(e).append("svg").attr("viewBox",`0 0 ${r} ${o}`).attr("preserveAspectRatio","none"),y=this._config?.line_width||3,b=n?.overwrite_graph_appearance&&void 0!==n.line_opacity?n.line_opacity:this._config?.line_opacity??.2,x=`bge-gradient-${e.dataset.entityId?.replace(".","_")}`,$=this._setupGradient(v,m,x,n),w=To().defined(e=>Number.isFinite(e.value)).x(e=>_(e.timestamp)).y(e=>m(e.value)).curve(this._getCurveFactory());this._config.line_glow&&(v.append("path").datum(c).attr("class","graph-path-glow-outer").attr("d",w).attr("stroke",$).attr("stroke-opacity",Number((.35*b).toFixed(3))).attr("stroke-width",y+1.5).style("filter","blur(3px)"),v.append("path").datum(c).attr("class","graph-path-glow-inner").attr("d",w).attr("stroke",$).attr("stroke-opacity",Number((.65*b).toFixed(3))).attr("stroke-width",y+.5).style("filter","blur(1px)")),v.append("path").datum(c).attr("class","graph-path").attr("d",w).attr("stroke",$).attr("stroke-opacity",b).attr("stroke-width",y);const C=t.slice(1).filter(e=>Number.isFinite(e.value));this.editMode&&v.selectAll(".graph-dot").data(C).enter().append("circle").attr("class","graph-dot").attr("cx",e=>_(e.timestamp)).attr("cy",e=>m(e.value)).attr("r",2).attr("fill",e=>this._getDotColor(e.value,n))}async _fetchAndStoreAllHistory(){if(0===this._entities.length)return void(this._history.size>0&&(this._history=new Map));const e=new Map,t=this._entities.map(async t=>{const n=t.graph_entity||t.entity,i=await this._fetchHistory(n,t.entity);e.set(n,i)});await Promise.all(t),this._history=new Map([...e.entries()].filter(([,e])=>null!==e))}async _fetchHistory(e,t){if(!this.hass?.callWS)return null;const n=this._config?.hours_to_show||24,i=this._config?.points_per_hour||1,r=new Date;r.setHours(r.getHours()-n);try{const t=(await this.hass.callWS({type:"history/history_during_period",start_time:r.toISOString(),end_time:(new Date).toISOString(),entity_ids:[e],minimal_response:!0,no_attributes:!0,include_start_time_state:!0}))[e];if(!t)return{raw:[],downsampled:[]};const o=!0===this._config?.show_gaps,a=t.map(e=>{let t;return t="on"===e.s?1:"off"===e.s?0:Number(e.s),{timestamp:new Date(e.lu*Ho),value:t}}),s=o?a:a.filter(e=>!isNaN(e.value)),l=function(e,t,n){if(n<=0||0===e.length)return e;const i=[...e,{timestamp:new Date,value:e[e.length-1]?.value??0}],r=new Date,o=new Date(r.getTime()-t*Lo),a=Lo/n,s=Math.ceil((r.getTime()-o.getTime())/a),l=[];let h=e.length>0?e[0].value:0;for(let t=0;t<s;t++){const n=new Date(o.getTime()+(t+1)*a);let r;const s=o.getTime()+t*a,c=s+a;let u=0,d=0,p=0;for(let e=0;e<i.length-1;e++){const t=i[e],n=i[e+1],r=Math.max(t.timestamp.getTime(),s),o=Math.min(n.timestamp.getTime(),c);if(r<o){const e=o-r;Number.isFinite(t.value)?(u+=t.value*e,d+=e):p+=e}}d+p>0?(r=p>d?NaN:u/d,h=e.filter(e=>e.timestamp.getTime()<=c).pop()?.value??h):r=h,l.push({timestamp:n,value:r})}return e.length>0&&l.unshift({timestamp:o,value:e[0].value}),l}(s,n,i);return{raw:s,downsampled:l}}catch(n){return console.error(`Error fetching history for ${t||e} (using ${e}):`,n),null}}_getAverageTitleSuffix(){if(!this._config?.average_in_title)return"";let e=0,t=0,n=null,i=!0,r=0;for(const o of this._entities){const a=this.hass.states[o.entity];if(!a)continue;const{num:s,broken:l}=this._getEffectiveValue(o,a);if(l||!Number.isFinite(s))continue;e+=s,t++;const h=(!1===o.value_unit?"":o.value_unit)??a.attributes.unit_of_measurement??"";null===n?n=h:n!==h&&(i=!1);const c=this.hass.entities[o.entity];let u=a.state.includes(".")?a.state.length-a.state.indexOf(".")-1:0;o.value_transform&&(u=Math.max(u,this._transformPrecisionFloor(s)));const d=c?.display_precision??u;void 0!==d&&d>r&&(r=d)}if(0===t)return"";return zo(e/t,this.hass.locale,r)+(i&&n?` ${n}`:"")}render(){if(!this._config||!this.hass)return j``;const e=this._getSortedEntities(),t=this._config.title,n=this._getAverageTitleSuffix();return j`
      <ha-card>
        ${t||n?j`
                <div class="card-header">
                  <div class="name">${t}</div>
                  <div class="value">${n}</div>
                </div>
              `:""}
        <div
          class="card-content ${this._config.tile_style?"tile":""} ${"short"===this._config.line_length?"short":""}"
        >
          ${e.map(e=>this._renderEntityRow(e))}
        </div>
      </ha-card>
    `}static{this.styles=s`
    ${a(Oo)}
  `}};e([pe({attribute:!1})],jo.prototype,"hass",void 0),e([pe({type:Boolean,reflect:!0})],jo.prototype,"editMode",void 0),e([ge()],jo.prototype,"_config",void 0),e([ge()],jo.prototype,"_entities",void 0),e([ge()],jo.prototype,"_history",void 0),jo=e([ce(Fo)],jo),"undefined"==typeof window||customElements.get("ha-switch")||customElements.define("ha-switch",class extends HTMLElement{}),"undefined"!=typeof window&&(window.customCards=window.customCards||[],window.customCards.push({type:Fo,name:"Background Graph Entities",description:"A card to display entities with a background graph.",documentationURL:"https://github.com/timmaurice/lovelace-background-graph-entities"}));const Go={de:{editor:{general:"Allgemein",title:"Titel (Optional)",average_in_title:"Durchschnitt im Titel anzeigen",average_in_title_helper:"Ist nur sinnvoll beim Vergleich von Daten desselben Typs (z. B. nur Temperaturen oder nur Luftfeuchtigkeiten). Der Durchschnitt verschiedener Messwerte ist nicht empfehlenswert.",layout:"Layout",tile_style:"Kompakterer Kachel-Stil",graph_appearance:"Graph-Darstellung",hours_to_show:"Stunden zum Anzeigen",line_width:"Linienbreite",line_length:"Linienlänge",line_lengths:{long:"Lang",short:"Kurz"},line_color:"Linienfarbe",line_opacity:"Linienopazität",line_glow:"Leuchteffekt",show_gaps:"Lücken bei Nichtverfügbarkeit",color_mode:"Farbmodus",color_modes:{single:"Einzelfarbe",threshold:"Schwellenwerte"},color_thresholds:"Farbschwellenwerte",add_threshold:"Schwellenwert hinzufügen",value:"Wert",color:"Farbe",data_settings:"Dateneinstellungen",points_per_hour:"Punkte pro Stunde",update_interval:"Aktualisierungsintervall (Sekunden)",entities:"Entitäten",entity:"Entität",add_entity:"Entität hinzufügen",optional_overrides:"Optionale Überschreibungen",entity_section_appearance:"Darstellung",entity_section_value:"Wert",entity_section_extra_value:"Zusätzlicher Wert",entity_section_graph:"Graph",name:"Name",icon:"Icon",icon_color:"Icon-Farbe",auto_icon_color:"Automatische Icon-Farbe",auto_icon_color_source:"Quelle für automatische Icon-Farbe",value_source:"Angezeigter Wert",value_sources:{latest:"Aktuell",max:"Maximum",min:"Minimum",avg:"Durchschnitt",median:"Median"},value_label:"Wert-Label",value_label_helper:"Suffix nach dem Wert, z. B. (Spitze)",value_transform:"Wert-Transformation",value_transform_helper:"JS-Ausdruck, der auf jeden Wert angewendet wird; x ist der Rohwert, z. B. x * 8",value_unit:"Einheit überschreiben",value_unit_hide:"Einheit ausblenden",value_unit_helper:"Ersetzt die Einheit in angezeigten Werten, z. B. kb/s",graph_entity:"Graph-Entität (Optional)",show_graph_entity_state:"Zustand der Graph-Entität anzeigen",graph_entity_helper:"Überschreibt die Entität, die für die Verlaufsdaten des Graphen verwendet wird.",extra_value_entity:"Zusätzliche Wert-Entität (Optional)",extra_value_entity_helper:"Zeigt den Zustand einer weiteren Entität neben dem Hauptwert. Ändert weder den Graphen noch das Klickziel.",extra_value_use_entity_name:"Entitätsnamen als Label verwenden",extra_value_name:"Label für zusätzlichen Wert",extra_value_name_helper:"Eigenes Label vor dem zusätzlichen Wert, z. B. Luftfeuchtigkeit.",extra_value_transform:"Zusatzwert-Transformation",extra_value_transform_helper:"JS-Ausdruck, der auf den Zusatzwert angewendet wird; x ist der Rohwert, z. B. x * 8",extra_value_unit:"Zusatzwert-Einheit überschreiben",extra_value_unit_hide:"Zusatzwert-Einheit ausblenden",extra_value_unit_helper:"Ersetzt die Einheit des Zusatzwerts, z. B. Mb/s",curve:"Kurventyp",curves:{spline:"Spline",linear:"Linear",step:"Stufe",natural:"Natürlich"},graph_min:"Untere Graph-Grenze",graph_max:"Obere Graph-Grenze",show_icon:"Icon anzeigen",sorting:"Sortierung",sort_method:"Sortiermethode",sort_methods:{none:"Keine (Originale Reihenfolge)",name:"Name",state:"Zustand",value:"Angezeigter Wert"},sort_reverse:"Reihenfolge umkehren",sort_numeric:"Numerische Sortierung"}},en:{editor:{general:"General",title:"Title (Optional)",average_in_title:"Show Average in Title",average_in_title_helper:"Only makes sense when comparing data of the same type (e.g., all temperatures or all humidities). Averaging different metrics is not recommended.",layout:"Layout",tile_style:"More Compact Tile Style",graph_appearance:"Graph Appearance",hours_to_show:"Hours To Show",line_width:"Line Width",line_length:"Line Length",line_lengths:{long:"Long",short:"Short"},line_color:"Line Color",line_opacity:"Line Opacity",line_glow:"Line Glow",show_gaps:"Show Gaps for Unavailable",color_mode:"Color Mode",color_modes:{single:"Single Color",threshold:"Thresholds"},color_thresholds:"Color Thresholds",add_threshold:"Add Threshold",value:"Value",color:"Color",data_settings:"Data Settings",points_per_hour:"Points per Hour",update_interval:"Update Interval (seconds)",entities:"Entities",entity:"Entity",add_entity:"Add Entity",optional_overrides:"Optional Overrides",entity_section_appearance:"Appearance",entity_section_value:"Value",entity_section_extra_value:"Extra Value",entity_section_graph:"Graph",name:"Name",icon:"Icon",icon_color:"Icon Color",auto_icon_color:"Auto Icon Color",auto_icon_color_source:"Auto Icon Color Source",value_source:"Displayed Value",value_sources:{latest:"Latest",max:"Max",min:"Min",avg:"Average",median:"Median"},value_label:"Value Label",value_label_helper:"Suffix shown after the value, e.g. (peak)",value_transform:"Value Transform",value_transform_helper:"JS expression applied to every value; x is the raw number, e.g. x * 8",value_unit:"Unit Override",value_unit_hide:"Hide Unit",value_unit_helper:"Replaces the entity's unit in displayed values, e.g. kb/s",graph_entity:"Graph Entity (Optional)",show_graph_entity_state:"Show Graph Entity State",graph_entity_helper:"Override the entity used for the graph's history data.",extra_value_entity:"Extra Value Entity (Optional)",extra_value_entity_helper:"Show another entity's state next to the main value. Does not change the graph or the click target.",extra_value_use_entity_name:"Use Entity Name As Label",extra_value_name:"Extra Value Label",extra_value_name_helper:"Custom label shown before the extra value, e.g. Humidity.",extra_value_transform:"Extra Value Transform",extra_value_transform_helper:"JS expression applied to the extra value; x is the raw number, e.g. x * 8",extra_value_unit:"Extra Value Unit Override",extra_value_unit_hide:"Hide Extra Value Unit",extra_value_unit_helper:"Replaces the extra value entity's unit, e.g. Mb/s",curve:"Curve Type",curves:{spline:"Spline",linear:"Linear",step:"Step",natural:"Natural"},graph_min:"Graph Lower Bound",graph_max:"Graph Upper Bound",show_icon:"Show Icon",sorting:"Sorting",sort_method:"Sort Method",sort_methods:{none:"None (Original Order)",name:"Name",state:"State",value:"Displayed Value"},sort_reverse:"Reverse Order",sort_numeric:"Numeric Sorting"}},fr:{editor:{general:"Général",title:"Titre (Optionnel)",average_in_title:"Afficher la moyenne dans le titre",average_in_title_helper:"N'a de sens que lors de la comparaison de données du même type (par exemple, uniquement des températures ou uniquement des humidités). La moyenne de différentes mesures n'est pas recommandée.",layout:"Mise en page",tile_style:"Style de tuile plus compact",graph_appearance:"Apparence du graphique",hours_to_show:"Heures à afficher",line_width:"Largeur de la ligne",line_length:"Longueur de la ligne",line_lengths:{long:"Longue",short:"Courte"},line_color:"Couleur de la ligne",line_opacity:"Opacité de la ligne",line_glow:"Effet de lueur",show_gaps:"Afficher les coupures si indisponible",color_mode:"Mode de couleur",color_modes:{single:"Couleur unique",threshold:"Seuils"},color_thresholds:"Seuils de couleur",add_threshold:"Ajouter un seuil",value:"Valeur",color:"Couleur",data_settings:"Paramètres des données",points_per_hour:"Points par heure",update_interval:"Intervalle de mise à jour (secondes)",entities:"Entités",entity:"Entité",add_entity:"Ajouter une entité",optional_overrides:"Remplacements optionnels",entity_section_appearance:"Apparence",entity_section_value:"Valeur",entity_section_extra_value:"Valeur supplémentaire",entity_section_graph:"Graphique",name:"Nom",icon:"Icône",icon_color:"Couleur de l'icône",auto_icon_color:"Couleur d'icône automatique",auto_icon_color_source:"Source de la couleur d'icône automatique",value_source:"Valeur affichée",value_sources:{latest:"Dernier",max:"Maximum",min:"Minimum",avg:"Moyenne",median:"Médiane"},value_label:"Étiquette de la valeur",value_label_helper:"Suffixe affiché après la valeur, ex. (pic)",value_transform:"Transformation de la valeur",value_transform_helper:"Expression JS appliquée à chaque valeur ; x est la valeur brute, ex. x * 8",value_unit:"Unité personnalisée",value_unit_hide:"Masquer l'unité",value_unit_helper:"Remplace l'unité dans les valeurs affichées, ex. kb/s",graph_entity:"Entité du graphique (Optionnel)",show_graph_entity_state:"Afficher l'état de l'entité du graphique",graph_entity_helper:"Remplace l'entité utilisée pour les données d'historique du graphique.",extra_value_entity:"Entité de valeur supplémentaire (Optionnel)",extra_value_entity_helper:"Affiche l'état d'une autre entité à côté de la valeur principale. Ne modifie ni le graphique ni la cible du clic.",extra_value_use_entity_name:"Utiliser le nom de l'entité comme étiquette",extra_value_name:"Étiquette de la valeur supplémentaire",extra_value_name_helper:"Étiquette personnalisée affichée avant la valeur supplémentaire, ex. Humidité.",extra_value_transform:"Transformation de la valeur supplémentaire",extra_value_transform_helper:"Expression JS appliquée à la valeur supplémentaire ; x est la valeur brute, ex. x * 8",extra_value_unit:"Unité de la valeur supplémentaire",extra_value_unit_hide:"Masquer l'unité de la valeur supplémentaire",extra_value_unit_helper:"Remplace l'unité de la valeur supplémentaire, ex. Mb/s",curve:"Type de courbe",curves:{spline:"Spline",linear:"Linéaire",step:"Marche",natural:"Naturelle"},graph_min:"Limite inférieure du graphique",graph_max:"Limite supérieure du graphique",show_icon:"Afficher l'icône",sorting:"Tri",sort_method:"Méthode de tri",sort_methods:{none:"Aucun (Ordre d'origine)",name:"Nom",state:"État",value:"Valeur affichée"},sort_reverse:"Inverser l'ordre",sort_numeric:"Tri numérique"}}};function Bo(e,t){let n=t.split(".").reduce((e,t)=>e&&"object"==typeof e?e[t]:void 0,Go[e]);return void 0===n&&"en"!==e&&(n=Bo("en",t)),"string"==typeof n?n:void 0}function Yo(e,t,n={}){const i=Bo(e.language||"en",t.replace("component.bge.",""));if("string"==typeof i){let e=i;for(const t in n)e=e.replace(`{${t}}`,String(n[t]));return e}return t}const Wo=s`.color-input-wrapper{position:relative;flex:1}.color-picker-popup{position:absolute;top:100%;left:0;z-index:10;padding:8px;background-color:var(--card-background-color, white);border:1px solid var(--divider-color);border-radius:var(--ha-card-border-radius, 4px);box-shadow:0px 5px 5px -3px rgba(0,0,0,.2),0px 8px 10px 1px rgba(0,0,0,.14),0px 3px 14px 2px rgba(0,0,0,.12)}.color-picker-popup rgb-string-color-picker{width:200px;height:200px}.color-preview{width:28px;height:28px;border-radius:4px;border:1px solid var(--divider-color);cursor:pointer;box-sizing:border-box}.card-config{--bge-editor-spacing: 8px;display:flex;flex-direction:column;gap:16px}.color-picker-popup{display:none}.side-by-side{display:flex;gap:16px}.side-by-side.margin-bottom{margin-bottom:16px}.side-by-side>*{flex:1}.dropdown-wrapper{margin-top:8px}.side-by-side>.dropdown-wrapper{margin-top:0}.entities-container{display:flex;flex-direction:column;gap:12px}.entity-container{align-items:center;border:1px solid var(--divider-color);border-radius:var(--ha-card-border-radius, 4px);display:flex;gap:var(--bge-editor-spacing);padding:var(--bge-editor-spacing);transition:border-color .2s ease-in-out,box-shadow .2s ease-in-out,background-color .2s ease-in-out}.entity-container.dragging{background:var(--secondary-background-color);opacity:.5}.entity-container.drag-over{border-color:var(--primary-color);border-style:dashed;box-shadow:0 0 5px var(--primary-color)}.drag-handle{color:var(--secondary-text-color);cursor:move}.entity-content{flex-grow:1}.entity-main{align-items:center;display:flex;gap:var(--bge-editor-spacing)}.entity-main ha-entity-picker{flex-grow:1}ha-slider{width:100%}ha-expansion-panel{--expansion-panel-content-padding: 0;margin-top:var(--bge-editor-spacing)}ha-expansion-panel[outlined][expanded]{--ha-card-background: var(--secondary-background-color)}.panel-content{display:flex;flex-direction:column;gap:16px;padding:var(--bge-editor-spacing)}.overrides{display:flex;flex-direction:column;gap:16px;padding:16px}pre{background:var(--secondary-background-color);border-radius:var(--ha-card-border-radius, 4px);font-size:12px;padding:var(--bge-editor-spacing);white-space:pre-wrap;word-break:break-all}.threshold-container{align-items:center;display:flex;gap:var(--bge-editor-spacing);min-width:0}.threshold-container .drag-handle{flex-shrink:0}.threshold-container .remove-icon{flex-shrink:0}.threshold-container .threshold-inputs{align-items:center;display:flex;flex-grow:1;gap:16px;min-width:0}.threshold-container .threshold-inputs>ha-input{flex:1 1 0;min-width:0}.add-threshold-button{margin-top:16px}h4{margin-bottom:8px;margin-top:0}.color-input-wrapper{align-items:center;display:flex;flex:1 1 0;gap:var(--bge-editor-spacing);min-width:0}.color-input-wrapper ha-input{flex:1 1 0;min-width:0}.color-preview{border:1px solid var(--divider-color);border-radius:4px;box-sizing:border-box;cursor:pointer;flex-shrink:0;height:28px;width:28px}.opacity-slider-container{display:flex;flex-direction:column;width:100%}.label-container{color:var(--secondary-text-color);display:flex;font-size:12px;justify-content:space-between;margin-left:3px}.header{align-items:center;display:flex;gap:var(--bge-editor-spacing);margin-bottom:16px}.header .title{font-size:1.2em;font-weight:500}ha-icon-button ha-icon{transform:translate(0px, -3px)}h3{margin-bottom:8px}.add-entity-button{width:fit-content}.dropdown-trigger{cursor:pointer;display:block;position:relative}.dropdown-textfield{pointer-events:none;width:100%}.formfield-with-help{align-items:center;display:flex;gap:8px}.formfield-with-help .tooltip-container{display:inline-flex;position:relative}.formfield-with-help .tooltip-container .help-icon{--mdc-icon-size: 18px;color:var(--secondary-text-color);cursor:help}.formfield-with-help .tooltip-container .tooltip-content{background-color:var(--card-background-color, var(--paper-card-background-color, var(--primary-background-color)));border:1px solid var(--divider-color);border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,.15);color:var(--primary-text-color);font-size:12px;font-weight:normal;line-height:1.4;opacity:0;padding:8px 12px;pointer-events:none;position:absolute;left:50%;top:calc(100% + 10px);transition:opacity .2s ease-in-out,transform .2s ease-in-out;transform:translateX(-50%) translateY(-4px);width:240px;z-index:100;white-space:normal}.formfield-with-help .tooltip-container .tooltip-content::after,.formfield-with-help .tooltip-container .tooltip-content::before{bottom:100%;left:50%;border:solid rgba(0,0,0,0);content:" ";height:0;width:0;position:absolute;pointer-events:none}.formfield-with-help .tooltip-container .tooltip-content::after{border-color:rgba(255,255,255,0);border-bottom-color:var(--card-background-color, var(--paper-card-background-color, var(--primary-background-color)));border-width:6px;margin-left:-6px}.formfield-with-help .tooltip-container .tooltip-content::before{border-color:rgba(255,255,255,0);border-bottom-color:var(--divider-color);border-width:7px;margin-left:-7px}.formfield-with-help .tooltip-container:hover .tooltip-content{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0)}`,Zo=(e,t=0,n=1)=>e>n?n:e<t?t:e,Jo=(e,t=0,n=Math.pow(10,t))=>Math.round(n*e)/n,Xo=e=>("#"===e[0]&&(e=e.substring(1)),e.length<6?{r:parseInt(e[0]+e[0],16),g:parseInt(e[1]+e[1],16),b:parseInt(e[2]+e[2],16),a:4===e.length?Jo(parseInt(e[3]+e[3],16)/255,2):1}:{r:parseInt(e.substring(0,2),16),g:parseInt(e.substring(2,4),16),b:parseInt(e.substring(4,6),16),a:8===e.length?Jo(parseInt(e.substring(6,8),16)/255,2):1}),Ko=e=>{const{h:t,s:n,l:i}=(({h:e,s:t,v:n,a:i})=>{const r=(200-t)*n/100;return{h:Jo(e),s:Jo(r>0&&r<200?t*n/100/(r<=100?r:200-r)*100:0),l:Jo(r/2),a:Jo(i,2)}})(e);return`hsl(${t}, ${n}%, ${i}%)`},Qo=({h:e,s:t,v:n,a:i})=>{e=e/360*6,t/=100,n/=100;const r=Math.floor(e),o=n*(1-t),a=n*(1-(e-r)*t),s=n*(1-(1-e+r)*t),l=r%6;return{r:Jo(255*[n,a,o,o,s,n][l]),g:Jo(255*[s,n,n,a,o,o][l]),b:Jo(255*[o,o,s,n,n,a][l]),a:Jo(i,2)}},ea=e=>{const t=e.toString(16);return t.length<2?"0"+t:t},ta=({r:e,g:t,b:n,a:i})=>{const r=i<1?ea(Jo(255*i)):"";return"#"+ea(e)+ea(t)+ea(n)+r},na=({r:e,g:t,b:n,a:i})=>{const r=Math.max(e,t,n),o=r-Math.min(e,t,n),a=o?r===e?(t-n)/o:r===t?2+(n-e)/o:4+(e-t)/o:0;return{h:Jo(60*(a<0?a+6:a)),s:Jo(r?o/r*100:0),v:Jo(r/255*100),a:i}},ia=(e,t)=>{if(e===t)return!0;for(const n in e)if(e[n]!==t[n])return!1;return!0},ra={},oa=e=>{let t=ra[e];return t||(t=document.createElement("template"),t.innerHTML=e,ra[e]=t),t},aa=(e,t,n)=>{e.dispatchEvent(new CustomEvent(t,{bubbles:!0,detail:n}))};let sa=!1;const la=e=>"touches"in e,ha=(e,t)=>{const n=la(t)?t.touches[0]:t,i=e.el.getBoundingClientRect();aa(e.el,"move",e.getMove({x:Zo((n.pageX-(i.left+window.pageXOffset))/i.width),y:Zo((n.pageY-(i.top+window.pageYOffset))/i.height)}))};class ca{constructor(e,t,n,i){const r=oa(`<div role="slider" tabindex="0" part="${t}" ${n}><div part="${t}-pointer"></div></div>`);e.appendChild(r.content.cloneNode(!0));const o=e.querySelector(`[part=${t}]`);o.addEventListener("mousedown",this),o.addEventListener("touchstart",this),o.addEventListener("keydown",this),this.el=o,this.xy=i,this.nodes=[o.firstChild,o]}set dragging(e){const t=e?document.addEventListener:document.removeEventListener;t(sa?"touchmove":"mousemove",this),t(sa?"touchend":"mouseup",this)}handleEvent(e){switch(e.type){case"mousedown":case"touchstart":if(e.preventDefault(),!(e=>!(sa&&!la(e)||(sa||(sa=la(e)),0)))(e)||!sa&&0!=e.button)return;this.el.focus(),ha(this,e),this.dragging=!0;break;case"mousemove":case"touchmove":e.preventDefault(),ha(this,e);break;case"mouseup":case"touchend":this.dragging=!1;break;case"keydown":((e,t)=>{const n=t.keyCode;n>40||e.xy&&n<37||n<33||(t.preventDefault(),aa(e.el,"move",e.getMove({x:39===n?.01:37===n?-.01:34===n?.05:33===n?-.05:35===n?1:36===n?-1:0,y:40===n?.01:38===n?-.01:0},!0)))})(this,e)}}style(e){e.forEach((e,t)=>{for(const n in e)this.nodes[t].style.setProperty(n,e[n])})}}class ua extends ca{constructor(e){super(e,"hue",'aria-label="Hue" aria-valuemin="0" aria-valuemax="360"',!1)}update({h:e}){this.h=e,this.style([{left:e/360*100+"%",color:Ko({h:e,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuenow",`${Jo(e)}`)}getMove(e,t){return{h:t?Zo(this.h+360*e.x,0,360):360*e.x}}}class da extends ca{constructor(e){super(e,"saturation",'aria-label="Color"',!0)}update(e){this.hsva=e,this.style([{top:100-e.v+"%",left:`${e.s}%`,color:Ko(e)},{"background-color":Ko({h:e.h,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuetext",`Saturation ${Jo(e.s)}%, Brightness ${Jo(e.v)}%`)}getMove(e,t){return{s:t?Zo(this.hsva.s+100*e.x,0,100):100*e.x,v:t?Zo(this.hsva.v-100*e.y,0,100):Math.round(100-100*e.y)}}}const pa=Symbol("same"),ga=Symbol("color"),fa=Symbol("hsva"),_a=Symbol("update"),ma=Symbol("parts"),va=Symbol("css"),ya=Symbol("sliders");class ba extends HTMLElement{static get observedAttributes(){return["color"]}get[va](){return[':host{display:flex;flex-direction:column;position:relative;width:200px;height:200px;user-select:none;-webkit-user-select:none;cursor:default}:host([hidden]){display:none!important}[role=slider]{position:relative;touch-action:none;user-select:none;-webkit-user-select:none;outline:0}[role=slider]:last-child{border-radius:0 0 8px 8px}[part$=pointer]{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;display:flex;place-content:center center;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}[part$=pointer]::after{content:"";width:100%;height:100%;border-radius:inherit;background-color:currentColor}[role=slider]:focus [part$=pointer]{transform:translate(-50%,-50%) scale(1.1)}',"[part=hue]{flex:0 0 24px;background:linear-gradient(to right,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%)}[part=hue-pointer]{top:50%;z-index:2}","[part=saturation]{flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,rgba(255,255,255,0));box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part=saturation-pointer]{z-index:3}"]}get[ya](){return[da,ua]}get color(){return this[ga]}set color(e){if(!this[pa](e)){const t=this.colorModel.toHsva(e);this[_a](t),this[ga]=e}}constructor(){super();const e=oa(`<style>${this[va].join("")}</style>`),t=this.attachShadow({mode:"open"});t.appendChild(e.content.cloneNode(!0)),t.addEventListener("move",this),this[ma]=this[ya].map(e=>new e(t))}connectedCallback(){if(this.hasOwnProperty("color")){const e=this.color;delete this.color,this.color=e}else this.color||(this.color=this.colorModel.defaultColor)}attributeChangedCallback(e,t,n){const i=this.colorModel.fromAttr(n);this[pa](i)||(this.color=i)}handleEvent(e){const t=this[fa],n={...t,...e.detail};let i;this[_a](n),ia(n,t)||this[pa](i=this.colorModel.fromHsva(n))||(this[ga]=i,aa(this,"color-changed",{value:i}))}[pa](e){return this.color&&this.colorModel.equal(e,this.color)}[_a](e){this[fa]=e,this[ma].forEach(t=>t.update(e))}}const xa={defaultColor:"#000",toHsva:e=>na(Xo(e)),fromHsva:({h:e,s:t,v:n})=>ta(Qo({h:e,s:t,v:n,a:1})),equal:(e,t)=>e.toLowerCase()===t.toLowerCase()||ia(Xo(e),Xo(t)),fromAttr:e=>e};class $a extends ba{get colorModel(){return xa}}window.customElements.get("hex-color-picker")||window.customElements.define("hex-color-picker",class extends $a{});let wa=class extends le{constructor(){super(...arguments),this._config={type:"custom:background-graph-entities",entities:[],color_thresholds:[]},this._draggedIndex=null,this._dropIndex=null,this._draggedThresholdIndex=null,this._dropThresholdIndex=null,this._activeColorPicker=null,this._editingIndex=null,this._handleOutsideClick=e=>{if(!this._activeColorPicker)return;const t=e.composedPath()[0];t.closest(".color-input-wrapper")||t.closest(".color-picker-popup")||this._closeActiveColorPicker()}}setConfig(e){const t=(e.entities||[]).filter(Boolean).map(e=>"string"==typeof e?{entity:e}:e);this._config={...e,entities:t},this.requestUpdate()}connectedCallback(){super.connectedCallback(),document.addEventListener("mousedown",this._handleOutsideClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("mousedown",this._handleOutsideClick)}_closeActiveColorPicker(){if(!this._activeColorPicker)return;this.renderRoot.querySelectorAll(".color-picker-popup").forEach(e=>e.style.display="none"),this._activeColorPicker=null}_updateEntityOrGlobalConfig(e,t){this._updateConfig(n=>{if(null===e)return t(n);{const i=[...n.entities];return i[e]=t(i[e]),{...n,entities:i}}})}_updateConfig(e){if(!this._config)return;const t=e(this._config);this._config=t,((e,t,n,i)=>{const r=new CustomEvent(t,{bubbles:!0,cancelable:!1,composed:!0,...i,detail:n});e.dispatchEvent(r)})(this,"config-changed",{config:t})}_toggleColorPicker(e,t){e.stopPropagation();const n=this.renderRoot.querySelector(`.color-picker-popup[data-picker-id="${t}"]`);if(!n)return;const i=this._activeColorPicker===t;this._closeActiveColorPicker(),i||(n.style.display="block",this._activeColorPicker=t)}_handleColorModeChange(e,t=null){const n=e.detail?.value??e.target.value;this._updateEntityOrGlobalConfig(t,e=>{const i=(e.color_thresholds?.length??0)>0?"threshold":"single";if(n===i)return e;const r={...e};return"threshold"===n?(null!==t&&delete r.line_color,r.color_thresholds&&0!==r.color_thresholds.length||(r.color_thresholds=[{value:0,color:"#000000"}])):delete r.color_thresholds,r})}_sortValueChanged(e){const t=e.target,n=t.configValue;n&&this._config&&this._updateConfig(i=>{const r={...i},o={...r.sort||{}};let a;return a="ha-switch"===t.tagName?.toLowerCase()?t.checked:"ha-select"===t.tagName?.toLowerCase()?e.detail?.value??t.value:t.value,"sort_method"===n?"none"!==a&&a?o.method=a:delete o.method:"sort_reverse"===n?!1!==a&&a?o.reverse=!0:delete o.reverse:"sort_numeric"===n&&(!0===a||void 0===a?delete o.numeric:o.numeric=!1),0===Object.keys(o).length?delete r.sort:r.sort=o,r})}_valueChanged(e){const t=e.target,n=t.configValue;n&&this._config&&this._updateConfig(i=>{const r={...i};let o;return o="ha-switch"===t.tagName?.toLowerCase()?t.checked:"ha-select"===t.tagName?.toLowerCase()?e.detail?.value??t.value:t.value,"number"===t.type&&(o=""===t.value?void 0:Number(t.value)),void 0===o||"number"==typeof o&&isNaN(o)?delete r[n]:r[n]=o,r})}_entitySwitchChanged(e){const t=e.target,n=Number(t.dataset.index),i=t.dataset.field;if(isNaN(n)||!i)return;const r=t.checked;this._updateEntityOrGlobalConfig(n,e=>{const t={...e};return t[i]=r,t})}_extraValueUseEntityNameChanged(e){const t=e.target,n=Number(t.dataset.index);if(isNaN(n))return;const i=t.checked;this._updateEntityOrGlobalConfig(n,e=>{const t={...e};return i?t.extra_value_name=!0:delete t.extra_value_name,t})}_unitHiddenChanged(e){const t=e.target,n=Number(t.dataset.index),i=t.dataset.field;if(isNaN(n)||!i)return;const r=t.checked;this._updateEntityOrGlobalConfig(n,e=>{const t={...e};return r?t[i]=!1:delete t[i],t})}_entityAttributeChanged(e){const t=e.target,n=Number(t.dataset.index),i=t.dataset.field;if(isNaN(n)||!i)return;let r=e.detail?.value??t.value;"ha-slider"!==t.tagName.toLowerCase()&&"number"!==t.type||(r=""===t.value?void 0:Number(t.value)),"string"==typeof r&&(r=r.trim()),this._updateEntityOrGlobalConfig(n,e=>{const t={...e};return""===r||void 0===r||"number"==typeof r&&isNaN(r)?delete t[i]:t[i]=r,t})}_colorPicked(e){const t=e.target.configValue;if(!t)return;const n=e.detail.value;this._updateConfig(e=>{if(e[t]===n)return e;const i={...e};return n?i[t]=n:delete i[t],i})}_thresholdChanged(e,t,n=null){const i=e.target,r=i.dataset.field,o=i.tagName.toLowerCase().includes("color-picker")?e.detail.value:i.value,a="value"===r?Number(o):o;this._updateEntityOrGlobalConfig(n,e=>{if(!e.color_thresholds)return e;const n=[...e.color_thresholds];return n[t]={...n[t],[r]:a},{...e,color_thresholds:n}})}_addThreshold(e=null){const t={value:0,color:"#000000"};this._updateEntityOrGlobalConfig(e,e=>{const n=[...e.color_thresholds||[],t];return{...e,color_thresholds:n}})}_removeThreshold(e,t=null){this._updateEntityOrGlobalConfig(t,t=>{if(!t.color_thresholds)return t;const n=[...t.color_thresholds];if(n.splice(e,1),0===n.length){const e={...t};return delete e.color_thresholds,e}return{...t,color_thresholds:n}})}_handleThresholdDragStart(e,t){this._draggedThresholdIndex=t,e.dataTransfer&&(e.dataTransfer.effectAllowed="move")}_handleThresholdDragOver(e,t){e.preventDefault(),t!==this._draggedThresholdIndex&&(this._dropThresholdIndex=t)}_handleThresholdDrop(e,t=null){e.preventDefault(),null!==this._draggedThresholdIndex&&null!==this._dropThresholdIndex&&(this._updateEntityOrGlobalConfig(t,e=>{if(!e.color_thresholds)return e;const t=[...e.color_thresholds],[n]=t.splice(this._draggedThresholdIndex,1);return t.splice(this._dropThresholdIndex,0,n),{...e,color_thresholds:t}}),this._draggedThresholdIndex=null,this._dropThresholdIndex=null)}_handleDragStart(e,t){this._draggedIndex=t,e.dataTransfer&&(e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",String(t)))}_handleDragOver(e,t){e.preventDefault(),t!==this._draggedIndex&&(this._dropIndex=t)}_handleDragLeave(){this._dropIndex=null}_handleDrop(e){e.preventDefault(),null!==this._draggedIndex&&null!==this._dropIndex&&this._draggedIndex!==this._dropIndex?(this._updateConfig(e=>{const t=[...e.entities],[n]=t.splice(this._draggedIndex,1);return t.splice(this._dropIndex,0,n),{...e,entities:t}}),this._handleDragEnd()):this._handleDragEnd()}_handleDragEnd(){this._draggedIndex=null,this._dropIndex=null}_addEntity(){this._updateConfig(e=>({...e,entities:[...e.entities,{entity:""}]}))}_removeEntity(e){this._updateConfig(t=>{const n=[...t.entities];return n.splice(e,1),{...t,entities:n}})}_overwriteAppearanceChanged(e){const t=e.target,n=Number(t.dataset.index);if(isNaN(n))return;const i=t.checked;this._updateEntityOrGlobalConfig(n,e=>{const t={...e};return i?t.overwrite_graph_appearance=!0:(delete t.overwrite_graph_appearance,delete t.line_color,delete t.line_opacity,delete t.color_thresholds,delete t.graph_min,delete t.graph_max),t}),this.requestUpdate()}_editEntity(e){this._editingIndex=e,this.requestUpdate()}_goBack(){this._editingIndex=null,this.requestUpdate()}_renderEntityEditor(){if(null===this._editingIndex)return j``;const e=this._config.entities[this._editingIndex];if(!e)return j``;const t=this.hass.states[e.entity],n=e.name||t?.attributes.friendly_name||e.entity,i=e.overwrite_graph_appearance??!1,r=e.icon_color||"var(--primary-text-color)",o=!(!t||("on"===t?.state||"off"===t?.state)||e.graph_entity&&e.graph_entity!==e.entity),a=e=>Yo(this.hass,`component.bge.editor.value_sources.${e}`),s=e.value_source??"latest",l=e.auto_icon_color_source??"latest",h=(e,t)=>{const n=this._editingIndex;null!==n&&this._updateEntityOrGlobalConfig(n,n=>{const i={...n};return"latest"!==t&&t?i[e]=t:delete i[e],i})};return j`
      <div class="header">
        <ha-icon-button @click=${this._goBack}><ha-icon icon="mdi:chevron-left"></ha-icon></ha-icon-button>
        <span class="title">${n}</span>
      </div>
      <div class="card-config">
        <h3>${Yo(this.hass,"component.bge.editor.entity_section_appearance")}</h3>
        <ha-input
          .label=${Yo(this.hass,"component.bge.editor.name")}
          .value=${e.name||""}
          .configValue=${"name"}
          data-index=${this._editingIndex}
          data-field="name"
          @change=${this._entityAttributeChanged}
        ></ha-input>
        <ha-icon-picker
          .hass=${this.hass}
          .label=${Yo(this.hass,"component.bge.editor.icon")}
          .value=${e.icon||""}
          data-index=${this._editingIndex}
          data-field="icon"
          @value-changed=${this._entityAttributeChanged}
        ></ha-icon-picker>

        <ha-formfield .label=${Yo(this.hass,"component.bge.editor.show_icon")}>
          <ha-switch
            .checked=${!1!==e.show_icon}
            data-index=${this._editingIndex}
            data-field="show_icon"
            @change=${this._entitySwitchChanged}
          ></ha-switch>
        </ha-formfield>

        <ha-formfield .label=${Yo(this.hass,"component.bge.editor.auto_icon_color")}>
          <ha-switch
            .checked=${!0===e.auto_icon_color}
            data-index=${this._editingIndex}
            data-field="auto_icon_color"
            @change=${this._entitySwitchChanged}
          ></ha-switch>
        </ha-formfield>

        <!-- The two are mutually exclusive: with auto colour on, icon_color is only a
             fallback until history arrives and was already read-only, so showing it
             greyed out was noise. It stays in the config and comes back on switch-off. -->
        ${e.auto_icon_color?j`
                <div class="dropdown-wrapper">
                  <ha-select
                    .label=${Yo(this.hass,"component.bge.editor.auto_icon_color_source")}
                    .value=${l}
                    .options=${[{value:"latest",label:a("latest")},{value:"max",label:a("max")},{value:"min",label:a("min")},{value:"avg",label:a("avg")},{value:"median",label:a("median")}]}
                    @selected=${e=>h("auto_icon_color_source",e.detail.value)}
                    @closed=${e=>e.stopPropagation()}
                  >
                  </ha-select>
                </div>
              `:j`
                <div
                  class="color-input-wrapper"
                  data-picker-id="entity_icon_color_${this._editingIndex}"
                  @mousedown=${e=>this._toggleColorPicker(e,`entity_icon_color_${this._editingIndex}`)}
                >
                  <ha-input
                    .label=${Yo(this.hass,"component.bge.editor.icon_color")}
                    .value=${e.icon_color??""}
                    .placeholder=${"var(--primary-text-color)"}
                    data-index=${this._editingIndex}
                    data-field="icon_color"
                    @change=${this._entityAttributeChanged}
                  ></ha-input>
                  <div class="color-preview" style="background-color: ${r}"></div>
                  <div
                    class="color-picker-popup"
                    data-picker-id="entity_icon_color_${this._editingIndex}"
                    @mousedown=${e=>e.stopPropagation()}
                  >
                    <hex-color-picker
                      .color=${r}
                      data-index=${this._editingIndex}
                      data-field="icon_color"
                      @color-changed=${this._entityAttributeChanged}
                    ></hex-color-picker>
                  </div>
                </div>
              `}

        <h3>${Yo(this.hass,"component.bge.editor.entity_section_value")}</h3>
        <div class="side-by-side">
          <ha-input
            .label=${Yo(this.hass,"component.bge.editor.value_transform")}
            .value=${e.value_transform??""}
            .helper=${Yo(this.hass,"component.bge.editor.value_transform_helper")}
            helperPersistent
            data-index=${this._editingIndex}
            data-field="value_transform"
            @change=${this._entityAttributeChanged}
          ></ha-input>
          ${!1===e.value_unit?"":j`
                  <ha-input
                    .label=${Yo(this.hass,"component.bge.editor.value_unit")}
                    .value=${"string"==typeof e.value_unit?e.value_unit:""}
                    .helper=${Yo(this.hass,"component.bge.editor.value_unit_helper")}
                    helperPersistent
                    data-index=${this._editingIndex}
                    data-field="value_unit"
                    @change=${this._entityAttributeChanged}
                  ></ha-input>
                `}
        </div>
        <ha-formfield .label=${Yo(this.hass,"component.bge.editor.value_unit_hide")}>
          <ha-switch
            .checked=${!1===e.value_unit}
            data-index=${this._editingIndex}
            data-field="value_unit"
            @change=${this._unitHiddenChanged}
          ></ha-switch>
        </ha-formfield>

        ${o?j`
                <div class="side-by-side">
                  <div class="dropdown-wrapper">
                    <ha-select
                      .label=${Yo(this.hass,"component.bge.editor.value_source")}
                      .value=${s}
                      .options=${[{value:"latest",label:a("latest")},{value:"max",label:a("max")},{value:"min",label:a("min")},{value:"avg",label:a("avg")},{value:"median",label:a("median")}]}
                      @selected=${e=>h("value_source",e.detail.value)}
                      @closed=${e=>e.stopPropagation()}
                    >
                    </ha-select>
                  </div>
                  <ha-input
                    .label=${Yo(this.hass,"component.bge.editor.value_label")}
                    .value=${e.value_label??""}
                    .helper=${Yo(this.hass,"component.bge.editor.value_label_helper")}
                    helperPersistent
                    data-index=${this._editingIndex}
                    data-field="value_label"
                    @change=${this._entityAttributeChanged}
                  ></ha-input>
                </div>
              `:""}

        <!-- Collapsed unless the row already uses the section, so existing config is never hidden. -->
        <ha-expansion-panel
          outlined
          .header=${Yo(this.hass,"component.bge.editor.entity_section_extra_value")}
          .expanded=${!!e.extra_value_entity}
        >
          <div class="panel-content">
            <ha-entity-picker
              .hass=${this.hass}
              .label=${Yo(this.hass,"component.bge.editor.extra_value_entity")}
              .value=${e.extra_value_entity||""}
              .helper=${Yo(this.hass,"component.bge.editor.extra_value_entity_helper")}
              data-index=${this._editingIndex}
              data-field="extra_value_entity"
              @value-changed=${this._entityAttributeChanged}
            ></ha-entity-picker>

            ${e.extra_value_entity?j`
                    <ha-formfield .label=${Yo(this.hass,"component.bge.editor.extra_value_use_entity_name")}>
                      <ha-switch
                        .checked=${!0===e.extra_value_name}
                        data-index=${this._editingIndex}
                        @change=${this._extraValueUseEntityNameChanged}
                      ></ha-switch>
                    </ha-formfield>
                    ${!0===e.extra_value_name?"":j`
                            <ha-input
                              .label=${Yo(this.hass,"component.bge.editor.extra_value_name")}
                              .value=${"string"==typeof e.extra_value_name?e.extra_value_name:""}
                              .helper=${Yo(this.hass,"component.bge.editor.extra_value_name_helper")}
                              helperPersistent
                              data-index=${this._editingIndex}
                              data-field="extra_value_name"
                              @change=${this._entityAttributeChanged}
                            ></ha-input>
                          `}
                    <div class="side-by-side">
                      <ha-input
                        .label=${Yo(this.hass,"component.bge.editor.extra_value_transform")}
                        .value=${e.extra_value_transform??""}
                        .helper=${Yo(this.hass,"component.bge.editor.extra_value_transform_helper")}
                        helperPersistent
                        data-index=${this._editingIndex}
                        data-field="extra_value_transform"
                        @change=${this._entityAttributeChanged}
                      ></ha-input>
                      ${!1===e.extra_value_unit?"":j`
                              <ha-input
                                .label=${Yo(this.hass,"component.bge.editor.extra_value_unit")}
                                .value=${"string"==typeof e.extra_value_unit?e.extra_value_unit:""}
                                .helper=${Yo(this.hass,"component.bge.editor.extra_value_unit_helper")}
                                helperPersistent
                                data-index=${this._editingIndex}
                                data-field="extra_value_unit"
                                @change=${this._entityAttributeChanged}
                              ></ha-input>
                            `}
                    </div>
                    <ha-formfield .label=${Yo(this.hass,"component.bge.editor.extra_value_unit_hide")}>
                      <ha-switch
                        .checked=${!1===e.extra_value_unit}
                        data-index=${this._editingIndex}
                        data-field="extra_value_unit"
                        @change=${this._unitHiddenChanged}
                      ></ha-switch>
                    </ha-formfield>
                  `:""}
          </div>
        </ha-expansion-panel>

        <ha-expansion-panel
          outlined
          .header=${Yo(this.hass,"component.bge.editor.entity_section_graph")}
          .expanded=${!!e.graph_entity||i}
        >
          <div class="panel-content">
            <ha-entity-picker
              .hass=${this.hass}
              .label=${Yo(this.hass,"component.bge.editor.graph_entity")}
              .value=${e.graph_entity||""}
              .helper=${Yo(this.hass,"component.bge.editor.graph_entity_helper")}
              data-index=${this._editingIndex}
              data-field="graph_entity"
              @value-changed=${this._entityAttributeChanged}
            ></ha-entity-picker>

            ${e.graph_entity?j`
                    <ha-formfield .label=${Yo(this.hass,"component.bge.editor.show_graph_entity_state")}>
                      <ha-switch
                        .checked=${!0===e.show_graph_entity_state}
                        data-index=${this._editingIndex}
                        data-field="show_graph_entity_state"
                        @change=${this._entitySwitchChanged}
                      ></ha-switch>
                    </ha-formfield>
                  `:""}

            <ha-formfield .label=${Yo(this.hass,"component.bge.editor.optional_overrides")}>
              <ha-switch
                .checked=${i}
                data-index=${this._editingIndex}
                @change=${this._overwriteAppearanceChanged}
              ></ha-switch>
            </ha-formfield>

            ${i?this._renderEntityGraphAppearanceEditor(this._editingIndex):""}
          </div>
        </ha-expansion-panel>
      </div>
    `}_renderGraphBoundsEditor(e,t,n){return j`
      <div class="side-by-side">
        <ha-input
          .label=${Yo(this.hass,"component.bge.editor.graph_min")}
          type="number"
          .value=${e.graph_min??""}
          data-field="graph_min"
          .configValue=${"graph_min"}
          data-index=${n}
          @change=${t}
        ></ha-input>
        <ha-input
          .label=${Yo(this.hass,"component.bge.editor.graph_max")}
          type="number"
          .value=${e.graph_max??""}
          data-field="graph_max"
          .configValue=${"graph_max"}
          data-index=${n}
          @change=${t}
        ></ha-input>
      </div>
    `}_renderEntityGraphAppearanceEditor(e){const t=this._config.entities[e];if(!t)return j``;const n=(t.color_thresholds?.length??0)>0?"threshold":"single",i=this.hass.themes?.darkMode??!1?"white":"black",r=t.line_color||this._config.line_color||i;return j`
      <div class="overrides">
        <h3>${Yo(this.hass,"component.bge.editor.graph_appearance")}</h3>

        <div class="opacity-slider-container">
          <div class="label-container">
            <span>${Yo(this.hass,"component.bge.editor.line_opacity")}</span>
            <span>${Number(t.line_opacity??this._config.line_opacity??.2).toFixed(3)}</span>
          </div>
          <ha-slider
            size="s"
            min="0.05"
            max="0.8"
            step="0.025"
            .value=${t.line_opacity??this._config.line_opacity??.2}
            data-index=${e}
            data-field="line_opacity"
            @change=${this._entityAttributeChanged}
            pin
          ></ha-slider>
        </div>

        ${this._renderGraphBoundsEditor(t,this._entityAttributeChanged,e)}

        <div class="dropdown-wrapper">
          <ha-select
            .label=${Yo(this.hass,"component.bge.editor.color_mode")}
            .value=${n}
            .options=${[{value:"single",label:Yo(this.hass,"component.bge.editor.color_modes.single")},{value:"threshold",label:Yo(this.hass,"component.bge.editor.color_modes.threshold")}]}
            @selected=${t=>this._handleColorModeChange(t,e)}
            @closed=${e=>e.stopPropagation()}
          >
          </ha-select>
        </div>

        ${"single"===n?j`
                <div
                  class="color-input-wrapper"
                  data-picker-id="entity_line_color_${e}"
                  @mousedown=${t=>this._toggleColorPicker(t,`entity_line_color_${e}`)}
                >
                  <ha-input
                    .label=${Yo(this.hass,"component.bge.editor.line_color")}
                    .value=${t.line_color??""}
                    .placeholder=${this._config.line_color||i}
                    data-index=${e}
                    data-field="line_color"
                    @change=${this._entityAttributeChanged}
                  ></ha-input>
                  <div class="color-preview" style="background-color: ${r}"></div>
                  <div
                    class="color-picker-popup"
                    data-picker-id="entity_line_color_${e}"
                    @mousedown=${e=>e.stopPropagation()}
                  >
                    <hex-color-picker
                      .color=${r}
                      data-index=${e}
                      data-field="line_color"
                      @color-changed=${this._entityAttributeChanged}
                    ></hex-color-picker>
                  </div>
                </div>
              `:this._renderEntityThresholdsEditor(e)}
      </div>
    `}_renderEntityThresholdsEditor(e){const t=this._config.entities[e];return t?j`
      <div>
        <h4>${Yo(this.hass,"component.bge.editor.color_thresholds")}</h4>
        <div class="entities-container">
          ${(t.color_thresholds||[]).map((t,n)=>j`
              <div
                class="entity-container threshold-container ${this._dropThresholdIndex===n?"drag-over":""} ${this._draggedThresholdIndex===n?"dragging":""}"
                draggable="true"
                @dragstart=${e=>this._handleThresholdDragStart(e,n)}
                @dragover=${e=>this._handleThresholdDragOver(e,n)}
                @dragleave=${()=>this._dropThresholdIndex=null}
                @drop=${t=>this._handleThresholdDrop(t,e)}
                @dragend=${()=>{this._draggedThresholdIndex=null,this._dropThresholdIndex=null}}
              >
                <div class="drag-handle">
                  <ha-icon icon="mdi:drag-vertical"></ha-icon>
                </div>
                <div class="threshold-inputs">
                  <ha-input
                    .label=${Yo(this.hass,"component.bge.editor.value")}
                    type="number"
                    .value=${String(t.value)}
                    data-field="value"
                    @change=${t=>this._thresholdChanged(t,n,e)}
                  ></ha-input>
                  <div
                    class="color-input-wrapper"
                    data-picker-id=${`entity_${e}_threshold_${n}`}
                    @mousedown=${t=>this._toggleColorPicker(t,`entity_${e}_threshold_${n}`)}
                  >
                    <ha-input
                      .label=${Yo(this.hass,"component.bge.editor.color")}
                      .value=${t.color}
                      data-field="color"
                      @change=${t=>this._thresholdChanged(t,n,e)}
                    ></ha-input>
                    <div class="color-preview" style="background-color: ${t.color}"></div>
                    <div
                      class="color-picker-popup"
                      data-picker-id=${`entity_${e}_threshold_${n}`}
                      @mousedown=${e=>e.stopPropagation()}
                    >
                      <hex-color-picker
                        .color=${t.color}
                        data-field="color"
                        @color-changed=${t=>this._thresholdChanged(t,n,e)}
                      ></hex-color-picker>
                    </div>
                  </div>
                </div>
                <ha-icon-button class="remove-icon" @click=${()=>this._removeThreshold(n,e)}
                  ><ha-icon icon="mdi:close"></ha-icon
                ></ha-icon-button>
              </div>
            `)}
        </div>
        <ha-button size="s" class="add-threshold-button" @click=${()=>this._addThreshold(e)}>
          ${Yo(this.hass,"component.bge.editor.add_threshold")}
        </ha-button>
      </div>
    `:j``}render(){return this.hass&&this._config?null!==this._editingIndex?this._renderEntityEditor():this._renderMainConfig():j`<div>Waiting for config…</div>`}_renderMainConfig(){const e=(this._config.color_thresholds?.length??0)>0?"threshold":"single",t=this.hass.themes?.darkMode??!1?"white":"black";return j`
      <div class="card-config">
        <h3>${Yo(this.hass,"component.bge.editor.general")}</h3>
        <div class="side-by-side">
          <ha-input
            .label=${Yo(this.hass,"component.bge.editor.title")}
            .value=${this._config.title||""}
            .configValue=${"title"}
            @change=${this._valueChanged}
          ></ha-input>
        </div>
        <div class="formfield-with-help">
          <ha-formfield .label=${Yo(this.hass,"component.bge.editor.average_in_title")}>
            <ha-switch
              .checked=${!0===this._config.average_in_title}
              .configValue=${"average_in_title"}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
          <div class="tooltip-container">
            <ha-icon class="help-icon" icon="mdi:help-circle-outline"></ha-icon>
            <div class="tooltip-content">${Yo(this.hass,"component.bge.editor.average_in_title_helper")}</div>
          </div>
        </div>

        <h3>${Yo(this.hass,"component.bge.editor.layout")}</h3>
        <ha-formfield .label=${Yo(this.hass,"component.bge.editor.tile_style")}>
          <ha-switch
            .checked=${!0===this._config.tile_style}
            .configValue=${"tile_style"}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>
        <ha-formfield .label=${Yo(this.hass,"component.bge.editor.show_icon")}>
          <ha-switch
            .checked=${!1!==this._config.show_icon}
            .configValue=${"show_icon"}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>

        <h3>${Yo(this.hass,"component.bge.editor.graph_appearance")}</h3>
        <div class="side-by-side">
          <ha-input
            .label=${Yo(this.hass,"component.bge.editor.hours_to_show")}
            type="number"
            .value=${String(this._config.hours_to_show??24)}
            .configValue=${"hours_to_show"}
            @change=${this._valueChanged}
          ></ha-input>

          <ha-input
            .label=${Yo(this.hass,"component.bge.editor.line_width")}
            type="number"
            .value=${String(this._config.line_width??3)}
            .configValue=${"line_width"}
            @change=${this._valueChanged}
          ></ha-input>
        </div>

        <div class="side-by-side">
          <div class="dropdown-wrapper">
            <ha-select
              .label=${Yo(this.hass,"component.bge.editor.line_length")}
              .value=${this._config.line_length||"long"}
              .configValue=${"line_length"}
              .options=${[{value:"long",label:Yo(this.hass,"component.bge.editor.line_lengths.long")},{value:"short",label:Yo(this.hass,"component.bge.editor.line_lengths.short")}]}
              @selected=${this._valueChanged}
              @closed=${e=>e.stopPropagation()}
            >
            </ha-select>
          </div>
          <div class="dropdown-wrapper">
            <ha-select
              .label=${Yo(this.hass,"component.bge.editor.curve")}
              .value=${this._config.curve||"spline"}
              .configValue=${"curve"}
              .options=${[{value:"spline",label:Yo(this.hass,"component.bge.editor.curves.spline")},{value:"linear",label:Yo(this.hass,"component.bge.editor.curves.linear")},{value:"natural",label:Yo(this.hass,"component.bge.editor.curves.natural")},{value:"step",label:Yo(this.hass,"component.bge.editor.curves.step")}]}
              @selected=${this._valueChanged}
              @closed=${e=>e.stopPropagation()}
            >
            </ha-select>
          </div>
        </div>

        <ha-formfield .label=${Yo(this.hass,"component.bge.editor.line_glow")}>
          <ha-switch
            .checked=${!0===this._config.line_glow}
            .configValue=${"line_glow"}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>

        <ha-formfield .label=${Yo(this.hass,"component.bge.editor.show_gaps")}>
          <ha-switch
            .checked=${!0===this._config.show_gaps}
            .configValue=${"show_gaps"}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>

        ${this._renderGraphBoundsEditor(this._config,this._valueChanged)}

        <div class="opacity-slider-container">
          <div class="label-container">
            <span>${Yo(this.hass,"component.bge.editor.line_opacity")}</span>
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
              .label=${Yo(this.hass,"component.bge.editor.color_mode")}
              .value=${e}
              .options=${[{value:"single",label:Yo(this.hass,"component.bge.editor.color_modes.single")},{value:"threshold",label:Yo(this.hass,"component.bge.editor.color_modes.threshold")}]}
              @selected=${e=>this._handleColorModeChange(e,null)}
              @closed=${e=>e.stopPropagation()}
            >
            </ha-select>
          </div>
        </div>

        ${"single"===e?j`
                <div
                  class="color-input-wrapper"
                  data-picker-id="line_color"
                  @mousedown=${e=>this._toggleColorPicker(e,"line_color")}
                >
                  <ha-input
                    .label=${Yo(this.hass,"component.bge.editor.line_color")}
                    .value=${this._config.line_color||t}
                    .configValue=${"line_color"}
                    @change=${this._valueChanged}
                  ></ha-input>
                  <div
                    class="color-preview"
                    style="background-color: ${this._config.line_color||t}"
                  ></div>
                  <div
                    class="color-picker-popup"
                    data-picker-id="line_color"
                    @mousedown=${e=>e.stopPropagation()}
                  >
                    <hex-color-picker
                      .color=${this._config.line_color||t}
                      .configValue=${"line_color"}
                      @color-changed=${this._colorPicked}
                    ></hex-color-picker>
                  </div>
                </div>
              `:j`
                <div>
                  <h3>${Yo(this.hass,"component.bge.editor.color_thresholds")}</h3>
                  <div class="entities-container">
                    ${(this._config.color_thresholds||[]).map((e,t)=>j`
                        <div
                          class="entity-container threshold-container ${this._dropThresholdIndex===t?"drag-over":""} ${this._draggedThresholdIndex===t?"dragging":""}"
                          draggable="true"
                          @dragstart=${e=>this._handleThresholdDragStart(e,t)}
                          @dragover=${e=>this._handleThresholdDragOver(e,t)}
                          @dragleave=${()=>this._dropThresholdIndex=null}
                          @drop=${e=>this._handleThresholdDrop(e,null)}
                          @dragend=${()=>{this._draggedThresholdIndex=null,this._dropThresholdIndex=null}}
                        >
                          <div class="drag-handle">
                            <ha-icon icon="mdi:drag-vertical"></ha-icon>
                          </div>
                          <div class="threshold-inputs">
                            <ha-input
                              .label=${Yo(this.hass,"component.bge.editor.value")}
                              type="number"
                              .value=${String(e.value)}
                              data-field="value"
                              @change=${e=>this._thresholdChanged(e,t,null)}
                            ></ha-input>
                            <div
                              class="color-input-wrapper"
                              data-picker-id=${`threshold_${t}`}
                              @mousedown=${e=>this._toggleColorPicker(e,`threshold_${t}`)}
                            >
                              <ha-input
                                .label=${Yo(this.hass,"component.bge.editor.color")}
                                .value=${e.color}
                                data-field="color"
                                data-index=${String(t)}
                                @change=${e=>this._thresholdChanged(e,t,null)}
                              ></ha-input>
                              <div class="color-preview" style="background-color: ${e.color}"></div>
                              <div
                                class="color-picker-popup"
                                data-picker-id=${`threshold_${t}`}
                                @mousedown=${e=>e.stopPropagation()}
                              >
                                <hex-color-picker
                                  .color=${e.color}
                                  data-field="color"
                                  @color-changed=${e=>this._thresholdChanged(e,t,null)}
                                ></hex-color-picker>
                              </div>
                            </div>
                          </div>
                          <ha-icon-button class="remove-icon" @click=${()=>this._removeThreshold(t,null)}
                            ><ha-icon icon="mdi:close"></ha-icon
                          ></ha-icon-button>
                        </div>
                      `)}
                  </div>
                  <ha-button size="s" class="add-threshold-button" @click=${()=>this._addThreshold(null)}>
                    ${Yo(this.hass,"component.bge.editor.add_threshold")}
                  </ha-button>
                </div>
              `}

        <h3>${Yo(this.hass,"component.bge.editor.sorting")}</h3>
        <div class="side-by-side">
          <div class="dropdown-wrapper">
            <ha-select
              .label=${Yo(this.hass,"component.bge.editor.sort_method")}
              .value=${this._config.sort?.method||"none"}
              .configValue=${"sort_method"}
              .options=${[{value:"none",label:Yo(this.hass,"component.bge.editor.sort_methods.none")},{value:"name",label:Yo(this.hass,"component.bge.editor.sort_methods.name")},{value:"state",label:Yo(this.hass,"component.bge.editor.sort_methods.state")},{value:"value",label:Yo(this.hass,"component.bge.editor.sort_methods.value")}]}
              @selected=${this._sortValueChanged}
              @closed=${e=>e.stopPropagation()}
            >
            </ha-select>
          </div>
          <ha-formfield .label=${Yo(this.hass,"component.bge.editor.sort_reverse")}>
            <ha-switch
              .checked=${!0===this._config.sort?.reverse}
              .configValue=${"sort_reverse"}
              .disabled=${"none"===this._config.sort?.method||!this._config.sort?.method}
              @change=${this._sortValueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>
        <div class="side-by-side margin-bottom">
          <ha-formfield .label=${Yo(this.hass,"component.bge.editor.sort_numeric")}>
            <ha-switch
              .checked=${!1!==this._config.sort?.numeric}
              .configValue=${"sort_numeric"}
              .disabled=${"none"===this._config.sort?.method||!this._config.sort?.method}
              @change=${this._sortValueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>

        <h3>${Yo(this.hass,"component.bge.editor.data_settings")}</h3>
        <div class="side-by-side">
          <ha-input
            .label=${Yo(this.hass,"component.bge.editor.points_per_hour")}
            type="number"
            .value=${String(this._config.points_per_hour??1)}
            .configValue=${"points_per_hour"}
            @change=${this._valueChanged}
          ></ha-input>
          <ha-input
            .label=${Yo(this.hass,"component.bge.editor.update_interval")}
            type="number"
            .value=${String(this._config.update_interval??600)}
            .configValue=${"update_interval"}
            @change=${this._valueChanged}
          ></ha-input>
        </div>

        <h3>${Yo(this.hass,"component.bge.editor.entities")}</h3>

        <div class="entities-container">
          ${this._config.entities.map((e,t)=>j`
              <div
                class="entity-container ${this._dropIndex===t?"drag-over":""} ${this._draggedIndex===t?"dragging":""}"
                @dragover=${e=>this._handleDragOver(e,t)}
                @dragleave=${this._handleDragLeave}
                @drop=${this._handleDrop}
                @dragend=${this._handleDragEnd}
              >
                <div
                  class="drag-handle"
                  draggable="true"
                  @dragstart=${e=>this._handleDragStart(e,t)}
                >
                  <ha-icon icon="mdi:drag-vertical"></ha-icon>
                </div>
                <div class="entity-content">
                  <div class="entity-main">
                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${e.entity}
                      data-index=${t}
                      data-field="entity"
                      @mousedown=${e=>e.stopPropagation()}
                      @value-changed=${this._entityAttributeChanged}
                      allow-custom-entity
                    ></ha-entity-picker>
                    <ha-icon-button
                      class="edit-icon"
                      @mousedown=${e=>e.stopPropagation()}
                      @click=${()=>this._editEntity(t)}
                      ><ha-icon icon="mdi:pencil"></ha-icon
                    ></ha-icon-button>
                    <ha-icon-button
                      class="remove-icon"
                      @mousedown=${e=>e.stopPropagation()}
                      @click=${()=>this._removeEntity(t)}
                      ><ha-icon icon="mdi:close"></ha-icon
                    ></ha-icon-button>
                  </div>
                </div>
              </div>
            `)}
        </div>
        <ha-button size="s" class="add-entity-button" @click=${this._addEntity}>
          ${Yo(this.hass,"component.bge.editor.add_entity")}
        </ha-button>
      </div>
    `}static{this.styles=s`
    ${a(Wo)}
  `}};e([pe({attribute:!1})],wa.prototype,"hass",void 0),e([ge()],wa.prototype,"_config",void 0),e([ge()],wa.prototype,"_draggedIndex",void 0),e([ge()],wa.prototype,"_dropIndex",void 0),e([ge()],wa.prototype,"_draggedThresholdIndex",void 0),e([ge()],wa.prototype,"_dropThresholdIndex",void 0),e([ge()],wa.prototype,"_activeColorPicker",void 0),e([ge()],wa.prototype,"_editingIndex",void 0),wa=e([ce("background-graph-entities-editor")],wa);var Ca=Object.freeze({__proto__:null,get BackgroundGraphEntitiesEditor(){return wa}});export{jo as BackgroundGraphEntities};
