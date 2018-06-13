export const getSelectedTheme = () => {
    const selectedTheme = localStorage.getItem('selectedTheme');
	return parseInt(selectedTheme, 10);
};
