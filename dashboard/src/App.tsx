import { ConfigProvider } from 'antd';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from './component/Dashboard/Dashboard';
import { Auth } from './component/Auth';
import { AuthProvider } from './Provider/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { OnlineStatusProvider } from './Provider/OnlineStatusProvider';

const theme = {
  token: {
    colorPrimary: '#00bf80',
    siderBg: '#ffffff',
    colorBgContainer: 'white',
  },
};

const queryClient = new QueryClient();

function App() {
  return (
    <OnlineStatusProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ConfigProvider theme={theme}>
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="/*" element={<Dashboard />} />
            </Routes>
            <Toaster />
          </ConfigProvider>
        </AuthProvider>
      </QueryClientProvider>
    </OnlineStatusProvider>
  );
}

export default App;
