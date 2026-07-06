import FileItem from "./FileItem";

function FileList({ files, handleDelete, handleDownload }) {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-3xl font-bold text-white">
          Your Files
        </h2>

        <span className="bg-(--mint) text-(--navy) px-3 py-2 rounded-full text-sm font-semibold">
          {files.length}
        </span>
      </div>

      <div className="space-y-4">
        {files.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center text-gray-500">
            <p>No files uploaded yet.</p>
            <p>Upload your first file.</p>
          </div>
        ) : (
          files.map((file) => (
            <FileItem
              key={file.name}
              file={file}
              handleDelete={handleDelete}
              handleDownload={handleDownload}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default FileList;