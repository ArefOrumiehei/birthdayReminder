import "../styles/Modal.css";

function Modal({ message, confirmTxt, cancelTxt, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="modal-btn-confirm" onClick={onConfirm}>
            {confirmTxt}
          </button>
          <button className="modal-btn-cancel" onClick={onCancel}>
            {cancelTxt}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
