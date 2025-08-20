import { formatPersianDate } from "../helpers/persianDate";

function BirthdayItem({ person, startEdit, handleDeleteClick, isEditing }) {
  return (
    <li className={`birthday-item ${isEditing ? "editing" : ""}`}>
      <span className="birthday-name">{person?.name}</span>{" "}
      <span className="birthday-date">
        {formatPersianDate(person?.birthday)}
      </span>
      <div className="actions">
        <button className="btn-edit" onClick={() => startEdit(person)}>
          ✏️
        </button>
        <button className="btn-delete" onClick={() => handleDeleteClick(person._id)}>
          🗑️
        </button>
      </div>
    </li>
  );
}

export default BirthdayItem;
