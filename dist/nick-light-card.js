/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,e$2=t$1.ShadowRoot&&(void 0===t$1.ShadyCSS||t$1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$3=new WeakMap;let n$2 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$3.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$3.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new n$2("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$2(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$1.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$1,getOwnPropertySymbols:o$2,getPrototypeOf:n$1}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$1(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$1(t),...o$2(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i$1=t=>t,s$1=t.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$1=`lit$${Math.random().toFixed(9).slice(2)}$`,n="?"+o$1,r=`<${n}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$1+x):s+o$1+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$1),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$1)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$1),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$1,t+1));)d.push({type:7,index:l}),t+=o$1.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t.litHtmlPolyfillSupport;B?.(S,k),(t.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}}i._$litElement$=true,i["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i});const o=s.litElementPolyfillSupport;o?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.2");

class NickLightCard extends i {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
      _mode: { type: String },
      _effectsMenuOpen: { type: Boolean }
    };
  }

  static get styles() {
    return i$3`
      :host {
        display: block;
      }

      .card {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 12px;
        background: rgba(0, 0, 0, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        cursor: pointer;
        transition: background 0.2s ease;
      }

      .card.on {
        background: rgba(255, 255, 255, 0.06);
      }

      .card:hover {
        background: rgba(255, 255, 255, 0.08);
      }

      .card.on:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .left-section {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
        min-width: 0;
      }

      .icon {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        color: var(--primary-text-color);
      }

      .name {
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--primary-text-color);
      }

      .button-group {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .right-section {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-left: auto;
      }

      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 32px;
        height: 28px;
        padding: 0 10px;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 16px;
        color: var(--primary-text-color);
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 11px;
        gap: 4px;
      }

      .btn:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.25);
      }

      .btn:active {
        transform: scale(0.95);
      }

      .btn.active {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.4);
      }

      .btn ha-icon {
        width: 18px;
        height: 18px;
        pointer-events: none;
      }

      .slider-container {
        width: 160px;
        position: relative;
      }

      input[type="range"] {
        width: 100%;
        height: 6px;
        -webkit-appearance: none;
        appearance: none;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        outline: none;
        cursor: pointer;
      }

      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        background: white;
        border: 2px solid rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transition: transform 0.1s ease;
      }

      input[type="range"]::-webkit-slider-thumb:hover {
        transform: scale(1.1);
      }

      input[type="range"]::-moz-range-thumb {
        width: 16px;
        height: 16px;
        background: white;
        border: 2px solid rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }

      input[type="range"]::-moz-range-track {
        height: 6px;
        background: transparent;
        border-radius: 8px;
      }

      .effects-menu {
        position: absolute;
        top: calc(100% + 4px);
        right: 0;
        min-width: 160px;
        max-height: 300px;
        overflow-y: auto;
        background: var(--card-background-color, #1c1c1c);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        z-index: 1000;
        padding: 4px 0;
      }

      .effects-menu-item {
        padding: 8px 12px;
        font-size: 13px;
        cursor: pointer;
        white-space: nowrap;
        color: var(--primary-text-color);
        transition: background 0.15s ease;
      }

      .effects-menu-item:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .effects-menu-item.active {
        background: rgba(255, 255, 255, 0.15);
      }

      .button-wrapper {
        position: relative;
      }
    `;
  }

  constructor() {
    super();
    this._mode = 'brightness';
    this._effectsMenuOpen = false;
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You must specify an entity');
    }
    this._config = config;
  }

  getCardSize() {
    return 1;
  }

  // Entity helpers
  _getEntity() {
    if (!this.hass || !this._config?.entity) return null;
    return this.hass.states[this._config.entity];
  }

  _getMotionEntity() {
    if (!this.hass || !this._config?.motion_entity) return null;
    return this.hass.states[this._config.motion_entity];
  }

  // Feature detection
  _supportsBrightness(stateObj) {
    if (!stateObj) return false;
    const attrs = stateObj.attributes || {};
    const modes = attrs.supported_color_modes || [];
    return modes.some(mode =>
      ['brightness', 'hs', 'rgb', 'rgbw', 'rgbww', 'xy', 'color_temp'].includes(mode)
    );
  }

  _supportsColorTemp(stateObj) {
    if (!stateObj) return false;
    const modes = stateObj.attributes?.supported_color_modes || [];
    return modes.includes('color_temp');
  }

  _supportsEffects(stateObj) {
    if (!stateObj) return false;
    const effectList = stateObj.attributes?.effect_list || [];
    return effectList.length > 0;
  }

  // Mode management
  _initializeMode(stateObj) {
    if (!this._mode) {
      const supportsBrightness = this._supportsBrightness(stateObj);
      const supportsTemp = this._supportsColorTemp(stateObj);

      if (supportsBrightness) {
        this._mode = 'brightness';
      } else if (supportsTemp) {
        this._mode = 'color_temp';
      }
    }
  }

  _toggleMode() {
    this._mode = this._mode === 'brightness' ? 'color_temp' : 'brightness';
  }

  // Slider calculations
  _getSliderConfig(stateObj) {
    if (!stateObj) {
      return { min: 0, max: 255, value: 0, background: this._getDefaultGradient() };
    }

    const attrs = stateObj.attributes || {};

    if (this._mode === 'color_temp' && this._supportsColorTemp(stateObj)) {
      return {
        min: attrs.min_mireds || 153,
        max: attrs.max_mireds || 500,
        value: attrs.color_temp || attrs.min_mireds || 153,
        background: this._getTempGradient()
      };
    }

    // Brightness mode
    return {
      min: 1,
      max: 255,
      value: attrs.brightness ?? 255,
      background: this._getBrightnessGradient(stateObj)
    };
  }

  _getBrightnessGradient(stateObj) {
    const attrs = stateObj?.attributes || {};

    if (attrs.hs_color && Array.isArray(attrs.hs_color)) {
      const [h, s] = attrs.hs_color;
      const saturation = Math.max(30, Math.min(100, s || 100));
      return `linear-gradient(to right,
        hsla(${h}, ${saturation}%, 20%, 0.2),
        hsla(${h}, ${saturation}%, 50%, 1))`;
    }

    if (attrs.rgb_color && Array.isArray(attrs.rgb_color)) {
      const [r, g, b] = attrs.rgb_color;
      return `linear-gradient(to right,
        rgba(${r}, ${g}, ${b}, 0.2),
        rgba(${r}, ${g}, ${b}, 1))`;
    }

    return this._getDefaultGradient();
  }

  _getTempGradient() {
    return 'linear-gradient(to right, #ff9800, #fff3e0, #90caf9)';
  }

  _getDefaultGradient() {
    return 'linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 1))';
  }

  // Event handlers
  _handleCardClick(e) {
    e.stopPropagation();
    const entity = this._getEntity();
    if (!entity) return;

    this.hass.callService('light', 'toggle', {
      entity_id: entity.entity_id
    });
  }

  _handleModeToggle(e) {
    e.stopPropagation();
    this._toggleMode();
  }

  _handleSliderChange(e) {
    e.stopPropagation();
    const entity = this._getEntity();
    if (!entity) return;

    const value = parseInt(e.target.value);
    const serviceData = { entity_id: entity.entity_id };

    if (this._mode === 'color_temp') {
      serviceData.color_temp = value;
    } else {
      serviceData.brightness = value;
    }

    this.hass.callService('light', 'turn_on', serviceData);
  }

  _handleEffectsToggle(e) {
    e.stopPropagation();
    this._effectsMenuOpen = !this._effectsMenuOpen;
  }

  _handleEffectSelect(effect, e) {
    e.stopPropagation();
    const entity = this._getEntity();
    if (!entity) return;

    this.hass.callService('light', 'turn_on', {
      entity_id: entity.entity_id,
      effect: effect
    });

    this._effectsMenuOpen = false;
  }

  _handleMotionToggle(e) {
    e.stopPropagation();
    const motionEntity = this._getMotionEntity();
    if (!motionEntity) return;

    const domain = motionEntity.entity_id.split('.')[0];
    this.hass.callService(domain, 'toggle', {
      entity_id: motionEntity.entity_id
    });
  }

  // Rendering helpers
  _renderEffectsButton(stateObj) {
    if (!this._supportsEffects(stateObj)) return null;

    const effectList = stateObj.attributes?.effect_list || [];
    const currentEffect = stateObj.attributes?.effect;

    return b`
      <div class="button-wrapper">
        <button
          class="btn ${this._effectsMenuOpen ? 'active' : ''}"
          @click=${this._handleEffectsToggle}
          title="Light Effects"
        >
          <ha-icon icon="mdi:auto-fix"></ha-icon>
        </button>

        ${this._effectsMenuOpen ? b`
          <div class="effects-menu" @click=${e => e.stopPropagation()}>
            ${effectList.map(effect => b`
              <div
                class="effects-menu-item ${currentEffect === effect ? 'active' : ''}"
                @click=${e => this._handleEffectSelect(effect, e)}
              >
                ${effect}
              </div>
            `)}
          </div>
        ` : ''}
      </div>
    `;
  }

  _renderMotionButton() {
    const motionEntity = this._getMotionEntity();
    if (!motionEntity) return null;

    const isOn = motionEntity.state === 'on';

    return b`
      <button
        class="btn ${isOn ? 'active' : ''}"
        @click=${this._handleMotionToggle}
        title="Motion Detection"
      >
        <ha-icon icon="mdi:run-fast"></ha-icon>
      </button>
    `;
  }

  _renderModeToggle(stateObj) {
    const supportsBrightness = this._supportsBrightness(stateObj);
    const supportsTemp = this._supportsColorTemp(stateObj);

    if (!supportsBrightness || !supportsTemp) return null;

    const icon = this._mode === 'color_temp' ? 'mdi:thermometer' : 'mdi:brightness-6';
    const title = this._mode === 'color_temp' ? 'Color Temperature' : 'Brightness';

    return b`
      <button
        class="btn"
        @click=${this._handleModeToggle}
        title="Toggle ${title}"
      >
        <ha-icon icon="${icon}"></ha-icon>
      </button>
    `;
  }

  _renderSlider(stateObj) {
    const supportsBrightness = this._supportsBrightness(stateObj);
    const supportsTemp = this._supportsColorTemp(stateObj);

    if (!supportsBrightness && !supportsTemp) return null;

    const config = this._getSliderConfig(stateObj);

    return b`
      <div class="slider-container">
        <input
          type="range"
          min="${config.min}"
          max="${config.max}"
          .value="${String(config.value)}"
          style="background: ${config.background}"
          @change=${this._handleSliderChange}
          @input=${this._handleSliderChange}
        />
      </div>
    `;
  }

  render() {
    const stateObj = this._getEntity();

    if (!stateObj) {
      return b`
        <ha-card>
          <div style="padding: 16px; color: var(--error-color);">
            Entity not found: ${this._config?.entity}
          </div>
        </ha-card>
      `;
    }

    this._initializeMode(stateObj);

    const isOn = stateObj.state === 'on';
    const attrs = stateObj.attributes || {};
    const icon = this._config.icon || attrs.icon || 'mdi:lightbulb';
    const name = this._config.name || attrs.friendly_name || stateObj.entity_id;

    return b`
      <div class="card ${isOn ? 'on' : ''}" @click=${this._handleCardClick}>
        <div class="left-section">
          <ha-icon class="icon" .icon="${icon}"></ha-icon>
          <div class="name">${name}</div>

          <div class="button-group" @click=${e => e.stopPropagation()}>
            ${this._renderEffectsButton(stateObj)}
            ${this._renderMotionButton()}
          </div>
        </div>

        <div class="right-section" @click=${e => e.stopPropagation()}>
          ${this._renderModeToggle(stateObj)}
          ${this._renderSlider(stateObj)}
        </div>
      </div>
    `;
  }
}

customElements.define('nick-light-card', NickLightCard);

// Register card with HACS/Lovelace
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'nick-light-card',
  name: 'Nick Light Card',
  description: 'A compact light card with effects, motion control, and brightness/temperature slider'
});
