"use strict";

/**
 *  shortcut for document.querySelector
 *  with error handling
 *
 */
function select(selector: string): HTMLElement {
	const element: HTMLElement | null = document.querySelector<HTMLElement>(selector);
	if (!element) throw `Element with selector "${selector}" not found.`;
	return element;
}

/**
 *  shortcut for document.querySelectorAll
 *  with error handling
 *
 */
function selectAll(selector: string): NodeListOf<HTMLElement> {
	const elements: NodeListOf<HTMLElement> | null = document.querySelectorAll<HTMLElement>(selector);
	if (!elements || elements.length === 0)
		throw `Elements with selector "${selector}" not found.`;
	return elements;
}

/**
 *  check if element exists
 *
 */
function exists(selector: string): boolean {
	return document.querySelector(selector) !== null;
}

/**
 *  add event listener to element with it's selector
 *
 */
function listen(selector: string, event_name: string, callback: Function): void {
	const element: HTMLElement = select(selector);

	if (element) {
		element.addEventListener(event_name, callback);
 	}
}

/**
 *  find element height
 *
 */
function height(element: HTMLElement): number {
	return element.offsetHeight;
}

/**
 *  find element width
 *
 */
function width(element: HTMLElement): number {
	return element.offsetWidth;
}

/**
 *  get element position relative to top of the page
 *
 */
function distanceFromTop(element: HTMLElement): number {
	const rect = element.getBoundingClientRect();
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return rect.top + scrollTop;
}

/**
 *  smooth scroll to element
 *
 */
function scrollToElement(element: HTMLElement, options = {}): void {
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
function scrollToTop(options = {}): void {
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
function getData(element: HTMLElement, data_name: string | null = null): Object | string {
	if (data_name) {
		const value: string | undefined = element.dataset[data_name];
		if (!value) throw new Error(`Element does not have a Data Attribute of '${data_name}'`);
		return value;
	}
	return element.dataset;
}

/**
 *  get all attributes for an element
 *
 */
function getAttibutes(element: HTMLElement, attriute_name: string | null = null): string {
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
function applyStyles(element: HTMLElement, styles: Object): void {
	Object.assign(element.style, styles);
}

/**
 *  hide elements from DOM
 *
 */
function hide(el: HTMLElement): void {
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
function show(el: HTMLElement, display): void {
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