import { useTheme } from "../../contexts/ThemeContext";

const InputForm = ({ icon, placeholder, value, name, type, onChange }) => {
  const { isDark } = useTheme();
  return (
    <div className={`flex w-full items-center rounded-lg border 
      ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-200'}`}>
      <div className="pl-4">
        <img src={icon} alt="icon" />
      </div>
      <input
        className={`
          ml-4 pl-4 py-3 w-full outline-none
          ${isDark
            ? 'bg-zinc-800 focus:bg-zinc-700 text-zinc-100 placeholder:text-zinc-400'
            : 'bg-white focus:bg-gray-100 text-zinc-800 placeholder:text-zinc-500'}
        `}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputForm;
