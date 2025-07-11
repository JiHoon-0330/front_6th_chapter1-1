(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e){if(t.type!==`childList`)continue;for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();const e=`modulepreload`,t=function(e){return`/front_6th_chapter1-1/`+e},n={},r=function(r,i,a){let o=Promise.resolve();if(i&&i.length>0){let r=document.getElementsByTagName(`link`),s=document.querySelector(`meta[property=csp-nonce]`),c=s?.nonce||s?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}o=l(i.map(i=>{if(i=t(i,a),i in n)return;n[i]=!0;let o=i.endsWith(`.css`),s=o?`[rel="stylesheet"]`:``,l=!!a;if(l)for(let e=r.length-1;e>=0;e--){let t=r[e];if(t.href===i&&(!o||t.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${i}"]${s}`))return;let u=document.createElement(`link`);if(u.rel=o?`stylesheet`:e,o||(u.as=`script`),u.crossOrigin=``,u.href=i,c&&u.setAttribute(`nonce`,c),document.head.appendChild(u),o)return new Promise((e,t)=>{u.addEventListener(`load`,e),u.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${i}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(e=>{for(let t of e||[]){if(t.status!==`rejected`)continue;s(t.reason)}return r().catch(s)})},i=`/front_6th_chapter1-1`;var a=class{#pagesMap=new Map;#pageDispose;#currentParams;#root=`#root`;addPage(e,t){return this.#pagesMap.set(this.#ensureBasePath(e),t),this}init({_404:e=null}={}){this._404=e,this.#setEvents();let t=this.#getSearchParams();this.#navigateTo({pathname:location.pathname,params:t})}push({pathname:e=location.pathname,params:t={}}={}){this.#updateUrl({type:`pushState`,pathname:e,params:t}),this.#navigateTo({pathname:e,params:t})}replace({pathname:e=location.pathname,params:t={}}={}){this.#updateUrl({type:`replaceState`,pathname:e,params:t}),this.#navigateTo({pathname:e,params:t})}updateParams(e){this.#updateUrl({type:`replaceState`,pathname:location.pathname,params:e})}getParams(){return this.#currentParams}#ensureBasePath(e){let t=e.startsWith(i)?e.replace(i,``):e;return t===`/`?i:i+t}#setEvents(){window.addEventListener(`popstate`,()=>{let e=this.#getSearchParams();this.#navigateTo({pathname:location.pathname,params:e})}),document.addEventListener(`click`,e=>{let t=e.target.closest(`[data-link]`);if(t){e.preventDefault();let{pathname:n}=new URL(t.href);this.push({pathname:n})}})}#getSearchParams(){return Object.fromEntries(new URLSearchParams(location.search))}#navigateTo({pathname:e=location.pathname,params:t={}}={}){e=this.#ensureBasePath(e),this.#pageDispose&&this.#pageDispose(),this.#currentParams=t;let n=this.#matchPage({pathname:e,params:t});n?this.#pageDispose=n(this.#root):this.#pageDispose=this._404(this.#root)}#matchPage({pathname:e=location.pathname,params:t={}}={}){if(this.#pagesMap.has(e))return this.#pagesMap.get(e);let n=e.split(`/`);for(let[e,r]of this.#pagesMap.entries()){let i=e.split(`/`);if(i.length!==n.length)continue;let a=!0;for(let e=0;e<i.length;e++){if(i[e].startsWith(`:`)){this.#currentParams={...this.#currentParams,[i[e].slice(1)]:n[e]};continue}if(i[e]!==n[e]){a=!1;break}}if(a)return this.#currentParams={...this.#currentParams,...t},r}return null}#updateUrl({type:e=`pushState`,pathname:t=location.pathname.replace(i,``),params:n={}}={}){t=this.#ensureBasePath(t);let r=new URL(t,location.origin);Object.entries(n).forEach(([e,t])=>{r.searchParams.set(e,t)}),window.history[e]({},``,r)}};const o=new a;function s(e){return typeof e!=`string`||e.length===0?``:e.replace(/([A-Z])/g,`-$1`).toLowerCase().replace(/^-/,``)}function c(e){let t=`data-component`,n=`${t}="${s(e)}"`;return{attribute:n,selector:`[${n}]`}}const l=Symbol(`privateClass`);var u=class{#events=new Map([]);#abortControllerMap=new Map([]);constructor(e){if(l!==e)throw Error(`Cannot instantiate directly`)}addEvent({eventName:e,comopnentId:t,callback:n,selector:r}){if(this.#events.has(e)){let i=this.#events.get(e);i.has(t)?i.get(t).add({callback:n,selector:r}):i.set(t,new Set([{callback:n,selector:r}]))}else{this.setListener(e);let i=new Map([[t,new Set([{callback:n,selector:r}])]]);this.#events.set(e,i)}}setListener(e){let t=new AbortController;this.#abortControllerMap.get(e)?.abort(),this.#abortControllerMap.set(e,t),document.addEventListener(e,t=>{let n=this.#events.get(e);if(n)for(let[e,r]of n){if(!t.target.closest(e))continue;for(let{callback:e,selector:n}of r){let r=t.target.closest(n);if(r){e(t,r);break}}}},t)}removeEvent({comopnentId:e,eventName:t}){this.#events.has(t)&&(this.#events.get(t).delete(e),this.#events.get(t).size||this.#abort(t))}removeComponentEvents(e){this.#events.forEach((t,n)=>{t.delete(e),t.size||this.#abort(n)})}#abort(e){this.#abortControllerMap.get(e)?.abort(),this.#abortControllerMap.delete(e),this.#events.delete(e)}dispose(){this.#abortControllerMap.forEach(e=>e.abort())}};const d=new u(l);var f=class{#componentId;constructor(e){this.#componentId=e}addEvent({eventName:e,selector:t,callback:n}){d.addEvent({comopnentId:this.#componentId,eventName:e,selector:t,callback:n})}removeEvent({eventName:e}){d.removeEvent({comopnentId:this.#componentId,eventName:e})}dispose(){d.removeComponentEvents(this.#componentId)}};let p=null;const m=new Map,h=e=>{let t=()=>{queueMicrotask(e)};return t},g=(e,t)=>{p={componentId:e,fn:h(t)};try{t()}finally{p=null}return()=>{let t=m.get(e);if(t){for(let[n,r]of t)if(n?._observerMaps?.[r]){let t=n._observerMaps[r];t.forEach(n=>{n.componentId===e&&t.delete(n)})}m.delete(e)}}},_=e=>{let t={},n=new Proxy(e,{get(e,r){if(t[r]??=new Set,p){let{componentId:e,fn:i}=p;t[r].add({componentId:e,fn:i});let a=m.get(e);a||(a=new Set,m.set(e,a)),a.add([n,r])}return e[r]},set(e,n,r){let i=e[n],a=r;return i===a?!0:(e[n]=r,t[n]?.forEach(({fn:e})=>e()),!0)}});return n._observerMaps=t,n};var v=class e{state;props;$el;#disposeObserve;constructor(e){this.props=e,this.id=`${this.constructor.name}-component-${crypto.randomUUID()}`,this.dataAttribute=c(this.id),this.componentEvents=new f(this.dataAttribute.selector),this.setEvent()}setup(){this.state=_(this.initState()),this.#disposeObserve=g(this.id,()=>{this.mounted(),this.render()}),this.#getComponentInstance().forEach(e=>e.setup())}initState(){return{}}renderContainer(){}render(){}setEvent(){}addEvent(e,t,n){this.componentEvents.addEvent({eventName:e,selector:t,callback:n})}mounted(){this.$el=document.querySelector(this.dataAttribute.selector),this.$el||console.warn(`${this.dataAttribute.selector} not found`)}dispose(){this.#disposeObserve&&this.#disposeObserve(),this.componentEvents.dispose(),this.#getComponentInstance().forEach(e=>e.dispose())}#getComponentInstance(){let t=Object.values(this).filter(t=>t instanceof e),n=Object.values(this.props??{}).filter(t=>t instanceof e);return[...t,...n]}};function y(e,...t){let n=[];for(let r=0;r<e.length;r++)if(n.push(e[r]),r<t.length){let e=t[r];n.push(e instanceof v?e.renderContainer():e)}return n.join(``)}function ee(e){document.querySelector(e).innerHTML=y`
    <main class="max-w-md mx-auto px-4 py-4">
      <div class="text-center my-4 py-20 shadow-md p-6 bg-white rounded-lg">
        <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#4285f4;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#1a73e8;stop-opacity:1" />
            </linearGradient>
            <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="8" flood-color="#000000" flood-opacity="0.1" />
            </filter>
          </defs>

          <!-- 404 Numbers -->
          <text
            x="160"
            y="85"
            font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            font-size="48"
            font-weight="600"
            fill="url(#blueGradient)"
            text-anchor="middle"
          >
            404
          </text>

          <!-- Icon decoration -->
          <circle cx="80" cy="60" r="3" fill="#e8f0fe" opacity="0.8" />
          <circle cx="240" cy="60" r="3" fill="#e8f0fe" opacity="0.8" />
          <circle cx="90" cy="45" r="2" fill="#4285f4" opacity="0.5" />
          <circle cx="230" cy="45" r="2" fill="#4285f4" opacity="0.5" />

          <!-- Message -->
          <text
            x="160"
            y="110"
            font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            font-size="14"
            font-weight="400"
            fill="#5f6368"
            text-anchor="middle"
          >
            페이지를 찾을 수 없습니다
          </text>

          <!-- Subtle bottom accent -->
          <rect x="130" y="130" width="60" height="2" rx="1" fill="url(#blueGradient)" opacity="0.3" />
        </svg>

        <a
          href="/"
          data-link
          class="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >홈으로</a
        >
      </div>
    </main>
  `}var b=class extends v{renderContainer(){return y`<footer ${this.dataAttribute.attribute} class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-md mx-auto py-8 text-center text-gray-500">
        <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
      </div>
    </footer>`}},x=class{constructor(e,t=localStorage){this.storage=t,this.key=e}getItem(e){try{let t=JSON.parse(this.storage.getItem(this.key));return e?t[e]:t}catch(e){return console.error(e),null}}setItem(e){this.storage.setItem(this.key,JSON.stringify(e))}removeItem(e){this.storage.removeItem(e)}};const S=`.toast-container`;w.info=e=>w(`info`,e),w.success=e=>w(`success`,e),w.error=e=>w(`error`,e);function C(e){return{info:{style:`bg-blue-600`},success:{style:`bg-green-600`},error:{style:`bg-red-600`}}[e]}function w(e,t,n=3e3){T();let{style:r}=C(e),i=document.querySelector(S),a=null;i||(i=document.createElement(`div`),i.className=`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 ${S.slice(1)}`,a=new AbortController,i.addEventListener(`click`,e=>{let{target:t}=e,n=t.closest(`#toast-close-btn`);if(n){let e=n.dataset.toastId;E(e,s,a)}},a));let o=crypto.randomUUID(),s=setTimeout(()=>{E(o,s,a)},n);return i.innerHTML+=y`<div
    id=${o}
    class="${r} text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm"
  >
    <div class="flex-shrink-0">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
    </div>
    <p class="text-sm font-medium">${t}</p>
    <button id="toast-close-btn" data-toast-id="${o}" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div> `,D(i),()=>{s&&E(o,s,a)}}function T(){let e=document.querySelector(S);e&&e.remove()}function E(e,t,n){let r=document.querySelector(S),i=document.getElementById(e);i?.remove(),r?.childElementCount===0&&(r?.remove(),n?.abort()),clearTimeout?.(t)}function D(e,t=`footer`){let n=document.querySelector(t),r=n.parentNode;r.insertBefore(e,n)}const O={open:!1,count:0,items:new Map},k=new x(`shopping_cart`);let A=null;const te=()=>{A=g(`cart`,()=>{let e={};Object.keys(O).forEach(t=>{j[t]instanceof Map?e[t]=[...j[t]]:e[t]=j[t]}),k.setItem(e)})},j=_({...O,init(){let e={...O,...k.getItem()??{},open:!1};if(e)for(let[t,n]of Object.entries(O)){let r=e[t]??n;n instanceof Map?j[t]=new Map(r):j[t]=r}te()},openModal(){j.open=!0},closeModal(){j.open=!1},clearCart(){j.items=new Map,j.count=0,w.info(`장바구니에서 모두 제거되었습니다`)},checkout(){w.info(`구매 기능은 추후 구현 예정입니다.`)},hasItem(e){return j.items.has(e)},removeItem(e){j.items.delete(e),j.items=new Map([...j.items]),j.count=j.items.size,w.info(`장바구니에서 제거되었습니다`)},removeSelectedItems(){let{items:e}=j;e.forEach((t,n)=>{t.selected&&e.delete(n)}),j.items=new Map([...e]),j.count=j.items.size,w.info(`장바구니에서 선택된 상품이 제거되었습니다`)},toggleSelectedItem(e){let t=j.getItem(e);t.selected=!t.selected,j.items=new Map([...j.items])},toggleSelectAll(e){let{items:t}=j;t.forEach(t=>{t.selected=e}),j.items=new Map([...t])},addItem(e){try{if(j.hasItem(e.productId))j.addItemQuantity(e.productId,e.quantity??1);else{let{productId:t,lprice:n,image:r,title:i,quantity:a=1,selected:o=!1}=e,s={productId:t,lprice:n,image:r,title:i,selected:o,quantity:a};j.items.set(t,s),j.items=new Map([...j.items]),j.count=j.items.size}w.success(`장바구니에 추가되었습니다`)}catch(e){console.error(e),w.error(`장바구니에 추가하지 못했습니다`)}},getItem(e){return j.items.get(e)},addItemQuantity(e,t){if(!j.hasItem(e))throw Error(`${e} is not in cart`);let n=j.getItem(e);n.quantity=Math.max(n.quantity+t,1),j.items=new Map([...j.items])},updateItem(e,t,n){if(!j.hasItem(e))throw Error(`${e} is not in cart`);let r=j.getItem(e);r[t]=n,j.items=new Map([...j.items])},dispose(){A&&(A(),A=null)}});var M=class extends v{renderContainer(){return y` <header ${this.dataAttribute.attribute} class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-md mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          ${this.props.nav}
          <div class="flex items-center space-x-2">
            <!-- 장바구니 아이콘 -->
            <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"
                ></path>
              </svg>
              ${j.count>0?y`<span
                    data-id="cart-count"
                    class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    >${j.count}</span
                  >`:``}
            </button>
          </div>
        </div>
      </div>
    </header>`}render(){let{count:e}=j,t=this.$el.querySelector(`#cart-icon-btn > span`);if(e<=0){this.$el.querySelector(`#cart-icon-btn > span`)?.remove();return}if(t){t.textContent=e;return}this.$el.querySelector(`#cart-icon-btn`).appendChild(this.#createCartCountSpan({count:e}))}#createCartCountSpan({count:e}){let t=document.createElement(`span`);return t.className=`absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center`,t.textContent=e,t}setEvent(){this.addEvent(`click`,`#cart-icon-btn`,()=>{j.openModal()})}};function N(e){return(+e).toLocaleString()}var P=class extends v{renderContainer(){return y`<div
      ${this.dataAttribute.attribute}
      class="hidden fixed inset-0 z-50 overflow-y-auto cart-modal"
    ></div>`}render(){let{count:e,items:t}=j;j.open?(this.$el.classList.remove(`hidden`),this.$el.innerHTML=this.#CartList({count:e,items:t})):(this.$el.classList.add(`hidden`),this.$el.innerHTML=``)}setEvent(){this.addEvent(`click`,`#cart-modal-close-btn`,()=>{j.closeModal()}),this.addEvent(`click`,`.cart-item-remove-btn`,(e,{dataset:{productId:t}})=>{j.removeItem(t)}),this.addEvent(`click`,`#cart-modal-remove-selected-btn`,()=>{j.removeSelectedItems()}),this.addEvent(`click`,`.cart-item-checkbox`,(e,{dataset:{productId:t}})=>{j.toggleSelectedItem(t)}),this.addEvent(`click`,`#cart-modal-select-all-checkbox`,(e,{checked:t})=>{j.toggleSelectAll(t)}),this.addEvent(`click`,`#cart-modal-clear-cart-btn`,()=>{j.clearCart()}),this.addEvent(`click`,`#cart-modal-checkout-btn`,()=>{j.checkout()}),this.addEvent(`click`,`.quantity-increase-btn`,(e,{dataset:{productId:t}})=>{let n=this.$el.querySelector(`.quantity-input[data-product-id="${t}"]`),r=Math.max(n.valueAsNumber+1,1);n.value=r,j.updateItem(t,`quantity`,r)}),this.addEvent(`click`,`.quantity-decrease-btn`,(e,{dataset:{productId:t}})=>{let n=this.$el.querySelector(`.quantity-input[data-product-id="${t}"]`),r=Math.max(n.valueAsNumber-1,1);n.value=r,j.updateItem(t,`quantity`,r)}),this.addEvent(`click`,`.cart-modal-overlay`,()=>{j.closeModal()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&j.closeModal()},this.abortController)}#CartList({count:e,items:t}){let n=Array.from(t.values()),r=n.reduce((e,t)=>e+t.lprice*t.quantity,0),i=n.reduce((e,t)=>t.selected?e+t.lprice*t.quantity:e,0),a=n.reduce((e,t)=>t.selected?e+1:e,0),o=n.every(e=>e.selected);return y`
      <!-- 배경 오버레이 -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity cart-modal-overlay"></div>

      <div id="cart-content" class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4">
        <div
          class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden"
        >
          <!-- 헤더 -->
          <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <h2 class="text-lg font-bold text-gray-900 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"
                ></path>
              </svg>
              장바구니 ${e?y`<span class="text-sm font-normal text-gray-600 ml-1">(${e})</span>`:``}
            </h2>

            <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- 컨텐츠 -->
          <div class="flex flex-col max-h-[calc(90vh-120px)]">
            ${e?y`<!-- 전체 선택 섹션 -->
                  <div class="p-4 border-b border-gray-200 bg-gray-50">
                    <label class="flex items-center text-sm text-gray-700">
                      <input
                        type="checkbox"
                        ${o?`checked`:``}
                        id="cart-modal-select-all-checkbox"
                        class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
                      />
                      전체선택 (${e}개)
                    </label>
                  </div>
                  <!-- 아이템 목록 -->
                  <div class="flex-1 overflow-y-auto">
                    <div class="p-4 space-y-4">${n.map(this.#CartItem).join(``)}</div>
                  </div>
                  <!-- 하단 액션 -->
                  <div class="sticky bottom-0 bg-white border-t border-gray-200 p-4">
                    <!-- 선택된 아이템 정보 -->
                    ${a>0?y`<div class="flex justify-between items-center mb-3 text-sm">
                          <span class="text-gray-600">선택한 상품 (${a}개)</span>
                          <span class="font-medium">${N(i)}원</span>
                        </div>`:``}
                    <!-- 총 금액 -->
                    <div class="flex justify-between items-center mb-4">
                      <span class="text-lg font-bold text-gray-900">총 금액</span>
                      <span class="text-xl font-bold text-blue-600">${N(r)}원</span>
                    </div>
                    <!-- 액션 버튼들 -->
                    <div class="space-y-2">
                      ${a>0?y`<button
                            id="cart-modal-remove-selected-btn"
                            class="w-full bg-red-600 text-white py-2 px-4 rounded-md 
                                   hover:bg-red-700 transition-colors text-sm"
                          >
                            선택한 상품 삭제 (${a}개)
                          </button>`:``}

                      <div class="flex gap-2">
                        <button
                          id="cart-modal-clear-cart-btn"
                          class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md 
                       hover:bg-gray-700 transition-colors text-sm"
                        >
                          전체 비우기
                        </button>
                        <button
                          id="cart-modal-checkout-btn"
                          class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md 
                       hover:bg-blue-700 transition-colors text-sm"
                        >
                          구매하기
                        </button>
                      </div>
                    </div>
                  </div>`:y`<!-- 빈 장바구니 -->
                  <div class="flex-1 flex items-center justify-center p-8">
                    <div class="text-center">
                      <div class="text-gray-400 mb-4">
                        <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"
                          ></path>
                        </svg>
                      </div>
                      <h3 class="text-lg font-medium text-gray-900 mb-2">장바구니가 비어있습니다</h3>
                      <p class="text-gray-600">원하는 상품을 담아보세요!</p>
                    </div>
                  </div>`}
          </div>
        </div>
      </div>
    `}#CartItem({productId:e,lprice:t,quantity:n,image:r,title:i,selected:a}){return y`<div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="${e}">
      <!-- 선택 체크박스 -->
      <label class="flex items-center mr-3">
        <input
          type="checkbox"
          ${a?`checked`:``}
          class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded 
                focus:ring-blue-500"
          data-product-id="${e}"
        />
      </label>
      <!-- 상품 이미지 -->
      <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
        <img
          src="${r}"
          alt="${i}"
          class="w-full h-full object-cover cursor-pointer cart-item-image"
          data-product-id="${e}"
        />
      </div>
      <!-- 상품 정보 -->
      <div class="flex-1 min-w-0">
        <h4
          class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title"
          data-product-id="${e}"
        >
          ${i}
        </h4>
        <p class="text-sm text-gray-600 mt-1">${N(t)}원</p>
        <!-- 수량 조절 -->
        <div class="flex items-center mt-2">
          <button
            class="quantity-decrease-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
            data-product-id="${e}"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
            </svg>
          </button>
          <input
            type="number"
            value="${n}"
            min="1"
            class="quantity-input w-12 h-7 text-center text-sm border-t border-b 
                border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            disabled=""
            data-product-id="${e}"
          />
          <button
            class="quantity-increase-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
            data-product-id="${e}"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
        </div>
      </div>
      <!-- 가격 및 삭제 -->
      <div class="text-right ml-3">
        <p class="text-sm font-medium text-gray-900">${N(t*+n)}원</p>
        <button
          class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800"
          data-product-id="${e}"
        >
          삭제
        </button>
      </div>
    </div>`}},F=class extends v{cartModal=new P;renderContainer(){let{header:e,main:t,footer:n}=this.props;return y`
      <div ${this.dataAttribute.attribute} class="min-h-screen bg-gray-50">
        ${e} ${t} ${this.cartModal} ${n}
      </div>
    `}},I=class extends v{renderContainer(){return y`<button
      ${this.dataAttribute.attribute}
      id="add-to-cart-btn"
      data-product-id="${this.props.productDetailStore.product.productId}"
      class="w-full bg-blue-600 text-white py-3 px-4 rounded-md 
                 hover:bg-blue-700 transition-colors font-medium"
    >
      장바구니 담기
    </button>`}setEvent(){this.addEvent(`click`,`#add-to-cart-btn`,()=>{let e=document.querySelector(`#quantity-input`),t=e.valueAsNumber,{image:n,title:r,lprice:i,productId:a}=this.props.productDetailStore.product;j.addItem({productId:a,lprice:i,image:n,title:r,quantity:t,selected:!0})})}},L=class extends v{renderContainer(){let{product:{category1:e,category2:t}}=this.props.productDetailStore;return y`<nav ${this.dataAttribute.attribute} class="mb-4">
      <div class="flex items-center space-x-2 text-sm text-gray-600">
        <a href="/" data-link="" class="hover:text-blue-600 transition-colors">홈</a>
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
        <button class="breadcrumb-link" data-category1="${e}">${e}</button>
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
        <button class="breadcrumb-link" data-category2="${t}">${t}</button>
      </div>
    </nav>`}setEvent(){this.addEvent(`click`,`[data-category1]`,()=>{let{category1:e,category2:t}=this.props.productDetailStore.product;o.push({pathname:`/`,params:{category1:e,category2:t}})}),this.addEvent(`click`,`[data-category2]`,()=>{let{category1:e,category2:t}=this.props.productDetailStore.product;o.push({pathname:`/`,params:{category1:e,category2:t}})})}},R=class extends v{renderContainer(){let{quantity:e,product:t}=this.props.productDetailStore;return y`<div ${this.dataAttribute.attribute} class="flex items-center justify-between mb-4">
      <span class="text-sm font-medium text-gray-900">수량</span>
      <div class="flex items-center">
        <button
          id="quantity-decrease"
          class="w-8 h-8 flex items-center justify-center border border-gray-300 
                   rounded-l-md bg-gray-50 hover:bg-gray-100"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
          </svg>
        </button>
        <input
          type="number"
          id="quantity-input"
          value="${e}"
          min="1"
          max="${t.stock}"
          class="w-16 h-8 text-center text-sm border-t border-b border-gray-300 
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          id="quantity-increase"
          class="w-8 h-8 flex items-center justify-center border border-gray-300 
                   rounded-r-md bg-gray-50 hover:bg-gray-100"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </button>
      </div>
    </div>`}render(){let{quantity:e,product:t}=this.props.productDetailStore;this.$el.querySelector(`#quantity-input`).value=e,this.$el.querySelector(`#quantity-input`).max=t.stock}setEvent(){this.addEvent(`click`,`#quantity-decrease`,()=>{let e=this.$el.querySelector(`#quantity-input`),t=this.#clamp(e.valueAsNumber-1,e.max);e.value=t,this.props.productDetailStore.setQuantity(t)}),this.addEvent(`click`,`#quantity-increase`,()=>{let e=this.$el.querySelector(`#quantity-input`),t=this.#clamp(e.valueAsNumber+1,e.max);e.value=t,this.props.productDetailStore.setQuantity(t)}),this.addEvent(`change`,`#quantity-input`,(e,t)=>{let n=t.valueAsNumber;t.value=this.#clamp(n,t.max)})}#clamp(e,t){let n=1;return Math.max(n,Math.min(e,t))}},z=class extends v{constructor(e){super({...e,breadcrumb:new L(e),quantityInput:new R(e),addToCartBtn:new I(e)})}renderContainer(){return y`<main ${this.dataAttribute.attribute} class="max-w-md mx-auto px-4 py-4">
      <div class="py-20 bg-gray-50 flex items-center justify-center">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-600">상품 정보를 불러오는 중...</p>
        </div>
      </div>
    </main>`}render(){let{relatedProducts:e,product:{image:t,title:n,description:r,rating:i,reviewCount:a,lprice:o,stock:s,productId:c,isLoading:l}}=this.props.productDetailStore;if(l){this.$el.innerHTML=this.renderContainer();return}this.$el.innerHTML=y`${this.props.breadcrumb}
      <div class="bg-white rounded-lg shadow-sm mb-6">
        <!-- 수량 선택 및 액션 -->
        <div class="border-t border-gray-200 p-4">
          ${this.#ProductInfo({image:t,title:n,description:r,rating:i,reviewCount:a,lprice:o,stock:s})}
          ${this.props.quantityInput}
          <!-- 액션 버튼 -->
          ${this.props.addToCartBtn}
        </div>
      </div>
      <div class="mb-6">
        <button
          class="block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-md 
            hover:bg-gray-200 transition-colors go-to-product-list"
        >
          상품 목록으로 돌아가기
        </button>
      </div>
      ${e.length>0?y` <div class="bg-white rounded-lg shadow-sm">
            <div class="p-4 border-b border-gray-200">
              <h2 class="text-lg font-bold text-gray-900">관련 상품</h2>
              <p class="text-sm text-gray-600">같은 카테고리의 다른 상품들</p>
            </div>
            <div class="p-4">
              <div class="grid grid-cols-2 gap-3 responsive-grid">
                ${e.filter(e=>e.productId!==c).map(this.#ProductCard).join(``)}
              </div>
            </div>
          </div>`:``}`}setEvent(){this.addEvent(`click`,`.go-to-product-list`,()=>{o.push({pathname:`/`})}),this.addEvent(`click`,`.related-product-card`,(e,{dataset:{productId:t}})=>{o.push({pathname:`/product/${t}`})})}#ProductCard({productId:e,image:t,title:n,lprice:r}){return y`
      <div class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer" data-product-id="${e}">
        <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
          <img src="${t}" alt="${n}" class="w-full h-full object-cover" loading="lazy" />
        </div>
        <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">${n}</h3>
        <p class="text-sm font-bold text-blue-600">${N(r)}원</p>
      </div>
    `}#ProductInfo({image:e,title:t,description:n,rating:r,reviewCount:i,lprice:a,stock:o}){return y`<div class="p-4">
      ${this.#ProductImage({image:e,title:t})}
      <!-- 상품 정보 -->
      <div>
        <p class="text-sm text-gray-600 mb-1"></p>
        ${this.#ProductTitle({title:t})}
        <!-- 평점 및 리뷰 -->
        ${this.#ProductReview({rating:r,reviewCount:i})}
        <!-- 가격 -->
        <div class="mb-4">
          <span class="text-2xl font-bold text-blue-600">${N(a)}원</span>
        </div>
        <!-- 재고 -->
        <div class="text-sm text-gray-600 mb-4">재고 ${(+o).toLocaleString()}개</div>
        <!-- 설명 -->
        ${this.#ProductDescription({description:n})}
      </div>
    </div>`}#ProductImage({image:e,title:t}){return y`<div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
      <img src="${e}" alt="${t}" class="w-full h-full object-cover product-detail-image" />
    </div>`}#ProductDescription({description:e}){return y`<div class="text-sm text-gray-700 leading-relaxed mb-6">${e}</div>`}#ProductTitle({title:e}){return y` <h1 class="text-xl font-bold text-gray-900 mb-3">${e}</h1>`}#ProductReview({rating:e,reviewCount:t}){return y`<div class="flex items-center mb-3">
      <div class="flex items-center">${this.#RatingStars({rating:e})}</div>
      <span class="ml-2 text-sm text-gray-600"
        >${this.#ratingFormat(e)} (${(+t).toLocaleString()}개 리뷰)</span
      >
    </div>`}#ratingFormat(e){return Intl.NumberFormat(`ko-KR`,{maximumFractionDigits:1,minimumFractionDigits:1}).format(e)}#RatingStars({rating:e}){let t=5;return Array.from({length:t},(t,n)=>{let r=n+1<=e?`text-yellow-400`:`text-gray-300`;return y`<svg class="w-4 h-4 ${r}" fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        ></path>
      </svg>`}).join(``)}};async function B(e={}){let{limit:t=20,search:n=``,category1:r=``,category2:i=``,sort:a=`price_asc`}=e,o=e.current??e.page??1,s=new URLSearchParams({page:o.toString(),limit:t.toString(),...n&&{search:n},...r&&{category1:r},...i&&{category2:i},sort:a}),c=await fetch(`/api/products?${s}`);return await c.json()}async function V(e){let t=await fetch(`/api/products/${e}`);return await t.json()}async function H(){let e=await fetch(`/api/categories`);return await e.json()}const U={title:``,image:``,lprice:``,hprice:``,productId:``,category1:``,category2:``,description:``,rating:0,reviewCount:0,stock:0,isLoading:!0},W={productId:``,quantity:1,product:U,relatedProducts:[]},G=()=>{let e=_({...W,initSearchParams(){e.clear();let{productId:t}=o.getParams();e.productId=t},clear(){for(let[t,n]of Object.entries(W))e[t]=n},setQuantity(t){e.quantity=t},async loadProduct(){let t=await V(e.productId);e.product={...t,isLoading:!1},e.loadRelatedProducts({category1:t.category1,category2:t.category2})},async loadRelatedProducts({category1:t,category2:n}){let r={page:1,limit:20,search:``,sort:`price_asc`},i=await B({...r,category1:t,category2:n});e.relatedProducts=i.products}});return e};function K(e){j.init();let t=G();t.initSearchParams(),t.loadProduct();let n=new F({header:new M({nav:new q}),main:new z({productDetailStore:t}),footer:new b});return document.querySelector(e).innerHTML=y`${n}`,n.setup(),()=>{n.dispose()}}var q=class extends v{renderContainer(){return y` <div ${this.dataAttribute.attribute} class="flex items-center space-x-3">
      <button onclick="window.history.back()" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <h1 class="text-lg font-bold text-gray-900">상품 상세</h1>
    </div>`}},J=class extends v{renderContainer(){let{categories:e,category1:t,category2:n}=this.props.productsStore;return!t&&!n?y`<div ${this.dataAttribute.attribute} class="space-y-2">
        ${this.#renderAllCategories({isLoading:!e})}
      </div>`:y`<div ${this.dataAttribute.attribute} class="space-y-2">
      ${this.renderBreadcrumb({category1:t,category2:n})} ${this.renderCategories({categories:e,category1:t,category2:n})}
    </div>`}render(){this.$el.innerHTML=this.renderContainer()}setEvent(){this.addEvent(`click`,`[data-category1]`,(e,t)=>{this.props.productsStore.setCategories({category1:t.dataset.category1,category2:``})}),this.addEvent(`click`,`[data-category2]`,(e,t)=>{this.props.productsStore.setCategories({category1:this.props.productsStore.category1,category2:t.dataset.category2})}),this.addEvent(`click`,`[data-breadcrumb]`,()=>{this.props.productsStore.resetCategories()})}#renderAllCategories({isLoading:e}){return e?y`
        <div class="flex items-center gap-2">
          <label class="text-sm text-gray-600">카테고리:</label>
          <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>
        </div>

        <!-- 1depth 카테고리 -->

        <div class="text-sm text-gray-500 italic">카테고리 로딩 중...</div>

        <!-- 2depth 카테고리 -->
      `:y`
      <div class="flex items-center gap-2">
        <label class="text-sm text-gray-600">카테고리:</label>
        <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>
      </div>

      <!-- 1depth 카테고리 -->

      <div class="flex flex-wrap gap-2">
        <button
          data-category1="생활/건강"
          class="category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors
                 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          생활/건강
        </button>

        <button
          data-category1="디지털/가전"
          class="category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors
                 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          디지털/가전
        </button>
      </div>

      <!-- 2depth 카테고리 -->
    `}renderBreadcrumb({category1:e,category2:t}){return y`
      <div class="flex items-center gap-2">
        <label class="text-sm text-gray-600">카테고리:</label>
        <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>
        ${e?y`<span class="text-xs text-gray-500">&gt;</span>
              <button
                data-breadcrumb="category1"
                data-category1="${e}"
                class="text-xs hover:text-blue-800 hover:underline"
              >
                ${e}
              </button>`:``}
        ${t?y`<span class="text-xs text-gray-500">&gt;</span>
              <span class="text-xs text-gray-600 cursor-default">${t}</span>`:``}
      </div>
    `}renderCategories({categories:e,category1:t,category2:n}){if(!e)return y`<div class="text-sm text-gray-500 italic">카테고리 로딩 중...</div>`;let r=Object.keys(e[t]??e),i=t?`data-category2`:`data-category1`;return y`<div class="space-y-2">
      <div class="flex flex-wrap gap-2">
        ${r.map(e=>{let r=e===(n??t)?`category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-blue-100 border-blue-300 text-blue-800`:`category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50`;return y`<button ${i}="${e}" class="${r}">${e}</button>`}).join(``)}
      </div>
    </div>`}},Y=class extends v{renderContainer(){return y` <div ${this.dataAttribute.attribute} class="mb-4">
      <div class="relative">
        <input
          type="text"
          id="search-input"
          placeholder="상품명을 검색해보세요..."
          value="${this.props.productsStore.search}"
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>
    </div>`}setEvent(){this.addEvent(`keydown`,`#search-input`,e=>{e.key===`Enter`&&this.props.productsStore.setSearch(e.target.value)})}},X=class extends v{renderContainer(){return y`<div ${this.dataAttribute.attribute} class="flex items-center gap-2">
      <label class="text-sm text-gray-600">${this.props.label}:</label>
      ${this.select({initValue:this.props.initValue(),options:this.props.options})}
    </div>`}render(){this.$el.querySelector(`#${this.props.id}`).value=this.props.initValue()}select({initValue:e,options:t}){return y`<select
      id="${this.props.id}"
      class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
    >
      ${t.map(({value:t,name:n})=>this.option({value:t,name:n,selected:t===e})).join(``)}
    </select>`}option({value:e,name:t,selected:n}){return y`<option value="${e}" ${n?`selected`:``}>${t}</option>`}setEvent(){this.addEvent(`change`,`select`,e=>{let t=e.target.value;e.target.value=this.props.initValue(),this.props.setValue(t)})}},Z=class extends X{constructor(e){super({...e,id:`limit-select`,label:`개수`,options:[10,20,50,100].map(e=>({value:e,name:`${e}개`})),initValue:()=>this.props.productsStore.limit,setValue:e=>this.props.productsStore.setLimit(e)})}},ne=class extends X{constructor(e){super({...e,id:`sort-select`,label:`정렬`,options:[{value:`price_asc`,name:`가격 낮은순`},{value:`price_desc`,name:`가격 높은순`},{value:`name_asc`,name:`이름순`},{value:`name_desc`,name:`이름 역순`}],initValue:()=>this.props.productsStore.sort,setValue:e=>this.props.productsStore.setSort(e)})}},re=class extends v{search=new Y(this.props);breadcrumb=new J(this.props);limitSelect=new Z(this.props);sortSelect=new ne(this.props);renderContainer(){return y`<div
      ${this.dataAttribute.attribute}
      class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4"
    >
      <!-- 검색창 -->
      ${this.search}
      <!-- 필터 옵션 -->
      <div class="space-y-3">
        <!-- 카테고리 필터 -->
        ${this.breadcrumb}
        <!-- 기존 필터들 -->
        <div class="flex gap-2 items-center justify-between">
          <!-- 페이지당 상품 수 -->
          ${this.limitSelect}
          <!-- 정렬 -->
          ${this.sortSelect}
        </div>
      </div>
    </div>`}},ie=class extends v{#productsGridId=`products-grid`;#moreStatusId=`more-status`;#intersectionObserver=null;#producrCardSkeletonRepeatCount=4;renderContainer(){let{isLoading:e,hasNext:t}=this.props.productsStore;return y`<div ${this.dataAttribute.attribute} class="mb-6">
      <!-- 상품 그리드 -->
      <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid"></div>
      ${this.#moreStatus({isLoading:e,hasNext:t})}
    </div>`}render(){let{limit:e,data:t}=this.props.productsStore,{page:n,total:r,products:i,currentPageProducts:a,isLoading:o,hasNext:s,isFetching:c}=t;if(o)this.$el.innerHTML=y`<!-- 상품 그리드 -->
        <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid"></div>
        ${this.#moreStatus({isLoading:o,hasNext:s})}`;else if(n===1){let t=this.#ensureProductsCount({total:r,limit:e,page:n,products:i});this.#renderFirstPage({total:r,currentPageProducts:t,isLoading:o,hasNext:s})}else this.#appendProducts({currentPageProducts:a}),this.#updateHasMoreStatus({hasNext:s});this.#setIntersectionObserver({isLoading:o,hasNext:s,isFetching:c})}setEvent(){this.addEvent(`click`,`button[data-product-id]`,(e,t)=>{let{productId:n}=t.dataset,r=this.props.productsStore.data.products.find(e=>e.productId===n);if(!r)throw Error(`${n} is not in products`);j.addItem(r)}),this.addEvent(`click`,`div[data-product-id]`,(e,t)=>{let{productId:n}=t.dataset;o.push({pathname:`/product/${n}`})})}#ensureProductsCount({total:e,limit:t,page:n,products:r}){let i=Math.min(t*+n,e);if(r.length>i)return r.slice(0,i);let a=Array.from({length:i-r.length},()=>null);return[...r,...a]}#total({total:e}){return e==null?``:y`<div class="mb-4 text-sm text-gray-600">
      총 <span class="font-medium text-gray-900">${e}개</span>의 상품
    </div>`}#renderFirstPage({total:e,currentPageProducts:t,isLoading:n,hasNext:r}){this.$el.innerHTML=y`<div ${this.dataAttribute.attribute} class="mb-6">
      <div ${this.dataAttribute.attribute}>
        <!-- 상품 개수 정보 -->
        ${this.#total({total:e})}
        <!-- 상품 그리드 -->
        <div class="grid grid-cols-2 gap-4 mb-6" id="${this.#productsGridId}">
          ${t.map(e=>e?this.#productCard(e):this.#producrCardSkeleton()).join(``)}
        </div>
        ${this.#moreStatus({isLoading:n,hasNext:r})}
      </div>
    </div>`}#appendProducts({currentPageProducts:e}){this.$el.querySelector(`#${this.#productsGridId}`).innerHTML+=e.map(e=>this.#productCard(e)).join(``)}#setIntersectionObserver({isLoading:e,hasNext:t,isFetching:n}){this.#intersectionObserver&&this.#intersectionObserver.disconnect(),this.#intersectionObserver=new IntersectionObserver(r=>{r.forEach(r=>{r.isIntersecting&&!e&&t&&!n&&this.props.productsStore.loadNextPage()})});let r=this.$el.querySelector(`#${this.#moreStatusId}`);r&&this.#intersectionObserver.observe(r)}#updateHasMoreStatus({hasNext:e}){e||(this.$el.querySelector(`#${this.#moreStatusId}`).innerHTML=this.#noMoreStatus())}#noMoreStatus(){return y`<div class="text-center py-4 text-sm text-gray-500">모든 상품을 확인했습니다</div>`}#hasMoreStatus(){return y`<div id="${this.#moreStatusId}">
      <div class="grid grid-cols-2 gap-4 mb-6">
        ${this.#producrCardSkeleton().repeat(this.#producrCardSkeletonRepeatCount)}
      </div>
      <div class="text-center py-4">
        <div class="inline-flex items-center">
          <svg class="animate-spin h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span class="text-sm text-gray-600">상품을 불러오는 중...</span>
        </div>
      </div>
    </div> `}#moreStatus({isLoading:e,hasNext:t}){return e||t?this.#hasMoreStatus():this.#noMoreStatus()}#productCard({productId:e,image:t,lprice:n,title:r,brand:i}){return y`<div
      class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden product-card"
      data-product-id="${e}"
    >
      <!-- 상품 이미지 -->
      <div class="aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image">
        <img
          src="${t}"
          alt="${r}"
          class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
      </div>
      <!-- 상품 정보 -->
      <div class="p-3">
        <div class="cursor-pointer product-info mb-3">
          <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">${r}</h3>
          <p class="text-xs text-gray-500 mb-2">${i}</p>
          <p class="text-lg font-bold text-gray-900">${N(n)}원</p>
        </div>
        <!-- 장바구니 버튼 -->
        <button
          class="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md
                         hover:bg-blue-700 transition-colors add-to-cart-btn"
          data-product-id="${e}"
        >
          장바구니 담기
        </button>
      </div>
    </div>`}#producrCardSkeleton(){return y`<div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      <div class="aspect-square bg-gray-200"></div>
      <div class="p-3">
        <div class="h-4 bg-gray-200 rounded mb-2"></div>
        <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div class="h-8 bg-gray-200 rounded"></div>
      </div>
    </div>`}};const Q={limit:20,search:``,category1:``,category2:``,sort:`price_asc`,page:1},ae={isLoading:!0,isFetching:!1,products:[],currentPageProducts:[],page:null,total:null,hasNext:!0},oe=null,$=()=>{let e=_({...Q,data:ae,categories:oe,getParams(){return{limit:e.limit,search:e.search,category1:e.category1,category2:e.category2,sort:e.sort,page:e.page}},initSearchParams(){let t={...Q,...o.getParams(),page:Q.page};for(let[n,r]of Object.entries(t))e[n]=r},updateParams(e,t){let n=o.getParams();n[e]=t;let r={};for(let[e,t]of Object.entries(n))t&&(r[e]=t);o.updateParams(r)},setParams(t){for(let[n,r]of Object.entries(t))e[n]=r},setLimit(t){e.loadProducts({limit:t}),e.updateParams(`limit`,t)},setSearch(t){e.loadProducts({search:t}),e.updateParams(`search`,t)},resetCategories(){e.loadProducts({category1:``,category2:``}),e.updateParams(`category1`,``),e.updateParams(`category2`,``)},setCategories({category1:t,category2:n}){e.loadProducts({category1:t,category2:n}),e.updateParams(`category1`,t),e.updateParams(`category2`,n)},setSort(t){e.loadProducts({sort:t}),e.updateParams(`sort`,t)},setData(t){e.data={isLoading:!1,isFetching:!1,products:t.pagination.page===1?t.products:[...e.data.products,...t.products],currentPageProducts:t.products,page:t.pagination.page,total:t.pagination.total,hasNext:t.pagination.hasNext}},async loadProducts(t={}){let n=await e.fetchProducts({...e.getParams(),...t,page:1});e.setData(n),e.setParams({...t,page:1})},async loadNextPage(){let t=await e.fetchProducts({...e.getParams(),page:e.data.page+1});e.setData(t),e.setParams({page:e.data.page+1})},async fetchProducts(t){e.isFetching=!0;let n=await B(t);return n},async loadCategories(){e.categories=await H()}});return e};function se(e){j.init();let t=$();t.initSearchParams(),t.loadCategories().then(()=>{t.loadProducts()});let n=new F({header:new M({nav:new ce}),main:new le({filters:new re({productsStore:t}),products:new ie({productsStore:t})}),footer:new b});return document.querySelector(e).innerHTML=y`${n}`,n.setup(),()=>{n.dispose()}}var ce=class extends v{renderContainer(){return y`<h1 ${this.dataAttribute.attribute} class="text-xl font-bold text-gray-900">
      <a href="/" data-link="">쇼핑몰</a>
    </h1>`}},le=class extends v{renderContainer(){return y`<main ${this.dataAttribute.attribute} class="max-w-md mx-auto px-4 py-4">
      ${this.props.filters} ${this.props.products}
    </main>`}};const ue=()=>r(async()=>{let{worker:e,workerOptions:t}=await import(`./browser-EepaDAeu.js`);return{worker:e,workerOptions:t}},[]).then(({worker:e,workerOptions:t})=>e.start(t));function de(){o.addPage(`/`,se).addPage(`/product/:productId`,K).init({_404:ee})}ue().then(de);