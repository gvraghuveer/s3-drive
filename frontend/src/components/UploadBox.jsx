import { Upload, File } from "lucide-react";

function UploadBox({ selectedFile, handleFileChange, handleUpload }) {
  return (
    <div className="border-2 border-dashed border-(--teal) rounded-3xl p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-8 text-center text-white">Upload File</h2>
      <div className="flex flex-col items-center">
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
        />
        <File size={70} className="text-(--teal)" />
        <p className="text-gray-200">Selected File</p>
        <p className="truncate mb-8 max-w-lg text-xl font-semibold mt-2 text-white">
          {selectedFile?.name || "No file selected"}
        </p>
        <div className="flex gap-6 items-center align-center"> 
          <label
            htmlFor="fileInput"
            className="cursor-pointer bg-(--violet) hover:bg-(--dred) hover:scale-105 text-white px-6 py-3 rounded-xl transition-all duration-300 font-semibold"
          >
            Choose File
          </label>
          <button
            onClick={handleUpload}
            className="flex items-center gap-2 bg-(--violet) text-white px-6 py-3 rounded-xl hover:bg-(--dred) hover:scale-105 transition-all cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            disabled={!selectedFile}
          >
            <Upload size={18} />
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadBox;
