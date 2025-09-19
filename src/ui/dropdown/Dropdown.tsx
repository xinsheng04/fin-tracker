import styles from './dropdown.module.css';

type DropdownOption = string | { value: string; label: string };

type DropdownProps = {
  children?: React.ReactNode;
  label: string;
  name: string;
  options: DropdownOption[];
  required?: boolean;
};

function Dropdown({ label, options, ...props }: DropdownProps) {
  return (
    <label className={styles.label}>
      {label}
      <select className={styles.select} {...props}>
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