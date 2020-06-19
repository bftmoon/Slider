!function(t){var e={};function i(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(n,o,function(e){return t[e]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s="Dw+h")}({"Dw+h":function(t,e,i){"use strict";i.r(e);var n,o=function(){function t(){this.events=new Map}return t.prototype.subscribe=function(t,e){return this.events.has(t)||this.events.set(t,[]),this.events.get(t).push(e),this},t.prototype.notify=function(t,e){this.events.has(t)&&this.events.get(t).forEach((function(t){t(e)}))},t}();!function(t){t[t.SliderClick=0]="SliderClick",t[t.PointMove=1]="PointMove",t[t.PointMoveByScale=2]="PointMoveByScale",t[t.ValueChanged=3]="ValueChanged",t[t.StopPointMoveByScale=4]="StopPointMoveByScale"}(n||(n={}));var r,s=n;!function(t){t[t.Point=0]="Point",t[t.Scale=1]="Scale",t[t.Tooltip=2]="Tooltip",t[t.Range=3]="Range",t[t.Body=4]="Body",t[t.Line=5]="Line"}(r||(r={}));var l,a,u=r,c=function(){function t(){}return t.initClass=function(e,i,n){var o=t.getFullName(n);e.classList.add(o,o+(i?"_vertical":"_horizontal"))},t.toggleOrientation=function(e,i){var n=t.getFullName(i);e.classList.toggle(n+"_vertical"),e.classList.toggle(n+"_horizontal")},t.toggleHidden=function(e,i){e.classList.toggle(t.getFullName(i)+"_hidden")},t.toggleGrab=function(e,i){e.classList.toggle(t.getFullName(i)+"_grabbed")},t.addGrabbing=function(){document.documentElement.classList.add("slider-plugin")},t.removeGrabbing=function(){document.documentElement.classList.remove("slider-plugin")},t.getFullName=function(e){return void 0!==e?t.MAIN_PREFIX+"__"+u[e].toLowerCase():t.MAIN_PREFIX},t.MAIN_PREFIX="slider",t}(),d=function(){function t(){}return t.calc=function(e,i,n){return i===n.target?e?1-n.offsetY/n.target.offsetHeight:n.offsetX/n.target.offsetWidth:t.calcForOwner(e,i,n)},t.calcForOwner=function(t,e,i){var n=e.getBoundingClientRect(),o=n.left,r=n.top,s=n.width,l=n.height;return t?1-(i.clientY-r)/l:(i.clientX-o)/s},t}(),h=(l=function(t,e){return(l=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}l(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}),p=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.handleMouseMove=function(t){c.addGrabbing(),e.withClickHandle=!1,e.notify(s.PointMoveByScale,(function(i){return e.calcScaleMoveData(i,t)}))},e.handleScaleMouseDown=function(){e.withClickHandle=!0,document.addEventListener("mouseup",e.handleMouseUp),document.addEventListener("mousemove",e.handleMouseMove)},e.handleMouseUp=function(t){c.removeGrabbing(),e.withClickHandle?e.notify(s.SliderClick,(function(i){return d.calc(i,e.element,t)})):e.notify(s.StopPointMoveByScale),document.removeEventListener("mouseup",e.handleMouseUp),document.removeEventListener("mousemove",e.handleMouseMove)},e}return h(e,t),e.prototype.buildHtml=function(t){return this.element=document.createElement("div"),c.initClass(this.element,t,u.Scale),this.element.addEventListener("mousedown",this.handleScaleMouseDown),this.element},e.prototype.getElement=function(){return this.element},e.prototype.toggleHidden=function(){c.toggleHidden(this.element,u.Scale)},e.prototype.toggleOrientation=function(){c.toggleOrientation(this.element,u.Scale),this.element.childNodes.forEach((function(t){return c.toggleOrientation(t,u.Line),null}))},e.prototype.updateLines=function(t,i,n){this.element.innerHTML="";var o=Math.floor(i/t)-Number(i%t==0);if(o>0){for(var r=e.calcGapAndCount(o,this.element[n?"offsetHeight":"offsetWidth"],t,i),s=r.percentGap,l=r.visibleCount,a=document.createDocumentFragment(),u=0;u<l;u+=1)a.append(e.buildLineHtml(n,u+1,s));this.element.append(a)}},e.buildLineHtml=function(t,e,i){var n=document.createElement("div");return n.style[t?"bottom":"left"]=i*e+"%",c.initClass(n,t,u.Line),n},e.calcGapAndCount=function(t,e,i,n){for(var o=t,r=e*(i/n);r<=4;)r*=2,o/=2;return{percentGap:r/e*100,visibleCount:Math.floor(o)}},e.prototype.calcScaleMoveData=function(t,e){return t?{diff:-e.movementY/this.element.offsetHeight,coordinate:e.clientY}:{diff:e.movementX/this.element.offsetWidth,coordinate:e.clientX}},e}(o),f=function(){function t(){}return t.prototype.getElement=function(){return this.element},t.prototype.buildHtml=function(t){return this.element=document.createElement("div"),c.initClass(this.element,t,u.Tooltip),this.element},t.prototype.toggleHidden=function(){c.toggleHidden(this.element,u.Tooltip)},t.prototype.update=function(t,e){if(this.element.innerText=t.toString(),!e){this.element.style.left="",this.element.style.right="";var i=this.element.getBoundingClientRect();i.left<0&&(this.element.style.left="0"),i.right>document.documentElement.offsetWidth&&(this.element.style.right="0")}},t.prototype.toggleOrientation=function(){c.toggleOrientation(this.element,u.Tooltip)},t}(),m=function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(e,i)};return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),g=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.moveDiff=null,e.tooltip=new f,e.handlePointMouseDown=function(t){c.addGrabbing(),e.updateMoveDiff(t.clientX,t.clientY),c.toggleGrab(e.element,u.Point),document.addEventListener("mouseup",e.handleMouseUp),document.addEventListener("mousemove",e.handleMouseMove)},e.handleMouseUp=function(){c.removeGrabbing(),c.toggleGrab(e.element,u.Point),document.removeEventListener("mouseup",e.handleMouseUp),document.removeEventListener("mousemove",e.handleMouseMove)},e.handleMouseMove=function(t){e.notify(s.PointMove,(function(i){return e.calcAbsolute(i,t)}))},e}return m(e,t),e.prototype.getElement=function(){return this.element},e.prototype.buildHtml=function(t){return this.element=document.createElement("div"),c.initClass(this.element,t,u.Point),this.element.addEventListener("mousedown",this.handlePointMouseDown),this.element.append(this.tooltip.buildHtml(t)),this.element},e.prototype.updateMoveDiff=function(t,e){var i=this.element.getBoundingClientRect(),n=i.x,o=i.y,r=i.width,s=i.height;this.moveDiff={x:n+r/2-t,y:o+s/2-e}},e.prototype.calcAbsolute=function(t,e){return t?e.clientY+this.moveDiff.y:e.clientX+this.moveDiff.x},e.prototype.updatePosition=function(t,e){var i=this.element.offsetWidth/2;this.element.style[t?"bottom":"left"]="calc("+e.percent+"% - "+i+"px)",void 0!==e.tooltip&&this.tooltip.update(e.tooltip,t)},e.prototype.toggleHidden=function(){c.toggleHidden(this.element,u.Point)},e.prototype.toggleTooltip=function(){this.tooltip.toggleHidden()},e.prototype.toggleOrientation=function(){this.element.removeAttribute("style"),c.toggleOrientation(this.element,u.Point),this.tooltip.toggleOrientation()},e.prototype.calcClientCenterCoordinate=function(t){var e=this.element.getBoundingClientRect(),i=e.top,n=e.height,o=e.left,r=e.width;return t?i+n/2:o+r/2},e}(o),y=function(){function t(){}return t.prototype.getElement=function(){return this.element},t.prototype.buildHtml=function(t){return this.element=document.createElement("div"),c.initClass(this.element,t,u.Range),this.element},t.prototype.updatePosition=function(t,e,i){if(t){var n=i/100;void 0!==e.min&&(this.element.style.marginBottom=n*e.min+"px"),void 0!==e.max&&(this.element.style.marginTop=n*(100-e.max)+"px")}else void 0!==e.min&&(this.element.style.marginLeft=e.min+"%"),void 0!==e.max&&(this.element.style.marginRight=100-e.max+"%")},t.prototype.toggleOrientation=function(){this.element.removeAttribute("style")},t}();!function(t){t.Min="min",t.Max="max"}(a||(a={}));var v=a,b=function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(e,i)};return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),M=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.range=new y,e.points={min:new g,max:new g},e.cachedMovePosition=null,e.handleMinPointMove=function(t){e.handlePointMove(t)},e.handleMaxPointMove=function(t){e.handlePointMove(t,v.Max)},e.handleSliderBodyClick=function(t){e.isRangeOrBodyElement(t)&&e.notify(s.SliderClick,(function(i){return d.calc(i,e.element,t)}))},e.handlePointMove=function(t,i){void 0===i&&(i=v.Min),e.notify(s.PointMove,(function(n){return{position:i,ratio:e.calcValue(n,t(n))}}))},e}return b(e,t),e.prototype.getElement=function(){return this.element},e.prototype.buildHtml=function(t){return this.element=document.createElement("div"),c.initClass(this.element,t,u.Body),this.element.addEventListener("click",this.handleSliderBodyClick),this.element.append(this.points.min.buildHtml(t),this.points.max.buildHtml(t),this.range.buildHtml(t)),this.points.min.subscribe(s.PointMove,this.handleMinPointMove),this.points.max.subscribe(s.PointMove,this.handleMaxPointMove),this.element},e.prototype.toggleRange=function(){this.points.min.toggleHidden()},e.prototype.toggleTooltip=function(){this.points.min.toggleTooltip(),this.points.max.toggleTooltip()},e.prototype.toggleOrientation=function(){c.toggleOrientation(this.element,u.Body),this.points.min.toggleOrientation(),this.points.max.toggleOrientation(),this.range.toggleOrientation()},e.prototype.updatePosition=function(t,e){var i=e.min,n=e.max,o={};void 0!==i&&(this.points.min.updatePosition(t,i),o.min=i.percent),void 0!==n&&(this.points.max.updatePosition(t,n),o.max=n.percent),this.range.updatePosition(t,o,t?this.element.offsetHeight:void 0)},e.prototype.isRangeOrBodyElement=function(t){return t.target===this.element||t.target===this.range.getElement()},e.prototype.selectNeighbourPoint=function(t){if(null===this.cachedMovePosition){var e={min:this.points.min.calcClientCenterCoordinate(t.isVertical),max:this.points.max.calcClientCenterCoordinate(t.isVertical)};e.min+(e.max-e.min)/2>t.coordinate?this.cachedMovePosition=t.isVertical?v.Max:v.Min:this.cachedMovePosition=t.isVertical?v.Min:v.Max}return this.cachedMovePosition},e.prototype.cleanCachedPoint=function(){this.cachedMovePosition=null},e.prototype.calcValue=function(t,e){var i=this.element.getBoundingClientRect(),n=i.top,o=i.height,r=i.left,s=i.width;return t?1-(e-n)/o:(e-r)/s},e}(o),P=function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(e,i)};return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),w=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.body=new M,e.scale=new p,e.handlePointMove=function(t){e.notify(s.PointMove,t)},e.handleScaleClick=function(t){e.notify(s.SliderClick,t)},e.handleBodyClick=function(t){e.notify(s.SliderClick,t)},e.handleScaleMouseMove=function(t){e.notify(s.PointMoveByScale,(function(i,n){return e.calcPositionWithDiff(i,n,t)}))},e.handleStopMoveByScale=function(){e.body.cleanCachedPoint()},e}return P(e,t),e.prototype.render=function(t,e,i,n,o){var r=e.isVertical,l=e.isRange,a=e.withTooltip,u=e.withScale;this.element=t;var d=document.createDocumentFragment();c.initClass(this.element,r),d.append(this.body.buildHtml(r),this.scale.buildHtml(r)),this.body.subscribe(s.SliderClick,this.handleBodyClick).subscribe(s.PointMove,this.handlePointMove),this.scale.subscribe(s.SliderClick,this.handleScaleClick),this.scale.subscribe(s.PointMoveByScale,this.handleScaleMouseMove),this.scale.subscribe(s.StopPointMoveByScale,this.handleStopMoveByScale),a||this.body.toggleTooltip(),t.append(d),this.updatePosition(r,i),l||this.body.toggleRange(),u?this.scale.updateLines(n,o,r):this.scale.toggleHidden()},e.prototype.toggleRange=function(){this.body.toggleRange()},e.prototype.toggleTooltip=function(){this.body.toggleTooltip()},e.prototype.toggleScale=function(){this.scale.toggleHidden()},e.prototype.toggleOrientation=function(){c.toggleOrientation(this.element),this.body.toggleOrientation(),this.scale.toggleOrientation()},e.prototype.updateScaleLines=function(t,e,i){this.scale.updateLines(t,e,i)},e.prototype.updatePosition=function(t,e){this.body.updatePosition(t,e)},e.prototype.calcPositionWithDiff=function(t,e,i){var n=i(t),o=n.diff,r=n.coordinate;return e?{diff:o,position:this.body.selectNeighbourPoint({isVertical:t,coordinate:r})}:{diff:o,position:v.Max}},e}(o),S=(i("xe9d"),i("lrbR")),C=function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(e,i)};return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),x=function(t){function e(e,i){var n=t.call(this)||this;return n.handleSliderClick=function(t){var e=n.model.calcValue(t(n.model.isVertical));n.model.isSameCurrent(e)||n.updatePosition(e,n.model.selectPosition(e))},n.handlePointMove=function(t){var e=t(n.model.isVertical),i=e.ratio,o=e.position;n.updatePosition(n.model.calcValue(i),o)},n.handlePointMoveByScale=function(t){var e=t(n.model.isVertical,n.model.isRange),i=e.diff,o=e.position,r=n.model.calcValue(n.model.getCurrent()[o]/n.model.getRangeSize()+i);n.model.isSameCurrent(r)||n.updatePosition(r,o)},n.model=e,n.view=i,n}return C(e,t),e.prototype.init=function(t){if(void 0===t)throw new S.a("Parent element undefined");this.view.render(t,this.model.getBoolOptions(),this.model.getCurrentPoints(),this.model.step,this.model.getRangeSize()),this.view.subscribe(s.SliderClick,this.handleSliderClick).subscribe(s.PointMove,this.handlePointMove).subscribe(s.PointMoveByScale,this.handlePointMoveByScale)},e.prototype.updatePosition=function(t,e){if(this.model.willCurrentCollapse(e,t)){if(!this.model.areCurrentEqual()){var i=this.model.getCurrent()[e===v.Max?v.Min:v.Max];this.updateModelAndViewCurrent(i,e)}}else this.updateModelAndViewCurrent(t,e)},e.prototype.updateModelAndViewCurrent=function(t,e){var i,n;this.model.setCurrent(((i={})[e]=t,i)),this.view.updatePosition(this.model.isVertical,((n={})[e]=this.model.getPoint(e),n)),this.notify(s.ValueChanged,{value:t,position:e})},e}(o),_=function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(e,i)};return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),O=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return _(e,t),e.prototype.getOptions=function(){return this.model.getOptions()},e.prototype.addSlideListener=function(t){this.subscribe(s.ValueChanged,t)},e.prototype.setCurrentRange=function(t,e){this.model.setValidCurrents(t,e),this.view.updatePosition(this.model.isVertical,this.model.getCurrentPoints())},e.prototype.setCurrentRangeMin=function(t){this.model.setValidCurrent(t,v.Min),this.view.updatePosition(this.model.isVertical,{min:this.model.getPoint(v.Min)})},e.prototype.setCurrentRangeMax=function(t){this.model.setValidCurrent(t,v.Max),this.view.updatePosition(this.model.isVertical,{max:this.model.getPoint(v.Max)})},e.prototype.setCurrent=function(t){this.setCurrentRangeMax(t)},e.prototype.setStep=function(t){this.model.setValidStep(t),this.model.withScale&&this.view.updateScaleLines(this.model.step,this.model.getRangeSize(),this.model.isVertical),this.updatePointByStep(v.Max),this.model.isRange&&this.updatePointByStep(v.Min)},e.prototype.setBorderMin=function(t){var e=this;this.model.setValidBorder(t,v.Min),this.normalizePoints(this.model.border.min,(function(t){return t<e.model.border.min})),this.updateScaleLines()},e.prototype.setBorderMax=function(t){var e=this;this.model.setValidBorder(t,v.Max),this.normalizePoints(this.model.border.max,(function(t){return t>e.model.border.max})),this.updateScaleLines()},e.prototype.setBorders=function(t,e){var i=this;this.model.setValidBorders(t,e),this.normalizePoints(this.model.border.min,(function(t){return t<i.model.border.min})),this.normalizePoints(this.model.border.max,(function(t){return t>i.model.border.max}))},e.prototype.toggleRange=function(){this.model.toggleRange(),this.view.toggleRange(),this.model.isOrderNormalizeRequired()&&(this.model.normalizeCurrentOrder(),this.view.updatePosition(this.model.isVertical,{max:this.model.getPoint(v.Max)}),this.notify(s.ValueChanged,{value:this.model.getCurrent().max,position:v.Max})),this.view.updatePosition(this.model.isVertical,{min:this.model.getPoint(v.Min)})},e.prototype.toggleScale=function(){this.model.toggleScale(),this.view.toggleScale(),this.model.withScale&&this.updateScaleLines()},e.prototype.toggleTooltip=function(){this.model.toggleTooltip(),this.view.toggleTooltip()},e.prototype.toggleOrientation=function(){this.model.toggleOrientation(),this.view.toggleOrientation(),this.view.updatePosition(this.model.isVertical,this.model.getCurrentPoints()),this.model.withScale&&this.view.updateScaleLines(this.model.step,this.model.getRangeSize(),this.model.isVertical)},e.prototype.updatePointByStep=function(t){var e=this.model.getCurrent()[t],i=this.model.normalizeByStep(e);i!==e&&this.updatePosition(i,t)},e.prototype.normalizePoints=function(t,e){var i=this.model.getRealCurrent();e(i.min)&&(this.model.setCurrent({min:t}),this.notify(s.ValueChanged,{value:t,position:v.Min})),e(i.max)&&(this.model.setCurrent({max:t}),this.notify(s.ValueChanged,{value:t,position:v.Max})),this.view.updatePosition(this.model.isVertical,this.model.getCurrentPoints())},e.prototype.updateScaleLines=function(){this.model.withScale&&this.view.updateScaleLines(this.model.step,this.model.getRangeSize(),this.model.isVertical)},e}(x),V=function(){function t(e){this.current={min:0,max:80},this.border={min:0,max:100},this.step=1,this.isRange=!0,this.isVertical=!1,this.withTooltip=!0,this.withScale=!0,void 0!==e&&(void 0!==e.border&&t.copyMinMax(this.border,e.border),void 0!==e.current&&t.copyMinMax(this.current,e.current),void 0!==e.step&&(this.step=e.step),this.copyBool(e))}return t.prototype.copyBool=function(t){var e=t.isVertical,i=t.isRange,n=t.withScale,o=t.withTooltip;void 0!==i&&(this.isRange=i),void 0!==e&&(this.isVertical=e),void 0!==o&&(this.withTooltip=o),void 0!==n&&(this.withScale=n)},t.copyMinMax=function(t,e){var i=e.min,n=e.max;void 0!==n&&(t.max=n),void 0!==i&&(t.min=i)},t.prototype.setCurrent=function(e){t.copyMinMax(this.current,e)},t.prototype.getCurrent=function(){return this.isRange?this.current:{max:this.current.max,min:this.border.min}},t.prototype.getRealCurrent=function(){return this.current},t.prototype.getPoint=function(t){return{percent:(this.getCurrent()[t]-this.border.min)/this.getRangeSize()*100,tooltip:this.getCurrent()[t]}},t.prototype.getCurrentPoints=function(){return{min:this.getPoint(v.Min),max:this.getPoint(v.Max)}},t.prototype.getOptions=function(){return{current:this.getCurrent(),border:this.border,step:this.step,isVertical:this.isVertical,isRange:this.isRange,withScale:this.withScale,withTooltip:this.withTooltip}},t.prototype.getBoolOptions=function(){return{isVertical:this.isVertical,isRange:this.isRange,withScale:this.withScale,withTooltip:this.withTooltip}},t.prototype.getRangeSize=function(){return this.border.max-this.border.min},t.prototype.selectPosition=function(t){return this.isRange?t<=this.current.min?v.Min:t>=this.current.max?v.Max:t<this.current.min+(this.current.max-this.current.min)/2?v.Min:v.Max:v.Max},t.prototype.normalizeCurrentOrder=function(){var t=this.current.min;this.current.min=this.current.max,this.current.max=t},t.prototype.normalizeByStep=function(t){var e=t,i=(t-this.border.min)%this.step;return 0===i?t:(e+=this.step/2>i?-i:this.step-i)>this.border.max?this.border.max:e},t.prototype.calcValue=function(t){if(t<=0)return this.border.min;if(t>=1)return this.border.max;var e=this.border.min+(this.border.max-this.border.min)*t;return this.normalizeByStep(e)},t.prototype.isOrderNormalizeRequired=function(){return this.getCurrent().max<this.getCurrent().min},t.prototype.isSameCurrent=function(t){return t===this.getCurrent().min||t===this.getCurrent().max},t.prototype.willCurrentCollapse=function(t,e){var i=this.getCurrent();return t===v.Min&&e>i.max||t===v.Max&&e<i.min},t.prototype.areCurrentEqual=function(){var t=this.getCurrent();return t.min===t.max},t.prototype.toggleRange=function(){this.isRange=!this.isRange},t.prototype.toggleTooltip=function(){this.withTooltip=!this.withTooltip},t.prototype.toggleOrientation=function(){this.isVertical=!this.isVertical},t.prototype.toggleScale=function(){this.withScale=!this.withScale},t}(),R=function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(e,i)};return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),B=function(t){function e(e){var i=t.call(this)||this;return e&&(i.copyBool(e),void 0!==e.border&&i.setValidBorders(e.border.min||i.border.min,e.border.max||i.border.max),void 0!==e.current&&(void 0!==e.current.min&&i.setValidCurrent(e.current.min,v.Min),void 0!==e.current.max&&i.setValidCurrent(e.current.max||i.current.max,v.Max)),void 0!==e.step&&i.setValidStep(e.step)),i}return R(e,t),e.prototype.setValidCurrent=function(t,i){e.isValidType(t);var n=Number(t);this.isInBorderRange(n),i===v.Min?(this.isRangeActive(),e.isPositiveRange(n,this.getCurrent().max)):e.isPositiveRange(this.getCurrent().min,n),this.isDivideToStepOrBorder(n),this.current[i]=n},e.prototype.setValidCurrents=function(t,i){this.isRangeActive(),e.isValidType(t),e.isValidType(i);var n=Number(t),o=Number(i);this.isInBorderRange(n),this.isInBorderRange(o),e.isPositiveRange(n,o),this.isDivideToStepOrBorder(n),this.isDivideToStepOrBorder(o),this.current={min:n,max:o}},e.prototype.setValidStep=function(t){e.isValidType(t);var i=Number(t);this.isValidStep(i),this.step=i},e.prototype.setValidBorder=function(t,i){e.isValidType(t);var n=Number(t);this.isValidBorder(n,i),this.border[i]=n},e.prototype.setValidBorders=function(t,i){e.isValidType(t),e.isValidType(i);var n=Number(t),o=Number(i);e.isValidBorders(n,o),this.border={min:n,max:o}},e.isValidType=function(t){if(null==t||""===t||Number.isNaN(Number(t)))throw new S.a("Number required")},e.isPositiveRange=function(t,e){if(e<t)throw new S.a("Negative range")},e.prototype.isInBorderRange=function(t){if(t<this.border.min||t>this.border.max)throw new S.a("Not in range")},e.prototype.isRangeActive=function(){if(!this.isRange)throw new S.a("Setting ranged value for not ranged slider")},e.prototype.isValidStep=function(t){if(t<=0)throw new S.a("Too small step size");if(t>this.border.max-this.border.min)throw new S.a("Too big step size")},e.prototype.isDivideToStepOrBorder=function(t){if((t-this.border.min)%this.step!=0&&t!==this.border.min&&t!==this.border.max)throw new S.a("Not divide on step")},e.prototype.isValidBorder=function(t,e){if(e===v.Min){if(t>this.border.max)throw new S.a("Negative slider body size");if(t===this.border.max)throw new S.a("Slider with only one value")}else{if(t<this.border.min)throw new S.a("Negative slider body size");if(t===this.border.min)throw new S.a("Slider with only one value")}},e.isValidBorders=function(t,e){if(t>e)throw new S.a("Negative slider body size");if(t===e)throw new S.a("Slider with only one value")},e}(V),E=function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(e,i)};return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),T=function(t){function e(e){return t.call(this,new B(e),new w)||this}return E(e,t),e}(O);$.fn.slider=function(t){var e=[],i=this;return this.each((function(i,n){var o=new T(t);e.push(o),o.init(n)})),{addSlideListener:function(t){e.forEach((function(e){return e.addSlideListener(t)}))},setCurrentRange:function(t,i){e.forEach((function(e){return e.setCurrentRange(t,i)}))},setBorderMax:function(t){e.forEach((function(e){return e.setBorderMax(t)}))},setBorderMin:function(t){e.forEach((function(e){return e.setBorderMin(t)}))},setBorders:function(t,i){e.forEach((function(e){return e.setBorders(t,i)}))},setCurrent:function(t){e.forEach((function(e){return e.setCurrent(t)}))},setCurrentRangeMax:function(t){e.forEach((function(e){return e.setCurrentRangeMax(t)}))},setCurrentRangeMin:function(t){e.forEach((function(e){return e.setCurrentRangeMin(t)}))},setStep:function(t){e.forEach((function(e){return e.setStep(t)}))},toggleOrientation:function(){e.forEach((function(t){return t.toggleOrientation()}))},toggleRange:function(){e.forEach((function(t){return t.toggleRange()}))},toggleScale:function(){e.forEach((function(t){return t.toggleScale()}))},toggleTooltip:function(){e.forEach((function(t){return t.toggleTooltip()}))},getOptions:function(){return e.map((function(t){return t.getOptions()}))},getSlider:function(t){return e[t]},getElementsQuery:function(){return i},size:function(){return e.length}}}},lrbR:function(t,e,i){"use strict";var n,o=(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}),r=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.name="SliderError",e}return o(e,t),e}(Error);e.a=r},xe9d:function(t,e,i){}});