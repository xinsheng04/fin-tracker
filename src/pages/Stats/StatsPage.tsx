import style from "./stats.module.css";
const StatsPage: React.FC = () => {
  return (
    <>
    <div className={style.main}>
      <div className={style.right}>right</div>
      <div className={style.left}/*left*/>
      Left
        <div>1</div>
        <div>2</div>
      </div>
    </div>
    </>
    
  );
}

export default StatsPage;