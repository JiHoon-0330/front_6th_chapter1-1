import { router } from "./core/router.js";
import { _404Page } from "./pages/404.js";
import { ProductDetailPage } from "./pages/product-detail.js";
import { ProductsPage } from "./pages/products.js";

const enableMocking = () =>
  import("./mocks/browser.js").then(({ worker, workerOptions }) => worker.start(workerOptions));

function main() {
  router
    // 라우터 설정
    .addPage("/", ProductsPage)
    .addPage("/product/:productId", ProductDetailPage)
    .init({
      _404: _404Page,
    });
}

// 애플리케이션 시작
if (import.meta.env.MODE !== "test") {
  enableMocking().then(main);
} else {
  main();
}
