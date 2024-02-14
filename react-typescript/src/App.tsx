/* interface Course {
  name: string,
  exerciseCount: number
} */

interface HeaderProps {
  name: string
}

interface TotalProps {
  total: number
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWithDesc extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseWithDesc {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBaseWithDesc {
  backgroundMaterial: string;
  kind: "background"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

interface ContentProps {
  parts: CoursePart[]
}


const Part = (course: CoursePart) => {
	switch (course.kind) {
	case "basic":
		return (
			<div>
				<h3>{course.name} {course.exerciseCount}</h3>
				<p>{course.description}</p>
			</div>)
	case "group":
		return (
			<div>
				<h3>{course.name} {course.exerciseCount}</h3>
				<p>project exercises {course.groupProjectCount}</p>
			</div>
		)
	case "background":
		return (
			<div>
				<h3>{course.name} {course.exerciseCount}</h3>
				<p>{course.description}</p>
				<p>{course.backgroundMaterial}</p>
			</div>
		)
	}
}

const Header = (props: HeaderProps) => {
	return (
		<h1>{props.name}</h1>
	)
}

const Content = (props: ContentProps) => {
	return (
		props.parts.map(part => (
			<Part {...part} />
		))
	)
}

const Total = (props: TotalProps) => {
	return (
		<span>Number of exercises: {props.total}</span>
	)
}

const App = () => {
	const courseName = "Half Stack application development";
	const courseParts: CoursePart[] = [
		{
			name: "Fundamentals",
			exerciseCount: 10,
			description: "This is an awesome course part",
			kind: "basic"
		},
		{
			name: "Using props to pass data",
			exerciseCount: 7,
			groupProjectCount: 3,
			kind: "group"
		},
		{
			name: "Basics of type Narrowing",
			exerciseCount: 7,
			description: "How to go from unknown to string",
			kind: "basic"
		},
		{
			name: "Deeper type usage",
			exerciseCount: 14,
			description: "Confusing description",
			backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
			kind: "background"
		},
		{
			name: "TypeScript in frontend",
			exerciseCount: 10,
			description: "a hard part",
			kind: "basic",
		},
	];
	/* 	const courseParts = [
		{
			name: "Fundamentals",
			exerciseCount: 10
		},
		{
			name: "Using props to pass data",
			exerciseCount: 7
		},
		{
			name: "Deeper type usage",
			exerciseCount: 14
		}
	]; */

	const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

	return (
		<div>
			<Header name={courseName}/>
			<Content parts={courseParts} />
			<Total total={totalExercises} />
		</div>
	);
};

export default App;