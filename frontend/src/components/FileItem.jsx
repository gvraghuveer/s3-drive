import { Trash2, FileText, Download } from "lucide-react";

function FileItem({ file, handleDelete, handleDownload }) {
  const formatBytes = (bytes) => {
    if (bytes < 1024) return bytes + " B";

    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";

    if (bytes < 1024 * 1024 * 1024)
      return (bytes / (1024 * 1024)).toFixed(1) + " MB";

    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + " GB";
  };

  return (
    <div className="bg-white rounded-2xl p-6 hover:shadow-xl shadow-md hover:scale-[1.01] cursor-pointer transition-all duration-300 mb-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <FileText className="text-(--violet)" size={32} />
          <div>
            <h3 className="font-semibold text-lg truncate max-w-md">
              {file.name}
            </h3>
            <p className="text-gray-500 mt-1">
              {formatBytes(file.size)} •{" "}
              {new Date(file.lastModified).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div>
            <button onClick={() => handleDownload(file.name)} className="text-red-500 hover:bg-red-100 p-3 rounded-full transition cursor-pointer"><Download size={20} /></button>
          <button
            onClick={() => handleDelete(file.name)} className="text-red-500 hover:bg-red-100 p-3 rounded-full transition cursor-pointer">
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileItem;
