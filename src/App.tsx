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
import { useReducer, useRef } from "react";
import { useFetch, useInfiniteScroll, useLazyLoading } from "./custom-hooks";

function App() {
  const imgReducer = (state, action) => {
    switch (action.type) {
      case "STACK_IMAGES":
        return { ...state, images: state.images.concat(action.images) };
      case "FETCHING_IMAGES":
        return { ...state, fetching: action.fetching };
      default:
        return state;
    }
  };

  const pageReducer = (state, action) => {
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

  const bottomBoundaryRef = useRef(null);
  useFetch(pager, imgDispatch);
  useLazyLoading(".card-img-top", imgData.images);
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  // const [images, setImages] = useState<string[]>([]);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   // Function to load initial images
  //   loadImages();
  // }, []);

  // // Function to load more images
  // const loadMoreImages = () => {
  //   // Simulated API call or any other method to fetch more images
  //   // Here, I'm simply adding more image URLs to the state
  //   const moreImages = [
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-12.jpg",
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-13.jpg",
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-14.jpg",
  //   ];
  //   setImages((prevImages) => [...prevImages, ...moreImages]);
  // };

  // // Function to load initial images
  // const loadImages = () => {
  //   // Simulated initial image loading
  //   const initialImages = [
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg",
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg",
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg",
  //   ];
  //   setImages(initialImages);
  // };

  return (
    <div className="bg-[url('../public/bg.png')] bg-hero min-h-screen bg-hero bg-no-repeat bg-cover bg-center bg-fixed">
      {/* TOP Header */}
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

        <div className="flex flex-row items-center gap-10">
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

      {/* Recently Visited Sites */}
      <div className="flex flex-row gap-5 p-5 content-center items-center justify-center">
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
          <div className="flex flex-row gap-2">
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
        {/* 
        <div className="rounded-xl  grid grid-cols-2 md:grid-cols-4 gap-4 p-5">
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        */}
        <div className="rounded-xl grid grid-cols-2 md:grid-cols-4 gap-4 p-5">
          {imgData.images.map(
            (
              image: { author: string; download_url: string },
              index: number
            ) => {
              const { author, download_url } = image;
              return (
                <div key={index} className="card">
                  <div className="card-body ">
                    <img
                      alt={author}
                      data-src={download_url}
                      className="card-img-top h-auto max-w-full rounded-lg"
                      src={
                        "https://picsum.photos/id/870/300/300?grayscale&blur=2"
                      }
                    />
                  </div>
                  <div className="card-footer">
                    <p className="card-text text-center text-capitalize text-primary">
                      Shot by: {author}
                    </p>
                  </div>
                </div>
              );
            }
          )}
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
