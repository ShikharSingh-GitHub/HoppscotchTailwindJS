import Tippy from "@tippyjs/react";
import { ChevronRight, Star, Trash2 } from "lucide-react";
import { useState } from "react";

const HistoryItem = ({ entry, onDelete, onToggleStar, onRestore }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getMethodColor = (method) => {
    const colors = {
      GET: "text-green-500",
      POST: "text-blue-500",
      PUT: "text-orange-500",
      DELETE: "text-red-500",
      PATCH: "text-purple-500",
    };
    return colors[method] || "text-gray-500";
  };

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return "success-response";
    if (status >= 400) return "error-response";
    return "text-yellow-500";
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="flex flex-col">
      <details className="flex flex-col" open={isExpanded}>
        <summary
          className="group flex min-w-0 flex-1 cursor-pointer items-center justify-between text-tiny text-zinc-400 transition focus:outline-none"
          onClick={(e) => {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }}>
          <span className="inline-flex items-center justify-center truncate px-4 py-2 transition group-hover:text-zinc-300">
            <ChevronRight
              size={16}
              className={`mr-2 flex flex-shrink-0 transition-transform ${
                isExpanded ? "rotate-90" : ""
              }`}
            />
            <span className="capitalize-first truncate">
              {formatTimeAgo(entry.timestamp)}
            </span>
          </span>

          <Tippy
            content={<span className="text-xs">Delete</span>}
            theme="light">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(entry.id);
              }}
              className="inline-flex items-center justify-center font-semibold transition whitespace-nowrap focus:outline-none text-red-500 hover:text-red-600 p-2 hidden group-hover:inline-flex">
              <Trash2 size={16} />
            </button>
          </Tippy>
        </summary>

        {isExpanded && (
          <div className="group flex items-stretch" id={entry.id}>
            <span
              className={`flex w-16 cursor-pointer items-center justify-center truncate px-2 ${getStatusColor(
                entry.response_status
              )}`}
              onClick={() => onRestore(entry)}>
              <span className="truncate text-tiny font-semibold">
                {entry.method}
              </span>
            </span>

            <span
              className="flex min-w-0 flex-1 cursor-pointer py-2 pr-2 transition group-hover:text-zinc-300"
              onClick={() => onRestore(entry)}>
              <span className="truncate text-xs">{entry.url}</span>
            </span>

            <div className="flex">
              <Tippy
                content={<span className="text-xs">Delete</span>}
                theme="light">
                <button
                  onClick={() => onDelete(entry.id)}
                  className="inline-flex items-center justify-center font-semibold transition whitespace-nowrap focus:outline-none text-red-500 hover:text-red-600 p-2 hidden group-hover:inline-flex">
                  <Trash2 size={16} />
                </button>
              </Tippy>

              <Tippy
                content={
                  <span className="text-xs">
                    {entry.is_starred ? "Unstar" : "Star"}
                  </span>
                }
                theme="light">
                <button
                  onClick={() => onToggleStar(entry.id)}
                  className={`inline-flex items-center justify-center font-semibold transition whitespace-nowrap focus:outline-none p-2 hidden group-hover:inline-flex ${
                    entry.is_starred
                      ? "text-yellow-500 hover:text-yellow-600"
                      : "text-gray-500 hover:text-yellow-500"
                  }`}>
                  <Star
                    size={16}
                    fill={entry.is_starred ? "currentColor" : "none"}
                  />
                </button>
              </Tippy>
            </div>
          </div>
        )}
      </details>
    </div>
  );
};

export default HistoryItem;
