const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '20675332-a9702851f51ed62280a08ad8f';

export default class ImagesApiService {
  constructor(selector) {
    this.page = 1;
    this.searchQuery = '';
    this.selector = selector;
  }

  async fetchImages() {
    if (this.searchQuery.trim()) {
      const response = await fetch(
        `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`,
      );
      const result = await response.json();
      return result;
    }
    return;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
