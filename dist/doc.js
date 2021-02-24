"use strict";
function select(selector) {
    assert(selector.constructor === String, "selector must be a valid string");
    const element = document.querySelector(selector);
    if (!element)
        throw `Element with selector "${selector}" not found.`;
    return element;
}
function selectAll(selector) {
    assert(selector.constructor === String, "selector must be a valid string");
    const elements = document.querySelectorAll(selector);
    if (!elements || elements.length === 0)
        throw `Elements with selector "${selector}" not found.`;
    return elements;
}
function exists(selector) {
    assert(selector.constructor === String, "selector must be a valid string");
    return document.querySelector(selector) !== null;
}
function height(element) {
    assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    return element.offsetHeight;
}
function width(element) {
    assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    return element.offsetWidth;
}
function distanceFromTop(element) {
    assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return rect.top + scrollTop;
}
function scrollToElement(element, options = {}) {
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
function scrollToTop(options = {}) {
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
function getData(element, data_name = null) {
    assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    if (data_name) {
        assert(data_name.constructor === String, "data_name must be a valid string");
    }
    if (data_name) {
        const value = element.dataset[data_name];
        if (!value)
            throw new Error(`Element does not have a Data Attribute of '${data_name}'`);
        return value;
    }
    return element.dataset;
}
function getAttibutes(element) {
    assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    const attributes = [...element.attributes];
    const result = [];
    attributes.forEach((attribute) => {
        result.push({
            attribute: attribute.name,
            value: attribute.textContent,
        });
    });
    return result;
}
function getAttibute(element, attribute_name) {
    assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    assert(attribute_name.constructor === String, "attribute_name must be a valid string");
    const attributes = element.attributes;
    const error = new Error(`Attribute '${attribute_name}' not found on Element`);
    const attribute = attributes.getNamedItem(`data-${attribute_name}`);
    if (!attribute) {
        throw error;
    }
    if (!attribute.textContent)
        throw error;
    return attribute.textContent;
}
function applyStyles(element, styles) {
    assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    assert(styles.constructor === Object, "styles must be a valid Object Literal");
    Object.assign(element.style, styles);
}
function hide(element) {
    assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    let fadeEffect = setInterval(function () {
        if (!element.style.opacity) {
            element.style.opacity = "1";
        }
        if (parseFloat(element.style.opacity) > 0) {
            const opacity = parseFloat(element.style.opacity) - 0.1;
            element.style.opacity = opacity.toString();
        }
        else {
            clearInterval(fadeEffect);
            element.style.display = "none";
        }
    }, 10);
}
function show(element, display = null) {
    assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    if (display) {
        assert(display.constructor === String, "display must be a valid string");
    }
    element.style.opacity = "0";
    element.style.display = display !== null && display !== void 0 ? display : "block";
    (function fade() {
        let val = parseFloat(element.style.opacity);
        if (!((val += 0.05) > 1)) {
            element.style.opacity = `${val}`;
            requestAnimationFrame(fade);
        }
    })();
}
class ActiveElement {
    constructor(selector) {
        this._element = document.querySelector(selector);
        if (!this._element) {
            throw new Error(`Failed to Find element with selector '${selector}'`);
        }
        this._selector = selector;
    }
    get(selector = null) {
        selector = selector ? `${this._selector} ${selector}` : this._selector;
        this._element = document.querySelector(selector);
        if (!this._element) {
            throw new Error(`It seems that element with selector '${selector}' does not exist in the DOM`);
        }
        return this._element;
    }
}
class Store {
    constructor(name, options) {
        let default_options = {
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
    _check_initialized() {
        return localStorage.getItem(this._name) !== null;
    }
    _write() {
        const dataJSON = JSON.stringify(this._data);
        localStorage.setItem(this._name, dataJSON);
    }
    _read() {
        const dataJSON = localStorage.getItem(this._name);
        let data;
        if (dataJSON) {
            try {
                data = JSON.parse(dataJSON);
            }
            catch (_) {
                throw new Error("Store Data corrupted!");
            }
        }
        else {
            return {};
        }
        return data ? data : {};
    }
    _flush_store() {
        localStorage.remove(this._name);
    }
    store(data) {
        Object.assign(this._data, data);
        this._write();
    }
}
function assert(condition, message = null) {
    if (!condition) {
        throw new Error(message !== null && message !== void 0 ? message : "Assertion failed");
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
