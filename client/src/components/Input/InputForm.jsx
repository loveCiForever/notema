const InputForm = ({ icon, placeholder,value,type,onChange}) => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center">
        <div className="pl-2 absolute z-10 text-black"><img src={icon} alt={icon} /></div>
        <input
          className="relative pl-9 border-[2px] border-black outline-none px-10 py-2 rounded-lg hover:bg-gray-100  hover:border-blue-600  focus:bg-gray-100 focus:border-blue-600 "
          type={type}
          name="username"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
export default InputForm;