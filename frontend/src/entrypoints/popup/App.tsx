import { useState } from "react";
import "~/assets/global.css";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="w-[350px] h-[400px] flex flex-col">
			<Header />
		</div>
	);
}

export default App;
