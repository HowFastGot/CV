import { findDOM_node } from "./findDOM_node.js"


const cache = new Map();

const getCurrentPageLanguage = () => {
     return sessionStorage.getItem("language") ?? "en";
}

const getQuantityVisibleProjects = () => {
     return findDOM_node(".works__project-item", "multiElems")?.length;
}

const cacheServerResponse = (response) => {
     if (cache.has(response)) return;

     cache.set("projects", response)
};

const asyncLoadProjects = async () => {

     try {
          const rowResponse = await fetch("../projects/projects.json");
          const response = await rowResponse.json();

          cacheServerResponse(response);

          return response;

     } catch (error) {
          console.log("Error occured while loading the projects data", error.message);
     }
}

const addNewProject = ({ imgURL, title, description, technologies, codeLink, liveDemoLink }) => {
     const templateContent = findDOM_node("#project-template").content.cloneNode(true);
     const projectsContainer = findDOM_node(".works__project-wrapper");

     const img = findDOM_node("img", null, templateContent.firstElementChild);
     img.setAttribute("src", imgURL);

     const projectTitle = findDOM_node("h6", null, templateContent.firstElementChild);
     projectTitle.textContent = title;

     const projectDescription = findDOM_node(".works__description", null, templateContent.firstElementChild);
     projectDescription.innerHTML = description;

     const projectTechnologies = findDOM_node(".works__tech-section", null, templateContent.firstElementChild);
     projectTechnologies.innerHTML = technologies;

     const projectCodeLink = findDOM_node(".works__git-link", null, templateContent.firstElementChild);
     projectCodeLink.setAttribute("href", codeLink);

     const projectLiveDemoLink = findDOM_node(".works__online-link", null, templateContent.firstElementChild);
     projectLiveDemoLink.setAttribute("href", liveDemoLink);

     projectsContainer.appendChild(templateContent);
     document.querySelector(".works__project-item:last-child").classList.add("animate__animated", "animate__backInUp");
}

export const changeProjectQuantityIndicator = (indexOfNextLoadedProject = 10) => {
     const projectQuantityIndicator = findDOM_node(".load-button-block__q-indicator");

     const nextQuantityVisibleProjects = (indexOfNextLoadedProject <= 9) ? indexOfNextLoadedProject : 2;

     projectQuantityIndicator.textContent = `${nextQuantityVisibleProjects} / 9`;

}

const setUpDefaultButtonAppirance = () => {
     const button = findDOM_node(".load-button-block__button-load");

     button.textContent = "Explore more";
     button.parentElement.classList.remove("delete");
}

export const deleteAddedProjects = () => {
     const allVisibleProjects = findDOM_node(".works__project-item", "multiElems");

     for (let i = allVisibleProjects.length - 1; i >= 2; i--) {

          const certainProject = allVisibleProjects[i];
          certainProject.classList.add("animate__animated", "animate__bounceOut");

          const timeId = setTimeout(() => {
               certainProject.remove();

               clearTimeout(timeId);
          }, 800);

     }

     setUpDefaultButtonAppirance();
     changeProjectQuantityIndicator();
};

const handleLoadMoreProjects = async (e) => {
     const targetButton = e.target;
     const indexOfNextLoadedProject = getQuantityVisibleProjects() + 1;


     if (indexOfNextLoadedProject > 9) {
          deleteAddedProjects(targetButton);
          setUpDefaultButtonAppirance();
          return;
     }

     changeProjectQuantityIndicator(indexOfNextLoadedProject);

     const currentLang = getCurrentPageLanguage();

     if (indexOfNextLoadedProject > 8) {
          targetButton.textContent = "Remove the added projects";
          targetButton.parentElement.classList.add("delete");
     }

     const { projects } = cache.get("projects") ?? await asyncLoadProjects();
     const projectObj = projects[indexOfNextLoadedProject][currentLang];

     addNewProject(projectObj);
};



export function loadingProjects(loadButtonSelector) {
     const loadingBtn = findDOM_node(loadButtonSelector);

     loadingBtn && loadingBtn.addEventListener("click", handleLoadMoreProjects)
}