import doc from '../dist/doc.js';

window.doc = doc;

if (doc.exists('#sample_form')) {
  const form_element = doc.selectActive('#sample_form');
  
  form_element()
  .addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
      name: doc.select('#sample_form input[for="name"]').value,
      password: doc.select('#sample_form input[for="password"]').value,
      conf_password: doc.select('#sample_form input[for="conf_password"]').value
    };

    console.log(data);
  });
}