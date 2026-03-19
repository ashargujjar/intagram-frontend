import type React from "react";

type InputProps = {
  type: string;
  Label: string;
  placeholder: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Input = ({
  type,
  Label,
  placeholder,
  name,
  value,
  handleChange,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm text-gray-600">
        {Label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        name={name}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1E4F7A]"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
