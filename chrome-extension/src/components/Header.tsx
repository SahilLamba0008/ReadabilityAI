const Header = () => {
	return (
		<header className="p-4 bg-background border-b-1 border-border">
			<div className="flex items-center gap-2 justify-center">
				<h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400">
					Readability AI
				</h1>
			</div>
			<p className="text-xs text-muted-foreground text-center mt-1 line-clamp-2">
				Transform complex content into quick reader-friendly bullet points
			</p>
		</header>
	);
};

export default Header;
