import React from 'react';
import Sidebar from '../components/Sidebar';
import UserManagement from '../components/UserManagement';
import ProductManagement from '../components/ProductManagement';

type IndexProps = {
    
};

const Index:React.FC<IndexProps> = () => {
    const [active, setActive] = React.useState('user');

    return (
    <div className='h-[calc(100vh-73px)] w-screen flex'>
        <Sidebar setActive={setActive} />
        <div className="w-full">
            {active === 'user' && <UserManagement />}   
            {active === 'product' && <ProductManagement />}
        </div>
    </div>
    );
}
export default Index;