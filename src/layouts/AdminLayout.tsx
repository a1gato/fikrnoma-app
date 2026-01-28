import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

export const AdminLayout = () => {
    const location = useLocation();

    // Default redirect to first class if at root /admin
    if (location.pathname === '/admin' || location.pathname === '/admin/') {
        return <Navigate to="/admin/class/5A" replace />;
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    );
};
