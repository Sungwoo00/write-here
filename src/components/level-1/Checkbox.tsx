import { useId } from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

function Checkbox({ checked, onChange, label }: CheckboxProps) {
  const id = useId();

  return (
    <div className="flex items-center space-x-2 text-[var(--dark-gray)]">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className={`
          w-5 h-5 
          appearance-none 
          rounded 
          cursor-pointer
          ${checked ? 'bg-[var(--logo-green)] relative' : 'bg-[var(--light-gray)]'} 
        `}
      />
      <img
        src="/icons/icon-check.svg"
        alt="check-icon"
        className={`absolute w-4 h-4 pointer-events-none`}
        style={{ position: 'absolute', marginLeft: '2px', marginTop: '2px' }}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default Checkbox;
