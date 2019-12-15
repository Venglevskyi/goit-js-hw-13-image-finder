import { warning } from './utils/pnotify';
import debounce from 'lodash.debounce';
import { galleryImage } from './api/apiService';
import { refs } from './utils/refs';
import templateItemsImage from './templates/image-card.hbs';
import { ModalWindow } from './utils/modalWindow';

function searchImagesHundler(event) {
  event.preventDefault();

  let inputValue = event.target.value.toLowerCase();

  galleryImage.searchQuery = inputValue;

  clearMarkupItem();

  galleryImage
    .searchImages()
    .then(({ data }) => creatMarkupItem(data.hits))
    .then(markup => addedMarkupItem(markup));
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

// function openModalWindow (event) {
//   event.preventDefault();
//   const target = event.target;
//   galleryImage
//     .searchImages()
//     .then(data.map(e => e.hits.largeImageURL))
//     .then (markup => ModalWindow(markup))
// }

refs.searchForm.addEventListener('input', debounce(searchImagesHundler, 500));
refs.loadMoreBtn.addEventListener('click', loadImageHundler);
// refs.gallery.addEventListener('click', openModalWindow);
