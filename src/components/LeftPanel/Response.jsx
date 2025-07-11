import {
  Copy,
  CornerDownLeft,
  Download,
  Ellipsis,
  ExternalLink,
  Filter,
  Save,
  WrapText,
} from "lucide-react";
import { useState } from "react";
import useRequestStore from "../../store/store";
import IconButton from "../IconButton/IconButton";

const Response = () => {
  const responseHeader = [
    { id: 1, name: "JSON" },
    { id: 2, name: "Raw" },
    { id: 3, name: "Headers" },
    { id: 4, name: "Test Results" },
  ];

  const [responseH, setResponseH] = useState("JSON");

  const { isRequested } = useRequestStore();

  const jsonData = {
    method: "GET",
    args: {},
    data: "",
    headers: {
      "accept-encoding": "gzip",
      "cdn-loop": "netlify",
      host: "echo.hoppscotch.io",
      "user-agent": "Proxyscotch/1.1",
      "x-country": "US",
      "x-forwarded-for": "169.254.169.126:17756, 2600:1900:0:2d01::2401",
      "x-nf-account-id": "5e2b91527eb7a24fb0054390",
      "x-nf-account-tier": "account_type_pro",
      "x-nf-client-connection-ip": "2600:1900:0:2d01::2401",
      "x-nf-request-id": "01JM2RB8VTJ5T1KA9JFYFSKFT1",
    },
    path: "/",
    isBase64Encoded: true,
  };

  const formatJsonLines = (obj, indent = 2) => {
    const lines = [];
    const pad = " ".repeat(indent);

    lines.push(`${pad}{`);

    const entries = Object.entries(obj);
    entries.forEach(([key, value], index) => {
      const comma = index < entries.length - 1 ? "," : "";
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        lines.push(`${pad}  "${key}": {`);
        const subEntries = Object.entries(value);
        subEntries.forEach(([subKey, subValue], subIndex) => {
          const subComma = subIndex < subEntries.length - 1 ? "," : "";
          lines.push(`${pad}    "${subKey}": "${subValue}"${subComma}`);
        });
        lines.push(`${pad}  }${comma}`);
      } else if (typeof value === "string") {
        lines.push(`${pad}  "${key}": "${value}"${comma}`);
      } else {
        lines.push(`${pad}  "${key}": ${value}${comma}`);
      }
    });

    lines.push(`${pad}}`);
    return lines;
  };

  const lines = formatJsonLines(jsonData);

  return (
    <>
      {isRequested ? (
        <div className="mt-0">
          <div className="flex space-x-4">
            {responseHeader.map((r) => (
              <button
                key={r.id}
                onClick={() => setResponseH(r.name)}
                className={`text-[13px] font-semibold hover:text-white ${
                  responseH === r.name
                    ? "underline underline-offset-10 decoration-btn decoration-2 text-white"
                    : "text-zinc-500"
                }`}>
                {r.name}
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <h2 className="mt-4 mb-3 font-semibold text-xs text-zinc-500">
              Response Body
            </h2>

            <div className="flex space-x-5">
              <IconButton name="Wrap Lines" direction="top">
                <button className="text-blue-500 hover:text-white">
                  <WrapText size={16} />
                </button>
              </IconButton>
              <IconButton name="Filter" direction="top">
                <button className="text-zinc-500 hover:text-white">
                  <Filter size={16} />
                </button>
              </IconButton>
              <IconButton name="Download File" direction="top">
                <button className="text-zinc-500 hover:text-white">
                  <Download size={16} />
                </button>
              </IconButton>
              <IconButton name="Save" direction="top">
                <button className="text-zinc-500 hover:text-white">
                  <Save size={16} />
                </button>
              </IconButton>
              <IconButton name="Save" direction="top">
                <button className="text-zinc-500 hover:text-white">
                  <Copy size={16} />
                </button>
              </IconButton>
              <IconButton name="Copy Link" direction="top">
                <button className="text-zinc-500 hover:text-white">
                  <Ellipsis size={16} />
                </button>
              </IconButton>
            </div>
          </div>

          {/* Response */}
          <div className="border border-search-bg pt-3 h-96 pb-24 overflow-y-scroll">
            {lines.map((line, index) => (
              <div key={index} className="flex items-start">
                <div className="w-10  text-gray-500 text-xs text-center">
                  {index + 1}
                </div>
                <div className="pl-3 border-l border-search-bg leading-5">
                  {line.split(/("[^"]*":)/g).map((part, idx) =>
                    part.match(/^"/) ? (
                      <span
                        key={idx}
                        className="text-blue-400 text-[13px] font-semibold pl-4">
                        {part}
                      </span>
                    ) : part.match(/".*"/) ? (
                      <span
                        key={idx}
                        className="text-purple-400 text-[13px] font-semibold pl-4">
                        {part}
                      </span>
                    ) : (
                      <span key={idx} className="text-white text-[13px] pl-4">
                        {part}
                      </span>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-zinc-400 flex-1">
          {/* Keyboard Shortcuts - Two Column Layout */}
          <div className="mb-4 flex space-x-2">
            {/* Left Column - Text Labels (Right Aligned) */}
            <div className="flex flex-col items-end space-y-4 text-right">
              <span className="flex flex-1 items-center text-xs font-medium">
                Send Request
              </span>
              <span className="flex flex-1 items-center text-xs font-medium">
                Keyboard shortcuts
              </span>
              <span className="flex flex-1 items-center text-xs font-medium">
                Search & command menu
              </span>
              <span className="flex flex-1 items-center text-xs font-medium">
                Help menu
              </span>
            </div>

            {/* Right Column - Keyboard Shortcuts (Left Aligned) */}
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-1">
                <span className="text-[10px] bg-stone-800 rounded px-2 py-1 text-zinc-500 font-medium">
                  Ctrl
                </span>
                <span className="text-[10px] bg-stone-800 rounded px-2 pt-2 text-zinc-500">
                  <CornerDownLeft size={10} />
                </span>
              </div>
              <div className="flex space-x-1">
                <span className="text-[10px] bg-stone-800 rounded px-2 py-1 text-zinc-500 font-medium">
                  Ctrl
                </span>
                <span className="text-[10px] bg-stone-800 rounded px-2 py-1 text-zinc-500 font-medium">
                  K
                </span>
              </div>
              <div className="flex space-x-1">
                <span className="text-[10px] bg-stone-800 rounded px-2 py-1 text-zinc-500 font-medium">
                  Ctrl
                </span>
                <span className="text-[10px] bg-stone-800 rounded px-2 py-1 text-zinc-500 font-medium">
                  /
                </span>
              </div>
              <div className="flex space-x-1">
                <span className="text-[10px] bg-stone-800 rounded px-2 py-1 text-zinc-500 font-medium">
                  ?
                </span>
              </div>
            </div>
          </div>

          {/* Documentation Button */}
          <a
            href="https://docs.hoppscotch.io/documentation/features/rest-api-testing#response"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-semibold transition whitespace-nowrap focus:outline-none text-zinc-400 hover:text-zinc-300 focus-visible:text-zinc-300 rounded px-4 py-2 flex-row-reverse border border-zinc-700 hover:border-zinc-600 focus-visible:border-zinc-600 text-xs">
            <span className="inline-flex items-center justify-center whitespace-nowrap flex-row-reverse">
              <ExternalLink size={16} className="ml-2" />
              <div className="truncate max-w-[16rem]">Documentation</div>
            </span>
          </a>
        </div>
      )}
    </>
  );
};

export default Response;
