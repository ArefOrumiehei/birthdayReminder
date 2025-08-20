import { getAge } from "../helpers/calcAge";
import { formatPersianDate } from "../helpers/persianDate";

// Icons
import { IconPencil, IconTrash } from '@tabler/icons-react';

function BirthdayItem({ person, startEdit, handleDeleteClick, isEditing }) {
  const age = getAge(person?.birthday);
  
  return (
    <li className={`birthday-item ${isEditing ? "editing" : ""}`}>
      <div className="person">
        <span className="person-name">{person?.name}</span>
        <span className="person-age">{age ? `(${age} سالشه)` : ""}</span>
      </div>
      <span className="birthday-date">
        {formatPersianDate(person?.birthday)}
      </span>
      <div className="actions">
        <button className="btn-edit" onClick={() => startEdit(person)}>
          <IconPencil size={24} stroke={1.75} />
        </button>
        <button className="btn-delete" onClick={() => handleDeleteClick(person?._id)}>
          <IconTrash size={24} stroke={1.75} />
        </button>
      </div>
    </li>
  );
}

export default BirthdayItem;
