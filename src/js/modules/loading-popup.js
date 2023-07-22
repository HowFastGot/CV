export function errorPopup() {
	const body = document.body;

	const popup = document.createElement('dialog');
	popup.innerHTML =
		'<div>Connection issues. Refresh page or establish the connection!</div>';
	popup.setAttribute('open', true);

	popup.style.cssText = `
    position: fixed;
    left: 0;
    top: 0;
    line-height: 100vh;
    width: 100vw;
    z-index: 999;
    background-color: red;
    opacity: .8;

    text-align: center;
    color: white;
    white-space: wrap;
    font-size: 40px;
  `;

	body.style.overflow = 'hidden';
	body.prepend(popup);
}
