import doc from '../dist/doc.js';

window.doc = doc;

if (doc.exists([
  '#sample_form',
  '#sample_form input[for="name"]',
  '#sample_form input[for="password"]',
  '#sample_form input[for="conf_password"]'
])) {
  const form_element = doc.select('#sample_form');
  const get_name = doc.selectActive('#sample_form input[for="name"]');
  const get_pwd = doc.selectActive('#sample_form input[for="password"]');
  const get_conf_pwd = doc.selectActive('#sample_form input[for="conf_password"]');

  form_element
    .addEventListener('submit', (e) => {
      e.preventDefault();

      const data = {
        name: get_name().value,
        password: get_pwd().value,
        conf_password: get_conf_pwd().value
      };

      doc.emit('form_submit', data);
    });
}

document.addEventListener('form_submit', (e) => {
  console.log('Captured Data :: ', e.detail);
});


if(doc.exists(['[role="link"]'])) {
  const link = doc.select('[role="link"]');
  link.addEventListener('click', (e) => {
    const href = doc.getData(e.target, 'href');
    doc.redirect(href);
  });
}