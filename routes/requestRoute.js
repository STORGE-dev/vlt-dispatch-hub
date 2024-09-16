import express from "express";
import { CreateRequest, GetAllRequests, GetRequestData, UpdateStatus } from "../Controllers/requestControllers.js";
const router = express.Router();


router.put(
    "/update-status",
    UpdateStatus
  
  );

  router.post(
    "/incr-request",
    CreateRequest
  
  );

  router.get(
    "/get-all-requests",
    GetAllRequests
  
  );

  router.get(
    "/get-request-data",
    GetRequestData
  
  );


  export default router;

 