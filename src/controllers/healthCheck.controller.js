// reason for building healthCheck API , is that it would give the endpoint where we could check , if the servers are working fine and doing probably everything
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

const healthCheck = asyncHandler(async (req, res) => {
  return res.status(200)
       .json(new ApiResponse(200 , "OK" , "Health Check Passed"));
});


export {healthCheck};
