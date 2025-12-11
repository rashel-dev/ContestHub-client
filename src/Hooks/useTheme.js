import { useEffect } from "react";

const useTheme = () => {
    useEffect(() => {
        // Get the saved theme from localStorage
        const savedTheme = localStorage.getItem("theme");

        // Apply the theme to the document element
        if (savedTheme) {
            document.documentElement.setAttribute("data-theme", savedTheme);
        } else {
            // Default to light theme if no theme is saved
            document.documentElement.setAttribute("data-theme", "light");
        }
    }, []);
};

export default useTheme;
