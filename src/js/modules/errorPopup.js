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
    height: 100vh;
    width: 100vw;
    z-index: 999;
    background-color: red;
    opacity: .8;

    text-align: center;
    line-height: 1.5;
    padding: 40vh 10vw;
    color: white;
    white-space: wrap;
    font-size: 30px;
  `;

	body.style.overflow = 'hidden';
	body.prepend(popup);
}
