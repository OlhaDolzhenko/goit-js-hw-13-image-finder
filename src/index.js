import './styles.css';
import cardTmpl from './templates/card-template.hbs';
import ImagesApiService from './js/images-service';
import getRefs from './js/get-refs';
import LoadMoreBtn from './js/components/load-more-btn';

const refs = getRefs();

const loadMoreBtn = new LoadMoreBtn();
const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', loadMore);

function onSearch(e) {
  e.preventDefault();
  imagesApiService.query = e.currentTarget.elements.query.value;

  if (imagesApiService.query.trim() === '') {
    clearResults();
    loadMoreBtn.hide();
    return alert('❗Incorrect request❗');
  } else {
    loadMoreBtn.show();
    imagesApiService.resetPage();
    clearResults();
    fetchImages();
  }
}

function fetchImages() {
  loadMoreBtn.disable();
  imagesApiService.fetchImages().then(images => {
    showResults(images);
    loadMoreBtn.enable();
  });
}

function showResults(images) {
  imagesApiService.incrementPage();
  refs.gallery.insertAdjacentHTML('beforeend', cardTmpl(images.hits));
}

function clearResults() {
  refs.gallery.innerHTML = '';
}

function loadMore() {
  loadMoreBtn.disable();
  const counter = imagesApiService.page;
  imagesApiService
    .fetchImages()
    .then(images => {
      showResults(images);
      loadMoreBtn.enable();
    })
    .then(() => windowScroll(counter));
}

function windowScroll(pages) {
  const y =
    (refs.gallery.clientHeight / pages) * (pages - 1) -
    document.querySelector('.header').clientHeight;
  window.scrollTo(0, y);
}
