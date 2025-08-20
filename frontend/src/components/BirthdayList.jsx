import BirthdayItem from "./BirthdayItem";

function BirthdayList({ people, startEdit, handleDeleteClick, editId }) {
  return (
    <ul className="birthday-list">
      {people?.map((p) => (
        <BirthdayItem
          key={p?._id}
          person={p}
          startEdit={startEdit}
          handleDeleteClick={handleDeleteClick}
          isEditing={editId === p?._id}
        />
      ))}
    </ul>
  );
}

export default BirthdayList;
