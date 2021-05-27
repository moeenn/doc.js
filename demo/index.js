import doc from '../dist/doc.js';

window.doc = doc;

document.addEventListener("DOMContentLoaded", async () => {
  const form_exists = await doc.exists(["#sample_form"])
  if (form_exists) {
    const form_element = await doc.select("#sample_form")
    doc.hide(form_element)
  }
})