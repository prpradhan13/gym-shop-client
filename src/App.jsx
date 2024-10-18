import { Suspense, lazy } from "react"
import { Toaster } from "react-hot-toast"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import LoadingAnimtion from "./components/loading/LoadingAnimtion"

const MainLayout = lazy(() => import("./Layout/MainLayout"))
const HomePage = lazy(() => import("./pages/HomePage"))
const MenSection = lazy(() => import("./pages/MenSection"))
const WomenSection = lazy(() => import("./pages/WomenSection"))
const AccessorySection = lazy(() => import("./pages/AccessoriesSection"))
const RegisterLayout = lazy(() => import("./Layout/RegisterLayout"))
const Register = lazy(() => import("./pages/Register"))
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"))
const UserRoute = lazy(() => import("./components/auth/UserRoute"))
const UserDashboard = lazy(() => import("./pages/userPage/UserDashboard"))
const ViewAllProducts = lazy(() => import("./pages/ViewAllProducts"))
const LeggingsPage = lazy(() => import("./pages/LeggingsPage"))
const SinglePage = lazy(() => import("./pages/SinglePage"))
const FavoritePage = lazy(() => import("./pages/FavoritePage"))

function App() {
  return (
    <BrowserRouter>
    <Toaster />
      <Suspense fallback={<LoadingAnimtion />}>
        <Routes>

          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/mensection" element={<MenSection />} />
            <Route path="/womensection" element={<WomenSection />} />
            <Route path="/accessorysection" element={<AccessorySection />} />
            <Route path="/viewallproducts" element={<ViewAllProducts />} />
            <Route path="/leggingspage" element={<LeggingsPage />} />
            <Route path="/singleproduct/:id" element={<SinglePage />} />
            <Route path="/favoritepage" element={<FavoritePage />} />

            <Route path="/userroute" element={<UserRoute />}>
              <Route path="userdashboard" element={<UserDashboard />}/>
            </Route>
          </Route>

          <Route element={<RegisterLayout />}>
            <Route path="/register" element={<Register />}/>
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Route>

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
