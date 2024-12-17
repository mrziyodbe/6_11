import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [newsList, setNewsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [formValues, setFormValues] = useState({ title: "", description: "" });

  const handleAddNews = () => {
    setIsModalOpen(true);
    setEditingNews(null);
    setFormValues({ title: "", description: "" });
  };

  const handleEditNews = (record) => {
    setIsModalOpen(true);
    setEditingNews(record);
    setFormValues(record);
  };

  const handleDeleteNews = (id) => {
    setNewsList(newsList.filter((news) => news.id !== id));
  };

  const handleModalSubmit = () => {
    if (!formValues.title || !formValues.description) {
      alert("All fields are required!");
      return;
    }
    if (editingNews) {
      setNewsList(
        newsList.map((news) =>
          news.id === editingNews.id ? { ...news, ...formValues } : news
        )
      );
    } else {
      setNewsList([...newsList, { id: uuidv4(), ...formValues }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-10">
      <div className="flex justify-center mb-5">
        <button className="btn btn-primary" onClick={handleAddNews}>
          Add +
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra table-auto w-full text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {newsList.length > 0 ? (
              newsList.map((news, index) => (
                <tr key={news.id}>
                  <th>{index + 1}</th>
                  <td>{news.title}</td>
                  <td>{news.description}</td>
                  <td className="flex justify-center gap-2">
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => handleEditNews(news)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleDeleteNews(news.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No news
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal modal-open flex items-center justify-center">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {editingNews ? "Edit News" : "Add News"}
            </h3>
            <div className="mt-4">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formValues.title}
                onChange={(e) =>
                  setFormValues({ ...formValues, title: e.target.value })
                }
              />
              <label className="label mt-4">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                rows="4"
                value={formValues.description}
                onChange={(e) =>
                  setFormValues({ ...formValues, description: e.target.value })
                }
              />
            </div>
            <div className="modal-action">
              <button className="btn btn-success" onClick={handleModalSubmit}>
                Save
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
