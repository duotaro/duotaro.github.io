// NOTE: This scroll to top is the actual working scroll to to when user clicks on the circle arrow that appears when use scrolls down.
// The other `ScrollToTop` component in components folder is for the default react scroll to top behavior on route visit.

import { ChevronUpIcon } from '@heroicons/react/16/solid';
import { useState, useEffect } from 'react';

const useScrollToTop = () => {
	const [showScroll, setShowScroll] = useState(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			// ここで window を使用
			window.addEventListener('scroll', scrollToTop);
			return function cleanup() {
				window.removeEventListener('scroll', scrollToTop);
			};
		  }
	});

	const scrollToTop = () => {
		if (!showScroll && window.pageYOffset > 400) {
			setShowScroll(true);
		} else if (showScroll && window.pageYOffset <= 400) {
			setShowScroll(false);
		}
	};

	const backToTop = () => {
		if (typeof window !== 'undefined') {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}
	};
	if (typeof window !== 'undefined') {
	  window.addEventListener('scroll', scrollToTop);
	}

	return (
		<>
			<ChevronUpIcon
				className="scrollToTop"
				onClick={backToTop}
				style={{
					height: 45,
					width: 45,
					borderRadius: 50,
					right: 50,
					bottom: 50,
					display: showScroll ? 'flex' : 'none',
					padding: 5,
				}}
			/>
		</>
	);
};

export default useScrollToTop;
