const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {
      parts.map(part => (
        <Part part={part} key={part.id}/>
      ))
    }
  </>

const Course = ({ course }) => {
  const total = course.parts.reduce((prev, cur) => prev + cur.exercises, 0) 

  return (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total sum={total} />
  </div>
  )
}

export default Course