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
    return [...elements];
}
function exists(selectors, target = document) {
    console.assert(selectors.constructor === Array &&
        selectors.every((i) => i.constructor === String), "'selectors' must be an Array of Strings");
    console.assert(target.constructor === HTMLDocument || target instanceof HTMLElement, "target must be of type HTMLDocument or HTMLElement");
    return selectors.every((selector) => {
        return target.querySelector(selector) !== null;
    });
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
function getData(element, data_name = null) {
    console.assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    if (data_name) {
        console.assert(data_name.constructor === String, "data_name must be a valid string");
    }
    if (data_name) {
        const value = element.dataset[data_name];
        if (value === undefined) {
            throw new Error(`Element does not have a Data Attribute of '${data_name}'`);
        }
        return value.length === 0 ? true : value;
    }
    let result = {};
    for (const [key, value] of Object.entries(element.dataset)) {
        if ((value === null || value === void 0 ? void 0 : value.length) === 0)
            result[key] = true;
    }
    return result;
}
function getAttibutes(element) {
    console.assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    const attributes = [...element.attributes];
    return attributes.reduce((accum, current) => {
        if (current.name.startsWith("data-"))
            return accum;
        return Object.assign(accum, { [current.name]: current.textContent });
    }, {});
}
function applyStyles(element, styles) {
    console.assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    console.assert(styles.constructor === Object, "styles must be a valid Object Literal");
    Object.assign(element.style, styles);
}
function hide(element) {
    console.assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    element.hidden = true;
}
function show(element) {
    console.assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    element.hidden = false;
}
function remove(element) {
    console.assert(element instanceof HTMLElement, "element must be a valid DOM Object");
    element.remove();
}
function redirect(url, new_tab = false) {
    var _a;
    console.assert(url.constructor === String || url.constructor === Location, "url must be a valid String or Location");
    if (new_tab) {
        (_a = window.open(url.toString(), "_blank")) === null || _a === void 0 ? void 0 : _a.focus();
        return;
    }
    window.location = url;
}
function insert(target_element, new_element, after = true) {
    console.assert(target_element instanceof HTMLElement, "target_element must be a valid DOM Object");
    console.assert(new_element instanceof HTMLElement, "new_element must be a valid DOM Object");
    if (after)
        insertAfter(target_element, new_element);
    if (!after)
        insertBefore(target_element, new_element);
}
function insertBefore(target_element, new_element) {
    target_element.before(new_element);
}
function insertAfter(target_element, new_element) {
    const parent = target_element.parentElement;
    if (!parent) {
        throw new Error("Provided element does not have a parent element");
    }
    parent.insertBefore(new_element, target_element.nextSibling);
}
function element(type, attributes = {}, ...children) {
    console.assert(type.constructor === String, "type must be a string");
    console.assert(attributes.constructor === Object, "attributes must be an Object literal");
    const elem = document.createElement(type);
    for (const [key, value] of Object.entries(attributes)) {
        elem.setAttribute(key, value);
    }
    children.forEach((e) => {
        if (e instanceof HTMLElement)
            elem.appendChild(e);
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
