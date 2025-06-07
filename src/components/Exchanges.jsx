import React, { useEffect } from 'react';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import { Avatar, Accordion, AccordionSummary, AccordionDetails, Chip, Link, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Loader from './Loader';
import { toast } from 'react-toastify';
import { handleApiError } from '../utils/handleApiError';
import { useGetExchangesQuery } from '../api/cryptoExchangeApi';

// import exchangesData from '../data/exchangeData.json'; // mock fallback

const Exchanges = () => {
  const {
    data,
    isFetching,
    error,
  } = useGetExchangesQuery();

  // Handle success or error
  useEffect(() => {
    if (error) {
      handleApiError(error, 'Failed to load exchanges.');
    } else if (data) {
      toast.success('Exchanges fetched successfully!');
    }
  }, [error, data]);

  const getRatingColor = (trustScore) => {
    if (trustScore >= 9) return 'success';
    if (trustScore >= 7) return 'warning';
    return 'info';
  };

  const getRatingLabel = (trustScore) => {
    if (trustScore >= 9) return 'AA';
    if (trustScore >= 7) return 'A';
    return 'BBB';
  };

  if (isFetching && !error) return <Loader />;

  return (
    <Box className="px-4">
      {/* Header Row */}
      <div className="grid grid-cols-12 gap-2 text-sm font-semibold mb-4 p-2 bg-gray-100 md:text-lg sticky top-16 md:top-0 z-40 border border-black rounded-md shadow">
        <div className="col-span-1">#</div>
        <div className="col-span-3">Exchange</div>
        <div className="col-span-3 md:col-span-2">24H Volume</div>
        <div className="col-span-2 md:col-span-1 text-right md:text-left">Share</div>
        <div className="col-span-2 hidden md:block text-center">Launched</div>
        <div className="col-span-2 text-right md:text-center">Rating</div>
      </div>

      {data.map((exchange, index) => (
        <Accordion key={exchange.id} disableGutters elevation={0} className="mb-2">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className="grid grid-cols-12 gap-2 items-center text-sm w-full">
              {/* Index */}
              <div className="col-span-1 font-semibold">{index + 1}</div>

              {/* Exchange Name and Logo */}
              <div className="col-span-4 md:col-span-3 flex items-center gap-2">
                <Avatar alt={exchange.name} src={exchange.image} sx={{ width: 24, height: 24 }} />
                <span className="font-semibold break-all">{exchange.name}</span>
              </div>

              {/* 24H Volume */}
              <div className="col-span-3 md:col-span-2">
                ${millify(exchange.trade_volume_24h_btc * 40000, { precision: 2 })}
              </div>

              {/* Share of Total Volume */}
              <div className="col-span-2 md:col-span-1">
                {(exchange.trade_volume_24h_btc_normalized / 1000 * 100).toFixed(2)}%
              </div>

              {/* Years Established */}
              <div className="col-span-2 hidden md:block text-center">
                {new Date().getFullYear() - exchange.year_established || 'N/A'} years
              </div>

              {/* Trust Score Rating */}
              <div className="col-span-2 text-right md:text-center">
                <Chip
                  label={getRatingLabel(exchange.trust_score)}
                  color={getRatingColor(exchange.trust_score)}
                  size="small"
                  sx={{ fontWeight: 'bold' }}
                />
              </div>
            </div>
          </AccordionSummary>

          <AccordionDetails className="pt-4 bg-slate-100 shadow-md rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {/* Description */}
              <div className="md:col-span-2 mb-2">
                <div>{HTMLReactParser(exchange.description || 'No description available')}</div>
              </div>

              {/* Detailed Info Left */}
              <div className="grid grid-cols-2 gap-2">
                <div><strong>Country:</strong> {exchange.country || 'N/A'}</div>
                <div><strong>Established:</strong> {exchange.year_established || 'N/A'}</div>
                <div><strong>Trust Score Rank:</strong> #{exchange.trust_score_rank}</div>
                <div><strong>Trading Incentive:</strong> {exchange.has_trading_incentive ? 'Yes' : 'No'}</div>
              </div>

              {/* Detailed Info Right */}
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                  <strong>Read More At:</strong>{' '}
                  <Link href={exchange.url} target="_blank" rel="noopener noreferrer">
                    {exchange.url}
                  </Link>
                </div>
                <div><strong>24h BTC Volume:</strong></div>
                <div>{millify(exchange.trade_volume_24h_btc, { precision: 2 })} BTC</div>
                <div><strong>Normalized Volume:</strong></div>
                <div>{millify(exchange.trade_volume_24h_btc_normalized, { precision: 2 })} BTC</div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Exchanges;