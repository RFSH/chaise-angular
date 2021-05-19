# Summary

## Table of contents
  * [IDE](#ide)
  * [Structure and Deployment](#structure-and-deployment)
  * [Angular and TypeScript](#angular-and-typescript)
  * [Promise vs. Observable](#promise-vs-observable)
  * [Using ERMrestJS](#using-ermrestjs)
    + [http module](#http-module)
    + [q module](#q-module)
  * [Change detection](#change-detection)
  * [Communication between components](#communication-between-components)
  * [HTML content (iframe)](#html-content--iframe-)
  * [Bootstrap](#bootstrap)
  * [Routing](#routing)
  * [Form](#form)
  * [ng-show alternative](#ng-show-alternative)
  * [AngularJS to Angular](#angularjs-to-angular)

## IDE

Since TypeScript is structured, using and IDE would help a lot. If you're using atom,
I suggest using `atom-ide-ui` and `atom-typescript` packages.

## Structure and Deployment

I used [Angular CLI](https://angular.io/cli) for creating the project and deploying it.

To structure the project I followed this tutorial:
https://octoperf.com/blog/2019/08/22/kraken-angular-workspace-multi-application-project/#angular-multi-application-project-creation-tutorial

The mentioned tutorial is very close to structure of chaise. We have separate apps
that use common libraries. So

```sh
# create the chaise project
ng new chaise --createApplication="false"

# create the applications
ng generate application recordset
ng generate application record
ng generate application recordedit

# create the shared libraries
ng generate components
ng generate tools

# example of adding a shared component to the components library
ng generate component table --project=components

# example of adding a shared service to tools
ng generate service table --project=tools
```

> By default Angular CLI will add e2e and unit test to each generated  component/app/etc.
>Since we don't want to make any changes to our test suit, we should use `--skip-tests` when we want to use this in Chaise. There might be some other parameters that
we might want to pass.

And then to build the applications I created a Makefile that does the following
to build the projects and then I'm just copying the build folders to the appropriate
location on the server:

```sh
ng build recordset --base-href=$(CHAISE_BASE_PATH)recordset/
ng build record --base-href=$(CHAISE_BASE_PATH)record/
ng build recordedit --base-href=$(CHAISE_BASE_PATH)recordedit/
```


Since I was doing this to test things out there are still other changes that we have
to do when we want to do this in chaise, we should

- Follow the tutorial to have SCSS files in one place.
- Remove unnecessary settings for test, server, and lint.
- Properly setup the test command


## Angular and TypeScript

Angular architecture is quite different from AngularJS and the two simple documents
help with understanding the new architecture:

- https://angular.io/guide/architecture
- https://angular.io/guide/lifecycle-hooks

About TypeScript:

- https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html

## Promise vs. Observable

- https://angular.io/guide/observables
- https://www.learnrxjs.io/learn-rxjs/concepts/rxjs-primer
- https://indepth.dev/posts/1287/rxjs-heads-up-topromise-is-being-deprecated
- https://stackoverflow.com/questions/50920833/how-can-we-get-httpclient-status-code-in-angular-4
- https://www.learnrxjs.io/learn-rxjs/operators/utility/topromise

## Using ERMrestJS

To configure ERMrestJS we have to provide http and q libraries:

### http module
The HTTP module in Angular ([HttpClient](https://angular.io/guide/http)) is not using
promise anymore and instead uses observable technique. To make this work, I had to
modify ERMrestJS a little bit, by modifying `http.js` like the following to convert
observables into promise:

```javascript
if (module._httpObservable) {
  fn.apply(scope, args).toPromise().then(succesFn).catch(errorFn);
} else {
  fn.apply(scope, args).then(succesFn).catch(errorFn);
}
```
The [`angular-changes`](https://github.com/informatics-isi-edu/ermrestjs/tree/angular-changes) branch in ERMrestJS has these changes.


### q module

For now we can simply include Q directly in the HTML and then provide it to ERMrestJS.
Based on [the current maintainor's comment](https://github.com/kriskowal/q/issues/827#issuecomment-366897835), trying to migrate Q into TypeScript is just pointless
and we should just move on to newer technolgies.


. But eventually we should modify ERMrestJS
to use proper observables or the ES6 Promise object directly.

## Change detection

- Instead of a digest cycle, Angular has a "detection" cycle. And instead of checking
all the objects and watchers, Angular is using [zone](https://angular.io/guide/zone)
to detect the changes automatically.

- There are two strategies of change detections, default and onPush:

  - https://blog.angular-university.io/how-does-angular-2-change-detection-really-work/
  - https://medium.com/technofunnel/angular-change-detection-strategy-onpush-and-default-strategy-edd8d41ba9ef
  - https://angular-2-training-book.rangle.io/change-detection


In my small example I used the default method, but it seems line onPush is more
favorable because of better performance. It just requires more work and understanding
of how Angular works.

## Communication between components

There are multiple ways that components (siblings, child/parent) can talk to each other. One way that is similar to AngularJS is through services and that's how
I implemented in my sample project. There is also concept of `@input` and `@output`
for each component:

  - https://lukeliutingchun.medium.com/angular-four-ways-for-communication-between-components-b743b9653f8
  - https://indepth.dev/posts/1381/immutability-importance-in-angular-applications

## HTML content (iframe)

The `ng-bind-html` alternative in Angular is `[innerHTML]`:

```html
<span *ngIf="!tableModel.displayname.isHTML">{{ tableModel.displayname.value }}</span>
<span *ngIf="tableModel.displayname.isHTML" [innerHTML]="tableModel.displayname.value"></span>
```

And the same way that `ng-bind-html` doesn't allow "unsafe" tags and we had to create
a filter, in Angular we need to create a [pipe](https://angular.io/guide/pipes).
Pipes are simple functions you can use in template expressions to accept an
input value and return a transformed value. And then in the pipe we can use the
`bypassSecurityTrustHtml` to trust the HTML content.

source: https://medium.com/@swarnakishore/angular-safe-pipe-implementation-to-bypass-domsanitizer-stripping-out-content-c1bf0f1cc36b

## Bootstrap

The following is the release schedule of Bootstrap (based on https://github.com/twbs/release):

| Release | Status          | Initial Release | Active LTS Start | Maintenance LTS Start | End-of-life |
| :-----: | :-------------: | :-------------: | :--------------: | :-------------------: | :---------: |
| [2.x][] | **End-of-life** | 2013-07-18      | -                | -                     | 2013-08-19  |
| [3.x][] | **End-of-life** | 2013-08-19      | 2014-11-01       | 2016-09-05            | 2019-07-24  |
| [4.x][] | **Active LTS**  | 2018-01-18      | 2019-11-26       | 2021-07-01            | 2022-07-01  |
| 5.x     | **TBD**         | TBD             | TBD              | TBD                   | TBD         |

[2.x]: https://getbootstrap.com/2.3.2/getting-started.html#download-bootstrap
[3.x]: https://getbootstrap.com/docs/3.4/getting-started/#download
[4.x]: https://getbootstrap.com/docs/4.5/getting-started/download/


And we're using 3.x. So we should upgrade our Bootstrap version as well. We're also
using Angular UI which only works with Bootstrap 3.x. So if we update Bootstrap,
we also have to change Angular UI. In the following I removed Bootstrap 3 (only
left the glyphicons) and added Bootstrap 4:
https://dev.rebuildingakidney.org/~ashafaei/chaise4/recordset/#2/Common:Collection

As you can see
- All the Angular UI elements are broken.
- Some spacing and borders are borken.

So to upgrade Bootstrap independently from AngularJS, we would have to replace all
the Angular UI elements which would is doable but requires some time. So we decided
that it doesn't make sense to do this before changing AngularJS. And since we have
to replace Angular UI with something that works with the new technology, it makes
sense to upgrade Bootstrap at the same time as AngularJS.

The Angular alternatives for AngularUI are:

- [ng-bootstrap](https://ng-bootstrap.github.io/#/home):
  - Newer than the other option
  - Only supports Bootstrap 4 and 5
  - Smaller and cleaner
- [ngx-bootstrap](https://valor-software.com/ngx-bootstrap)
  - Supports bootstrap 3 and 4.

In this sample project I tried both and I think ng-bootstrap is the clear winner.

## Routing

Angular router (https://angular.io/guide/router) works without any hash, so we should technically be able to use it.
But this requires Apache changes to ignore the path and instead let Angular handle it.
So most probably we don't want to use Routing and instead continue having separate apps.

## Form

- There are two different types of forms, Template-based and reactive: https://angular.io/guide/forms-overview

  The following is how you can create a form using `FormBuilder`:

  ```typescript
  this.fb.group({
    columnName: ["col value", setOfValidators],
    anotherColumn: [{value: "another col value", disabled: true}, anotherSetOfValidators],
  });
  ```
  Where `fb` is the injected `FormBuilder` API.

- We should use reactive forms as they allow modification of data in the code: https://angular.io/guide/reactive-forms

- We might want to use dynamic form to make the recordedit more modular:  https://angular.io/guide/dynamic-form

- How to add validation: https://angular.io/guide/form-validation



## ng-show alternative

Angular doesn't have any `ng-show` and only has `ngIf`. Although using the following
technique we can mimic the same behavior in Angular as well:

https://stackoverflow.com/questions/35578083/what-is-the-equivalent-of-ngshow-and-nghide-in-angular-2

```html
<!-- in template: -->
[hidden]="!myVar"

<!-- css rule: -->
<style>
[hidden] { display: none !important;}
</style>
```

## AngularJS to Angular

There are a bunch of documentations on how we can do the migration:

- https://angular.io/guide/upgrade
- https://www.digitalocean.com/community/tutorials/how-to-upgrade-from-angularjs-to-angular-with-ngupgrade
- https://www.devbridge.com/articles/migrating-angularjs-angular8-tutorial/

They all suggest doing extra steps before the actual migration. This includes,
- Honoring rule of 1 (Define 1 component per file, recommended to be less than 400 lines of code.)
- Converting Directives and other non-component modules to component.
- Introducing webpack to the project.

This would allow us to have Angular and AngularJS together in an app. And then we can
choose to rewrite the components as time goes by. But I feel like this might be a wasted
effort, especially Introducing webpack. If we want to start from scratch, we can just rely
on Angular CLI without worrying about webpack. So this looks like a wasted effort to me.

Instead, we could migrate app by app. This would add to the downtime, but I think overall
would result in a cleaner code. I experimented with this [in here](https://github.com/RFSH/chaise/tree/angular)
and this looked doable. I didn't
dig into it completely, but the only issue with this approach would be how we want to manage
"common" modules.
