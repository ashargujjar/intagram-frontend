import type { ChangeEvent } from "react";
import Input from "../Input";
type VerifyAccountProps = {
  stepNumber: string;
  headingText: string;
  label: string;
  name: string;
  placeholder: string;
  type: string;
  buttonText: string;
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
const VerifyAccountInputProp = ({
  stepNumber,
  headingText,
  label,
  name,
  placeholder,
  type,
  buttonText,
  value,
  handleChange,
}: VerifyAccountProps) => {
  return (
    <div className="md:col-span-3 p-8 flex flex-col gap-8">
      <div>
        <div className="text-xs font-['Spline_Sans_Mono'] uppercase tracking-widest text-[#6B7280]">
          Step {stepNumber}
        </div>
        <h2 className="text-lg font-semibold text-[#1E4F7A] mt-1">
          {headingText}
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        <Input
          Label={label}
          name={name}
          placeholder={placeholder}
          type={type}
          value={value}
          handleChange={handleChange}
        />

        <button
          type="button"
          className="bg-[#1E4F7A] text-white py-2.5 rounded-full hover:bg-[#143A5A] transition shadow-md"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
export default VerifyAccountInputProp;
