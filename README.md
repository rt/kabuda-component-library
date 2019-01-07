# component-library

Poor man's way to share components.  All testing is done via the consumer, primarily (skeleton).
This let's us use them in the same ways (withStyles), not saying that is good but it the most practical for now.

## Features

- Reusable Dumb Components
- What else are we sharing???
- Automation Strategy 
- Component Styled
- Post Css


## Assumtions / Protocol

- testing done on app side
- apps can freeze at tag level (tag v1 when stable)
- isomorphic-style-loader components (probably should move to simple bundled css)
- any dependencies must be included in the app
- any component dependencies will be written in the components comments
- styled by `variables.css` overwritten by app (sym link to here `src/components/css/variables.css`
- history to be passed in as a context type

## Notes

Right now we

- Set up stores with the index.html
- Give the entire uiData and the lang 
- First render will be in lang used to build (could be re-painted on load, not sure about that ux)
- We could build with no uiData so that its blank, then load uiData on load
- There's no spinner by default, we would need to put that in the code (if no data, render spinner)
- There's no auth so we would need to fetch from the client side


## Dependencies

- moment
- react-day-picker
- kabuda
- deepmerge
-
-
-
