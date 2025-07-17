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
import useHistoryStore from "../../store/historyStore";
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

const RouteHeader = ({ onRequestComplete }) => {
  const [history, setHistory] = useState([
    {
      id: 1,
      method: "GET",
      title: "Untitled",
      url: "https://echo.hoppscotch.io",
    },
  ]);

  const [activeTab, setActiveTab] = useState(1);
  const containerRef = useRef(null);
  const [seeAllMethods, setSeeAllMethod] = useState(false);
  const [selectedEnvironment, setSelectedEnvironment] =
    useState("No environment");
  const [showEnvironmentModal, setShowEnvironmentModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Get store functions
  const { addHistoryEntry } = useHistoryStore();
  const { requested } = useRequestStore();

  // Ref to track request in progress state
  const isRequestInProgress = useRef(false);
  const requestTimeoutRef = useRef(null);

  // Fixed request handler
  const handleSendRequest = async (e) => {
    // Prevent any form submission if this is inside a form
    if (e) e.preventDefault();

    // Check if a request is already in progress
    if (isRequestInProgress.current) {
      console.log("Request already in progress - preventing duplicate");
      return;
    }

    // Set the flag to true to prevent additional requests
    isRequestInProgress.current = true;

    // Clear any existing timeout
    if (requestTimeoutRef.current) {
      clearTimeout(requestTimeoutRef.current);
    }

    try {
      // Clear any previous timeout to prevent race conditions
      if (requestTimeoutRef.current) {
        clearTimeout(requestTimeoutRef.current);
      }

      // Build request data from current tab
      const requestData = {
        method: history[activeTab - 1]?.method || "GET",
        url: history[activeTab - 1]?.url || "",
        headers: {}, // You might want to get this from your headers form
        body: null, // You might want to get this from your body form if POST/PUT/PATCH
      };

      console.log("Sending request:", requestData);

      // Make the actual request using your existing store function
      const startTime = Date.now();
      const response = await requested(); // Your existing request function
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      console.log("Request completed:", response);

      // Add to history
      await addHistoryEntry({
        method: requestData.method,
        url: requestData.url,
        headers: requestData.headers,
        body: requestData.body,
        responseStatus: response?.status || 200,
        responseBody:
          typeof response?.data === "string"
            ? response.data
            : JSON.stringify(response?.data || ""),
        responseHeaders: JSON.stringify(response?.headers || {}),
        responseTime: responseTime,
        requestType: "REST",
      });

      console.log("Added to history successfully");

      // Call the callback if provided
      if (onRequestComplete) {
        onRequestComplete(requestData, {
          status: response?.status || 200,
          data: response?.data || "",
          headers: response?.headers || {},
          responseTime: responseTime,
        });
      }
    } catch (error) {
      console.error("Request failed:", error);

      // Get current tab data for failed request
      const currentTab = history[activeTab - 1];
      if (currentTab) {
        const requestData = {
          method: currentTab.method || "GET",
          url: currentTab.url || "",
          headers: {},
          body: null,
        };

        // Still add failed requests to history
        try {
          await addHistoryEntry({
            method: requestData.method,
            url: requestData.url,
            headers: requestData.headers,
            body: requestData.body,
            responseStatus: 0,
            responseBody: JSON.stringify({ error: error.message }),
            responseHeaders: JSON.stringify({}),
            responseTime: 0,
            requestType: "REST",
          });
        } catch (historyError) {
          console.error("Failed to add error to history:", historyError);
        }
      }
    } finally {
      // Reset the flag when request is done
      requestTimeoutRef.current = setTimeout(() => {
        isRequestInProgress.current = false;
      }, 500); // Short delay to prevent rapid clicking
    }
  };

  // Helper functions
  const addHistory = () => {
    const newTab = {
      id: history.length + 1,
      method: "GET",
      title: "Untitled",
      url: "https://echo.hoppscotch.io",
    };
    setHistory([...history, newTab]);
    setActiveTab(newTab.id);
  };

  const removeHistory = (id, tabIndex) => {
    if (history.length === 1) return;

    const updatedHistory = history.filter((h) => h.id !== id);
    setHistory(updatedHistory);

    if (activeTab === tabIndex) {
      setActiveTab(Math.max(1, tabIndex - 1));
    } else if (activeTab > tabIndex) {
      setActiveTab(activeTab - 1);
    }
  };

  const updateMethod = (id, method) => {
    setHistory(history.map((h) => (h.id === id ? { ...h, method } : h)));
    setSeeAllMethod(false);
  };

  const updateURL = (id, url) => {
    setHistory(history.map((h) => (h.id === id ? { ...h, url } : h)));
  };

  const getMethodColor = (method) => {
    const colors = {
      GET: "text-green-500",
      POST: "text-orange-500",
      PUT: "text-blue-500",
      PATCH: "text-yellow-500",
      DELETE: "text-red-500",
      HEAD: "text-purple-500",
      OPTIONS: "text-pink-500",
      CONNECT: "text-cyan-500",
      TRACE: "text-indigo-500",
      CUSTOM: "text-gray-500",
    };
    return colors[method] || "text-gray-500";
  };

  const EnvironmentModal = () => (
    <div className="w-80 max-h-96 overflow-hidden">
      <div className="flex flex-col focus:outline-none w-full h-full bg-zinc-800 border border-zinc-700 rounded-md shadow-xl">
        {/* Header */}
        <div className="px-4 py-3 border-b border-zinc-700">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Environment</h3>
            <button
              onClick={() => setShowEnvironmentModal(false)}
              className="text-zinc-400 hover:text-white">
              <X size={14} />
            </button>
          </div>

          {/* Search */}
          <div className="mt-3 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={14} className="text-zinc-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-600 rounded text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-btn"
              placeholder="Search environments"
            />
          </div>
        </div>

        {/* Quick Select */}
        <div className="px-4 py-3 border-b border-zinc-700">
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
              <Check size={14} className="text-btn" />
            )}
          </button>
        </div>

        {/* Tabs */}
        <div className="border-t border-zinc-700">
          <div className="flex">
            <button className="flex-1 px-4 py-3 text-sm font-semibold text-white border-b-2 border-btn bg-zinc-900">
              My environments
            </button>
            <button className="flex-1 px-4 py-3 text-sm font-semibold text-zinc-400 hover:text-white">
              Team environments
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="text-center text-zinc-400 text-sm">
            No environments found
          </div>
        </div>
      </div>
    </div>
  );

  // Cleanup effect to prevent memory leaks
  useEffect(() => {
    return () => {
      if (requestTimeoutRef.current) {
        clearTimeout(requestTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* TABS SECTION */}
      <div className="bg-search-bg-hover h-[46px] pe-3">
        <div className="grid grid-cols-12">
          <div className="flex items-center h-[46px] relative lg:col-span-7 col-span-8">
            <div
              className="flex items-center h-full overflow-x-auto"
              ref={containerRef}>
              {history.map((h, index) => (
                <div
                  key={h.id}
                  onClick={() => setActiveTab(index + 1)}
                  className={`flex items-center justify-between px-4 space-x-3 w-44 h-full text-center cursor-pointer ${
                    activeTab === index + 1
                      ? "bg-primary border-t-[3px] border-btn text-white"
                      : "text-zinc-400 hover:bg-search-bg"
                  } group`}>
                  <p
                    className={`text-[10px] font-semibold ${getMethodColor(
                      h.method
                    )}`}>
                    {h.method}
                  </p>
                  <p className="font-semibold text-[11px] flex-1 truncate">
                    {h.title}
                  </p>

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
                        className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <X size={12} />
                      </button>
                    </Tippy>
                  ) : (
                    <div className="w-3"></div>
                  )}
                </div>
              ))}
            </div>

            <button onClick={addHistory} className="ms-3 p-1">
              <Plus size={14} />
            </button>
          </div>

          <div className="col-span-5 flex justify-end lg:space-x-2 space-x-1 items-center h-[46px] pr-2">
            {/* Environment Dropdown */}
            <Tippy
              content={<EnvironmentModal />}
              visible={showEnvironmentModal}
              onClickOutside={() => setShowEnvironmentModal(false)}
              placement="bottom"
              theme="popover"
              interactive={true}
              arrow={true}
              maxWidth={350}>
              <button
                onClick={() => setShowEnvironmentModal(!showEnvironmentModal)}
                className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-search-bg transition-colors">
                <div className="flex space-x-2 items-center">
                  <Layers size={13} className="text-zinc-400" />
                  <span className="text-[12px] font-semibold lg:flex hidden text-zinc-300">
                    {selectedEnvironment}
                  </span>
                </div>
                <ChevronDown
                  size={12}
                  className={`text-zinc-400 transition-transform ${
                    showEnvironmentModal ? "rotate-180" : ""
                  }`}
                />
              </button>
            </Tippy>

            <IconButton name="Environment Quick Peek" direction="top">
              <Eye size={13} />
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
                className="cursor-pointer flex h-9 items-center justify-between">
                <button
                  className={`lg:text-xs text-[10px] font-semibold ${getMethodColor(
                    history[activeTab - 1]?.method || "GET"
                  )}`}>
                  {history[activeTab - 1]?.method || "GET"}
                </button>
                <ChevronDown size={12} />
              </div>

              {/* All Methods */}
              {seeAllMethods && (
                <div className="absolute top-10 left-0 bg-search-bg-hover w-full rounded p-2 border border-search-bg z-10">
                  {methods.map((method) => (
                    <button
                      onClick={() => {
                        updateMethod(history[activeTab - 1]?.id, method);
                        setSeeAllMethod(false);
                      }}
                      key={method}
                      className={`flex text-[10px] mb-1 px-3 py-[5px] rounded font-semibold hover:bg-search-bg w-full ${getMethodColor(
                        method
                      )}`}>
                      {method}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="lg:col-span-6 col-span-5">
              <input
                type="text"
                className="lg:h-9 h-9 w-full text-xs font-medium ps-4 focus:outline-none rounded placeholder:text-[11px] placeholder:text-zinc-500"
                placeholder="Enter a URL or paste a cURL command"
                value={history[activeTab - 1]?.url || ""}
                onChange={(e) =>
                  updateURL(history[activeTab - 1]?.id, e.currentTarget.value)
                }
              />
            </div>
          </div>

          {/* Send Button - FIXED TO USE handleSendRequest */}
          <div className="lg:col-span-1 col-span-2 flex lg:mt-0 mt-2 lg:h-9 h-8 justify-between items-center">
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
                onClick={handleSendRequest}
                className="px-3 font-semibold text-center text-xs bg-btn hover:bg-btn-hover w-full h-full rounded-l">
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
                <ChevronDown size={14} />
              </button>
            </Tippy>
          </div>

          {/* Save */}
          <div className="col-span-1 flex lg:mt-0 mt-2 lg:h-9 h-8 items-center justify-between bg-search-bg-hover rounded">
            <Tippy
              content={
                <span className="text-[10px] font-semibold">
                  Save{" "}
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
                <Save size={14} />
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
                <ChevronDown size={14} />
              </button>
            </Tippy>
          </div>
        </div>
      </div>

      {/* Request Section */}
      <div className="py-3">
        <RequestSection />
      </div>
    </>
  );
};

export default RouteHeader;
