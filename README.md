# Working with Nx.dev using React, Angular and native web components
Find me on Twitter as [@Fabian0007](https://twitter.com/Fabian0007)

### Angular App and web components libraries— Part #1 of 9

In this first part of the tutorial, we will start with an Angular application
that uses web component libraries, we will delve a little into what web
components are and the peculiarities of Angular when working with them.

![](https://cdn-images-1.medium.com/max/800/1*-WV0ZrNwQVsT0YrEXdlp6A.png)

Let’s start creating the Nx project:

    npx create-nx-workspace tutorial

Then select empty [an empty workspace]

Now surely, are you wondering what is Nx? (better to look for it as Nx.dev).
This set of extensible development tools for monorepos could help you develop like Google, Facebook and Microsoft[1]. For more information about Nx you can consult their website. What to say about the monorepos strategy, is a subject of much discussion, I recommend that you consult information about its advantages and disadvantages.

### **Creating Angular App**

We will start by adding the Angular capabilities, then we will create the first
application in our project, which will use Angular:

    npm i @nrwl/angular

    npm run nx g @nrwl/angular:app angularapp

Which style sheet format(to use) and if you want to configure routing for the
application is your choice.

### Creating a web component library

Now, we will add the Web component capabilities and create a footer library
based on web components:

    npm i @nrwl/web
    npm run nx g @nrwl/web:lib footer-lib

Go to /libs/footer-lib /src/lib/footer-lib.ts and we must to add:

    export class Footer extends HTMLElement {

      connectedCallback() {
        this.innerHTML = `<h1>Made by Fabian Cano</h1>`;
      }
    }
    customElements.define('footer-lib', Footer);

Three importants things here:

**HTMLElement**: this is the prototype of a generic element HTML.

**connectedCallback**: A lifecycle hook called after the component’s element is
inserted into the document.

**customElements.define**: is a method that defines a new custom element.

At this point it is important to talk about what web components are. They are
not a technology per se, they are based on the combined use of four technologies that can be used independently:

The first is **Custom Elements, **which allows defining new types of elements and is used when we call** customElements.define(‘footer-lib’, Footer)**.

The second was **HTML Imports**, which is intended to be the packaging mechanism for web components, but you can also use HTML Imports by itself. This feature is obsolete. Although it may still work in some browsers, its use is discouraged since it could be removed at any time. Try to avoid using it.

The previous technology was replaced with the **ES Modules specification**, which defines the inclusion and reuse of JS documents in a standards based, modular, performant way. This is how we will import our web component.

**We will see the other two technologies later.**

### Adding the web component library to the Angular app

Go to /apps/angularapp/src/main.ts and we will add (**here we use ES modules**):

    import '@tutorial/footer-lib';

Then in /apps/angularapp/src/app/app.module.ts we will add the code in bold, in order to enable the use of web components in the project.

    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule, 
     } from '@angular/core';

    import { AppComponent } from './app.component';

    @NgModule({

      declarations: [AppComponent],

      imports: [BrowserModule],

      providers: [],


      bootstrap: [AppComponent]

    })
    export class AppModule {}

We will add the next to the end of the file
/apps/angularapp/src/app/app.component.html, in order to call the web component.

    <footer-lib></footer-lib>

Then, you can run the app:

    npm start angularapp

If you get the error “Cannot find module
‘[@angular](http://twitter.com/angular)-devkit/build-angular/package.json’…”, run the command below to reinstall dependencies:

    npm i

![](https://cdn-images-1.medium.com/max/800/1*osCUaQBzoJjXN5JaDo69GA.png)
<span class="figcaption_hack">Expected result</span>

**You can see that the style defined in app.component.css does not affect the
footer-lib style**. This occurs because Angular by default uses encapsulation
for components. For deactivate this, you must add the code marked in bold to app.component.ts:

    import { Component, 
     } from '@angular/core';

    @Component({

      selector: 'tutorial-root',

      templateUrl: './app.component.html',

      styleUrls: ['./app.component.css'],

      

    })

    export class AppComponent {

      title = 'angularapp';

    }

Now footer-lib will be centered because it uses h1 label.

![](https://cdn-images-1.medium.com/max/800/1*ojy9CESPgcVQUCY0nFgB-Q.png)
<span class="figcaption_hack">Expected result</span>

**What if you want to pass a parameter to the web component?** you can use
observedAttributes and attributeChangedCallback provided by HTMLElement, replace
the file in /libs/footer-lib /src/lib/footer-lib.ts with:

    export class Footer extends HTMLElement {

      public static observedAttributes = ['creator'];

      attributeChangedCallback() {

        const creator = this.getAttribute('creator');

        this.innerHTML = `<h1>Made by ${creator}</h1>`;

      }

    }

    customElements.define('footer-lib', Footer);

Now we should pass the parameter to footer-lib and create the variable in
app.component.ts:

    <footer-lib [attr.creator]="creator"></footer-lib>

    ...
    title = 'angularapp';

    ...

**What if you want encapsulate the footer-lib style but without relying on
Angular encapsulation?** For this you can use the Shadow DOM.

### Using the Shadow DOM

Shadow DOM is the third technology on which web components are based and is a new DOM feature that helps you build components. You can think of shadow DOM as a **scoped subtree** inside your element. it was created to allow encapsulation and componentisation natively on the web platform without having to rely on tools like `<iframe>`, which really weren’t made for this purpose.

Go to /libs/footer-lib /src/lib/footer-lib.ts and we must replace it with:

    export class Footer extends HTMLElement {

    public static observedAttributes = ['creator'];

      constructor() {

        super();

        this.attachShadow({ mode: 'open' });

      }

      attributeChangedCallback() {

        const creator = this.getAttribute('creator');

        const template = document.createElement('template');

        template.innerHTML = `<h1>Made by ${creator}</h1>`;

        this.shadowRoot.appendChild(template.content);

      }

    }

    customElements.define('footer-lib', Footer);

**Now again, you can see that the style defined in app.component.css does not
affect the footer-lib style because it uses shadow DOM**.

![](https://cdn-images-1.medium.com/max/800/1*k_amzYtgdXrpdJU0A0T8fw.png)
<span class="figcaption_hack">Expected</span>

### Using HTML templates

HTML templates are the fourth technology on which web components are based and they allow you to create pieces of HTML that can be replicated as many times as necessary.

Go to /libs/footer-lib /src/lib/footer-lib.ts and we must replace it with:

    export class FooterLib extends HTMLElement {

      public static observedAttributes = ['creator'];

      constructor() {

        super();

        this.attachShadow({ mode: 'open' });

      }

      attributeChangedCallback() {

        const template = document.getElementById('template-test');

        template.innerHTML =

          `<style>h1 {text-align: center; }</style>` + template.innerHTML;

        const templateContent = template['content'];

        this.shadowRoot.appendChild(templateContent);

      }

    }

    customElements.define('footer-lib', FooterLib);

Here we get the template searching with the id ‘template-test’, then we add the style for center the h1 label in the innerHTML of the template. Finally we add the template[‘content’] as a child of the shaddowRoot.

Now we need to add the template to /apps/angularapp/src/app/app.component.html:

    <template id="template-test" [innerHTML]="template"> </template>

Then go to /apps/angularapp/src/app/app.component.ts and you must add the code marked in bold:

    import { Component, ViewEncapsulation } from '@angular/core';

    @Component({

    selector: 'tutorial-root',

    templateUrl: './app.component.html',

    styleUrls: ['./app.component.css'],

    encapsulation: ViewEncapsulation.None

    })

    export class AppComponent {

    title = 'angularapp';

    creator = 'Fabian Cano';


    }

![](https://cdn-images-1.medium.com/max/800/1*7cFSklTrXoUPLPjTJ71Abw.png)
<span class="figcaption_hack">Expected result</span>

In the next part we will see the inclusion of a React library to the Angular
application. See you soon.

Second part available [here](https://medium.com/@fabianandrescano/working-with-nx-dev-using-react-angular-and-native-web-components-part-2-of-9-4883c314d217)

### References

[1] Nx web page [https://nx.dev/](https://nx.dev/)
