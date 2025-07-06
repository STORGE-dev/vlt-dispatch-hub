import express from "express";
import { CreateRequest, deleteAllRequests, GetAllRequests, GetALTRequests, GetNRMRequests, GetRequestData, resetFailedAndMonthlyReqs, UpdateStatus } from "../Controllers/requestControllers.js";
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
    "/get-nrm-requests",
    GetNRMRequests
  
  );

  router.get(
    "/get-alt-requests",
    GetALTRequests
  
  );

  router.get(
    "/get-request-data",
    GetRequestData
  
  );
  
  router.delete(
    "/delete-all-reqs",
    deleteAllRequests
  
  );

  router.delete(
    "/delete-req-count",
    resetFailedAndMonthlyReqs
  
  );

  export default router;

 