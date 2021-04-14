import doc from '../dist/doc.js';

window.doc = doc;

doc.listen(document, "DOMContentLoaded", main);
async function main() {
  const form_exists = await doc.exists(["#sample_form"]);
  if (form_exists) {
    const form_element = await doc.select("#sample_form");
    console.log(form_element);
  }
}