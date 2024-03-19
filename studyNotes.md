## Part0
- `href` 与 `src` 的区别：
> `href`全称Hypertext Reference，表示当前元素和引用资源之间建立联系；`src`表示替换当前元素，一般用在`img` `script` `iframe`上

- 注意在所有 `label`元素上使用 `for`属性；它是将标签链接到表单控件的一种正规方式。这个属性引用对应的表单控件的 `id`。
---
## Part1
- 创建react-app的方法：
```
npm create react-app
npm create vite@latest part1 -- --template react
```

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

- this的值在函数被调用时，基于函数的调用方式决定的，通过引用调用对象里的方法时，该方法失去了对原始this的引用，this的值变成了全局对象
```javascript
// this指向obj
obj.method()
// this指向全局
ref = obj.method
ref()
```
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
```javascript
for(var i=0; i<5; i++){}
# 针对数组
for(let value of array){}
# 针对对象里的属性
for(let property in object){}

```

- 遍历数组的方法`forEach()`
- 剩余参数操作符`...variable`

- 箭头表达式简略写法：
```javascript
const bornYear = () => new Date().getFullYear() - age

const bornYear = () => {
  return new Date().getFullYear() - age
}
```

- 组件内数值变化不会自动去重新渲染，除非调用`refresh()`函数，利用状态钩子useState()，可以实现在值变化时，自动触发重新渲染的能力

- react禁止直接改变状态，改变状态必须始终通过将状态设置为一个`新的对象`来完成。如果前一个状态对象的属性没有改变，它们需要简单地复制，这可以通过将这些属性复制到一个新的对象中，并将其设置为新的状态来完成

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
- `npm install xxx`与`npm install xxx --save-dev`区别：前者是应用的运行依赖，后者是开发时的工具依赖，打包时，开发依赖的包不会打包进生产环境包
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
- `import a from A` 与 `import {a} from A`是有区别的，前者是将导出A模块所有内容为a，后者是导入A模块中指定的一部分
- 组件的入参不要忘记用 `{}` ，具有解构的作用，否则入参会被额外多包裹一层

---
## part3
- package.json 中依赖的版本一般会表示成‘^a.b.c’，其中`^`表示如果项目依赖关系更新，安装的依赖的版本至少是‘a.b.c’，可以安装更大的patch（最后一个数字）号或minor（中间的数字）号，但是第一个major号必须是相同的，因为新的版本会在major号相同的情况下，保证向后兼容，而major号不同后，就不能保证了；使用`npm update`更新依赖
- 在express的路由里可以使用冒号语法定义参数`/api/notes/:id`，通过`request.params.id`取到id的值
- express的返回`.send()`方法，如果返回一个字符串，则默认`Content-Type`为`text/html`；`.json()`方法会返回一个`Content-Type`为`application/json`的响应（否则需要使用`JSON.stringify()`方法来转换一下对象返回）
- 中间件按序执行，建议一般按照预期顺序去`use`；自定义中间件时，有三个参数`(request, response, next)`，其中最后执行`next()`，表示将控制权交给下一个中间件
- 【工具】[morgan](https://github.com/expressjs/morgan)，是一个express中间件，可以终端输出请求日志信息
- 【工具】在后端依赖里安装`cors`包，当做中间件来使用，可以允许来自所有源的请求，cors是可以配置的（允许的源和请求的方法）
- 【工具】`nodemon`为node.js项目监听代码文件变动，自动重启，但是仅限于后端代码，前端的内容仍然需要手动刷新
- `npm run build`构建生产包，一般建议线上环境面向用户时，使用生产包，这样包体积更小，性能损耗更小
- `app.use(express.json())`使用express json解析器来将请求中的json数据解析为对象，否则会报错
- array.some()用于判断数组中是否至少存在一个满足条件的元素，存在返回true/false
- `app.use(express.static('build'))` 将打好的包，放在server的根目录下，并在服务的中间件里加上这个处理，后续当服务收到请求时，会检查`build`文件下是否有对应的请求地址，有则返回，同时由于前后端都在一个文件下，可以修改前端的请求地址为相对地址，只保留接口即可
```
// 改之前
// const baseUrl = "http://localhost:3001/api/notes";
// const baseUrl = "https://restless-glade-433.fly.dev/api/notes"

// 修改后
const baseUrl = "/api/notes";
```
- 在package.json里增加`"proxy":"http://XXX.XXX"`配置，当app发出一个向服务端的请求时，会被重定向到指定的代理地址上
- 定义node的模块与ES6不同，通过在模块底部设置为module.exports的值，后续在别的文件里引入：
```javascript
// a.js
module.exports = XXXX
// b.js,路径不包含文件后缀
const moduleA = require('path/to/a')
```
- 通过`process.argv`获取命令行传入的参数组成的array
- 一些常量字段不适合硬编码进代码中，通常是通过环境变量传入，以下举例两种方法
```javascript
MONGODB_URI=address_here npm run dev
```
```javascript
/**
 * npm install dotenv
 * 根目录下创建.env文件，将环境变量写在文件里
 * */ 
require('dotenv').config()
const url = process.env.MONGODB_URI
```
- 在请求中，对于异常处理，可以采用另写中间件的方式，中间件函数会承接四个参数，`error、request、response、next`，中间件函数必须是最后加载的中间件
- 可以在schema处增加表单验证