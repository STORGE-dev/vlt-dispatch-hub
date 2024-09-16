import Requests  from "../models/requestModel.js"
import RequestData from "../models/requestData.js"


// Controller function to handle updating a request
export const UpdateStatus = async (req, res) => {
  try {
    const { updtId, status } = req.body;

    // Check for missing fields
    if (!updtId || !status) {
      return res.status(400).json({
        message: 'Bad Request: Missing or invalid fields',
      });
    }

    // Update the request document
    const updatedRequest = await Requests.updateOne(
      { _id: updtId },
      { $set: { status } }
    );

    if (updatedRequest.matchedCount === 0) {
      return res.status(404).json({
        message: 'Request not found',
      });
    }

    // Update request statistics
    const requestData = await RequestData.findOne();

    if (!requestData) {
      return res.status(404).json({
        message: 'RequestData document not found',
      });
    }

    // Update statistics based on the status
    if (status === 'success') {
      requestData.TotalReqs += 1;
      requestData.monthlyReqs += 1;
      requestData.failedReqs -= 1;
    } else {
      requestData.TotalReqs -= 1;
      requestData.failedReqs += 1;
      requestData.monthlyReqs -= 1;
    }

    await requestData.save();

    // Respond with success
    return res.status(200).json({
      message: 'Request updated successfully',
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};



export const  GetAllRequests = async (req, res) => {
    try {
      const data = await Requests.find({});
  
      console.log(data);
  
      // Send success response
      return res.status(200).json({
        message: 'Success',
        status: 200,
        data: data,
      });
    } catch (error) {
      console.error(error);
  
      // Handle internal server error
      return res.status(500).json({
        message: 'Internal Server Error',
        status: 500,
      });
    }
  };


  export const GetRequestData = async (req, res) => {
    try {
      // Fetch all the request data from the database
      const data = await RequestData.find({});
  
      // Return success response with the fetched data
      return res.status(200).json({
        message: 'Success',
        status: 200,
        data: data,
      });
    } catch (error) {
      console.error(error);
  
      // Return error response for server issues
      return res.status(500).json({
        message: 'Internal Server Error',
        status: 500,
      });
    }
  };


  export const CreateRequest = async (req, res) => {
    try {
      const { Imei, Date, Time, latitude, longitude, status } = req.body;
  
      // Check for missing fields
      if (!Imei || !Date || !Time || !latitude || !longitude || !status) {
        return res.status(400).json({
          message: 'Bad Request: Missing or invalid fields',
        });
      }
  
      // Save the new request
      const newRequest = new Requests({
        Imei,
        Date,
        Time,
        latitude,
        longitude,
        status,
      });
  
      await newRequest.save();
  
      // Update request statistics
      let requestData = await RequestData.findOne();
  
      if (!requestData) {
        // Create a new document if it doesn't exist
        requestData = new RequestData({
          TotalReqs: 1,
          monthlyReqs: 1,
        });
      } else {
        requestData.TotalReqs += 1;
        requestData.monthlyReqs += 1;
      }
  
      await requestData.save();
  
      // Return success response with the newly created request's ID
      return res.status(200).json({
        message: 'Request processed successfully',
        status: 200,
        data: newRequest._id,
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Internal Server Error',
        status: 500,
      });
    }
  };