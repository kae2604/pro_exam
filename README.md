# DIPLOMA PROJECT

# Тема

Розробка клієнтської частини інтернет-магазину з використанням React

# Мета проєкту

Створити сучасний вебзастосунок інтернет-магазину з адаптивним інтерфейсом, каталогом товарів, пошуком, фільтрацією, авторизацією, кошиком та оформленням замовлення.

# Технологічний стек

- [React](https://react.dev/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) для роботи з API, кешування та керування серверним станом
- [React Hook Form](https://react-hook-form.com/) для роботи з формами
- [shadcn/ui](https://ui.shadcn.com/) для UI-компонентів
- [PropTypes](https://legacy.reactjs.org/docs/typechecking-with-proptypes.html) для перевірки props у JavaScript-компонентах
- [DummyJSON API](https://dummyjson.com/docs) як джерело даних

# Джерела для реалізації

- UI-прототип: [готовий безкоштовний Figma template інтернет-магазину](https://www.figma.com/design/IXjx6y1O85gCiN0A6mKHCb/E-commerce-Website-Template--Freebie---Community-?node-id=0-1&p=f&t=peiZhBKPhun1zhLP-0)
- API: [DummyJSON](https://dummyjson.com/docs)
- Компоненти: [shadcn/ui](https://ui.shadcn.com/)
- Стан застосунку: [Redux Toolkit + RTK Query](https://redux-toolkit.js.org/rtk-query/overview)

# Основний функціонал

- перегляд списку товарів
- пошук товарів
- фільтрація за категоріями та іншими параметрами
- сторінка окремого товару
- додавання товарів до кошика
- зміна кількості товарів у кошику
- авторизація користувача
- форма оформлення замовлення
- відображення станів loading, error, empty
- адаптивна верстка для desktop і mobile

# Роль API у проєкті

DummyJSON використовується для отримання даних про користувачів, товари, кошики та для імітації авторизації. Це дозволяє побудувати повноцінний frontend-проєкт без розробки власного backend.

# Роль state management

Redux Toolkit використовується для глобального стану застосунку, а RTK Query — для запитів до API, кешування даних, повторного використання відповідей сервера та спрощення роботи з асинхронною логікою.

# Роль форм

React Hook Form використовується для реалізації форм авторизації, оформлення замовлення та інших сценаріїв введення даних з валідацією та керуванням станом полів.

# Роль UI-бібліотеки

shadcn/ui використовується для побудови сучасного інтерфейсу на базі готових компонентів, зокрема кнопок, полів введення, checkbox, dialog, select та інших елементів. Checkbox у shadcn/ui побудований на базі Radix UI.

# Результат проєкту

У результаті має бути реалізований frontend інтернет-магазину, який демонструє роботу з REST API, сучасний підхід до побудови інтерфейсів на React, керування локальним і серверним станом, роботу з формами та компонентний підхід до розробки.