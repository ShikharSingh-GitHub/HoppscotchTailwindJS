import Tippy from "@tippyjs/react";
import {
  Check,
  ChevronDown,
  Eye,
  Layers,
  Plus,
  Save,
  Search,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useRequestStore from "../../store/store";
import IconButton from "../IconButton/IconButton";
import RequestSection from "./RequestSection";

const methods = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
  "CONNECT",
  "TRACE",
  "CUSTOM",
];

const RouteHeader = () => {
  const [history, setHistory] = useState([
    {
      id: 1,
      method: "GET",
      title: "Untitled",
      url: "https://echo.hoppscotch.io",
    },
  ]);

  const [activeTab, setActiveTap] = useState(1);
  const containerRef = useRef(null);
  const [seeAllMethods, setSeeAllMethod] = useState(false);
  const [showEnvironmentModal, setShowEnvironmentModal] = useState(false);
  const [selectedEnvironment, setSelectedEnvironment] =
    useState("Select Environment");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeEnvTab, setActiveEnvTab] = useState("personal");

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollWidth,
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

  // Update Method
  const updateMethod = (id, newMethod) => {
    setHistory((prevHistory) =>
      prevHistory.map((item) =>
        item.id === id ? { ...item, method: newMethod } : item
      )
    );
  };

  // Update Route URL
  const updateURL = (id, url) => {
    setHistory((prevHistory) =>
      prevHistory.map((item) => (item.id === id ? { ...item, url: url } : item))
    );
  };

  // Get Method color
  const getMethodColor = (name) => {
    switch (name) {
      case "GET":
        return "text-green-500";
      case "POST":
        return "text-amber-500";
      case "PUT":
        return "text-sky-500";
      case "DELETE":
        return "text-rose-500";
      case "HEAD":
        return "text-teal-500";
      case "PATCH":
        return "text-purple-500";
      case "OPTIONS":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  // Environment Modal Component
  const EnvironmentModal = () => (
    <div className="w-80 bg-primary border border-zinc-700 rounded-lg shadow-lg">
      {/* Search Input */}
      <div className="p-3 border-b border-zinc-700">
        <div className="relative border border-zinc-600 rounded">
          <div className="flex items-center px-3 py-2">
            <Search size={14} className="text-zinc-500 mr-2" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-white placeholder-zinc-500 outline-none flex-1"
            />
          </div>
        </div>
      </div>

      {/* No Environment Option */}
      <div className="p-2">
        <button
          onClick={() => {
            setSelectedEnvironment("No environment");
            setShowEnvironmentModal(false);
          }}
          className="w-full flex items-center justify-between px-4 py-3 rounded hover:bg-search-bg-hover transition-colors">
          <div className="flex items-center">
            <span className="text-sm font-semibold text-white">
              No environment
            </span>
          </div>
          {selectedEnvironment === "No environment" && (
            <Check size={16} className="text-btn" />
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="border-t border-zinc-700">
        <div className="flex border-b border-zinc-700">
          <button
            onClick={() => setActiveEnvTab("personal")}
            className={`flex-1 px-4 py-3 text-xs font-semibold ${
              activeEnvTab === "personal"
                ? "text-white border-b-2 border-btn bg-search-bg-hover"
                : "text-zinc-400 hover:text-white hover:bg-search-bg-hover"
            }`}>
            Personal Environments
          </button>
          <button
            onClick={() => setActiveEnvTab("workspace")}
            className={`flex-1 px-4 py-3 text-xs font-semibold opacity-75 cursor-not-allowed ${
              activeEnvTab === "workspace"
                ? "text-white border-b-2 border-btn bg-search-bg-hover"
                : "text-zinc-400"
            }`}
            disabled>
            Workspace Environments
          </button>
        </div>

        {/* Environment Content */}
        <div className="p-4">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 mb-4 flex items-center justify-center">
              <svg
                width="64"
                height="64"
                viewBox="0 0 512 512"
                className="text-zinc-600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M256 32L64 160L256 288L448 160L256 32Z"
                  fill="currentColor"
                  opacity="0.8"
                />
                <path
                  d="M64 160V352L256 480L448 352V160"
                  stroke="currentColor"
                  strokeWidth="32"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  opacity="0.6"
                />
                <path
                  d="M256 288V480"
                  stroke="currentColor"
                  strokeWidth="32"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                <path
                  d="M160 128L256 80L352 128"
                  stroke="currentColor"
                  strokeWidth="24"
                  strokeLinecap="round"
                  opacity="0.4"
                />
                <path
                  d="M64 160L256 288L448 160"
                  stroke="currentColor"
                  strokeWidth="24"
                  strokeLinecap="round"
                  opacity="0.5"
                />
                <circle
                  cx="256"
                  cy="160"
                  r="8"
                  fill="currentColor"
                  opacity="0.8"
                />
                <circle
                  cx="256"
                  cy="288"
                  r="6"
                  fill="currentColor"
                  opacity="0.6"
                />
                <circle
                  cx="160"
                  cy="128"
                  r="4"
                  fill="currentColor"
                  opacity="0.4"
                />
                <circle
                  cx="352"
                  cy="128"
                  r="4"
                  fill="currentColor"
                  opacity="0.4"
                />
              </svg>
            </div>
            <span className="text-xs text-zinc-500 text-center max-w-sm">
              Environments are empty
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* HEADERS and TAPS SECTION */}
      <div className="bg-search-bg-hover h-[46px] pe-3">
        <div className="grid grid-cols-12">
          <div className="flex items-center h-[46px] relative lg:col-span-7 col-span-8">
            <div
              className="flex items-center h-full overflow-x-auto"
              ref={containerRef}>
              {history.map((h, index) => (
                <div
                  key={h.id}
                  onClick={() => setActiveTap(index + 1)}
                  className={`flex items-center justify-between px-5 space-x-4 w-48 h-full  text-center cursor-pointer ${
                    activeTab === index + 1
                      ? "bg-primary border-t-[3px] border-btn text-white"
                      : "text-zinc-400 hover:bg-search-bg"
                  } group`}>
                  <p
                    className={`text-[11px] font-semibold ${getMethodColor(
                      h.method
                    )}`}>
                    {h.method}
                  </p>
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

            <button onClick={addHistory} className="ms-4">
              <Plus size={17} />
            </button>
          </div>

          <div className="col-span-5 flex justify-end lg:space-x-3 space-x-2 items-center h-[46px] pr-2">
            {/* Environment Dropdown */}
            <Tippy
              content={<EnvironmentModal />}
              visible={showEnvironmentModal}
              onClickOutside={() => setShowEnvironmentModal(false)}
              placement="bottom"
              theme="popover"
              interactive={true}
              arrow={true}
              maxWidth={350}
              trigger="manual">
              <button
                onClick={() => setShowEnvironmentModal(!showEnvironmentModal)}
                className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-search-bg transition-colors">
                <div className="flex space-x-2 items-center">
                  <Layers size={15} className="text-zinc-400" />
                  <span className="text-[13px] font-semibold lg:flex hidden text-zinc-300">
                    {selectedEnvironment}
                  </span>
                </div>
                <ChevronDown
                  size={15}
                  className={`text-zinc-400 transition-transform ${
                    showEnvironmentModal ? "rotate-180" : ""
                  }`}
                />
              </button>
            </Tippy>

            <IconButton name="Environment Quick Peek" direction="top">
              <Eye size={15} />
            </IconButton>
          </div>
        </div>
      </div>

      {/* METHODS and URL SECTION */}
      <div className="lg:px-4 px-2 py-3">
        <div className="grid lg:grid-cols-9 grid-cols-2 h-9 gap-x-2">
          <div className="lg:col-span-7 col-span-3 grid grid-cols-7 bg-search-bg-hover rounded">
            {/* Methods */}
            <div className="relative lg:col-span-1 col-span-2 lg:ps-4 ps-2">
              <div
                onClick={() => setSeeAllMethod(!seeAllMethods)}
                className="cursor-pointer flex h-8 items-center justify-between">
                <button
                  className={`lg:text-xs text-[10px] font-semibold ${getMethodColor(
                    history[activeTab - 1].method
                  )}`}>
                  {history[activeTab - 1].method}
                </button>
                <ChevronDown size={15} />
              </div>

              {/* All Methods */}
              {seeAllMethods && (
                <div className="absolute top-10 left-0 bg-search-bg-hover w-full rounded p-2 border border-search-bg z-10">
                  {methods.map((methods) => (
                    <button
                      onClick={() => {
                        updateMethod(history[activeTab - 1].id, methods);
                        setSeeAllMethod(false);
                      }}
                      key={methods}
                      className={`flex text-[11px] mb-1 px-4 py-[6px] rounded font-semibold hover:bg-search-bg w-full ${getMethodColor(
                        methods
                      )}`}>
                      {methods}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="lg:col-span-6 col-span-5">
              <input
                type="text"
                className="lg:h-full h-9 w-full text-xs font-medium ps-5 focus:outline-none rounded placeholder:text-[11px] placeholder:text-zinc-500"
                placeholder="Enter a uURL or paste a cURL command"
                value={history[activeTab - 1].url}
                onChange={(e) =>
                  updateURL(history[activeTab - 1].id, e.currentTarget.value)
                }
              />
            </div>
          </div>

          {/* Send */}
          <div className="lg:col-span-1 col-span-2 flex lg:mt-0 mt-2 lg:h-full h-8 justify-between items-center">
            <Tippy
              content={
                <span className="text-[10px] font-semibold">
                  Send{" "}
                  <span className="bg-zinc-500 text-gray-300 px-1 rounded py[2px]">
                    ctrl
                  </span>
                </span>
              }
              placement="top"
              theme="light"
              delay={300}>
              <button
                onClick={() => requested()}
                className="px-4 font-semibold text-center text-xs bg-btn hover:bg-btn-hover w-full h-full rounded-l">
                Send
              </button>
            </Tippy>

            <Tippy
              content={
                <span className="text-[10px] font-semibold">Options</span>
              }
              placement="top"
              theme="light">
              <button className="bg-btn hover:bg-btn-hover px-2 h-full rounded-r">
                <ChevronDown size={17} />
              </button>
            </Tippy>
          </div>
          {/* Save */}
          <div className="col-span-1 flex lg:mt-0 mt-2 lg:h-full h-8 items-center justify-between bg-search-bg-hover rounded">
            <Tippy
              content={
                <span className="text-[10px] font-semibold">
                  Send{" "}
                  <span className="bg-zinc-500 text-gray-300 px-1 rounded py[2px]">
                    ctrl
                  </span>{" "}
                  <span className="bg-zinc-500 text-gray-300 px-1 rounded py[2px]">
                    s
                  </span>
                </span>
              }
              placement="top"
              theme="light"
              delay={300}>
              <button className="flex h-full items-center justify-between px-3 rounded-l text-xs font-semibold text-zinc-400 hover:text-white hover:bg-search-bg">
                <Save size={17} />
                <span className="mx-1"></span>
                Save
              </button>
            </Tippy>

            <Tippy
              content={
                <span className="text-[10px] font-semibold">Options</span>
              }
              placement="top"
              theme="light">
              <button className="flex justify-center items-center text-zinc-400 hover:text-white hover:bg-search-bg rounded-r h-full w-full">
                <ChevronDown size={17} />
              </button>
            </Tippy>
          </div>
        </div>
      </div>

      {/* REQUEST SECTION */}
      <div className="py-3">
        <RequestSection />
      </div>
    </>
  );
};

export default RouteHeader;
