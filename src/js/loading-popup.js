export function loadingPopup() {
	const popup = document.createElement('dialog');
	popup.setAttribute('open', true);

	popup.style.cssText = `
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    z-index: 999;
    background-color: green;
    opacity: .5;
  `;

	document.body.prepend(popup);
}
