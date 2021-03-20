export default class LoadMoreBtn {
  constructor() {
    this.refs = this.getRefs();
  }

  getRefs() {
    const refs = {};
    refs.button = document.querySelector('.load-button');
    refs.label = refs.button.querySelector('.label');

    return refs;
  }

  enable() {
    this.refs.button.disabled = false;
    this.refs.label.textContent = 'Load more';
  }

  disable() {
    this.refs.button.disabled = true;
    this.refs.label.textContent = 'Loading...';
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}
