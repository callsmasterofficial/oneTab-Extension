import React from 'react'

export default function PopupShare(props) {
  const [qrCode, setQRcode]= useState(true);

  let webLink="Example.com"
  let shareLink = `https://api.qrserver.com/v1/create-qr-code/?data=${webLink}`


  // useEffect(() => {
  //   let imgUrl = "Example.com";
  //   let qrData = () => {
  //     let response = await axios
  //   }
  // })
  return (
    <div className="popup-box">
        <div>
          <img src="img/Onetab_logo_White" alt="popup_logo" />
        </div>
        {/* QR Code Image */}
        <div className="pbox">
          <img src={shareLink} alt="shareLogo" />
        </div>
        <div className="footer">
          <p>Some random text for Footer</p>
        </div>
    </div>
  );
};
