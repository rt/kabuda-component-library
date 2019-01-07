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

## variables.css

```css

:root {
    /*
     * Typography
     * ======================================================================== */

--font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;

/*
 * Color
 * ======================================================================== */
--color-initial: #fff;
--color-black: #000;
--color-primary: #9b4dca;
--color-secondary: #606c76;
--color-tertiary: #f4f5f6;
--color-quaternary: #d1d1d1;
--color-quinary: #e1e1e1;
--color-success: #396f3a;
--color-warning: #f59f00;
--color-danger: #c92a2a;
--color-info: #0b7285;



/*
 * Form
 * ======================================================================== */
--input-background-color: transparent;
--input-height: 3.8rem;
/*--input-border: 0.1rem;*/
--input-border: 0.1rem solid var(--color-quaternary);
--input-border-radius: 0.4rem;
--input-padding: 0.6rem 1.0rem; /*The .6rem vertically centers text on FF, ignored by Webkit*/

--field-margin: 1.0rem;


/*
 * Card Shadow ...
 * ======================================================================== */

/*
 * Margin between inline items like buttons
 * ======================================================================== */
--margin-inline: 0.4rem; /*like buttons*/

--margin-vertical: 0.4rem; /*like form elements?*/

--margin-container-vert: 1.6rem; /*panels, etc*/


/*
 * Text Size
 * ======================================================================== */
--text-tiny: 1.0rem;  /*badge, etc*/
--text-small: 1.2rem;  /* not used yet */
--text-medium: 1.4rem;  /* not used yet */
--text-large: 1.8rem;  /* not used yet */
--text-xlarge: 2.4rem;  /*bar brand, etc*/

/*
 * Layout
 * ======================================================================== */

--nav-min-width: 25.0rem;
--max-content-width: 112.0rem;

/*
 * Media queries breakpoints
 * ======================================================================== */

--screen-xs-min: 320px;  /* Custom, IPhone Retina*/
--screen-xs-min: 480px;  /* Extra small screen / phone */
--screen-sm-min: 768px;  /* Small screen / tablet */
--screen-md-min: 992px;  /* Medium screen / desktop */
--screen-lg-min: 1200px; /* Large screen / wide desktop */
}
```
