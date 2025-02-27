const PillHeader = ({ name }) => {
	return (
		<span className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 rounded-full px-4 py-1.5 text-sm font-medium">
			<span className="relative flex w-2 h-2">
				<span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
				<span className="relative inline-flex w-2 h-2 bg-green-600 rounded-full"></span>
			</span>
			{name}
		</span>
	);
};

export default PillHeader;
