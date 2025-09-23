import styles from './dropdown.module.css';

type DropdownOption = string | { value: string; label: string };

type DropdownProps = {
  className?: string;
  label: string;
  name: string;
  value?: string;
  options: DropdownOption[];
  onChange?:(e:React.ChangeEvent<HTMLSelectElement>)=>void;
  required?: boolean;
};

function Dropdown({ className, label, name, options, value, onChange, required }: DropdownProps) {
  return (
    <label className={`${styles.label} ${className || ""}`}>
      {label}
      <select className={styles.select} name={name} value={value && value} onChange={onChange} required={required}>
        <option value="">--Select---</option>
        {options.map((opt, index) => {
          if (typeof opt === 'string') {
            return (
              <option key={index} value={opt}>
                {opt}
              </option>
            );
          }
          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
    </label>
  );
}

export default Dropdown;