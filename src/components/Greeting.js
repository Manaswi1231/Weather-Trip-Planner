import React from "react";

const Greeting = () => {
  const hour = new Date().getHours();
  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return <h1 className="text-3xl font-bold mb-4">{greeting}! 👋</h1>;
};

export default Greeting;
