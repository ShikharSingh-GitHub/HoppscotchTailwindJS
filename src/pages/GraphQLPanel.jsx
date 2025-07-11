import { closeBrackets } from "@codemirror/autocomplete";
import { defaultKeymap } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { bracketMatching, foldGutter } from "@codemirror/language";
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import Tippy from "@tippyjs/react";
import { createTheme } from "@uiw/codemirror-themes";
import CodeMirror from "@uiw/react-codemirror";
import { graphql } from "cm6-graphql";
import {
  BookOpen,
  Check,
  ChevronDown,
  Circle,
  CornerDownLeft,
  ExternalLink,
  Eye,
  Layers,
  Plus,
  Save,
  Trash,
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
    e.preventDefault();
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

  // Add this missing state for tab management
  const [tap, setTab] = useState("Query");

  // Add state for Query and Variables content - Updated Variables content
  const [queryContent, setQueryContent] = useState(`query Request {
  method
  url
  headers {
    key
    value
  }
}`);

  const [variablesContent, setVariablesContent] = useState(`{
  "id": "1"
}`);

  // Enhanced theme for better GraphQL/JSON support - Updated colors to match original
  const myTheme = createTheme({
    theme: "dark",
    settings: {
      background: "#181818",
      backgroundImage: "",
      foreground: "#ffffff",
      caret: "#ffffff",
      selection: "#264f78",
      selectionMatch: "#264f78",
      lineHighlight: "#2a2a2a",
      gutterBackground: "#1e1e1e",
      gutterForeground: "#858585",
      gutterBorder: "#2a2a2a",
    },
    styles: [
      // GraphQL Keywords (query, mutation, subscription, fragment, etc.)
      { tag: "keyword", color: "#C586C0" }, // Purple for GraphQL keywords
      { tag: "name", color: "#9CDCFE" }, // Light blue for field names
      { tag: "typeName", color: "#4EC9B0" }, // Teal for type names
      { tag: "fieldName", color: "#9CDCFE" }, // Light blue for field names
      { tag: "argumentName", color: "#9CDCFE" }, // Light blue for argument names
      { tag: "variableName", color: "#4FC1FF" }, // Bright blue for variables
      { tag: "directiveName", color: "#DCDCAA" }, // Yellow for directives
      { tag: "string", color: "#CE9178" }, // Orange for strings
      { tag: "number", color: "#B5CEA8" }, // Light green for numbers
      { tag: "boolean", color: "#569CD6" }, // Blue for booleans
      { tag: "null", color: "#569CD6" }, // Blue for null
      { tag: "comment", color: "#6A9955" }, // Green for comments
      { tag: "propertyName", color: "#9CDCFE" }, // Light blue for JSON property names
      { tag: "operator", color: "#D4D4D4" }, // Light gray for operators
      { tag: "punctuation", color: "#D4D4D4" }, // Light gray for punctuation
      { tag: "bracket", color: "#FFD700" }, // Gold for brackets
      { tag: "brace", color: "#DA70D6" }, // Pink for braces
      { tag: "angleBracket", color: "#DA70D6" }, // Pink for angle brackets
      { tag: "definition", color: "#DCDCAA" }, // Yellow for definitions
      { tag: "quote", color: "#CE9178" }, // Orange for quotes
    ],
  });

  // GraphQL extensions - Updated with better syntax highlighting
  const graphqlExtensions = [
    graphql(),
    lineNumbers(),
    foldGutter(),
    bracketMatching(),
    closeBrackets(),
    highlightSelectionMatches(),
    keymap.of([...defaultKeymap, ...searchKeymap]),
    EditorView.theme({
      "&": {
        fontSize: "12px", // Slightly smaller font
      },
      ".cm-content": {
        padding: "12px", // Reduced padding
        minHeight: "250px", // Reduced height
      },
      ".cm-editor": {
        borderRadius: "0px",
      },
      ".cm-focused": {
        outline: "none",
      },
      ".cm-gutters": {
        backgroundColor: "#1e1e1e",
        borderRight: "1px solid #2a2a2a",
      },
      ".cm-lineNumbers": {
        color: "#858585",
        fontSize: "10px", // Smaller line numbers
      },
      ".cm-activeLine": {
        backgroundColor: "#2a2a2a",
      },
      ".cm-selectionBackground": {
        backgroundColor: "#264f78 !important",
      },
      // GraphQL specific styling
      ".cm-keyword": {
        color: "#C586C0 !important",
        fontWeight: "bold",
      },
      ".cm-string": {
        color: "#CE9178 !important",
      },
      ".cm-number": {
        color: "#B5CEA8 !important",
      },
      ".cm-variableName": {
        color: "#4FC1FF !important",
      },
      ".cm-comment": {
        color: "#6A9955 !important",
        fontStyle: "italic",
      },
    }),
  ];

  // JSON extensions for Variables - Updated with better syntax highlighting
  const jsonExtensions = [
    json(),
    lineNumbers(),
    foldGutter(),
    bracketMatching(),
    closeBrackets(),
    highlightSelectionMatches(),
    keymap.of([...defaultKeymap, ...searchKeymap]),
    EditorView.theme({
      "&": {
        fontSize: "12px", // Slightly smaller font
      },
      ".cm-content": {
        padding: "12px", // Reduced padding
        minHeight: "150px", // Reduced height
      },
      ".cm-editor": {
        borderRadius: "0px",
      },
      ".cm-focused": {
        outline: "none",
      },
      ".cm-gutters": {
        backgroundColor: "#1e1e1e",
        borderRight: "1px solid #2a2a2a",
      },
      ".cm-lineNumbers": {
        color: "#858585",
        fontSize: "10px", // Smaller line numbers
      },
      ".cm-activeLine": {
        backgroundColor: "#2a2a2a",
      },
      ".cm-selectionBackground": {
        backgroundColor: "#264f78 !important",
      },
      // JSON specific styling
      ".cm-property": {
        color: "#9CDCFE !important",
      },
      ".cm-string": {
        color: "#CE9178 !important",
      },
      ".cm-number": {
        color: "#B5CEA8 !important",
      },
      ".cm-keyword": {
        color: "#569CD6 !important",
      },
      ".cm-punctuation": {
        color: "#D4D4D4 !important",
      },
      ".cm-bracket": {
        color: "#FFD700 !important",
      },
    }),
  ];

  const [authType, setAuthType] = useState("Inherit");

  // Authorization types data
  const authTypes = [
    { id: 1, name: "Inherit", isSelected: true },
    { id: 2, name: "None", isSelected: false },
    { id: 3, name: "Basic Auth", isSelected: false },
    { id: 4, name: "Bearer", isSelected: false },
    { id: 5, name: "OAuth 2.0", isSelected: false },
    { id: 6, name: "API Key", isSelected: false },
    { id: 7, name: "AWS Signature", isSelected: false },
  ];

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
                  <label className="font-semibold text-zinc-500">Query</label>

                  {/* Button group - Exact match to original Hoppscotch */}
                  <div className="flex">
                    {/* Request Button (Play icon with accent color) */}
                    <button
                      aria-label="button"
                      role="button"
                      onClick={() => {
                        console.log("Executing GraphQL Query:", queryContent);
                        console.log("With Variables:", variablesContent);
                      }}
                      className="inline-flex items-center justify-center font-semibold transition whitespace-nowrap focus:outline-none text-zinc-400 hover:text-zinc-300 focus-visible:text-zinc-300 rounded px-4 py-2 rounded-none text-btn hover:text-btn-hover"
                      tabIndex="0">
                      <span className="inline-flex items-center justify-center whitespace-nowrap">
                        <svg
                          viewBox="0 0 24 24"
                          width="1.2em"
                          height="1.2em"
                          className="svg-icons mr-2">
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m6 3l14 9l-14 9z"></path>
                        </svg>
                        <div className="truncate max-w-[16rem]">Request</div>
                      </span>
                    </button>

                    {/* Save Button */}
                    <button
                      aria-label="button"
                      role="button"
                      onClick={() => {
                        const queryData = {
                          query: queryContent,
                          variables: variablesContent,
                          timestamp: new Date().toISOString(),
                        };
                        localStorage.setItem(
                          "graphql_query",
                          JSON.stringify(queryData)
                        );
                        console.log("Query saved:", queryData);
                      }}
                      className="inline-flex items-center justify-center font-semibold transition whitespace-nowrap focus:outline-none text-zinc-400 hover:text-zinc-300 focus-visible:text-zinc-300 rounded px-4 py-2 rounded-none"
                      tabIndex="0">
                      <span className="inline-flex items-center justify-center whitespace-nowrap">
                        <svg
                          viewBox="0 0 24 24"
                          width="1.2em"
                          height="1.2em"
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
                        <div className="truncate max-w-[16rem]">Save</div>
                      </span>
                    </button>

                    {/* Help Link */}
                    <a
                      aria-label="Link"
                      href="https://docs.hoppscotch.io/documentation/features/graphql-api-testing"
                      target="_blank"
                      rel="noopener"
                      role="button"
                      className="inline-flex items-center justify-center font-semibold transition whitespace-nowrap focus:outline-none text-zinc-400 hover:text-zinc-300 focus-visible:text-zinc-300 p-2"
                      tabIndex="0">
                      <span className="inline-flex items-center justify-center whitespace-nowrap">
                        <svg
                          viewBox="0 0 24 24"
                          width="1.2em"
                          height="1.2em"
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

                    {/* Clear All Button (Trash icon) */}
                    <button
                      aria-label="button"
                      role="button"
                      onClick={() => setQueryContent("")}
                      className="inline-flex items-center justify-center font-semibold transition whitespace-nowrap focus:outline-none text-zinc-400 hover:text-zinc-300 focus-visible:text-zinc-300 p-2"
                      tabIndex="0">
                      <span className="inline-flex items-center justify-center whitespace-nowrap">
                        <svg
                          viewBox="0 0 24 24"
                          width="1.2em"
                          height="1.2em"
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

                    {/* Share Button (with accent color) */}
                    <button
                      aria-label="button"
                      role="button"
                      onClick={() => {
                        const shareUrl = `${window.location.origin}${
                          window.location.pathname
                        }?query=${encodeURIComponent(queryContent)}`;
                        navigator.clipboard.writeText(shareUrl);
                        console.log("Share URL copied:", shareUrl);
                      }}
                      className="inline-flex items-center justify-center font-semibold transition whitespace-nowrap focus:outline-none text-zinc-400 hover:text-zinc-300 focus-visible:text-zinc-300 p-2"
                      tabIndex="0">
                      <span className="inline-flex items-center justify-center whitespace-nowrap">
                        <svg
                          viewBox="0 0 24 24"
                          width="1.2em"
                          height="1.2em"
                          className="svg-icons">
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 4V2m0 14v-2M8 9h2m10 0h2m-4.2 2.8L19 13m-4-4h.01m2.79-2.8L19 5M3 21l9-9m.2-5.8L11 5"></path>
                        </svg>
                        <div className="truncate max-w-[16rem]"></div>
                      </span>
                    </button>

                    {/* Prettify Button (with accent color) */}
                    <button
                      aria-label="button"
                      role="button"
                      onClick={() => {
                        try {
                          // Simple GraphQL query formatting
                          const formatted = queryContent
                            .replace(/\s+/g, " ")
                            .replace(/\{\s*/g, "{\n  ")
                            .replace(/\s*\}/g, "\n}")
                            .replace(/,\s*/g, ",\n  ");
                          setQueryContent(formatted);
                        } catch (error) {
                          console.error("Error formatting query:", error);
                        }
                      }}
                      className="inline-flex items-center justify-center font-semibold transition whitespace-nowrap focus:outline-none text-zinc-400 hover:text-zinc-300 focus-visible:text-zinc-300 p-2 text-btn"
                      tabIndex="0">
                      <span className="inline-flex items-center justify-center whitespace-nowrap">
                        <svg
                          viewBox="0 0 24 24"
                          width="1.2em"
                          height="1.2em"
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
                        <div className="truncate max-w-[16rem]"></div>
                      </span>
                    </button>

                    {/* Copy Button */}
                    <button
                      aria-label="button"
                      role="button"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(queryContent);
                          console.log("Query copied to clipboard");
                        } catch (error) {
                          console.error("Failed to copy:", error);
                        }
                      }}
                      className="inline-flex items-center justify-center font-semibold transition whitespace-nowrap focus:outline-none text-zinc-400 hover:text-zinc-300 focus-visible:text-zinc-300 p-2"
                      tabIndex="0">
                      <span className="inline-flex items-center justify-center whitespace-nowrap">
                        <svg
                          viewBox="0 0 24 24"
                          width="1.2em"
                          height="1.2em"
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
                        <div className="truncate max-w-[16rem]"></div>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="min-h-[100%] overflow-y-auto border-b border-zinc-800/80">
                <CodeMirror
                  value={queryContent}
                  onChange={(value) => setQueryContent(value)}
                  theme={myTheme}
                  extensions={graphqlExtensions}
                  placeholder="Enter your GraphQL query here..."
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

                {/* Button group - Fixed to match original Hoppscotch */}
                <div className="flex">
                  {/* Prettify Variables Button */}
                  <button
                    aria-label="Prettify Variables"
                    role="button"
                    onClick={() => {
                      try {
                        const parsed = JSON.parse(variablesContent);
                        const formatted = JSON.stringify(parsed, null, 2);
                        setVariablesContent(formatted);
                      } catch (error) {
                        console.error("Invalid JSON:", error);
                      }
                    }}
                    className="inline-flex items-center justify-center font-semibold text-zinc-400 hover:text-white transition whitespace-nowrap rounded px-4 py-2 rounded-none"
                    tabIndex="0">
                    <span className="inline-flex items-center justify-center whitespace-nowrap">
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
                          <path d="M3 6h18M3 12h15a3 3 0 1 1 0 6h-4"></path>
                          <path d="m16 16l-2 2l2 2M3 18h7"></path>
                        </g>
                      </svg>
                      <div className="truncate text-[13px]">Prettify</div>
                    </span>
                  </button>

                  {/* Copy Variables Button */}
                  <button
                    aria-label="Copy Variables"
                    role="button"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(variablesContent);
                        console.log("Variables copied to clipboard");
                      } catch (error) {
                        console.error("Failed to copy:", error);
                      }
                    }}
                    className="inline-flex items-center justify-center font-semibold text-zinc-400 hover:text-white transition whitespace-nowrap rounded px-4 py-2 rounded-none"
                    tabIndex="0">
                    <span className="inline-flex items-center justify-center whitespace-nowrap">
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
                      <div className="truncate text-[13px]">Copy</div>
                    </span>
                  </button>

                  {/* Clear Variables Button */}
                  <button
                    aria-label="Clear Variables"
                    role="button"
                    onClick={() => setVariablesContent("{}")}
                    className="inline-flex items-center justify-center font-semibold text-zinc-400 hover:text-white transition whitespace-nowrap rounded px-4 py-2 rounded-none"
                    tabIndex="0">
                    <span className="inline-flex items-center justify-center whitespace-nowrap">
                      <Trash size={16} className="mr-2" />
                      <div className="truncate text-[13px]">Clear</div>
                    </span>
                  </button>

                  {/* Help Link */}
                  <a
                    href="https://docs.hoppscotch.io/documentation/features/graphql-api-testing"
                    target="_blank"
                    rel="noopener noreferrer"
                    role="button"
                    className="inline-flex items-center justify-center font-semibold transition whitespace-nowrap text-zinc-400 hover:text-white p-2"
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
                    </span>
                  </a>
                </div>
              </div>
              <div className="min-h-[100%] overflow-y-auto border-b border-zinc-800/80">
                <CodeMirror
                  value={variablesContent}
                  onChange={(value) => setVariablesContent(value)}
                  theme={myTheme}
                  extensions={jsonExtensions}
                  placeholder="Enter your GraphQL variables as JSON..."
                />
              </div>
            </>
          )}

          {tap === "Headers" && <QueryParameterComponent />}

          {tap === "Authorization" && (
            <>
              <div className="sticky z-10 flex items-center justify-between border-y border-zinc-800/80 bg-primary pl-4">
                <span className="flex items-center">
                  <label className="lg:text-xs text-[10px] text-zinc-500 font-semibold px-4 truncate">
                    Authorization Type
                  </label>

                  {/* Authorization Type Dropdown */}
                  <div className="relative ml-2">
                    <Tippy
                      content={
                        <div className="flex flex-col focus:outline-none bg-zinc-800 border border-zinc-700 rounded-md shadow-xl py-1 min-w-[200px]">
                          {authTypes.map((type) => (
                            <button
                              key={type.id}
                              onClick={() => setAuthType(type.name)}
                              role="menuitem"
                              className="inline-flex items-center flex-shrink-0 px-4 py-2 transition hover:bg-zinc-700 focus:outline-none focus-visible:bg-zinc-700 flex-1 text-left rounded-none">
                              <span className="inline-flex items-center">
                                {type.name === authType ? (
                                  <div className="w-5 h-5 mr-4 text-btn">
                                    <svg
                                      viewBox="0 0 24 24"
                                      width="1.2em"
                                      height="1.2em"
                                      className="opacity-75">
                                      <g
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <circle cx="12" cy="12" r="1"></circle>
                                      </g>
                                    </svg>
                                  </div>
                                ) : (
                                  <Circle
                                    size={20}
                                    className="opacity-75 mr-4 text-zinc-500"
                                  />
                                )}
                              </span>
                              <div className="inline-flex items-start flex-1 truncate">
                                <div className="font-semibold truncate max-w-[16rem] text-zinc-300 text-sm hover:text-white">
                                  {type.name}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      }
                      interactive={true}
                      trigger="click"
                      placement="bottom-start"
                      animation="scale-subtle"
                      appendTo={() => document.body}>
                      <button
                        className="inline-flex items-center justify-center font-semibold transition whitespace-nowrap focus:outline-none text-zinc-400 hover:text-white rounded px-4 py-2 rounded-none pr-8 relative"
                        tabIndex="0">
                        <span className="inline-flex items-center justify-center whitespace-nowrap">
                          <div className="truncate max-w-[8rem] text-xs">
                            {authType}
                          </div>
                        </span>
                        <ChevronDown
                          size={14}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-zinc-500 pointer-events-none"
                        />
                      </button>
                    </Tippy>
                  </div>
                </span>

                <div className="flex items-center">
                  {/* Enabled Checkbox */}
                  <div className="flex items-center cursor-pointer mr-4">
                    <input
                      id="auth-enabled"
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-btn bg-transparent border-zinc-600 rounded focus:ring-btn focus:ring-2"
                    />
                    <label
                      htmlFor="auth-enabled"
                      className="ml-2 text-xs font-semibold text-zinc-300 cursor-pointer">
                      Enabled
                    </label>
                  </div>

                  {/* Help Link */}
                  <a
                    href="https://docs.hoppscotch.io/documentation/features/authorization"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center font-semibold transition whitespace-nowrap focus:outline-none text-zinc-400 hover:text-white p-2"
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
                    </span>
                  </a>

                  {/* Clear Button */}
                  <button
                    aria-label="Clear"
                    role="button"
                    className="inline-flex items-center justify-center font-semibold transition whitespace-nowrap focus:outline-none text-zinc-400 hover:text-white p-2"
                    tabIndex="0">
                    <span className="inline-flex items-center justify-center whitespace-nowrap">
                      <Trash size={16} />
                    </span>
                  </button>
                </div>
              </div>

              {/* Authorization Content */}
              <div className="flex flex-1 border-b border-zinc-800/80">
                {/* Left Content Area */}
                <div className="w-2/3 border-r border-zinc-800/80">
                  <div className="p-4">
                    {authType === "Inherit" ? (
                      <span className="text-zinc-400 text-sm">
                        Please save this request in any collection to inherit
                        the authorization
                      </span>
                    ) : authType === "None" ? (
                      <span className="text-zinc-400 text-sm">
                        No authorization will be sent with this request
                      </span>
                    ) : authType === "Basic Auth" ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-zinc-500 mb-2">
                            Username
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 bg-transparent border border-zinc-600 rounded text-sm text-zinc-300 focus:outline-none focus:border-btn"
                            placeholder="Enter username"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-zinc-500 mb-2">
                            Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 bg-transparent border border-zinc-600 rounded text-sm text-zinc-300 focus:outline-none focus:border-btn"
                            placeholder="Enter password"
                          />
                        </div>
                      </div>
                    ) : authType === "Bearer" ? (
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-2">
                          Token
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-transparent border border-zinc-600 rounded text-sm text-zinc-300 focus:outline-none focus:border-btn"
                          placeholder="Enter bearer token"
                        />
                      </div>
                    ) : authType === "API Key" ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-zinc-500 mb-2">
                            Key
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 bg-transparent border border-zinc-600 rounded text-sm text-zinc-300 focus:outline-none focus:border-btn"
                            placeholder="Enter API key name"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-zinc-500 mb-2">
                            Value
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 bg-transparent border border-zinc-600 rounded text-sm text-zinc-300 focus:outline-none focus:border-btn"
                            placeholder="Enter API key value"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-zinc-500 mb-2">
                            Add to
                          </label>
                          <select className="w-full px-3 py-2 bg-transparent border border-zinc-600 rounded text-sm text-zinc-300 focus:outline-none focus:border-btn">
                            <option value="header" className="bg-primary">
                              Header
                            </option>
                            <option value="query" className="bg-primary">
                              Query params
                            </option>
                          </select>
                        </div>
                      </div>
                    ) : (
                      <span className="text-zinc-400 text-sm">
                        {authType} configuration will be available here
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Help Panel */}
                <div className="w-1/3 min-w-[12rem] flex-shrink-0 bg-primary p-4">
                  <div className="pb-2 text-zinc-500 text-xs">
                    The authorization header will be automatically generated
                    when you send the request.
                  </div>

                  <a
                    href="https://docs.hoppscotch.io/documentation/features/authorization"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center focus:outline-none hover:text-zinc-300 focus-visible:text-zinc-300 flex-row-reverse text-btn hover:text-btn-hover text-xs font-medium mt-3"
                    tabIndex="0">
                    <ExternalLink size={14} className="ml-2" />
                    Learn how
                  </a>
                </div>
              </div>
            </>
          )}
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
