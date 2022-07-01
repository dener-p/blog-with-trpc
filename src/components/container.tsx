interface LayoutProps {
  children: JSX.Element
}
export const Container = ({ children }: LayoutProps) => {
  return (
    <div className="w-screen animate-fadeIn text-white h-screen flex flex-col items-center justify-center gap-4 bg-slate-600 ">
      {children}
    </div>
  )
}
