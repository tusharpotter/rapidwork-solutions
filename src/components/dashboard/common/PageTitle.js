import React from "react";
import style from "./PageTitle.module.scss";

export default function PageTitle({ title }) {
  return <div className={style.wrapper}>{title}</div>;
}
