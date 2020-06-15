# Slider plugin
Slider plugin with optional jQuery interface for FSD

[Demo](https://bigfatmoon.github.io/Slider/index.html)  
[Coverage](https://bigfatmoon.github.io/Slider/coverage/lcov-report/index.html)
ink

### How to:
##### Install and run project
```
git clone https://github.com/bigfatmoon/Slider.git
npm install
npm run "run prod"
``` 
You can also use any other script in [package.json](./package.json) instead "run prod"

##### Create slider
```javascript
let slider = new Slider("put options here");
slider.init("put element here")
// or
let slider = $("element").slider("options");
```
All options can be found in [IOptions.ts](./src/slider/model/IOptions.ts)  
All supported methods can be found in [ISlider.ts](./src/slider/ISlider.ts)

JQuery support multiple slider and more methods like:
```javascript
$("selector").slider().getElementsQuery().anyQueryFunc();
$("selector").slider().size();
$("selector").slider().getSlider("put index here");
```
Simple example of plugin injection can be found in [the-simplest-demo dir](./the-simplest-demo)
#### Understand architecture

Using full generated slider class diagram

![uml](./uml/uml.svg)

Or with "MVP with Passive View" overview

![overview](./uml/overview.png)      

And classes brief:
* Slider - main plugin class for connecting MVP components
* Presenter - connect Model and View and call required methods for events
  * PresenterProxy - extends Presenter,  contains functions for outer data update
* Model - contain data, provides it according to condition
  * ValidModel - extends Model, contains functions for outer updates validation
* View - render slider components and notify about points move and slider click
* Observer - simplify work with events and callbacks
