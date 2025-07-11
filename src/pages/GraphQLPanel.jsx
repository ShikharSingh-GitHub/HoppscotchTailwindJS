import { javascript } from "@codemirror/lang-javascript";
import Tippy from "@tippyjs/react";
import { createTheme } from "@uiw/codemirror-themes";
import CodeMirror from "@uiw/react-codemirror";
import {
  BookOpen,
  ChevronDown,
  CornerDownLeft,
  ExternalLink,
  Eye,
  Layers,
  Plus,
  Save,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import KeyboardShortcuts from "../components/KeyboardShortcuts/KeyboardShortcuts";
import QueryParameterComponent from "../components/LeftPanel/QueryParameter";
import GraphQLRightPanel from "../components/RightPanel/GraphQLRightPanel";
import useRequestStore from "../store/store";

function GraphQLPanel() {
  const [leftWidth, setLeftWidth] = useState(75);
  const containerRef = useRef(null);
  const isResizing = useRef(false);

  const MIN_WIDTH = 25;
  const MAX_WIDTH = 75;

  const startResizing = (e) => {
    e.preventDefault(); // Add this to prevent default behavior
    isResizing.current = true;
    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", stopResizing);
  };

  const handleResize = (e) => {
    if (!isResizing.current || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    let newLeftWidth =
      ((e.clientX - containerRect.left) / containerWidth) * 100;
    if (newLeftWidth < MIN_WIDTH) newLeftWidth = MIN_WIDTH;
    if (newLeftWidth > MAX_WIDTH) newLeftWidth = MAX_WIDTH;
    setLeftWidth(newLeftWidth);
  };

  const stopResizing = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleResize);
    document.removeEventListener("mouseup", stopResizing);
  };

  const [history, setHistory] = useState([
    {
      id: 1,
      title: "Untitled",
      url: "https://echo.hoppscotch.io",
    },
  ]);

  const [activeTab, setActiveTap] = useState(1);
  const tabContainerRef = useRef(null);

  useEffect(() => {
    if (tabContainerRef.current) {
      tabContainerRef.current.scrollTo({
        left: tabContainerRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [history]);

  const { requested } = useRequestStore();

  // Add History
  const addHistory = () => {
    const newId = history.length + 1;
    setHistory([
      ...history,
      { id: newId, method: "GET", title: "Untitled", url: "" },
    ]);
    setActiveTap(newId);
  };

  // Remove History
  const removeHistory = (id, index) => {
    setHistory(history.filter((h) => h.id !== id));
    setActiveTap(index > 1 ? index - 1 : 1);
  };

  const tabs = [
    { id: 1, name: "Query" },
    { id: 2, name: "Variables" },
    { id: 3, name: "Headers" },
    { id: 4, name: "Authorization" },
  ];

  const [tap, setTab] = useState("Query");
  const myTheme = createTheme({
    theme: "light",
    settings: {
      background: "#181818",
      backgroundImage: "",
      foreground: "#fff",
      caret: "#181818",
      selection: "#036dd626",
      selectionMatch: "#036dd626",
      lineHighlight: "#181818",
      gutterBackground: "#181818",
      gutterForeground: "#fff",
    },
  });
  const extensions = [javascript({ jsx: true })];

  return (
    <div
      className="flex w-full h-full border-l border-gray-700/30"
      ref={containerRef}>
      <div style={{ width: `${leftWidth}%` }}>
        <div className="lg:px-4 px-2 py-3">
          <div className="flex h-9 gap-x-2">
            <div className="w-[85%] grid bg-search-bg-hover rounded-sm">
              {/* Input */}
              <div className="w-full">
                <input
                  type="text"
                  className="lg:h-full h-9 w-full text-xs font-medium ps-5 focus:outline-none rounded placeholder:text-[11px] placeholder:text-zinc-500"
                  value={"https://echo.hoppscotch.io/graphql"}
                />
              </div>
            </div>

            {/* Connect */}
            <div className="w-[15%] flex lg:mt-0 mt-2 lg:h-full h-8 justify-between items-center">
              <button
                onClick={() => requested()}
                className="px-4 font-semibold text-center text-xs bg-btn hover:bg-btn-hover w-full h-full rounded-sm">
                Connect
              </button>
            </div>
          </div>
        </div>
        <div className="bg-search-bg-hover h-[46px] pe-3">
          <div className="w-full flex items-center lg:h-[50px] h-[40px] relative overflow-y-hidden">
            <div
              className="flex items-center h-[50px] overflow-x-auto mt-3"
              ref={tabContainerRef}>
              {history.map((h, index) => (
                <div
                  key={h.id}
                  onClick={() => setActiveTap(index + 1)}
                  className={`flex items-center justify-between px-5 space-x-4 w-48 h-full  text-center cursor-pointer ${
                    activeTab === index + 1
                      ? "bg-primary border-t-[3px] border-btn text-white"
                      : "text-zinc-400 hover:bg-search-bg"
                  } group`}>
                  <p className="font-semibold text-[12px]">{h.title}</p>

                  {history.length > 1 ? (
                    <Tippy
                      content={
                        <span className="text-[10px] font-semibold">Close</span>
                      }
                      placement="top"
                      theme="light">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeHistory(h.id, index + 1);
                        }}
                        className="sticky right-0 lg:invisible group-hover:visible">
                        <X size={14} />
                      </button>
                    </Tippy>
                  ) : (
                    <button></button>
                  )}
                </div>
              ))}
            </div>
            <Tippy
              content={<span className="text-[10px] font-semibold">Add</span>}
              placement="top"
              theme="light"
              delay={300}>
              <button onClick={addHistory} className="ms-4">
                <Plus size={17} />
              </button>
            </Tippy>
          </div>
        </div>
        <div className="flex justify-between overflow-scroll px-4 space-x-4 mt-3 scrollbar-hide pb-[8px]">
          <div className="flex space-x-7">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.name)}
                className={`lg:text-[13px] text-[12px] font-semibold hover:text-white ${
                  tap === t.name
                    ? "underline underline-offset-10 decoration-btn decoration-2 text-white"
                    : "text-zinc-500"
                }`}>
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Query Tab */}
        <div className="">
          {tap === "Query" && (
            <>
              <div>
                <div className="sticky z-10 flex items-center justify-between border-y border-zinc-800/80 bg-primary pl-4">
                  {/* Label */}
                  <label className="lg:text-xs text-[10px] text-zinc-500 font-semibold px-4">
                    Query
                  </label>

                  {/* Button group */}
                  <div className="flex">
                    {/* Request Button */}
                    <button
                      aria-label="button"
                      role="button"
                      className="inline-flex items-center justify-center font-semibold transition whitespace-nowrap rounded px-4 py-2 rounded-none text-[#6366f2]"
                      tabIndex="0">
                      <span className="inline-flex items-center justify-center whitespace-nowrap ">
                        <svg
                          viewBox="0 0 24 24"
                          width="1em"
                          height="1em"
                          className="svg-icons mr-2">
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m6 3l14 9l-14 9z"></path>
                        </svg>
                        <div className="truncate text-[13px] text-[13px]">
                          Request
                        </div>
                      </span>
                    </button>

                    {/* Save Button */}
                    <button
                      aria-label="button"
                      role="button"
                      className="inline-flex items-center justify-center font-semibold text-zinc-400 hover:text-white transition whitespace-nowrap rounded px-4 py-2 rounded-none"
                      tabIndex="0">
                      <span className="inline-flex items-center justify-center whitespace-nowrap ">
                        <svg
                          viewBox="0 0 24 24"
                          width="1em"
                          height="1em"
                          className="svg-icons mr-2">
                          <g
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2">
                            <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
                            <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7M7 3v4a1 1 0 0 0 1 1h7"></path>
                          </g>
                        </svg>
                        <div className="truncate text-[13px]">Save</div>
                      </span>
                    </button>

                    {/* Documentation Button */}
                    <button
                      aria-label="Documentation"
                      role="button"
                      className="inline-flex items-center justify-center font-semibold text-zinc-400 hover:text-white transition whitespace-nowrap rounded px-4 py-2 rounded-none"
                      tabIndex="0">
                      <span className="inline-flex items-center justify-center whitespace-nowrap">
                        <BookOpen size={16} className="mr-2" />
                        <div className="truncate text-[13px]">Docs</div>
                      </span>
                    </button>

                    {/* Help Link */}
                    <a
                      href=""
                      target="_blank"
                      role="button"
                      className="inline-flex items-center justify-center font-semibold transition whitespace-nowrap text-zinc-400 hover:text-white p-2"
                      tabIndex="0">
                      <span className="inline-flex items-center justify-center whitespace-nowrap ">
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
                      </span>
                    </a>

                    {/* Button Icons */}
                    <button
                      aria-label="button"
                      role="button"
                      className="icon-btn p-2 text-zinc-400 hover:text-white"
                      tabIndex="0">
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
                          <path d="M3 6h18M3 12h15a3 3 0 1 1 0 6h-4"></path>
                          <path d="m16 16l-2 2l2 2M3 18h7"></path>
                        </g>
                      </svg>
                    </button>

                    <button
                      aria-label="button"
                      role="button"
                      className="icon-btn p-2 text-zinc-400 hover:text-white"
                      tabIndex="0">
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
                          d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 5v6m4-6v6"
                        />
                      </svg>
                    </button>

                    <button
                      aria-label="button"
                      role="button"
                      className="icon-btn p-2 text-zinc-400 hover:text-white"
                      tabIndex="0">
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
                          d="M15 4V2m0 14v-2M8 9h2m10 0h2m-4.2 2.8L19 13m-4-4h.01m2.79-2.8L19 5M3 21l9-9m.2-5.8L11 5"
                        />
                      </svg>
                    </button>

                    <button
                      aria-label="button"
                      role="button"
                      className="icon-btn p-2 text-zinc-400 hover:text-white"
                      tabIndex="0">
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
                          <rect
                            width="14"
                            height="14"
                            x="8"
                            y="8"
                            rx="2"
                            ry="2"></rect>
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="min-h-[100%] overflow-y-auto">
                <CodeMirror
                  height="100%"
                  value={`query Request {
  method
  url
  headers {
    key
    value
  }
}`}
                  theme={myTheme}
                  extensions={extensions}
                />
              </div>
            </>
          )}

          {tap === "Variables" && (
            <>
              <div className="sticky z-10 flex items-center justify-between border-y border-zinc-800/80 bg-primary pl-4">
                {/* Label */}
                <label className="lg:text-xs text-[10px] text-zinc-500 font-semibold px-4">
                  Variables
                </label>

                {/* Button group */}
                <div className="flex">
                  <a
                    href=""
                    target="_blank"
                    role="button"
                    className="inline-flex items-center justify-center font-semibold transition whitespace-nowrap text-zinc-400 hover:text-white p-2"
                    tabIndex="0">
                    <span className="inline-flex items-center justify-center whitespace-nowrap ">
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
                    </span>
                  </a>

                  {/* Button Icons */}
                  <button
                    aria-label="button"
                    role="button"
                    className="icon-btn p-2 text-zinc-400 hover:text-white"
                    tabIndex="0">
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
                        <path d="M3 6h18M3 12h15a3 3 0 1 1 0 6h-4"></path>
                        <path d="m16 16l-2 2l2 2M3 18h7"></path>
                      </g>
                    </svg>
                  </button>

                  <button
                    aria-label="button"
                    role="button"
                    className="icon-btn p-2 text-zinc-400 hover:text-white"
                    tabIndex="0">
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
                        d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 5v6m4-6v6"
                      />
                    </svg>
                  </button>

                  <button
                    aria-label="button"
                    role="button"
                    className="icon-btn p-2 text-zinc-400 hover:text-white"
                    tabIndex="0">
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
                        d="M15 4V2m0 14v-2M8 9h2m10 0h2m-4.2 2.8L19 13m-4-4h.01m2.79-2.8L19 5M3 21l9-9m.2-5.8L11 5"
                      />
                    </svg>
                  </button>

                  <button
                    aria-label="button"
                    role="button"
                    className="icon-btn p-2 text-zinc-400 hover:text-white"
                    tabIndex="0">
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
                        <rect
                          width="14"
                          height="14"
                          x="8"
                          y="8"
                          rx="2"
                          ry="2"></rect>
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="min-h-[100%] overflow-y-auto">
                <CodeMirror
                  height="100%"
                  value={`{
  "id": "1"
}`}
                  theme={myTheme}
                  extensions={extensions}
                />
              </div>
            </>
          )}

          {tap === "Headers" && <QueryParameterComponent />}
        </div>
        <div className="hover:h-[10px] h-[3px] bg-zinc-800/60 cursor-row-resize hover:bg-btn-hover transition-colors"></div>
        <KeyboardShortcuts docUrl="https://docs.hoppscotch.io/documentation/features/graphql-api-testing" />
      </div>
      <div
        onMouseDown={startResizing}
        style={{ width: 4, cursor: "col-resize", background: "#27272a" }}
        className="hover:bg-btn-hover transition-colors"
      />
      <div style={{ width: `${100 - leftWidth}%` }}>
        <GraphQLRightPanel />
      </div>
    </div>
  );
}

export default GraphQLPanel;
