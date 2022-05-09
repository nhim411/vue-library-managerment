# [Library Managerment](https://github.com/nhim411/vue-library-managerment)
Demo:
- Front-end: [Library Managerment](https://vue-library-managerment.vercel.app/l)
- Back-end: [Mock API Server](https://library-managerment-api.herokuapp.com/)

Source code:
- Front-end: [Library Managerment](https://github.com/nhim411/vue-library-managerment)
- Back-end: [Mock API Server](https://github.com/nhim411/mock-api-jwt-json-server)
- Project backlog: [Project backlog](https://docs.google.com/spreadsheets/d/1CwKm7DWyvOA_mvVzEZnbPoLYO4Y0va0vv6bpdztSXqw/edit?usp=sharing)

## Description
Library Managerment Website
- Front-end: vue 2, vuex, vue-router, axios, buefy
- Back-end: json-server, heroku

## Quick Start

Get code & install. Then use either [Vue CLI](#vue-cli-builds) or [Vite](#vite-builds) builds.

* [Get code & install](#get-code--install)
* [Vue CLI builds](#vue-cli-builds)
* [Vite builds](#vite-builds)

### Get code & install

#### Get the repo

* [Create new repo](https://github.com/nhim411) from this template
* &hellip; or clone the repo on GitHub

#### Install

`cd` to project's dir and run `npm install`

### Vue CLI builds

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

### Vite builds

[Vite](https://vitejs.dev) is next Generation Frontend Tooling featuring unbundled web-development

#### Compiles and hot-reloads for development
```
npm run build
```

#### Compiles and minifies for production
```
npm run build:vite
```

### Linting

#### Lint
```
npm run lint
```

#### Lints and fixes files

```
npm run lint:fix
```

#### Folder structure

```
api-collection/
src/
┣ api/
┃ ┣ axiosClient.js
┃ ┣ bookApi.js
┃ ┣ categoryApi.js
┃ ┗ userApi.js
┣ components/
┃ ┣ NavBar.vue
┃ ┣ NavBarMenu.vue
┃ ┣ Notification.vue
┃ ┣ ProfileUpdateForm.vue
┃ ┣ Tiles.vue
┃ ┣ TitleBar.vue
┃ ┗ UserAvatar.vue
┣ lang/
┃ ┣ en.js
┃ ┣ index.js
┃ ┗ vi.js
┣ router/
┃ ┗ index.js
┣ store/
┃ ┗ index.js
┣ utils/
┃ ┗ permission.js
┣ views/
┃ ┣ full-page/
┃ ┃ ┣ Login.vue
┃ ┃ ┗ ModalRegisterForm.vue
┃ ┣ BookCart.vue
┃ ┣ BookManager.vue
┃ ┣ BookManagerForm.vue
┃ ┣ BookManagerTable.vue
┃ ┣ CategoryManager.vue
┃ ┣ CategoryManagerForm.vue
┃ ┣ CategoryManagerTable.vue
┃ ┣ CreateUserForm.vue
┃ ┣ FullPage.vue
┃ ┣ Home.vue
┃ ┣ NotFound.vue
┃ ┣ Profile.vue
┃ ┣ UserManager.vue
┃ ┗ UserManagerTable.vue
┣ App.vue
┣ main.js
┗ menu.js
```