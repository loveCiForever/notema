const InputForm = ({ icon, placeholder, value, name, type, onChange }) => {
  return (
    <div className="flex w-full border-[1px] border-black/10 items-center justify-center rounded-lg ">
      <div className="pl-4 text-black">
        <img src={icon} alt={"input-form-icon"} />
      </div>
      <input
        className="ml-4 pl-4 outline-none w-full py-3   focus:bg-gray-100"
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
