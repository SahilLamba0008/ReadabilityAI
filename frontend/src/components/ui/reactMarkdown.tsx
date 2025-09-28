import ReactMarkdown from "react-markdown";

const MarkdownRenderer = ({ content }: { content: string }) => {
	return (
		<div className="prose prose-sm max-w-none">
			<ReactMarkdown>{content}</ReactMarkdown>
		</div>
	);
};

export default MarkdownRenderer;
