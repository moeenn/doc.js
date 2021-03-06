"use strict";

/**
 *  shortcut for document.querySelector
 *  with error handling
 *
 */
function select(selector: string): HTMLElement {
  console.assert(
    selector.constructor === String,
    "selector must be a valid string"
  );

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
  console.assert(
    selector.constructor === String,
    "selector must be a valid string"
  );

  const elements: NodeListOf<HTMLElement> | null = document.querySelectorAll<HTMLElement>(
    selector
  );
  if (!elements || elements.length === 0)
    throw `Elements with selector "${selector}" not found.`;
  return elements;
}

/**
 *  mechanism for re-fetching a DOM element whenever we need
 *  its lateset values
 *
 */
function selectActive(selector: string): Function {
  return (): HTMLElement => {
    const element: HTMLElement | null = document.querySelector<HTMLElement>(
      selector
    );
    if (!element)
      throw new Error(`Element with selector "${selector}" not found.`);
    return element;
  };
}

/**
 *  check if element exists
 *
 */
function exists(selectors: Array<string>): boolean {
  console.assert(
    selectors.constructor === Array &&
      selectors.every((i) => i.constructor === String),
    "'selectors' must be an Array of Strings"
  );

  let result: boolean = true;
  selectors.forEach((selector) => {
    const element: HTMLElement | null = document.querySelector<HTMLElement>(
      selector
    );
    if (!element) result = false;
  });

  return result;
}

/**
 *  find element height
 *
 */
function height(element: HTMLElement): number {
  console.assert(
    element instanceof HTMLElement,
    "element must be a valid DOM Object"
  );
  return element.offsetHeight;
}

/**
 *  find element width
 *
 */
function width(element: HTMLElement): number {
  console.assert(
    element instanceof HTMLElement,
    "element must be a valid DOM Object"
  );
  return element.offsetWidth;
}

/**
 *  get element position relative to top of the page
 *
 */
function distanceFromTop(element: HTMLElement): number {
  console.assert(
    element instanceof HTMLElement,
    "element must be a valid DOM Object"
  );
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return rect.top + scrollTop;
}

/**
 *  smooth scroll to element
 *
 */
function scrollToElement(element: HTMLElement, options = {}): void {
  console.assert(
    element instanceof HTMLElement,
    "element must be a valid DOM Object"
  );
  console.assert(
    options.constructor === Object,
    "options must be an Object Literal"
  );

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
  console.assert(
    options.constructor === Object,
    "options must be an Object Literal"
  );
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
  console.assert(
    element instanceof HTMLElement,
    "element must be a valid DOM Object"
  );
  if (data_name) {
    console.assert(
      data_name.constructor === String,
      "data_name must be a valid string"
    );
  }

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
  console.assert(
    element instanceof HTMLElement,
    "element must be a valid DOM Object"
  );

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
  console.assert(
    element instanceof HTMLElement,
    "element must be a valid DOM Object"
  );
  console.assert(
    attribute_name.constructor === String,
    "attribute_name must be a valid string"
  );

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
  console.assert(
    element instanceof HTMLElement,
    "element must be a valid DOM Object"
  );
  console.assert(
    styles.constructor === Object,
    "styles must be a valid Object Literal"
  );

  Object.assign(element.style, styles);
}

/**
 *  hide elements from DOM
 *
 */
function hide(element: HTMLElement): void {
  console.assert(
    element instanceof HTMLElement,
    "element must be a valid DOM Object"
  );

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
function show(element: HTMLElement, display: string | null = null): void {
  console.assert(
    element instanceof HTMLElement,
    "element must be a valid DOM Object"
  );
  if (display) {
    console.assert(
      display.constructor === String,
      "display must be a valid string"
    );
  }

  element.style.opacity = "0";
  element.style.display = display ?? "block";

  (function fade() {
    let val = parseFloat(element.style.opacity);
    if (!((val += 0.05) > 1)) {
      element.style.opacity = `${val}`;
      requestAnimationFrame(fade);
    }
  })();
}

/**
 *  dispatch custom events on document
 *
 */
function emit(event_name: string, payload: any = null): void {
  const event = new CustomEvent(event_name, {
    detail: payload,
  });

  document.dispatchEvent(event);
}

/**
 *  redirect to another page
 *
 */
function redirect(url: Location): void {
  window.location = url;
}

export default {
  select,
  selectAll,
  selectActive,
  exists,
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
  emit,
  redirect,
};
