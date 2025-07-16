// ...existing imports...

const RouteHeader = () => {
  // ...existing state...

  return (
    <div className="p-4">
      <div className="flex h-9 gap-x-2">
        <div className="w-[15%] grid bg-search-bg-hover rounded-sm">
          <Tippy
            content={
              <div className="flex flex-col focus:outline-none w-full h-full bg-zinc-800 border border-zinc-700 rounded-md shadow-xl py-1">
                {methods.map((method) => (
                  <button
                    key={method}
                    onClick={() => {
                      setSelectedMethod(method);
                      setIsMethodOpen(false);
                    }}
                    role="menuitem"
                    className="inline-flex items-center flex-shrink-0 px-4 py-2 transition hover:bg-zinc-700 focus:outline-none focus-visible:bg-zinc-700 flex-1 text-left rounded-none">
                    <div className="inline-flex items-start flex-1 truncate">
                      <div className="font-semibold truncate text-zinc-300 text-xs hover:text-white">
                        {method}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            }
            visible={isMethodOpen}
            onClickOutside={() => setIsMethodOpen(false)}
            placement="bottom-start"
            interactive={true}
            // Remove trigger prop when using visible (controlled mode)
            animation="scale-subtle"
            appendTo={() => document.body}>
            <button
              onClick={() => setIsMethodOpen(!isMethodOpen)}
              className="h-full w-full ps-5 pe-3 focus:outline-none font-semibold text-zinc-300 hover:text-white text-xs bg-search-bg-hover rounded-sm flex items-center justify-between">
              <span>{selectedMethod}</span>
              <ChevronDown
                size={12}
                className={`transition-transform ${
                  isMethodOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </Tippy>
        </div>

        {/* Rest of your component... */}
      </div>
    </div>
  );
};

export default RouteHeader;
