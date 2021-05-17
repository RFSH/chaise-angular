# Summary

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

<!-- TODO MORE INFO -->

- https://blog.angular-university.io/how-does-angular-2-change-detection-really-work/
- https://medium.com/technofunnel/angular-change-detection-strategy-onpush-and-default-strategy-edd8d41ba9ef
- https://angular.io/guide/zone
- https://angular-2-training-book.rangle.io/change-detection

## Communication between components

<!-- TODO MORE INFO -->

- https://lukeliutingchun.medium.com/angular-four-ways-for-communication-between-components-b743b9653f8
- https://indepth.dev/posts/1381/immutability-importance-in-angular-applications

## HTML content (iframe)

<!-- TODO MORE INFO -->
- https://medium.com/@swarnakishore/angular-safe-pipe-implementation-to-bypass-domsanitizer-stripping-out-content-c1bf0f1cc36b

## Bootstrap
<!-- TODO MORE INFO -->
- https://github.com/twbs/release

## Routing
- https://angular.io/guide/router

Angular router works without any hash, so we should technically be able to use it.
But this requires Apache changes to ignore the path and instead let Angular handle it.
So most probably we don't want to use Routing and instead continue having separate apps.

## Form

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


## Conclusion
