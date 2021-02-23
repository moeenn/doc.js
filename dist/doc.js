"use strict";
function select(selector) {
    const element = document.querySelector(selector);
    if (!element)
        throw `Element with selector "${selector}" not found.`;
    return element;
}
function selectAll(selector) {
    const elements = document.querySelectorAll(selector);
    if (!elements || elements.length === 0)
        throw `Elements with selector "${selector}" not found.`;
    return elements;
}
function exists(selector) {
    return document.querySelector(selector) !== null;
}
function listen(selector, event_name, callback) {
    const element = select(selector);
    if (element) {
        element.addEventListener(event_name, callback);
    }
}
function height(element) {
    return element.offsetHeight;
}
function width(element) {
    return element.offsetWidth;
}
function distanceFromTop(element) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return rect.top + scrollTop;
}
function scrollToElement(element, options = {}) {
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
    if (data_name) {
        const value = element.dataset[data_name];
        if (!value)
            throw new Error(`Element does not have a Data Attribute of '${data_name}'`);
        return value;
    }
    return element.dataset;
}
function getAttibutes(element) {
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
    Object.assign(element.style, styles);
}
function hide(element) {
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
function show(el, display) {
    el.style.opacity = "0";
    el.style.display = display !== null && display !== void 0 ? display : "block";
    (function fade() {
        let val = parseFloat(el.style.opacity);
        if (!((val += 0.05) > 1)) {
            el.style.opacity = `${val}`;
            requestAnimationFrame(fade);
        }
    })();
}
export class ActiveElement {
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
export class ActiveElements {
    constructor(selector) {
        this._elements = document.querySelectorAll(selector);
        if (!this._elements) {
            throw new Error(`Failed to Find elements with selector '${selector}'`);
        }
        this._selector = selector;
    }
    get(selector) {
        selector = `${this._selector} ${selector}`;
        const element = document.querySelector(selector);
        if (!element) {
            throw new Error(`It seems that elements with selector '${selector}' don't exist in the DOM`);
        }
        return element;
    }
    get_all() {
        this._elements = document.querySelectorAll(this._selector);
        if (!this._elements) {
            throw new Error(`It seems that elements with selector '${this._selector}' don't in the DOM`);
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
