/**
 * 
 *    My collection of useful DOM Manipulation functions
 *    Unlike jQuery, errors will not go unnoticed!
 * 
*/

/**
 *  shortcut for document.querySelector 
 *  with error handling
 * 
*/
window.select = (selector) => {
  const elem = document.querySelector(selector);
  if (!elem) throw `Element with selector "${selector}" not found.`;
  return elem;
};


/**
 *  shortcut for document.querySelectorAll
 *  with error handling
 * 
*/
window.selectAll = (selector) => {
  const elems = document.querySelectorAll(selector);
  if (!elems) throw `Elements with selector "${selector}" not found.`;
  return elems;
};


/**
 *  check if element exists
 * 
*/
window.exists = (selector) => {
  return document.querySelector(selector) === null;
};


/**
 *  add event listener to element with it's selector
 *  
*/
window.listen = (selector, event_name, callback) => {
  const element = select(selector);

  if (element) {
    element.addEventListener(event_name, callback);
  }
};


/**
 *  find element height
 * 
*/
window.height = (element) => {
  return element.offsetHeight;
};


/**
 *  find element width
 * 
*/
window.height = (element) => {
  return element.offsetWidth;
};


/**
 *  get element position relative to top of the page
 * 
*/
window.distanceFromTop = (element) => {
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return (rect.top + scrollTop);
};


/**
 *  smooth scroll to element
 * 
*/
window.scrollToElement = (element, options = {}) => {
  const default_options = {
    smooth: true,
    topOffset: 0,
  };

  Object.assign(default_options, options);

  const topPixels = window.distanceFromTop(element);

  window.scroll({
    top: topPixels - default_options.topOffset,
    behavior: (default_options.smooth) ? 'smooth' : 'auto',
  })
};


/**
 *  get all data attributes for an element
 * 
*/
window.getData = (element, data_name = null) => {
  if (data_name) return element.dataset[data_name];
  return element.dataset;
};


/**
 *  get all attributes for an element
 * 
*/
window.getAttibutes = (element, attriute_name = null) => {
  const attributes = element.attributes;

  if (attriute_name) {
    return attributes[attriute_name].textContent;
  }

  const result = [];

  for (let i = 0; i < attributes.length; i++) {
    result.push({
      attribute: attributes[i].name,
      value: attributes[i].textContent
    });
  }

  return result;
};


/**
 *  hide elements from DOM
 * 
*/
window.hide = (element) => {
  element.style.display = 'none';
};


/**
 *  show hidden elements in DOM
 * 
*/
window.show = (element) => {
  element.style.display = 'contents';
};