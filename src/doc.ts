"use strict";

/**
 *  shortcut for document.querySelector
 *  with error handling
 *
 */
function select(
  selector: string,
  target: HTMLDocument | HTMLElement = document
): HTMLElement {
  console.assert(
    selector.constructor === String,
    "selector must be a valid string"
  );

  console.assert(
    target.constructor === HTMLDocument || target instanceof HTMLElement,
    "target must be of type HTMLDocument or HTMLElement"
  );

  const element: HTMLElement | null =
    target.querySelector<HTMLElement>(selector);

  if (!element) {
    throw new Error(`Element with selector "${selector}" not found.`);
  }

  return element;
}

/**
 *  shortcut for document.querySelectorAll
 *  with error handling
 *
 */
function selectAll(
  selector: string,
  target: HTMLDocument | HTMLElement = document
): NodeListOf<HTMLElement> {
  console.assert(
    selector.constructor === String,
    "selector must be a valid string"
  );

  console.assert(
    target.constructor === HTMLDocument || target instanceof HTMLElement,
    "target must be of type HTMLDocument or HTMLElement"
  );

  const elements: NodeListOf<HTMLElement> | null =
    target.querySelectorAll<HTMLElement>(selector);

  if (!elements || elements.length === 0) {
    throw new Error(`Elements with selector "${selector}" not found.`);
  }

  return elements;
}

/**
 *  check if element exists
 *
 */
function exists(
  selectors: Array<string>,
  target: HTMLDocument | HTMLElement = document
): boolean {
  console.assert(
    selectors.constructor === Array &&
      selectors.every((i) => i.constructor === String),
    "'selectors' must be an Array of Strings"
  );

  console.assert(
    target.constructor === HTMLDocument || target instanceof HTMLElement,
    "target must be of type HTMLDocument or HTMLElement"
  );

  let result: boolean = true;
  selectors.forEach((selector) => {
    const element: HTMLElement | null =
      target.querySelector<HTMLElement>(selector);
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
function scrollToElement(element: HTMLElement, options = {}): boolean {
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

  const topPixels: number = distanceFromTop(element);

  window.scroll({
    top: topPixels - default_options.topOffset,
    behavior: default_options.smooth ? "smooth" : "auto",
  });

  return true;
}

/**
 *  scroll to the top of the document
 *
 */
function scrollToTop(options = {}): boolean {
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

  return true;
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
    if (!value) {
      throw new Error(
        `Element does not have a Data Attribute of '${data_name}'`
      );
    }

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
  return attributes.map((attribute) => {
    return {
      attribute: attribute.name,
      value: attribute.textContent,
    };
  });
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

  const attribute: Attr | null = attributes.getNamedItem(
    `data-${attribute_name}`
  );

  if (!attribute) {
    throw error;
  }

  if (!attribute.textContent) {
    throw error;
  }

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
  // hide,
  // show,
  emit,
  redirect,
};
