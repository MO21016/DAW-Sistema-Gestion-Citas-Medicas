import { X } from 'lucide-react';

const Modal = ({ title, children, onClose }) => {

  return (

    <div className="modal-overlay">

      <div className="modal-container">

        <div className="modal-header">

          <h2>{title}</h2>

          <button
            className="modal-close"
            onClick={onClose}
          >
            <X size={20} />
          </button>

        </div>

        <div className="modal-body">
          {children}
        </div>

      </div>

    </div>

  );

};

export default Modal;