import {findDOM_node} from './findDOM_node.js';
import {smoothScroll} from './smoothScroll.js';
import {errorPopup} from './loading-popup.js';
const cache = new Map();

function getProjectTemplateContent(selector) {
	const templateContent = findDOM_node(selector).content.cloneNode(true);

	return templateContent;
}

const getCurrentPageLanguage = () => {
	return sessionStorage.getItem('language') ?? 'en';
};

const getQuantityVisibleProjects = () => {
	return findDOM_node('.works__project-item', 'multiElems')?.length;
};

const cacheServerResponse = (response) => {
	if (cache.has(response)) return;

	cache.set('projects', response);
};

const asyncLoadProjects = async () => {
	try {
		const rowResponse = await fetch('../projects/projects.json');
		const response = await rowResponse.json();

		cacheServerResponse(response);

		return response;
	} catch (error) {
		errorPopup();
		console.log('Error occured while loading the projects data', error.message);
	}
};

async function asyncImageLoading(imgElement) {
	return await new Promise((resolve, reject) => {
		imgElement.addEventListener('load', (e) => {
			return resolve(e);
		});

		imgElement.addEventListener('error', (e) => {
			return reject(e);
		});
	});
}

function fillOutProjectTemplate(projectTempalte, sectionSelector, content) {
	const sectionElement = findDOM_node(
		sectionSelector,
		null,
		projectTempalte.firstElementChild
	);

	switch (sectionElement.tagName.toLowerCase()) {
		case 'img':
			sectionElement.setAttribute('src', content);
			break;
		case 'a':
			sectionElement.setAttribute('href', content);
			break;

		default:
			sectionElement.innerHTML = content;
			break;
	}
}

function initProjectItemStyle(template, visibility, position) {
	template.style.visibility = visibility;
	template.style.position = position;
}
function animateNewAddedProject(selector) {
	const addedProject = document.querySelector(selector);
	initProjectItemStyle(addedProject, 'visible', 'relative');

	addedProject.classList.add('animate__animated', 'animate__backInUp');
}

async function asyncAddNewProject({
	imgURL,
	title,
	description,
	technologies,
	codeLink,
	liveDemoLink,
}) {
	const projectsContainer = findDOM_node('.works__project-wrapper');
	const templateContent = getProjectTemplateContent('#project-template');

	initProjectItemStyle(templateContent.firstElementChild, 'hidden', 'absolute');

	fillOutProjectTemplate(templateContent, 'img', imgURL);
	const img = findDOM_node('img', null, templateContent.firstElementChild);

	fillOutProjectTemplate(templateContent, 'h6', title);
	fillOutProjectTemplate(templateContent, '.works__description', description);
	fillOutProjectTemplate(templateContent, '.works__tech-section', technologies);
	fillOutProjectTemplate(templateContent, '.works__git-link', codeLink);
	fillOutProjectTemplate(templateContent, '.works__online-link', liveDemoLink);

	projectsContainer.appendChild(templateContent);

	await asyncImageLoading(img)
		.then(() => {
			animateNewAddedProject('.works__project-item:last-child');
		})
		.catch((err) => {
			errorPopup();
			console.log('Error while asyncImageLoading', err.message);
		});
}

export function changeProjectQuantityIndicator(indexOfNextLoadedProject = 10) {
	const projectQuantityIndicator = findDOM_node(
		'.load-button-block__q-indicator'
	);

	const nextQuantityVisibleProjects =
		indexOfNextLoadedProject <= 9 ? indexOfNextLoadedProject : 2;

	projectQuantityIndicator.textContent = `${nextQuantityVisibleProjects} / 9`;
}

const setUpDefaultButtonAppirance = (button) => {
	if (!button) return;

	button.textContent = 'Explore more';
	button.parentElement.classList.remove('delete');
};

export function deleteAddedProjects() {
	const allVisibleProjects = findDOM_node('.works__project-item', 'multiElems');

	for (let i = allVisibleProjects.length - 1; i >= 2; i--) {
		const certainProject = allVisibleProjects[i];
		certainProject.classList.add('animate__animated', 'animate__bounceOut');

		const timeId = setTimeout(() => {
			certainProject.remove();

			clearTimeout(timeId);
		}, 800);
	}
}

function handleProjectDeleting(button) {
	deleteAddedProjects();
	setUpDefaultButtonAppirance(button);
	changeProjectQuantityIndicator();

	setTimeout(() => {
		smoothScroll(null, button);
	}, 900);
}

function changeLoadButton(button, indexOfNextLoadedProject, isLoading) {
	if (isLoading) {
		button.textContent = 'Loading...';
		button.parentElement.classList.add('delete');
	}

	if (indexOfNextLoadedProject > 8) {
		button.textContent = 'Remove the added projects';
		button.parentElement.classList.add('delete');
	}
}
const handleLoadMoreProjects = async (e) => {
	const targetButton = e.target;
	const indexOfNextLoadedProject = getQuantityVisibleProjects() + 1;

	if (indexOfNextLoadedProject > 9) {
		handleProjectDeleting(targetButton);
		setUpDefaultButtonAppirance(targetButton);
		return;
	}

	changeLoadButton(targetButton, null, true);

	const currentLang = getCurrentPageLanguage();
	const {projects} = cache.get('projects') ?? (await asyncLoadProjects());
	const projectObj = projects[indexOfNextLoadedProject][currentLang];

	asyncAddNewProject(projectObj)
		.then(() => {
			setUpDefaultButtonAppirance(targetButton);
			changeProjectQuantityIndicator(indexOfNextLoadedProject);
			changeLoadButton(targetButton, indexOfNextLoadedProject, null);
		})
		.catch((err) => {
			errorPopup(errorPopup);
			console.log('Error while asyncAddNewProject', err);
		});
};

export function loadingProjects(loadButtonSelector) {
	const loadingBtn = findDOM_node(loadButtonSelector);

	loadingBtn && loadingBtn.addEventListener('click', handleLoadMoreProjects);
}
