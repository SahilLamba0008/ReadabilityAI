import React from "react";
import ReactDOM from "react-dom/client";
import "~/assets/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<div className="h-full w-full">
			<h1 className="text-3xl text-red-500 bg-red-950 border-b-4 border-b-red-400">
				Side Panel Extension
			</h1>
			<p className="text-lg text-gray-700 h-full">
				This is a side panel extension built with React and WXT. You can
				customize it further by adding components or styles as needed.
			</p>
		</div>
	</React.StrictMode>
);
