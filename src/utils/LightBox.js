import * as basicLightbox from 'basiclightbox';

let instance;
let createModalWindowMarkup;

function LightboxWindow(src, alt) {
  createModalWindowMarkup = `<div class = "modal"><img class = "modal_image" src = "${src}" alt="${alt}"/></div> `;
  instance = basicLightbox.create(createModalWindowMarkup, {
    closable: true,
  });
  instance.show();
}

export { LightboxWindow, instance };
