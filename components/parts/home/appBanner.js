import useThemeSwitcher from '../../../hooks/useThemeSwitcher';
import { ArrowDownCircleIcon } from '@heroicons/react/16/solid';
import { motion } from 'framer-motion';
import Link from 'next/link';

const AppBanner = () => {
	const [activeTheme] = useThemeSwitcher();

	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
			className="flex flex-col sm:justify-between items-center md:flex-row mt-12 md:mt-2 aboutme"
		>

			<div className="w-full text-left rounded-lg shadow-xl bg-gray-900 text-white">
			     <motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						ease: 'easeInOut',
						duration: 0.9,
						delay: 0.3,
					}} className="border-b border-gray-800 px-8 py-3">
                    <div className="inline-block w-3 h-3 mr-2 rounded-full bg-red-500"></div>
                    <div className="inline-block w-3 h-3 mr-2 rounded-full bg-yellow-300"></div>
                    <div className="inline-block w-3 h-3 mr-2 rounded-full bg-green-400"></div>
                </motion.div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						ease: 'easeInOut',
						duration: 0.9,
						delay: 0.3,
					}} className="px-8 py-6">
                    <p>
                      <em className="text-blue-400">const</em> <span className="text-green-400">aboutMe</span> <span className="text-pink-500">=</span> <em className="text-blue-400">function</em>() {'{'}
					</p>
                    <p>&nbsp;&nbsp;<span className="text-pink-500">return</span> {'{'}</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;name: <span className="text-yellow-300">'山内　太郎'</span>,</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;position: <span className="text-yellow-300">'PM && Full Stack Dev'</span>,</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;website: <span className="text-yellow-300">'&lt;<a target="_blank" className="text-yellow-300 hover:underline focus:border-none" href="https://techvenience.com">https://techvenience.com</a>&gt;'</span>,</p>
                    <p>&nbsp;&nbsp;{'}'}</p>
                    <p>{'}'}</p>
                </motion.div>
				{/* <motion.h1
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						ease: 'easeInOut',
						duration: 0.9,
						delay: 0.1,
					}}
					className="font-general-semibold text-2xl lg:text-3xl xl:text-4xl text-center sm:text-left text-ternary-dark dark:text-primary-light uppercase"
				>
					Hi, Iam Stoman
				</motion.h1>
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						ease: 'easeInOut',
						duration: 0.9,
						delay: 0.2,
					}}
					className="font-general-medium mt-4 text-lg md:text-xl lg:text-2xl xl:text-3xl text-center sm:text-left leading-normal text-gray-500 dark:text-gray-200"
				>
					A Full-Stack Developer & Design Enthusiast
				</motion.p> */}
				{/* <motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						ease: 'easeInOut',
						duration: 0.9,
						delay: 0.3,
					}}
					className="flex justify-center sm:block"
				>
					<a
						download="Stoman-Resume.pdf"
						href="/files/Stoman-Resume.pdf"
						className="font-general-medium flex justify-center items-center w-36 sm:w-48 mt-12 mb-6 sm:mb-0 text-lg border border-indigo-200 dark:border-ternary-dark py-2.5 sm:py-3 shadow-lg rounded-lg bg-indigo-50 focus:ring-1 focus:ring-indigo-900 hover:bg-indigo-500 text-gray-500 hover:text-white duration-500"
						aria-label="Download Resume"
					>
						<ArrowDownCircleIcon className="mr-2 sm:mr-3 h-5 w-5 sn:w-6 sm:h-6 duration-100"></ArrowDownCircleIcon>
						<span className="text-sm sm:text-lg font-general-medium duration-100">
							Download CV
						</span>
					</a>
				</motion.div> */}
			</div>
			<motion.div
				initial={{ opacity: 0, y: -180 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
				className="w-full sm:w-2/3 text-right float-right mt-8 sm:mt-0"
			>
				<img
					src={
						activeTheme === 'dark' ? `/images/developer.svg` : `/images/developer-dark.svg`
					}
					alt="Developer"
				/>
			</motion.div>
		</motion.section>
	);
};

export default AppBanner;
