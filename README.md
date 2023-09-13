# Currency-converter

Load the project in your code editor then run `npm i` in your terminal, then run `ionic serve`, making sure you have the CLI installed on your machine.

## What is it?

This is a Currency converter app built using TypeScript, Angular, Ionic, RxJS, Jasmine and Karma. It uses the fixer API on the backend and also makes use of Angular animations and the ng-particles package. 

## Challenges

One of the main challenges I faced was using RxJS and the "subject as a service" style of state management. This meant simply subscribing to observables in my components and keeping any logic that manipulated them in the service itself. I managed this by brushing up on rxjs at rxjs.io and also following Joshua Moroney's videos on the subject on Youtube. 

## Features

- Convert euros to a selection of currencies as well as pick which amount
- Form uses validation to ensure correct inputs by user
- Particle background that reacts to user's mouse movements

## Development server

Run `ionic serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ionic generate component component-name` to generate a new component. You can also use `ionic generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ionic build` to build the project. The build artifacts will be stored in the `www/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
