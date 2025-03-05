interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`absolute w-4 h-4 text-white pointer-events-none ${
          checked ? 'block' : 'hidden'
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        style={{ position: 'absolute', marginLeft: '2px', marginTop: '2px' }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M5 13l4 4L19 7"
        />
      </svg>
      <label>{label}</label>
    </div>
  );
}

export default Checkbox;
