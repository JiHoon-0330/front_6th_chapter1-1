import { Component } from "../../core/Component";
import { html } from "../../utils/html";

export class QuantityInput extends Component {
  renderContainer() {
    const { quantity, product } = this.props.productDetailStore;
    return html`<div ${this.dataAttribute.attribute} class="flex items-center justify-between mb-4">
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
          value="${quantity}"
          min="1"
          max="${product.stock}"
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
    </div>`;
  }

  render() {
    const { quantity, product } = this.props.productDetailStore;
    this.$el.querySelector("#quantity-input").value = quantity;
    this.$el.querySelector("#quantity-input").max = product.stock;
  }

  setEvent() {
    this.addEvent("click", "#quantity-decrease", () => {
      const $quantityInput = this.$el.querySelector("#quantity-input");
      const nextQuantity = this.#clamp($quantityInput.valueAsNumber - 1, $quantityInput.max);
      $quantityInput.value = nextQuantity;
      this.props.productDetailStore.setQuantity(nextQuantity);
    });

    this.addEvent("click", "#quantity-increase", () => {
      const $quantityInput = this.$el.querySelector("#quantity-input");
      const nextQuantity = this.#clamp($quantityInput.valueAsNumber + 1, $quantityInput.max);
      $quantityInput.value = nextQuantity;
      this.props.productDetailStore.setQuantity(nextQuantity);
    });

    this.addEvent("change", "#quantity-input", (_, $closest) => {
      const quantity = $closest.valueAsNumber;
      $closest.value = this.#clamp(quantity, $closest.max);
    });
  }

  #clamp(value, max) {
    const MIN = 1;
    return Math.max(MIN, Math.min(value, max));
  }
}
