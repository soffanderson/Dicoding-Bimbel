import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';

console.log('Hello Coders! :)');

const hero = document.querySelector('.hero');
const main = document.querySelector('main');
const drawer = document.querySelector('#drawer');
const checkbox = document.querySelector('#openMenu');

document.addEventListener('keyup', function (e) {
  if (e.keyCode == 32 || e.keyCode == 13) {
    drawer.classList.toggle('open');
    if (checkbox.checked == true) {
      checkbox.checked = false;
    } else {
      checkbox.checked = true;
    }
  }
});

checkbox.addEventListener('click', function () {
  drawer.classList.toggle('open');
  event.stopPropagation();
});

hero.addEventListener('click', function () {
  drawer.classList.remove('open');
  checkbox.checked = false;
});

main.addEventListener('click', function () {
  drawer.classList.remove('open');
  checkbox.checked = false;
});
