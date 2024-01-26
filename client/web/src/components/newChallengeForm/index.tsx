import { useState } from "react";
import "./newChallengeForm.css";

const NewChallengeForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Image File:", image);

    // Add your logic for form submission
  };

  return (
    <form className="challenge-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Challenge Title</label>
        <input
          type="text"
          id="title"
          placeholder="Enter challenge title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Challenge Description</label>
        <textarea
          id="description"
          placeholder="Enter challenge description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>

      <div className="form-group">
        <input
          type="file"
          id="image"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label htmlFor="image" className="file-label">
          📎 Upload Challenge Image
        </label>
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Selected Image"
            className="selected-image"
          />
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default NewChallengeForm;
