import { motion } from "framer-motion";

const AboutStackDetail = ({ item }) => {
	return (
		<motion.div className="block rounded-lg border-2 dark:bg-primary-dark text-center text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
			<h5 className="border-b-2 border-gray-200 px-6 py-3 dark:border-white/10 text-xl font-semibold leading-tight">
			{item.title}
			</h5>
			<div className="px-6 py-4 h-[260px]">
				<p className="mb-4 text-base ">
					{item.desc}
				</p>
			</div>
			<div className="border-t-2 border-gray-200 px-6 py-3 text-surface/75 dark:border-white/10 dark:text-neutral-300 max-h-12">
			 経験年数:{item.age}年
			</div>
		</motion.div>
	);
};

export default AboutStackDetail;
