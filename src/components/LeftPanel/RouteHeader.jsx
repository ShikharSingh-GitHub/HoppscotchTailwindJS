import Tippy from "@tippyjs/react";
import { ChevronDown, Eye, Layers, Plus, Save, X } from "lucide-react";
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

          <div className="col-span-4 flex justify-end lg:space-x-5 space-x-4 items-center h-[46px]">
            <IconButton direction="top" name="Select environment">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-2 items-center">
                  <Layers size={15} />
                  <span className="text-[13px] font-semibold lg:flex hidden">
                    Select environment
                  </span>
                </div>
                <ChevronDown size={17} />
              </div>
            </IconButton>

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
                <div className="absolute top-10 left-0 bg-search-bg-hover w-full rounded p-2 border border-search-bg">
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
              theme="light"
              // delay={0}
            >
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
              theme="light"
              // delay={0}
            >
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
