const DashboardLayout = ({ children }:{children:React.ReactNode}) => {
    return (
        <div className="px-4 py-2 lg:px-8 lg:py-4">
            {children}
        </div>
    );  
}

export default DashboardLayout;