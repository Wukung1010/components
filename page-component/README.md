# 分页组件

## 使用方法

```javascript
new Page(el, option);
```

传入配置对象

```javascript
option = {
    currentPage, totalPage, beforePageChange, pageChange;
}
```

### 配置描述

| 属性名           | 类型     | 描述                                                                                |
| ---------------- | -------- | ----------------------------------------------------------------------------------- |
| currentPage      | Number   | 当前显示的页                                                                        |
| totalPage        | Number   | 总页数                                                                              |
| beforePageChange | Function | 回调，接受变动之后的页数为参数，返回 true 继续开始执行翻页操作，返回 false 放弃翻页 |
| pageChange       | Function | 回调，接受当前页数为参数，翻页完成之后触发                                          |
