import Tippy from "@tippyjs/react";

const IconButton = ({ children, direction = "right", name, height }) => {
  return (
    <Tippy
      content={<span className="text-[10px] font-semibold">{name}</span>}
      placement={direction}
      theme="light"
    >
      <button className={`${height && height} text-gray-400 hover:text-white`}>
        {children}
      </button>
    </Tippy>
  );
};

export default IconButton;
