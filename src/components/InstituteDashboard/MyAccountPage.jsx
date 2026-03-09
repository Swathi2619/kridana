import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

import { serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { User, Users, ImageUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyAccountPage = ({ setActiveMenu }) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("edit");

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    bio: "",
    profileImage: "", // ✅ added
  });

  const [media, setMedia] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTrainerDeleteModal, setShowTrainerDeleteModal] = useState(false);
  const [trainerToDelete, setTrainerToDelete] = useState(null);
  const [deleteReason, setDeleteReason] = useState("");

  const [activeCount, setActiveCount] = useState(0);
  const [leftCount, setLeftCount] = useState(0);
  const [newCount, setNewCount] = useState(0);

  /* ================= CUSTOMERS STATE ================= */
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [leaveReason, setLeaveReason] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const [showUploadTypeModal, setShowUploadTypeModal] = useState(false);
  const [selectedUploadType, setSelectedUploadType] = useState("");
  const [pendingFile, setPendingFile] = useState(null);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.uid) return;

      const ref = doc(db, "institutes", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) setProfile(snap.data());
    };

    fetchProfile();
  }, [user]);

  /* ================= FETCH MEDIA ================= */
  useEffect(() => {
    const fetchMedia = async () => {
      if (!user?.uid) return;

      const snap = await getDocs(
        collection(db, "institutes", user.uid, "media"),
      );
      setMedia(snap.docs.map((d) => d.data().image));
    };

    fetchMedia();
  }, [user]);
  useEffect(() => {
    if (activeTab !== "management" || !user?.uid) return;

    const fetchTrainers = async () => {
      const q = query(
        collection(db, "InstituteTrainers"),
        where("instituteId", "==", user.uid),
      );

      const snap = await getDocs(q);

      const list = snap.docs
        .map((d) => ({
          id: d.id,
          ...d.data(),
        }))
        .filter((t) => t.status !== "Left");

      setTrainers(list);
    };

    fetchTrainers();
  }, [activeTab, user]);

  /* ================= FETCH STUDENTS ================= */
  useEffect(() => {
    if (activeTab !== "customers" || !user?.uid) return;
    const fetchLeftTrainers = async () => {
      const q = query(
        collection(db, "InstituteTrainers"),
        where("instituteId", "==", user.uid),
        where("status", "==", "Left"),
      );

      const snap = await getDocs(q);

      const leftList = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      console.log("Left Trainers:", leftList); // check in console
    };

    const fetchStudents = async () => {
      const q = query(
        collection(db, "students"),
        where("instituteId", "==", user.uid),
      );

      const snap = await getDocs(q);

      const list = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        status: d.data().status || "Active", // default Active
      }));

      setStudents(list);
      setFilteredStudents(list);
      setStudents(list);
      setFilteredStudents(list);
    };

    fetchStudents();
  }, [activeTab, user]);
  const handleUpdateStudent = async () => {
    if (!editingStudent) return;

    try {
      await updateDoc(doc(db, "students", editingStudent.id), {
        firstName: editingStudent.firstName || "",
        lastName: editingStudent.lastName || "",
        email: editingStudent.email || "",
        phone: editingStudent.phone || "",
        address: editingStudent.address || "",
        age: editingStudent.age || "",
        belt: editingStudent.belt || "",
        category: editingStudent.category || "",
        subCategory: editingStudent.subCategory || "",
        dateOfBirth: editingStudent.dateOfBirth || "",
        joiningDate: editingStudent.joiningDate || "",
        monthlyDate: editingStudent.monthlyDate || "",
        sessions: editingStudent.sessions || "",
        timings: editingStudent.timings || "",
      });

      setStudents((prev) =>
        prev.map((s) => (s.id === editingStudent.id ? editingStudent : s)),
      );

      setShowEditStudentModal(false);
      setEditingStudent(null);
    } catch (error) {
      console.error("Update error:", error);
    }
  };
  const uploadToCloudinary = async (file, type) => {
    setUploading(true);
    setUploadMsg("");

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "kridana_upload");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/daiyvial8/${type}/upload`,
        {
          method: "POST",
          body: data,
        },
      );

      const result = await res.json();

      if (!result.secure_url) {
        throw new Error(result.error?.message || "Cloudinary upload failed");
      }

      setUploadMsg("✅ Upload Successful!");
      return result.secure_url;
    } catch (err) {
      console.error("Cloudinary Upload Error:", err);
      alert("Upload Failed: " + err.message);
      return "";
    } finally {
      setUploading(false);
      setTimeout(() => setUploadMsg(""), 3000);
    }
  };

  /* ================= FILTER STUDENTS ================= */
  useEffect(() => {
    let data = [...students];

    if (statusFilter !== "All") {
      data = data.filter((s) => s.status === statusFilter);
    }

    if (searchText) {
      data = data.filter((s) =>
        `${s.firstName} ${s.lastName}`
          .toLowerCase()
          .includes(searchText.toLowerCase()),
      );
    }

    setFilteredStudents(data);
  }, [searchText, statusFilter, students]);
  /* ================= UPDATE COUNTS INSTANTLY ================= */
  useEffect(() => {
    const active = students.filter((s) => s.status === "Active").length;
    const left = students.filter((s) => s.status === "Left").length;

    const now = new Date();
    const last30Days = students.filter((s) => {
      if (!s.createdAt) return false;
      const created = s.createdAt.toDate();
      const diff = (now - created) / (1000 * 60 * 60 * 24);
      return diff <= 30;
    }).length;

    setActiveCount(active);
    setLeftCount(left);
    setNewCount(last30Days);
  }, [students]);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  /* ================= SAVE PROFILE ================= */
  const handleSave = async () => {
    try {
      const ref = doc(db, "institutes", user.uid);

      await updateDoc(ref, {
        fullName: profile.fullName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        bio: profile.bio || "",
      });

      alert("Profile Saved ✅");
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  /* ================= UPLOAD PROFILE IMAGE ================= */
  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !user?.uid) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result;

      try {
        // update UI
        setProfile((prev) => ({
          ...prev,
          profileImage: base64,
        }));

        // update only image field in Firestore
        await setDoc(
          doc(db, "institutes", user.uid),
          { profileImage: base64 },
          { merge: true }
        );
      } catch (error) {
        console.error("Profile upload error:", error);
      }
    };

    reader.readAsDataURL(file);
  };

  /* ================= UPLOAD MEDIA ================= */
  const handleUpload = async () => {
    if (!pendingFile || !selectedUploadType || !user?.uid) return;

    const cloudType = selectedUploadType === "image" ? "image" : "video";

    const url = await uploadToCloudinary(pendingFile, cloudType);
    if (!url) return;

    const instituteRef = doc(db, "institutes", user.uid);
    const snap = await getDoc(instituteRef);
    if (!snap.exists()) return;

    const data = snap.data();
    let updateData = {};

    if (selectedUploadType === "image") {
      updateData = {
        images: [...(data.images || []), url],
        updatedAt: serverTimestamp(),
      };
    }

    if (selectedUploadType === "video") {
      updateData = {
        videos: [...(data.videos || []), url],
        updatedAt: serverTimestamp(),
      };
    }

    if (selectedUploadType === "reel") {
      updateData = {
        reels: [...(data.reels || []), url],
        updatedAt: serverTimestamp(),
      };
    }

    await updateDoc(instituteRef, updateData);

    setMedia((prev) => [...prev, url]); // preview
    setPendingFile(null);
    setSelectedUploadType("");
    setShowUploadTypeModal(false);
  };

  const confirmDeleteTrainer = async () => {
    if (!trainerToDelete || !deleteReason.trim()) {
      alert("Please enter reason");
      return;
    }

    try {
      await updateDoc(doc(db, "InstituteTrainers", trainerToDelete.id), {
        status: "Left",
        leftReason: deleteReason,
        leftDate: serverTimestamp(),
      });

      // Remove from UI immediately
      setTrainers((prev) => prev.filter((t) => t.id !== trainerToDelete.id));

      setDeleteReason("");
      setTrainerToDelete(null);
      setShowTrainerDeleteModal(false);
    } catch (error) {
      console.error("Error updating trainer:", error);
    }
  };

  const handleEditTrainer = (trainer) => {
    setEditingTrainer(trainer);
    setShowEditModal(true);
  };

  const handleUpdateTrainer = async () => {
    if (!editingTrainer) return;

    await updateDoc(
      doc(db, "InstituteTrainers", editingTrainer.id),
      editingTrainer,
    );

    setTrainers((prev) =>
      prev.map((t) => (t.id === editingTrainer.id ? editingTrainer : t)),
    );

    setShowEditModal(false);
    setEditingTrainer(null);
  };
  const markStudentLeft = async () => {
    if (!selectedStudent) return;

    await updateDoc(doc(db, "students", selectedStudent.id), {
      status: "Left",
      leftReason: leaveReason,
      leftDate: serverTimestamp(),
    });

    setStudents((prev) =>
      prev.map((s) =>
        s.id === selectedStudent.id
          ? {
            ...s,
            status: "Left",
            leftReason: leaveReason,
            leftDate: serverTimestamp(),
          }
          : s,
      ),
    );

    setLeaveReason("");
    setShowDeleteModal(false);
    setSelectedStudent(null);
  };
  const permanentlyDeleteStudent = async (student) => {
    if (!window.confirm("Permanently delete this customer?")) return;

    await deleteDoc(doc(db, "students", student.id));

    setStudents((prev) => prev.filter((s) => s.id !== student.id));
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Mark this customer as Left?")) return;

    await updateDoc(doc(db, "students", id), {
      status: "Left",
      leftDate: serverTimestamp(),
    });

    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: "Left", leftDate: serverTimestamp() } : s,
      ),
    );
  };
  const markAsLeftConfirm = async (student) => {
    const reason = prompt("Enter reason for marking as Left:");
    if (!reason) return;

    await updateDoc(doc(db, "students", student.id), {
      status: "Left",
      leftReason: reason,
      leftDate: serverTimestamp(),
    });

    setStudents((prev) =>
      prev.map((s) =>
        s.id === student.id
          ? {
            ...s,
            status: "Left",
            leftReason: reason,
            leftDate: serverTimestamp(),
          }
          : s,
      ),
    );
  };
  const removeProfileImage = async () => {
    try {
      const updatedProfile = {
        ...profile,
        profileImage: "",
        profileImageUrl: ""
      };

      setProfile(updatedProfile);

      await setDoc(doc(db, "institutes", user.uid), updatedProfile, {
        merge: true,
      });

    } catch (error) {
      console.error("Error removing profile image:", error);
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-6 bg-[#FAFAFA] min-h-screen">
      {/* HEADER */}
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">

        {/* TITLE */}
        <div>
          <h1 className="text-3xl font-bold text-black">My Account</h1>
          <p className="text-orange-500 text-sm">
            Manage your team, and customers
          </p>
        </div>

        {/* PROFILE IMAGE */}
        <div className="flex items-center gap-4">

          {(profile.profileImage || profile.profileImageUrl) ? (
            <img
              src={profile.profileImage || profile.profileImageUrl}
              className="w-24 h-24 rounded-xl object-cover border shadow"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center">
              <User size={40} />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="cursor-pointer bg-orange-500 text-white px-3 py-1 rounded text-sm text-center">
              Change
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileUpload}
              />
            </label>

            {(profile.profileImage || profile.profileImageUrl) && (
              <button
                onClick={removeProfileImage}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            )}
          </div>

        </div>

      </div>

      {/* TABS */}
      <div className="flex flex-wrap gap-4 sm:gap-8 border-b pb-2 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab("management")}
          className={`flex items-center gap-2 pb-2 border-b-2 ${activeTab === "management"
            ? "text-orange-500 border-orange-500 font-semibold"
            : "text-gray-600 border-transparent"
            }`}
        >
          <Users size={18} /> Management
        </button>

        <button
          onClick={() => setActiveTab("customers")}
          className={`flex items-center gap-2 pb-2 border-b-2 ${activeTab === "customers"
            ? "text-orange-500 border-orange-500 font-semibold"
            : "text-gray-600 border-transparent"
            }`}
        >
          <Users size={18} /> Customers
        </button>
      </div>

      {/* PROFILE CARD */}

      {/* MANAGEMENT TAB */}

      {activeTab === "management" && (
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          {/* HEADER */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-orange-500 text-lg font-semibold">
                Team Management
              </h2>
              <p className="text-sm text-gray-500">
                Manage your instructors and staff members
              </p>
            </div>

            <button
              onClick={() => setActiveMenu("Management Details")}
              className="bg-orange-500 text-white px-4 py-2 rounded-md font-medium"
            >
              + Add Employee
            </button>
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
            {trainers.map((trainer) => (
              <div
                key={trainer.id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
              >
                {/* TOP ROW */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-black">
                      {trainer.firstName} {trainer.lastName}
                    </h3>

                    <p className="text-orange-600 text-sm mt-1 font-medium">
                      {trainer.designation}
                    </p>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditTrainer(trainer)}
                      className="w-8 h-8 rounded-full bg-orange-100 hover:bg-orange-200 flex items-center justify-center"
                    >
                      <img
                        src="/edit-icon.png"
                        alt="Edit"
                        className="w-4 h-4 object-contain"
                      />
                    </button>

                    <button
                      onClick={() => {
                        setTrainerToDelete(trainer);
                        setShowTrainerDeleteModal(true);
                      }}
                      className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center"
                    >
                      <img
                        src="/delete-icon.png"
                        alt="Delete"
                        className="w-4 h-4 object-contain"
                      />
                    </button>
                  </div>
                </div>

                {/* CONTACT */}
                <div className="mt-3 text-sm text-black space-y-1">
                  <p>✉️ {trainer.email || "—"}</p>
                  <p>📞 {trainer.phone}</p>
                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                  {trainer.experience}
                </p>

                {/* ACHIEVEMENTS */}
                {trainer.achievements?.length > 0 && (
                  <div className="mt-3">
                    <p className="font-semibold text-sm flex items-center gap-2">
                      🏅 Achievements ({trainer.achievements.length})
                    </p>

                    <ul className="ml-5 mt-1 list-disc text-sm text-gray-700">
                      {trainer.achievements.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* FOOTER */}
                <div className="mt-5 pt-4 border-t text-xs text-gray-500">
                  Joined Date :{" "}
                  {trainer.createdAt?.toDate?.().toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDIT TRAINER MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[95%] sm:w-[700px] rounded-2xl shadow-xl overflow-hidden">
            <div className="max-h-[75vh] overflow-y-auto">
              {/* HEADER */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800">
                  Edit Management Details
                </h2>

                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-red-500 text-xl"
                >
                  ✖
                </button>
              </div>

              {/* FORM */}
              <div className="p-6 max-h-[75vh] overflow-y-auto space-y-8">
                {/* ================= PERSONAL INFORMATION ================= */}
                <div>
                  <h3 className="text-lg font-semibold text-orange-500 mb-4">
                    👤 Personal Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        First Name
                      </label>
                      <input
                        value={editingTrainer?.firstName || ""}
                        onChange={(e) =>
                          setEditingTrainer({
                            ...editingTrainer,
                            firstName: e.target.value.replace(/[^A-Za-z ]/g, ""),
                          })
                        }
                       className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Last Name
                      </label>
                      <input
                        value={editingTrainer?.lastName || ""}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^A-Za-z ]/g, "");
                          setEditingTrainer({
                            ...editingTrainer,
                            lastName: value,
                          });
                        }}
                       className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={editingTrainer?.dateOfBirth || ""}
                        onChange={(e) =>
                          setEditingTrainer({
                            ...editingTrainer,
                            dateOfBirth: e.target.value,
                          })
                        }
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        value={editingTrainer?.phone || ""}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          setEditingTrainer({
                            ...editingTrainer,
                            phone: value,
                          });
                        }}
                       className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={editingTrainer?.email || ""}
                        onChange={(e) =>
                          setEditingTrainer({
                            ...editingTrainer,
                            email: e.target.value,
                          })
                        }
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* ================= PROFESSIONAL DETAILS ================= */}
                <div>
                  <h3 className="text-lg font-semibold text-orange-500 mb-4">
                    🏅 Professional Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Designation
                      </label>
                      <input
                        value={editingTrainer?.designation || ""}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^A-Za-z ]/g, "");
                          setEditingTrainer({
                            ...editingTrainer,
                            designation: value,
                          });
                        }}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Category
                      </label>
                      <input
                        value={editingTrainer?.category || ""}
                        onChange={(e) =>
                          setEditingTrainer({
                            ...editingTrainer,
                            category: e.target.value,
                          })
                        }
                       className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Sub Category
                      </label>
                      <input
                        value={editingTrainer?.subCategory || ""}
                        onChange={(e) =>
                          setEditingTrainer({
                            ...editingTrainer,
                            subCategory: e.target.value,
                          })
                        }
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Experience (Years)
                      </label>
                      <input
                        type="number"
                        value={editingTrainer?.experience || ""}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          setEditingTrainer({
                            ...editingTrainer,
                            experience: value,
                          });
                        }}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Monthly Salary
                      </label>
                      <input
                        type="number"
                        value={editingTrainer?.monthlySalary || ""}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          setEditingTrainer({
                            ...editingTrainer,
                            monthlySalary: value,
                          });
                        }}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        LPA
                      </label>
                      <input
                        value={editingTrainer?.lpa || ""}
                        onChange={(e) =>
                          setEditingTrainer({
                            ...editingTrainer,
                            lpa: e.target.value,
                          })
                        }
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* ================= BANK DETAILS ================= */}
                <div>
                  <h3 className="text-lg font-semibold text-orange-500 mb-4">
                    🏦 Bank Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      placeholder="Account Name"
                      value={editingTrainer?.accountName || ""}
                      onChange={(e) =>
                        setEditingTrainer({
                          ...editingTrainer,
                          accountName: e.target.value,
                        })
                      }
                      className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400"
                    />

                    <input
                      placeholder="Account Number"
                      value={editingTrainer?.accountNumber || ""}
                      onChange={(e) =>
                        setEditingTrainer({
                          ...editingTrainer,
                          accountNumber: e.target.value,
                        })
                      }
                      className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400"
                    />

                    <input
                      placeholder="Bank Name"
                      value={editingTrainer?.bankName || ""}
                      onChange={(e) =>
                        setEditingTrainer({
                          ...editingTrainer,
                          bankName: e.target.value,
                        })
                      }
                      className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400"
                    />

                    <input
                      placeholder="IFSC Code"
                      value={editingTrainer?.ifscCode || ""}
                      onChange={(e) =>
                        setEditingTrainer({
                          ...editingTrainer,
                          ifscCode: e.target.value,
                        })
                      }
                      className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400"
                    />

                    <input
                      placeholder="UPI Details"
                      value={editingTrainer?.upiDetails || ""}
                      onChange={(e) =>
                        setEditingTrainer({
                          ...editingTrainer,
                          upiDetails: e.target.value,
                        })
                      }
                      className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400"
                    />

                    <input
                      placeholder="PF Details"
                      value={editingTrainer?.pfDetails || ""}
                      onChange={(e) =>
                        setEditingTrainer({
                          ...editingTrainer,
                          pfDetails: e.target.value,
                        })
                      }
                      className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>

                {/* ================= DOCUMENT PREVIEW ================= */}
                <div>
                  <h3 className="text-lg font-semibold text-orange-500 mb-4">
                    📂 Uploaded Documents
                  </h3>

                  {editingTrainer?.profileImageUrl && (
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Profile Image</p>
                      <img
                        src={editingTrainer.profileImageUrl}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                    </div>
                  )}

                  {editingTrainer?.aadharFiles?.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Aadhaar Files</p>
                      <div className="flex gap-3 flex-wrap">
                        {editingTrainer.aadharFiles.map((url, i) => (
                          <img
                            key={i}
                            src={url}
                            className="w-20 h-20 object-cover rounded"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {editingTrainer?.certificates?.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Certificates</p>
                      <div className="flex gap-3 flex-wrap">
                        {editingTrainer.certificates.map((url, i) => (
                          <img
                            key={i}
                            src={url}
                            className="w-20 h-20 object-cover rounded"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* FOOTER */}
              <div className="flex justify-end gap-4 px-6 py-4 border-t">
                <button onClick={() => setShowEditModal(false)}>Cancel</button>

                <button
                  onClick={handleUpdateTrainer}
                  className="bg-orange-500 text-white px-6 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showTrainerDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] sm:w-[400px] rounded-2xl shadow-xl p-6">
            <h2 className="text-center font-semibold text-lg mb-4">
              Please Provide the reason for deleting the details
            </h2>

            <label className="text-sm text-gray-600">Enter your Reason</label>

            <input
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-2 mb-6"
            />

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowTrainerDeleteModal(false);
                  setDeleteReason("");
                  setTrainerToDelete(null);
                }}
                className="bg-gray-300 px-6 py-2 rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={confirmDeleteTrainer}
                className="bg-red-500 text-white px-6 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "customers" && (
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          {/* ===== SUMMARY CARDS ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="border border-orange-200 rounded-lg p-4 bg-[#FFFDF9]">
              <p className="text-sm text-gray-500">Active Customers</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-orange-500 text-lg font-semibold">
                  {activeCount}
                </span>
                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                  ↗
                </div>
              </div>
            </div>

            <div className="border border-orange-200 rounded-lg p-4 bg-[#FFFDF9]">
              <p className="text-sm text-gray-500">Left Customers</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-orange-500 text-lg font-semibold">
                  {leftCount}
                </span>
                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                  ↘
                </div>
              </div>
            </div>

            <div className="border border-orange-200 rounded-lg p-4 bg-[#FFFDF9]">
              <p className="text-sm text-gray-500">New (30 days)</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-orange-500 text-lg font-semibold">
                  {newCount}
                </span>
                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                  ●
                </div>
              </div>
            </div>
          </div>

          {/* HEADER */}
          {/* HEADER */}
          <div className="flex justify-between items-start mb-5">
            <div>
              <h2 className="text-orange-500 text-lg font-semibold">
                Customer Management
              </h2>
              <p className="text-sm text-gray-500">
                Track and manage your students
              </p>
            </div>

            <button
              onClick={() => setActiveMenu("Customer Details")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium"
            >
              + Add Customer
            </button>
          </div>

          {/* SEARCH + FILTER ROW */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
            {/* SEARCH BOX */}
            <div className="relative w-full md:w-[320px]">
              <input
                type="text"
                placeholder="Search Customers..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-orange-300 rounded-md
      focus:outline-none focus:border-orange-400 bg-white"
              />

              {/* SEARCH ICON */}
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>

            {/* FILTER BUTTONS */}
            <div className="flex gap-2">
              {["All", "Active", "Left"].map((item) => (
                <button
                  key={item}
                  onClick={() => setStatusFilter(item)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition
        ${statusFilter === item
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200 text-gray-700"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto rounded-lg border">
            {/* TABLE HEADER */}
            <div
              className={`grid ${statusFilter === "Left"
                ? "grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_100px]"
                : "grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_100px]"
                } bg-[#E9B489] text-black font-medium px-6 py-3 items-center`}
            >
              <p>Name</p>
              <p>Age</p>
              <p>Belt</p>
              <p>Status</p>
              {statusFilter === "Left" && <p>Reason</p>}
              <p>Added Date</p>
              <p>Left Date</p>
              <p className="text-center">Action</p>
            </div>

            {/* TABLE BODY */}
            {filteredStudents.map((student, index) => (
              <div
                key={student.id}
                className={`grid ${statusFilter === "Left"
                  ? "grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_100px]"
                  : "grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_100px]"
                  } px-6 py-4 items-center border-t`}
              >
                <p className="flex items-center">
                  <span className="mr-2">{index + 1}.</span>
                  {student.firstName} {student.lastName}
                </p>
                <p className="whitespace-pre-line">
                {student.age} years
                </p>
                <p>{student.belt}</p>

                {/* STATUS BADGE */}
                <p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${student.status === "Left"
                      ? "bg-red-400 text-white"
                      : "bg-green-400 text-black"
                      }`}
                  >
                    {student.status}
                  </span>
                </p>
                {statusFilter === "Left" && (
                  <p className="text-sm text-gray-600">
                    {student.leftReason || "-"}
                  </p>
                )}

                <p>
                  {student.createdAt?.toDate?.().toLocaleDateString?.() || "-"}
                </p>

                <p>
                  {student.leftDate?.toDate
                    ? student.leftDate.toDate().toLocaleDateString()
                    : "-"}
                </p>

                {/* ACTION BUTTON */}
                <div className="flex items-center justify-center gap-2 h-full">
                  {statusFilter === "Left" ? (
                    <>
                      {/* EDIT ICON */}
                      <button
                        onClick={() => {
                          setEditingStudent(student);
                          setShowEditStudentModal(true);
                        }}
                        className="w-8 h-8 flex items-center justify-center"
                        title="Edit"
                      >
                        <img
                          src="/edit-icon.png"
                          alt="Edit"
                          className="w-5 h-5 object-contain"
                        />
                      </button>

                      {/* DELETE PERMANENT */}
                      <button
                        onClick={() => permanentlyDeleteStudent(student)}
                        className="w-8 h-8 flex items-center justify-center"
                        title="Delete Permanently"
                      >
                        <img
                          src="/delete-icon.png"
                          alt="Delete"
                          className="w-5 h-5 object-contain"
                        />
                      </button>
                    </>
                  ) : (
                    <>
                      {/* EDIT ICON */}
                      <button
                        onClick={() => {
                          setEditingStudent(student);
                          setShowEditStudentModal(true);
                        }}
                        className="w-8 h-8 flex items-center justify-center"
                        title="Edit"
                      >
                        <img
                          src="/edit-icon.png"
                          alt="Edit"
                          className="w-5 h-5 object-contain"
                        />
                      </button>

                      {/* MARK AS LEFT */}
                      <button
                        onClick={() => markAsLeftConfirm(student)}
                        className="w-8 h-8 flex items-center justify-center"
                        title="Mark as Left"
                      >
                        <img
                          src="/delete-icon.png"
                          alt="Mark as Left"
                          className="w-5 h-5 object-contain"
                        />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* ================= UPLOAD TYPE MODAL ================= */}
      {showUploadTypeModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] sm:w-[360px] rounded-xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-center mb-4">
              Select Media Type
            </h3>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <button
                onClick={() => setSelectedUploadType("image")}
                className={`py-2 rounded border ${selectedUploadType === "image"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100"
                  }`}
              >
                Image
              </button>

              <button
                onClick={() => setSelectedUploadType("video")}
                className={`py-2 rounded border ${selectedUploadType === "video"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100"
                  }`}
              >
                Video
              </button>

              <button
                onClick={() => setSelectedUploadType("reel")}
                className={`py-2 rounded border ${selectedUploadType === "reel"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100"
                  }`}
              >
                Reel
              </button>
            </div>

            {/* Upload Status */}
            {uploading && (
              <p className="text-center text-sm text-orange-500 mb-3 animate-pulse">
                ⏳ Please wait, media file is uploading...
              </p>
            )}

            {uploadMsg && (
              <p className="text-center text-sm text-green-600 mb-3">
                {uploadMsg}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowUploadTypeModal(false);
                  setPendingFile(null);
                  setSelectedUploadType("");
                }}
                className="flex-1 border rounded py-2"
              >
                Cancel
              </button>

              <button
                disabled={!selectedUploadType || uploading}
                onClick={handleUpload}
                className="flex-1 bg-orange-500 text-white rounded py-2 disabled:opacity-50"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditStudentModal && editingStudent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[95%] sm:w-[800px] rounded-2xl shadow-xl overflow-hidden">
            {/* HEADER */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                Edit Customer Details
              </h2>

              <button
                onClick={() => setShowEditStudentModal(false)}
                className="text-gray-400 hover:text-red-500 text-xl"
              >
                ✖
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-8">
              {/* ================= PERSONAL INFORMATION ================= */}
              <div>
                <h3 className="text-lg font-semibold text-orange-500 mb-4">
                  👤 Personal Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      First Name
                    </label>
                    <input
                      value={editingTrainer?.firstName || ""}
                      onChange={(e) =>
                        setEditingTrainer({
                          ...editingTrainer,
                          firstName: e.target.value.replace(/[^A-Za-z ]/g, ""),
                        })
                      }
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Last Name
                    </label>
                    <input
                      value={editingTrainer?.lastName || ""}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^A-Za-z ]/g, "");
                        setEditingTrainer({
                          ...editingTrainer,
                          lastName: value,
                        });
                      }}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={editingStudent?.dateOfBirth || ""}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          dateOfBirth: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Age Group
                    </label>
                    <input
                      value={editingStudent?.age || ""}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          age: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* ================= CONTACT DETAILS ================= */}
              <div>
                <h3 className="text-lg font-semibold text-orange-500 mb-4">
                  📞 Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={editingStudent?.email || ""}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          email: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      value={editingTrainer?.phone || ""}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setEditingTrainer({
                          ...editingTrainer,
                          phone: value,
                        });
                      }}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">
                    Residential Address
                  </label>
                  <input
                    value={editingStudent?.address || ""}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        address: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                  />
                </div>
              </div>

              {/* ================= SPORTS INFORMATION ================= */}
              <div>
                <h3 className="text-lg font-semibold text-orange-500 mb-4">
                  🏅 Sports Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Category
                    </label>
                    <input
                      value={editingStudent?.category || ""}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          category: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Sub Category
                    </label>
                    <input
                      value={editingStudent?.subCategory || ""}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          subCategory: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Belt Level
                    </label>
                    <input
                      value={editingStudent?.belt || ""}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          belt: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* ================= TRAINING DETAILS ================= */}
              <div>
                <h3 className="text-lg font-semibold text-orange-500 mb-4">
                  🗓 Training Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Joining Date
                    </label>
                    <input
                      type="date"
                      value={editingStudent?.joiningDate || ""}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          joiningDate: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none"

                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Monthly Billing Date
                    </label>
                    <input
                      type="date"
                      value={editingStudent?.monthlyDate || ""}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          monthlyDate: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Session Time
                    </label>
                    <input
                      value={editingStudent?.timings || ""}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          timings: e.target.value,
                        })
                      }
                     className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">
                    Session Type
                  </label>
                  <input
                    value={editingStudent?.sessions || ""}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        sessions: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-4 px-6 py-4 border-t">
              <button onClick={() => setShowEditStudentModal(false)}>
                Cancel
              </button>

              <button
                onClick={handleUpdateStudent}
                className="bg-orange-500 text-white px-6 py-2 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccountPage;