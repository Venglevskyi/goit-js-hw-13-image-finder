import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

class gallery {
  constructor(page = 1, query = '') {
    this.page = page;
    this.query = query;
  }

  searchImages() {
    const queryString = `?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=14591029-b9abf563857b66fab696140db`;
    return axios.get(queryString);
  }
  
  get searchQuery() {
    return this.query;
  }

  set searchQuery(string) {
    this.query = string;
  }

  incrementPage() {
    this.page += 1;
  }
}

export const galleryImage = new gallery();
