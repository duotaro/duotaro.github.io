import { motion } from 'framer-motion';
import Layout from '../../components/layout';
import ContactForm from "../../components/parts/contact/ContactForm"
import ContactDetails from "../../components/parts/contact/ContactDetails"

const Contact = () => {
	return (
		<Layout>
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				ease: 'easeInOut',
				duration: 0.5,
				delay: 0.1,
			}}
			className="container mx-auto flex flex-col-reverse lg:flex-row py-5 lg:py-10 lg:mt-10"
		>
			<ContactForm />
			<ContactDetails />
		</motion.div>
		</Layout>
	);
};

export default Contact;
