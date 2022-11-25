import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useEffect, useState } from 'react'

const DarkModeToggle = () => {
  // get isDarkMode from localStorage
  const [isDarkMode, setIsDarkMode] = useState( localStorage.getItem( 'isDarkMode' ) === 'true' )

  // set isDarkMode as string to localStorage
  useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode.toString())
  } , [isDarkMode])

  // add dark mode class to body via useEffect
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  } , [isDarkMode]);

  return (
    <DarkModeSwitch
      checked={isDarkMode}
      onChange={setIsDarkMode}
      size={120}
    />
  );
};

export default DarkModeToggle;