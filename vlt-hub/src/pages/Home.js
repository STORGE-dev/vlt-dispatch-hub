import React, { useState } from "react";
import { TimePicker, DatePicker, Modal, Spin, message } from "antd";
import axios from "axios";
import "./custom.css"
import Header from "../Components/Header";



const HomePage = () => {
  const [inputValue, setInputValue] = useState("");
  const [updtId, setUpdtId] = useState("");
  const [vltDate, setDate] = useState("");
  const [vlttime, setTime] = useState("");
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [createBtn, setCreateBtn] = useState(true); // For unique item IDs
  const [modalOpen, setModalOpen] = useState(false);
  const [isSpin, setisSpin] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleLatInputChange = (event) => {
    setlatitude(event.target.value);
  };

  const handleLonInputChange = (event) => {
    setlongitude(event.target.value);
  };

  const HandleUpdate = async () => {
    try {
      setisSpin(true);
      const TD = formatDateTimeToGPS(vlttime, vltDate);
      const response = await axios.post('http://3.6.153.131:3000/trak24-liveupdate', {
        Imei:inputValue,
        Date: TD.formattedDate,
        Time: TD.formattedTime,
       latitude:latitude,
      longitude:longitude  
      });
      console.log('Response data:', response.data);
      IncrRequest();
      setisSpin(false);
      setModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  function formatDateTimeToGPS(time, date) {
    const [day, month, year] = date.split(" ").map(Number);
    const [timePart, period] = time.split(" ");
    const [hours, minutes] = timePart.split(":").map(Number);

    const adjustedHours =
      period.toLowerCase() === "pm" && hours !== 12
        ? hours + 12
        : hours === 12
        ? 0
        : hours;

    const dateObject = new Date(year, month - 1, day, adjustedHours, minutes);

    const dayStr = String(dateObject.getDate()).padStart(2, "0");
    const monthStr = String(dateObject.getMonth() + 1).padStart(2, "0");
    const yearStr = String(dateObject.getFullYear()).slice(-2);

    const formattedDate = `${dayStr}${monthStr}${yearStr}`;

    const hoursStr = String(dateObject.getHours()).padStart(2, "0");
    const minutesStr = String(dateObject.getMinutes()).padStart(2, "0");
    const secondsStr = "00"; // Assuming seconds are not provided

    const formattedTime = `${hoursStr}${minutesStr}${secondsStr}`;

    return {
      formattedTime,
      formattedDate,
    };
  }


  const IncrRequest = async () => {
    try {
      const res = await axios.post("/api/v1/requests/incr-request",
        {
          updtId: updtId,
          Imei: inputValue,
          Date: vlttime,
          Time: vltDate,
          latitude: latitude,
          longitude: longitude,
          status: "success",
        }
      );
      setUpdtId(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const ConfirmFailedRequest = async () => {
    try {
      setisSpin(true);
      await axios.put("/api/v1/requests/update-status", {
        updtId: updtId,
        status: "failed",
      });
      ClearInputs()
      setModalOpen(false);
      setisSpin(false);
      message.success("Status Recorded!");
    } catch (error) {
      console.log(error);
    }
  };

  const ClearInputs = () => {
    setInputValue("");
    setDate("");
    setTime("");
    setlatitude("");
    setlongitude("");
  };

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
    setDate(dateString);
  };

  const onChangeTime = (time, timeString) => {
    setTime(timeString);
    console.log(time, timeString);
  };

  return (
    <>
      <Spin size="large" spinning={isSpin} fullscreen={true} />
      <Header/>
      <div className="mb-5">
        <div
          className="flex flex-col justify-center items-center"
          style={{ height: "calc(100vh - 80px)" }}
        >
          <div className="flex flex-col mb-10 items-center justify-center">
            <h1 className="text-5xl font-bold text-white">
              Update AIS 140 VLT Units
            </h1>
            <p className="text-xl text-white mt-2">
              Update real time informations of AIS 140
            </p>
          </div>
          {createBtn === true && (
            <button
              onClick={() => setCreateBtn(false)}
              className="bg-green-800 animate-pulse text-white py-3 px-6 rounded-lg text-lg hover:bg-green-700 w-full max-w-xs mb-4"
            >
              Create Update Request
            </button>
          )}
          {createBtn === false && (
            <div className="flex flex-col justify-center items-center space-y-5">
              <div className="flex flex-row space-x-5 w-full">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="imeiInput"
                    className="mb-1 text-gray-400 text-xs"
                  >
                    Enter Unit IMEI
                  </label>
                  <input
                    id="imeiInput"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Unit IMEI"
                    className="border p-2 rounded-md w-[300px] text-white bg-transparent hover:border-blue-500"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label
                    htmlFor="timePicker"
                    className="mb-1 text-gray-400 text-xs"
                  >
                    Select Time
                  </label>
                  <TimePicker
                    id="timePicker"
                    use12Hours
                    format="h:mm a"
                    size="large"
                    onChange={onChangeTime}
                    className="w-full bg-transparent text-white"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label
                    htmlFor="datePicker"
                    className="mb-1 text-gray-400 text-xs"
                  >
                    Select Date
                  </label>
                  <DatePicker
                    id="datePicker"
                    onChange={onChangeDate}
                    format="DD MM YYYY"
                    size="large"
                    className="w-full bg-transparent text-white"
                    needConfirm
                  />
                </div>
              </div>

              <div className="flex  space-x-5 ">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="latInput"
                    className="mb-1 text-gray-400 text-xs"
                  >
                    Latitude 100&lt;[x.xxxx]&gt;00N
                  </label>
                  <input
                    id="latInput"
                    type="text"
                    value={latitude}
                    maxLength={12}
                    onChange={handleLatInputChange}
                    placeholder="Latitude"
                    className="border p-2 rounded-md w-[250px] text-white bg-transparent hover:border-blue-500"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label
                    htmlFor="longiInput"
                    className="mb-1 text-gray-400 text-xs"
                  >
                    Enter Longitude 0&lt;[xx.xxxx]&gt;00E
                  </label>
                  <input
                    id="longiInput"
                    type="text"
                    value={longitude}
                    maxLength={11}
                    onChange={handleLonInputChange}
                    placeholder="Longitude"
                    className="border p-2 rounded-md w-[250px] text-white bg-transparent hover:border-blue-500"
                  />
                </div>
              </div>

              <div className="p-5">
                <button
                  onClick={HandleUpdate}
                  className="bg-green-800 text-white py-2 mt-5 px-6 rounded-md text-lg  w-full max-w-xs"
                >
                  Dispatch Request
                </button>
              </div>
            </div>
          )}
        </div>

        {/* {createBtn === false && (
      <div
       className="flex flex-col justify-center items-center"
      >
        <div className="flex flex-row w-full max-w-xs">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between space-x-5 bg-gray-800 text-white p-2 rounded mb-2"
            >
              <span>{item.value}</span>
              <button
                onClick={() => handleDelete(item.id)}
                className=" text-white rounded-full "
              >
                X
              </button>
            </div>
          ))}
        </div>

        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Type something and press comma"
          className="border p-2 rounded mb-4"
        />

        
      </div>
      )} */}
      </div>

      <Modal
        title="Confirm Request Status"
        centered
        closable={false}
        open={modalOpen}
        maskClosable={false}
        keyboard={false}
        onOk={() => {}}
        onCancel={() => {}}
        footer={[]}
      >
        <>
          <Spin size="large" spinning={isSpin} fullscreen={true} />
          <div className="flex flex-col mb-10 items-center mt-10 justify-center">
            <h1 className="text-2xl font-bold text-black">
              Was the request successful ?
            </h1>
            <p className="text-sm text-black mt-2">
              Continue by confirming the current request status
            </p>
            <div className="flex space-x-5 mt-5">
              <button
                onClick={ConfirmFailedRequest}
                className="bg-red-800 text-white w-fit h-fit rounded-lg text-lg hover:bg-red-700 py-2 px-8 mb-4"
              >
                Failed
              </button>

              <button
                onClick={() => {
                  ClearInputs();
                  setModalOpen(false);
                  message.success("Status Recorded!");
                }}
                className="bg-green-800 text-white w-fit h-fit rounded-lg text-lg hover:bg-green-700 py-2 px-8 mb-4"
              >
                Success
              </button>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

export default HomePage;
