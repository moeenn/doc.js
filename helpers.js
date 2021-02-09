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

window.hide = (element) => {
  element.style.display = 'none';
};

window.show = (element) => {
  element.style.display = 'contents';
};