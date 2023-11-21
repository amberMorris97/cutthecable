import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import LockIcon from "@mui/icons-material/Lock";
import DateRangeIcon from '@mui/icons-material/DateRange';
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getAllSubscriptions,updatePlans } from "../../APIs/subscriptionsAPI";
import { createCode } from "../../APIs/redeemAPI";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css'; // Import the CSS

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";


const Plans = () => {
  const [GetPrice, setPrice] = useState("");
  const [selectedValidity, setSelectedValidity] = useState("1 Month");
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [selectedSubscriptionData, setSelectedSubscriptionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubscriptionMetadata, setSelectedSubscriptionMetadata] = useState([]);
  const [selectedMetadata, setSelectedMetadata] = useState("");
  const [isProceedDisabled, setIsProceedDisabled] = useState(true);


  const [data, setData] = useState([]);
  
  const fetchData = async () => {
    try {
      const responseData = await getAllSubscriptions();
      console.log(responseData.data)
      setData(responseData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  

  const validityOptions = [
    "1 Month",
    "2 Months",
    "3 Months",
    "4 Months",
    "5 Months",
    "6 Months",
    "7 Months",
    "8 Months",
    "9 Months",
    "10 Months",
    "11 Months",
    "12 Months"
  ];

  const handleCodeChange = (e) => {
    const inputValue = e.target.value;
    setPrice(inputValue);
  };

  const handleValidityChange = (e) => {
    setSelectedValidity(e.target.value);
  };

  const handleSubscriptionChange = (e) => {
    const selectedValue = e.target.value;
    const selectedItem = data.find((item) => item.id === selectedValue);
    setSelectedSubscriptionData(selectedItem);
    setSelectedSubscription(selectedValue);
    setSelectedSubscriptionMetadata(selectedItem.metadata || []);
    setSelectedMetadata("");
    setIsProceedDisabled(true);
  };

  const handleMetadataChange = (e) => {
    setSelectedMetadata(e.target.value);
    setIsProceedDisabled(false);
  };
  const reloadData = async () => {
    // Use a Promise to wait for fetchData to complete
    return new Promise(async (resolve) => {
      await fetchData();
      resolve('Data reloaded'); // You can return any response you want
    });
  };
  async function ProceedClicked() {
    setIsLoading(true);
    if (GetPrice === '' || isNaN(GetPrice) || GetPrice < 0) {
        alertify.error('Please input a valid non-negative numeric price');
        setIsLoading(false);
        return false;
      }
      
      
    const selectedValidityNumber = parseInt(selectedValidity);
    const selectedItem = selectedSubscriptionMetadata.find((item) => item._id === selectedMetadata);
    console.log(selectedSubscriptionData);
    console.log(selectedItem);
    const body = await updatePlans(selectedItem._id, GetPrice,selectedItem.validity,selectedSubscriptionData.id);
    console.log(body.data.message);
    if (body.data.result === 'success') {
        // Display a green success alert using Alertify.js
        alertify.success(body.data.message);
        
        // const response = await fetchData();
        // console.log(response)
        // if (response === 'Data reloaded') {
            // Data has been reloaded
            setSelectedMetadata("");
            console.log(body.data.data);
            setSelectedSubscriptionMetadata(body.data.data || []);
            // You can add your if condition here
            // ...
        // } else {
        //     // Handle the case where data reloading failed
        //     // ...
        // }

        
        
      } else {
        // Display a red error alert using Alertify.js
        alertify.error(body.data.message);
      }
      setPrice('');
    setIsLoading(false);
  }

  return (
    <Wrapper>

      {isLoading && (
        <Backdrop open={isLoading} style={{ zIndex: 9999 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      <p className="TitleText">Update Plans</p>
      <div className="RedeemCode">
        <div className="InputHolder">
          <Grid item lg={5.5}>
            <div className="InputTitle">
              <p className="InputTitleText">Price</p>
            </div>
            <div className="PasswordHolder">
              <input
                className="ForgotInputFieldGeneral"
                type="number"
                value={GetPrice}
                onChange={handleCodeChange}
              />
            </div>
            {/* <div className="InputTitle">
              <DateRangeIcon className="InputTitleIcon" />
              <p className="InputTitleText">Validity</p>
            </div>
            <div className="PasswordHolder">
              <Select
                value={selectedValidity}
                onChange={handleValidityChange}
                style={{ width: '300px', marginTop: '0px' }}
              >
                {validityOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </div> */}

            <div className="InputTitle">
              <p className="InputTitleText">Plan Name</p>
            </div>
            <div className="PasswordHolder">
              <Select
                value={selectedSubscription}
                onChange={handleSubscriptionChange}
                style={{ width: '300px', marginTop: '0px' }}
              >
                {data.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </div>

            {selectedSubscriptionMetadata.length > 0 && (
              <>
                <div className="InputTitle">
                  <p className="InputTitleText">Plan Metadata</p>
                </div>
                <div className="PasswordHolder">
                  <Select
                    value={selectedMetadata}
                    onChange={handleMetadataChange}
                    style={{ width: '300px', marginTop: '0px' }}
                  >
                    {selectedSubscriptionMetadata.map((metadataItem) => (
                      <MenuItem key={metadataItem._id} value={metadataItem._id}>
                        {metadataItem.price}$ For {metadataItem.validity} Months
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </>
            )}

            <Button
              variant="contained"
              onClick={ProceedClicked}
              className="ProceedButton"
              style={{ textTransform: "none" }}
              disabled={isProceedDisabled} // Disable the button conditionally
            >
              <p className="SignUpText">Proceed</p>
            </Button>
          </Grid>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
margin-top:4.5%;
height:100%;
padding-left:5%;

.ProceedButton {
    background-color: #BB434D;
    width: 200px;
    height:55px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-divs: center;
    border-radius: 5px;
    margin-top: 5%;
  }
  .ProceedButton:hover {
   cursor:pointer;
}
.InputHolder{
    padding-top:5%;
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:100%;
 
}
.SubTitleText{
    color: #1c1f25;
    font-size:22px;
    font-weight:100;
    margin-bottom:0px;
}
.ForgotInputFieldGeneral {
    width: 100%;
    height:40px;
    margin-top: 0;
    border-radius:5px;
    font-size:18px;
  }
  .ForgotInputFieldGeneral:focus {
   outline:none;
  }
.TitleText{
    font-size:35px;
    color: #1c1f25;
    margin-bottom:0px;
    font-weight:100;
}
.InputTitle {
    display: flex;
    align-content: center;
    align-items: center;
    margin-bottom: 0;
    width: 300px;
  }
  .InputTitleIcon {
    color: #1c1f25;
    font-size: 20px;
    margin-right:2.5%;
  }
  .InputTitleText {
    color: #1c1f25;
    font-size: 20px;
    font-weight:00;
  }
.RedeemCode{
    width:100%;
    margin-top:0px;
    display:flex;
    justify-content:center;
    align-content:center;
    align-items:center;
}
@media (max-width: 767px) {
    .TitleText{
        margin-bottom:0px;
        padding-left:0px;
        text-align:center;
    }
    .RedeemCode{
        width:100%;
        padding-left:0px;
    }
    .SubTitleText{
        font-size:22px;
        font-weight:100;
        margin-bottom:0px;
    }
}

`;
export default Plans;
