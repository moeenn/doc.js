"use strict";

/**
 *  shortcut for document.querySelector
 *  with error handling
 *
 */
function select(selector: string): HTMLElement {
  assert(selector.constructor === String, "selector must be a valid string");

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
  assert(selector.constructor === String, "selector must be a valid string");

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
  assert(selector.constructor === String, "selector must be a valid string");
  return document.querySelector(selector) !== null;
}

/**
 *  find element height
 *
 */
function height(element: HTMLElement): number {
  assert(element instanceof HTMLElement, "element must be a valid DOM Object");
  return element.offsetHeight;
}

/**
 *  find element width
 *
 */
function width(element: HTMLElement): number {
  assert(element instanceof HTMLElement, "element must be a valid DOM Object");
  return element.offsetWidth;
}

/**
 *  get element position relative to top of the page
 *
 */
function distanceFromTop(element: HTMLElement): number {
  assert(element instanceof HTMLElement, "element must be a valid DOM Object");
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return rect.top + scrollTop;
}

/**
 *  smooth scroll to element
 *
 */
function scrollToElement(element: HTMLElement, options = {}): void {
  assert(element instanceof HTMLElement, "element must be a valid DOM Object");
  assert(options.constructor === Object, "options must be an Object Literal");

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
  assert(options.constructor === Object, "options must be an Object Literal");
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
  assert(element instanceof HTMLElement, "element must be a valid DOM Object");
  if (data_name) {
    assert(
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
  assert(element instanceof HTMLElement, "element must be a valid DOM Object");

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
  assert(element instanceof HTMLElement, "element must be a valid DOM Object");
  assert(
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
  assert(element instanceof HTMLElement, "element must be a valid DOM Object");
  assert(
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
  assert(element instanceof HTMLElement, "element must be a valid DOM Object");

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
  assert(element instanceof HTMLElement, "element must be a valid DOM Object");
  if (display) {
    assert(display.constructor === String, "display must be a valid string");
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
 *  mechanism for re-fetching a DOM element whenever we need
 *  its lateset values
 *
 */
class ActiveElement {
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

/**
 *  local in-browser storage
 *
 */
type StoreType = 'cookie' | 'localStorage';
interface StoreOptions {
  adopt: boolean,
  store_type: StoreType,
}

class Store {
  private _name: string;
  private _data: Object;
  private _store_type: StoreType;

  constructor(name: string, options: Object) {
    let default_options: StoreOptions = {
      adopt: false,
      store_type: 'localStorage',
    };

    Object.assign(default_options, options);

    this._name = name;
    this._data = default_options.adopt ? this._read() : {};

    if (default_options.adopt) {
      this._data = this._read();
      return;
    }

    if (this._check_initialized()) {
      this._flush_store();
    }

    this._store_type = default_options.store_type;
    this._data = {};
  }

  /**
   *  check if data already exists in browser against this store name
   */ 
  private _check_initialized(): boolean {
    return localStorage.getItem(this._name) !== null;
  }

  /**
   *  write data to browser local store
   */
  private _write(): void {
    const dataJSON = JSON.stringify(this._data);
    localStorage.setItem(this._name, dataJSON);
  }

  private _read(): Object {
    const dataJSON: string | null = localStorage.getItem(this._name);
    let data: Object | null;

    if (dataJSON) {
      try {
        data = JSON.parse(dataJSON);
      } catch (_) {
        throw new Error("Store Data corrupted!");
      }
    } else {
      return {};
    }

    return data ? data : {};
  }

  /**
   *  clear any data in browser storage against current store name
  */
  private _flush_store() {
    localStorage.remove(this._name);
  }

  public store(data: Object): void {
    Object.assign(this._data, data);
    this._write();
  }
}

/**
 *  assert conditions and exit on assertion failure
 *  function was needed because console.assert() does not exit on failure
 *
 */
function assert(condition: boolean, message: string | null = null): void {
  if (!condition) {
    throw new Error(message ?? "Assertion failed");
  }
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
};

export { ActiveElement, Store, assert };
