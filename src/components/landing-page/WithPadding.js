import React from "react";
import style from "./WithPadding.module.scss";

import clsx from "clsx";

export default function WithPadding({ className, id, children }) {
  return (
    <div className={clsx(style.wrapper, className)} id={id}>
      {children}
    </div>
  );
}
