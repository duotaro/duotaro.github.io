import { useState, createContext } from 'react';

const SingleBlogContext = createContext();

export const SingleBlogProvider = ({ blog, children }) => {
	const [singleBlogData, setSingleBlogData] = useState(blog);

	return (
		<SingleBlogContext.Provider
			value={{ singleBlogData, setSingleBlogData }}
		>
			{children}
		</SingleBlogContext.Provider>
	);
};

export default SingleBlogContext;
