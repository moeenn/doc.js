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
): Array<HTMLElement> {
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

  return [...elements];
}

/**
 *  check if element(s) exist in DOM
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

  return selectors.every((selector: string) => {
    return target.querySelector<HTMLElement>(selector) !== null;
  });
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
function scrollToElement(element: HTMLElement, options: Object = {}): boolean {
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
function scrollToTop(options: Object = {}): boolean {
  console.assert(
    options.constructor === Object,
    "options must be an Object Literal"
  );

  let default_options = {
    smooth: true,
    topOffset: 0,
  };

  default_options = Object.assign(default_options, options);

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
    if (value === undefined) {
      throw new Error(
        `Element does not have a Data Attribute of '${data_name}'`
      );
    }

    return value.length === 0 ? true : value;
  }

  let result: Record<string, any> = {};

  for (const [key, value] of Object.entries(element.dataset)) {
    if (value?.length === 0) result[key] = true;
  }

  return result;
}

/**
 *  get all attributes for an element
 *
 */
function getAttibutes(element: HTMLElement): Object {
  console.assert(
    element instanceof HTMLElement,
    "element must be a valid DOM Object"
  );

  const attributes: Array<Attr> = [...element.attributes];
  return attributes.reduce((accum, current) => {
    if (current.name.startsWith("data-")) return accum;
    return Object.assign(accum, { [current.name]: current.textContent });
  }, {});
}

/**
 *  add css properties to element
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
 *  hide element in DOM
 *
 */
function hide(element: HTMLElement): void {
  console.assert(
    element instanceof HTMLElement,
    "element must be a valid DOM Object"
  );

  element.hidden = true;
}

/**
 *  show hidden element in DOM
 *
 */
function show(element: HTMLElement): void {
  console.assert(
    element instanceof HTMLElement,
    "element must be a valid DOM Object"
  );

  element.hidden = false;
}

/**
 *  delete element from DOM
 *
 */
function remove(element: HTMLElement) {
  console.assert(
    element instanceof HTMLElement,
    "element must be a valid DOM Object"
  );

  element.remove();
}

/**
 *  redirect to another page
 *
 */
function redirect(url: Location, new_tab: boolean = false): void {
  console.assert(
    url.constructor === String || url.constructor === Location,
    "url must be a valid String or Location"
  );

  if (new_tab) {
    window.open(url.toString(), "_blank")?.focus();
    return;
  }

  window.location = url;
}

/**
 *  insert element in DOM
 *
 */
function insert(
  target_element: HTMLElement,
  new_element: HTMLElement,
  after: boolean = true
): void {
  console.assert(
    target_element instanceof HTMLElement,
    "target_element must be a valid DOM Object"
  );

  console.assert(
    new_element instanceof HTMLElement,
    "new_element must be a valid DOM Object"
  );

  if (after) insertAfter(target_element, new_element);
  if (!after) insertBefore(target_element, new_element);
}

/**
 *  insert element before another element
 *  @private
 */
function insertBefore(
  target_element: HTMLElement,
  new_element: HTMLElement
): void {
  target_element.before(new_element);
}

/**
 *  insert an element after another element
 *
 */
function insertAfter(
  target_element: HTMLElement,
  new_element: HTMLElement
): void {
  const parent = target_element.parentElement;
  if (!parent) {
    throw new Error("Provided element does not have a parent element");
  }

  parent.insertBefore(new_element, target_element.nextSibling);
}

/**
 *  create an HTML element
 *
 */
function element(
  type: string,
  attributes: Object = {},
  ...children: Array<HTMLElement | string>
) {
  console.assert(type.constructor === String, "type must be a string");
  console.assert(
    attributes.constructor === Object,
    "attributes must be an Object literal"
  );

  // TODO: argument type checking on children

  const elem: HTMLElement = document.createElement(type);
  for (const [key, value] of Object.entries(attributes)) {
    elem.setAttribute(key, value);
  }

  children.forEach((e) => {
    if (e instanceof HTMLElement) elem.appendChild(e);
    if (e.constructor === String) {
      const node = document.createTextNode(e);
      elem.appendChild(node);
    }
  });
  
  return elem;
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
  applyStyles,
  hide,
  show,
  remove,
  redirect,
  insert,
  element,
};
