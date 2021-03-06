"use strict";
function select(selector) {
    console.assert(selector.constructor === String, "selector must be a valid string");
    const element = document.querySelector(selector);
    if (!element)
        throw `Element with selector "${selector}" not found.`;
    return element;
}
function selectAll(selector) {
    console.assert(selector.constructor === String, "selector must be a valid string");
    const elements = document.querySelectorAll(selector);
    if (!elements || elements.length === 0)
        throw `Elements with selector "${selector}" not found.`;
    return elements;
}
function selectActive(selector) {
    return () => {
        const element = document.querySelector(selector);
        if (!element)
            throw new Error(`Element with selector "${selector}" not found.`);
        return element;
    };
}
function exists(selectors) {
    console.assert(selectors.constructor === Array &&
        selectors.every((i) => i.constructor === String), "'selectors' must be an Array of Strings");
    let result = true;
    selectors.forEach((selector) => {
        const element = document.querySelector(selector);
        if (!element)
            result = false;
    });
    return result;
}
function height(element) {
    console.assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    return element.offsetHeight;
}
function width(element) {
    console.assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    return element.offsetWidth;
}
function distanceFromTop(element) {
    console.assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return rect.top + scrollTop;
}
function scrollToElement(element, options = {}) {
    console.assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    console.assert(options.constructor === Object, "options must be an Object Literal");
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
    console.assert(options.constructor === Object, "options must be an Object Literal");
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
    console.assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    if (data_name) {
        console.assert(data_name.constructor === String, "data_name must be a valid string");
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
    console.assert(element instanceof HTMLElement, "element must be a valid DOM Object");
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
    console.assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    console.assert(attribute_name.constructor === String, "attribute_name must be a valid string");
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
    console.assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    console.assert(styles.constructor === Object, "styles must be a valid Object Literal");
    Object.assign(element.style, styles);
}
function hide(element) {
    console.assert(element instanceof HTMLElement, "element must be a valid DOM Object");
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
    console.assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    if (display) {
        console.assert(display.constructor === String, "display must be a valid string");
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
function emit(event_name, payload = null) {
    const event = new CustomEvent(event_name, {
        detail: payload,
    });
    document.dispatchEvent(event);
}
function redirect(url) {
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
