export const logSuccess = (msg: string) => {
  console.log(
    `%c\u2713 %c${msg}`,
    "color: green",
    "color: white",
  );
};

export const logFailure = (msg: string) => {
  console.log(
    `%cX %c${msg}`,
    "color: red; font-style: italic",
    "color: white",
  );
};
