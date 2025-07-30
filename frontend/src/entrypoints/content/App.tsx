import { Button } from "@/components/ui/button";
import { useState } from "react";

export default () => {
	const [count, setCount] = useState(0);

	const handleClick = async () => {
		setCount(1 + count);
	};

	return (
		<div className="flex flex-col gap-8 items-center justify-center font-sans">
			<Button onClick={handleClick}>Count: {count}</Button>
		</div>
	);
};
