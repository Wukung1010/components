export default function PageComponent(el, option) {
    this._rootEl = el;
    this._option = option;
    this._currentPage = option.currentPage;
    this._totalPage = option.totalPage;
    this._type = option.type || 'default';
    this._style = option.style || {};
    this._canClick = "can-click";
    this.refs = {};
    this._render = render.bind(this);
    this._pageEL = this._render(
        "div",
        {
            class: "xf-page-box"
        },
        [
            this._render("div", {
                class: 'xf-page-left'
            }, [
                this._render(
                    "a",
                    {
                        class: "xf-page-pre",
                        ref: "pre_btn"
                    },
                    this._type === 'default' ?'上一页':""
                )
            ]),
            this._render("div", {
                class: 'xf-page-body'
            }, [
                this._render("input", {
                    type: "number",
                    ref: "pager_input",
                    style: {
                        width: this.getInputWidth()
                    },
                    value: this._currentPage
                }),
                this._render("span", {}, "/"),
                this._render("span", {
                    ref: 'pager_span',
                    style: {
                        'font-size': this._style.totalNumSize || '16px'
                    }
                }, this._totalPage)
            ]),
            this._render("div", {
                class: 'xf-page-right'
            }, [
                this._render(
                    "a",
                    {
                        class: "xf-page-next",
                        ref: "next_btn"
                    },
                    this._type === 'default' ?'下一页':""
                )
            ])
        ]
    );

    el.append(this._pageEL);

    this.checkBoundary();

    this.refs.next_btn.addEventListener("click", e => {
        this.goNext(e);
    });
    this.refs.pre_btn.addEventListener("click", e => {
        this.goPre(e);
    });
    this.refs.pager_input.addEventListener("blur", e => {
        let next = null;
        try{
            next = parseInt(this.refs.pager_input.value);
        }catch(e){
            return ;
        }
        if(next !== this._currentPage) {
            this._go(e, next);
        }
    });

    return {reset: this.reset.bind(this)};
}

function render(name, option, son) {
    let self = this;
    let el = document.createElement(name);
    Object.keys(option).forEach(key => {
        let value = option[key];
        if (key === "ref") {
            self.refs[value] = el;
        } else if (key === "class") {
            el.className = value;
        } else if (key === "style") {
            Object.keys(value).forEach(s => {
                el.style[s] = value[s];
            });
        } else {
            el[key] = value;
        }
    });
    if (son) {
        if (Array.isArray(son)) {
            son.forEach(s => el.append(s));
        } else {
            el.innerHTML = son;
        }
    }
    return el;
}

/**
 * currentPage
 * totalPage
 */
PageComponent.prototype = {
    goPre(e) {
        this._go(e, this._currentPage - 1);
    },
    goNext(e) {
        this._go(e, this._currentPage + 1);
    },
    _go(e, nextPage) {
        e.preventDefault();
        if(this.refs.pager_input.value == nextPage && this._currentPage == nextPage) return;
        if (!this.checkPageIndex(nextPage)) {
            this.refs.pager_input.value = this._currentPage;
            return;
        }
        
        let beforeChange = this._option.beforePageChange || (() => true)
        if (beforeChange instanceof Function) {
            beforeChange = beforeChange()
        }
        if (!(beforeChange instanceof Promise)) {
            beforeChange = Promise.resolve(beforeChange)
        }
        beforeChange.then(result => {
            if (result) {
                this.currentPageChange(nextPage);
            }
        })
    },
    currentPageChange(nextPage) {
        if (this._option.pageChange) {
            this._option.pageChange(nextPage);
        }
        this.refs.pager_input.value = this._currentPage = nextPage;
        this.checkBoundary();
    },
    getInputWidth() {
        let len = this._totalPage.toString().length;
        if (len < 2) {
            return "30px";
        } else if (len === 2) {
            return "33px";
        } else {
            return 30 + (len - 2) * 10 + "px";
        }
    },
    checkPageIndex(index) {
        if (index < 1 || index > this._totalPage) {
            return false;
        }
        return true;
    },
    checkBoundary() {
        if (this._currentPage === 1) {
            // 左边界
            this.refs.pre_btn.classList.remove(this._canClick);
        } else {
            this.refs.pre_btn.classList.add(this._canClick);
        }
        if (this._currentPage === this._totalPage) {
            // 右边界
            this.refs.next_btn.classList.remove(this._canClick);
        } else {
            this.refs.next_btn.classList.add(this._canClick);
        }
    },
    reset(config) {
        if(config) {
            this._currentPage = config.currentPage || this._option.currentPage;
            this._totalPage = config.totalPage || this._option.totalPage;
            this.refs.pager_input.style.width = this.getInputWidth();
        }else {
            this._currentPage = this._option.currentPage;
        }
        this.refs.pager_input.value = this._currentPage;
        this.refs.pager_span.innerText = this._totalPage;

        this.checkBoundary();
    }
};