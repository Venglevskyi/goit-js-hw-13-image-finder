import { warning } from './utils/pnotify';
import { LightboxWindow, instance } from './utils/LightBox';
import debounce from 'lodash.debounce';

import { galleryImage } from './api/apiService';
import { refs } from './utils/refs';
import templateItemsImage from './templates/image-card.hbs';

function searchImagesHundler(event) {
  event.preventDefault();

  let inputValue = event.target.value.toLowerCase();

  galleryImage.searchQuery = inputValue;

  clearMarkupItem();

  galleryImage
    .searchImages()
    .then(({ data }) => creatMarkupItem(data.hits))
    .then(markup => addedMarkupItem(markup))
    .catch(err => console.warn(err));
}

function loadImageHundler(event) {
  event.preventDefault();
  galleryImage.incrementPage();
  galleryImage
    .searchImages()
    .then(({ data }) => creatMarkupItem(data.hits))
    .then(markup => addedMarkupItem(markup))
    .then(() => {
      window.scrollBy({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    });
}

function creatMarkupItem(items) {
  if (items.length === 0) {
    warning();
  }
  return templateItemsImage(items);
}

function addedMarkupItem(items) {
  refs.gallery.insertAdjacentHTML('beforeend', items);
}

function clearMarkupItem() {
  refs.gallery.innerHTML = '';
}

function openLightboxWindow(event) {
  event.preventDefault();

  if (event.target.tagName !== 'IMG') return;

  refs.gallery.classList.add('modal');
  const largeImg = event.target.dataset.source;
  const discription = event.target.alt;
  LightboxWindow(largeImg, discription);

  window.addEventListener('keydown', closeLightboxWindowByEsc);

  const basicLightBox = document.querySelector('div.modal');
  basicLightBox.addEventListener('click', closeOnClickWithBg);
}

function closeLightboxWindowByEsc({ keyCode }) {
  if (keyCode === 27) {
    window.removeEventListener('keydown', closeLightboxWindowByEsc);
    refs.gallery.classList.remove('modal');
    instance.close();
  }
}

function closeOnClickWithBg({ target, currentTarget }) {
  console.log(target);
  if (target !== currentTarget) return;
  refs.gallery.classList.remove('modal');
  instance.close();
}

refs.searchForm.addEventListener('input', debounce(searchImagesHundler, 500));
refs.loadMoreBtn.addEventListener('click', loadImageHundler);
refs.gallery.addEventListener('click', openLightboxWindow);
