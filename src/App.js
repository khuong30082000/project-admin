import { Routes, Route } from "react-router-dom";
import Dashboard from "./Page/Dashboard/Dashboard";
import { Navigate } from "react-router-dom";
import User from "Page/User/User";
import Customer from "Page/Customer/Customer";
import Product from "Page/Product/Product";
import Order from "Page/Order/Order";
import Coupon from "Page/Coupon/Coupon";
import MainLayout from "layout/MainLayout/MainLayout";
import PageNotFound from "Page/404NotFound/PageNotFound";
import LineChart from "Page/Chart/LineChart";
import RadialChart from "Page/Chart/RadialChart";
import BaChart from "Page/Chart/BaChart";
const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route exact path="/" element={<Navigate to="/dashboard" />}></Route>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<User />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/products" element={<Product />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/coupons" element={<Coupon />} />
        <Route path="/linechart" element={<LineChart />} />
        <Route path="/radial" element={<RadialChart />} />
        <Route path="/barchart" element={<BaChart />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </MainLayout>
  );
};
export default App;
