import React, { useEffect, useState } from "react";
import ProfileService from "../services/ProfileService";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    about: "",
    address: "",
    imageUrl: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await ProfileService.getProfile();
        setProfile(res.data);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (file) {
        const uploadRes = await ProfileService.uploadProfileImage(file);
        profile.imageUrl = uploadRes.data.imageUrl;
      }

      await ProfileService.updateProfile(profile);
      alert("✅ Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("❌ Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-gray-700">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white/80 backdrop-blur-xl shadow-2xl border border-gray-200 rounded-2xl p-10"
      >
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Edit Profile
        </h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src={
                profile.imageUrl ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>

          <input
            type="file"
            onChange={handleFileChange}
            className="mt-4 text-sm text-gray-600 bg-gray-100 border border-gray-300 rounded-lg p-2 cursor-pointer"
          />
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FloatingInput
            label="First Name"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
          />

          <FloatingInput
            label="Last Name"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="mt-6 space-y-6">
          <FloatingInput
            label="Email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
          />

          <FloatingInput
            label="Phone Number"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleChange}
          />

          <FloatingInput
            label="Address"
            name="address"
            value={profile.address}
            onChange={handleChange}
          />

          {/* About (floating textarea) */}
          <FloatingTextarea
            label="About Me"
            name="about"
            value={profile.about}
            onChange={handleChange}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-10">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg transition-all"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

/* Floating Input */
const FloatingInput = ({ label, name, value, onChange, type = "text" }) => (
  <div className="relative">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="
        w-full px-4 py-3 border border-gray-300 rounded-xl bg-white
        focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        peer
      "
      placeholder=" "
    />

    <label
      className="
        absolute left-4 top-3 text-gray-500 pointer-events-none transition-all
        peer-placeholder-shown:top-3 
        peer-placeholder-shown:text-base
        peer-focus:top-0
        peer-focus:text-xs
        peer-focus:text-blue-600
        peer-valid:top-0
        peer-valid:text-xs
      "
    >
      {label}
    </label>
  </div>
);

/* Floating Textarea */
const FloatingTextarea = ({ label, name, value, onChange }) => (
  <div className="relative">
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows="4"
      className="
        w-full px-4 py-4 border border-gray-300 rounded-xl bg-white
        focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        peer
      "
      placeholder=" "
    />

    <label
      className="
        absolute left-4 top-3 text-gray-500 pointer-events-none transition-all
        peer-placeholder-shown:top-3
        peer-placeholder-shown:text-base
        peer-focus:top-0
        peer-focus:text-xs
        peer-focus:text-blue-600
        peer-valid:top-0
        peer-valid:text-xs
      "
    >
      {label}
    </label>
  </div>
);
