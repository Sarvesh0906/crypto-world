import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Typography, Card, CardContent, Avatar, Box, TextField, Autocomplete } from '@mui/material';

import { useGetCryptoNewsQuery } from '../api/cryptoNewsApi';
import { useGetCryptosQuery } from '../api/cryptoApi';
import { handleApiError } from '../utils/handleApiError';
import demoImage from '../assets/images/demoImage.jpg';
import Loader from './Loader';
import { toast } from 'react-toastify';

// sample fallback stats if needed
// import newsData from '../data/newsData.json';

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

  const { data: cryptoOptions } = useGetCryptosQuery(100);
  const { data: cryptoNews, isFetching, error } = useGetCryptoNewsQuery(newsCategory);

  const coinOptions = [
    { name: 'Cryptocurrency' },
    ...(cryptoOptions?.data?.coins || [])
  ];
  
  // Effect to handle API errors and show success message
  useEffect(() => {
      if (error) {
        handleApiError(error, 'Failed to load news.');
      } else if (cryptoNews) {
        toast.success('News fetched successfully!');
      }
    }, [error, cryptoNews]);

  if (isFetching && !error) return <Loader />;

  return (
    <Box className="">
      <Typography variant="h4" className={`mb-6 font-bold text-blue-700 text-center ${simplified ? '' : 'pb-6'}`}>
        {simplified ? '' : 'Latest Cryptocurrency News'}
      </Typography>

      {!simplified && (
        <Box className="mb-6">
          <Autocomplete
            options={coinOptions}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => {
              setNewsCategory(newValue?.name || 'Cryptocurrency');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search a Crypto"
                className="bg-white"
              />
            )}
            defaultValue={{ name: 'Cryptocurrency' }}
            fullWidth
            disableClearable
          />
        </Box>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cryptoNews.slice(0, simplified ? 6 : 12).map((news, i) => (
          <Card key={i} className="h-full hover:shadow-lg transition-shadow duration-300">
            <a
              href={news.url || '#'}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col h-full justify-between"
            >
              <CardContent className="flex flex-col justify-between h-full">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <Typography variant="h6" className="font-bold text-blue-700 line-clamp-4">
                    {news.title}
                  </Typography>
                  <img
                    src={news.logo || demoImage}
                    alt={news.title}
                    className="w-20 h-20 object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src = demoImage;
                    }}
                  />
                </div>

                {/* Snippet */}
                <Typography className="text-gray-700 mb-4 text-sm line-clamp-3">
                  {news.description?.length > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </Typography>

                {/* Footer */}
                <div className="flex justify-between items-center mt-2 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <Avatar
                      src={news.favicon || demoImage}
                      alt={news.name}
                      className="w-6 h-6"
                    />
                    <Typography className="text-sm text-gray-500">
                      {news.name}
                    </Typography>
                  </div>
                  <Typography className="text-sm text-gray-400">
                    {moment().subtract(i * 3, 'hours').fromNow()}
                  </Typography>
                </div>
              </CardContent>
            </a>
          </Card>
        ))}
      </div>
    </Box>
  );
};

export default News;
