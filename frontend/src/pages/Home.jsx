import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

// Components
import Modal from "../components/Modal";
import BirthdayForm from "../components/BirthdayForm";
import BirthdayList from "../components/BirthdayList";

// Styles
import "../styles/Home.css";
import { getAge } from "../helpers/calcAge";
import { getMonthDay } from "../helpers/persianDate";


function Home() {
  const [people, setPeople] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [sortBy, setSortBy] = useState("date");

  const loadData = async () => {
    const res = await axios.get("/birthdays");
    setPeople(res.data);
  };

  const addOrEditPerson = async ({ name, birthday }) => {
    if (editData) {
      await axios.put(`/birthdays/${editData._id}`, { name, birthday });
      setEditData(null);
    } else {
      await axios.post("/birthdays", { name, birthday });
    }
    loadData();
  };

  const deletePerson = async (id) => {
    await axios.delete(`/birthdays/${id}`);
    loadData();
  };

  const startEdit = (person) => {
    setEditData(person);
  };

  const cancelEdit = () => setEditData(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    await deletePerson(deleteId);
    setShowModal(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  useEffect(() => {
    loadData();
  }, []);
  

  const sortedPeople = [...people].sort((a, b) => {
    if (sortBy === "age") {
      return getAge(b.birthday) - getAge(a.birthday);
    } else {
      people.sort((a, b) => {
        const da = getMonthDay(a.birthday);
        const db = getMonthDay(b.birthday);

        if (da.month === db.month) return da.day - db.day;
        return da.month - db.month;
      });
    }
  });

  return (
    <div className="container">
      <h1 className="title">کی کِی به دنیا اومده؟</h1>
      <BirthdayForm
        addOrEditPerson={addOrEditPerson}
        editData={editData}
        cancelEdit={cancelEdit}
      />

      <div className="sort-buttons">
        <button
          className={sortBy === "date" ? "active" : ""}
          onClick={() => setSortBy("date")}
        >
          مرتب‌سازی بر اساس تاریخ
        </button>
        <button
          className={sortBy === "age" ? "active" : ""}
          onClick={() => setSortBy("age")}
        >
          مرتب‌سازی بر اساس سن
        </button>
      </div>
      
      <BirthdayList
        people={sortedPeople}
        startEdit={startEdit}
        handleDeleteClick={handleDeleteClick}
        editId={editData?._id}
      />
      {showModal && (
        <Modal
          message="آیا مطمئنی ک میخوای این تاریخ رو حذف کنی؟"
          confirmTxt={"آره دیگ ندوسش"}
          cancelTxt={"نه نه دستم خورد"}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default Home;
