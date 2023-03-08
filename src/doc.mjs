"use strict"

export default {
  /**
   * shortcut for document.querySelector, with error handling
   *
   * @param {string} selector
   * @param {HTMLDocument | HTMLElement} [target]
   * @returns {HTMLElement}
   */
  select(selector, target = document) {
    console.assert(
      selector.constructor === String,
      "selector must be a valid string",
    )

    console.assert(
      target.constructor === HTMLDocument || target instanceof HTMLElement,
      "target must be of type HTMLDocument or HTMLElement",
    )

    /** @type {HTMLElement | null} */
    const element = target.querySelector(selector)

    if (!element) {
      throw new Error(`Element with selector "${selector}" not found.`)
    }

    return element
  },

  /**
   * shortcut for document.querySelectorAll, with error handling
   *
   * @param {string} selector
   * @param {HTMLDocument | HTMLElement} [target]
   * @returns {HTMLElement[]}
   */
  selectAll(selector, target = document) {
    console.assert(
      selector.constructor === String,
      "selector must be a valid string",
    )

    console.assert(
      target.constructor === HTMLDocument || target instanceof HTMLElement,
      "target must be of type HTMLDocument or HTMLElement",
    )

    /** @type {NodeListOf<HTMLElement> | null} */
    const elements = target.querySelectorAll(selector)

    if (!elements || elements.length === 0) {
      throw new Error(`Elements with selector "${selector}" not found.`)
    }

    return [...elements]
  },

  /**
   * check if element(s) exist in DOM
   *
   * @param {string[]} selectors
   * @param {HTMLDocument | HTMLElement} [target]
   * @returns {boolean}
   */
  exists(selectors, target = document) {
    console.assert(
      selectors.constructor === Array &&
      selectors.every((i) => i.constructor === String),
      "'selectors' must be an array of strings",
    )

    console.assert(
      target.constructor === HTMLDocument || target instanceof HTMLElement,
      "target must be of type HTMLDocument or HTMLElement",
    )

    return selectors.every((selector) => {
      return target.querySelector(selector) !== null
    })
  },

  /**
   * find element height
   *
   * @param {HTMLElement} element
   * @returns {number}
   */
  height(element) {
    console.assert(
      element instanceof HTMLElement,
      "element must be a valid DOM Object",
    )

    return element.offsetHeight
  },

  /**
   * find element width
   *
   * @param {HTMLElement} element
   * @returns {number}
   */
  width(element) {
    console.assert(
      element instanceof HTMLElement,
      "element must be a valid DOM Object",
    )

    return element.offsetWidth
  },

  /**
   * get element position relative to top of the page
   *
   * @param {HTMLElement} element
   * @returns {number}
   */
  distanceFromTop(element) {
    console.assert(
      element instanceof HTMLElement,
      "element must be a valid DOM Object",
    )

    const rect = element.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    return rect.top + scrollTop
  },

  /**
   * smooth scroll to element
   *
   * @param {HTMLElement} element
   * @param {object} [options]
   * @returns {boolean}
   */
  scrollToElement(element, options = {}) {
    console.assert(
      element instanceof HTMLElement,
      "element must be a valid DOM Object",
    )
    console.assert(
      options.constructor === Object,
      "options must be an Object Literal",
    )

    const defaultOptions = {
      smooth: true,
      topOffset: 0,
    }

    Object.assign(defaultOptions, options)

    const topPixels = this.distanceFromTop(element)

    window.scroll({
      top: topPixels - defaultOptions.topOffset,
      behavior: defaultOptions.smooth ? "smooth" : "auto",
    })

    return true
  },

  /**
   * scroll to the top of the document
   *
   * @param {object} options
   * @returns {boolean}
   */
  scrollToTop(options = {}) {
    console.assert(
      options.constructor === Object,
      "options must be an Object Literal",
    )

    let defaultOptions = {
      smooth: true,
      topOffset: 0,
    }

    defaultOptions = Object.assign(defaultOptions, options)

    window.scroll({
      top: defaultOptions.topOffset,
      behavior: defaultOptions.smooth ? "smooth" : "auto",
    })

    return true
  },

  /**
   * get all data attributes for an element
   *
   * @param {HTMLElement} element
   * @param {string | null} dataName
   * @returns {Record<string, unknown> | string}
   */
  getData(element, dataName = null) {
    console.assert(
      element instanceof HTMLElement,
      "element must be a valid DOM Object",
    )
    if (dataName) {
      console.assert(
        dataName.constructor === String,
        "dataName must be a valid string",
      )
    }

    if (dataName) {
      /** @type {string=}*/
      const value = element.dataset[dataName]
      if (!value) {
        throw new Error(
          `Element does not have a Data Attribute of '${dataName}'`,
        )
      }

      return value
    }

    /** @type {Record<string, unknown>} */
    let result = {}

    for (const [key, value] of Object.entries(element.dataset)) {
      if (value?.length === 0) result[key] = true
    }

    return result
  },

  /**
   * get all attributes for an element
   *
   * @param {HTMLElement} element
   * @returns {Record<string, unknown>}
   */
  getAttibutes(element) {
    console.assert(
      element instanceof HTMLElement,
      "element must be a valid DOM Object",
    )

    /** @type {Attr[]} */
    const attributes = [...element.attributes]

    return attributes.reduce((accum, current) => {
      if (current.name.startsWith("data-")) return accum
      return Object.assign(accum, { [current.name]: current.textContent })
    }, {})
  },

  /**
   * add css properties to element
   *
   * @param {HTMLElement} element
   * @param {Record<string, unknown>} styles
   * @returns {void}
   */
  applyStyles(element, styles) {
    console.assert(
      element instanceof HTMLElement,
      "element must be a valid DOM Object",
    )
    console.assert(
      styles.constructor === Object,
      "styles must be a valid Object Literal",
    )

    Object.assign(element.style, styles)
  },

  /**
   * hide element in DOM
   *
   * @param {HTMLElement} element
   * @returns {void}
   */
  hide(element) {
    console.assert(
      element instanceof HTMLElement,
      "element must be a valid DOM Object",
    )

    element.hidden = true
  },

  /**
   * show hidden element in DOM
   *
   * @param {HTMLElement} element
   * @returns {void}
   */
  show(element) {
    console.assert(
      element instanceof HTMLElement,
      "element must be a valid DOM Object",
    )

    element.hidden = false
  },

  /**
   * delete element from DOM
   *
   * @param {HTMLElement} element
   * @returns {void}
   */
  remove(element) {
    console.assert(
      element instanceof HTMLElement,
      "element must be a valid DOM Object",
    )

    element.remove()
  },

  /**
   * redirect to another page
   *
   * @param {Location} url
   * @param {boolean} [newTab]
   * @returns {void}
   */
  redirect(url, newTab = false) {
    console.assert(
      url.constructor === String || url.constructor === Location,
      "url must be a valid String or Location",
    )

    if (newTab) {
      window.open(url.toString(), "_blank")?.focus()
      return
    }

    window.location = url
  },

  /**
   * insert element in DOM
   *
   * @param {HTMLElement} targetElement
   * @param {HTMLElement} newElement
   * @param {boolean} [after]
   * @returns {void}
   */
  insert(targetElement, newElement, after = true) {
    console.assert(
      targetElement instanceof HTMLElement,
      "targetElement must be a valid DOM Object",
    )

    console.assert(
      newElement instanceof HTMLElement,
      "newElement must be a valid DOM Object",
    )

    if (after) this.insertAfter(targetElement, newElement)
    if (!after) this.insertBefore(targetElement, newElement)
  },

  /**
   * insert element before another element
   *
   * @param {HTMLElement} targetElement
   * @param {HTMLElement} newElement
   * @returns {void}
   */
  insertBefore(targetElement, newElement) {
    targetElement.before(newElement)
  },

  /**
   * insert an element after another element
   *
   * @param {HTMLElement} targetElement
   * @param {HTMLElement} newElement
   * @returns {void}
   */
  insertAfter(targetElement, newElement) {
    const parent = targetElement.parentElement
    if (!parent) {
      throw new Error("Provided element does not have a parent element")
    }

    parent.insertBefore(newElement, targetElement.nextSibling)
  },

  /**
   * create an HTML element
   *
   * @param {string} type
   * @param {Record<string, string>} attributes
   * @param {(HTMLElement | string)[]} children
   */
  element(type, attributes, ...children) {
    console.assert(type.constructor === String, "type must be a string")
    console.assert(
      attributes.constructor === Object,
      "attributes must be an Object literal",
    )

    // TODO: argument type checking on children

    /** @type {HTMLElement} */
    const elem = document.createElement(type)
    
    for (const [key, value] of Object.entries(attributes)) {
      elem.setAttribute(key, value)
    }

    children.forEach((e) => {
      if (e instanceof HTMLElement) elem.appendChild(e)
      if (e.constructor === String) {
        const node = document.createTextNode(e)
        elem.appendChild(node)
      }
    })

    return elem
  },
}
