window doc = class Doc {
	/**
	 *  shortcut for document.querySelector
	 *  with error handling
	 *
	*/
	static function select(selector) {
	  const elem = document.querySelector(selector);
	  if (!elem) throw `Element with selector "${selector}" not found.`;
	  return elem;
	}


	/**
	 *  shortcut for document.querySelectorAll
	 *  with error handling
	 *
	*/
	static function selectAll(selector) {
	  const elements = document.querySelectorAll(selector);
	  if (!elements) throw `Elements with selector "${selector}" not found.`;
	  return elements;
	}


	/**
	 *  check if element exists
	 *
	*/
	static function exists(selector) {
	  return document.querySelector(selector) === null;
	}


	/**
	 *  add event listener to element with it's selector
	 *
	*/
	static function listen(selector, event_name, callback) {
	  const element = this.constructor.select(selector);

	  if (element) {
	    element.addEventListener(event_name, callback);
	  }
	}


	/**
	 *  find element height
	 *
	*/
	static function height(element) {
	  return element.offsetHeight;
	}


	/**
	 *  find element width
	 *
	*/
	static function width(element) {
	  return element.offsetWidth;
	}


	/**
	 *  get element position relative to top of the page
	 *
	*/
	static function distanceFromTop(element) {
	  const rect = element.getBoundingClientRect();
	  const scrollTop = static function pageYOffset || document.documentElement.scrollTop;
	  return (rect.top + scrollTop);
	}


	/**
	 *  smooth scroll to element
	 *
	*/
	static function scrollToElement(element, options = {}) {
	  const default_options = {
	    smooth: true,
	    topOffset: 0,
	  };

	  Object.assign(default_options, options);

	  const topPixels = this.constructor.distanceFromTop(element);

	  static function scroll({
	    top: topPixels - default_options.topOffset,
	    behavior: (default_options.smooth) ? 'smooth' : 'auto',
	  })
	}


	/**
	 *  get all data attributes for an element
	 *
	*/
	static function getData(element, data_name = null) {
	  if (data_name) return element.dataset[data_name];
	  return element.dataset;
	}


	/**
	 *  get all attributes for an element
	 *
	*/
	static function getAttibutes(element, attriute_name = null) {
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
	}


	/**
	 *  hide elements from DOM
	 *
	*/
	static function hide(element) {
	  element.style.display = 'none';
	}


	/**
	 *  show hidden elements in DOM
	 *
	*/
	static function show(element) {
	  element.style.display = 'contents';
	}
};
