import { useState, createContext } from 'react';
import { aboutMeData } from '../data/aboutMeData';
import { clientsHeading as clientsPageHeading } from '../data/techStacksData';
import { techStackData as techStackDataJson } from '../data/techStacksData';

const AboutMeContext = createContext();

export const AboutMeProvider = ({ children }) => {
	const [aboutMe, setAboutMe] = useState(aboutMeData);

	const clientsHeading = clientsPageHeading;

	const [clientsData, setClientsData] = useState(techStackDataJson);

	return (
		<AboutMeContext.Provider
			value={{
				aboutMe,
				setAboutMe,
				clientsHeading,
				clientsData,
				setClientsData,
			}}
		>
			{children}
		</AboutMeContext.Provider>
	);
};

export default AboutMeContext;
