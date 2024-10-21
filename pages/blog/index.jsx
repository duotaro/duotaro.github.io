import Head from "next/head";
import Layout from "../../components/layout";
import BlogGrid from "../../components/blog/BlogGrid";
import { GENRE_LIST } from "../../const";
import { BlogProvider } from "../../context/BlogContext";

const Blog = () => {
	const tagList = getCategoryList(GENRE_LIST)
	return (
		<Layout>
			<Head>
			<title>Techvenience - Blog-</title>
			<link rel="icon" href="/favicon.ico" />
			</Head>
			<BlogProvider list={tagList}>
				<div className="container mx-auto">
					<BlogGrid />
				</div>
			</BlogProvider>
		</Layout>
	);
};

export default Blog;




const getCategoryList = (posts) => {

	let tagList = []
	let tagNameList = []
	
	posts.map((tag) => {
	  if(tag.name == 'Home'){
		return false;
	  }
	  if(tagNameList.indexOf(tag.name) < 0){
		tagList.push(tag)
		tagNameList.push(tag.name)
	  }
	})
	return tagList
  }