export function validateForm() {
     const nameInput = document.getElementById('name');
     const websiteInput = document.getElementById('link');
     const emailInput = document.getElementById('email');
     const commentInput = document.getElementById('message');

     const name = nameInput.value.trim();
     const website = websiteInput.value.trim();
     const email = emailInput.value.trim();
     const comment = commentInput.value.trim();

     // Функция для создания элемента уведомления
     function createNotificationElement(message) {
          const notification = document.createElement('div');
          notification.classList.add('notification');
          notification.textContent = message;
          return notification;
     }

     // Функция для добавления элемента уведомления над полем ввода
     function addNotification(inputElement, notificationElement) {
          inputElement.parentNode.insertBefore(notificationElement, inputElement);
     }

     // Проверка имени (не пустое)
     if (name === '') {
          const nameNotification = createNotificationElement('Введите имя!');
          addNotification(nameInput, nameNotification);
          nameInput.focus();
          return false;
     }

     // Проверка ссылки на сайт (не пустая, должна начинаться с http:// или https://)
     if (website === '') {
          const websiteNotification = createNotificationElement('Введите ссылку на сайт!');
          addNotification(websiteInput, websiteNotification);
          websiteInput.focus();
          return false;
     }
     if (!website.startsWith('http://') && !website.startsWith('https://')) {
          const websiteNotification = createNotificationElement('Ссылка на сайт должна начинаться с http:// или https://');
          addNotification(websiteInput, websiteNotification);
          websiteInput.focus();
          return false;
     }

     // Проверка email (не пустой, должен соответствовать простейшему паттерну)
     if (email === '') {
          const emailNotification = createNotificationElement('Введите email!');
          addNotification(emailInput, emailNotification);
          emailInput.focus();
          return false;
     }
     if (!/^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/.test(email)) {
          const emailNotification = createNotificationElement('Введите корректный email!');
          addNotification(emailInput, emailNotification);
          emailInput.focus();
          return false;
     }

     // Проверка комментария (не пустой)
     if (comment === '') {
          const commentNotification = createNotificationElement('Введите комментарий!');
          addNotification(commentInput, commentNotification);
          commentInput.focus();
          return false;
     }

     // Форма прошла валидацию
     return true;
}