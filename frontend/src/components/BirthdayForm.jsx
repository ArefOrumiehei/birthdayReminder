import { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import "react-multi-date-picker/styles/layouts/mobile.css"
import "react-multi-date-picker/styles/colors/yellow.css"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";

function BirthdayForm({ addOrEditPerson, editData, cancelEdit }) {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState(null);

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setBirthday(editData.birthday);
    } else {
      setName("");
      setBirthday(null);
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !birthday) return;
    addOrEditPerson({ name, birthday: birthday.toDate().toISOString() });
    setName("");
    setBirthday(null);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="input-field"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="نام"
      />
      <DatePicker
        value={birthday}
        onChange={setBirthday}
        calendar={persian}
        locale={persian_fa}
        className="rmdp-mobile yellow bg-dark input-field"
        format="YYYY/MM/DD"
        placeholder="تاریخ تولد"
        calendarPosition="bottom-right"
        style={{
          height: "40px",
          fontSize: "16px",
          padding: "0 10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          boxSizing: "border-box"
        }}
      />
      <button type="submit" className="btn">
        {editData ? 
          <span>
            ویرایش
            <IconPencil size={18} />
          </span> 
        :
          <span>
            افزودن
            <IconPlus size={18} />
          </span>
        }
      </button>
      {editData && (
        <button type="button" className="btn-cancel" onClick={cancelEdit}>
          <span>
            لغو
            <IconX size={18} />
          </span>
        </button>
      )}
    </form>
  );
}

export default BirthdayForm;
