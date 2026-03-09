let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" enabled", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " enabled";
}

document.addEventListener("DOMContentLoaded", function () {
    function loadProjects() {
        fetch("json/experience.json")
            .then(response => response.json())
            .then(savedProjects => {
                const projectsGrid = document.querySelector(".projects-grid");
                if (!projectsGrid) return;
                projectsGrid.innerHTML = "";
                savedProjects.forEach(project => {
                    const newProject = document.createElement("div");
                    newProject.classList.add("project-card");
                    newProject.innerHTML = `
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">More Info</a> 
                    `;
                    newProject.addEventListener('click', function(event) {
                        if (event.target.closest('.project-link')) {
                            return; 
                        }
                        newProject.classList.toggle('expanded');
                    });
                    projectsGrid.appendChild(newProject);
                });
            })
            .catch(error => console.error("Error loading projects:", error));
    }

    loadProjects();
});