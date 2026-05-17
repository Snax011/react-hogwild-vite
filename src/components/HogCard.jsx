import pigFallback from "../assets/porco.png";

export default function HogCard({ hog, isExpanded, onToggleDetails, onHide }) {
	function handleHideClick(event) {
		event.stopPropagation();
		onHide(hog.id);
	}

	return (
		<article
			aria-label="hog card"
			className="ui fluid card hog-card"
			onClick={() => onToggleDetails(hog.id)}
		>
			<div className="image hog-image-wrap">
				<img
					src={hog.image || pigFallback}
					alt={`Photo of ${hog.name}`}
					className="hog-image"
				/>
			</div>

			<div className="content hog-card-content">
				<h3 className="header hog-name">{hog.name}</h3>

				{isExpanded ? (
					<div className="hog-details">
						<p>
							<strong>Specialty:</strong> {hog.specialty}
						</p>
						<p>
							<strong>Weight:</strong> {hog.weight}
						</p>
						<p>
							<strong>Greased:</strong> {hog.greased ? "Yes" : "No"}
						</p>
						<p>
							<strong>Highest medal achieved:</strong> {hog["highest medal achieved"]}
						</p>
					</div>
				) : null}

				<button
					type="button"
					className="ui tiny button hide-button"
					onClick={handleHideClick}
				>
					Hide Me
				</button>
			</div>
		</article>
	);
}