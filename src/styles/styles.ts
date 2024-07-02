export const def = {
  background: "bg-white dark:bg-dark",
  bgBlurWhite: "bg-white bg-opacity-20 backdrop-blur-md",
  bgBlurBlack: "bg-black bg-opacity-75 backdrop-blur-sm",
  bgBlur:
    "bg-white bg-opacity-20 backdrop-blur-md dark:bg-black dark:bg-opacity-75 dark:backdrop-blur-sm",
  text: "text-black dark:text-white",
  subtitle: "text-sixth dark:text-subtitle",
  title: "text-4xl font-bold text-main block",
  button:
    "w-fit h-fit px-5 py-4 rounded-xl text-center text-xl bg-main text-white hover:bg-secondary dark:hover:bg-third transition duration-200 disabled:cursor-not-allowed",
};

export const center = {
  position: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  flex: "flex justify-center items-center",
  grid: "",
};

export const form = {
  label:
    "absolute right-[15px] z-10 translate-y-[10px] text-xl text-black dark:text-fourth bg-transparent w-fit h-fit group-focus-within:-translate-y-[18px] group-focus-within:scale-[0.8] group-focus-within:transition-all group-focus-within:dark:after:absolute group-focus-within:dark:after:content-[''] group-focus-within:dark:after:bottom-[5px] group-focus-within:dark:after:right-0 group-focus-within:dark:after:w-full group-focus-within:dark:after:h-[5px] group-focus-within:dark:after:z-[-1] group-focus-within:dark:after:bg-dark group-focus-within:max-lg:after:bg-black group-focus-within:max-lg:after:bg-opacity-75 group-focus-within:max-lg:after:backdrop-blur-sm",
  input:
    "border-black dark:border-fourth border-2 w-full  h-14 outline-none px-3 text-lg text-black dark:text-fourth rounded-md focus:border-main  bg-transparent",
  span: "px-3 mt-1 text-error text-sm block",
};

export const verificationStyle = {
  verifyContainer:
    "flex flex-col gap-5 justify-center items-center h-screen w-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1 ",
  secondVerifyContainer:
    "w-fit h-fit max-md:w-[90%] p-5 rounded-2xl shadow-md border border-solid !border-opacity-50 border-white  text-shadow-md !bg-opacity-20 bg-white   !backdrop-blur-md ",
  mainContainer:
    "w-full h-full flex flex-col justify-center items-center pt-14",
  secondaryContainer:
    "bg-white bg-opacity-20 backdrop-blur-md dark:bg-black dark:bg-opacity-60 dark:backdrop-blur-sm rounded-xl p-10 max-md:p-5 max-sm:p-3 lg:w-[45%]  max-lg:w-[80%] max-md:w-[90%] max-sm:w-[95%] border border-[#ffffffb4] dark:border-[#1c223f] shadow-md",
  input:
    "w-12 h-12 max-md:w-10 max-md:h-10  rounded-lg bg-white text-black text-center block border border-black dark:border-white outline-none",
  form: "flex flex-col gap-5",
  header: "w-full flex flex-col items-center justify-center gap-5 mb-5 ",
  logo: "text-4xl max-md:text-3xl font-bold text-[#4285f4] block",
  title: "text-3xl max-md:text-2xl font-bold  block",
  message: "text-[#3D3B40] bold text-xl max-md:text-base mb-5 text-center",
  otpContainer: "flex flex-row-reverse justify-center gap-3",
  btnContainer: "flex justify-around mt-5",
  back: "w-1/3",
  submit: "w-1/3 disabled:!bg-[#285aab76]",
  delete:
    "w-1/3 !py-3 max-md:!px-3 rounded focus:outline-none focus:shadow-outline !bg-red-500 hover:!bg-red-600 text-white disabled:!bg-[#ab2828d2]",
};

export const section = {
  admin:
    "lg:max-w-[calc(100% - 250px)] max-lg:max-w-[calc(100% - 60px)] overflow-x-hidden  transition-all duration-300 relative min-h-screen",
};

// const t = "w-12 h-12 max-md:w-10 max-md:h-10 mr-5 max-md:mr-2 max-lg:mr-3 max-xl:mr-4 rounded-lg bg-white text-fifth text-center block border border-black dark:border-white outline-none"

export const focusInput = `dark:after:absolute dark:after:content-[''] dark:after:bottom-[5px] dark:after:right-0 dark:after:w-full dark:after:h-[5px] dark:after:z-[-1] dark:after:bg-dark max-lg:after:bg-black max-lg:after:bg-opacity-75 max-lg:after:backdrop-blur-sm !-translate-y-[19px] scale-[0.8]`;

export const inputError = `!text-error !border-error focus:text-black  dark:focus:text-white`;

export const formBg =
  "max-lg:bg-white max-lg:bg-opacity-20 max-lg:backdrop-blur-md max-lg:dark:bg-black max-lg:dark:bg-opacity-75 max-lg:dark:backdrop-blur-sm";

export const contactInput =
  "bg-transparent rounded-sm  p-3 outline-none border focus:border-main transition";

export const navBarIcons =
  "flex justify-center items-center rounded-full p-2 bg-fifth max-lg:text-lg font-bold text-2xl  hover:bg-secondary transition-colors cursor-pointer";
