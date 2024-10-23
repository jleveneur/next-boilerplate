const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main className="flex min-h-screen justify-center items-center">{children}</main>;
};

export default AuthLayout;
