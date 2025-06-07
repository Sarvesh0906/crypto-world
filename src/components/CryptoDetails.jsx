import React, { useState, useEffect } from 'react';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import { useParams } from 'react-router-dom';
import { AttachMoney, EmojiEvents, TrendingUp, Warning, MonetizationOn, AccountBalance, FormatListNumbered, Autorenew } from '@mui/icons-material';
import { Typography, Box, Select, MenuItem, FormControl, InputLabel, Card, CardContent, Divider } from '@mui/material';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../api/cryptoApi';
import LineChart from './LineChart';
import Loader from './Loader';
import { toast } from 'react-toastify';
import { handleApiError } from '../utils/handleApiError';

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('7d');

  const {
    data: coinData,
    isFetching: isCoinFetching,
    error: coinError,
  } = useGetCryptoDetailsQuery(coinId);

  const {
    data: coinHistory,
    isFetching: isHistoryFetching,
    error: historyError,
  } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });

  const cryptoDetails = coinData?.data?.coin;

  // Handle API success and error
  useEffect(() => {
    if (coinError || historyError) {
      handleApiError(coinError || historyError, 'Failed to fetch coin details or history.');
    } else if (!isCoinFetching && cryptoDetails) {
      toast.success('Coin details fetched successfully!');
    }
  }, [coinError, historyError, isCoinFetching, cryptoDetails]);

  if (isCoinFetching || isHistoryFetching) return <Loader />;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$${millify(cryptoDetails?.price)}`, icon: <AttachMoney /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <FormatListNumbered /> },
    { title: 'Market Cap', value: `$${millify(cryptoDetails?.marketCap)}`, icon: <MonetizationOn /> },
    { title: 'All-time-high', value: `$${millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <EmojiEvents /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <AccountBalance /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <TrendingUp /> },
    { title: 'Total Supply', value: `$${millify(cryptoDetails?.supply?.total)}`, icon: <Warning /> },
    { title: 'Circulating Supply', value: `$${millify(cryptoDetails?.supply?.circulating)}`, icon: <Autorenew /> },
  ];

  return (
    <Box className="">
      <Typography variant="h4" className="font-bold mb-4">
        {cryptoDetails.name} ({cryptoDetails.symbol}) Price
      </Typography>

      <Typography className="text-gray-600 pb-6 pt-2">
        {cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.
      </Typography>

      <FormControl fullWidth className="my-6">
        <InputLabel id="timeperiod-label">Select Timeperiod</InputLabel>
        <Select
          labelId="timeperiod-label"
          value={timeperiod}
          onChange={(e) => setTimeperiod(e.target.value)}
          label="Select Timeperiod"
        >
          {time.map((date) => (
            <MenuItem key={date} value={date}>{date}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {
        !isHistoryFetching && coinHistory?.data?.history?.length > 0 ? (
          <LineChart
            coinHistory={coinHistory}
            currentPrice={millify(cryptoDetails?.price)}
            coinName={cryptoDetails?.name}
          />
        ) : (
          <Typography>Loading chart...</Typography>
        )
      }

      {/* Statistics Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 my-4">
        <div>
          <Typography variant="h5" className="font-semibold mb-2">
            {cryptoDetails.name} Value Statistics
          </Typography>

          <Typography className="text-sm text-gray-600 mb-4">
            An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.
          </Typography>

          {stats.map(({ icon, title, value }) => (
            <Card key={title} className="my-2">
              <CardContent className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {icon}
                  <Typography>{title}</Typography>
                </div>
                <Typography>{value}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Typography variant="h5" className="font-semibold mb-2">
            Other Stats Info
          </Typography>

          <Typography className="text-sm text-gray-600 mb-4">
            An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.
          </Typography>

          {genericStats.map(({ icon, title, value }) => (
            <Card key={title} className="my-2">
              <CardContent className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {icon}
                  <Typography>{title}</Typography>
                </div>
                <Typography>{value}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Divider className="my-8" />

      <div className="flex flex-col md:flex-row gap-4 md:gap-8 my-4">
        <Box className="w-full p-2 lg:w-1/2">
          <Typography variant="h5" className="font-semibold pb-4">
            About {cryptoDetails.name}
          </Typography>

          <Typography className="w-full md:w-[90%]">{HTMLReactParser(cryptoDetails.description)}</Typography>
        </Box>

        <Box>
          <Typography variant="h5" className="font-semibold">
            {cryptoDetails.name} Links
          </Typography>

          <div className="text-sm lg:text-base flex flex-wrap gap-4 mt-4">
            {cryptoDetails.links?.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex justify-between items-center gap-2 w-fit bg-white border border-gray-300 hover:border-blue-500 px-4 py-3 rounded shadow-sm hover:shadow-md transition-all duration-200"
              >
                <span className="font-medium text-gray-800">{link.type}</span>
                <span className="text-sm text-blue-600 font-semibold underline-offset-2 hover:underline italic">
                  {link.name}
                </span>
              </a>
            ))}
          </div>
        </Box>
      </div>
    </Box>
  );
};

export default CryptoDetails;
