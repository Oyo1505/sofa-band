import React from 'react';

type TimeSlot<K extends string = 'jp' | 'en'> = {
  [key in K]: string;
};
enum LocaleEnum {
  jp = 'jp',
  en = 'en'
}

interface SelectInputProps {
  optionsList:  TimeSlot[];
  formData: Record<string, any>;
  label?: string;
  formDataKey: string;
  locale: LocaleEnum;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  optionsList,
  label,
  formData,
  formDataKey,
  locale,
  onChange,
  className,
}) => {
  return (
    <>
    <label>{label}</label>
    <select 
      onChange={onChange} 
      defaultValue={formData?.[formDataKey]} 
      className={className}
    >
      <option value=""></option>
      {optionsList?.map((option, index) => (
        <option 
          key={`${option?.[locale]}-${index}`} 
          value={option?.[locale]}
        >
          {option?.[locale]}
        </option>
      ))}
    </select>
    </>
  );
};

export default SelectInput;