import { useState, useEffect } from "react";
import { useAppwrite } from "@hooks/useAppwrite";
import { logger } from "@utils/logger";
import {
	Table,
	FileText,
	Loader,
	AlertCircle,
	ChevronDown,
	ChevronUp,
	Search,
	Download,
	RefreshCw,
	Filter,
} from "lucide-react";

const QuoteManager = () => {
	const [quotes, setQuotes] = useState([]);
	const [expandedQuote, setExpandedQuote] = useState(null);
	const [quoteDetails, setQuoteDetails] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortField, setSortField] = useState("created_at");
	const [sortOrder, setSortOrder] = useState("desc");
	const [filterStatus, setFilterStatus] = useState("all");

	const { isLoading, error, getQuotes, getQuoteWithDetails } = useAppwrite();

	// Load quotes when component mounts
	useEffect(() => {
		fetchQuotes();
	}, []);

	const fetchQuotes = async () => {
		try {
			// Sort by the selected field
			const queries = [
				// Add sorting
				sortOrder === "asc"
					? `orderAsc("${sortField}")`
					: `orderDesc("${sortField}")`,
				// Add limit
				"limit(100)",
			];

			const response = await getQuotes(queries);
			setQuotes(response.documents);
			logger.debug(`Fetched ${response.documents.length} quotes`);
		} catch (err) {
			logger.error("Error fetching quotes:", err);
		}
	};

	const handleRefresh = () => {
		fetchQuotes();
	};

	const handleSort = (field) => {
		if (sortField === field) {
			// Toggle order if clicking the same field
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			// New field, default to descending
			setSortField(field);
			setSortOrder("desc");
		}

		// Refetch with new sort
		fetchQuotes();
	};

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleFilter = (e) => {
		setFilterStatus(e.target.value);
	};

	const handleExpandQuote = async (quoteId) => {
		if (expandedQuote === quoteId) {
			// Collapse if already expanded
			setExpandedQuote(null);
			setQuoteDetails(null);
			return;
		}

		try {
			setExpandedQuote(quoteId);
			const details = await getQuoteWithDetails(quoteId);
			setQuoteDetails(details);
			logger.debug(`Expanded quote ${quoteId}:`, details);
		} catch (err) {
			logger.error(`Error fetching quote details for ${quoteId}:`, err);
			setQuoteDetails(null);
		}
	};

	// Filter quotes based on search term and status
	const filteredQuotes = quotes.filter((quote) => {
		const matchesSearch =
			quote.reference_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
			quote.$id.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesFilter =
			filterStatus === "all" || quote.status === filterStatus;

		return matchesSearch && matchesFilter;
	});

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleString();
	};

	const downloadQuoteAsPDF = (quoteId) => {
		// This would be implemented with a PDF generation library
		logger.debug(`Download quote ${quoteId} as PDF`);
		alert("PDF download functionality will be implemented with a PDF library");
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-6">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold flex items-center">
					<Table className="w-5 h-5 mr-2" /> Quote Management
				</h2>
				<button
					onClick={handleRefresh}
					className="flex items-center p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
					disabled={isLoading}
				>
					<RefreshCw
						className={`w-4 h-4 mr-1 ${isLoading ? "animate-spin" : ""}`}
					/>
					Refresh
				</button>
			</div>

			{/* Search and Filter */}
			<div className="flex flex-wrap gap-3 mb-4">
				<div className="relative flex-grow max-w-sm">
					<Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
					<input
						type="text"
						placeholder="Search by reference or ID..."
						className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={searchTerm}
						onChange={handleSearch}
					/>
				</div>
				<div className="flex items-center">
					<Filter className="w-4 h-4 mr-2 text-gray-500" />
					<select
						className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={filterStatus}
						onChange={handleFilter}
					>
						<option value="all">All Statuses</option>
						<option value="pending">Pending</option>
						<option value="processed">Processed</option>
						<option value="completed">Completed</option>
						<option value="cancelled">Cancelled</option>
					</select>
				</div>
			</div>

			{/* Error State */}
			{error && (
				<div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4 flex items-start">
					<AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
					<div>
						<p className="font-medium">Error loading quotes</p>
						<p className="text-sm">{error}</p>
					</div>
				</div>
			)}

			{/* Loading State */}
			{isLoading && !quotes.length && (
				<div className="text-center py-12">
					<Loader className="w-6 h-6 mx-auto animate-spin text-blue-500 mb-2" />
					<p className="text-gray-500">Loading quotes...</p>
				</div>
			)}

			{/* No Results */}
			{!isLoading && filteredQuotes.length === 0 && (
				<div className="text-center py-12 bg-gray-50 rounded-lg">
					<FileText className="w-6 h-6 mx-auto text-gray-400 mb-2" />
					<p className="text-gray-500">No quotes found</p>
				</div>
			)}

			{/* Quotes Table */}
			{filteredQuotes.length > 0 && (
				<div className="overflow-x-auto">
					<table className="w-full border-collapse">
						<thead>
							<tr className="bg-gray-50 text-left">
								<th className="px-4 py-3 border-b text-xs font-medium text-gray-500 uppercase tracking-wider">
									<button
										className="flex items-center focus:outline-none"
										onClick={() => handleSort("reference_number")}
									>
										Reference
										{sortField === "reference_number" &&
											(sortOrder === "asc" ? (
												<ChevronUp className="w-4 h-4 ml-1" />
											) : (
												<ChevronDown className="w-4 h-4 ml-1" />
											))}
									</button>
								</th>
								<th className="px-4 py-3 border-b text-xs font-medium text-gray-500 uppercase tracking-wider">
									<button
										className="flex items-center focus:outline-none"
										onClick={() => handleSort("status")}
									>
										Status
										{sortField === "status" &&
											(sortOrder === "asc" ? (
												<ChevronUp className="w-4 h-4 ml-1" />
											) : (
												<ChevronDown className="w-4 h-4 ml-1" />
											))}
									</button>
								</th>
								<th className="px-4 py-3 border-b text-xs font-medium text-gray-500 uppercase tracking-wider">
									<button
										className="flex items-center focus:outline-none"
										onClick={() => handleSort("created_at")}
									>
										Created
										{sortField === "created_at" &&
											(sortOrder === "asc" ? (
												<ChevronUp className="w-4 h-4 ml-1" />
											) : (
												<ChevronDown className="w-4 h-4 ml-1" />
											))}
									</button>
								</th>
								<th className="px-4 py-3 border-b text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{filteredQuotes.map((quote) => (
								<React.Fragment key={quote.$id}>
									<tr
										className={`border-b hover:bg-gray-50 cursor-pointer ${
											expandedQuote === quote.$id ? "bg-blue-50" : ""
										}`}
										onClick={() => handleExpandQuote(quote.$id)}
									>
										<td className="px-4 py-3">
											<div className="flex items-center">
												<FileText className="w-4 h-4 mr-2 text-blue-500" />
												{quote.reference_number}
											</div>
										</td>
										<td className="px-4 py-3">
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${
													quote.status === "pending"
														? "bg-yellow-100 text-yellow-800"
														: ""
												}
                        ${
													quote.status === "processed"
														? "bg-blue-100 text-blue-800"
														: ""
												}
                        ${
													quote.status === "completed"
														? "bg-green-100 text-green-800"
														: ""
												}
                        ${
													quote.status === "cancelled"
														? "bg-red-100 text-red-800"
														: ""
												}
                        `}
											>
												{quote.status}
											</span>
										</td>
										<td className="px-4 py-3 text-sm text-gray-600">
											{formatDate(quote.created_at)}
										</td>
										<td className="px-4 py-3 text-right">
											<button
												onClick={(e) => {
													e.stopPropagation();
													downloadQuoteAsPDF(quote.$id);
												}}
												className="text-gray-500 hover:text-blue-600"
												title="Download PDF"
											>
												<Download className="w-4 h-4" />
											</button>
										</td>
									</tr>

									{/* Expanded Quote Details */}
									{expandedQuote === quote.$id && (
										<tr>
											<td colSpan={4} className="px-4 py-3 bg-gray-50 border-b">
												{quoteDetails ? (
													<div className="p-2">
														<h4 className="font-semibold mb-2">
															Quote Details
														</h4>

														{quoteDetails.personalDetails && (
															<div className="mb-3">
																<h5 className="text-sm font-medium text-gray-700 mb-1">
																	Personal Information
																</h5>
																<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white p-2 rounded border">
																	<div>
																		<p className="text-xs text-gray-500">
																			Name
																		</p>
																		<p className="text-sm">
																			{quoteDetails.personalDetails.first_name}{" "}
																			{quoteDetails.personalDetails.last_name}
																		</p>
																	</div>
																	<div>
																		<p className="text-xs text-gray-500">
																			Email
																		</p>
																		<p className="text-sm">
																			{quoteDetails.personalDetails.email}
																		</p>
																	</div>
																	<div>
																		<p className="text-xs text-gray-500">
																			Phone
																		</p>
																		<p className="text-sm">
																			{quoteDetails.personalDetails.phone}
																		</p>
																	</div>
																	<div>
																		<p className="text-xs text-gray-500">
																			Province
																		</p>
																		<p className="text-sm">
																			{quoteDetails.personalDetails.province}
																		</p>
																	</div>
																</div>
															</div>
														)}

														<div className="mb-3">
															<h5 className="text-sm font-medium text-gray-700 mb-1">
																Insurance Types
															</h5>
															<div className="flex flex-wrap gap-1">
																{quoteDetails.insuranceTypes.map((type) => (
																	<span
																		key={type}
																		className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded"
																	>
																		{type.charAt(0).toUpperCase() +
																			type.slice(1)}
																	</span>
																))}
															</div>
														</div>

														{/* Render additional details based on insurance types */}
														{quoteDetails.details.vehicle && (
															<div className="mb-3">
																<h5 className="text-sm font-medium text-gray-700 mb-1">
																	Vehicle Details
																</h5>
																<div className="bg-white p-2 rounded border">
																	<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
																		<div>
																			<p className="text-xs text-gray-500">
																				Type
																			</p>
																			<p className="text-sm">
																				{
																					quoteDetails.details.vehicle
																						.vehicle_type
																				}
																			</p>
																		</div>
																		<div>
																			<p className="text-xs text-gray-500">
																				Make & Model
																			</p>
																			<p className="text-sm">
																				{
																					quoteDetails.details.vehicle
																						.vehicle_make
																				}{" "}
																				{
																					quoteDetails.details.vehicle
																						.vehicle_model
																				}
																			</p>
																		</div>
																		<div>
																			<p className="text-xs text-gray-500">
																				Year
																			</p>
																			<p className="text-sm">
																				{
																					quoteDetails.details.vehicle
																						.vehicle_year
																				}
																			</p>
																		</div>
																		<div>
																			<p className="text-xs text-gray-500">
																				Usage
																			</p>
																			<p className="text-sm">
																				{
																					quoteDetails.details.vehicle
																						.vehicle_usage
																				}
																			</p>
																		</div>
																	</div>
																</div>
															</div>
														)}

														{/* Similar sections for other insurance types */}

														<div className="text-xs text-gray-500 mt-3">
															ID: {quoteDetails.$id} • Created:{" "}
															{formatDate(quoteDetails.created_at)}
														</div>
													</div>
												) : (
													<div className="flex justify-center items-center py-4">
														<Loader className="w-5 h-5 text-blue-500 animate-spin" />
														<span className="ml-2 text-sm text-gray-500">
															Loading details...
														</span>
													</div>
												)}
											</td>
										</tr>
									)}
								</React.Fragment>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default QuoteManager;
