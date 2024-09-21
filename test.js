9490390036
http://gL@trk24/#2024



8129911222
TRK24 @#2024#bS





























const sendFULLPacket = async (Imei, Date, Time, lati, longi) => {
    try {
        const d = Date
        const t = Time
        const vhNo = 'KL40Q1623'
        console.log(Imei, Date, Time, lati, longi)
        const response = await axios.post('http://103.135.130.119:80', `vltdata=FUL${Imei}25L${d}${t}${lati}${longi}4041231234123456789070.48120.5025273011MVENID11.1.00000000${vhNo}0183.5002OPTNAM271234123456789281234123456789261234123456789251234123456789023.5003.7C0001000001CHECKSUM`, {
            headers: {

                'Content-Type': 'application/x-www-form-urlencoded'
            },
            timeout: 15000
        });

        console.log('Data successfully sent. Server response:', response.data);


    } catch (error) {
        console.error('Failed to send data:', error.message);
    }
};

app.post('/trak24-liveupdate-full-packet', (req, res) => {
    const data = req.body;
    // console.log('Received data:', data.Imei,data.Date, data.Time);
    sendFULLPacket(data.Imei, data.Date, data.Time, data.latitude, data.longitude)
    sendFULLPacket(data.Imei, data.Date, data.Time, data.latitude, data.longitude)
    sendFULLPacket(data.Imei, data.Date, data.Time, data.latitude, data.longitude)
    // Send a response
    res.json({
        message: 'Data received successfully',
        receivedData: data
    });
});


const sendAlertOff = async (Imei, Date, Time, lati, longi) => {
    try {
        const d = Date
        const t = Time
        console.log(Imei, Date, Time, lati, longi)
        const response = await axios.post('http://103.135.130.119:80', `vltdata=EPB${Imei}11L${d}${t}${lati}${longi}4041231234123456789070.48120.5025273011M0183.50BSNLXX`, `vltdata=NRM${Imei}01L${d}${t}${lati}${longi}4040195159000005ea9035.00221.0040002011M`, {
            headers: {                                                  NRM${Imei}11L${d}${t}${lati}${longi}4041231234123456789070.48120.5025273011M0183.50BSNLXX

                'Content-Type': 'application/x-www-form-urlencoded'
            },
            timeout: 15000
        });

        console.log('Data successfully sent. Server response:', response.data);


    } catch (error) {
        console.error('Failed to send data:', error.message);
    }
};

app.post('/trak24-liveupdate-alert-off', (req, res) => {
    const data = req.body;
    // console.log('Received data:', data.Imei,data.Date, data.Time);
    sendAlertOff(data.Imei, data.Date, data.Time, data.latitude, data.longitude)
    sendAlertOff(data.Imei, data.Date, data.Time, data.latitude, data.longitude)
    sendAlertOff(data.Imei, data.Date, data.Time, data.latitude, data.longitude)
    // Send a response
    res.json({
        message: 'Data received successfully',
        receivedData: data
    });
});