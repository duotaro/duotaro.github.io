import { useContext } from 'react';
import BlogSingle from './BlogSingle';
import { BlogContext } from '../../context/BlogContext';
import BlogFilter from './BlogFilter';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';

const BlogGrid = () => {
	const {
		blog,
		searchBlog,
		setSearchBlog,
		searchBlogByTitle,
		selectBlog,
		setSelectBlog,
		selectBlogByCategory,
	} = useContext(BlogContext);


	console.log("-----console.log(blogs)----")
	console.log(blog)

	return (
		<section className="py-5  mt-5">
			<div className="text-center">
				<p className="font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">
					Blog
				</p>
			</div>

			<div className="mt-5 sm:mt-16">
				<div
					className="
                        flex
                        justify-between
                        border-b border-primary-light
                        dark:border-secondary-dark
                        pb-3
                        gap-3
                        "
				>
					<div className="flex justify-between gap-2">
						<span
							className="
                                hidden
                                sm:block
                                bg-primary-light
                                dark:bg-ternary-dark
                                p-2.5
                                shadow-sm
                                rounded-xl
                                cursor-pointer
                                "
						>
							<MagnifyingGlassIcon className="text-ternary-dark dark:text-ternary-light w-5 h-5"></MagnifyingGlassIcon>
						</span>
						<input
							onChange={(e) => {
								setSearchBlog(e.target.value);
							}}
							className="font-general-medium 
                                pl-3
                                pr-1
                                sm:px-4
                                py-2
                                border 
                            border-gray-200
                                dark:border-secondary-dark
                                rounded-lg
                                text-sm
                                sm:text-md
                                bg-secondary-light
                                dark:bg-ternary-dark
                                text-primary-dark
                                dark:text-ternary-light
                                "
							id="name"
							name="name"
							type="search"
							required=""
							placeholder="Search Blog"
							aria-label="Name"
						/>
					</div>

					<BlogFilter setSelectBlog={setSelectBlog} />
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 sm:gap-10">
				{selectBlog
					? selectBlogByCategory.map((blog) => (
							<BlogSingle
								title={blog.name}
								genre={blog.genre}
								src={blog.src}
								key={blog.id}
							/>
					  ))
					: searchBlog
					? searchBlogByTitle.map((blog) => (
							<BlogSingle
								title={blog.name}
								genre={blog.genre}
								src={blog.src}
								key={blog.id}
							/>
					  ))
					: blog.map((blog) => (
							<BlogSingle
								title={blog.name}
								genre={blog.genre}
								src={blog.src}
								key={blog.id}
							/>
					  ))}
			</div>
		</section>
	);
};

export default BlogGrid;
