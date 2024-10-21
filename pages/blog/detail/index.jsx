import BlogGallery from '../../../components/blog/BlogGallery';
import BlogHeader from '../../../components/blog/BlogHeader';
import { SingleBlogProvider } from '../../../context/SingleBlogContext';
import { motion } from 'framer-motion';
import { singleProjectData as singleProjectDataJson } from '../../../data/singleProjectData';
import Layout from "../../../components/layout";

const BlogDetailPage = ({blog}) => {
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
				<SingleBlogProvider blog={blog}>
					<BlogHeader />
					<BlogGallery />
				</SingleBlogProvider>
			</motion.div>
		</Layout>
	);
};

export default BlogDetailPage;


export const getStaticProps = async () => {
	console.log(singleProjectDataJson)
  return {
    props: {
      blog: singleProjectDataJson
    },
    revalidate: 1,
  };
};
