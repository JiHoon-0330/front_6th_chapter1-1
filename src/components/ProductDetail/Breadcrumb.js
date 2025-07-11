import { Component } from "../../core/Component";
import { router } from "../../core/router";
import { html } from "../../utils/html";

export class Breadcrumb extends Component {
  renderContainer() {
    const {
      product: { category1, category2 },
    } = this.props.productDetailStore;
    return html`<nav ${this.dataAttribute.attribute} class="mb-4">
      <div class="flex items-center space-x-2 text-sm text-gray-600">
        <a href="/" data-link="" class="hover:text-blue-600 transition-colors">홈</a>
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
        <button class="breadcrumb-link" data-category1="${category1}">${category1}</button>
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
        <button class="breadcrumb-link" data-category2="${category2}">${category2}</button>
      </div>
    </nav>`;
  }

  setEvent() {
    this.addEvent("click", "[data-category1]", () => {
      const { category1, category2 } = this.props.productDetailStore.product;
      router.push({
        pathname: "/",
        params: { category1, category2 },
      });
    });

    this.addEvent("click", "[data-category2]", () => {
      const { category1, category2 } = this.props.productDetailStore.product;
      router.push({
        pathname: "/",
        params: { category1, category2 },
      });
    });
  }
}
