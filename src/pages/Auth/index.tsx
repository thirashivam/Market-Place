import React, { useState } from 'react';
import Footerimg from '../../images/Footerimg.png';
// import { useCountries } from "use-react-countries";
import {
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { handleSendotp } from '../../api';
import { handlePostVerifyOTP } from '../../api';

const Login = () => {
  // const { countries } = useCountries();
  // const [country, setCountry] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('+91363');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState('');


  const handleContinue = async (e) => {
    e.preventDefault();

    try {
      const payload = { phone_number: phoneNumber };
      // console.log('res=>',payload);
      const res = await handleSendotp(payload);
      // const res = await handleSendotp(phoneNumber)
      setShowOTP(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const payload = { phone_number: phoneNumber, otp: otp };
      const res = await handlePostVerifyOTP(payload);
      console.log('res: ',res.data.access_token);
      const marketplaceAccessToken = res.data.access_token;

      sessionStorage.setItem('marketplace_access_token',marketplaceAccessToken);

      console.log('Marketplace access token set:', marketplaceAccessToken);
      window.location.href = "/";
    }
    catch (error) {
      console.error('Error OTP:', error);
    }
    // console.log('OTP verified');
  };

  return (
    <>
      <div id="login-popup" className="z-10 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 h-full items-center justify-center flex">
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow">
            <button type="button" onClick={() => { window.location.href = "/"; }} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close">
              <svg aria-hidden="true" className="w-5 h-5" fill="#c6c7c7" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
            <div className="p-5">
              <h3 className="text-2xl mb-0.5 font-medium"></h3>
              <p className="mb-4 text-sm font-normal text-gray-800"></p>
              <div className="text-center mb-5">
                <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                  Buy & Sell with Ease
                </p>
                <p className="mt-2 text-sm leading-4 text-slate-600">
                  Experience Our User-Friendly Marketplace App
                </p>
              </div>
              <div className='flex justify-center'>
                <img className="w-full max-w-md" src={Footerimg} alt="footerIMG" />
              </div>
              <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
                <div className="h-px w-full bg-slate-200"></div>
                Welcome
                <div className="h-px w-full bg-slate-200"></div>
              </div>
              <form className="w-full">
                <div className="relative flex w-full max-w-[24rem] mb-5">
                  {/* <Menu placement="bottom-start">
                    <MenuHandler>
                      <Button
                        ripple={false}
                        variant="text"
                        color="blue-gray"
                        className="flex h-10 items-center gap-2 p-[19px] rounded-r-none rounded-l-full border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                      >
                        <img
                          src={countries[0].flags.svg}
                          alt={countries[0].name}
                          className="h-4 w-4 rounded-full object-cover"
                        />
                        {countries[0].countryCallingCode}
                      </Button>
                    </MenuHandler>
                    <MenuList className="max-h-[15rem] max-w-[18rem] overflow-auto z-10">
                      {countries.map(( data, index) => {
                        return (
                          <MenuItem
                            key={data.name}
                            value={data.name}
                            className="flex items-center gap-2"
                            onClick={() => setCountry(data.countryCallingCode)}
                          >
                            <img
                              src={data.flags.svg}
                              alt={data.name}
                              className="h-5 w-3 rounded-full object-cover"
                            />
                            {data.name} <span className="ml-auto">{data.countryCallingCode}</span>
                          </MenuItem>
                        );
                      })}
                    </MenuList>
                  </Menu> */}
                  <Input
                    placeholder="Mobile Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="rounded-full rounded-l-none border-t-blue-gray-200 focus:border-[#DD0125]"
                    labelProps={{
                      className: "before:content-none after:content-none ml-3",
                    }}
                    containerProps={{
                      className: "min-w-0",
                    }}
                  />
                </div>
                {!showOTP && (
                  <button
                    onClick={(e) => handleContinue(e)}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#DD0125] p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-[#DD0125] focus:ring-offset-1 disabled:bg-gray-400"
                  >
                    Continue
                  </button>
                )}
                {showOTP && (
                  <div className="relative flex w-full max-w-[24rem] mb-5">
                    <Input
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOTP(e.target.value)}
                      className="rounded-full border-t-blue-gray-200 focus:border-[#DD0125]"
                      labelProps={{
                        className: "before:content-none after:content-none ml-3",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                    />
                    <Button
                      onClick={handleVerifyOTP}
                      className="rounded-full bg-[#DD0125] px-4 py-2 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-[#DD0125] focus:ring-offset-1"
                    >
                      Verify
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
