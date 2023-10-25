import style from "./style.module.css";

// source from https://loading.io/css/; license CC0
export function LdsSpinner() {
  return (
    <div className={style["lds-spinner"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
