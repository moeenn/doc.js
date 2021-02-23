"use strict";

/**
 *  shortcut for document.querySelector
 *  with error handling
 *
 */
function select(selector: string): HTMLElement {
  const element: HTMLElement | null = document.querySelector<HTMLElement>(
    selector
  );
  if (!element) throw `Element with selector "${selector}" not found.`;
  return element;
}

/**
 *  shortcut for document.querySelectorAll
 *  with error handling
 *
 */
function selectAll(selector: string): NodeListOf<HTMLElement> {
  const elements: NodeListOf<HTMLElement> | null = document.querySelectorAll<HTMLElement>(
    selector
  );
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
function listen(selector: string, event_name: any, callback: any): void {
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
function getData(
  element: HTMLElement,
  data_name: string | null = null
): Object | string {
  if (data_name) {
    const value: string | undefined = element.dataset[data_name];
    if (!value)
      throw new Error(
        `Element does not have a Data Attribute of '${data_name}'`
      );
    return value;
  }
  return element.dataset;
}

/**
 *  get all attributes for an element
 *
 */
function getAttibutes(element: HTMLElement): Array<Object> {
  const attributes: Array<Attr> = [...element.attributes];
  const result: Array<Object> = [];

  attributes.forEach((attribute) => {
    result.push({
      attribute: attribute.name,
      value: attribute.textContent,
    });
  });

  return result;
}

/**
 *  get single attribute of an element
 *
 */
function getAttibute(element: HTMLElement, attribute_name: string): string {
  const attributes: NamedNodeMap = element.attributes;
  const error = new Error(`Attribute '${attribute_name}' not found on Element`);

  const attribute = attributes.getNamedItem(`data-${attribute_name}`);
  if (!attribute) {
    throw error;
  }

  if (!attribute.textContent) throw error;
  return attribute.textContent;
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
function hide(element: HTMLElement): void {
  let fadeEffect = setInterval(function () {
    if (!element.style.opacity) {
      element.style.opacity = "1";
    }
    if (parseFloat(element.style.opacity) > 0) {
      const opacity: number = parseFloat(element.style.opacity) - 0.1;
      element.style.opacity = opacity.toString();
    } else {
      clearInterval(fadeEffect);
      element.style.display = "none";
    }
  }, 10);
}

/**
 *  show hidden elements in DOM
 *
 */
function show(el: HTMLElement, display: string): void {
  el.style.opacity = "0";
  el.style.display = display ?? "block";

  (function fade() {
    let val = parseFloat(el.style.opacity);
    if (!((val += 0.05) > 1)) {
      el.style.opacity = `${val}`;
      requestAnimationFrame(fade);
    }
  })();
}

export class ActiveElement {
  private _element: HTMLElement | null;
  private _selector: string;

  constructor(selector: string) {
    this._element = document.querySelector<HTMLElement>(selector);
    if (!this._element) {
      throw new Error(`Failed to Find element with selector '${selector}'`);
    }

    this._selector = selector;
  }

  public get(selector: string | null = null): HTMLElement {
    selector = selector ? `${this._selector} ${selector}` : this._selector;

    this._element = document.querySelector<HTMLElement>(selector);
    if (!this._element) {
      throw new Error(
				`It seems that element with selector '${selector}' does not exist in the DOM`
			);
    }

    return this._element;
  }
}

export class ActiveElements {
  private _elements: NodeListOf<HTMLElement> | null;
  private _selector: string;

  constructor(selector: string) {
    this._elements = document.querySelectorAll<HTMLElement>(selector);
    if (!this._elements) {
      throw new Error(`Failed to Find elements with selector '${selector}'`);
    }

    this._selector = selector;
  }

  public get(selector: string): HTMLElement {
    selector = `${this._selector} ${selector}`;

    const element: HTMLElement | null = document.querySelector<HTMLElement>(
      selector
    );
    if (!element) {
      throw new Error(
        `It seems that elements with selector '${selector}' don't exist in the DOM`
      );
    }

    return element;
  }

  public get_all(): NodeListOf<HTMLElement> {
    this._elements = document.querySelectorAll<HTMLElement>(this._selector);
    if (!this._elements) {
      throw new Error(
        `It seems that elements with selector '${this._selector}' don't in the DOM`
      );
    }

    return this._elements;
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
  getAttibute,
  applyStyles,
  hide,
  show,
};
