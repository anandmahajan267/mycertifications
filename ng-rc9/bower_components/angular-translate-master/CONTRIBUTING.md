# Contributing Guide

Contributing to <code>angular-translate</code> is fairly easy. This document shows you how to
get the project, run all provided tests and generate a production-ready build.

It also covers provided grunt tasks that help you develop with <code>angular-translate</code>.

## Dependencies

To make sure that the following instructions work, please install the following dependencies
on you machine:

- Node.js
- npm
- Git

If you install node through the binary installation file, **npm** will be already there.
When **npm** is installed, use it to install the needed npm packages:

- bower <code>npm install -g bower</code> (only required when running bower manually)
- grunt-cli <code>npm install -g grunt-cli</code>
- karma <code>npm install -g karma</code> (only required when running karma manually)

## Installation

To get the source of <code>angular-translate</code>, clone the git repository via:

````
$ git clone https://github.com/angular-translate/angular-translate
````

This will clone the complete source to your local machine. Navigate to the project folder
and install all needed dependencies via **npm**:

````
$ npm install
````

(This will invoke a `bower install` automatically.)

<code>angular-translate</code> is now installed and ready to be built.

## Building

<code>angular-translate</code> comes with a few **grunt tasks** that help you to automate
the development process. The following grunt tasks are provided:

#### <code>grunt</code>

Running <code>grunt</code> without any parameters will actually execute the registered
default task. This task is running both a **lint task** and a **test task**. Both tasks
make sure your JavaScript is written well.

#### <code>grunt test</code>

<code>grunt test</code> executes (as you might think) the unit tests, which are located
in <code>test/unit</code>. The task uses **karma**, the spectacular test runner, to execute the tests with the **jasmine testing framework**.

#### <code>grunt build</code>

You only have to use this task if you want to generate a production-ready build of
<code>angular-translate</code>. This task will also **lint**, **test** and **minify** the
source. After running this task, you'll find the following files in a generated
<code>dist</code> folder:

````
dist/angular-translate-x.x.x.js
dist/angular-translate-x.x.x.min.js
````

#### <code>grunt watch</code>

This task will watch all relevant files. When it notices a change, it'll run the
**lint** and **test** tasks. Use this task while developing on the source
to make sure that every time you make a change, you get notified if your code is inconsistent
or doesn't pass the tests.

#### <code>grunt dev</code>

This task extends `watch`. In addition, it will lint, test and copy the result into `demo/`.
After this, just like `watch`, it will run these steps every time a file has changed.
On top of that, this task supports **live reloading** (on default port).

This task works in harmony with `grunt server`.

#### <code>grunt server</code>

This task provides a simple http server on port `3005`. If you start it on your machine, you
have access to the project`s demos with real XHR operations.

Example: `http://localhost:3005/demo/async-loader/index.html`

Under the hood, we use a complete [Express](http://expressjs.com/) server stack. You will
find the server configuration at [server.js](server.js) and additional routes for our demos
at [demo/server_routes.js](demo/server_routes.js).

## Contributing/Submitting changes

- Check out a new branch based on <code>canary</code> and name it to what you intend to do:
  - Example:
    ````
    $ git checkout -b BRANCH_NAME origin/canary
    ````
    If you get an error, you may need to fetch canary first by using
    ````
    $ git remote update && git fetch
    ````
  - Use one branch per fix/feature
- Make your changes
  - Make sure to provide a spec for unit tests.
  - Run your tests with either <code>karma start</code> or <code>grunt test</code>.
  - In order to verify everything will work in the other test scopes (different AngularJS version), please run `npm run test-scopes`. If you are getting a dependency resolution issue, run `npm run clean-test-scopes` and try again.
  - When all tests pass, everything's fine.
- Commit your changes
  - Please provide a git message that explains what you've done.
  - ngTranslate uses [Brian's conventional-changelog task](https://github.com/btford/grunt-conventional-changelog), so please make sure your commits follow the [conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit)
  - Commit to the forked repository.
- Make a pull request
  - Make sure you send the PR to the <code>canary</code> branch.
  - Travis CI is watching you!

If you follow these instructions, your PR will land pretty safely in the main repo!
