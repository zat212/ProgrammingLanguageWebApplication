import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MaterialService from "../../services/MaterialService";

const AddMaterials = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  // Form states
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialType, setMaterialType] = useState("");
  const [content, setContent] = useState("");
  const [materialUrl, setMaterialUrl] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  // Material list and editing states
  const [materials, setMaterials] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editMaterial, setEditMaterial] = useState(null);

  const inputClass =
    "h-[50px] rounded-md border border-gray-300 w-full px-3 focus:ring-2 focus:ring-[#4D7C0F] focus:outline-none";
  const textareaClass =
    "h-[80px] rounded-md border border-gray-300 w-full px-3 py-2 focus:ring-2 focus:ring-[#4D7C0F] focus:outline-none";

  // Fetch all materials for this lesson
  const fetchMaterials = async () => {
    try {
      const res = await MaterialService.getMaterialByLessonId(lessonId);
      setMaterials(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch materials:", err);
      toast.error("Failed to load materials");
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [lessonId]);

  // Add new material
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const materialData = {
        materialTitle,
        materialType,
        content,
        materialUrl,
        description,
        lessonId,
      };
      formData.append(
        "material",
        new Blob([JSON.stringify(materialData)], { type: "application/json" })
      );
      if (file) formData.append("files", file);

      const res = await MaterialService.createMaterial(formData);
      if (res.status === 201) {
        toast.success("Learning material added successfully!");
        setMaterialTitle("");
        setMaterialType("");
        setContent("");
        setMaterialUrl("");
        setDescription("");
        setFile(null);
        fetchMaterials();
      }
    } catch (err) {
      console.error("❌ Upload failed:", err);
      toast.error("Failed to upload learning material");
    }
  };

  // Delete material
  const handleDelete = async (materialId) => {
    if (!window.confirm("Are you sure you want to delete this material?")) return;
    try {
      await MaterialService.deleteMaterial(materialId);
      toast.success("🗑️ Material deleted successfully!");
      fetchMaterials();
    } catch (err) {
      console.error("Error deleting material:", err);
      toast.error("Failed to delete material");
    }
  };

  // Edit material
  const handleEdit = (material) => {
    setIsEditing(true);
    setEditMaterial({ ...material });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const updatedMaterial = {
        materialTitle: editMaterial.materialTitle,
        materialType: editMaterial.materialType,
        materialUrl: editMaterial.materialType === "Link" ? editMaterial.materialUrl : null,
        description: editMaterial.description,
        content: editMaterial.content,
      };
      formData.append(
        "material",
        new Blob([JSON.stringify(updatedMaterial)], { type: "application/json" })
      );
      if (editMaterial.file) formData.append("files", editMaterial.file);

      await MaterialService.updateMaterial(editMaterial.materialId, formData);
      toast.success("Material updated successfully!");
      setIsEditing(false);
      setEditMaterial(null);
      fetchMaterials();
    } catch (err) {
      console.error("❌ Failed to update material:", err);
      toast.error("Failed to update material");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg border shadow">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6">📘 Add Learning Material</h2>

      {/* Add Material Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Title</label>
          <input
            type="text"
            placeholder="Material Title"
            value={materialTitle}
            onChange={(e) => setMaterialTitle(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Type</label>
          <select
            value={materialType}
            onChange={(e) => setMaterialType(e.target.value)}
            className={inputClass}
            required
          >
            <option value="">-- Select Type --</option>
            <option value="PDF">PDF</option>
            <option value="Video">Video</option>
            <option value="Photo">Photo</option>
            <option value="Link">Link</option>
          </select>
        </div>

        {materialType === "Link" && (
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">External URL</label>
            <input
              type="text"
              placeholder="https://example.com"
              value={materialUrl}
              onChange={(e) => setMaterialUrl(e.target.value)}
              className={inputClass}
            />
          </div>
        )}

        {materialType !== "Link" && (
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Upload File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className={inputClass + " py-1"}
            />
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
          <textarea
            placeholder="Write a short description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={textareaClass}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Content (optional)</label>
          <textarea
            placeholder="Additional content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={textareaClass}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="sm:w-[140px] w-full h-[50px] bg-[#4D7C0F] text-white rounded-md hover:bg-[#3e630c] transition"
          >
            Upload Material
          </button>
        </div>
      </form>

      {/* Add Quiz Button */}
      <div className="mt-6 flex justify-start">
        <button
          onClick={() => navigate(`/admin/createQuizz/${lessonId}`)}
          className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
        >
          ➕ Add Quiz
        </button>
      </div>

      {/* Materials Table */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-3">📄 Added Materials</h3>
        <table className="w-full border border-gray-300 rounded-lg text-sm table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border text-left w-1/5">Title</th>
              <th className="p-3 border text-left w-1/6">Type</th>
              <th className="p-3 border text-left w-2/4">Description</th>
              <th className="p-3 border text-center w-1/6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.length > 0 ? (
              materials.map((m) => (
                <tr key={m.materialId} className="hover:bg-gray-50">
                  <td className="p-2 border break-words">{m.materialTitle}</td>
                  <td className="p-2 border break-words">{m.materialType}</td>
                  <td className="p-2 border break-words">{m.description}</td>
                  <td className="p-2 border text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(m)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(m.materialId)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500 italic">
                  No materials added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>

      {/* Edit Material Modal */}
      {isEditing && editMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800 text-center border-b pb-2">
              ✏️ Edit Material
            </h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Title</label>
                <input
                  type="text"
                  value={editMaterial.materialTitle || ""}
                  onChange={(e) =>
                    setEditMaterial({ ...editMaterial, materialTitle: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Type</label>
                <select
                  value={editMaterial.materialType || ""}
                  onChange={(e) =>
                    setEditMaterial({ ...editMaterial, materialType: e.target.value })
                  }
                  className={inputClass}
                >
                  <option value="PDF">PDF</option>
                  <option value="Video">Video</option>
                  <option value="Photo">Photo</option>
                  <option value="Link">Link</option>
                </select>
              </div>

              {editMaterial.materialType === "Link" ? (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Material URL</label>
                  <input
                    type="text"
                    placeholder="https://example.com"
                    value={editMaterial.materialUrl || ""}
                    onChange={(e) =>
                      setEditMaterial({ ...editMaterial, materialUrl: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              ) : (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Upload New File</label>
                  <input
                    type="file"
                    onChange={(e) =>
                      setEditMaterial({ ...editMaterial, file: e.target.files[0] })
                    }
                    className={inputClass + " py-1"}
                  />
                  {editMaterial.materialUrl && (
                    <p className="text-xs text-gray-500 mt-1">
                      Current file:{" "}
                      <a
                        href={editMaterial.materialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {editMaterial.materialUrl.split("/").pop()}
                      </a>
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
                <textarea
                  placeholder="Write a short description..."
                  value={editMaterial.description || ""}
                  onChange={(e) =>
                    setEditMaterial({ ...editMaterial, description: e.target.value })
                  }
                  className={textareaClass}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Content (optional)</label>
                <textarea
                  placeholder="Additional content..."
                  value={editMaterial.content || ""}
                  onChange={(e) =>
                    setEditMaterial({ ...editMaterial, content: e.target.value })
                  }
                  className={textareaClass}
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-md transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMaterials;
