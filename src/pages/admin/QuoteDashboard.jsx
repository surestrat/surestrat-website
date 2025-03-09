import { useState } from "react";
import { ArrowLeftRight, BarChart3, Calendar, RefreshCw } from "lucide-react";
import QuoteManager from "@components/admin/QuoteManager";
import { useAppwrite } from "@hooks/useAppwrite";

const QuoteDashboard = () => {
	const [stats, setStats] = useState({
		total: 0,
		pending: 0,
		processed: 0,
		completed: 0,
	});

	const [isRefreshing, setIsRefreshing] = useState(false);
	const { getQuotes } = useAppwrite();

	const refreshStats = async () => {
		setIsRefreshing(true);

		try {
			// Get total count
			const totalQuotes = await getQuotes();

			// Get counts by status
			const pendingQuotes = await getQuotes([`equal("status", "pending")`]);
			const processedQuotes = await getQuotes([`equal("status", "processed")`]);
			const completedQuotes = await getQuotes([`equal("status", "completed")`]);

			setStats({
				total: totalQuotes.total,
				pending: pendingQuotes.total,
				processed: processedQuotes.total,
				completed: completedQuotes.total,
			});
		} catch (error) {
			console.error("Error refreshing stats:", error);
		} finally {
			setIsRefreshing(false);
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-2xl font-bold mb-2">Quote Dashboard</h1>
				<p className="text-gray-600">
					Manage and track insurance quote requests
				</p>
			</div>

			{/* Stats Overview */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
				<div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
					<div className="flex justify-between items-center">
						<h3 className="text-sm font-medium text-gray-500">Total Quotes</h3>
						<span className="p-2 bg-blue-50 rounded-full">
							<BarChart3 className="h-4 w-4 text-blue-500" />
						</span>
					</div>
					<p className="mt-2 text-3xl font-semibold">{stats.total}</p>
					<div className="mt-2 flex items-center text-xs text-gray-500">
						<Calendar className="h-3 w-3 mr-1" />
						<span>All time</span>
					</div>
				</div>

				<div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
					<div className="flex justify-between items-center">
						<h3 className="text-sm font-medium text-gray-500">Pending</h3>
						<span className="p-2 bg-yellow-50 rounded-full">
							<ArrowLeftRight className="h-4 w-4 text-yellow-500" />
						</span>
					</div>
					<p className="mt-2 text-3xl font-semibold text-yellow-600">
						{stats.pending}
					</p>
					<div className="mt-2 text-xs text-gray-500 flex items-center">
						<span className="flex items-center">
							<span className="h-2 w-2 rounded-full bg-yellow-400 mr-1"></span>
							Require attention
						</span>
					</div>
				</div>

				<div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
					<div className="flex justify-between items-center">
						<h3 className="text-sm font-medium text-gray-500">Processed</h3>
						<span className="p-2 bg-blue-50 rounded-full">
							<ArrowLeftRight className="h-4 w-4 text-blue-500" />
						</span>
					</div>
					<p className="mt-2 text-3xl font-semibold text-blue-600">
						{stats.processed}
					</p>
					<div className="mt-2 text-xs text-gray-500 flex items-center">
						<span className="flex items-center">
							<span className="h-2 w-2 rounded-full bg-blue-400 mr-1"></span>
							In progress
						</span>
					</div>
				</div>

				<div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
					<div className="flex justify-between items-center">
						<h3 className="text-sm font-medium text-gray-500">Completed</h3>
						<span className="p-2 bg-green-50 rounded-full">
							<ArrowLeftRight className="h-4 w-4 text-green-500" />
						</span>
					</div>
					<p className="mt-2 text-3xl font-semibold text-green-600">
						{stats.completed}
					</p>
					<div className="mt-2 text-xs text-gray-500 flex items-center">
						<span className="flex items-center">
							<span className="h-2 w-2 rounded-full bg-green-400 mr-1"></span>
							Finalized
						</span>
					</div>
				</div>
			</div>

			<div className="mb-6 flex justify-end">
				<button
					onClick={refreshStats}
					disabled={isRefreshing}
					className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					<RefreshCw
						className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
					/>
					{isRefreshing ? "Refreshing..." : "Refresh Stats"}
				</button>
			</div>

			{/* Quote Management Table */}
			<QuoteManager />
		</div>
	);
};

export default QuoteDashboard;
