!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Page=t():e.Page=t()}(window,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t){function r(e,t){return this._rootEl=e,this._option=t,this._currentPage=t.currentPage,this._totalPage=t.totalPage,this._canClick="can-click",this.refs={},this._render=function(e,t,r){let n=this,i=document.createElement(e);Object.keys(t).forEach(e=>{let r=t[e];"ref"===e?n.refs[r]=i:"class"===e?i.className=r:"style"===e?Object.keys(r).forEach(e=>{i.style[e]=r[e]}):i[e]=r}),r&&(Array.isArray(r)?r.forEach(e=>i.append(e)):i.innerHTML=r);return i}.bind(this),this._pageEL=this._render("ul",{class:"jtable-page-ul"},[this._render("li",{},[this._render("a",{class:"jtable-page-pre",ref:"pre_btn"},"上一页")]),this._render("div",{},[this._render("input",{type:"number",ref:"pager_input",style:{width:this.getInputWidth()},value:this._currentPage}),this._render("span",{},"/"),this._render("span",{ref:"pager_span"},this._totalPage)]),this._render("li",{},[this._render("a",{class:"jtable-page-next",ref:"next_btn"},"下一页")])]),e.append(this._pageEL),this.checkBoundary(),this.refs.next_btn.addEventListener("click",e=>{this.goNext(e)}),this.refs.pre_btn.addEventListener("click",e=>{this.goPre(e)}),this.refs.pager_input.addEventListener("blur",e=>{let t=null;try{t=parseInt(this.refs.pager_input.value)}catch(e){return}t!==this._currentPage&&this._go(e,t)}),{reset:this.reset.bind(this)}}r.prototype={goPre(e){this._go(e,this._currentPage-1)},goNext(e){this._go(e,this._currentPage+1)},_go(e,t){e.preventDefault(),this.refs.pager_input.value==t&&this._currentPage==t||(this.checkPageIndex(t)?(this.refs.pager_input.value=this._currentPage=t,this._option.beforePageChange&&!this._option.beforePageChange(t)||this.currentPageChange(t)):this.refs.pager_input.value=this._currentPage)},currentPageChange(e){this._option.pageChange&&this._option.pageChange(e),this.checkBoundary()},getInputWidth(){let e=this._totalPage.toString().length;return e<2?"30px":2===e?"33px":30+10*(e-2)+"px"},checkPageIndex(e){return!(e<1||e>this._totalPage)},checkBoundary(){1===this._currentPage?this.refs.pre_btn.classList.remove(this._canClick):this.refs.pre_btn.classList.add(this._canClick),this._currentPage===this._totalPage?this.refs.next_btn.classList.remove(this._canClick):this.refs.next_btn.classList.add(this._canClick)},reset(e){e?(this._currentPage=e.currentPage||this._option.currentPage,this._totalPage=e.totalPage||this._option.totalPage,this.refs.pager_input.style.width=this.getInputWidth()):this._currentPage=this._option.currentPage,this.refs.pager_input.value=this._currentPage,this.refs.pager_span.innerText=this._totalPage}},e.exports.default=e.exports=r}])});