import { useState, useEffect } from "react";
import api from "./services/api";
import "./index.css";
import Header from "./components/Header";
import UploadBox from "./components/UploadBox";
import FileList from "./components/FileList";

function App() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchFiles = async () => {
    const res = await api.get("/files");
    setFiles(res.data);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    await api.post("/upload", formData);
    await fetchFiles();
    setSelectedFile(null);
  };

  const handleFileDelete = async (fileName) => {
    await api.delete(`/file/${fileName}`);
    await fetchFiles();
  };

  const handleDownload = async (fileName) => {
    const res = await api.get(`/download/${fileName}`);
    window.open(res.data.url, "_blank");
  }

  return (
    <div className="min-h-screen bg-(--navy)">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <Header title="S3-Drive" />
        <UploadBox
          selectedFile={selectedFile}
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
        />
        <FileList files={files} handleDelete={handleFileDelete} handleDownload={handleDownload} />
      </div>
    </div>
  );
}

export default App;
