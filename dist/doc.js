"use strict";

/**
 *  shortcut for document.querySelector
 *  with error handling
 *
 */
const select = (selector) => {
	const element = document.querySelector(selector);
	if (!element) throw `Element with selector "${selector}" not found.`;
	return element;
}

/**
 *  shortcut for document.querySelectorAll
 *  with error handling
 *
 */
const selectAll = (selector) => {
	const elements = document.querySelectorAll(selector);
	if (!elements || elements.length === 0)
		throw `Elements with selector "${selector}" not found.`;
	return elements;
}

/**
 *  check if element exists
 *
 */
const exists = (selector) => {
	return document.querySelector(selector) !== null;
}

/**
 *  add event listener to element with it's selector
 *
 */
const listen = (selector, event_name, callback) => {
	const element = select(selector);

	if (element) {
		element.addEventListener(event_name, callback);
	}
}

/**
 *  find element height
 *
 */
const height = (element) => {
	return element.offsetHeight;
}

/**
 *  find element width
 *
 */
const width = (element) => {
	return element.offsetWidth;
}

/**
 *  get element position relative to top of the page
 *
 */
const distanceFromTop = (element) => {
	const rect = element.getBoundingClientRect();
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return rect.top + scrollTop;
}

/**
 *  smooth scroll to element
 *
 */
const scrollToElement = (element, options = {}) => {
	const default_options = {
		smooth: true,
		topOffset: 0,
	};

	Object.assign(default_options, options);

	const topPixels = distanceFromTop(element);

	window.scroll({
		top: topPixels - default_options.topOffset,
		behavior: default_options.smooth ? "smooth" : "auto",
	});
}

/**
 *  scroll to the top of the document
 *
 */
const scrollToTop = (options = {}) => {
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
const getData = (element, data_name = null) => {
	if (data_name) return element.dataset[data_name];
	return element.dataset;
}

/**
 *  get all attributes for an element
 *
 */
const getAttibutes = (element, attriute_name = null) => {
	const attributes = element.attributes;

	if (attriute_name) {
		return attributes[`data-${attriute_name}`].textContent;
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
 *  add css classes to document
 *
 */
const applyStyles = (element, styles) => {
	Object.assign(element.style, styles);
}

/**
 *  hide elements from DOM
 *
 */
const hide = (el) => {
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
const show = (el, display) => {
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


export class ActiveElement {
	#element = null;
	#selector = null;

	constructor(selector) {
		this.#element = document.querySelector(selector);
		if (!this.#element) {
			throw new Error(`Failed to Find element with selector '${selector}'`);
		}

		this.#selector = selector; 
	}

	get() {
		this.#element = document.querySelector(this.#selector);
		if (!this.#element) {
			throw new Error(`It seems that element with selector '${selector}' no longer exists in the DOM`);
		}

		return this.#element;
	}
}

export class ActiveElements {
	#elements = null;
	#selector = null;

	constructor(selector) {
		this.#elements = document.querySelectorAll(selector);
		if (!this.#elements) {
			throw new Error(`Failed to Find elements with selector '${selector}'`);
		}

		this.#selector = selector; 
	}

	get(selector = null) {
		let combine_selector = (selector) ? `${this.#selector} ${selector}`: this.#selector;
			
		this.#elements = document.querySelector(combine_selector);
		if (!this.#elements) {
			throw new Error(`It seems that elements with selector '${combine_selector}' don't in the DOM`);
		}

		return this.#elements;
	}
}


export default {
	select,
	selectAll,
	exists,
	listen,
	height,
	width,
	distanceFromTop,
	scrollToElement,
	scrollToTop,
	getData,
	getAttibutes,
	applyStyles,
	hide,
	show,
};