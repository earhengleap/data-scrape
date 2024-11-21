import Logo from "@/components/logo";

const AuthLayout = ({ children } : { children: React.ReactNode}) => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-white gap-4">
            <Logo />
            {children}
        </div>
    )
}

export default AuthLayout;