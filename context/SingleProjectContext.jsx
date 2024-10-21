import { useState, createContext } from 'react';

const SingleProjectContext = createContext();

export const SingleProjectProvider = ({ project, children }) => {
	const [singleProjectData, setSingleProjectData] = useState(project);

	return (
		<SingleProjectContext.Provider
			value={{ singleProjectData, setSingleProjectData }}
		>
			{children}
		</SingleProjectContext.Provider>
	);
};

export default SingleProjectContext;
