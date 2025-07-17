import Tippy from "@tippyjs/react";
import { formatDistanceToNow, isToday, isYesterday, subDays } from "date-fns";
import { useEffect } from "react";
import "tippy.js/dist/tippy.css"; // Make sure this is imported somewhere in your app
import useHistoryStore from "../../store/historyStore";
import useRequestStore from "../../store/store";
import HistoryGroup from "./HistoryGroup";

// Group history entries by time period
export const groupHistoryByDate = (historyItems) => {
  const groups = {};

  historyItems.forEach((item) => {
    const date = new Date(item.timestamp);
    let groupKey;

    if (isToday(date)) {
      const minutesAgo = Math.round((new Date() - date) / (1000 * 60));
      if (minutesAgo < 60) {
        groupKey = `${minutesAgo} minutes ago`;
      } else {
        const hoursAgo = Math.round(minutesAgo / 60);
        groupKey = `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
      }
    } else if (isYesterday(date)) {
      groupKey = "Yesterday";
    } else if (date > subDays(new Date(), 7)) {
      groupKey = formatDistanceToNow(date, { addSuffix: false }) + " ago";
    } else {
      groupKey = date.toLocaleDateString();
    }

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }

    groups[groupKey].push(item);
  });

  return Object.entries(groups).map(([date, items]) => ({
    date,
    items,
  }));
};

const History = () => {
  const {
    history,
    loading,
    error,
    fetchHistory,
    deleteHistoryEntry,
    toggleHistoryStar,
    clearAllHistory,
  } = useHistoryStore();

  const { restoreFromHistory } = useRequestStore();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Group history entries by date
  const groupedHistory = groupHistoryByDate(history || []);

  // Handler for restoring a request
  const handleRestoreRequest = (entry) => {
    restoreFromHistory(entry);
  };

  // Handler for deleting a group of history entries
  const handleDeleteGroup = (date) => {
    if (confirm(`Delete all entries from "${date}"?`)) {
      const group = groupedHistory.find((group) => group.date === date);
      if (group && group.items) {
        group.items.forEach((entry) => {
          deleteHistoryEntry(entry.id);
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-400">Loading history...</div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-400">Error: {error}</div>;
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* Search and Actions Bar */}
      <div className="sticky top-0 z-10 flex flex-shrink-0 flex-col overflow-x-auto border-b border-dividerLight bg-primary">
        <div className="flex">
          <input
            type="search"
            autoComplete="off"
            className="flex w-full bg-transparent px-4 py-2 h-7 text-xs"
            placeholder="Search"
          />
          <div className="flex">
            {/* Help/Documentation Link */}
            <a
              aria-label="Link"
              href="https://docs.hoppscotch.io/documentation/features/history"
              role="button"
              target="_blank"
              rel="noopener"
              exact="true"
              className="inline-flex items-center justify-center font-semibold transition whitespace-nowrap focus:outline-none text-secondary hover:text-secondaryDark focus-visible:text-secondaryDark p-1.5"
              tabIndex="0">
              <span className="inline-flex items-center justify-center whitespace-nowrap">
                <svg
                  viewBox="0 0 24 24"
                  width="1em"
                  height="1em"
                  className="svg-icons">
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01"></path>
                  </g>
                </svg>
                <div className="truncate max-w-[16rem]"></div>
              </span>
            </a>

            {/* Filter Button */}
            <Tippy
              content="Filter history"
              placement="bottom"
              className="tippy-box"
              arrow={false}
              theme="dark">
              <span data-v-tippy="" aria-expanded="false">
                <button
                  aria-label="button"
                  role="button"
                  exact="true"
                  className="inline-flex items-center justify-center font-semibold transition whitespace-nowrap focus:outline-none text-secondary hover:text-secondaryDark focus-visible:text-secondaryDark p-1.5"
                  tabIndex="0">
                  <span className="inline-flex items-center justify-center whitespace-nowrap">
                    <svg
                      viewBox="0 0 24 24"
                      width="1em"
                      height="1em"
                      className="svg-icons">
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M22 3H2l8 9.46V19l4 2v-8.54z"></path>
                    </svg>
                    <div className="truncate max-w-[16rem]"></div>
                  </span>
                </button>
              </span>
            </Tippy>

            {/* Clear History Button */}
            <Tippy
              content="Clear history"
              placement="bottom"
              className="tippy-box"
              arrow={false}
              theme="dark">
              <button
                aria-label="button"
                role="button"
                exact="true"
                className="inline-flex items-center justify-center font-semibold transition whitespace-nowrap focus:outline-none text-secondary hover:text-secondaryDark focus-visible:text-secondaryDark p-1.5"
                tabIndex="0"
                data-testid="clear_history"
                onClick={() => {
                  if (confirm("Are you sure you want to clear all history?")) {
                    clearAllHistory();
                  }
                }}>
                <span className="inline-flex items-center justify-center whitespace-nowrap">
                  <svg
                    viewBox="0 0 24 24"
                    width="1em"
                    height="1em"
                    className="svg-icons">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 5v6m4-6v6"></path>
                  </svg>
                  <div className="truncate max-w-[16rem]"></div>
                </span>
              </button>
            </Tippy>
          </div>
        </div>
      </div>

      {/* History Content */}
      {!history || history.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-4 flex-1">
          <div className="w-16 h-16 mb-4 flex items-center justify-center">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              className="text-gray-500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="32"
                cy="32"
                r="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M32 16V32L40 40"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="32" cy="12" r="2" fill="currentColor" />
              <circle cx="52" cy="32" r="2" fill="currentColor" />
              <circle cx="32" cy="52" r="2" fill="currentColor" />
              <circle cx="12" cy="32" r="2" fill="currentColor" />
            </svg>
          </div>
          <span className="max-w-sm mt-2 text-center whitespace-normal text-xs text-gray-500">
            History is empty
          </span>
          <p className="text-center text-gray-600 text-xs mt-2 max-w-sm">
            Start making requests to see them here
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          {groupedHistory.map((group) => (
            <HistoryGroup
              key={group.date}
              groupDate={group.date}
              entries={group.items}
              onDelete={deleteHistoryEntry}
              onToggleStar={toggleHistoryStar}
              onRestore={handleRestoreRequest}
              onDeleteGroup={handleDeleteGroup}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
