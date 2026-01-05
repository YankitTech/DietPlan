import { useState } from "react";

export default function CreateStudy({ studies, setStudies }) {
  const [formData, setFormData] = useState({
    studyName: "",
    siteName: "",
    siteList: [],
    addSite: false,
    nutrition: {
      protein: "",
      fat: "",
      calorie: "",
    },
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

    if (formData.siteList.length === 0) {
      setErrors((prev) => ({
        ...prev,
        studyError: "Please add at least one site",
      }));
      return;
    }

    const isDuplicateStudy = studies.some(
      (study) => study.name.toLowerCase() === trimmedStudy.toLowerCase()
    );

    if (isDuplicateStudy) {
      setErrors((prev) => ({
        ...prev,
        studyError: "This study already exists",
      }));
      return;
    }

    const newStudy = {
      id: crypto.randomUUID(),
      name: trimmedStudy,
      sites: formData.siteList.map((site) => ({
        id: crypto.randomUUID(),
        name: site,
        subjects: [],
      })),
      nutrition: { ...formData.nutrition },
    };

    setStudies((prev) => [...prev, newStudy]);

    setFormData({
      studyName: "",
      siteName: "",
      siteList: [],
      addSite: false,
      nutrition: {
        protein: "",
        fat: "",
        calorie: "",
      },
    });

    setErrors({
      studyError: "",
      siteError: "",
    });

    setToast("Study saved successfully ✅");
    setTimeout(() => setToast(""), 3000);
  }

  return (
    <div className="min-h-screen p-5 bg-gray-900">
      {toast && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded">
          {toast}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-gray-800 p-5 rounded space-y-4"
      >
        <input
          value={formData.studyName}
          onChange={(e) =>
            setFormData((p) => ({ ...p, studyName: e.target.value }))
          }
          placeholder="Study Name"
          className="w-full p-2 bg-gray-700 text-white rounded"
        />
        <p className="text-red-500">{errors.studyError}</p>

        <button
          type="button"
          onClick={() => setFormData((p) => ({ ...p, addSite: !p.addSite }))}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {formData.addSite ? "Cancel" : "Add Site"}
        </button>

        {formData.addSite && (
          <>
            <input
              value={formData.siteName}
              onChange={(e) =>
                setFormData((p) => ({ ...p, siteName: e.target.value }))
              }
              placeholder="Site Name"
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
            <button
              type="button"
              onClick={handleAddSite}
              className="bg-green-600 px-4 py-2 text-white rounded"
            >
              Save Site
            </button>
            <p className="text-red-500">{errors.siteError}</p>
          </>
        )}

        {formData.siteList.map((site) => (
          <p key={site} className="text-white">
            <div className="flex justify-end items-center gap-2">
              <p className="flex-[3] text-left">{site}</p>
              <button className=" flex-[1] bg-blue-600 w-full py-2 text-white rounded">
                Edit
              </button>
              <button className=" flex-[1] bg-blue-600 w-full py-2 text-white rounded">
                Delete
              </button>
            </div>
          </p>
        ))}

        <input
          type="number"
          value={formData.nutrition.protein}
          onChange={(e) =>
            setFormData((p) => ({
              ...p,
              nutrition: { ...p.nutrition, protein: e.target.value },
            }))
          }
          placeholder="Protein"
          className="w-full p-2 bg-gray-700 text-white rounded"
        />

        <input
          type="number"
          value={formData.nutrition.fat}
          onChange={(e) =>
            setFormData((p) => ({
              ...p,
              nutrition: { ...p.nutrition, fat: e.target.value },
            }))
          }
          placeholder="Fat"
          className="w-full p-2 bg-gray-700 text-white rounded"
        />

        <input
          type="number"
          value={formData.nutrition.calorie}
          onChange={(e) =>
            setFormData((p) => ({
              ...p,
              nutrition: { ...p.nutrition, calorie: e.target.value },
            }))
          }
          placeholder="Calories"
          className="w-full p-2 bg-gray-700 text-white rounded"
        />

        <button className="bg-blue-600 w-full py-2 text-white rounded">
          Save Study
        </button>
      </form>
    </div>
  );
}
