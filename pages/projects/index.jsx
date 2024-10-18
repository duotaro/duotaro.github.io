import Head from "next/head";
import Layout from "../../components/layout";
import ProjectsGrid from "../../components/projects/ProjectsGrid";
import { GENRE_LIST } from "../../const";
import { ProjectsProvider } from "../../context/ProjectsContext";

const Projects = () => {
	const tagList = getCategoryList(GENRE_LIST)
	return (
		<Layout>
			<Head>
			<title>Techvenience - Projects-</title>
			<link rel="icon" href="/favicon.ico" />
			</Head>
			<ProjectsProvider tagList={tagList}>
				<div className="container mx-auto">
					<ProjectsGrid />
				</div>
			</ProjectsProvider>
		</Layout>
	);
};

export default Projects;




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