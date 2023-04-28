(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{3454:function(e,t,n){"use strict";var r,a;e.exports=(null==(r=n.g.process)?void 0:r.env)&&"object"==typeof(null==(a=n.g.process)?void 0:a.env)?n.g.process:n(7663)},1118:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n(9707)}])},9707:function(e,t,n){"use strict";let r,a,i,s,o,l;n.r(t),n.d(t,{default:function(){return tk}});var c,u,h,d=n(5893);n(7475);var f=n(3454);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let p=function(e){let t=[],n=0;for(let r=0;r<e.length;r++){let a=e.charCodeAt(r);a<128?t[n++]=a:a<2048?(t[n++]=a>>6|192,t[n++]=63&a|128):(64512&a)==55296&&r+1<e.length&&(64512&e.charCodeAt(r+1))==56320?(a=65536+((1023&a)<<10)+(1023&e.charCodeAt(++r)),t[n++]=a>>18|240,t[n++]=a>>12&63|128,t[n++]=a>>6&63|128,t[n++]=63&a|128):(t[n++]=a>>12|224,t[n++]=a>>6&63|128,t[n++]=63&a|128)}return t},g=function(e){let t=[],n=0,r=0;for(;n<e.length;){let a=e[n++];if(a<128)t[r++]=String.fromCharCode(a);else if(a>191&&a<224){let i=e[n++];t[r++]=String.fromCharCode((31&a)<<6|63&i)}else if(a>239&&a<365){let i=e[n++],s=e[n++],o=e[n++],l=((7&a)<<18|(63&i)<<12|(63&s)<<6|63&o)-65536;t[r++]=String.fromCharCode(55296+(l>>10)),t[r++]=String.fromCharCode(56320+(1023&l))}else{let i=e[n++],s=e[n++];t[r++]=String.fromCharCode((15&a)<<12|(63&i)<<6|63&s)}}return t.join("")},m={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();let n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let t=0;t<e.length;t+=3){let a=e[t],i=t+1<e.length,s=i?e[t+1]:0,o=t+2<e.length,l=o?e[t+2]:0,c=a>>2,u=(3&a)<<4|s>>4,h=(15&s)<<2|l>>6,d=63&l;o||(d=64,i||(h=64)),r.push(n[c],n[u],n[h],n[d])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(p(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):g(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();let n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let t=0;t<e.length;){let a=n[e.charAt(t++)],i=t<e.length,s=i?n[e.charAt(t)]:0;++t;let o=t<e.length,l=o?n[e.charAt(t)]:64;++t;let c=t<e.length,u=c?n[e.charAt(t)]:64;if(++t,null==a||null==s||null==l||null==u)throw new b;let h=a<<2|s>>4;if(r.push(h),64!==l){let e=s<<4&240|l>>2;if(r.push(e),64!==u){let e=l<<6&192|u;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class b extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}let w=function(e){let t=p(e);return m.encodeByteArray(t,!0)},y=function(e){return w(e).replace(/\./g,"")},v=function(e){try{return m.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null},I=()=>/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==n.g)return n.g;throw Error("Unable to locate global object.")})().__FIREBASE_DEFAULTS__,E=()=>{if(void 0===f||void 0===f.env)return;let e=f.env.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},_=()=>{let e;if("undefined"==typeof document)return;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}let t=e&&v(e[1]);return t&&JSON.parse(t)},S=()=>{try{return I()||E()||_()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},C=()=>{var e;return null===(e=S())||void 0===e?void 0:e.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}function A(){try{return"object"==typeof indexedDB}catch(e){return!1}}function T(){return new Promise((e,t)=>{try{let n=!0,r="validate-browser-context-for-indexeddb-analytics-module",a=self.indexedDB.open(r);a.onsuccess=()=>{a.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},a.onupgradeneeded=()=>{n=!1},a.onerror=()=>{var e;t((null===(e=a.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}})}class O extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,O.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,B.prototype.create)}}class B{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){let n=t[0]||{},r=`${this.service}/${e}`,a=this.errors[e],i=a?a.replace(P,(e,t)=>{let r=n[t];return null!=r?String(r):`<${t}?>`}):"Error",s=`${this.serviceName}: ${i} (${r}).`,o=new O(r,s,n);return o}}let P=/\{\$([^}]+)}/g;function k(e,t){if(e===t)return!0;let n=Object.keys(e),r=Object.keys(t);for(let a of n){if(!r.includes(a))return!1;let n=e[a],i=t[a];if(M(n)&&M(i)){if(!k(n,i))return!1}else if(n!==i)return!1}for(let e of r)if(!n.includes(e))return!1;return!0}function M(e){return null!==e&&"object"==typeof e}function L(e,t=1e3,n=2){let r=t*Math.pow(n,e);return Math.min(144e5,r+Math.round(.5*r*(Math.random()-.5)*2))}class ${constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let N="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let e=new D;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{let n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(e){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let n=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),r=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(e){if(r)return null;throw e}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if("EAGER"===e.instantiationMode)try{this.getOrInitializeService({instanceIdentifier:N})}catch(e){}for(let[e,t]of this.instancesDeferred.entries()){let n=this.normalizeInstanceIdentifier(e);try{let e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch(e){}}}}clearInstance(e=N){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=N){return this.instances.has(e)}getOptions(e=N){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(let[e,t]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(e);n===a&&t.resolve(r)}return r}onInit(e,t){var n;let r=this.normalizeInstanceIdentifier(t),a=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;a.add(e),this.onInitCallbacks.set(r,a);let i=this.instances.get(r);return i&&e(i,r),()=>{a.delete(e)}}invokeOnInitCallbacks(e,t){let n=this.onInitCallbacks.get(t);if(n)for(let r of n)try{r(e,t)}catch(e){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:e===N?void 0:e,options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch(e){}return n||null}normalizeInstanceIdentifier(e=N){return this.component?this.component.multipleInstances?e:N:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){let t=this.getProvider(e.name);t.isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new j(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let F=[];(u=h||(h={}))[u.DEBUG=0]="DEBUG",u[u.VERBOSE=1]="VERBOSE",u[u.INFO=2]="INFO",u[u.WARN=3]="WARN",u[u.ERROR=4]="ERROR",u[u.SILENT=5]="SILENT";let x={debug:h.DEBUG,verbose:h.VERBOSE,info:h.INFO,warn:h.WARN,error:h.ERROR,silent:h.SILENT},H=h.INFO,z={[h.DEBUG]:"log",[h.VERBOSE]:"log",[h.INFO]:"info",[h.WARN]:"warn",[h.ERROR]:"error"},U=(e,t,...n)=>{if(t<e.logLevel)return;let r=new Date().toISOString(),a=z[t];if(a)console[a](`[${r}]  ${e.name}:`,...n);else throw Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class V{constructor(e){this.name=e,this._logLevel=H,this._logHandler=U,this._userLogHandler=null,F.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in h))throw TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?x[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,h.DEBUG,...e),this._logHandler(this,h.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,h.VERBOSE,...e),this._logHandler(this,h.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,h.INFO,...e),this._logHandler(this,h.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,h.WARN,...e),this._logHandler(this,h.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,h.ERROR,...e),this._logHandler(this,h.ERROR,...e)}}let W=(e,t)=>t.some(t=>e instanceof t),q=new WeakMap,G=new WeakMap,K=new WeakMap,J=new WeakMap,X=new WeakMap,Y={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return G.get(e);if("objectStoreNames"===t)return e.objectStoreNames||K.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Z(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function Z(e){var t;if(e instanceof IDBRequest)return function(e){let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener("success",a),e.removeEventListener("error",i)},a=()=>{t(Z(e.result)),r()},i=()=>{n(e.error),r()};e.addEventListener("success",a),e.addEventListener("error",i)});return t.then(t=>{t instanceof IDBCursor&&q.set(t,e)}).catch(()=>{}),X.set(t,e),t}(e);if(J.has(e))return J.get(e);let n="function"==typeof(t=e)?t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(a||(a=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(Q(this),e),Z(q.get(this))}:function(...e){return Z(t.apply(Q(this),e))}:function(e,...n){let r=t.call(Q(this),e,...n);return K.set(r,e.sort?e.sort():[e]),Z(r)}:(t instanceof IDBTransaction&&function(e){if(G.has(e))return;let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener("complete",a),e.removeEventListener("error",i),e.removeEventListener("abort",i)},a=()=>{t(),r()},i=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",a),e.addEventListener("error",i),e.addEventListener("abort",i)});G.set(e,t)}(t),W(t,r||(r=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])))?new Proxy(t,Y):t;return n!==e&&(J.set(e,n),X.set(n,e)),n}let Q=e=>X.get(e);function ee(e,t,{blocked:n,upgrade:r,blocking:a,terminated:i}={}){let s=indexedDB.open(e,t),o=Z(s);return r&&s.addEventListener("upgradeneeded",e=>{r(Z(s.result),e.oldVersion,e.newVersion,Z(s.transaction))}),n&&s.addEventListener("blocked",()=>n()),o.then(e=>{i&&e.addEventListener("close",()=>i()),a&&e.addEventListener("versionchange",()=>a())}).catch(()=>{}),o}let et=["get","getKey","getAll","getAllKeys","count"],en=["put","add","delete","clear"],er=new Map;function ea(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&"string"==typeof t))return;if(er.get(t))return er.get(t);let n=t.replace(/FromIndex$/,""),r=t!==n,a=en.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(a||et.includes(n)))return;let i=async function(e,...t){let i=this.transaction(e,a?"readwrite":"readonly"),s=i.store;return r&&(s=s.index(t.shift())),(await Promise.all([s[n](...t),a&&i.done]))[0]};return er.set(t,i),i}Y={...c=Y,get:(e,t,n)=>ea(e,t)||c.get(e,t,n),has:(e,t)=>!!ea(e,t)||c.has(e,t)};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{constructor(e){this.container=e}getPlatformInfoString(){let e=this.container.getProviders();return e.map(e=>{if(!function(e){let t=e.getComponent();return(null==t?void 0:t.type)==="VERSION"}(e))return null;{let t=e.getImmediate();return`${t.library}/${t.version}`}}).filter(e=>e).join(" ")}}let es="@firebase/app",eo="0.9.8",el=new V("@firebase/app"),ec={[es]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js",firebase:"fire-js-all"},eu=new Map,eh=new Map;function ed(e){let t=e.name;if(eh.has(t))return el.debug(`There were multiple attempts to register component ${t}.`),!1;for(let n of(eh.set(t,e),eu.values()))!function(e,t){try{e.container.addComponent(t)}catch(n){el.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}(n,e);return!0}function ef(e,t){let n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}let ep=new B("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."});/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eg{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new $("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ep.create("app-deleted",{appName:this._name})}}function em(e,t,n){var r;let a=null!==(r=ec[e])&&void 0!==r?r:e;n&&(a+=`-${n}`);let i=a.match(/\s|\//),s=t.match(/\s|\//);if(i||s){let e=[`Unable to register library "${a}" with version "${t}":`];i&&e.push(`library name "${a}" contains illegal characters (whitespace or "/")`),i&&s&&e.push("and"),s&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),el.warn(e.join(" "));return}ed(new $(`${a}-version`,()=>({library:a,version:t}),"VERSION"))}let eb="firebase-heartbeat-store",ew=null;function ey(){return ew||(ew=ee("firebase-heartbeat-database",1,{upgrade:(e,t)=>{0===t&&e.createObjectStore(eb)}}).catch(e=>{throw ep.create("idb-open",{originalErrorMessage:e.message})})),ew}async function ev(e){try{let t=await ey();return t.transaction(eb).objectStore(eb).get(eE(e))}catch(e){if(e instanceof O)el.warn(e.message);else{let t=ep.create("idb-get",{originalErrorMessage:null==e?void 0:e.message});el.warn(t.message)}}}async function eI(e,t){try{let n=await ey(),r=n.transaction(eb,"readwrite"),a=r.objectStore(eb);return await a.put(t,eE(e)),r.done}catch(e){if(e instanceof O)el.warn(e.message);else{let t=ep.create("idb-set",{originalErrorMessage:null==e?void 0:e.message});el.warn(t.message)}}}function eE(e){return`${e.name}!${e.options.appId}`}class e_{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new eC(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){let e=this.container.getProvider("platform-logger").getImmediate(),t=e.getPlatformInfoString(),n=eS();return(null===this._heartbeatsCache&&(this._heartbeatsCache=await this._heartbeatsCachePromise),this._heartbeatsCache.lastSentHeartbeatDate===n||this._heartbeatsCache.heartbeats.some(e=>e.date===n))?void 0:(this._heartbeatsCache.heartbeats.push({date:n,agent:t}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(e=>{let t=new Date(e.date).valueOf(),n=Date.now();return n-t<=2592e6}),this._storage.overwrite(this._heartbeatsCache))}async getHeartbeatsHeader(){if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null===this._heartbeatsCache||0===this._heartbeatsCache.heartbeats.length)return"";let e=eS(),{heartbeatsToSend:t,unsentEntries:n}=function(e,t=1024){let n=[],r=e.slice();for(let a of e){let e=n.find(e=>e.agent===a.agent);if(e){if(e.dates.push(a.date),eD(n)>t){e.dates.pop();break}}else if(n.push({agent:a.agent,dates:[a.date]}),eD(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),r=y(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}}function eS(){let e=new Date;return e.toISOString().substring(0,10)}class eC{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!A()&&T().then(()=>!0).catch(()=>!1)}async read(){let e=await this._canUseIndexedDBPromise;if(!e)return{heartbeats:[]};{let e=await ev(this.app);return e||{heartbeats:[]}}}async overwrite(e){var t;let n=await this._canUseIndexedDBPromise;if(n){let n=await this.read();return eI(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;let n=await this._canUseIndexedDBPromise;if(n){let n=await this.read();return eI(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}}}function eD(e){return y(JSON.stringify({version:2,heartbeats:e})).length}ed(new $("platform-logger",e=>new ei(e),"PRIVATE")),ed(new $("heartbeat",e=>new e_(e),"PRIVATE")),em(es,eo,""),em(es,eo,"esm2017"),em("fire-js",""),/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */em("firebase","9.20.0","app");let eA="@firebase/installations",eT="0.6.4",eO=`w:${eT}`,eB="FIS_v2",eP=new B("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function ek(e){return e instanceof O&&e.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eM({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function eL(e){return{token:e.token,requestStatus:2,expiresIn:Number(e.expiresIn.replace("s","000")),creationTime:Date.now()}}async function e$(e,t){let n=await t.json(),r=n.error;return eP.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function eN({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}async function ej(e){let t=await e();return t.status>=500&&t.status<600?e():t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eR({appConfig:e,heartbeatServiceProvider:t},{fid:n}){let r=eM(e),a=eN(e),i=t.getImmediate({optional:!0});if(i){let e=await i.getHeartbeatsHeader();e&&a.append("x-firebase-client",e)}let s={fid:n,authVersion:eB,appId:e.appId,sdkVersion:eO},o={method:"POST",headers:a,body:JSON.stringify(s)},l=await ej(()=>fetch(r,o));if(l.ok){let e=await l.json(),t={fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:eL(e.authToken)};return t}throw await e$("Create Installation",l)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eF(e){return new Promise(t=>{setTimeout(t,e)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ex=/^[cdef][\w-]{21}$/;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eH(e){return`${e.appName}!${e.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ez=new Map;function eU(e,t){let n=eH(e);eV(n,t),function(e,t){let n=(!eW&&"BroadcastChannel"in self&&((eW=new BroadcastChannel("[Firebase] FID Change")).onmessage=e=>{eV(e.data.key,e.data.fid)}),eW);n&&n.postMessage({key:e,fid:t}),0===ez.size&&eW&&(eW.close(),eW=null)}(n,t)}function eV(e,t){let n=ez.get(e);if(n)for(let e of n)e(t)}let eW=null,eq="firebase-installations-store",eG=null;function eK(){return eG||(eG=ee("firebase-installations-database",1,{upgrade:(e,t)=>{0===t&&e.createObjectStore(eq)}})),eG}async function eJ(e,t){let n=eH(e),r=await eK(),a=r.transaction(eq,"readwrite"),i=a.objectStore(eq),s=await i.get(n);return await i.put(t,n),await a.done,s&&s.fid===t.fid||eU(e,t.fid),t}async function eX(e){let t=eH(e),n=await eK(),r=n.transaction(eq,"readwrite");await r.objectStore(eq).delete(t),await r.done}async function eY(e,t){let n=eH(e),r=await eK(),a=r.transaction(eq,"readwrite"),i=a.objectStore(eq),s=await i.get(n),o=t(s);return void 0===o?await i.delete(n):await i.put(o,n),await a.done,o&&(!s||s.fid!==o.fid)&&eU(e,o.fid),o}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eZ(e){let t;let n=await eY(e.appConfig,n=>{let r=function(e){let t=e||{fid:function(){try{let e=new Uint8Array(17),t=self.crypto||self.msCrypto;t.getRandomValues(e),e[0]=112+e[0]%16;let n=function(e){let t=/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){let t=btoa(String.fromCharCode(...e));return t.replace(/\+/g,"-").replace(/\//g,"_")}(e);return t.substr(0,22)}(e);return ex.test(n)?n:""}catch(e){return""}}(),registrationStatus:0};return e2(t)}(n),a=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine){let e=Promise.reject(eP.create("app-offline"));return{installationEntry:t,registrationPromise:e}}let n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=eQ(e,n);return{installationEntry:n,registrationPromise:r}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:e0(e)}:{installationEntry:t}}(e,r);return t=a.registrationPromise,a.installationEntry});return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function eQ(e,t){try{let n=await eR(e,t);return eJ(e.appConfig,n)}catch(n){throw ek(n)&&409===n.customData.serverCode?await eX(e.appConfig):await eJ(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function e0(e){let t=await e1(e.appConfig);for(;1===t.registrationStatus;)await eF(100),t=await e1(e.appConfig);if(0===t.registrationStatus){let{installationEntry:t,registrationPromise:n}=await eZ(e);return n||t}return t}function e1(e){return eY(e,e=>{if(!e)throw eP.create("installation-not-found");return e2(e)})}function e2(e){return 1===e.registrationStatus&&e.registrationTime+1e4<Date.now()?{fid:e.fid,registrationStatus:0}:e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function e6({appConfig:e,heartbeatServiceProvider:t},n){let r=function(e,{fid:t}){return`${eM(e)}/${t}/authTokens:generate`}(e,n),a=function(e,{refreshToken:t}){let n=eN(e);return n.append("Authorization",`${eB} ${t}`),n}(e,n),i=t.getImmediate({optional:!0});if(i){let e=await i.getHeartbeatsHeader();e&&a.append("x-firebase-client",e)}let s={installation:{sdkVersion:eO,appId:e.appId}},o={method:"POST",headers:a,body:JSON.stringify(s)},l=await ej(()=>fetch(r,o));if(l.ok){let e=await l.json(),t=eL(e);return t}throw await e$("Generate Auth Token",l)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function e4(e,t=!1){let n;let r=await eY(e.appConfig,r=>{var a;if(!e7(r))throw eP.create("not-registered");let i=r.authToken;if(!t&&2===(a=i).requestStatus&&!function(e){let t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+36e5}(a))return r;if(1===i.requestStatus)return n=e3(e,t),r;{if(!navigator.onLine)throw eP.create("app-offline");let t=function(e){let t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}(r);return n=e8(e,t),t}}),a=n?await n:r.authToken;return a}async function e3(e,t){let n=await e5(e.appConfig);for(;1===n.authToken.requestStatus;)await eF(100),n=await e5(e.appConfig);let r=n.authToken;return 0===r.requestStatus?e4(e,t):r}function e5(e){return eY(e,e=>{if(!e7(e))throw eP.create("not-registered");let t=e.authToken;return 1===t.requestStatus&&t.requestTime+1e4<Date.now()?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function e8(e,t){try{let n=await e6(e,t),r=Object.assign(Object.assign({},t),{authToken:n});return await eJ(e.appConfig,r),n}catch(n){if(ek(n)&&(401===n.customData.serverCode||404===n.customData.serverCode))await eX(e.appConfig);else{let n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await eJ(e.appConfig,n)}throw n}}function e7(e){return void 0!==e&&2===e.registrationStatus}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function e9(e){let{installationEntry:t,registrationPromise:n}=await eZ(e);return n?n.catch(console.error):e4(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function te(e,t=!1){await tt(e);let n=await e4(e,t);return n.token}async function tt(e){let{registrationPromise:t}=await eZ(e);t&&await t}function tn(e){return eP.create("missing-app-config-values",{valueName:e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tr="installations",ta=e=>{let t=e.getProvider("app").getImmediate(),n=/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if(!e||!e.options)throw tn("App Configuration");if(!e.name)throw tn("App Name");for(let t of["projectId","apiKey","appId"])if(!e.options[t])throw tn(t);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t),r=ef(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},ti=e=>{let t=e.getProvider("app").getImmediate(),n=ef(t,tr).getImmediate();return{getId:()=>e9(n),getToken:e=>te(n,e)}};ed(new $(tr,ta,"PUBLIC")),ed(new $("installations-internal",ti,"PRIVATE")),em(eA,eT),em(eA,eT,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ts="analytics",to="https://www.googletagmanager.com/gtag/js",tl=new V("@firebase/analytics"),tc=new B("analytics","Analytics",{"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."});/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tu(e){if(!e.startsWith(to)){let t=tc.create("invalid-gtag-resource",{gtagURL:e});return tl.warn(t.message),""}return e}function th(e){return Promise.all(e.map(e=>e.catch(e=>e)))}async function td(e,t,n,r,a,i){let s=r[a];try{if(s)await t[s];else{let e=await th(n),r=e.find(e=>e.measurementId===a);r&&await t[r.appId]}}catch(e){tl.error(e)}e("config",a,i)}async function tf(e,t,n,r,a){try{let i=[];if(a&&a.send_to){let e=a.send_to;Array.isArray(e)||(e=[e]);let r=await th(n);for(let n of e){let e=r.find(e=>e.measurementId===n),a=e&&t[e.appId];if(a)i.push(a);else{i=[];break}}}0===i.length&&(i=Object.values(t)),await Promise.all(i),e("event",r,a||{})}catch(e){tl.error(e)}}let tp=new class{constructor(e={},t=1e3){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}};async function tg(e){var t;let{appId:n,apiKey:r}=e,a={method:"GET",headers:new Headers({Accept:"application/json","x-goog-api-key":r})},i="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig".replace("{app-id}",n),s=await fetch(i,a);if(200!==s.status&&304!==s.status){let e="";try{let n=await s.json();(null===(t=n.error)||void 0===t?void 0:t.message)&&(e=n.error.message)}catch(e){}throw tc.create("config-fetch-failed",{httpStatus:s.status,responseMessage:e})}return s.json()}async function tm(e,t=tp,n){let{appId:r,apiKey:a,measurementId:i}=e.options;if(!r)throw tc.create("no-app-id");if(!a){if(i)return{measurementId:i,appId:r};throw tc.create("no-api-key")}let s=t.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},o=new tw;return setTimeout(async()=>{o.abort()},void 0!==n?n:6e4),tb({appId:r,apiKey:a,measurementId:i},s,o,t)}async function tb(e,{throttleEndTimeMillis:t,backoffCount:n},r,a=tp){var i;let{appId:s,measurementId:o}=e;try{await new Promise((e,n)=>{let a=Math.max(t-Date.now(),0),i=setTimeout(e,a);r.addEventListener(()=>{clearTimeout(i),n(tc.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}catch(e){if(o)return tl.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${null==e?void 0:e.message}]`),{appId:s,measurementId:o};throw e}try{let t=await tg(e);return a.deleteThrottleMetadata(s),t}catch(c){if(!function(e){if(!(e instanceof O)||!e.customData)return!1;let t=Number(e.customData.httpStatus);return 429===t||500===t||503===t||504===t}(c)){if(a.deleteThrottleMetadata(s),o)return tl.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${null==c?void 0:c.message}]`),{appId:s,measurementId:o};throw c}let t=503===Number(null===(i=null==c?void 0:c.customData)||void 0===i?void 0:i.httpStatus)?L(n,a.intervalMillis,30):L(n,a.intervalMillis),l={throttleEndTimeMillis:Date.now()+t,backoffCount:n+1};return a.setThrottleMetadata(s,l),tl.debug(`Calling attemptFetch again in ${t} millis`),tb(e,l,r,a)}}class tw{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function ty(e,t,n,r,a){if(a&&a.global){e("event",n,r);return}{let a=await t,i=Object.assign(Object.assign({},r),{send_to:a});e("event",n,i)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tv(){if(!A())return tl.warn(tc.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;try{await T()}catch(e){return tl.warn(tc.create("indexeddb-unavailable",{errorInfo:null==e?void 0:e.toString()}).message),!1}return!0}async function tI(e,t,n,r,a,o,l){var c;let u=tm(e);u.then(t=>{n[t.measurementId]=t.appId,e.options.measurementId&&t.measurementId!==e.options.measurementId&&tl.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${t.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(e=>tl.error(e)),t.push(u);let h=tv().then(e=>e?r.getId():void 0),[d,f]=await Promise.all([u,h]);!function(e){let t=window.document.getElementsByTagName("script");for(let n of Object.values(t))if(n.src&&n.src.includes(to)&&n.src.includes(e))return n;return null}(o)&&function(e,t){let n;let r=(window.trustedTypes&&(n=window.trustedTypes.createPolicy("firebase-js-sdk-policy",{createScriptURL:tu})),n),a=document.createElement("script"),i=`${to}?l=${e}&id=${t}`;a.src=r?null==r?void 0:r.createScriptURL(i):i,a.async=!0,document.head.appendChild(a)}(o,d.measurementId),s&&(a("consent","default",s),s=void 0),a("js",new Date);let p=null!==(c=null==l?void 0:l.config)&&void 0!==c?c:{};return p.origin="firebase",p.update=!0,null!=f&&(p.firebase_id=f),a("config",d.measurementId,p),i&&(a("set",i),i=void 0),d.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tE{constructor(e){this.app=e}_delete(){return delete t_[this.app.options.appId],Promise.resolve()}}let t_={},tS=[],tC={},tD="dataLayer",tA=!1,tT="@firebase/analytics",tO="0.9.5";ed(new $(ts,(e,{options:t})=>{let n=e.getProvider("app").getImmediate(),r=e.getProvider("installations-internal").getImmediate();return function(e,t,n){!function(){let e=[];if(function(){let e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}()&&e.push("This is a browser extension environment."),"undefined"!=typeof navigator&&navigator.cookieEnabled||e.push("Cookies are not available."),e.length>0){let t=e.map((e,t)=>`(${t+1}) ${e}`).join(" "),n=tc.create("invalid-analytics-context",{errorInfo:t});tl.warn(n.message)}}();let r=e.options.appId;if(!r)throw tc.create("no-app-id");if(!e.options.apiKey){if(e.options.measurementId)tl.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw tc.create("no-api-key")}if(null!=t_[r])throw tc.create("already-exists",{id:r});if(!tA){var a,i;let e,t;e=[],Array.isArray(window[tD])?e=window[tD]:window[tD]=e;let{wrappedGtag:n,gtagCore:r}=(a="gtag",t=function(...e){window[tD].push(arguments)},window[a]&&"function"==typeof window[a]&&(t=window[a]),window[a]=(i=t,async function(e,t,n){try{"event"===e?await tf(i,t_,tS,t,n):"config"===e?await td(i,t_,tS,tC,t,n):"consent"===e?i("consent","update",n):i("set",t)}catch(e){tl.error(e)}}),{gtagCore:t,wrappedGtag:window[a]});l=n,o=r,tA=!0}t_[r]=tI(e,tS,tC,t,o,tD,n);let s=new tE(e);return s}(n,r,t)},"PUBLIC")),ed(new $("analytics-internal",function(e){try{let t=e.getProvider(ts).getImmediate();return{logEvent:(e,n,r)=>(function(e,t,n,r){var a;ty(l,t_[(e=(a=e)&&a._delegate?a._delegate:a).app.options.appId],t,n,r).catch(e=>tl.error(e))})(t,e,n,r)}}catch(e){throw tc.create("interop-component-reg-failed",{reason:e})}},"PRIVATE")),em(tT,tO),em(tT,tO,"esm2017");var tB=n(3454);let tP={apiKey:tB.env.REACT_APP_FIREBASE_API_KEY,authDomain:tB.env.REACT_APP_FIREBASE_AUTH_DOMAIN,projectId:tB.env.REACT_APP_FIREBASE_PROJECT_ID,storageBucket:tB.env.REACT_APP_FIREBASE_STORAGE_BUCKET,messagingSenderId:tB.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,appId:tB.env.REACT_APP_FIREBASE_APP_ID,measurementId:tB.env.REACT_APP_FIREBASE_MEASUREMENT_ID};console.log(tP),Array.from(eu.values()).length||function(e,t={}){let n=e;if("object"!=typeof t){let e=t;t={name:e}}let r=Object.assign({name:"[DEFAULT]",automaticDataCollectionEnabled:!1},t),a=r.name;if("string"!=typeof a||!a)throw ep.create("bad-app-name",{appName:String(a)});if(n||(n=C()),!n)throw ep.create("no-options");let i=eu.get(a);if(i){if(k(n,i.options)&&k(r,i.config))return;throw ep.create("duplicate-app",{appName:a})}let s=new R(a);for(let e of eh.values())s.addComponent(e);let o=new eg(n,r,s);eu.set(a,o)}(tP);var tk=function(e){let{Component:t,pageProps:n}=e;return(0,d.jsx)(t,{...n})}},7475:function(){},7663:function(e){!function(){var t={229:function(e){var t,n,r,a=e.exports={};function i(){throw Error("setTimeout has not been defined")}function s(){throw Error("clearTimeout has not been defined")}function o(e){if(t===setTimeout)return setTimeout(e,0);if((t===i||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:i}catch(e){t=i}try{n="function"==typeof clearTimeout?clearTimeout:s}catch(e){n=s}}();var l=[],c=!1,u=-1;function h(){c&&r&&(c=!1,r.length?l=r.concat(l):u=-1,l.length&&d())}function d(){if(!c){var e=o(h);c=!0;for(var t=l.length;t;){for(r=l,l=[];++u<t;)r&&r[u].run();u=-1,t=l.length}r=null,c=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===s||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function f(e,t){this.fun=e,this.array=t}function p(){}a.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];l.push(new f(e,t)),1!==l.length||c||o(d)},f.prototype.run=function(){this.fun.apply(null,this.array)},a.title="browser",a.browser=!0,a.env={},a.argv=[],a.version="",a.versions={},a.on=p,a.addListener=p,a.once=p,a.off=p,a.removeListener=p,a.removeAllListeners=p,a.emit=p,a.prependListener=p,a.prependOnceListener=p,a.listeners=function(e){return[]},a.binding=function(e){throw Error("process.binding is not supported")},a.cwd=function(){return"/"},a.chdir=function(e){throw Error("process.chdir is not supported")},a.umask=function(){return 0}}},n={};function r(e){var a=n[e];if(void 0!==a)return a.exports;var i=n[e]={exports:{}},s=!0;try{t[e](i,i.exports,r),s=!1}finally{s&&delete n[e]}return i.exports}r.ab="//";var a=r(229);e.exports=a}()}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],function(){return t(1118),t(880)}),_N_E=e.O()}]);