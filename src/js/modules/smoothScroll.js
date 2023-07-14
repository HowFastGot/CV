import {findDOM_node} from './findDOM_node.js';
import {focusFormInput} from './handleFocusForm.js';

export function smoothScroll(tooltip = null, acordionElement = null) {
	if (tooltip) {
		tooltip.addEventListener('click', (e) => {
			e.preventDefault();

			const targetId = tooltip.getAttribute('href');
			const targetElement = findDOM_node(targetId);

			targetElement.scrollIntoView({
				behavior: 'smooth',
			});

			if (targetElement.getAttribute('id') === 'sendmessage') {
				focusFormInput();
			}
		});
	} else {
		acordionElement.parentElement.scrollIntoView({
			scrollIntoViewOptions: {
				behavior: 'smooth',
			},
		});
	}
}
