import ClassForm from "./components/ClassForm";
import FunctionalForm from "./components/FunctionalForm";

import "./styles/App.css";

function App()
{
	return (
		<div>
			<h1>Class Component Form</h1>
			<ClassForm/>
			<h1>Functional Component Form</h1>
			<FunctionalForm/>
		</div>
	);
}

export default App;