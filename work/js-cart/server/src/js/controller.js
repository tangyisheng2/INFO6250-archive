const react = require("./react.js");
const storage = require("./storage.js");
const controller = {
  initEventListener() {
    // eventListener for add item
    const catDiv = document.querySelector(".cat-div");
    catDiv.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.tagName == "A") {
        const cartItem = storage.cartItem;
        const catId = e.target.dataset.id;
        if (!cartItem[catId]) {
          cartItem[catId] = 0;
        }
        cartItem[catId] += 1;
      }
      react.render();
    });

    const cartDiv = document.querySelector(".cart-div");
    cartDiv.addEventListener("click", (e) => {
      console.log(e.target);
      switch (e.target.className) {
        case "toggle-cart":
          storage.isShowingCart = !storage.isShowingCart;

          break;
        case "cat-count-update-button":
          const catId = e.target.dataset.id;
          const catCountUpdated = document.querySelector(
            `.cat-count-update[data-id="${catId}"]`
          ).value;
          storage.cartItem[catId] = catCountUpdated;
          break;
        case "checkout-cart":
          storage.cartItem = {};
          break;

        default:
          return;
      }
      react.render();
    });
  },
};

module.exports = controller;
