import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes';
import { Provider } from 'react-redux';
import store from './store';
import { QueryClientProvider } from '@tanstack/react-query';
import  queryClient  from "./util/queryClient";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>

  </StrictMode>,
)
