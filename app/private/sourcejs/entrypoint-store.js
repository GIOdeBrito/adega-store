
import Navbar from "./navbar.js";
import StoreItems from "./store-page/items.js";

window.addEventListener('load', () => {

	Navbar.initialize();

	StoreItems.initialize();
	StoreItems.setControls();
	StoreItems.hydrateCardArea();
});


