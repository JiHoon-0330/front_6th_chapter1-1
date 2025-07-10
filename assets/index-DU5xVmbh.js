(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e){if(t.type!==`childList`)continue;for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();const e=`modulepreload`,t=function(e){return`/front_6th_chapter1-1/`+e},n={},r=function(r,i,a){let o=Promise.resolve();if(i&&i.length>0){let r=document.getElementsByTagName(`link`),s=document.querySelector(`meta[property=csp-nonce]`),c=s?.nonce||s?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}o=l(i.map(i=>{if(i=t(i,a),i in n)return;n[i]=!0;let o=i.endsWith(`.css`),s=o?`[rel="stylesheet"]`:``,l=!!a;if(l)for(let e=r.length-1;e>=0;e--){let t=r[e];if(t.href===i&&(!o||t.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${i}"]${s}`))return;let u=document.createElement(`link`);if(u.rel=o?`stylesheet`:e,o||(u.as=`script`),u.crossOrigin=``,u.href=i,c&&u.setAttribute(`nonce`,c),document.head.appendChild(u),o)return new Promise((e,t)=>{u.addEventListener(`load`,e),u.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${i}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(e=>{for(let t of e||[]){if(t.status!==`rejected`)continue;s(t.reason)}return r().catch(s)})},i=`/front_6th_chapter1-1`;var a=class{#pagesMap=new Map;#pageDispose;#currentParams;#root=`#root`;addPage(e,t){return this.#pagesMap.set(this.#ensureBasePath(e),t),this}init({_404:e=null}={}){this._404=e,this.#setEvents();let t=this.#getSearchParams();this.#navigateTo({pathname:window.location.pathname,params:t})}push({pathname:e=location.pathname,params:t={}}={}){this.#updateUrl({type:`pushState`,pathname:e,params:t}),this.#navigateTo({pathname:e,params:t})}replace({pathname:e=location.pathname,params:t={}}={}){this.#updateUrl({type:`replaceState`,pathname:e,params:t}),this.#navigateTo({pathname:e,params:t})}updateParams(e){this.#updateUrl({type:`replaceState`,pathname:location.pathname,params:e})}getParams(){return this.#currentParams}#ensureBasePath(e){let t=e.startsWith(i)?e.replace(i,``):e;return t===`/`?i:i+t}#setEvents(){window.addEventListener(`popstate`,()=>{let e=this.#getSearchParams();this.#navigateTo(location.pathname,e)})}#getSearchParams(){return Object.fromEntries(new URLSearchParams(location.search))}#navigateTo({pathname:e=location.pathname,params:t={}}={}){e=this.#ensureBasePath(e),this.#pageDispose&&this.#pageDispose(),this.#currentParams=t;let n=this.#matchPage({pathname:e,params:t});n?this.#pageDispose=n(this.#root):this.#pageDispose=this._404(this.#root)}#matchPage({pathname:e=location.pathname,params:t={}}={}){if(this.#pagesMap.has(e))return this.#pagesMap.get(e);let n=e.split(`/`);for(let[e,r]of this.#pagesMap.entries()){let i=e.split(`/`);if(i.length!==n.length)continue;let a=!0;for(let e=0;e<i.length;e++){if(i[e].startsWith(`:`)){this.#currentParams={...this.#currentParams,[i[e].slice(1)]:n[e]};continue}if(i[e]!==n[e]){a=!1;break}}if(a)return this.#currentParams={...this.#currentParams,...t},r}return null}#updateUrl({type:e=`pushState`,pathname:t=location.pathname.replace(i,``),params:n={}}={}){t=this.#ensureBasePath(t);let r=new URL(t,location.origin);Object.entries(n).forEach(([e,t])=>{r.searchParams.set(e,t)}),window.history[e]({},``,r)}};const o=new a;function s(e){return typeof e!=`string`||e.length===0?``:e.replace(/([A-Z])/g,`-$1`).toLowerCase().replace(/^-/,``)}function c(e){let t=`data-component`,n=`${t}="${s(e)}"`;return{attribute:n,selector:`[${n}]`}}let l=null;const u=new Map,d=(e,t)=>{l={componentId:e,fn:t};try{t()}finally{l=null}return()=>{let t=u.get(e);if(t){for(let[n,r]of t)if(n?._observerMaps?.[r]){let t=n._observerMaps[r];t.forEach(n=>{n.componentId===e&&t.delete(n)})}u.delete(e)}l?.fn?.cancel()}},f=e=>{let t={},n=new Proxy(e,{get(e,r){if(t[r]??=new Set,l){let{componentId:e,fn:i}=l;t[r].add({componentId:e,fn:i});let a=u.get(e);a||(a=new Set,u.set(e,a)),a.add([n,r])}return e[r]},set(e,n,r){let i=e[n],a=r;return i===a?!0:(e[n]=r,t[n]?.forEach(({fn:e})=>e()),!0)}});return n._observerMaps=t,n};var p=class e{state;props;$el;#disposeObserve;constructor(e){this.props=e,this.id=`${this.constructor.name}-component-${window.crypto.randomUUID()}`,this.dataAttribute=c(this.id),this.abortController=null}setup(){this.state=f(this.initState()),this.#disposeObserve=d(this.id,()=>{this.mounted(),this.setEvent(),this.render()}),this.#getComponentInstance().forEach(e=>e.setup())}initState(){return{}}renderContainer(){}render(){}setEvent(){this.abortController&&this.abortController.abort(),this.abortController=new AbortController}addEvent(e,t){this.$el.addEventListener(e,t,this.abortController)}mounted(){this.$el=document.querySelector(this.dataAttribute.selector),this.$el}dispose(){this.#disposeObserve&&this.#disposeObserve(),this.#getComponentInstance().forEach(e=>e.dispose())}#getComponentInstance(){let t=Object.values(this).filter(t=>t instanceof e),n=Object.values(this.props??{}).filter(t=>t instanceof e);return[...t,...n]}};function m(e,...t){let n=[];for(let r=0;r<e.length;r++)if(n.push(e[r]),r<t.length){let e=t[r];n.push(e instanceof p?e.renderContainer():e)}return n.join(``)}var h=class extends p{renderContainer(){return m`<footer ${this.dataAttribute.attribute} class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-md mx-auto py-8 text-center text-gray-500">
        <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
      </div>
    </footer>`}},g=class{constructor(e,t=window.localStorage){this.storage=t,this.key=e}getItem(e){try{let t=JSON.parse(this.storage.getItem(this.key));return e?t[e]:t}catch(e){return console.error(e),null}}setItem(e,t){this.storage.setItem(e,JSON.stringify(t))}removeItem(e){this.storage.removeItem(e)}};const _=`.toast-container`;y.info=e=>y(`info`,e),y.success=e=>y(`success`,e),y.error=e=>y(`error`,e);function v(e){return{info:{style:`bg-blue-600`},success:{style:`bg-green-600`},error:{style:`bg-red-600`}}[e]}function y(e,t,n=3e3){let{style:r}=v(e),i=document.querySelector(_),a=null;i||(i=document.createElement(`div`),i.className=`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 ${_.slice(1)}`,a=new AbortController,i.addEventListener(`click`,e=>{let{target:t}=e,n=t.closest(`#toast-close-btn`);if(n){let e=n.dataset.toastId;b(e,s,a)}},a));let o=window.crypto.randomUUID(),s=setTimeout(()=>{b(o,s,a)},n);return i.innerHTML+=m`<div
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
  </div> `,x(i),()=>{s&&b(o,s,a)}}function b(e,t,n){let r=document.querySelector(_),i=document.getElementById(e);i.remove(),r.childElementCount===0&&(r.remove(),n.abort()),t&&clearTimeout(t)}function x(e,t=`main`){let n=document.querySelector(t),r=n.parentNode;n.nextSibling?r.insertBefore(e,n.nextSibling):r.appendChild(e)}const S={open:!1,count:0,items:new Map},C=new g(`cart`);let w=null;const T=()=>{w=d(`cart`,()=>{let e={};Object.keys(S).forEach(t=>{E[t]instanceof Map?e[t]=[...E[t]]:e[t]=E[t]}),C.setItem(`cart`,e)})},E=f({...S,init(){let e={...S,...C.getItem()??{},open:!1};if(e)for(let[t,n]of Object.entries(S)){let r=e[t]??n;n instanceof Map?E[t]=new Map(r):E[t]=r}T()},openModal(){E.open=!0},closeModal(){E.open=!1},hasItem(e){return E.items.has(e)},addItem(e){if(y.success(`장바구니에 추가되었습니다`),E.hasItem(e.productId))E.addItemQuantity(e.productId,1);else{let{productId:t,lprice:n,image:r,title:i,quantity:a=1,selected:o=!0}=e,s={productId:t,lprice:n,image:r,title:i,selected:o,quantity:a};E.items.set(t,s),E.items=new Map([...E.items]),E.count=E.items.size}},getItem(e){return E.items.get(e)},addItemQuantity(e,t){if(!E.hasItem(e))throw Error(`${e} is not in cart`);let n=E.getItem(e);n.quantity=Math.max(n.quantity+t,1),E.items=new Map([...E.items])},updateItem(e,t,n){if(!E.hasItem(e))throw Error(`${e} is not in cart`);let r=E.getItem(e);r[t]=n,E.items=new Map([...E.items])},dispose(){w&&(w(),w=null)}});var D=class extends p{renderContainer(){return m` <header ${this.dataAttribute.attribute} class="bg-white shadow-sm sticky top-0 z-40">
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
              <span data-id="cart-count">${this.#CartCount()}</span>
            </button>
          </div>
        </div>
      </div>
    </header>`}render(){this.$el.querySelector(`[data-id="cart-count"]`).innerHTML=this.#CartCount()}setEvent(){super.setEvent(),this.addEvent(`click`,e=>{let{target:t}=e;t.closest(`#cart-icon-btn`)&&E.openModal()})}#CartCount(){let{count:e}=E;return e>0?m`<span
          class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
        >
          ${e}
        </span>`:``}},O=class extends p{renderContainer(){return m`<div
      ${this.dataAttribute.attribute}
      class="hidden fixed inset-0 z-50 overflow-y-auto cart-modal"
    ></div>`}render(){let{count:e,items:t}=E;E.open?(this.$el.classList.remove(`hidden`),this.$el.innerHTML=this.#CartList({count:e,items:t})):(this.$el.classList.add(`hidden`),this.$el.innerHTML=``)}setEvent(){super.setEvent(),this.addEvent(`click`,e=>{let{target:t}=e;if(t.closest(`#cart-modal-close-btn`)||t.closest(`.cart-modal-overlay`)){E.closeModal();return}let n=t.closest(`.quantity-increase-btn`),r=t.closest(`.quantity-decrease-btn`);if(n||r){let e=this.$el.querySelector(`.quantity-input`),t=n?1:-1,r=Math.max(e.valueAsNumber+t,1);e.value=r;let i=e.dataset.productId;E.updateItem(i,`quantity`,r);return}}),document.addEventListener(`keydown`,e=>{if(e.key===`Escape`){E.closeModal();return}},this.abortController)}#CartList({count:e,items:t}){let n=0,r=Array.from(t.values());return m`
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
              장바구니 ${e?m`<span class="text-sm font-normal text-gray-600 ml-1">(${e})</span>`:``}
            </h2>

            <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- 컨텐츠 -->
          <div class="flex flex-col max-h-[calc(90vh-120px)]">
            ${e?m`<!-- 전체 선택 섹션 -->
                  <div class="p-4 border-b border-gray-200 bg-gray-50">
                    <label class="flex items-center text-sm text-gray-700">
                      <input
                        type="checkbox"
                        id="cart-modal-select-all-checkbox"
                        class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
                      />
                      전체선택 (${e}개)
                    </label>
                  </div>
                  <!-- 아이템 목록 -->
                  <div class="flex-1 overflow-y-auto">
                    <div class="p-4 space-y-4">${r.map(this.#CartItem).join(``)}</div>
                  </div>
                  <!-- 하단 액션 -->
                  <div class="sticky bottom-0 bg-white border-t border-gray-200 p-4">
                    <!-- 선택된 아이템 정보 -->
                    <!-- 총 금액 -->
                    <div class="flex justify-between items-center mb-4">
                      <span class="text-lg font-bold text-gray-900">총 금액</span>
                      <span class="text-xl font-bold text-blue-600">${n}원</span>
                    </div>
                    <!-- 액션 버튼들 -->
                    <div class="space-y-2">
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
                  </div>`:m`<!-- 빈 장바구니 -->
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
    `}#CartItem({productId:e,lprice:t,quantity:n,image:r,title:i,selected:a}){return m`<div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="${e}">
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
        <p class="text-sm text-gray-600 mt-1">${t}원</p>
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
        <p class="text-sm font-medium text-gray-900">${t*+n}원</p>
        <button
          class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800"
          data-product-id="${e}"
        >
          삭제
        </button>
      </div>
    </div>`}},k=class extends p{cartModal=new O;renderContainer(){let{header:e,main:t,footer:n}=this.props;return m`
      <div ${this.dataAttribute.attribute} class="min-h-screen bg-gray-50">
        ${e} ${t} ${this.cartModal} ${n}
      </div>
    `}};async function A(e={}){let{limit:t=20,search:n=``,category1:r=``,category2:i=``,sort:a=`price_asc`}=e,o=e.current??e.page??1,s=new URLSearchParams({page:o.toString(),limit:t.toString(),...n&&{search:n},...r&&{category1:r},...i&&{category2:i},sort:a}),c=await fetch(`/api/products?${s}`);return await c.json()}async function j(e){let t=await fetch(`/api/products/${e}`);return await t.json()}async function M(){let e=await fetch(`/api/categories`);return await e.json()}const N={isLoading:!0,title:``,image:``,lprice:``,hprice:``,productId:``,category1:``,category2:``,description:``,rating:0,reviewCount:0,stock:0,relatedProducts:[]},P=f({...N,initSearchParams(){P.clear();let e={...o.getParams()};for(let[t,n]of Object.entries(e))P[t]=n},clear(){for(let[e,t]of Object.entries(N))P[e]=t},async loadProduct(){let e=await j(P.productId);P.title=e.title,P.image=e.image,P.lprice=e.lprice,P.hprice=e.hprice,P.productId=e.productId,P.category1=e.category1,P.category2=e.category2,P.description=e.description,P.rating=e.rating,P.reviewCount=e.reviewCount,P.stock=e.stock,P.isLoading=!1},async loadRelatedProducts(){let e={page:1,limit:20,search:``,sort:`price_asc`},t=await A({...e,category1:P.category1,category2:P.category2});P.relatedProducts=t.products}});var F=class extends p{renderContainer(){return m`<main ${this.dataAttribute.attribute} class="max-w-md mx-auto px-4 py-4">
      <div class="py-20 bg-gray-50 flex items-center justify-center">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-600">상품 정보를 불러오는 중...</p>
        </div>
      </div>
    </main>`}render(){let{category1:e,category2:t,image:n,title:r,description:i,rating:a,reviewCount:o,lprice:s,stock:c,productId:l,relatedProducts:u}=P;this.$el.innerHTML=m`${this.#Breadcrumb({category1:e,category2:t})}
      <div class="bg-white rounded-lg shadow-sm mb-6">
        <!-- 수량 선택 및 액션 -->
        <div class="border-t border-gray-200 p-4">
          ${this.#ProductInfo({image:n,title:r,description:i,rating:a,reviewCount:o,lprice:s,stock:c})}
          ${this.#QuantityInput({stock:c})}
          <!-- 액션 버튼 -->
          ${this.#AddToCartButton({productId:l})}
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
      ${u.length>0?m` <div class="bg-white rounded-lg shadow-sm">
            <div class="p-4 border-b border-gray-200">
              <h2 class="text-lg font-bold text-gray-900">관련 상품</h2>
              <p class="text-sm text-gray-600">같은 카테고리의 다른 상품들</p>
            </div>
            <div class="p-4">
              <div class="grid grid-cols-2 gap-3 responsive-grid">
                ${u.filter(e=>e.productId!==l).map(this.#ProductCard).join(``)}
              </div>
            </div>
          </div>`:``}`}setEvent(){super.setEvent(),this.addEvent(`click`,e=>{let{target:t}=e,n=t.closest(`.go-to-product-list`);if(n){o.push({pathname:`/`});return}let r=t.closest(`.related-product-card`);if(r){o.push({pathname:`/product/${r.dataset.productId}`});return}let i=t.closest(`[data-category1]`);if(i){o.push({pathname:`/`,params:{category1:P.category1,category2:``}});return}let a=t.closest(`[data-category2]`);if(a){o.push({pathname:`/`,params:{category1:P.category1,category2:P.category2}});return}let s=t.closest(`#quantity-decrease`),c=t.closest(`#quantity-increase`),l=t.closest(`#add-to-cart-btn`),u=this.$el.querySelector(`#quantity-input`),d=u.valueAsNumber;if(s)u.value=this.#clamp(d-1,u.max);else if(c)u.value=this.#clamp(d+1,u.max);else if(l){let e=l.dataset.productId,t=P.relatedProducts.find(t=>t.productId===e);E.addItem({...t,quantity:d})}}),this.addEvent(`change`,e=>{let t=e.target.closest(`#quantity-input`);if(t){let e=t.valueAsNumber;t.value=this.#clamp(e,t.max)}})}#clamp(e,t){let n=1;return Math.max(n,Math.min(e,t))}#ProductCard({productId:e,image:t,title:n,lprice:r}){return m`
      <div class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer" data-product-id="${e}">
        <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
          <img src="${t}" alt="${n}" class="w-full h-full object-cover" loading="lazy" />
        </div>
        <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">${n}</h3>
        <p class="text-sm font-bold text-blue-600">${(+r).toLocaleString()}원</p>
      </div>
    `}#Breadcrumb({category1:e,category2:t}){return m`<nav ${this.dataAttribute.attribute} class="mb-4">
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
    </nav>`}#AddToCartButton({productId:e}){return m`<button
      id="add-to-cart-btn"
      data-product-id="${e}"
      class="w-full bg-blue-600 text-white py-3 px-4 rounded-md 
                 hover:bg-blue-700 transition-colors font-medium"
    >
      장바구니 담기
    </button>`}#QuantityInput({stock:e}){return m`<div class="flex items-center justify-between mb-4">
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
          value="1"
          min="1"
          max="${e}"
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
    </div>`}#ProductInfo({image:e,title:t,description:n,rating:r,reviewCount:i,lprice:a,stock:o}){return m`<div class="p-4">
      ${this.#ProductImage({image:e,title:t})}
      <!-- 상품 정보 -->
      <div>
        <p class="text-sm text-gray-600 mb-1"></p>
        ${this.#ProductTitle({title:t})}
        <!-- 평점 및 리뷰 -->
        ${this.#ProductReview({rating:r,reviewCount:i})}
        <!-- 가격 -->
        <div class="mb-4">
          <span class="text-2xl font-bold text-blue-600">${(+a).toLocaleString()}원</span>
        </div>
        <!-- 재고 -->
        <div class="text-sm text-gray-600 mb-4">재고 ${(+o).toLocaleString()}개</div>
        <!-- 설명 -->
        ${this.#ProductDescription({description:n})}
      </div>
    </div>`}#ProductImage({image:e,title:t}){return m`<div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
      <img src="${e}" alt="${t}" class="w-full h-full object-cover product-detail-image" />
    </div>`}#ProductDescription({description:e}){return m`<div class="text-sm text-gray-700 leading-relaxed mb-6">${e}</div>`}#ProductTitle({title:e}){return m` <h1 class="text-xl font-bold text-gray-900 mb-3">${e}</h1>`}#ProductReview({rating:e,reviewCount:t}){return m`<div class="flex items-center mb-3">
      <div class="flex items-center">${this.#RatingStars({rating:e})}</div>
      <span class="ml-2 text-sm text-gray-600"
        >${this.#ratingFormat(e)} (${(+t).toLocaleString()}개 리뷰)</span
      >
    </div>`}#ratingFormat(e){return Intl.NumberFormat(`ko-KR`,{maximumFractionDigits:1,minimumFractionDigits:1}).format(e)}#RatingStars({rating:e}){let t=5;return Array.from({length:t},(t,n)=>{let r=n+1<=e?`text-yellow-400`:`text-gray-300`;return m`<svg class="w-4 h-4 ${r}" fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        ></path>
      </svg>`}).join(``)}};function I(e){P.initSearchParams(),P.loadProduct().then(async()=>{await new Promise(e=>setTimeout(e,800)),P.loadRelatedProducts()});let t=new k({header:new D({nav:new L}),main:new F,footer:new h});return document.querySelector(e).innerHTML=m`${t}`,t.setup(),()=>{t.dispose()}}var L=class extends p{renderContainer(){return m` <div ${this.dataAttribute.attribute} class="flex items-center space-x-3">
      <button onclick="window.history.back()" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <h1 class="text-lg font-bold text-gray-900">상품 상세</h1>
    </div>`}};const R=1,z={limit:20,search:``,category1:``,category2:``,sort:`price_asc`},B=f({...z,isLoading:!0,isFetching:!1,products:[],currentPageProducts:[],categories:null,page:null,total:null,hasNext:null,getParams(){return{limit:B.limit,search:B.search,category1:B.category1,category2:B.category2,sort:B.sort,page:B.page}},initSearchParams(){let e={...z,...o.getParams()};e.page=R;for(let[t,n]of Object.entries(e))B[t]=n},updateParams(e,t){let n=o.getParams();n[e]=t,o.updateParams(n)},setLimit(e){B.limit=e,B.updateParams(`limit`,e),B.loadProducts()},setSearch(e){B.search=e,B.updateParams(`search`,e),B.loadProducts()},setCategory1(e){B.category1=e,B.updateParams(`category1`,e),B.loadProducts()},setCategory2(e){B.category2=e,B.updateParams(`category2`,e),B.loadProducts()},setSort(e){B.sort=e,B.updateParams(`sort`,e),B.loadProducts()},async loadProducts(){B.page=R;let e=await B.fetchProducts();B.products=e.products,B.isLoading=!1},async loadNextPage(){B.page+=1;let e=await B.fetchProducts();B.products=[...B.products,...e.products]},async fetchProducts(){B.isFetching=!0;let e=await A(B.getParams());return B.currentPageProducts=e.products,B.page=e.pagination.page,B.hasNext=e.pagination.hasNext,B.total=e.pagination.total,B.isFetching=!1,e},async loadCategories(){B.categories=await M()}});var V=class extends p{renderContainer(){let{categories:e,category1:t,category2:n}=B;return m`<div ${this.dataAttribute.attribute} class="space-y-2">
      ${this.renderBreadcrumb({category1:t,category2:n})} ${this.renderCategories({categories:e,category1:t,category2:n})}
    </div>`}render(){this.$el.innerHTML=this.renderContainer()}setEvent(){super.setEvent(),this.addEvent(`click`,({target:{dataset:e}})=>{`breadcrumb`in e?(B.setCategory1(``),B.setCategory2(``)):`category1`in e?(B.setCategory1(e.category1),B.setCategory2(``)):`category2`in e&&B.setCategory2(e.category2)})}renderBreadcrumb({category1:e,category2:t}){return m`
      <div class="flex items-center gap-2">
        <label class="text-sm text-gray-600">카테고리:</label>
        <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>
        ${e?m`<span class="text-xs text-gray-500">&gt;</span>
              <button
                data-breadcrumb="category1"
                data-category1="${e}"
                class="text-xs hover:text-blue-800 hover:underline"
              >
                ${e}
              </button>`:``}
        ${t?m`<span class="text-xs text-gray-500">&gt;</span>
              <span class="text-xs text-gray-600 cursor-default">${t}</span>`:``}
      </div>
    `}renderCategories({categories:e,category1:t,category2:n}){if(!e)return m`<div class="text-sm text-gray-500 italic">카테고리 로딩 중...</div>`;let r=Object.keys(e[t]??e),i=t?`data-category2`:`data-category1`;return m`<div class="space-y-2">
      <div class="flex flex-wrap gap-2">
        ${r.map(e=>{let r=e===(n??t)?`category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-blue-100 border-blue-300 text-blue-800`:`category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50`;return m`<button ${i}="${e}" class="${r}">${e}</button>`}).join(``)}
      </div>
    </div>`}},H=class extends p{inputId=`search-input`;renderContainer(){return m` <div ${this.dataAttribute.attribute} class="mb-4">
      <div class="relative">
        <input
          type="text"
          id="${this.inputId}"
          placeholder="상품명을 검색해보세요..."
          value="${B.search}"
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
    </div>`}setEvent(){super.setEvent(),this.addEvent(`keydown`,e=>{e.target.closest(`#${this.inputId}`)&&e.key===`Enter`&&B.setSearch(e.target.value)})}},U=class extends p{renderContainer(){return m`<div ${this.dataAttribute.attribute} class="flex items-center gap-2">
      <label class="text-sm text-gray-600">${this.props.label}:</label>
      ${this.select({initValue:this.props.initValue(),options:this.props.options})}
    </div>`}render(){this.$el.querySelector(`#${this.props.id}`).value=this.props.initValue()}select({initValue:e,options:t}){return m`<select
      id="${this.props.id}"
      class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
    >
      ${t.map(({value:t,name:n})=>this.option({value:t,name:n,selected:t===e})).join(``)}
    </select>`}option({value:e,name:t,selected:n}){return m`<option value="${e}" ${n?`selected`:``}>${t}</option>`}setEvent(){super.setEvent(),this.addEvent(`change`,e=>{e.target.closest(`select`)&&this.props.setValue(e.target.value)})}},W=class extends U{constructor(e){super({...e,id:`limit-select`,label:`개수`,options:[10,20,50,100].map(e=>({value:e,name:`${e}개`})),initValue:()=>B.limit,setValue:e=>B.setLimit(e)})}},G=class extends U{constructor(e){super({...e,id:`sort-select`,label:`정렬`,options:[{value:`price_asc`,name:`가격 낮은순`},{value:`price_desc`,name:`가격 높은순`},{value:`name_asc`,name:`이름순`},{value:`name_desc`,name:`이름 역순`}],initValue:()=>B.sort,setValue:e=>B.setSort(e)})}},K=class extends p{search=new H;breadcrumb=new V;limitSelect=new W;sortSelect=new G;renderContainer(){return m` <div
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
    </div>`}},q=class extends p{#productsGridId=`products-grid`;#moreStatusId=`more-status`;#intersectionObserver=null;#producrCardSkeletonRepeatCount=4;renderContainer(){let{isLoading:e,hasNext:t}=B;return m`<div ${this.dataAttribute.attribute} class="mb-6">
      <!-- 상품 그리드 -->
      <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
        ${this.#producrCardSkeleton(this.#producrCardSkeletonRepeatCount)}
      </div>
      ${this.#moreStatus({isLoading:e,hasNext:t})}
    </div>`}render(){let{limit:e,page:t,total:n,products:r,currentPageProducts:i,isLoading:a,hasNext:o,isFetching:s}=B;if(!a){if(t===1){let i=this.#ensureProductsCount({total:n,limit:e,page:t,products:r});this.#renderFirstPage({total:n,currentPageProducts:i,isLoading:a,hasNext:o})}else this.#appendProducts({currentPageProducts:i}),this.#updateHasMoreStatus({hasNext:o});this.#setIntersectionObserver({isLoading:a,hasNext:o,isFetching:s})}}setEvent(){super.setEvent(),this.addEvent(`click`,({target:e})=>{let t=e.closest(`button[data-product-id]`);if(t){let{productId:e}=t.dataset,n=B.products.find(t=>t.productId===e);if(!n)throw Error(`${e} is not in products`);E.addItem(n);return}let n=e.closest(`div[data-product-id]`);if(n){let{productId:e}=n.dataset;o.push({pathname:`/product/${e}`})}})}#ensureProductsCount({total:e,limit:t,page:n,products:r}){let i=Math.min(t*+n,e);if(r.length>i)return r.slice(0,i);let a=Array.from({length:i-r.length},()=>null);return[...r,...a]}#total({total:e}){return e==null?``:m`<div class="mb-4 text-sm text-gray-600">
      총 <span class="font-medium text-gray-900">${e}개</span>의 상품
    </div>`}#renderFirstPage({total:e,currentPageProducts:t,isLoading:n,hasNext:r}){this.$el.innerHTML=m`<div ${this.dataAttribute.attribute} class="mb-6">
      <div ${this.dataAttribute.attribute}>
        <!-- 상품 개수 정보 -->
        ${this.#total({total:e})}
        <!-- 상품 그리드 -->
        <div class="grid grid-cols-2 gap-4 mb-6" id="${this.#productsGridId}">
          ${t.map(e=>e?this.#productCard(e):this.#producrCardSkeleton()).join(``)}
        </div>
        ${this.#moreStatus({isLoading:n,hasNext:r})}
      </div>
    </div>`}#appendProducts({currentPageProducts:e}){this.$el.querySelector(`#${this.#productsGridId}`).innerHTML+=e.map(e=>this.#productCard(e)).join(``)}#setIntersectionObserver({isLoading:e,hasNext:t,isFetching:n}){this.#intersectionObserver&&this.#intersectionObserver.disconnect(),this.#intersectionObserver=new IntersectionObserver(r=>{r.forEach(r=>{r.isIntersecting&&!e&&t&&!n&&B.loadNextPage()})});let r=this.$el.querySelector(`#${this.#moreStatusId}`);r&&this.#intersectionObserver.observe(r)}#updateHasMoreStatus({hasNext:e}){e||(this.$el.querySelector(`#${this.#moreStatusId}`).innerHTML=this.#noMoreStatus())}#noMoreStatus(){return m`<div class="text-center py-4 text-sm text-gray-500">모든 상품을 확인했습니다</div>`}#hasMoreStatus(){return m`<div id="${this.#moreStatusId}">
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
    </div> `}#moreStatus({isLoading:e,hasNext:t}){return e||t?this.#hasMoreStatus():this.#noMoreStatus()}#productCard({productId:e,image:t,lprice:n,title:r}){return m`<div
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
          <p class="text-xs text-gray-500 mb-2"></p>
          <p class="text-lg font-bold text-gray-900">${n}원</p>
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
    </div>`}#producrCardSkeleton(){return m`<div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      <div class="aspect-square bg-gray-200"></div>
      <div class="p-3">
        <div class="h-4 bg-gray-200 rounded mb-2"></div>
        <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div class="h-8 bg-gray-200 rounded"></div>
      </div>
    </div>`}};function J(e){B.initSearchParams(),B.loadCategories().then(()=>{B.loadProducts()});let t=new k({header:new D({nav:new Y}),main:new X({filters:new K,products:new q}),footer:new h});return document.querySelector(e).innerHTML=m`${t}`,t.setup(),()=>{t.dispose()}}var Y=class extends p{renderContainer(){return m`<h1 ${this.dataAttribute.attribute} class="text-xl font-bold text-gray-900">
      <a href="/" data-link="">쇼핑몰</a>
    </h1>`}},X=class extends p{renderContainer(){return m`<main ${this.dataAttribute.attribute} class="max-w-md mx-auto px-4 py-4">
      ${this.props.filters} ${this.props.products}
    </main>`}};const Z=()=>r(async()=>{let{worker:e,workerOptions:t}=await import(`./browser-EepaDAeu.js`);return{worker:e,workerOptions:t}},[]).then(({worker:e,workerOptions:t})=>e.start(t));function Q(){E.init(),o.addPage(`/`,J).addPage(`/product/:productId`,I).init({_404:()=>{throw Error(`404`)}})}$();function $(){let e=`
    <div class="flex flex-col gap-2 items-center justify-center mx-auto" style="width: fit-content;">
      <div class="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <p class="text-sm font-medium">장바구니에 추가되었습니다</p>
        <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
         </svg>
        </div>
        <p class="text-sm font-medium">선택된 상품들이 삭제되었습니다</p>
        <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </div>
        <p class="text-sm font-medium">오류가 발생했습니다.</p>
        <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  `,t=`
    <div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4">
      <div class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden">
        <!-- 헤더 -->
        <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-900 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
            </svg>
            장바구니 
          </h2>
          
          <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- 컨텐츠 -->
        <div class="flex flex-col max-h-[calc(90vh-120px)]">
          <!-- 빈 장바구니 -->
          <div class="flex-1 flex items-center justify-center p-8">
            <div class="text-center">
              <div class="text-gray-400 mb-4">
                <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">장바구니가 비어있습니다</h3>
              <p class="text-gray-600">원하는 상품을 담아보세요!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,n=`
    <div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4">
      <div class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden">
        <!-- 헤더 -->
        <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-900 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
            </svg>
            장바구니
            <span class="text-sm font-normal text-gray-600 ml-1">(2)</span>
          </h2>
          <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <!-- 컨텐츠 -->
        <div class="flex flex-col max-h-[calc(90vh-120px)]">
          <!-- 전체 선택 섹션 -->
          <div class="p-4 border-b border-gray-200 bg-gray-50">
            <label class="flex items-center text-sm text-gray-700">
              <input type="checkbox" id="cart-modal-select-all-checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2">
              전체선택 (2개)
            </label>
          </div>
          <!-- 아이템 목록 -->
          <div class="flex-1 overflow-y-auto">
            <div class="p-4 space-y-4">
              <div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="85067212996">
                <!-- 선택 체크박스 -->
                <label class="flex items-center mr-3">
                  <input type="checkbox" class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded 
                focus:ring-blue-500" data-product-id="85067212996">
                </label>
                <!-- 상품 이미지 -->
                <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                  <img src="https://shopping-phinf.pstatic.net/main_8506721/85067212996.1.jpg" alt="PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장" class="w-full h-full object-cover cursor-pointer cart-item-image" data-product-id="85067212996">
                </div>
                <!-- 상품 정보 -->
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title" data-product-id="85067212996">
                    PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장
                  </h4>
                  <p class="text-sm text-gray-600 mt-1">
                    220원
                  </p>
                  <!-- 수량 조절 -->
                  <div class="flex items-center mt-2">
                    <button class="quantity-decrease-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100" data-product-id="85067212996">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                      </svg>
                    </button>
                    <input type="number" value="2" min="1" class="quantity-input w-12 h-7 text-center text-sm border-t border-b 
                border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" disabled="" data-product-id="85067212996">
                    <button class="quantity-increase-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100" data-product-id="85067212996">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <!-- 가격 및 삭제 -->
                <div class="text-right ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    440원
                  </p>
                  <button class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800" data-product-id="85067212996">
                    삭제
                  </button>
                </div>
              </div>
              <div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="86940857379">
                <!-- 선택 체크박스 -->
                <label class="flex items-center mr-3">
                  <input type="checkbox" class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded 
                focus:ring-blue-500" data-product-id="86940857379">
                </label>
                <!-- 상품 이미지 -->
                <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                  <img src="https://shopping-phinf.pstatic.net/main_8694085/86940857379.1.jpg" alt="샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이" class="w-full h-full object-cover cursor-pointer cart-item-image" data-product-id="86940857379">
                </div>
                <!-- 상품 정보 -->
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title" data-product-id="86940857379">
                    샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이
                  </h4>
                  <p class="text-sm text-gray-600 mt-1">
                    230원
                  </p>
                  <!-- 수량 조절 -->
                  <div class="flex items-center mt-2">
                    <button class="quantity-decrease-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100" data-product-id="86940857379">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                      </svg>
                    </button>
                    <input type="number" value="1" min="1" class="quantity-input w-12 h-7 text-center text-sm border-t border-b 
                border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" disabled="" data-product-id="86940857379">
                    <button class="quantity-increase-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100" data-product-id="86940857379">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <!-- 가격 및 삭제 -->
                <div class="text-right ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    230원
                  </p>
                  <button class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800" data-product-id="86940857379">
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 하단 액션 -->
        <div class="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <!-- 선택된 아이템 정보 -->
          <!-- 총 금액 -->
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-bold text-gray-900">총 금액</span>
            <span class="text-xl font-bold text-blue-600">670원</span>
          </div>
          <!-- 액션 버튼들 -->
          <div class="space-y-2">
            <div class="flex gap-2">
              <button id="cart-modal-clear-cart-btn" class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md 
                       hover:bg-gray-700 transition-colors text-sm">
                전체 비우기
              </button>
              <button id="cart-modal-checkout-btn" class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md 
                       hover:bg-blue-700 transition-colors text-sm">
                구매하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,r=`
    <div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4">
      <div class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden">
        <!-- 헤더 -->
        <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-900 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
            </svg>
            장바구니
            <span class="text-sm font-normal text-gray-600 ml-1">(2)</span>
          </h2>
          <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <!-- 컨텐츠 -->
        <div class="flex flex-col max-h-[calc(90vh-120px)]">
          <!-- 전체 선택 섹션 -->
          <div class="p-4 border-b border-gray-200 bg-gray-50">
            <label class="flex items-center text-sm text-gray-700">
              <input type="checkbox" id="cart-modal-select-all-checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2">
              전체선택 (2개)
            </label>
          </div>
          <!-- 아이템 목록 -->
          <div class="flex-1 overflow-y-auto">
            <div class="p-4 space-y-4">
              <div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="85067212996">
                <!-- 선택 체크박스 -->
                <label class="flex items-center mr-3">
                  <input type="checkbox" checked="" class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded 
                focus:ring-blue-500" data-product-id="85067212996">
                </label>
                <!-- 상품 이미지 -->
                <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                  <img src="https://shopping-phinf.pstatic.net/main_8506721/85067212996.1.jpg" alt="PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장" class="w-full h-full object-cover cursor-pointer cart-item-image" data-product-id="85067212996">
                </div>
                <!-- 상품 정보 -->
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title" data-product-id="85067212996">
                    PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장
                  </h4>
                  <p class="text-sm text-gray-600 mt-1">
                    220원
                  </p>
                  <!-- 수량 조절 -->
                  <div class="flex items-center mt-2">
                    <button class="quantity-decrease-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100" data-product-id="85067212996">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                      </svg>
                    </button>
                    <input type="number" value="2" min="1" class="quantity-input w-12 h-7 text-center text-sm border-t border-b 
                border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" disabled="" data-product-id="85067212996">
                    <button class="quantity-increase-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100" data-product-id="85067212996">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <!-- 가격 및 삭제 -->
                <div class="text-right ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    440원
                  </p>
                  <button class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800" data-product-id="85067212996">
                    삭제
                  </button>
                </div>
              </div>
              <div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="86940857379">
                <!-- 선택 체크박스 -->
                <label class="flex items-center mr-3">
                  <input type="checkbox" class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded 
                focus:ring-blue-500" data-product-id="86940857379">
                </label>
                <!-- 상품 이미지 -->
                <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                  <img src="https://shopping-phinf.pstatic.net/main_8694085/86940857379.1.jpg" alt="샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이" class="w-full h-full object-cover cursor-pointer cart-item-image" data-product-id="86940857379">
                </div>
                <!-- 상품 정보 -->
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title" data-product-id="86940857379">
                    샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이
                  </h4>
                  <p class="text-sm text-gray-600 mt-1">
                    230원
                  </p>
                  <!-- 수량 조절 -->
                  <div class="flex items-center mt-2">
                    <button class="quantity-decrease-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100" data-product-id="86940857379">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                      </svg>
                    </button>
                    <input type="number" value="1" min="1" class="quantity-input w-12 h-7 text-center text-sm border-t border-b 
                border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" disabled="" data-product-id="86940857379">
                    <button class="quantity-increase-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100" data-product-id="86940857379">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <!-- 가격 및 삭제 -->
                <div class="text-right ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    230원
                  </p>
                  <button class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800" data-product-id="86940857379">
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 하단 액션 -->
        <div class="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <!-- 선택된 아이템 정보 -->
          <div class="flex justify-between items-center mb-3 text-sm">
            <span class="text-gray-600">선택한 상품 (1개)</span>
            <span class="font-medium">440원</span>
          </div>
          <!-- 총 금액 -->
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-bold text-gray-900">총 금액</span>
            <span class="text-xl font-bold text-blue-600">670원</span>
          </div>
          <!-- 액션 버튼들 -->
          <div class="space-y-2">
            <button id="cart-modal-remove-selected-btn" class="w-full bg-red-600 text-white py-2 px-4 rounded-md 
                       hover:bg-red-700 transition-colors text-sm">
              선택한 상품 삭제 (1개)
            </button>
            <div class="flex gap-2">
              <button id="cart-modal-clear-cart-btn" class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md 
                       hover:bg-gray-700 transition-colors text-sm">
                전체 비우기
              </button>
              <button id="cart-modal-checkout-btn" class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md 
                       hover:bg-blue-700 transition-colors text-sm">
                구매하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,i=`
  <main class="max-w-md mx-auto px-4 py-4">
    <div class="text-center my-4 py-20 shadow-md p-6 bg-white rounded-lg">
    <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4285f4;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1a73e8;stop-opacity:1" />
        </linearGradient>
        <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="8" flood-color="#000000" flood-opacity="0.1"/>
        </filter>
      </defs>
      
      <!-- 404 Numbers -->
      <text x="160" y="85" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="48" font-weight="600" fill="url(#blueGradient)" text-anchor="middle">404</text>
      
      <!-- Icon decoration -->
      <circle cx="80" cy="60" r="3" fill="#e8f0fe" opacity="0.8"/>
      <circle cx="240" cy="60" r="3" fill="#e8f0fe" opacity="0.8"/>
      <circle cx="90" cy="45" r="2" fill="#4285f4" opacity="0.5"/>
      <circle cx="230" cy="45" r="2" fill="#4285f4" opacity="0.5"/>
      
      <!-- Message -->
      <text x="160" y="110" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="14" font-weight="400" fill="#5f6368" text-anchor="middle">페이지를 찾을 수 없습니다</text>
      
      <!-- Subtle bottom accent -->
      <rect x="130" y="130" width="60" height="2" rx="1" fill="url(#blueGradient)" opacity="0.3"/>
    </svg>
    
    <a href="/" data-link class="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">홈으로</a>
  </div>
  </main>
`;`${e}${t}${n}${r}${i}`}Z().then(Q);