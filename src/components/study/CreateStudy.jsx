import { useState } from "react";

export default function CreateStudy() {
  const [formData, setFormData] = useState({
    studyName: "",
    studyList: [],
    siteName: "",
    siteList: [],
    protein: "",
    fat: "",
    calorie: "",
    addSite: false,
  });

  const [errors, setErrors] = useState({
    studyError: "",
    siteError: "",
  });

  const [toast, setToast] = useState("");

  // --------------------
  // Add Site
  // --------------------
  function handleAddSite() {
    const trimmedSite = formData.siteName.trim();

    if (!trimmedSite) {
      setErrors((prev) => ({
        ...prev,
        siteError: "Site name is required",
      }));
      return;
    }

    const isDuplicate = formData.siteList.some(
      (site) => site.toLowerCase() === trimmedSite.toLowerCase()
    );

    if (isDuplicate) {
      setErrors((prev) => ({
        ...prev,
        siteError: "This site already exists",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      siteList: [...prev.siteList, trimmedSite],
      siteName: "",
      addSite: false,
    }));

    setErrors((prev) => ({ ...prev, siteError: "" }));
  }

  // --------------------
  // Submit Study
  // --------------------
  function handleSubmit(e) {
    e.preventDefault();

    const trimmedStudy = formData.studyName.trim();

    if (!trimmedStudy) {
      setErrors((prev) => ({
        ...prev,
        studyError: "Study name is required",
      }));
      return;
    }

    // 🚫 No sites added check
    if (formData.siteList.length === 0) {
      setErrors((prev) => ({
        ...prev,
        studyError: "Please add at least one site",
      }));
      return;
    }

    const isDuplicateStudy = formData.studyList.some(
      (study) => study.toLowerCase() === trimmedStudy.toLowerCase()
    );

    if (isDuplicateStudy) {
      setErrors((prev) => ({
        ...prev,
        studyError: "This study already exists",
      }));
      return;
    }

    // Save study
    setFormData((prev) => ({
      ...prev,
      studyList: [...prev.studyList, trimmedStudy],
      studyName: "",
      siteName: "",
      siteList: [],
      protein: "",
      fat: "",
      calorie: "",
      addSite: false,
    }));

    setErrors({
      studyError: "",
      siteError: "",
    });

    // ✅ Show toast
    setToast("Study saved successfully ✅");

    setTimeout(() => {
      setToast("");
    }, 3000);

    console.log("Study:", formData);
    
  }

  return (
    <div className="min-h-screen w-full p-5 bg-gray-900 relative">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg">
          {toast}
        </div>
      )}

      <div className="border-2 p-5 w-full max-w-2xl mx-auto bg-gray-800 rounded-md">
        <h3 className="mb-4 text-lg font-semibold text-white text-center">
          Create Study
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Study Name */}
          <div>
            <input
              value={formData.studyName}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  studyName: e.target.value,
                }));
                setErrors((prev) => ({ ...prev, studyError: "" }));
              }}
              type="text"
              placeholder="Enter Study Name"
              className="w-full bg-gray-700 px-3 py-2 text-white rounded-md focus:outline-none"
            />
            {errors.studyError && (
              <p className="text-red-500 text-sm mt-1">
                {errors.studyError}
              </p>
            )}
          </div>

          {/* Add Site Button */}
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                addSite: !prev.addSite,
              }))
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            {formData.addSite ? "Cancel" : "Add Site"}
          </button>

          {/* Site Input */}
          {formData.addSite && (
            <div>
              <div className="flex gap-2">
                <input
                  value={formData.siteName}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      siteName: e.target.value,
                    }));
                    setErrors((prev) => ({ ...prev, siteError: "" }));
                  }}
                  type="text"
                  placeholder="Enter Site Name"
                  className="flex-1 bg-gray-700 px-3 py-2 text-white rounded-md"
                />
                <button
                  type="button"
                  onClick={handleAddSite}
                  className="px-4 py-2 bg-green-600 text-white rounded-md"
                >
                  Save Site
                </button>
              </div>
              {errors.siteError && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.siteError}
                </p>
              )}
            </div>
          )}

          {/* Site List */}
          {formData.siteList.length > 0 && (
            <div className="text-left space-y-1">
              {formData.siteList.map((site, index) => (
                <div key={index} className="text-white">
                  • {site}
                </div>
              ))}
            </div>
          )}

          {/* Nutrition Inputs */}
          <div className="flex gap-2">
            <input
              type="number"
              value={formData.protein}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  protein: Number(e.target.value),
                }))
              }
              placeholder="Minimum Protein"
              className="flex-1 bg-gray-700 px-3 py-2 text-white rounded-md"
            />
            <input
              type="number"
              value={formData.fat}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  fat: Number(e.target.value),
                }))
              }
              placeholder="Maximum Fat"
              className="flex-1 bg-gray-700 px-3 py-2 text-white rounded-md"
            />
            <input
              type="number"
              value={formData.calorie}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  calorie: Number(e.target.value),
                }))
              }
              placeholder="Total Calorie"
              className="flex-1 bg-gray-700 px-3 py-2 text-white rounded-md"
            />
          </div>

          {/* Save Study */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Save Study
          </button>
        </form>
      </div>
    </div>
  );
}
