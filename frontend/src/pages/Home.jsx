import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

// Components
import Modal from "../components/Modal";
import BirthdayForm from "../components/BirthdayForm";
import BirthdayList from "../components/BirthdayList";

// Styles
import "../styles/Home.css";


function Home() {
  const [people, setPeople] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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

  return (
    <div className="container">
      <h1 className="title">کی کِی به دنیا اومده؟</h1>
      <BirthdayForm
        addOrEditPerson={addOrEditPerson}
        editData={editData}
        cancelEdit={cancelEdit}
      />
      <BirthdayList
        people={people}
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
