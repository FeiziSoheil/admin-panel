import AddNewProduct from "./pages/AddNewProduct/AddNewProduct"
import AddNewUsers from "./pages/AddNewUsers/AddNewUsers"
import Dashboard from "./pages/Dashboard/Dashboard"
import EditProduct from "./pages/EditProduct/EditProduct"
import EditUser from "./pages/EditUser/EditUser"
import Offers from "./pages/Offers/Offers"

import ProductsList from "./pages/ProductsList/ProductsList"
import UsersList from "./pages/UsersList/UsersList"



const routes = [
    {path:'/' , element:<Dashboard/>},
    {path:'/users' , element:<UsersList/>},
    {path:'/users/add-new-user' , element:<AddNewUsers/>},
    {path:'/users/EditUser/:userID' , element:<EditUser/>},
    {path:'/products' , element:<ProductsList/>},
    {path:'/products/add-new-product' , element:<AddNewProduct/>},
    {path:'/products/edit-product/:productID' , element:<EditProduct/>},
    {path:'/offers' , element:<Offers/>},
]

export default routes