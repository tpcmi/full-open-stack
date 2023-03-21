## Part0
- `href` 与 `src` 的区别：
> `href`全称Hypertext Reference，表示当前元素和引用资源之间建立联系；`src`表示替换当前元素，一般用在`img` `script` `iframe`上

- 注意在所有 `label`元素上使用 `for`属性；它是将标签链接到表单控件的一种正规方式。这个属性引用对应的表单控件的 `id`。
---
## Part1
- React组件名必须是大写，否则会被识别为普通的html标签

- 组件内必须包含一个根元素，否则会报错：
  -  常见：`<div> </div>`
  -  返回一个array:`[]`
  -  推荐使用空元素，不会产生额外的div元素： `<></>`

- 解构赋值
```javascript
const t = [1, 2, 3, 4, 5]

const [first, second, ...rest] = t
```

- 对象字面量
```javascript
const object1 = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
}
```

- 组件里传参的类型可以是数组和字符串，**传对象类型会报错**

- 通过引用调用对象里的方法时，该方法失去了对原始this的引用，this的值变成了全局对象
- `setTimeout`函数去调用对象里的方法，也会导致this消失,此时的解决方法如下：
```javascript
const arto = {
  name: 'Arto Hellas',
  greet: function() {
    console.log('hello, my name is ' + this.name)
  },
}

setTimeout(arto.greet, 1000) // 报错

setTimeout(arto.greet.bind(arto),1000)
```