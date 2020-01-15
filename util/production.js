
import { homepage } from "../package.json"
const basePath = homepage
const localPath = homepage.replace("/apps/", "/apps-mirror/")


export default {
  basePath,
  localPath,
  separateCrossOriginRequests: true,
  isProduction: true,
  isDevelopment: false
}
