import React, { useEffect } from 'react';
import millify from 'millify';
import { Typography, Grid, Box, Card, CardContent, Button } from '@mui/material';
import Divider from '@mui/material/Divider';

import { useGetGlobalStatsQuery } from '../api/cryptoApi';
import Cryptocurrencies from './Cryptos';
import News from './News';
import Loader from './Loader';
import { handleApiError } from '../utils/handleApiError';
import { toast } from 'react-toastify';

// Optional: sample fallback stats if needed
// import globalStatsData from '../data/coinsData.json';

const Homepage = () => {
  const {
    data: apiData,
    isFetching,
    error,
  } = useGetGlobalStatsQuery();

  const globalStats = apiData?.data;
  // Optional fallback:
  // const globalStats = error ? globalStatsData?.data : apiData?.data;

  //  Handle errors and success
  useEffect(() => {
    if (error) {
      handleApiError(error, 'Failed to load global stats.');
    } else if (apiData?.data) {
      toast.success('API fetched successfully!');
    }
  }, [error, apiData]);

  if (isFetching && !error) return <Loader />;

  const stats = [
    { title: 'Total Crypto Coins', value: millify(globalStats.totalCoins) },
    { title: 'Total Exchanges', value: millify(globalStats.totalExchanges) },
    { title: 'Total Market Cap', value: `$${millify(globalStats.totalMarketCap)}` },
    { title: 'Total 24h Volume', value: `$${millify(globalStats.total24hVolume)}` },
    { title: 'Total Markets', value: millify(globalStats.totalMarkets) },
    { title: 'BTC Dominance', value: `${globalStats.btcDominance.toFixed(2)}%` },
    { title: 'BTC Market Cap', value: `$${millify(globalStats.btcMarketCap)}` }
  ];

  return (
    <>
      {/* Global Stats */}
      <Box className="mb-6 md:mb-0">
        <Typography variant="h4" className="md:px-2 lg:px-4 pb-6 font-bold text-blue-700">
          Global Crypto Stats
        </Typography>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {stats.map(({ title, value }) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={title}>
              <Card className="shadow-md">
                <CardContent>
                  <Typography variant="subtitle1" className="text-gray-500">
                    {title}
                  </Typography>
                  <Typography variant="h6" className="font-bold">
                    {value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider className="bg-gray-100 md:hidden" />

      {/* Top 10 Cryptos */}
      <Box className="md:mt-6 lg:mt-12 my-4 flex justify-between items-center">
        <Typography variant="h4" className="pt-2.5 lg:px-4 font-bold text-blue-700" gutterBottom>
          Top 10 Cryptocurrencies In The World
        </Typography>

        <div className="hidden md:block">
          <Button variant="contained" href="/cryptocurrencies">
            Show More
          </Button>
        </div>
      </Box>
      <Cryptocurrencies simplified />
      <div className="md:hidden flex justify-center my-6">
        <Button variant="contained" href="/cryptocurrencies">
          Show More
        </Button>
      </div>

      <Divider className="bg-gray-100 md:hidden" />

      {/* Latest News */}
      <Box className="md:mt-6 lg:mt-12 my-4 flex justify-between items-center">
        <Typography variant="h4" className="pt-2.5 md:px-2 lg:px-4 font-bold text-blue-700">
          Latest Crypto News
        </Typography>

        <div className="hidden md:block">
          <Button variant="contained" href="/news">
            Show More
          </Button>
        </div>
      </Box>
      <News simplified />
      <div className="md:hidden flex justify-center mt-6">
        <Button variant="contained" href="/news">
          Show More
        </Button>
      </div>
    </>
  );
};

export default Homepage;
