import { useContext } from 'react';
import AboutMeContext from '../../../context/AboutMeContext';
import AboutStackDetail from './AboutStackDetail';

const AboutStacks = () => {
	const { clientsData, clientsHeading } = useContext(AboutMeContext);

	return (
		<div className="mt-10 sm:mt-20">
			<p className="font-general-medium text-2xl sm:text-3xl  text-center text-primary-dark dark:text-primary-light">
				{clientsHeading}
			</p>
			<div className="grid grid-cols-2 lg:grid-cols-3 mt-10 sm:mt-14 gap-4 sm:gap-10">
				{clientsData.map((client) => (
					<AboutStackDetail
						item={client}
					/>
				))}
			</div>
		</div>
	);
};

export default AboutStacks;
