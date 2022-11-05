const catInfoObj = require("./cat-database.js");
const storage = require("./storage.js");

const react = {
  render() {
    react.renderItemPage();
    react.renderCartPage();
  },

  renderItemPage() {
    const element = document.querySelector(".cat-list");
    const elementHTMLList = Object.keys(catInfoObj).map((key) => {
      const catInfo = catInfoObj[key];
      return `
        <li class="cat-list-item">
            <div>
                <img src="${catInfo.img}" alt="a cat picture" class="cat-picture">
                <p class="cat-name">Name: ${catInfo.name}</p>
                <p class="cat-price">Price: $${catInfo.price}/ea</p>
                <a href="" data-id=${key}>Add to Cart</a>
            </div>
        </li>
        `;
    });
    element.innerHTML = elementHTMLList.join("");
  },

  renderCartPage() {
    const cartEl = document.querySelector(".cart-div");
    const isShowingCart = storage.isShowingCart;
    const cartItem = storage.cartItem;
    let cartTotal = 0;

    const cartHTMLList = Object.keys(cartItem).map((catId) => {
      const catInfo = catInfoObj[catId];
      const catName = catInfo.name;
      const catPrice = catInfo.price;
      const catCount = cartItem[catId];
      cartTotal = cartTotal + catPrice * catCount;
      return `
      <li class="cart-list-item">
          <p class="cart-item">${catName}: $${catPrice} * ${catCount}  <label>Edit Quantity: <input class='cat-count-update' data-id=${catId}></input></label><button class='cat-count-update-button' data-id=${catId}>Update</button></p>
       </li>
      `;
    });

    const cartHTMLCollasped = `<button class="toggle-cart">View Cart</a>`;

    const cartHTMLExpanded = cartHTMLList.length
      ? `
      <h2>Cart</h2>
        <ul class="cart-list">
          ${cartHTMLList.join("")}
          <li class="cart-total">Total $${cartTotal}</li>
        </ul>
      <button class="checkout-cart">Check Out</button>      
      <button class="toggle-cart">Hide Cart</button>      
`
      : `
      <h2>Cart</h2>
      <ul class="cart-list">
        <li>
          <p>You Have an empty cart</p>
        </li>
      </ul>
      <button class="checkout-cart" disabled>Check Out</button>
      <button class="toggle-cart">Hide Cart</button>
      `;
    cartEl.innerHTML = isShowingCart ? cartHTMLExpanded : cartHTMLCollasped;
  },
};

module.exports = react;
