const Header = () => {
	return (
		<header className="p-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-b border-gray-800">
			<div className="flex items-center gap-2 justify-center">
				<h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-300 to-gray-100">
					Readability AI
				</h1>
			</div>
			<p className="text-xs text-gray-400 text-center mt-1">
				Transform complex content into quick reader-friendly bullet points
			</p>
		</header>
	);
};

export default Header;
