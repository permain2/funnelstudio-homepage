import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import MarketingHome from './MarketingHome';
createRoot(document.getElementById('root')).render(<HelmetProvider><MarketingHome /></HelmetProvider>);
