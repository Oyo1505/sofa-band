import React, { memo } from 'react';

type TimeSlot<K extends string = 'ja' | 'en' | 'id'> = {
  [key in K]: string | number;
};

interface SelectInputProps {
  optionsList: TimeSlot[];
  formData?: number;
  label?: string;
  formDataKey: string;
  locale: 'ja' | 'en';
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const SelectInput = memo(({
  optionsList,
  label,
  formData,
  locale,
  onChange,
  className,
}:SelectInputProps) => {
  const time = optionsList.filter(h => h.id === formData)[0]

  return (
    <div className='flex flex-col gap-2'>
      <label>{label}</label>
      <select
        onChange={onChange}
        defaultValue={time ? time.id : ''}
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
});
SelectInput.displayName = 'SelectInput'
export default SelectInput;
