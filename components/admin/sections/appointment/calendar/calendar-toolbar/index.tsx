const CustomToolbar = ({ label, onNavigate, onView, view }: any) => {
  return (
    <div className="flex items-center justify-between mb-4 over">
      {/* Navigation Buttons */}
      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => onNavigate("PREV")}
        >
          Back
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => onNavigate("TODAY")}
        >
          Today
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => onNavigate("NEXT")}
        >
          Next
        </button>
      </div>

      {/* Current View Label */}
      <h2 className="text-lg font-bold">{label}</h2>

 
      {/* View Selector */}
      <div className="flex gap-2">
        <button
          className={`px-4 py-2 rounded ${
            view === "month" ? "bg-blue-700 text-white" : "bg-gray-300"
          }`}
          onClick={() => onView("month")}
        >
          Month
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "week" ? "bg-blue-700 text-white" : "bg-gray-300"
          }`}
          onClick={() => onView("week")}
        >
          Week
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "day" ? "bg-blue-700 text-white" : "bg-gray-300"
          }`}
          onClick={() => onView("day")}
        >
          Day
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "agenda" ? "bg-blue-700 text-white" : "bg-gray-300"
          }`}
          onClick={() => onView("agenda")}
        >
          Agenda
        </button>
      </div>
    </div>
  );
};

export default CustomToolbar;
