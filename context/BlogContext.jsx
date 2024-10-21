import { useState, createContext } from 'react';

// Create blog context
export const BlogContext = createContext();

// Create the blog context provider
export const BlogProvider = ({list, children}) => {
	const [blog, setBlog] = useState(list);
	const [searchBlog, setSearchBlog] = useState('');
	const [selectBlog, setSelectBlog] = useState('');

	const toNormalForm = (str) => {
		return str
			.replace(/[\u30A1-\u30F6]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0x60)) // カタカナをひらがなに
			.normalize("NFD") // 正規化
			.replace(/[\u3000-\u303F]/g, '') // 不要な文字を削除
			.toLowerCase(); // 小文字に変換
	};

	// Search blog by blog title
	const searchBlogByTitle = blog.filter((item) => {
		const searchLower = toNormalForm(searchBlog);
		const nameMatches = toNormalForm(item.name).includes(searchLower);
		const descriptionMatches = item.description ? toNormalForm(item.description).includes(searchLower) : false; // nullチェックを追加
		const matches = nameMatches || descriptionMatches;
	
		return matches || searchBlog === '';
	});

	// Select blog by blog category
	const selectBlogByCategory = blog.filter((item) => {
		let category = item.genre;
		return category.includes(selectBlog);
	});

	return (
		<BlogContext.Provider
			value={{
				blog,
				setBlog,
				searchBlog,
				setSearchBlog,
				searchBlogByTitle,
				selectBlog,
				setSelectBlog,
				selectBlogByCategory,
			}}
		>
			{children}
		</BlogContext.Provider>
	);
};
