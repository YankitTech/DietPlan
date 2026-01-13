import { useState } from "react";

export default function Subject({ studies, setStudies }) {
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);
  const [subjectName, setSubjectName] = useState("");

  function handleAddSubject() {
    if (!subjectName.trim()) return;
    if (!selectedStudy || !selectedSite) return;

    const newSubject = {
      id: crypto.randomUUID(),
      name: subjectName.trim(),
    };

    setStudies((prevStudies) =>
      prevStudies.map((study) => {
        if (study.id !== selectedStudy.id) return study;

        return {
          ...study,
          sites: study.sites.map((site) => {
            if (site.id !== selectedSite.id) return site;
            return {
              ...site,
              subjects: [...site.subjects, newSubject],
            };
          }),
        };
      })
    );

    setSubjectName("");
  }

  // 🔹 Get fresh selected site data from main state
  const currentStudy = studies.find((s) => s.id === selectedStudy?.id);
  const currentSite = currentStudy?.sites.find(
    (site) => site.id === selectedSite?.id
  );

  return (
    <div className="min-h-screen text-white flex flex-col items-center mt-10">

      <h1 className="text-2xl font-semibold mb-6">Subject Management</h1>

      {/* -------- Select Study -------- */}
      <div className="flex gap-4 mb-6">

        <select
          className="bg-gray-800 border border-gray-600 p-2 rounded"
          onChange={(e) => {
            const study = studies.find((s) => s.id === e.target.value);
            setSelectedStudy(study || null);
            setSelectedSite(null);
          }}
        >
          <option value="">Select Study</option>
          {studies.map((study) => (
            <option key={study.id} value={study.id}>
              {study.name}
            </option>
          ))}
        </select>

        {/* -------- Select Site -------- */}
        <select
          className="bg-gray-800 border border-gray-600 p-2 rounded"
          disabled={!selectedStudy}
          onChange={(e) => {
            const site = selectedStudy.sites.find(
              (site) => site.id === e.target.value
            );
            setSelectedSite(site || null);
          }}
        >
          <option value="">Select Site</option>
          {selectedStudy?.sites.map((site) => (
            <option key={site.id} value={site.id}>
              {site.name}
            </option>
          ))}
        </select>
      </div>

      {/* -------- Create + List Subjects -------- */}
      {selectedStudy && selectedSite && (
        <div className="bg-gray-800 p-6 rounded w-full max-w-md space-y-4">

          <h2 className="text-lg font-medium">
            Subjects for{" "}
            <span className="text-blue-400">{currentStudy.name}</span> →{" "}
            <span className="text-green-400">{currentSite.name}</span>
          </h2>

          {/* Create Subject */}
          <div className="flex gap-2">
            <input
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="Enter Subject Name"
              className="flex-1 p-2 bg-gray-700 rounded outline-none"
            />
            <button
              onClick={handleAddSubject}
              className="bg-purple-600 hover:bg-purple-700 px-4 rounded"
            >
              Add
            </button>
          </div>

          {/* Subject List */}
          <div className="space-y-2">
            {currentSite.subjects.length === 0 ? (
              <p className="text-gray-400">No subjects created yet</p>
            ) : (
              currentSite.subjects.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-gray-700 p-2 rounded"
                >
                  {sub.name}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
