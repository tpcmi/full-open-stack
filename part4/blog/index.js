const config = require("./utils/config");
const app = require("./app");
const logger = require("./utils/logger");
const PORT = config.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
