import { useState } from "react";

const INITIAL_FORM_DATA = {
	name: "",
	specialty: "",
	weight: "",
	greased: false,
	highestMedalAchieved: "bronze",
	image: "",
};

export default function HogForm({ onAddHog }) {
	const [formData, setFormData] = useState(INITIAL_FORM_DATA);

	function handleInputChange(event) {
		const { name, type, checked, value } = event.target;

		setFormData((currentFormData) => ({
			...currentFormData,
			[name]: type === "checkbox" ? checked : value,
		}));
	}

	function handleSubmit(event) {
		event.preventDefault();

		const trimmedName = formData.name.trim();
		const trimmedSpecialty = formData.specialty.trim();

		if (!trimmedName || !trimmedSpecialty) {
			return;
		}

		onAddHog({
			name: trimmedName,
			specialty: trimmedSpecialty,
			weight: Number.parseFloat(formData.weight) || 0,
			greased: formData.greased,
			"highest medal achieved": formData.highestMedalAchieved,
			image: formData.image.trim(),
		});

		setFormData(INITIAL_FORM_DATA);
	}

	return (
		<form className="ui form hog-form" onSubmit={handleSubmit} aria-label="Add hog form">
			<h3 className="section-subtitle">Add a Hog</h3>

			<div className="field">
				<label htmlFor="hog-name">Name:</label>
				<input
					id="hog-name"
					name="name"
					type="text"
					value={formData.name}
					onChange={handleInputChange}
				/>
			</div>

			<div className="field">
				<label htmlFor="hog-specialty">Specialty:</label>
				<input
					id="hog-specialty"
					name="specialty"
					type="text"
					value={formData.specialty}
					onChange={handleInputChange}
				/>
			</div>

			<div className="field">
				<label htmlFor="hog-weight">Weight:</label>
				<input
					id="hog-weight"
					name="weight"
					type="number"
					step="0.1"
					min="0"
					value={formData.weight}
					onChange={handleInputChange}
				/>
			</div>

			<div className="field checkbox-field">
				<input
					id="hog-greased"
					name="greased"
					type="checkbox"
					checked={formData.greased}
					onChange={handleInputChange}
				/>
				<label htmlFor="hog-greased">Greased?</label>
			</div>

			<div className="field">
				<label htmlFor="hog-medal">Highest medal achieved:</label>
				<select
					id="hog-medal"
					name="highestMedalAchieved"
					value={formData.highestMedalAchieved}
					onChange={handleInputChange}
				>
					<option value="bronze">bronze</option>
					<option value="silver">silver</option>
					<option value="gold">gold</option>
					<option value="platinum">platinum</option>
					<option value="diamond">diamond</option>
					<option value="wood">wood</option>
				</select>
			</div>

			<div className="field">
				<label htmlFor="hog-image">Image URL</label>
				<input
					id="hog-image"
					name="image"
					type="url"
					value={formData.image}
					onChange={handleInputChange}
					placeholder="https://example.com/hog.jpg"
				/>
			</div>

			<button className="ui primary button add-hog-button" type="submit">
				Add Hog
			</button>
		</form>
	);
}