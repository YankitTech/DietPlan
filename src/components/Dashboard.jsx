export default function Dashboard({ studies }) {
  return (
    <div className="p-5 text-white">
      {studies.length === 0 ? (
        <p>No studies created yet</p>
      ) : (
        <table className="w-full border border-gray-700 border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border p-2 text-left">Study</th>
              <th className="border p-2 text-left">Site</th>
              <th className="border p-2 text-left">Subjects</th>
            </tr>
          </thead>

          <tbody>
            {studies.map((study) =>
              study.sites.map((site) => (
                <tr key={`${study.id}-${site.id}`}>
                  <td className="border p-2">{study.name}</td>
                  <td className="border p-2">{site.name}</td>
                  <td className="border p-2">
                    {site.subjects.length > 0
                      ? site.subjects.length
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
