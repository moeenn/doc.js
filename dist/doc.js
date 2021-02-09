"use strict";

window.doc = class Doc {
	/**
	 *  shortcut for document.querySelector
	 *  with error handling
	 *
	 */
	static select(selector) {
		const elem = document.querySelector(selector);
		if (!elem) throw `Element with selector "${selector}" not found.`;
		return elem;
	}

	/**
	 *  shortcut for document.querySelectorAll
	 *  with error handling
	 *
	 */
	static selectAll(selector) {
		const elements = document.querySelectorAll(selector);
		if (!elements || elements.length === 0)
			throw `Elements with selector "${selector}" not found.`;
		return elements;
	}

	/**
	 *  check if element exists
	 *
	 */
	static exists(selector) {
		return document.querySelector(selector) !== null;
	}

	/**
	 *  add event listener to element with it's selector
	 *
	 */
	static listen(selector, event_name, callback) {
		const element = this.select(selector);

		if (element) {
			element.addEventListener(event_name, callback);
		}
	}

	/**
	 *  find element height
	 *
	 */
	static height(element) {
		return element.offsetHeight;
	}

	/**
	 *  find element width
	 *
	 */
	static width(element) {
		return element.offsetWidth;
	}

	/**
	 *  get element position relative to top of the page
	 *
	 */
	static distanceFromTop(element) {
		const rect = element.getBoundingClientRect();
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return rect.top + scrollTop;
	}

	/**
	 *  smooth scroll to element
	 *
	 */
	static scrollToElement(element, options = {}) {
		const default_options = {
			smooth: true,
			topOffset: 0,
		};

		Object.assign(default_options, options);

		const topPixels = this.distanceFromTop(element);

		window.scroll({
			top: topPixels - default_options.topOffset,
			behavior: default_options.smooth ? "smooth" : "auto",
		});
	}

	/**
	 *  scroll to the top of the document
	 *
	 */
	static scrollToTop(options = {}) {
		const default_options = {
			smooth: true,
			topOffset: 0,
		};

		Object.assign(default_options, options);
		window.scroll({
			top: default_options.topOffset,
			behavior: default_options.smooth ? "smooth" : "auto",
		});
	}

	/**
	 *  get all data attributes for an element
	 *
	 */
	static getData(element, data_name = null) {
		if (data_name) return element.dataset[data_name];
		return element.dataset;
	}

	/**
	 *  get all attributes for an element
	 *
	 */
	static getAttibutes(element, attriute_name = null) {
		const attributes = element.attributes;

		if (attriute_name) {
			return attributes[attriute_name].textContent;
		}

		const result = [];

		for (let i = 0; i < attributes.length; i++) {
			result.push({
				attribute: attributes[i].name,
				value: attributes[i].textContent,
			});
		}

		return result;
	}

	/**
	 *  apply styles to element
	 *
	 */
	static applyStyles(element, styles) {
		Object.assign(element.style, styles);
	}

	/**
	 *  add css classes to document
	 *
	 */
	static applyStyles(element, styles) {
		Object.assign(element.style, styles);
	}

	/**
	 *  hide elements from DOM
	 *
	 */
	static hide(el) {
		el.style.opacity = 1;

		(function fade() {
			if ((el.style.opacity -= 0.1) < 0) {
				el.style.display = "none";
			} else {
				requestAnimationFrame(fade);
			}
		})();

		el.hidden = true;
	}

	/**
	 *  show hidden elements in DOM
	 *
	 */
	static show(el, display) {
		el.style.opacity = 0;
		el.style.display = display || "block";

		(function fade() {
			var val = parseFloat(el.style.opacity);
			if (!((val += 0.1) > 1)) {
				el.style.opacity = val;
				requestAnimationFrame(fade);
			}
		})();

		el.hidden = false;
	}
};
