import cors = require("cors");

export default cors({
  // TODO: possibly harden this depending on if API should be public.
  origin: "*",
});
