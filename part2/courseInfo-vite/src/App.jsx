const Part = ({name, exercises}) => (
  <p>{name} {exercises}</p>
)

const Content = ({content}) => (
  <>
    {content.map(item => <Part name={item.name} exercises={item.exercises} key={item.name}/>)}
  </>
)

const Header = ({headerName}) => {
  return (
    <h1>{headerName}</h1>
  )
}

const Course = ({course}) => (
  <>
    <Header headerName={course.name}/>
    <Content content={course.parts}/>
    <strong>total of {course.parts.reduce((total, item) => (total + item.exercises), 0)} exercises</strong>
  </>
)


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course}/>
}


export default App
