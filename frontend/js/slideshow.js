let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  // On récupère toutes les slides
  let slides = document.getElementsByClassName("mySlides");
  
  // On commence par cacher toutes les slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  
  // On passe à l'index suivant
  slideIndex++;
  
  // Si on est arrivé à la fin, on recommence au début
  if (slideIndex > slides.length) {
      slideIndex = 1;
  }
  
  // On affiche la slide actuelle
  slides[slideIndex-1].style.display = "block";  
  
  // On recommence cette fonction dans 10000 millisecondes (10 secondes)
  setTimeout(showSlides, 10000); 
}