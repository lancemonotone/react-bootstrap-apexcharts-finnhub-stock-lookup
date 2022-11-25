import { DarkModeSwitch } from 'react-toggle-dark-mode';

const DarkModeToggle = () => {
  const [isDarkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  return (
    <DarkModeSwitch
      style={{ marginBottom: '2rem' }}
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={120}
    />
  );
};

export default DarkModeToggle;