import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { TextField, Card, CardContent, Typography, Grid } from '@mui/material';

import { useGetCryptosQuery } from '../api/cryptoApi';
import Loader from './Loader';
import { toast } from 'react-toastify';
import { handleApiError } from '../utils/handleApiError';

// sample fallback stats if needed
// import coinData from '../data/coinData.json';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const {
    data: cryptosList,
    isFetching,
    error,
  } = useGetCryptosQuery(count);

  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ Handle API error and success
  useEffect(() => {
    if (error) {
      handleApiError(error, 'Failed to load cryptocurrency list.');
    } else if (cryptosList?.data?.coins?.length > 0) {
      toast.success('Cryptocurrencies fetched successfully!');
    }
  }, [error, cryptosList]);

  // ✅ Filter based on search term
  useEffect(() => {
    const coins = cryptosList?.data?.coins || [];
    const filteredData = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching && !error) return <Loader />;

  return (
    <div className="">
      {!simplified && (
        <div className="mb-8">
          <TextField
            fullWidth
            label="Search Cryptocurrency"
            variant="outlined"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white"
          />
        </div>
      )}

      <Grid container spacing={{ xs: 3, md: 4 }}>
        {cryptos?.map((currency) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={currency.uuid}>
            <Link
              to={`/crypto/${currency.uuid}`}
              className="no-underline"
            >
              <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between mb-4">
                    <Typography
                      variant="h6"
                      className="font-semibold text-gray-800"
                    >
                      {currency.rank}. {currency.name}
                    </Typography>
                    <img
                      src={currency.iconUrl}
                      alt={currency.name}
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                  <Typography className="text-sm text-gray-600 mb-1">
                    Price: {millify(currency.price)}
                  </Typography>
                  <Typography className="text-sm text-gray-600 mb-1">
                    Market Cap: {millify(currency.marketCap)}
                  </Typography>
                  <Typography className="text-sm text-gray-600">
                    Daily Change: {currency.change}%
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Cryptocurrencies;
