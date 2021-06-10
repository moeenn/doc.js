import doc from '../dist/doc.js';

window.doc = doc;
/*

const tree = doc.element("div", {}, 
  doc.element("h1", {name: "heading"}, "Sample Heading"),
  doc.element("input", {type: "number"})
) 

const input = doc.select("input")
doc.insertBefore(input, tree)

*/