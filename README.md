# FastCompany

Ссылка на итоговый готовый (дипломный проект)[https://a7776-c5e1.a.d-f.pw].

Проект написан в процессе обучения на курсе **Junior Frontend Developer** (ИП Владилен Минин), основной стэком Frontend-фреймворков при написании проекта был React/Redux

Основные задействованные библиотеки:

- Использование **Auth Route** для ограничения доступа неавторизованных пользователей;
- Ограничение доступа к данным реализовано на базе написания пользовательского запроса с авторизацией в БД **FireBase Realtime** (signIn/signOut);
- Хранение данных **MongoDB (NoSQL)**, сущности представлены в виде mongo model;
- Пользовательский интерфейс (объекты, диалоги и анимации) реализованы на базе библиотеки **BootStrap**;
- Реализация взаимодействия Front-Back по протоколу HTTP (сервис `REST API`) на базе библиотеки **axios**;
- Backеnd классическая реализация MERN (MongoDB - Express - React - NodeJS);
- Валидация данных форм на сервере с использование библиотеки **Express Validation/Schema validation**;
- Cоздание и валидация токенов для работы с БД и продление access token с помощью библиотеки **JWT**;
- Хранение хэш пароля и его проверка в **bcrypt**.

# О проекте
Основная концепция - регистрация и управление пользователями (фильтрация/пагинация/сортировка/редактирование), включая возможность дополнительного комментирования.

Целью проекта является изучение основных практик написания клиент-серверных приложений с использованием фреймворка **React** и часто используемого стэка модулей MERN (**Mongo Express React NodeJS**).

Проект включает в себя возможности:
- регистрация/авторизация пользователей (**FireBase restAPI**);
- ручное управление отображением пользователей (управление таблицей вывода/сортировка/фильтрация по профессии/добавление в избранное);
- редактирование профиля;
- добавление комментариев.

Стилизация и `тюнинг` графических элементов на базе библиотеки **MaterialUI** (multi selector) и **BootStrap**
