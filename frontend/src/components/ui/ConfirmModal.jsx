import { TriangleAlert } from 'lucide-react';

const ConfirmModal = ({
  title,
  message,
  onConfirm,
  onCancel
}) => {

  return (

    <div className="modal-overlay">

      <div className="confirm-modal">

        <div className="confirm-icon">
          <TriangleAlert size={30} />
        </div>

        <h2>{title}</h2>

        <p>{message}</p>

        <div className="confirm-actions">

          <button
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancelar
          </button>

          <button
            className="btn btn-danger"
            onClick={onConfirm}
          >
            Eliminar
          </button>

        </div>

      </div>

    </div>

  );

};

export default ConfirmModal;