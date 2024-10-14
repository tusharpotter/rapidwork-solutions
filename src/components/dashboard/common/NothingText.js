import React from "react";
import style from "./NothingText.module.scss";

export default function NothingText() {
  return (
    <div className={style.wrapper}>
      <div className={style.nothingText}>Nothing To Show</div>
    </div>
  );
}
