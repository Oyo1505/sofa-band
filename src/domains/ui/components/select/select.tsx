import React from 'react';

type TimeSlot<K extends string = 'jp' | 'en'> = {
  [key in K]: string;
};

interface SelectInputProps {
  optionsList:  TimeSlot[];
  formData: Record<string, any>;
  label?: string;
  formDataKey: string;
  locale: 'jp' | 'en';
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
    <div className='flex flex-col gap-2'>
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
          value={option?.id}
        >
          {option?.[locale]}
        </option>
      ))}
    </select>
    </div>
  );
};

export default SelectInput;