import { useState, useEffect } from "react";
import api from "./services/api";
import "./index.css";

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
    await api.delete(`/file/${fileName}`, fileName);
    await fetchFiles();
  };

  return (
    <div>
      <h1>S3-Drive</h1>

      {files.map((file) => (
        <div key={file.name}>
          <p>{file.name}</p>
          <button onClick={() => handleFileDelete(file.name)}>Delete</button>
        </div>
      ))}

      <input type="file" onChange={handleFileChange} />
      <p>{selectedFile?.name}</p>
      <button onClick={handleUpload}> Upload </button>
    </div>
  );
}

export default App;
