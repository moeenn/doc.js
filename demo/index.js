import doc from '../dist/doc.js';
import {ActiveElement} from '../dist/doc.js';

window.doc = doc;

if (doc.exists('#app p')) {
  const form_element = new ActiveElement('#sample_form');
  
  form_element
  .get()
  .addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
      name: form_element.get('input[for="name"]').value,
      password: form_element.get('input[for="password"]').value,
      conf_password: form_element.get('input[for="conf_password"]').value
    };

    console.log(data);
  });
}