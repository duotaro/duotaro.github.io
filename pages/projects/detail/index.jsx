import ProjectGallery from '../../../components/projects/ProjectGallery';
import ProjectHeader from '../../../components/projects/ProjectHeader';
import ProjectInfo from '../../../components/projects/ProjectInfo';
import ProjectRelatedProjects from '../../../components/projects/ProjectRelatedProjects';
import { SingleProjectProvider } from '../../../context/SingleProjectContext';
import { motion } from 'framer-motion';
import { singleProjectData as singleProjectDataJson } from '../../../data/singleProjectData';
import Layout from "../../../components/layout";

const ProjectSingle = ({project}) => {
	return (
		<Layout>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, delay: 1 }}
				transition={{
					ease: 'easeInOut',
					duration: 0.6,
					delay: 0.15,
				}}
				className="container mx-auto mt-5 sm:mt-10"
			>
				<SingleProjectProvider project={project}>
					<ProjectHeader />
					<ProjectGallery />
					<ProjectInfo />
					<ProjectRelatedProjects />
				</SingleProjectProvider>
			</motion.div>
		</Layout>
	);
};

export default ProjectSingle;


export const getStaticProps = async () => {
	console.log(singleProjectDataJson)
  return {
    props: {
      project: singleProjectDataJson
    },
    revalidate: 1,
  };
};
