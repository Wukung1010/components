function PageComponent(el, option) {
    this._rootEl = el;
    this._option = option;
    this._canClick = "can-click";
    this.refs = {};
    this._render = render.bind(this);
    this._pageEL = this._render(
        "ul",
        {
            class: "jtable-page-ul"
        },
        [
            this._render("li", {}, [
                this._render(
                    "a",
                    {
                        class: "jtable-page-pre",
                        ref: "pre_btn"
                    },
                    "上一页"
                )
            ]),
            this._render("div", {}, [
                this._render("input", {
                    type: "number",
                    ref: "jtable_input",
                    style: {
                        width: this.getInputWidth()
                    },
                    value: this._option.currentPage
                }),
                this._render("span", {}, "/"),
                this._render("span", {}, this._option.totalPage)
            ]),
            this._render("li", {}, [
                this._render(
                    "a",
                    {
                        class: "jtable-page-next",
                        ref: "next_btn"
                    },
                    "下一页"
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
    this.refs.jtable_input.addEventListener("blur", e => {
        let next = null;
        try{
            next = parseInt(this.refs.jtable_input.value);
        }catch(e){
            return ;
        }
        if(next !== this._option.currentPage) {
            this._go(e, next);
        }
    });

    return {};
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
        this._go(e, this._option.currentPage - 1);
    },
    goNext(e) {
        this._go(e, this._option.currentPage + 1);
    },
    _go(e, nextPage) {
        e.preventDefault();
        if(this.refs.jtable_input.value == nextPage && this._option.currentPage == nextPage) return;
        if (!this.checkPageIndex(nextPage)) {
            this.refs.jtable_input.value = this._option.currentPage;
            return;
        }else {
            this.refs.jtable_input.value = this._option.currentPage = nextPage;
        }

        if (
            this._option.beforePageChange &&
            !this._option.beforePageChange(nextPage)
        ) {
            return;
        }
        this.currentPageChange(nextPage);
    },
    currentPageChange(nextPage) {
        if (nextPage !== this._option.currentPage) {
            if (this._option.pageChange) {
                this._option.pageChange(nextPage);
            }
        }
        this.checkBoundary();
    },
    getInputWidth() {
        let len = this._option.totalPage.toString().length;
        if (len < 2) {
            return "30px";
        } else if (len === 2) {
            return "33px";
        } else {
            return 30 + (len - 2) * 10 + "px";
        }
    },
    checkPageIndex(index) {
        if (index < 1 || index > this._option.totalPage) {
            return false;
        }
        return true;
    },
    checkBoundary() {
        if (this._option.currentPage === 1) {
            // 左边界
            this.refs.pre_btn.classList.remove(this._canClick);
            this.refs.next_btn.classList.add(this._canClick);
        } else if (this._option.currentPage === this._option.totalPage) {
            // 右边界
            this.refs.next_btn.classList.remove(this._canClick);
            this.refs.pre_btn.classList.add(this._canClick);
        } else {
            this.refs.next_btn.classList.add(this._canClick);
            this.refs.pre_btn.classList.add(this._canClick);
        }
    }
};

module.exports.default = module.exports = PageComponent;
