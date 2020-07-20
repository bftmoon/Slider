# Slider plugin

Slider plugin with optional jQuery interface for FSD

[Demo](https://bigfatmoon.github.io/Slider/index.html)  
[Coverage](https://bigfatmoon.github.io/Slider/coverage/lcov-report/index.html)

### How to:

##### Install and run project
If you haven't installed npm (or yarn knowledge) you should download and install [Node.js](https://nodejs.org/en/)

Installation:
```
git clone https://github.com/bigfatmoon/Slider.git
cd Slider
npm install
```
Run in production mode: ```npm run prod```  
Run in development mode: ```npm run dev```  
Build project: ```npm run build```

##### Check code quality
With ESLint: ```npm run eslint```  
By coverage: ```npm run coverage```

##### Create slider

```javascript
let slider = new SliderPlugin('put options here');
slider.init('put element here');
// or
let slider = $('element').slider('options');
```
Options example:
```javascript
new SliderPlugin({
    current: { min: 10, max: 90 },
    border: { min: 0, max: 100 },
    step: 1,
    isRange: true,
    isVertical: false,
    withTooltip: true,
    withScale: true,
})
```

All supported methods can be found in [Slider.ts](src/slider/Slider.ts)

JQuery support multiple slider and more methods like:

```javascript
$('selector').slider().getElementsQuery().anyQueryFunc();
$('selector').slider().size();
$('selector').slider().getSlider('put index here');
```

Simple example of plugin injection can be found in [the-simplest-demo dir](./the-simplest-demo)

#### Understand architecture

Using full generated slider class diagram

![uml](diagrams/uml.svg)

Or with "MVP with Passive View" overview

![overview](diagrams/overview.png)

And classes brief:

- Slider - main plugin class for connecting MVP components
- Presenter - connect Model and View and call required methods for events
  - PresenterProxy - extends Presenter, contains functions for outer data update
- Model - contain data, provides it according to condition
  - ValidModel - extends Model, contains functions for outer updates validation
- View - render slider components and notify about points move and slider click
- Observer - simplify work with events and callbacks
