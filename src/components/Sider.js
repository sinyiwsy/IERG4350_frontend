import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import './Sider.css';
import { useSelectedCategoryUpdate } from "../contexts/CategoryContext";
import { useIsAdmin } from "../contexts/UserContext";
import { logoutService, authAdminService } from "../Service.js";
import { useUserUpdate, useIsAdminUpdate } from "../contexts/UserContext";
import { useHistory} from "react-router-dom";


import {
    HomeTwoTone,
    IdcardTwoTone,
    CalculatorTwoTone,
} from '@ant-design/icons';

const { Sider } = Layout;

const MySider = (props) => {

    const history = useHistory();

    const chooseCategory = useSelectedCategoryUpdate();
    const isAdmin = useIsAdmin();
    const userUpdate = useUserUpdate();
    const isAdminUpdate = useIsAdminUpdate();
    

    const categoryElements = props.categoryList.map((category, index) => 
        <Menu.Item key={index + 5} icon={<IdcardTwoTone />} onClick={() => chooseCategory(category)}>
           <Link to="/">{category.name}</Link>
        </Menu.Item>
    );

    const logoutHere = () => {
        logoutService();
        userUpdate("Guest");
        isAdminUpdate(false);
        history.push('/login');
    }

    const authAdminHere = () => {
        authAdminService().then(res => {
            res.data == 1 ? history.push('/admin') : logoutHere();
        });
    }

    return (
        <Sider className="siderClass">
            <div className="sizedBox" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>

                <Menu.Item key="1" icon={<HomeTwoTone />} onClick={() => chooseCategory(0)}>
                    <Link to="/">Home</Link>
                </Menu.Item>

                <Menu.Item key="2" icon={<CalculatorTwoTone />}>
                    <Link to="/login">Login</Link>
                </Menu.Item>

                <Menu.Item key="3" icon={<CalculatorTwoTone />} onClick={logoutHere}>Logout
                </Menu.Item>

                
                {isAdmin && 
                <Menu.Item key="4" icon={<CalculatorTwoTone />} onClick={authAdminHere}> Admin
                </Menu.Item>}

                {categoryElements}
            </Menu>
        </Sider>
    );
}

export default MySider;