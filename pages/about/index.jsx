import { motion } from 'framer-motion';
import Layout from '../../components/layout';
import {AboutMeProvider} from "../../context/AboutMeContext"
import AboutMeBio from "../../components/parts/about/AboutMeBio"
import AboutCounter from "../../components/parts/about/AboutCounter"
import AboutClients from "../../components/parts/about/AboutClients"

const About = () => {
	return (
		<Layout>
			<AboutMeProvider>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, delay: 1 }}
					exit={{ opacity: 0 }}
					className="container mx-auto"
				>
					<AboutMeBio />
				</motion.div>

				{/** Counter without paddings */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, delay: 1 }}
					exit={{ opacity: 0 }}
				>
					<AboutCounter />
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, delay: 1 }}
					exit={{ opacity: 0 }}
					className="container mx-auto"
				>
					<AboutClients />
				</motion.div>
			</AboutMeProvider>
		</Layout>
	);
};

export default About;
