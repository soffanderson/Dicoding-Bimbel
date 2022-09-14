function myFunction() {
    const nav = document.getElementById("nav-container");
    if (nav.className === "nav-bar") {
        nav.className += " mquery";
    } else {
        nav.className = "nav-bar";
    }
}

let slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
    showSlides((slideIndex += n));
}
function currentSlide(n) {
    showSlides((slideIndex = n));
}
function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
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

const currentTime = () => {
    const el = document.getElementById("jam");

    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();

    hh = hh < 10 ? `0${hh}` : hh;
    mm = mm < 10 ? `0${mm}` : mm;

    let time = `${hh}:${mm}`;
    el.innerHTML = time;
};

currentTime();
setInterval(currentTime, 1000);
