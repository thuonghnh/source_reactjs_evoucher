import Home from '../containers/home';
import Login from '../containers/login';
import SigninOidc from '../containers/login/components/signin-oidc'
import SignoutOidc from '../containers/login/components/signout-oidc'
//package
import EVoucherPackage from '../containers/evoucherpackage'
import EVoucherProfile from '../containers/evoucherProfile';
import RegulationDeclare from '../containers/declareRedemer/';
import DeclarePackage from '../containers/declarePackage';
import DeclarePackageProfile from '../containers/declarePackageProfile';
import DeclareProfileValue from '../containers/declareProfileValue';
//sidebar sẽ render theo pathid...những route nào có pathid giống nhau sẽ đc render ra sidebar cùng nhau
export const RouteLink = [
    {
        path: "/",
        pathid: 0,
        name: "Trang chủ",
        exact: true,
        component: () => <Home />,
        icon: "",
        description: "",
    },
    {
        path: "/evoucher-package",
        pathid: 1,
        name: "Quản lý Package",
        exact: true,
        component: () => <EVoucherPackage />,
        icon: "fa fa-gift",
        description: "Evoucher Package",
    },
    {
        path: "/package-profile",
        pathid: 3,
        name: "Quản lý profile",
        exact: true,
        component: () => <EVoucherProfile />,
        icon: "fa fa-recycle",
        description: "Quản lý profile",
    },
    {
        path: "/redeemer-add",
        pathid: 4,
        name: "Quy định áp dụng",
        exact: true,
        component: () => <RegulationDeclare />,
        icon: "fa fa-recycle",
        description: "Đây là quy định áp dụng",
    },
    {
        path: "/redeemer/:id",
        pathid: 5,
        name: "Quy định áp dụng",
        exact: true,
        component: () => <RegulationDeclare />,
        icon: "fa fa-recycle",
        description: "Đây là quy định áp dụng",
    },
    {
        path: "/profile-value-add",
        pathid: 6,
        name: "Khai báo bộ giá trị",
        exact: true,
        component: () => <DeclareProfileValue />,
        icon: "fa fa-cog",
        description: "Đây là bộ giá trị áp dụng",
    },
    {
        path: "/profile-value/:id",
        pathid: 7,
        name: "Khai báo bộ giá trị",
        exact: true,
        component: () => <DeclareProfileValue />,
        icon: "fa fa-cog",
        description: "Đây là bộ giá trị áp dụng",
    },
]

//route sidebar sẽ custom...
export const RoutePage = [
    {
        path: "/signin-oidc",
        name: "Đăng nhập SSO",
        exact: true,
        component: () => <SigninOidc />,
    },
    {
        path: "/signout-oidc",
        name: "Đăng xuất SSO",
        exact: true,
        component: () => <SignoutOidc />,
    },
    {
        path: "/login",
        name: "Đăng nhập",
        exact: true,
        component: () => <Login />,
    },
    {
        path: "/evoucher-package-add",
        name: "Thêm mới Package",
        exact: true,
        component: () => <DeclarePackage />,
    },
    {
        path: "/evoucher-package/:id",
        name: "Chỉnh sửa Package",
        exact: true,
        component: () => <DeclarePackage />,
    },
    {
        path: "/package-profile-add",
        name: "Chỉnh sửa Package Profile",
        exact: true,
        component: () => <DeclarePackageProfile />,
    },
    {
        path: "/package-profile/:id",
        name: "Chỉnh sửa Package Profile",
        exact: true,
        component: () => <DeclarePackageProfile />,
    }
];