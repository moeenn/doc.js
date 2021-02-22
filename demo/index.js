import doc from '../dist/doc.js';
window.doc = doc;

if (doc.exists('#app p')) {
  const para = doc.select('#app p');
  let visibility = true;

  doc.listen('button', 'click', (e) => {
    if (visibility) {
      doc.hide(para);
      visibility = false;
    } else {
      doc.show(para);
      visibility = true;
    }
  });
}