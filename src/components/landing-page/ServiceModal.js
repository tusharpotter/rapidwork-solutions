import Modal from "components/shared/Modal";
import React from "react";
import style from "./ServiceModal.module.scss";

export default function ServiceModal({ activeService, onClose }) {
  return (
    activeService && (
      <Modal isOpen={true} title={activeService.title} onClose={onClose} className={style.wrapper}>
        <div className={style.content}>
          <div className={style.image}>
            <img src={activeService.image} alt="" />
          </div>
          <div>
            <div className={style.body}>
              {activeService.fullBody.map((point) => (
                <p>{point}</p>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    )
  );
}
