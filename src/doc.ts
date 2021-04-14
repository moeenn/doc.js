"use strict";

/**
 *  shortcut for document.querySelector
 *  with error handling
 *
 */
function select(selector: string): Promise<HTMLElement> {
  console.assert(
    selector.constructor === String,
    "selector must be a valid string"
  );

  return new Promise((resolve: Function, reject: Function) => {
    const element: HTMLElement | null = document.querySelector<HTMLElement>(
      selector
    );

    if (!element) {
      reject(`Element with selector "${selector}" not found.`);
    } else {
      resolve(element);
    }
  });
}

/**
 *  shortcut for document.querySelectorAll
 *  with error handling
 *
 */
function selectAll(selector: string): Promise<NodeListOf<HTMLElement>> {
  console.assert(
    selector.constructor === String,
    "selector must be a valid string"
  );

  return new Promise((resolve: Function, reject: Function) => {
    const elements: NodeListOf<HTMLElement> | null = document.querySelectorAll<HTMLElement>(
      selector
    );

    if (!elements || elements.length === 0) {
      reject(`Elements with selector "${selector}" not found.`);
    }

    resolve(elements);
  });
}

/**
 *  check if element exists
 *
 */
function exists(selectors: Array<string>): Promise<boolean> {
  console.assert(
    selectors.constructor === Array &&
      selectors.every((i) => i.constructor === String),
    "'selectors' must be an Array of Strings"
  );

  return new Promise((resolve: Function) => {
    let result: boolean = true;
    selectors.forEach((selector) => {
      const element: HTMLElement | null = document.querySelector<HTMLElement>(
        selector
      );
      if (!element) result = false;
    });

    resolve(result);
  });
}

/**
 *  find element height
 *
 */
function height(element: HTMLElement): Promise<number> {
  console.assert(
    element instanceof HTMLElement,
    "element must be a valid DOM Object"
  );

  return new Promise((resolve: Function) => {
    resolve(element.offsetHeight);
  });
}

/**
 *  find element width
 *
 */
function width(element: HTMLElement): Promise<number> {
  console.assert(
    element instanceof HTMLElement,
    "element must be a valid DOM Object"
  );

  return new Promise((resolve: Function) => {
    resolve(element.offsetWidth);
  });
}

/**
 *  get element position relative to top of the page
 *
 */
function distanceFromTop(element: HTMLElement): Promise<number> {
  console.assert(
    element instanceof HTMLElement,
    "element must be a valid DOM Object"
  );

  return new Promise((resolve: Function) => {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    resolve(rect.top + scrollTop);
  });
}

/**
 *  smooth scroll to element
 *
 */
function scrollToElement(element: HTMLElement, options = {}): Promise<boolean> {
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

  return new Promise(async (resolve: Function) => {
    const topPixels: number = await distanceFromTop(element);

    window.scroll({
      top: topPixels - default_options.topOffset,
      behavior: default_options.smooth ? "smooth" : "auto",
    });

    resolve(true);
  });
}

/**
 *  scroll to the top of the document
 *
 */
function scrollToTop(options = {}): Promise<boolean> {
  console.assert(
    options.constructor === Object,
    "options must be an Object Literal"
  );
  const default_options = {
    smooth: true,
    topOffset: 0,
  };

  Object.assign(default_options, options);

  return new Promise((resolve: Function) => {
    window.scroll({
      top: default_options.topOffset,
      behavior: default_options.smooth ? "smooth" : "auto",
    });

    resolve(true);
  });
}

/**
 *  get all data attributes for an element
 *
 */
function getData(
  element: HTMLElement,
  data_name: string | null = null
): Promise<Object | string> {
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

  return new Promise((resolve: Function, reject: Function) => {
    if (data_name) {
      const value: string | undefined = element.dataset[data_name];
      if (!value) {
        reject(`Element does not have a Data Attribute of '${data_name}'`);
      }

      resolve(value);
    }

    resolve(element.dataset);
  });
}

/**
 *  get all attributes for an element
 *
 */
function getAttibutes(element: HTMLElement): Promise<Array<Object>> {
  console.assert(
    element instanceof HTMLElement,
    "element must be a valid DOM Object"
  );

  return new Promise((resolve: Function) => {
    const attributes: Array<Attr> = [...element.attributes];
    const result: Array<Object> = [];

    attributes.forEach((attribute) => {
      result.push({
        attribute: attribute.name,
        value: attribute.textContent,
      });
    });

    resolve(result);
  });
}

/**
 *  get single attribute of an element
 *
 */
function getAttibute(
  element: HTMLElement,
  attribute_name: string
): Promise<string> {
  console.assert(
    element instanceof HTMLElement,
    "element must be a valid DOM Object"
  );
  console.assert(
    attribute_name.constructor === String,
    "attribute_name must be a valid string"
  );

  return new Promise((resolve: Function, reject: Function) => {
    const attributes: NamedNodeMap = element.attributes;
    const error = `Attribute '${attribute_name}' not found on Element`;

    const attribute: Attr | null = attributes.getNamedItem(
      `data-${attribute_name}`
    );
    if (!attribute) {
      reject(error);
    }

    if (attribute && !attribute.textContent) {
      reject(error);
    }

    if (attribute) resolve(attribute.textContent);
  });
}

/**
 *  add css classes to document
 *
 */
function applyStyles(element: HTMLElement, styles: Object): Promise<boolean> {
  console.assert(
    element instanceof HTMLElement,
    "element must be a valid DOM Object"
  );
  console.assert(
    styles.constructor === Object,
    "styles must be a valid Object Literal"
  );

  return new Promise((resolve: Function) => {
    Object.assign(element.style, styles);
    resolve(true);
  });
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
 *  listen for events
 *
 */
function listen(
  target: HTMLElement,
  event_name: keyof HTMLElementEventMap,
  callback: any
): Promise<boolean> {
  return new Promise((resolve: Function) => {
    target.addEventListener(event_name, callback);
    resolve(true);
  });
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
  hide,
  show,
  emit,
  listen,
  redirect,
};
