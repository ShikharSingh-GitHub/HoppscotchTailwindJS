import { useRef, useState } from "react";
import Response from "../components/LeftPanel/Response";
import RouteHeader from "../components/LeftPanel/RouteHeader";
import RightPanel from "../components/RightPanel/RightPanel";

function RestPanel() {
  const [leftWidth, setLeftWidth] = useState(75);
  const [topHeight, setTopHeight] = useState(60); // Add vertical drag state
  const containerRef = useRef(null);
  const verticalContainerRef = useRef(null); // Add ref for vertical container
  const isResizing = useRef(false);
  const isVerticalResizing = useRef(false); // Add vertical resizing state

  const MIN_WIDTH = 64.9;
  const MAX_WIDTH = 75;
  const MIN_HEIGHT = 30; // Minimum height for top section
  const MAX_HEIGHT = 80; // Maximum height for top section

  // Horizontal resizing functions
  const startResizing = () => {
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

  // Vertical resizing functions
  const startVerticalResizing = () => {
    isVerticalResizing.current = true;
    document.addEventListener("mousemove", handleVerticalResize);
    document.addEventListener("mouseup", stopVerticalResizing);
  };

  const handleVerticalResize = (e) => {
    if (!isVerticalResizing.current || !verticalContainerRef.current) return;
    const containerRect = verticalContainerRef.current.getBoundingClientRect();
    const containerHeight = containerRect.height;
    let newTopHeight =
      ((e.clientY - containerRect.top) / containerHeight) * 100;
    if (newTopHeight < MIN_HEIGHT) newTopHeight = MIN_HEIGHT;
    if (newTopHeight > MAX_HEIGHT) newTopHeight = MAX_HEIGHT;
    setTopHeight(newTopHeight);
  };

  const stopVerticalResizing = () => {
    isVerticalResizing.current = false;
    document.removeEventListener("mousemove", handleVerticalResize);
    document.removeEventListener("mouseup", stopVerticalResizing);
  };

  return (
    <div
      className="flex w-full h-full border-l border-gray-700/30"
      ref={containerRef}>
      {/* Left Panel with Vertical Split */}
      <div
        style={{ width: `${leftWidth}%` }}
        className="flex flex-col"
        ref={verticalContainerRef}>
        {/* Top Section - RouteHeader */}
        <div style={{ height: `${topHeight}%` }} className="overflow-hidden">
          <RouteHeader />
        </div>

        {/* Vertical Drag Handle */}
        <div
          onMouseDown={startVerticalResizing}
          className="hover:h-[10px] h-[3px] bg-zinc-800/60 cursor-row-resize hover:bg-btn-hover transition-colors flex-shrink-0"
        />

        {/* Bottom Section - Response */}
        <div
          style={{ height: `${100 - topHeight}%` }}
          className="overflow-hidden">
          <div className="h-full p-4">
            <Response />
          </div>
        </div>
      </div>

      {/* Horizontal Drag Handle */}
      <div
        onMouseDown={startResizing}
        style={{ width: 4, cursor: "col-resize", background: "#27272a" }}
        className="hover:bg-btn-hover transition-colors"
      />

      {/* Right Panel */}
      <div style={{ width: `${100 - leftWidth}%` }}>
        <RightPanel />
      </div>
    </div>
  );
}

export default RestPanel;
