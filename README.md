# Angular E‑Commerce App

A simple Angular 16.2 e‑commerce demo with authentication (signin/signup), forgot/reset password flow, protected routes, profile page, and feedback form.

## Features

* Login / Signup (JWT token)
* products viewing and pagination with multi categories and brands
* Forgot password flow (request reset code, verify code, reset password)
* Protected routes using `authGuard`
* Profile page showing decoded username from token
* Feedback form with toast notifications
* HTTP services using `HttpClient`

## Tech stack

* Angular 16.2
* RxJS
* Angular Forms (Reactive + Template-driven)
* `@angular/common/http` (HttpClient)
* `ngx-toastr`
* Bootstrap (or other CSS framework)

## Setup & Run Locally

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
ng serve --open
```

Project will run at `http://localhost:4200`

# MyProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
