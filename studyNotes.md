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

- 三种for循环
```
for(var i=0; i<5; i++){}
# 针对数组
for(let value of array){}
# 针对对象里的属性
for(let property in object){}

```

- 遍历数组的方法`forEach()`
- 剩余参数操作符`...variable`

- 箭头表达式简略写法：
```
const bornYear = () => new Date().getFullYear() - age

const bornYear = () => {
  return new Date().getFullYear() - age
}
```

- 组件内数值变化不会自动去重新渲染，除非调用`refresh()`函数，利用状态钩子useState()，可以实现在值变化时，自动触发重新渲染的能力

- react禁止直接改变状态，改变状态必须始终通过将状态设置为一个新的对象来完成。如果前一个状态对象的属性没有改变，它们需要简单地复制，这可以通过将这些属性复制到一个新的对象中，并将其设置为新的状态来完成

```javascript
//错误的写法
const handleLeftClick = () => {
  clicks.left++;
  setClicks(clicks);
}
//正确写法一
const handleLeftClick = () => {
  const newClicks = {
    left: clicks.left+1,
    right: clicks.right
  }
  setClicks(newClicks)
}
//正确写法二
const handleLeftClick = () => {
  setClicks({...clicks, left: clicks.left+1})
}

```

- 钩子函数只能定义在其使用的组件函数体内调用，不可在条件语句、循环语句、非组件的函数内调用：
```javascript
const App = () => {
  // these are ok
  const [age, setAge] = useState(0)
  const [name, setName] = useState('Juha Tauriainen')

  if ( age > 10 ) {
    // this does not work!
    const [foobar, setFoobar] = useState(null)
  }

  for ( let i = 0; i < age; i++ ) {
    // also this is not good
    const [rightWay, setRightWay] = useState(false)
  }

  const notGood = () => {
    // and this is also illegal
    const [x, setX] = useState(-1000)
  }

  return (
    //...
  )
}
```

## part2
