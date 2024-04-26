import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [customId, setCustomId] = useState('');

  useEffect(() => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.addEventListener('change', handleFileChange);
    fileInput.click();

    return () => {
      fileInput.removeEventListener('change', handleFileChange);
    };
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        setStudents(JSON.parse(content));
      };
      reader.readAsText(file);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCustomIdChange = (e) => {
    setCustomId(e.target.value);
  };

  const addStudent = () => {
    if (name && customId) {
      const newStudent = {
        id: customId,
        name: name,
      };
      const updatedStudents = [...students, newStudent];
      setStudents(updatedStudents);
      setName('');
      setCustomId('');
    } else {
      alert('Please enter name and custom id');
    }
  };

  const deleteStudent = (index) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1);
    setStudents(updatedStudents);
  };

  const saveToFile = () => {
    const json = JSON.stringify(students);
    const blob = new Blob([json], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'students.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const visitClassroom = () => {
    window.open('https://hyper.math.ru/account/classroom', '_blank');
  };

  const handleLoadFromFile = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.addEventListener('change', handleFileChange);
    fileInput.click();
  };

  return (
      <div className="container">
        <h1 className="title">Student List</h1>
        <div className="input-container">
          <label className="label">
            Name:
            <input className="input" type="text" value={name} onChange={handleNameChange} />
          </label>
          <label className="label">
            Custom ID:
            <input className="input" type="text" value={customId} onChange={handleCustomIdChange} />
          </label>
          <button className="button save-button" onClick={addStudent}>Add</button>
        </div>
        <div className="button-container">
          <button className="button save-button" onClick={saveToFile}>Save</button>
          <button className="button update-button" onClick={handleLoadFromFile}>Load</button>
          <button className="button" onClick={visitClassroom}>Visit Classroom</button>
        </div>
        <table className="table">
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {students.map((student, index) => (
              <tr key={index}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>
                  <a
                      className="link-button"
                      href={`https://hyper.math.ru/account/classroom/student/${student.id}/31/14`}
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                    Link
                  </a>
                </td>
                <td>
                  <button className="delete-button" onClick={() => deleteStudent(index)}>Delete</button>
                </td>
              </tr>
          ))}
          </tbody>

        </table>
      </div>
  );
}

export default App;
