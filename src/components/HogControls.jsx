export default function HogControls({
	showGreasedOnly,
	onGreasedChange,
	sortBy,
	onSortChange,
}) {
	return (
		<div className="ui segment hog-controls">
			<div className="field">
				<input
					id="greased-filter"
					type="checkbox"
					checked={showGreasedOnly}
					onChange={onGreasedChange}
				/>
				<label htmlFor="greased-filter">Greased Pigs Only?</label>
			</div>

			<div className="field">
				<label htmlFor="hog-sort">Sort by:</label>
				<select id="hog-sort" value={sortBy} onChange={onSortChange}>
					<option value="none">None</option>
					<option value="name">Name</option>
					<option value="weight">Weight</option>
				</select>
			</div>
		</div>
	);
}