import { Component } from "../../core/Component";
import { cartStore } from "../../store/cart";
import { html } from "../../utils/html";

export class AddToCartButton extends Component {
  renderContainer() {
    return html`<button
      ${this.dataAttribute.attribute}
      id="add-to-cart-btn"
      data-product-id="${this.props.productDetailStore.product.productId}"
      class="w-full bg-blue-600 text-white py-3 px-4 rounded-md 
                 hover:bg-blue-700 transition-colors font-medium"
    >
      장바구니 담기
    </button>`;
  }

  setEvent() {
    this.addEvent("click", "#add-to-cart-btn", () => {
      const $quantityInput = document.querySelector("#quantity-input");
      const quantity = $quantityInput.valueAsNumber;
      const { image, title, lprice, productId } = this.props.productDetailStore.product;

      cartStore.addItem({
        productId,
        lprice,
        image,
        title,
        quantity,
        selected: true,
      });
    });
  }
}
