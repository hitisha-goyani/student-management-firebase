import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addData,
  deleteData,
  fetchData,
  updateData,
} from "../store/StudentThunk";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaUserGraduate,
  FaBook,
  FaCalendarAlt,
  FaIdBadge,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const StudentList = () => {
  const dispatch = useDispatch();
  const { students, loading } = useSelector((state) => state.student);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [roll, setRoll] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [status, setStatus] = useState("Not Completed");
  const [editId, setEditId] = useState(null);

  const [filterCourse, setFilterCourse] = useState("All Courses"); // NEW FILTER STATE

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = { name, course, roll, joiningDate, status };

    if (editId) {
      dispatch(updateData({ id: editId, newData: newStudent }));
      setEditId(null);
    } else {
      dispatch(addData(newStudent));
    }

    setName("");
    setCourse("");
    setRoll("");
    setJoiningDate("");
    setStatus("Not Completed");
  };

  const handleEdit = (student) => {
    setName(student.name);
    setCourse(student.course);
    setRoll(student.roll);
    setJoiningDate(student.joiningDate);
    setStatus(student.status || "Not Completed");
    setEditId(student.id);
  };

  const handleToggleStatus = (student) => {
    const newStatus =
      student.status === "Completed" ? "Not Completed" : "Completed";
    dispatch(
      updateData({ id: student.id, newData: { ...student, status: newStatus } })
    );
  };

  // Distinct course list for filter
  const courseOptions = [
    "All Courses",
    ...new Set(students.map((s) => s.course)),
  ];

  // Apply filter
  const filteredStudents =
    filterCourse === "All Courses"
      ? students
      : students.filter((s) => s.course === filterCourse);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-800 p-6 flex justify-center">
      <div className="max-w-6xl w-full bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/20">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-white mb-8 drop-shadow-lg">
          🎓 Student Management
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
        >
          {/* GR No */}
          <div className="flex items-center bg-gradient-to-r from-green-500 to-green-600 rounded-xl px-3 shadow-md">
            <FaIdBadge className="text-white mr-2" />
            <input
              type="number"
              placeholder="GR No."
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              className="w-full p-3 text-white bg-transparent placeholder-white/80 focus:outline-none"
              required
            />
          </div>

          {/* Name */}
          <div className="flex items-center bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl px-3 shadow-md">
            <FaUserGraduate className="text-white mr-2" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 text-white bg-transparent placeholder-white/80 focus:outline-none"
              required
            />
          </div>

          {/* Course */}
          <div className="flex items-center bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl px-3 shadow-md">
            <FaBook className="text-white mr-2" />
            <input
              type="text"
              placeholder="Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full p-3 text-white bg-transparent placeholder-white/80 focus:outline-none"
              required
            />
          </div>

          {/* Joining Date */}
          <div className="flex items-center bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl px-3 shadow-md">
            <FaCalendarAlt className="text-white mr-2" />
            <input
              type="date"
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
              className="w-full p-3 text-white bg-transparent focus:outline-none"
              required
            />
          </div>
          {/* Course Filter */}
          <div className="flex items-center bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl px-3 shadow-md">
            <FaBook className="text-white mr-2" />
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="w-full p-3 text-white bg-transparent placeholder-white/80 focus:outline-none"
            >
              {[
                "All Courses",
                ...Array.from(new Set(students.map((s) => s.course))).sort(
                  (a, b) => a.localeCompare(b)
                ),
              ].map((course, idx) => (
                <option key={idx} value={course} className="text-black">
                  {course}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="col-span-1 md:col-span-2 lg:col-span-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-xl shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 font-semibold"
          >
            <FaPlus />
            {editId ? "Update Student" : "Add Student"}
          </button>
        </form>

        {/* Loading */}
        {loading && <p className="text-center text-white">Loading...</p>}

        {/* Student Table */}
        <div className="overflow-x-auto">
          {filteredStudents.length > 0 ? (
            <table className="min-w-full border-collapse border border-white/20 bg-white/10 text-white rounded-xl">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <tr>
                  <th className="p-3 border border-white/20">GR No.</th>
                  <th className="p-3 border border-white/20">Name</th>
                  <th className="p-3 border border-white/20">Course</th>
                  <th className="p-3 border border-white/20">Joining Date</th>
                  <th className="p-3 border border-white/20">Status</th>
                  <th className="p-3 border border-white/20 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-white/20">
                    <td className="p-3 border border-white/10">
                      {student.roll}
                    </td>
                    <td className="p-3 border border-white/10">
                      {student.name}
                    </td>
                    <td className="p-3 border border-white/10">
                      {student.course}
                    </td>
                    <td className="p-3 border border-white/10">
                      {student.joiningDate}
                    </td>
                    <td
                      className="p-3 border border-white/10 cursor-pointer hover:bg-white/30 transition"
                      onClick={() => handleToggleStatus(student)}
                      title="Click to toggle status"
                    >
                      {student.status === "Completed" ? (
                        <span className="text-green-400 font-bold">
                          ✅ Completed
                        </span>
                      ) : (
                        <span className="text-red-400 font-bold">
                          ❌ Not Completed
                        </span>
                      )}
                    </td>
                    <td className="p-3 border border-white/10 flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(student)}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => dispatch(deleteData(student.id))}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-white">No students found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentList;
