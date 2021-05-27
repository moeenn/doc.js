"use strict";
function select(selector, target = document) {
    console.assert(selector.constructor === String, "selector must be a valid string");
    console.assert(target.constructor === HTMLDocument || target instanceof HTMLElement, "target must be of type HTMLDocument or HTMLElement");
    const element = target.querySelector(selector);
    if (!element) {
        throw new Error(`Element with selector "${selector}" not found.`);
    }
    return element;
}
function selectAll(selector, target = document) {
    console.assert(selector.constructor === String, "selector must be a valid string");
    console.assert(target.constructor === HTMLDocument || target instanceof HTMLElement, "target must be of type HTMLDocument or HTMLElement");
    const elements = target.querySelectorAll(selector);
    if (!elements || elements.length === 0) {
        throw new Error(`Elements with selector "${selector}" not found.`);
    }
    return elements;
}
function exists(selectors, target = document) {
    console.assert(selectors.constructor === Array &&
        selectors.every((i) => i.constructor === String), "'selectors' must be an Array of Strings");
    console.assert(target.constructor === HTMLDocument || target instanceof HTMLElement, "target must be of type HTMLDocument or HTMLElement");
    let result = true;
    selectors.forEach((selector) => {
        const element = target.querySelector(selector);
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
    return true;
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
    return true;
}
function getData(element, data_name = null) {
    console.assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    if (data_name) {
        console.assert(data_name.constructor === String, "data_name must be a valid string");
    }
    if (data_name) {
        const value = element.dataset[data_name];
        if (!value) {
            throw new Error(`Element does not have a Data Attribute of '${data_name}'`);
        }
        return value;
    }
    return element.dataset;
}
function getAttibutes(element) {
    console.assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    const attributes = [...element.attributes];
    return attributes.map((attribute) => {
        return {
            attribute: attribute.name,
            value: attribute.textContent,
        };
    });
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
    if (!attribute.textContent) {
        throw error;
    }
    return attribute.textContent;
}
function applyStyles(element, styles) {
    console.assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    console.assert(styles.constructor === Object, "styles must be a valid Object Literal");
    Object.assign(element.style, styles);
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
    emit,
    redirect,
};
