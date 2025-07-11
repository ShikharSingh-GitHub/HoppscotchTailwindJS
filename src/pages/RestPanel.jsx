import { useRef, useState } from "react";
import RightPanel from "../components/RightPanel/RightPanel";
import RouteHeader from "../components/LeftPanel/RouteHeader";

function RestPanel() {
  const [leftWidth, setLeftWidth] = useState(75);
  const containerRef = useRef(null);
  const isResizing = useRef(false);

  const MIN_WIDTH = 64.9;
  const MAX_WIDTH = 75;

  const startResizing = () => {
    isResizing.current = true;
    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", stopResizing);
  };

  const handleResize = (e) => {
    if (!isResizing.current || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    let newLeftWidth = ((e.clientX - containerRect.left) / containerWidth) * 100;
    if (newLeftWidth < MIN_WIDTH) newLeftWidth = MIN_WIDTH;
    if (newLeftWidth > MAX_WIDTH) newLeftWidth = MAX_WIDTH;
    setLeftWidth(newLeftWidth);
  };

  const stopResizing = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleResize);
    document.removeEventListener("mouseup", stopResizing);
  };

  return (
    <div className="flex w-full h-full border-l border-gray-700/30" ref={containerRef}>
      <div style={{ width: `${leftWidth}%` }}>
        <RouteHeader />
      </div>
      <div
        onMouseDown={startResizing}
        style={{ width: 4, cursor: "col-resize", background: "#27272a" }}
      />
      <div style={{ width: `${100 - leftWidth}%` }}>
        <RightPanel />
      </div>
    </div>
  );
}

export default RestPanel;
