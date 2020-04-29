export const scrollToTheTop = function() {
	const scrollToElement = document.getElementById('scrollTop');
	return scrollToElement.scrollIntoView({ alignToTop: true, behavior: 'smooth' });
};
