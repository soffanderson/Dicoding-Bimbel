function myFunction() {
  let nav = document.getElementById("nav-container");
  if (nav.className === "nav-bar") {
    nav.className += " mquery";
  } else {
    nav.className = "nav-bar";
  }
}

var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides((slideIndex += n));
}
function currentSlide(n) {
  showSlides((slideIndex = n));
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
const changeName = document.getElementById("nama");
const firstName = prompt("Siapa namamu ?");

const user = {
  name: firstName,
};

changeName.innerHTML = "<strong>" + user.name + ".</strong>";

window.setTimeout("jam()", 1000);

function jam() {
  const now = new Date();
  // const current = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  // document.getElementById('jam').innerHTML = current;
  setTimeout("jam()", 1000);
  document.getElementById("jam").innerHTML = now.getHours();
  document.getElementById("menit").innerHTML = now.getMinutes();
}
