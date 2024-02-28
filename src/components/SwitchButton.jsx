const SwitchButton = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <label className="switch">
      <input onClick={() => setIsDarkMode(isDarkMode === 0 ? 1 : 0)} type="checkbox" />
      <span className="slider"></span>
    </label>
  )
}

export default SwitchButton