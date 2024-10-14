import React from "react";
import style from "./Modal.module.scss";

import { X } from "react-feather";
import clsx from "clsx";

const Modal = (props) => {
  return (
    <>
      {props.isOpen ? (
        <div className={style.backdrop}>
          <div className={clsx(style.content, props.className)}>
            <div className={style.modalController}>
              <p>{props.title}</p>
              <button onClick={props.onClose}>
                <X />
              </button>
            </div>
            <div className={style.child}>{props.children}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
