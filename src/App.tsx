import { CgMenuGridO } from "react-icons/cg";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FiSmartphone } from "react-icons/fi";
import { TbTriangleSquareCircle } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { FaDiscord } from "react-icons/fa";
import { IoLogoWhatsapp, IoIosMore } from "react-icons/io";
import { FaSquareGithub } from "react-icons/fa6";
import { SiGooglemeet, SiLeetcode, SiFlipkart } from "react-icons/si";
import { FaSnapchatGhost } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MutableRefObject, useReducer, useRef, useState } from "react";
import { useFetch, useInfiniteScroll, useLazyLoading } from "./custom-hooks";
import { Link } from "react-router-dom";

interface StateType {
  page: number;
  // Add other properties if needed
}

interface ImgState {
  images: { author: string; download_url: string }[];
  fetching: boolean;
}
type ImgAction =
  | { type: "STACK_IMAGES"; images: { author: string; download_url: string }[] }
  | { type: "FETCHING_IMAGES"; fetching: boolean };

// type ActionType = ImgState;
function App() {
  const imgReducer = (state: ImgState, action: ImgAction): ImgState => {
    switch (action.type) {
      case "STACK_IMAGES":
        return { ...state, images: state.images.concat(action.images) };
      case "FETCHING_IMAGES":
        return { ...state, fetching: action.fetching };
      default:
        return state;
    }
  };

  const pageReducer = (state: StateType, action: { type: string }) => {
    switch (action.type) {
      case "ADVANCE_PAGE":
        return { ...state, page: state.page + 1 };
      default:
        return state;
    }
  };

  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 });
  const [imgData, imgDispatch] = useReducer(imgReducer, {
    images: [],
    fetching: true,
  });

  const bottomBoundaryRef: MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  useFetch(pager, imgDispatch);
  useLazyLoading(".card-img-top", imgData.images);
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  const [showNavMenu, setShowNavMenu] = useState(false);

  return (
    <div className="bg-[url('../public/bg.png')] bg-hero min-h-screen bg-hero bg-no-repeat bg-cover bg-center bg-fixed">
      {/* TOP Header */}
      <div className="relative flex md:block">
        <div className="text-white p-5 flex flex-row gap-10 justify-between items-center">
          <div className="flex flex-row gap-10">
            <div className="content-center">
              <CgMenuGridO size={20} />
            </div>
            <div className="flex flex-row content-center justify-center items-center gap-1">
              <img src="./logo.png" className="w-4 h-4" />
              <span className="text-white font-bold flex-none">
                Microsoft Start
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search the web"
                required
              />
              {/* <button
            type="submit"
            className="text-white absolute end-2 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-0.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button> */}
            </div>
          </div>

          <div className="flex-row items-center gap-10 hidden md:flex">
            <div className="flex">
              <div className="flex flex-row gap-2">
                <span className="font-bold">Vasai</span>
                <TiWeatherPartlySunny size={20} />
              </div>
              <span className="flex-none font-bold">34&deg; C</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <span>
                <FiSmartphone size={20} />
              </span>
              <span>
                <TbTriangleSquareCircle size={20} />
              </span>
              <div>
                <button
                  type="button"
                  className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-transparent dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 16"
                  >
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                  <span className="sr-only">Notifications</span>
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                    20
                  </div>
                </button>
              </div>
              <span>
                <IoSettingsOutline size={20} />
              </span>
            </div>
          </div>
        </div>
        <nav className="dark:bg-gray-800 dark:border-white md:hidden flex mr-2 transition-all duration-1000">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between">
            {/* <a
                href="#"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8"
                  alt="Flowbite Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Flowbite
                </span>
              </a> */}
            <button
              onClick={() => setShowNavMenu((prev) => !prev)}
              data-dropdown-toggle="navbar-hamburger"
              type="button"
              className="inline-flex items-center justify-center w-6 h-7 text-sm text-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 hover:text-gray-500"
              aria-controls="navbar-hamburger"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              className={`${
                showNavMenu ? "" : "hidden"
              } z-50 block my-6 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 absolute right-2 top-7 transition-transform`}
              id="navbar-hamburger"
            >
              <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 w-36 divide-y divide-gray-800 shadow dark:divide-gray-600 divide-y-reverse">
                <li>
                  <a
                    href="#"
                    className="block p-3 text-white bg-blue-700 rounded dark:bg-blue-600"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block p-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block p-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block p-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      {/* Recently Visited Sites */}
      <div className="flex flex-wrap gap-5 p-5 content-center items-center justify-center">
        <div className="flex flex-col items-center">
          <button
            type="button"
            className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            <FaDiscord size={30} />
            <span className="sr-only">Notifications</span>
            {/* <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
              20
            </div> */}
          </button>
          <span className="font-semibold text-white">Discord</span>
        </div>

        <div className="flex flex-col items-center">
          <button
            type="button"
            className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            <IoLogoWhatsapp size={30} />
            <span className="sr-only">Notifications</span>
            {/* <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
            20
          </div> */}
          </button>
          <span className="font-semibold text-white">(11) WhatsApp</span>
        </div>

        <div className="flex flex-col items-center">
          <button
            type="button"
            className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            <FaSquareGithub size={30} />
            <span className="sr-only">Notifications</span>
            {/* <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
            20
          </div> */}
          </button>
          <span className="font-semibold text-white">Github</span>
        </div>

        <div className="flex flex-col items-center">
          <button
            type="button"
            className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            <SiGooglemeet size={30} />
            <span className="sr-only">Notifications</span>
            {/* <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
            20
          </div> */}
          </button>
          <span className="font-semibold text-white">Google Meet</span>
        </div>

        <div className="flex flex-col items-center">
          <button
            type="button"
            className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            <SiLeetcode size={30} />
            <span className="sr-only">Notifications</span>
            {/* <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
            20
          </div> */}
          </button>
          <span className="font-semibold text-white">Leetcode</span>
        </div>

        <div className="flex flex-col items-center">
          <button
            type="button"
            className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            <FaSnapchatGhost size={30} />
            <span className="sr-only">Notifications</span>
            {/* <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
            20
          </div> */}
          </button>
          <span className="font-semibold text-white">Snapchat</span>
        </div>

        <div className="flex flex-col items-center">
          <button
            type="button"
            className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            <SiFlipkart size={30} />
            <span className="sr-only">Notifications</span>
            {/* <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
            20
          </div> */}
          </button>
          <span className="font-semibold text-white">Flipkart</span>
        </div>

        <div className="flex flex-col items-center">
          <button
            type="button"
            className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            <FaPlus size={30} />
            <span className="sr-only">Notifications</span>
            {/* <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
            20
          </div> */}
          </button>
          <span className="font-semibold text-white">Add Shortcut</span>
        </div>
      </div>

      <div className="p-3 bg-gray-800">
        <div className="flex flex-row gap-2">
          <div className="flex flex-row gap-5 p-1 rounded-lg bg-slate-700 w-40">
            <span className="text-blue-500 font-bold text-sm">Discover</span>
            <span className="text-white font-bold text-sm">Following</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-white font-bold">News</span>
            <span className="text-white font-bold">Sports</span>
            <span className="text-white font-bold">Play</span>
            <span className="text-white font-bold">Money</span>
            <span className="text-white font-bold">Gaming</span>
            <span className="text-white font-bold">Weather</span>
            <span className="text-white font-bold">Watch</span>
            <span className="text-white font-bold">Learning</span>
            <span className="text-white font-bold">Shopping</span>
            <span className="text-white font-bold content-center">
              <IoIosMore size={20} />
            </span>
          </div>
        </div>
        <div className="rounded-xl flex flex-wrap gap-10 justify-center p-5">
          {imgData.images.map((image, index) => {
            const { author, download_url } = image;
            return (
              <div key={index} className="card">
                <div className="card-body group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[360px] transition-all">
                  <img
                    alt={author}
                    data-src={download_url}
                    className="card-img-top h-auto max-w-full rounded-lg w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20"
                    src={
                      "https://picsum.photos/id/870/300/300?grayscale&blur=2"
                    }
                  />
                  <Link
                    to={`/post`}
                    className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
                  >
                    Read article
                  </Link>
                  <div className="card-footer">
                    <p className="card-text text-center text-capitalize text-primary text-white font-bold mt-10">
                      Shot by: {author}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {/* {isLoading && <p>Loading...</p>} */}
        </div>
        {imgData.fetching && (
          <div className="text-center bg-secondary m-auto p-3">
            <p className="m-0 text-white">Getting images</p>
          </div>
        )}
        <div
          id="page-bottom-boundary"
          style={{ border: "1px solid red" }}
          ref={bottomBoundaryRef}
        ></div>
      </div>
    </div>
  );
}

export default App;
