import { useMemo, useState } from "react";
import Nav from "./Nav";
import HogCard from "./HogCard";
import HogControls from "./HogControls";
import HogForm from "./HogForm";
import hogsData from "../porkers_data";

const INITIAL_SORT_OPTION = "none";

function createHogId(hog, index) {
	return `${hog.name.toLowerCase().replace(/\s+/g, "-")}-${index}`;
}

function getInitialHogs() {
	return hogsData.map((hog, index) => ({
		...hog,
		id: createHogId(hog, index),
		hidden: false,
	}));
}

function App() {
	const [hogs, setHogs] = useState(() => getInitialHogs());
	const [showGreasedOnly, setShowGreasedOnly] = useState(false);
	const [sortBy, setSortBy] = useState(INITIAL_SORT_OPTION);
	const [expandedHogIds, setExpandedHogIds] = useState([]);

	function handleGreasedChange(event) {
		setShowGreasedOnly(event.target.checked);
	}

	function handleSortChange(event) {
		setSortBy(event.target.value);
	}

	function handleToggleHogDetails(hogId) {
		setExpandedHogIds((currentExpandedIds) =>
			currentExpandedIds.includes(hogId)
				? currentExpandedIds.filter((currentId) => currentId !== hogId)
				: [...currentExpandedIds, hogId],
		);
	}

	function handleHideHog(hogId) {
		setHogs((currentHogs) =>
			currentHogs.map((hog) =>
				hog.id === hogId ? { ...hog, hidden: true } : hog,
			),
		);
		setExpandedHogIds((currentExpandedIds) =>
			currentExpandedIds.filter((currentId) => currentId !== hogId),
		);
	}

	function handleAddHog(newHog) {
		setHogs((currentHogs) => [
			...currentHogs,
			{
				...newHog,
				id: `hog-${Date.now()}-${Math.random().toString(16).slice(2)}`,
				hidden: false,
			},
		]);
	}

	const visibleHogs = useMemo(() => {
		const filteredHogs = hogs.filter((hog) => {
			if (hog.hidden) {
				return false;
			}

			if (showGreasedOnly && !hog.greased) {
				return false;
			}

			return true;
		});

		const sortedHogs = [...filteredHogs];

		if (sortBy === "name") {
			sortedHogs.sort((firstHog, secondHog) =>
				firstHog.name.localeCompare(secondHog.name),
			);
		}

		if (sortBy === "weight") {
			sortedHogs.sort((firstHog, secondHog) => firstHog.weight - secondHog.weight);
		}

		return sortedHogs;
	}, [hogs, showGreasedOnly, sortBy]);

	return (
		<div className="App page-shell">
			<Nav />

			<main className="hog-app">
				<section className="hog-sidebar" aria-labelledby="hog-tools-title">
					<h2 id="hog-tools-title" className="section-title">
						Manage the hog lineup
					</h2>
					<HogControls
						showGreasedOnly={showGreasedOnly}
						onGreasedChange={handleGreasedChange}
						sortBy={sortBy}
						onSortChange={handleSortChange}
					/>
					<HogForm onAddHog={handleAddHog} />
				</section>

				<section className="hog-main" aria-labelledby="hog-gallery-title">
					<div className="hog-gallery-header">
						<h2 id="hog-gallery-title" className="section-title">
							County Fair Showroom
						</h2>
						<p className="section-description">
							Click a hog card to reveal more details, hide any hog you want to
							remove from view, and keep the board sorted your way.
						</p>
					</div>

					{visibleHogs.length === 0 ? (
						<p className="empty-state">No hogs match the current filters.</p>
					) : (
						<div className="ui grid container hog-grid" aria-label="hog list">
							{visibleHogs.map((hog) => (
								<div key={hog.id} className="ui eight wide column hog-column">
									<HogCard
										hog={hog}
										isExpanded={expandedHogIds.includes(hog.id)}
										onToggleDetails={handleToggleHogDetails}
										onHide={handleHideHog}
									/>
								</div>
							))}
						</div>
					)}
				</section>
			</main>
		</div>
	);
}

export default App;
