import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import { ChevronDown } from "lucide-react";

const MONTHS = [
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

const FeesDetailsPage = () => {
  const instituteId = auth.currentUser?.uid;

  const currentYear = new Date().getFullYear();

  const [students, setStudents] = useState([]);
  const [institutesFees, setInstitutesFees] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const monthRef = useRef(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    totalFee: "",
    paidAmount: "",
    paidDate: "",
  });

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (monthRef.current && !monthRef.current.contains(e.target)) {
        setShowMonthDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= FETCH STUDENTS ================= */
  useEffect(() => {
    if (!instituteId) return;

    const q = query(
      collection(db, "trainerstudents"),
      where("trainerId", "==", instituteId),
    );

    return onSnapshot(q, (snap) => {
      const studentsData = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setStudents(studentsData);
    });
  }, [instituteId]);

  /* ================= FETCH FEES ================= */
  useEffect(() => {
    if (!instituteId) return;

    const q = query(
      collection(db, "institutesFees"),
      where("trainerId", "==", instituteId),
    );

    return onSnapshot(q, (snap) => {
      setInstitutesFees(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })),
      );
    });
  }, [instituteId]);

  /* ================= FILTER LOGIC ================= */
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch = `${s.firstName} ${s.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase());

      if (!matchesSearch) return false;
      if (!selectedMonth || !selectedYear) return true;

      const selectedDate = new Date(
        Number(selectedYear),
        Number(selectedMonth) - 1,
        1,
      );

      /* JOIN CHECK */
      if (s.joiningDate) {
        const joiningDate = new Date(s.joiningDate);

        if (
          selectedDate.getFullYear() < joiningDate.getFullYear() ||
          (selectedDate.getFullYear() === joiningDate.getFullYear() &&
            selectedDate.getMonth() < joiningDate.getMonth())
        ) {
          return false;
        }
      }

      /* LEFT CHECK */
      if (s.leftDate) {
        const leftDate = s.leftDate?.toDate?.() || new Date(s.leftDate);

        if (
          selectedDate.getFullYear() > leftDate.getFullYear() ||
          (selectedDate.getFullYear() === leftDate.getFullYear() &&
            selectedDate.getMonth() > leftDate.getMonth())
        ) {
          return false;
        }
      }

      return true;
    });
  }, [students, search, selectedMonth, selectedYear]);

  /* ================= EDIT STUDENT ================= */
  const handleEditStudent = (student) => {
    setSelectedStudent(student);

    const existingFee = institutesFees.find(
      (f) =>
        f.studentId === student.id &&
        f.month === `${selectedYear}-${selectedMonth}`,
    );

    setEditData({
      totalFee: student.monthlyFee || student.fees || "",
      paidAmount: existingFee?.paidAmount || "",
      paidDate: existingFee?.paidDate || "",
    });

    setShowEditModal(true);
  };

  const updateStudentPayment = async () => {
    if (!selectedStudent) return;
    if (!selectedMonth) {
      alert("Please select month");
      return;
    }

    const { totalFee, paidAmount, paidDate } = editData;

    await updateDoc(doc(db, "trainerstudents", selectedStudent.id), {
      monthlyFee: Number(totalFee),
    });

    if (paidAmount && paidDate) {
      await setDoc(doc(collection(db, "institutesFees")), {
        studentId: selectedStudent.id,
        trainerId: instituteId,
        totalAmount: Number(totalFee),
        paidAmount: Number(paidAmount),
        paidDate,
        month: `${selectedYear}-${selectedMonth}`,
        createdAt: serverTimestamp(),
      });
    }

    setShowEditModal(false);
  };

  /* ================= CALCULATIONS ================= */
  const totalStudents = filteredStudents.length;

  const totalAmount = filteredStudents.reduce(
    (sum, s) => sum + Number(s.monthlyFee || s.fees || 0),
    0,
  );

  const totalPaid = institutesFees
    .filter((f) => f.month === `${selectedYear}-${selectedMonth}`)
    .reduce((sum, f) => sum + Number(f.paidAmount || 0), 0);

  const totalPending = totalAmount - totalPaid;

  const getStudentFeeData = (student) => {
    const total = Number(student.monthlyFee || student.fees || 0);

    const feeRecord = institutesFees.find(
      (f) =>
        f.studentId === student.id &&
        f.month === `${selectedYear}-${selectedMonth}`,
    );

    const paid = Number(feeRecord?.paidAmount || 0);
    const pending = total - paid;
    const paidDate = feeRecord?.paidDate || "-";

    return { total, paid, pending, paidDate };
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#f3f4f6] min-h-screen max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <h1 className="text-3xl font-bold flex-1">Fees Details</h1>

        {/* YEAR FILTER */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          {[currentYear - 2, currentYear - 1, currentYear, currentYear + 1].map(
            (year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ),
          )}
        </select>

        {/* MONTH FILTER */}
        <div ref={monthRef} className="relative w-48">
          <button
            onClick={() => setShowMonthDropdown(!showMonthDropdown)}
            className="bg-orange-500 text-white rounded-lg px-4 py-3 font-semibold w-full flex items-center justify-between"
          >
            <span>
              {selectedMonth
                ? MONTHS.find((m) => m.value === selectedMonth)?.label
                : "Select Month"}
            </span>
            <ChevronDown size={18} />
          </button>

          {showMonthDropdown && (
            <div className="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-md max-h-48 overflow-y-auto">
              {MONTHS.map((m) => (
                <div
                  key={m.value}
                  onClick={() => {
                    setSelectedMonth(m.value);
                    setShowMonthDropdown(false);
                  }}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {m.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Fees Amount" value={`₹ ${totalAmount}`} />
        <StatCard title="Total Fees Pending" value={`₹ ${totalPending}`} />
        <StatCard title="Total Fees Paid" value={`₹ ${totalPaid}`} />
        <StatCard title="Total Students" value={totalStudents} />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <div className="grid grid-cols-5 bg-black text-orange-500 px-6 py-3 font-semibold">
          <div>Students Name</div>
          <div>Sessions</div>
          <div>Total</div>
          <div>Paid</div>
          <div>Pending</div>
        </div>

        {filteredStudents.map((student, index) => {
          const data = getStudentFeeData(student);

          return (
            <div
              key={student.id}
              className="grid grid-cols-5 px-6 py-4 border-t cursor-pointer hover:bg-orange-50"
              onClick={() => handleEditStudent(student)}
            >
              <div className="flex items-center">
                <span className="mr-2">{index + 1}.</span>
                {student.firstName} {student.lastName}
              </div>
              <div>{student.sessions || "-"}</div>
              <div>₹ {data.total}</div>
              <div>₹ {data.paid}</div>
              <div>₹ {data.pending}</div>
            </div>
          );
        })}
      </div>

      {showEditModal && (
        <ModalForm
          title="Update Fee Details"
          data={editData}
          setData={setEditData}
          onSave={updateStudentPayment}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-black text-white p-4 rounded-lg">
    <h3>{title}</h3>
    <p className="text-xl text-orange-500 mt-2">{value}</p>
  </div>
);

const ModalForm = ({ title, data, setData, onSave, onClose }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
    <div className="bg-white p-6 rounded-xl w-96 space-y-4">
      <h2>{title}</h2>

      <input
        type="number"
        placeholder="Total Fee"
        value={data.totalFee}
        onChange={(e) => setData({ ...data, totalFee: e.target.value })}
        className="border w-full p-2 rounded"
      />

      <input
        type="number"
        placeholder="Paid Amount"
        value={data.paidAmount}
        onChange={(e) => setData({ ...data, paidAmount: e.target.value })}
        className="border w-full p-2 rounded"
      />

      <input
        type="date"
        value={data.paidDate}
        onChange={(e) => setData({ ...data, paidDate: e.target.value })}
        className="border w-full p-2 rounded"
      />

      <div className="flex justify-end gap-3">
        <button onClick={onClose}>Cancel</button>
        <button
          onClick={onSave}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
);

export default FeesDetailsPage;