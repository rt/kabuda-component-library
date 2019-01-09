# Automation

### Scenarios

Scenarios test the app for different flows.  It also is used to check interaction amongst components in a single route.

### Route Components
Route components give you the path to the route, but also the starting point for the component heirarchy.  Typical use, 
```
const route = new MyRoute(driver);
route.navigate();
await route.rootLoaded();

//ready to start 
...

```

### Always make and use components

Create an automation component for each regular component.  Set id to equal that of the regular component.
Always use the component, don't reach inside the component using random selectors.  This keeps it easy to maintain and stable.

Typical code
```
let myCompnent = route.getComponent(MyComponent);
myComponent.doSomething();
```

When you want target elements that are *not* components, you can use the *Base* class helpers.  You still should use the *data-e2e* to target the element if you want to remain separate from styling concerns.
```
this.click('childId');
```

This should be limitted to simple very simple cases because most markup should be within a component.


### Nested Components

Often the functionality you would like in the scenario exists in low level components.  Intermediary composite components can make methods to assist in easier interation, rather than passing child components upward.

For example, a route component could create a method so that the scenario can easily set login credentials.
```
await route.setLogin(username, password);
```


### Other Notes

- selenium dockerized (grid)

    docker pull selenium/hub
    docker run -p 4444:4444 -d --name selenium-hub selenium/hub
    http://localhost:4444/grid/console ... should see empty grid console
    docker pull selenium/node-firefox
    docker pull selenium/node-chrome
    docker run -d -P --link selenium-hub:hub selenium/node-firefox
    docker run -d -P --link selenium-hub:hub selenium/node-chrome
    
