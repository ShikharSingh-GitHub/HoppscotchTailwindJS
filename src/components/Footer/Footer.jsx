import Tippy from "@tippyjs/react";
import {
  CircleHelp,
  Columns2,
  PanelLeftOpen,
  PanelRight,
  Share2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useState } from "react";
import IconButton from "../IconButton/IconButton";

const FeedBackModal = () => (
  <div className="">
    <div className="flex flex-col focus:outline-none w-full h-full  bg-[#1b1b1b]">
      <a
        aria-label="Link"
        href="https://docs.hoppscotch.io"
        target="_blank"
        rel="noopener"
        className="inline-flex items-center flex-shrink-0 px-2 py-2 rounded transition text-[#a3a3a3] hover:text-white flex-1">
        <span className="inline-flex items-center">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            className="opacity-75 svg-icons mr-4">
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"></path>
          </svg>
        </span>
        <div className="inline-flex items-start flex-1 truncate">
          <div className="truncate text-[12px]">Documentation</div>
        </div>
        {/* <div className="ml-4 inline-flex <sm:hidden font-medium">
          <kbd className="-mr-2 shortcut-key">D</kbd>
        </div> */}
      </a>

      <button
        aria-label="button"
        className="inline-flex items-center flex-shrink-0 px-2 py-2 rounded transition text-[#a3a3a3] hover:text-white flex-1">
        <span className="inline-flex items-center">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            className="opacity-75 svg-icons mr-4">
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
          </svg>
        </span>
        <div className="inline-flex items-start flex-1 truncate">
          <div className="truncate text-[12px]">Keyboard shortcuts</div>
        </div>
        {/* <div className="ml-4 inline-flex <sm:hidden font-medium">
          <kbd className="-mr-2 shortcut-key">S</kbd>
        </div> */}
      </button>

      <button
        aria-label="button"
        className="inline-flex items-center flex-shrink-0 px-2 py-2 rounded transition text-[#a3a3a3] hover:text-white flex-1">
        <span className="inline-flex items-center">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            className="opacity-75 svg-icons mr-4">
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
          </svg>
        </span>
        <div className="inline-flex items-start flex-1 truncate">
          <div className="truncate text-[12px]">Chat with us</div>
        </div>
      </button>

      <a
        href="https://docs.hoppscotch.io/documentation/changelog"
        target="_blank"
        rel="noopener"
        className="inline-flex items-center flex-shrink-0 px-2 py-2 rounded transition text-[#a3a3a3] hover:text-white flex-1">
        <span className="inline-flex items-center">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            className="opacity-75 svg-icons mr-4">
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2">
              <rect width="18" height="4" x="3" y="8" rx="1"></rect>
              <path d="M12 8v13m7-9v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7m2.5-4a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5a2.5 2.5 0 0 1 0 5"></path>
            </g>
          </svg>
        </span>
        <div className="inline-flex items-start flex-1 truncate">
          <div className="truncate text-[12px]">What's new?</div>
        </div>
      </a>

      <a
        href="https://status.hoppscotch.io"
        target="_blank"
        rel="noopener"
        className="inline-flex items-center flex-shrink-0 px-2 py-2 rounded transition text-[#a3a3a3] hover:text-white flex-1">
        <span className="inline-flex items-center">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            className="opacity-75 svg-icons mr-4">
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
          </svg>
        </span>
        <div className="inline-flex items-start flex-1 truncate">
          <div className="truncate text-[12px]">Status</div>
        </div>
      </a>
      <a
        href="https://github.com/hoppscotch/hoppscotch"
        target="_blank"
        rel="noopener"
        className="inline-flex items-center flex-shrink-0 px-2 py-2 rounded transition text-[#a3a3a3] hover:text-white flex-1">
        <span className="inline-flex items-center">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            className="opacity-75 svg-icons mr-4">
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5c.08-1.25-.27-2.48-1-3.5c.28-1.15.28-2.35 0-3.5c0 0-1 0-3 1.5c-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5c-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </g>
          </svg>
        </span>
        <div className="inline-flex items-start flex-1 truncate">
          <div className="truncate text-[12px]">GitHub</div>
        </div>
      </a>

      <a
        href="https://hoppscotch.io/twitter"
        target="_blank"
        rel="noopener"
        className="inline-flex items-center flex-shrink-0 px-2 py-2 rounded transition text-[#a3a3a3] hover:text-white flex-1">
        <span className="inline-flex items-center">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            className="opacity-75 svg-icons mr-4">
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6c2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4c-.9-4.2 4-6.6 7-3.8c1.1 0 3-1.2 3-1.2"></path>
          </svg>
        </span>
        <div className="inline-flex items-start flex-1 truncate">
          <div className="truncate text-[12px]">Twitter</div>
        </div>
      </a>

      <button
        aria-label="button"
        className="inline-flex items-center flex-shrink-0 px-2 py-2 rounded transition text-[#a3a3a3] hover:text-white flex-1">
        <span className="inline-flex items-center">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            className="opacity-75 svg-icons mr-4">
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M19 8v6m3-3h-6"></path>
            </g>
          </svg>
        </span>
        <div className="inline-flex items-start flex-1 truncate">
          <div className="truncate text-[12px]">Invite</div>
        </div>
      </button>

      <a
        href="https://docs.hoppscotch.io/support/privacy"
        target="_blank"
        rel="noopener"
        className="inline-flex items-center flex-shrink-0 px-2 py-2 rounded transition text-[#a3a3a3] hover:text-white flex-1">
        <span className="inline-flex items-center">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            className="opacity-75 svg-icons mr-4">
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </g>
          </svg>
        </span>
        <div className="inline-flex items-start flex-1 truncate">
          <div className="truncate text-[12px]">Terms and privacy</div>
        </div>
      </a>

      <div className="flex px-4 py-2 opacity-50 text-[12px]">
        Hoppscotch v2025.6.0
      </div>
    </div>
  </div>
);

const Footer = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center py-2 px-3 border-t border-zinc-800/80">
        <div className="flex items-center space-x-4">
          <IconButton name="Expand Sidebar" direction="top">
            <PanelRight size={17} />
          </IconButton>

          <IconButton name="Interceptor" direction="top">
            <ShieldCheck size={17} />
          </IconButton>
        </div>

        <div className="flex items-center space-x-4">
          <Tippy
            content={<FeedBackModal />}
            visible={showFeedbackModal}
            onClickOutside={() => setShowFeedbackModal(false)}
            placement="top"
            theme="popover"
            interactive={true}
            arrow={true}
            maxWidth={350}
            trigger="manual"
            className=" !bg-[#1b1b1b] rounded-xl border border-zinc-800 mb-[6px] w-[240px]">
            <button
              onClick={() => setShowFeedbackModal(!showFeedbackModal)}
              className="flex items-center space-x-2 text-gray-400 hover:text-white text-xs font-semibold me-10">
              <CircleHelp size={17} />
              <span>Help & feedback</span>
            </button>
          </Tippy>

          <Tippy
            content={
              <span className="text-[10px] font-semibold">
                Shorts
                <span className="bg-gray-400 rounded-[2px] mx-1 px-1">
                  ctrl
                </span>
                <span className="bg-gray-400 rounded-[2px] px-1">/</span>
              </span>
            }
            placement="top"
            theme="light">
            <button className="text-gray-400 hover:text-white">
              <Zap size={17} />
            </button>
          </Tippy>

          <IconButton name="Share" direction="top">
            <Share2 size={17} />
          </IconButton>

          <IconButton name="Horizontal Layout" direction="top">
            <Columns2 size={17} />
          </IconButton>

          <IconButton name="Collapse Sidebar" direction="top">
            <PanelLeftOpen size={17} />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default Footer;
