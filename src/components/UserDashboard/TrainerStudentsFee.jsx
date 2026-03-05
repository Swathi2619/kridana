import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { auth, db } from "../../firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const PaymentOverview = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feeHistory, setFeeHistory] = useState([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const [generatedMonths, setGeneratedMonths] = useState([]);
  const [showReminder, setShowReminder] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // =========================
        // Fetch trainer student
        // =========================
        const studentRef = doc(db, "trainerstudents", user.uid);
        const snap = await getDoc(studentRef);

        if (!snap.exists()) {
          setLoading(false);
          return;
        }

        const studentData = snap.data();
        setStudent(studentData);

        // =========================
        // Fetch institute fees history
        // =========================
        const feesRef = collection(db, "institutesFees");
        const q = query(feesRef, where("studentId", "==", user.uid));
        const feesSnap = await getDocs(q);

        const history = [];
        let paidSum = 0;

        feesSnap.forEach((doc) => {
          const data = doc.data();
          history.push(data);
          paidSum += Number(data.paidAmount || 0);
        });

        setFeeHistory(history);
        setTotalPaid(paidSum);

        // =========================
        // AUTO GENERATE MONTHS FROM JOINING DATE
        // =========================
        if (studentData.joiningDate) {
          const joinDate = new Date(studentData.joiningDate);
          const today = new Date();
          const monthsArray = [];

          let tempDate = new Date(
            joinDate.getFullYear(),
            joinDate.getMonth(),
            1,
          );

          while (
            tempDate.getFullYear() < today.getFullYear() ||
            (tempDate.getFullYear() === today.getFullYear() &&
              tempDate.getMonth() <= today.getMonth())
          ) {
            const monthName = tempDate.toLocaleString("default", {
              month: "long",
            });

            const year = tempDate.getFullYear();
            const monthKey = `${monthName} ${year}`;

            const isPaid = history.some((item) => item.month === monthKey);

            monthsArray.push({
              month: monthName,
              year,
              key: monthKey,
              paid: isPaid,
            });

            tempDate.setMonth(tempDate.getMonth() + 1);
          }

          setGeneratedMonths(monthsArray);
        }

        // =========================
        // REMINDER LOGIC (3 days before due date)
        // =========================
        if (studentData.monthlyDate) {
          const today = new Date();
          const todayDate = today.getDate();
          const dueDay = Number(studentData.monthlyDate);

          if (todayDate >= dueDay - 3 && todayDate < dueDay) {
            setShowReminder(true);
          } else {
            setShowReminder(false);
          }
        }
      } catch (err) {
        console.error("Error fetching student:", err);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!student) return <div className="p-8">No Data Found</div>;

  const monthlyFee = Number(student.monthlyFee || 0);
  const pendingFee = monthlyFee - totalPaid;

  return (
    <div className="bg-white min-h-screen p-8">
      {/* Reminder Popup */}
      {showReminder && (
        <div className="fixed top-5 right-5 z-50 animate-bounce">
          <div className="bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg">
            <p className="font-semibold">Payment Reminder 🔔</p>
            <p className="text-sm mt-1">
              Your fee is due on {student.monthlyDate}
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Payment Overview</h1>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-2 gap-8">
        {/* Customer Card */}
        <div className="bg-white border border-orange-400 rounded-lg">
          {/* Top Section */}
          <div className="p-5 border-b border-orange-300">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">
                  Customer 01 : {student.firstName} {student.lastName}
                </h3>
                <p className="text-xs text-gray-500">
                  {student.category} - {student.subCategory}
                </p>
              </div>
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-600">Due Amount</p>
              <p className="text-red-500 font-semibold text-lg">
                ₹{monthlyFee}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                To be paid : {student.monthlyDate}
              </p>
            </div>
          </div>

          {/* Payment History */}
          <div className="p-5 border-b border-orange-300">
            <h4 className="font-semibold mb-3">Payment History</h4>

            {generatedMonths.length === 0 && (
              <p className="text-xs text-gray-400">No payments found</p>
            )}

            {generatedMonths.map((item, index) => (
              <div key={index} className="flex justify-between text-sm mb-3">
                <div>
                  <p className="font-medium">
                    {item.month} {item.year}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Due Date: {student.monthlyDate}
                  </p>
                </div>

                {item.paid ? (
                  <p className="font-medium text-green-600">Paid</p>
                ) : (
                  <p className="font-medium text-red-600">Unpaid</p>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Summary */}
          <div className="p-5 text-sm font-medium">
            <div className="flex justify-between  mb-2">
              <p>Fees Paid</p>
              <p>₹{totalPaid}</p>
            </div>
            <div className="flex justify-between">
              <p>Pending Fees</p>
              <p>₹{pendingFee < 0 ? 0 : pendingFee}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOverview;
