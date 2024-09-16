"use client";
import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import { Dropdown, Popconfirm, Spin, message, Pagination } from "antd";
import axios from "axios";
import "./custom.css"




const Requests= () => {
  const [Responses, setResponses] = useState(null);
  const [vltRequests, setVltRequests] = useState([]);
  const [paginatedRequests, setPaginatedRequests] = useState([]);
  const [isSpin, setIsSpin] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Define dropdown menu items for status change actions
  const items = (id, curStatus) => [
    {
      key: "1",
      label: (
        <Popconfirm
          title="Are you sure you want to change the status to Success?"
          onConfirm={
            curStatus !== "success"
              ? () => updateStatus(id, "success")
              : undefined
          }
          okText="Yes"
          cancelText="No"
          disabled={curStatus === "success"}
        >
          <a
            style={{
              color: curStatus !== "success" ? "green" : "gray",
              cursor: curStatus !== "success" ? "pointer" : "not-allowed",
            }}
          >
            {curStatus !== "success"
              ? "Change status to Success"
              : "Status already Success"}
          </a>
        </Popconfirm>
      ),
    },
    {
      key: "2",
      label: (
        <Popconfirm
          title="Are you sure you want to change the status to Failed?"
          onConfirm={
            curStatus !== "failed" ? () => updateStatus(id, "failed") : undefined
          }
          okText="Yes"
          cancelText="No"
          disabled={curStatus === "failed"}
        >
          <a
            style={{
              color: curStatus !== "failed" ? "red" : "gray",
              cursor: curStatus !== "failed" ? "pointer" : "not-allowed",
            }}
          >
            {curStatus !== "failed"
              ? "Change status to Failed"
              : "Status already Failed"}
          </a>
        </Popconfirm>
      ),
    },
  ];


  

  const paginateRequests = (requests, page, size) => {
    const start = (page - 1) * size;
    const end = page * size;
    return requests.slice(start, end);
  };

  // Fetch all requests and handle pagination
  const getRequests = async () => {
    try {
      setIsSpin(true);

      // Fetch request stats
      const reqData = await axios.get("/api/v1/requests/get-request-data");
      console.log(reqData)
      setResponses(reqData.data.data[0]);

      // Fetch request list
      const response = await axios.get("/api/v1/requests/get-all-requests");
      const allRequests = response.data.data.reverse();

      setVltRequests(allRequests);
      setPaginatedRequests(paginateRequests(allRequests, currentPage, pageSize)); // Initial pagination
      setIsSpin(false);
    } catch (error) {
      console.log(error);
    }
  };


  const updateStatus = async (id, status) => {
    try {
      setIsSpin(true);
      await axios.put("/api/v1/requests/update-status", {
        updtId: id,
        status: status,
      });
      getRequests(); // Refresh data after status update
      setIsSpin(false);
      message.success("Status Updated!");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
    setPaginatedRequests(paginateRequests(vltRequests, page, size)); // Recalculate pagination on change
  };

  // Fetch requests on component mount
  useEffect(() => {
    getRequests();
  }, []);
  return (
    <>
      <Spin size="large" spinning={isSpin} fullscreen={true} />
      <Header />
      <div className="flex flex-col p-10 items-center justify-center space-y-5">
        <div className="flex flex-col mb-2 items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Update Requests</h1>
          <p className="text-xl text-white mt-2">
            Update request informations | Count resets every month
          </p>
        </div>

        <div
          className="flex flex-row rounded-md w-3/4 p-3 mb-10 items-center justify-between"
          style={{ backgroundColor: "#0a0a0a" }}
        >
          <div className="flex justify-between items-center w-full p-4">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-5xl">{Responses?.TotalReqs}</h1>
              <h1 className="text-lg">Total Successful Requests</h1>
            </div>

            <div className="h-16 w-px bg-gray-300"></div>

            <div className="flex flex-col items-center text-center">
              <h1 className="text-5xl">{Responses?.monthlyReqs}</h1>
              <h1 className="text-lg">Successful Requests</h1>
            </div>
            <div className="h-16 w-px bg-gray-300"></div>

            <div className="flex flex-col items-center text-center">
              <h1 className="text-5xl">{Responses?.failedReqs}</h1>
              <h1 className="text-lg">Unuccessful Requests</h1>
            </div>
          </div>
        </div>
        {paginatedRequests.length > 0 &&
          paginatedRequests?.map((req) => (
            <div
              key={req?._id}
              className="flex flex-row rounded-md w-2/4 p-5 items-center justify-between pr-10"
              style={{ backgroundColor: "#191919" }}
            >
              <div className="space-y-6">
                <div className="flex space-x-10">
                  <div className="flex flex-col items-start">
                    <div className="flex space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5 text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
                        />
                      </svg>

                      <div>
                        <h2 className="text-gray-400 text-xs">IMEI</h2>
                        <h1 className=" text-white">{req?.Imei}</h1>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start">
                    <div className="flex space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5 text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                        />
                      </svg>

                      <div>
                        <h2 className="text-gray-400 text-xs">
                          Latitude & Longitude
                        </h2>
                        <h1 className=" text-white">
                          {req?.latitude} , {req?.longitude}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-10">
                  <div className="flex flex-col items-start">
                    <div className="flex space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4 text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                        />
                      </svg>

                      <div>
                        <h2 className="text-gray-400 text-xs">Date</h2>
                        <h1 className=" text-white text-sm">{req?.Date}</h1>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start">
                    <div className="flex space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4 text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <div>
                        <h2 className="text-gray-400 text-xs">Time</h2>
                        <h1 className=" text-white text-sm">{req?.Time}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 justify-center items-center">
                <div
                  className={`flex h-fit px-3 rounded-md p-1 justify-center items-center ${
                    req.status === "success"
                      ? "bg-green-700"
                      : req.status === "failed"
                      ? "bg-red-700 px-5"
                      : ""
                  }`}
                >
                  <h1>{req.status === "success" ? "Success" : "Failed"}</h1>
                </div>
                <Dropdown
                  menu={{
                    items: items(req._id,req.status),
                  }}
                  placement="bottomRight"
                  arrow={{
                    pointAtCenter: true,
                  }}
                >
                  <div className="flex w-fit h-fit border hover:cursor-pointer border-white rounded-full justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                  </div>
                </Dropdown>
              </div>
            </div>
          ))}
      </div>
<div className="mb-10 ">
<Pagination
          align="center"
          current={currentPage}
          total={vltRequests.length}
          defaultCurrent={1}
          pageSize={pageSize}
          onChange={handlePageChange}
          className="pagination-control"
        />
</div>
       {/* Simple Pagination control */}
      
    </>
  );
};

export default Requests;


