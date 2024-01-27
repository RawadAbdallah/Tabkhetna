import { useState } from "react";
import "./newChallengeForm.css";
import { request } from "@/services/request";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const NewChallengeForm = () => {
    const user = useSelector((state: RootState) => state.user);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [challengeError, setChallengeError] = useState<string>("");

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        setChallengeError("");
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setDescription(e.target.value);
        setChallengeError("");
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target?.files ? e.target?.files[0] : undefined;
        if (selectedFile) {
            setChallengeError("");
            setImage(selectedFile);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            
            if(image){
                formData.append("media", image);
            }

            else {
                setChallengeError("Please select an challenge image. Only .png & .jpg is supported.")
                return
            }

            const response = await request({
                route: "/challenges/new",
                body: formData,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            console.log(response);
            if (response && response.status === 200) {
                console.log("ok");
            }

            if (response && response.status === 400) {
                setChallengeError(response.data.error);
            }
        } catch (e) {
            setChallengeError("Something went wrong. Please try again.")
            return;
        }

        // Add your logic for form submission
    };

    return (
        <form
            className="challenge-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        >
            <div className="challenge-error">
                <p>{challengeError || ""}</p>
            </div>
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
                    name="challengeImg"
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
