import { warning } from './utils/pnotify';
import { LightboxWindow, instance } from './utils/LightBox';
import debounce from 'lodash.debounce';

import { galleryImage } from './api/apiService';
import { refs } from './utils/refs';
import templateItemsImage from './templates/image-card.hbs';

function submitHundler(event) {
  event.preventDefault();
}

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
      const scroling = window.innerHeight - refs.searchForm.offsetHeight;
      window.scrollBy({
        top: scroling,
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
  if (event.target.tagName !== 'IMG') return;

  const largeImg = event.target.dataset.source;
  const discription = event.target.alt;
  LightboxWindow(largeImg, discription);

  window.addEventListener('keydown', closeLightboxWindowByEsc);

  const basicLightBox = document.querySelector('div.modal');
  basicLightBox.addEventListener('click', closeOnClickWithBg);
}

function closeLightboxWindowByEsc({ keyCode }) {
  if (keyCode === 27) {
    instance.close();
    window.removeEventListener('keydown', closeLightboxWindowByEsc);
  }
}

function closeOnClickWithBg({ target, currentTarget }) {
  if (target !== currentTarget) return;
  instance.close();
}

refs.searchForm.addEventListener('input', debounce(searchImagesHundler, 500));
refs.searchForm.addEventListener('submit', submitHundler);
refs.loadMoreBtn.addEventListener('click', loadImageHundler);
refs.gallery.addEventListener('click', openLightboxWindow);
