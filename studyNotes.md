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

- 一个事件处理程序不能是对一个函数的调用，它必须是一个函数或对一个函数的引用，但是可以通过函数返回一个函数的形式，实现一个可以传参的工厂方法
```javascript
const hello = (who) => {
    const handler = () => {
      console.log('hello', who)
    }
    return handler
  }
// 去掉辅助变量，直接返回创建的函数
const hello = (who) => {
  return () => {
    console.log('hello', who)
  }
}
// 函数是由一个返回命令组成的，可以省略大括号，并使用箭头函数的更紧凑的语法
const hello = (who) =>
  () => {
    console.log('hello', who)
  }
// 最后把所有的箭头写在同一行
const hello = (who) => () => {
  console.log('hello', who)
}
```
---
## part2
- 由map方法生成的元素，必须包含一个唯一键`key`，react通过这个key来实现组件的渲染更新，同时建议不要使用map方法的第二个参数`idx`传入key中，可能会造成一些[奇怪的错误](https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318)
- 条件运算符
```javascript
const result = condition ? val1 : val2
```
- 在提交的表单中点击submit后，会刷新页面，而增加`event.preventDefault()`后，可以避免刷新
- 在动态监控`input`标签时，如果仅设置`value`值，会导致`input`框无法输入，还需要配对`onChange`事件处理
- `npm install xxx`与`npm install xxx --save-dev`区别：前者是应用的运行依赖，后者是开发时的工具依赖
- 在项目的根目录下创建一个名为.env的文件，并添加这一行FAST_REFRESH=false，使React自动注意到`index.js`变化
- `useEffect`钩子可以实现对函数组件执行副作用，例如获取数据、设置订阅、以及手动改变React组件中的DOM，`useEffect`需要两个参数，第一个是函数，即每次渲染后执行的动作，第二个用于执行频率，如果传空列表，表示只用运行一次，否则会监测列表中的变量值的变化情况来执行函数
- 遍历对象的key可以使用`Object.keys(xxx)`，遍历对象的value使用`object.values(xxx)`
- 一些`secret key`配置相关的内容最好不要硬编码进代码中，一般推荐使用一个环境变量来保存，如在项目根目录下创建一个`.env`文件，以`REACT_APP_`开头存储变量，后续可以通过`process.env.REACT_APP_`的方式访问
- 数组的`find()`方法，返回数组中满足提供的测试函数的第一个元素的值
- 对于定义的模块，由于对象的键值名和定义的变量名相同，可以采取简化的表达语法：
```javascript
export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}
// 简化成
export default { getAll, create, update }
```

---
## part3
- package.json 中依赖的版本一般会表示成‘^a.b.c’，其中`^`表示如果项目依赖关系更新，安装的依赖的版本至少是‘a.b.c’，可以安装更大的patch（最后一个数字）号或minor（中间的数字）号，但是第一个major号必须是相同的，因为新的版本会在major号相同的情况下，保证向后兼容，而major号不同后，就不能保证了；使用`npm update`更新依赖
- 在express的路由里可以使用冒号语法定义参数`/api/notes/:i`，通过`request.params.id`取到id的值