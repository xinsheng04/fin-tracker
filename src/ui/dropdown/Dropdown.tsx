import styles from './dropdown.module.css';
type DropdownProps = {
  children ?:React.ReactNode;
  label : string;
  name:string;
  options:{value:string;label:string}[];
  required?:boolean;
}

function Dropdown ({label,options,...props}:DropdownProps){
  return(
    <label className={styles.label}>
      {label}
      <select className={styles.select}{...props}>
        <option value="">--Select---</option>
        {options.map(opt=>(
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  )
}
export default Dropdown;