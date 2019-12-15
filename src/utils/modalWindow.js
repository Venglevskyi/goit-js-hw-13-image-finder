import * as basicLightbox from 'basiclightbox';

function ModalWindow(src, tags) {
  const createModalWindowMarkup = `<div class = "modal"><img class = "modal_image" src = "${src}" alt=${tags}/></div> `;
  const instance = basicLightbox.create(createModalWindowMarkup, {
    closable: true,
  });
  return console.log(instance.show());
}

export { ModalWindow };
