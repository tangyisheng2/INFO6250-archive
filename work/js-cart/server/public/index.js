/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/cat-database.js":
/*!********************************!*\
  !*** ./src/js/cat-database.js ***!
  \********************************/
/***/ ((module) => {

var storage = {
  // Use id as the unique identifier for cat when adding to cart
  1: {
    name: "Nyan",
    img: "http://placekitten.com/150/150?image=1",
    price: 0.99
  },
  2: {
    name: "Beluga",
    img: "http://placekitten.com/150/150?image=2",
    price: 3.14
  },
  3: {
    name: "Beluga Jr.",
    img: "http://placekitten.com/150/150?image=3",
    price: 2.73
  }
};
module.exports = storage;

/***/ }),

/***/ "./src/js/controller.js":
/*!******************************!*\
  !*** ./src/js/controller.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var react = __webpack_require__(/*! ./react.js */ "./src/js/react.js");
var storage = __webpack_require__(/*! ./storage.js */ "./src/js/storage.js");
var controller = {
  initEventListener: function initEventListener() {
    // eventListener for add item
    var catDiv = document.querySelector(".cat-div");
    catDiv.addEventListener("click", function (e) {
      e.preventDefault();
      if (e.target.tagName == "A") {
        var cartItem = storage.cartItem;
        var catId = e.target.dataset.id;
        if (!cartItem[catId]) {
          cartItem[catId] = 0;
        }
        cartItem[catId] += 1;
      }
      react.render();
    });
    var cartDiv = document.querySelector(".cart-div");
    cartDiv.addEventListener("click", function (e) {
      console.log(e.target);
      switch (e.target.className) {
        case "toggle-cart":
          storage.isShowingCart = !storage.isShowingCart;
          break;
        case "cat-count-update-button":
          var catId = e.target.dataset.id;
          var catCountUpdated = document.querySelector(".cat-count-update[data-id=\"".concat(catId, "\"]")).value;
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
  }
};
module.exports = controller;

/***/ }),

/***/ "./src/js/react.js":
/*!*************************!*\
  !*** ./src/js/react.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var catInfoObj = __webpack_require__(/*! ./cat-database.js */ "./src/js/cat-database.js");
var storage = __webpack_require__(/*! ./storage.js */ "./src/js/storage.js");
var react = {
  render: function render() {
    react.renderItemPage();
    react.renderCartPage();
  },
  renderItemPage: function renderItemPage() {
    var element = document.querySelector(".cat-list");
    var elementHTMLList = Object.keys(catInfoObj).map(function (key) {
      var catInfo = catInfoObj[key];
      return "\n        <li class=\"cat-list-item\">\n            <div>\n                <img src=\"".concat(catInfo.img, "\" alt=\"a cat picture\" class=\"cat-picture\">\n                <p class=\"cat-name\">Name: ").concat(catInfo.name, "</p>\n                <p class=\"cat-price\">Price: $").concat(catInfo.price, "/ea</p>\n                <a href=\"\" data-id=").concat(key, ">Add to Cart</a>\n            </div>\n        </li>\n        ");
    });
    element.innerHTML = elementHTMLList.join("");
  },
  renderCartPage: function renderCartPage() {
    var cartEl = document.querySelector(".cart-div");
    var isShowingCart = storage.isShowingCart;
    var cartItem = storage.cartItem;
    var cartTotal = 0;
    var cartHTMLList = Object.keys(cartItem).map(function (catId) {
      var catInfo = catInfoObj[catId];
      var catName = catInfo.name;
      var catPrice = catInfo.price;
      var catCount = cartItem[catId];
      cartTotal = cartTotal + catPrice * catCount;
      return "\n      <li class=\"cart-list-item\">\n          <p class=\"cart-item\">".concat(catName, ": $").concat(catPrice, " * ").concat(catCount, "  <label>Edit Quantity: <input class='cat-count-update' data-id=").concat(catId, "></input></label><button class='cat-count-update-button' data-id=").concat(catId, ">Update</button></p>\n       </li>\n      ");
    });
    var cartHTMLCollasped = "<button class=\"toggle-cart\">View Cart</a>";
    var cartHTMLExpanded = cartHTMLList.length ? "\n      <h2>Cart</h2>\n        <ul class=\"cart-list\">\n          ".concat(cartHTMLList.join(""), "\n          <li class=\"cart-total\">Total $").concat(cartTotal, "</li>\n        </ul>\n      <button class=\"checkout-cart\">Check Out</button>      \n      <button class=\"toggle-cart\">Hide Cart</button>      \n") : "\n      <h2>Cart</h2>\n      <ul class=\"cart-list\">\n        <li>\n          <p>You Have an empty cart</p>\n        </li>\n      </ul>\n      <button class=\"checkout-cart\" disabled>Check Out</button>\n      <button class=\"toggle-cart\">Hide Cart</button>\n      ";
    cartEl.innerHTML = isShowingCart ? cartHTMLExpanded : cartHTMLCollasped;
  }
};
module.exports = react;

/***/ }),

/***/ "./src/js/storage.js":
/*!***************************!*\
  !*** ./src/js/storage.js ***!
  \***************************/
/***/ ((module) => {

var storage = {
  isShowingCart: false,
  cartItem: {} // Element in cartItem would be {$catId, $catCount}
};

module.exports = storage;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
var controller = __webpack_require__(/*! ./js/controller.js */ "./src/js/controller.js");
var react = __webpack_require__(/*! ./js/react.js */ "./src/js/react.js");
react.render();
controller.initEventListener();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map